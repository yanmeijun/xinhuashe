const config = require("../../config"),
    util = require('../../lib/util').util;
let postgraduateService = {};

postgraduateService.postData = (params, next) => {
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
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "3":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "xm": params.xm, "zjhm": params.zjhm, "ksbh": params.ksbh, "ssdm": params.ssdm,
                    "bkdwdm": params.bkdwdm, "checkcode": params.captcha
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("研究生初试成绩taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("研究生初试成绩查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })

};

exports.postgraduateService = postgraduateService;