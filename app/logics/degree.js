const config = require("../../config"),
    util = require('../../lib/util').util;
let degreeService = {};

degreeService.postData = (params, next) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "1":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "2":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "checkcode": params.checkcode, "mobilephone": params.mobilephone, "xwzsbh": params.xwzsbh,
                    "xm": params.xm
                };
                break;
            case "4":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "queryID": params.queryID
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("学位证书查询请求serviceId：" + params.serviceId + " 请求taskId：" + params.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("学位证书查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.degreeService = degreeService;