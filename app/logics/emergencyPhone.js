const config = require("../../config"),
    util = require('../../lib/util').util;
let emergencyPhoneService = {};
emergencyPhoneService.postData = (params) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "1"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "configTitle": params.configTitle
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("领事保护应急电话查询taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("领事保护应急电话查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};
exports.emergencyPhoneService = emergencyPhoneService;