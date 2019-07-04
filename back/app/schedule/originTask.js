const request = require('request'),
    _ = require("underscore"),
    moment = require('moment'),
    async = require("async"),
    log4js = require('../util/log4j'),
    mailUtil = require('../util/mail'),
    originDAO = require('../dao/origin').originDAO,
    originHistoryDAO = require('../dao/originHistory').originHistoryDAO;

let originTask = {};

/*
 * 创建源端监控的定时任务,每小时扫描一次源端监控表，
 * 筛选出已启动并且nextTime为当前时间的监控，
 * 将statusCode结果存入到originHistory表中，
 * 并计算源端监控的下次监控的时间整点，
 * 回写到源端监控表中，
 * 发送源站预警邮件
 * */

originTask.createOriginTask = async () => {
    const query = {"isStart": true, "nextTime": new Date().getHours()}
    try {
        //获取需要监控的源端数据列表
        const dataList = await originDAO.findAll(query);
        log4js.info("源站监控任务开始,需要监控的源站个数：" + _.size(dataList));
        if (!_.isEmpty(dataList)) {
            //使用http.get访问源端地址，返回带有statusCode的数据列表
            const httpList = await httpGet(dataList);
            log4js.info("request 请求结束，共有" + _.size(httpList) + "条数据")
            let originUpdateList = [], originHistoryUpdateList = [], mailList = [];
            _.each(httpList, (item) => {
                if (item.statusCode > 200) {
                    mailList.push(_.extend({
                        userID,
                        statusCode,
                        originUrl,
                        originName,
                        type,
                        time,
                    } = item))
                }
                const originUpdate = _.extend(item, {
                    nextTime: parseInt(item.nextTime + item.monitorFreq) >= 24 ? parseInt(item.nextTime + item.monitorFreq) - 24 : parseInt(item.nextTime + item.monitorFreq)
                });
                originUpdateList.push({
                    updateOne: {
                        filter: {_id: originUpdate._id},
                        update: {$set: originUpdate},
                        upsert: false
                    }
                });
                originHistoryUpdateList.push({
                    insertOne: {document: _.omit(item, "_id")}
                });
            });
            //将带有statusCode的数据写入到origin列表中，并更新下次监控时间
            await originDAO.batchUpdate(originUpdateList);
            //将该数据保存到originHistory表中,作为历史数据
            await originHistoryDAO.batchUpdate(originHistoryUpdateList);
            //发送预警邮件
            log4js.info("发送源站预警邮件:" + _.size(mailList) + "个源站需要预警");
            if (_.size(mailList) > 0) {
                await mailUtil.sendMonitorEmail("origin", mailList);
            }
        }
    } catch (err) {
        log4js.error(err);
    }
}

//批量请求源端地址，获取状态码，返回带有statusCode的数据
function httpGet(dataList) {
    return new Promise((resolve, reject) => {
        let data = [];
        async.eachLimit(dataList, 10, (item, callback) => {
            try {
                const j = request.jar();
                const options = {
                    url: item.originUrl,
                    /* headers: {
                         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
                         'Accept': "text/html,application/xhtml+xml,application/xml",
                         'Accept-Charset': "utf-8",
                         'Accept-Encoding': "gzip,deflate",
                         'Accept-Language': "en-US,en,zh-CN,zh"
                     },
                     followRedirect: false,*/
                    jar: j,
                    timeout: 15000
                };
                request(options, function (error, res) {
                    if (error) {
                        log4js.error("源站监控请求originUrl:" + item.originUrl + ";状态异常");
                        item = _.extend(item, {statusCode: 999, time: moment().format('YYYY-MM-DD HH:mm:ss')});
                        data.push(item);
                        log4js.error(error);
                        callback(null);
                    } else {
                        log4js.info("源站监控请求originUrl:" + item.originUrl + ";状态码：" + res.statusCode);
                        item = _.extend(item, {
                            statusCode: res.statusCode,
                            time: moment().format('YYYY-MM-DD HH:mm:ss')
                        });
                        data.push(item);
                        callback(null);
                    }
                });
            } catch (err) {
                log4js.error("catch源站监控请求originUrl:" + item.originUrl + ";状态异常");
                item = _.extend(item, {statusCode: 999, time: moment().format('YYYY-MM-DD HH:mm:ss')});
                data.push(item);
                log4js.error(err);
                callback(null);
            }
        }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(data)
            }
        })
    })
}

const init = async () => {
    const list = [
        // {originUrl: "http://hd.chinatax.gov.cn/fagui/action/InitShiWuSuo.do"},
        // {originUrl: "http://hd.chinatax.gov.cn/fagui/action/InitChukou.do"},
        {originUrl: "http://www.12321.cn/web"},
        {originUrl: "http://grwsyw.bjgjj.gov.cn/ish/"}
    ]
    const data = await httpGet(list);
    console.log(JSON.stringify(data));
}
// init()
exports.originTask = originTask;
// originTask.createOriginTask();