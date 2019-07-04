const config = require("../../config"),
    util = require('../../lib/util').util;
let insuranceService = {};

insuranceService.postData = (params, next) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "3":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "idCode": params.idCode, "logPass": params.logPass, "safeCode": params.safeCode
                };
                break;
            case "4":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "i_phone": params.i_phone
                };
                break;
            case "7":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "searchYear": params.searchYear, "type": params.type
                };
                break;
            default:
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("北京社保查询serviceId：" + params.serviceId + " 请求taskId：" + params.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("北京社保查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })

};

exports.insuranceService = insuranceService;