const config = require("../../config"),
    util = require('../../lib/util').util;
let cancelPermitService = {};

cancelPermitService.cancelPermit = (params, next) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "5":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "department": params.department, "pageNo": params.pageNo, "searchContent": params.searchContent
                };
                break;
            case "7":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "department": params.department, "pageNo": params.pageNo, "searchContent": params.searchContent
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("取消的职业资格许可和认定事项taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("取消的职业资格许可和认定事项查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })

};

exports.cancelPermitService = cancelPermitService;