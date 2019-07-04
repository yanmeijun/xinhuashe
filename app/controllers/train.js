const urlParse = require('url'),
    moment = require('moment'),
    util = require('../../lib/util').util,
    userLogDAO = require('../dao/userLog').userLogDAO,
    trainService = require("../logics/train").trainService;
let trainCon = {};

trainCon.getCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("火车票请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};

// //火车时刻表查询_可选日期查询
// const searchDate = (req, res, next) => {
//     const params = {
//         randomKey: req.body.randomKey,
//         userID: req.body.userID,
//         clientID: req.body.clientID,
//         cityID: req.body.cityID,
//         local_x: req.body.local_x,
//         local_y: req.body.local_y
//     };
//     if (util.isEmptyValue("trainCon.searchDate", params)) {
//         res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
//     } else {
//         trainService.searchDate(params).then((content) => {
//             res.send(content);
//         }).catch((err) => {
//             res.send(err);
//         })
//     }
// };
//火车起售时间查询
const searchStartTime = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "12306",
        taskId: "3",
        randomKey: req.body.randomKey,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y,
        stationName: req.body.stationName
    };
    if (util.isEmptyValue("trainCon.searchStartTime", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        trainService.postData(params).then((content) => {
            content.responseBody.data = JSON.parse(content.responseBody.data);
            res.send(content);
            var logData = {
                localFrom: req.body.localFrom,//项目用户名称
                clientID: req.body.clientID,//用户设备ID
                serviceID: "AAC0002",//前台服务ID
                templateID: "12306",//引擎模板服务ID
                taskId: "3",//引擎模板服务taskID
                taskName: "火车起售时间查询",//服务名称
                params: {//请求参数
                    stationName: req.body.stationName
                },
                results: JSON.stringify(content)//返回结果
            };
            userLogDAO.add(logData);
        }).catch((err) => {
            res.send(err);
        })
    }
};
//火车时刻表查询
const searchTime = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "12306",
        taskId: "1",
        randomKey: req.body.randomKey,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y,
        ticket_no: req.body.ticketNo,
        depart_date: req.body.date
    };
    if (util.isEmptyValue("trainCon.searchTime", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        trainService.postData(params).then((content) => {
            res.send(content);
            var logData = {
                localFrom: req.body.localFrom,//项目用户名称
                clientID: req.body.clientID,//用户设备ID
                serviceID: "AAC0001",//前台服务ID
                templateID: "12306",//引擎模板服务ID
                taskId: "1",//引擎模板服务taskID
                taskName: "火车时刻表查询",//服务名称
                params: {//请求参数
                    ticket_no: req.body.ticketNo,
                    depart_date: req.body.date
                },
                results: JSON.stringify(content)//返回结果
            };
            userLogDAO.add(logData);
        }).catch((err) => {
            res.send(err);
        })
    }
};
//火车票余票查询
const searchRemainTicket = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "12306",
        taskId: "5",
        randomKey: req.body.randomKey,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y,
        fromStation: req.body.fromStation,
        departCode: req.body.departCode,//出发地code
        toStation: req.body.toStation,
        destinationCode: req.body.destinationCode,//到达地code
        trainDate: req.body.trainDate,
        purposeCodes: req.body.purposeCodes
    };
    if (util.isEmptyValue("trainCon.searchRemainTicket", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        trainService.postData(params).then((content) => {
            res.send(content);
            var logData = {
                localFrom: req.body.localFrom,//项目用户名称
                clientID: req.body.clientID,//用户设备ID
                serviceID: "AAC0003",//前台服务ID
                templateID: "12306",//引擎模板服务ID
                taskId: "5",//引擎模板服务taskID
                taskName: "火车票余票查询",//服务名称
                params: {//请求参数
                    fromStation: req.body.fromStation,
                    departCode: req.body.departCode,//出发地code
                    toStation: req.body.toStation,
                    destinationCode: req.body.destinationCode,//到达地code
                    trainDate: req.body.trainDate,
                    purposeCodes: req.body.purposeCodes
                },
                results: JSON.stringify(content)//返回结果
            };
            userLogDAO.add(logData);
        }).catch((err) => {
            res.send(err);
        })
    }
};
/*新增接口 isQueryLocal*/
const isQueryLocal = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "12306",
        taskId: "6",
        randomKey: req.body.randomKey,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y
    };
    if (util.isEmptyValue("trainCon.isQueryLocal", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        trainService.postData(params).then((content) => {
            res.send(content);
            var logData = {
                localFrom: req.body.localFrom,//项目用户名称
                clientID: req.body.clientID,//用户设备ID
                serviceID: "AAC0004",//前台服务ID
                templateID: "12306",//引擎模板服务ID
                taskId: "6",//引擎模板服务taskID
                taskName: "火车晚点查询",//服务名称
                params: {//请求参数

                },
                results: JSON.stringify(content)//返回结果
            };
            userLogDAO.add(logData);
        }).catch((err) => {
            res.send(err);
        })
    }
}
//火车晚点查询
const trainLate = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "12306",
        taskId: "7",
        randomKey: req.body.randomKey,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y,
        cz: req.body.cz,//车站
        cc: req.body.cc,//车次
        cxlx: req.body.cxlx,//查询类型
        czEn: req.body.czEn//车站
    };
    if (util.isEmptyValue("trainCon.trainLate", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.rq = moment().format('YYYY-MM-DD');//日期
        params.tp = new Date().getTime();//当前时间戳
        trainService.postData(params).then((content) => {
            res.send(content);
            var logData = {
                localFrom: req.body.localFrom,//项目用户名称
                clientID: req.body.clientID,//用户设备ID
                serviceID: "AAC0004",//前台服务ID
                templateID: "12306",//引擎模板服务ID
                taskId: "7",//引擎模板服务taskID
                taskName: "火车晚点查询",//服务名称
                params: {//请求参数
                    cz: req.body.cz,//车站
                    cc: req.body.cc,//车次
                    cxlx: req.body.cxlx,//查询类型
                    czEn: req.body.czEn,//车站
                    rq: params.rq,
                    tp: params.tp
                },
                results: JSON.stringify(content)//返回结果
            };
            userLogDAO.add(logData);
        }).catch((err) => {
            res.send(err);
        })
    }
};
exports.trainCon = trainCon;