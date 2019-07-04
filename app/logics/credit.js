const config = require("../../config"),
    util = require('../../lib/util').util;
let creditService = {};
// 统一社会信用代码查询列表 企业经营异常名录查询详情地址
creditService.allProblemEntList = (params, next) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        ;
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "2":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "page": params.page, "keyword": params.keyword
                }
                break;
            case "3":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "name": params.name, "encryStr": params.encryStr
                }
                break;
        }
        ;
        const options = {
            rejectUnauthorized: false,//一个忽略证书验证得字段
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("统一社会信用代码查询taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("统一社会信用代码查询情错误：" + err);
                reject(err)
            }
            resolve(body);
        })

    })
};


creditService.allDishonestyList = (params, next) => {
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
                    "page": params.page, "keyword": params.keyword
                }
                break;
            case "2":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "name": params.name, "encryStr": params.encryStr
                }
                break;
        }
        ;
        const options = {
            rejectUnauthorized: false,//一个忽略证书验证得字段
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("统一社会信用代码查询地址：" + url);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("统一社会信用代码查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })

    })
};
exports.creditService = creditService;