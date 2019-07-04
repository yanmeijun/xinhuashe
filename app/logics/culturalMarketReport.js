const config = require("../../config"),
    util = require('../../lib/util').util;
let culturalMarketReportService = {};
culturalMarketReportService.postData = (params) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "1"://
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId
                };
                break;

            case "2":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "3":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "informid": params.informid,"name":params.name,"phone":params.phone,"email":params.email,
                    "content":params.content,"querycode":params.querycode,"codeConfirm":params.codeConfirm,
                    "department":params.department,"address":params.address,"verifycode":params.verifycode
                };
                break;
            case "5":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "querycode": params.querycode,"name": params.name,"verifycode": params.verifycode
                };
                break;
            case "7":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "querycode": params.querycode,"name": params.name
                };
                break;

        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("全国文化市场举报平台taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("全国文化市场举报平台错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.culturalMarketReportService = culturalMarketReportService;