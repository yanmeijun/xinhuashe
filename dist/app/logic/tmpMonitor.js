const moment = require('moment'),
    _ = require('underscore'),
    log4js = require('../util/log4j'),
    util = require('../util/util').util,
    procureDAO = require('../dao/procure').procureDAO,
    tmpMonitorDAO = require('../dao/tmpMonitor').tmpMonitorDAO,
    cityDAO = require('../dao/city').cityDAO;
let tmpMonitorLogic = {};

tmpMonitorLogic.getUserServiceList = async (ctx) => {
    const body = ctx.request.body || ctx.request.query;
    let query = body.query;
    if (util.isEmptyValue("tmpMonitorLogic.getUserServiceList", {
            openID: query.openID
        })) {
        ctx.body = {
            code: 500,
            msg: "error",
            error: "openID不能为空"
        };
    } else {
        let options = {
            sort: body.sort||{applyTime:-1},
            skip: (body.page - 1) * body.rows || 0,
            limit: body.rows || 10
        };
        if (body.keyword) {
            query.serviceName = new RegExp(body.keyword)
        }
        try {
            let procureList = await procureDAO.findProcureAll(query, options);
            let dataList = [];
            if (procureList.dataCount > 0) {
                // await Promise.all(procureList.dataList.map(async function (procureItem) {
                    for(let procureItem of procureList.dataList ){
                        let monitor = await tmpMonitorDAO.getOne({templateID: procureItem.templateID});
                        let cityName = '';
                        for (const item of procureItem.region) {
                            cityName += item.name;
                        }
                        //模板监控未启用时，没有监控时间，设置默认监控时间
                        if (!_.isEmpty(monitor)) {
                            monitor.time = monitor.time ? monitor.time : moment().hours(4).format('YYYY-MM-DD HH:mm:ss');
                            dataList.push(_.extend({time:monitor.time,statusCode: monitor.statusCode, city: cityName}, procureItem))
                        }else{
                            //未找到监控记录，设置默认监控时间，模板运行状态
                            dataList.push(_.extend({time : moment().hours(4).format('YYYY-MM-DD HH:mm:ss'),statusCode:"000000", city: cityName}, procureItem))
                        }
                    }
                // }));
            }
            ctx.body = {
                code: 200,
                msg: "success",
                results: {dataList: dataList, dataCount: procureList.dataCount}
            };
        } catch (err) {
            log4js.error(err);
            ctx.body = {
                code: 500,
                msg: "error",
                error: err
            };
        }
    }
}

exports.tmpMonitorLogic = tmpMonitorLogic;