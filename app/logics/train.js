const config = require("../../config"),
    util = require('../../lib/util').util;
let trainService = {};

trainService.postData = (params, next) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "1":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "ticket_no": params.ticket_no, depart_date: params.depart_date
                };
                break;
            case "3":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "stationName": params.stationName
                };
                break;
            case "5":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "leftTicketDTO.train_date": params.trainDate, "leftTicketDTO.from_station": params.departCode,
                    "leftTicketDTO.to_station": params.destinationCode, "purpose_codes": params.purposeCodes
                };
                break;
            case "6":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "7":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "cz": params.cz, "cc": params.cc, "cxlx": params.cxlx, "rq": params.rq, "czEn": params.czEn,
                    "tp": params.tp
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("12306查询请求serviceId：" + params.serviceId + "请求taskId：" + params.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("12306查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

// //火车票预售期查询
// trainService.searchDate = (param) => {
//     const url = config.get("api.apiInfo.host_199") + "/12306cx/rqcx?iw-apikey=" + config.get("api.apiInfo.apikey_199") + "&iw-cmd=rqcx";
//     console.log("火车票预售期查询地址:" + url);
//     return new Promise(function (resolve, reject) {
//         util.getData(url, {rejectUnauthorized: false}, (err, body) => {
//             if (err) {
//                 console.error("火车票预售期查询信息报错:%s" + err);
//                 reject(err);
//             } else {
//                 resolve(body);
//             }
//         });
//     });
// }
exports.trainService = trainService;
