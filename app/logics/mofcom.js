const config = require("../../config"),
    util = require('../../lib/util').util;
let mofcomService = {};

mofcomService.postData = (params, next) => {
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
                    "keyword": params.keyword
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("商务法规查询请求serviceId：" + params.serviceId + "请求taskId：" + params.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("商务法规查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};
exports.mofcomService = mofcomService;
