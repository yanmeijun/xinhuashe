const config = require("../../config"),
    util = require('../../lib/util').util;
let gunviolenceReportService = {};
gunviolenceReportService.postData = (params) => {
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
            case "2":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "txtName":params.txtname,"tel": params.tel,"xingming": params.name,"didian": params.address,"txtContent": params.txtcontent,"rand": params.reportImg
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("涉枪涉暴违法举报taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("涉枪涉暴违法举报错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.gunviolenceReportService = gunviolenceReportService;