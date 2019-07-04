const config = require("../../config"),
    util = require('../../lib/util').util;
let mandarinService = {};

//全国普通话考试成绩查询
mandarinService.mandarinGrade = (params, next) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        ;
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "1":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "stuID": params.stuID, "idCard": params.idCard, "name": params.name
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
                    "certID": params.certID, "vCode": params.vCode, "idCard": params.idCard
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("全国普通话考试成绩taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("全国普通话考试成绩查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};
exports.mandarinService = mandarinService;