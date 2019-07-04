const config = require("../../config"),
    util = require('../../lib/util').util;
let knowledgeReportService = {};

knowledgeReportService.postData = (params, next) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "2":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "IDX": params.IDX
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
        console.log("知识产权投诉举报taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("知识产权投诉举报错误：" + err);
                reject(err)
            }
            resolve(body);
        })

    })
};
exports.knowledgeReportService = knowledgeReportService;