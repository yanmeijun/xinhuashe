const config = require("../../config"),
    util = require('../../lib/util').util;
let zywxReportService = {};

zywxReportService.postData = (params, next) => {
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
                    "telephone": params.telephone
                };
                break;
            case "4":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "verifyCode": params.verifyCode
                };
                break;
            default:
                body = params;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("中国互联网违法不良信息举报taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("中国互联网违法不良信息举报错误：" + err);
                reject(err)
            }
            resolve(body);
        })

    })
};
exports.zywxReportService = zywxReportService;