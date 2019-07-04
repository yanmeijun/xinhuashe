const request = require('request'),
    moment = require('moment'),
    _ = require("underscore"),
    async = require("async"),
    config = require('../../config/config'),
    log4js = require('../util/log4j'),
    mailUtil = require('../util/mail'),
    tmpMonitorDAO = require('../dao/tmpMonitor').tmpMonitorDAO,
    tmpMonitorHistoryDAO = require('../dao/tmpMonitorHistory').tmpMonitorHistoryDAO;

let tmpMonitorTask = {};

/*
 * 创建模板监控的定时任务,每小时扫描一次模板监控表，
 * 筛选出已启动并且nextTime为当前时间的监控，
 * 将statusCode结果存入到tmpMonitorHistory表中，
 * 并计算模板监控的下次监控的时间整点，
 * 回写到模板监控表中
 * */

tmpMonitorTask.createTmpMonitorTask = async () => {
    const query = {"isStart": true, "nextTime": new Date().getHours()};
    try {
        //获取需要监控的模板数据列表
        const dataList = await tmpMonitorDAO.findAll(query);
        log4js.info("模板监控任务开始,需要监控的模板个数：" + _.size(dataList));
        if (!_.isEmpty(dataList)) {
            //使用http.get访问模板地址，返回带有statusCode的数据列表
            const httpList = await httpPost(dataList);
            log4js.info("request post 引擎模板请求结束，共有"+_.size(httpList)+"条数据")
            let tmpMonitorUpdateList = [], tmpMonitorHistoryUpdateList = [], mailList = [];
            _.each(httpList,  (item) => {
                if (item.statusCode != "000000") {
                    mailList.push(_.extend({
                        userID,
                        statusCode,
                        templateID,
                        templateName,
                        type,
                        time,
                    } = item))
                }
                const tmpMonitorUpdate = _.extend(item, {
                    nextTime: parseInt(item.nextTime + item.monitorFreq) >= 24 ? parseInt(item.nextTime + item.monitorFreq) - 24 : parseInt(item.nextTime + item.monitorFreq)
                });
                tmpMonitorUpdateList.push({
                    updateOne: {
                        filter: {templateID: tmpMonitorUpdate.templateID},
                        update: {$set: tmpMonitorUpdate},
                        upsert: false
                    }
                });
                tmpMonitorHistoryUpdateList.push({
                    insertOne: {document: _.omit(item, "_id")}
                });
            });
            //将带有statusCode的数据写入到tmpMonitor列表中，并更新下次监控时间
            await tmpMonitorDAO.batchUpdate(tmpMonitorUpdateList);
            //将该数据保存到tmpMonitorHistory表中,作为历史数据
            await tmpMonitorHistoryDAO.batchUpdate(tmpMonitorHistoryUpdateList);
            //发送预警邮件
            log4js.info("发送模板预警邮件:" + _.size(mailList) + "个模板需要预警");
            if (_.size(mailList) > 0) {
                await mailUtil.sendMonitorEmail("template", mailList);
            }
        }
    } catch (err) {
        log4js.error(err);
    }
}

//批量请求模板地址，获取状态码，返回带有statusCode的数据
function httpPost(dataList) {
    return new Promise((resolve, reject) => {
        let data = [];
        async.eachLimit(dataList, 10, (item, callback) => {
            const body = {
                "sessionId": item.templateID + "_" + Date.parse(new Date()), "serviceId": item.templateID, "taskId": "1"
            };
            const options = {
                rejectUnauthorized: false,
                json: true,
                header: {"Content-Type": "application/json; charset=UTF-8"},
                body: body
            };
            request.post(config.templateUrl, options, function (error, response, body) {
                if (error) {
                    item = _.extend(item, {statusCode: "999999", time: moment().format('YYYY-MM-DD HH:mm:ss')});
                    data.push(item);
                    log4js.error(error);
                    callback(null);
                } else {
                    item = _.extend(item, {
                        statusCode: body.retCode || "999999",
                        time: moment().format('YYYY-MM-DD HH:mm:ss')
                    });
                    data.push(item);
                    callback(null);
                }
            });
        }, (err) => {
            if (err) {
                log4js.error(err);
                reject(err);
            }
            resolve(data)
        })
    })
}

exports.tmpMonitorTask = tmpMonitorTask;
// tmpMonitorTask.createTmpMonitorTask();
