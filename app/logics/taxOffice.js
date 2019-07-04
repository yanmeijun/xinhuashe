const config = require("../../config"),
    util = require('../../lib/util').util;
let taxOfficeService = {};

taxOfficeService.taxOffice = (params, next) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "1":
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "articleField02": params.articleField02,
                    "articleField03": params.articleField03,
                    "articleField07": params.articleField07,
                    "articleField09": params.articleField09,
                    "cPage": params.cPage,
                    "scount": params.scount,
                    "randCode": params.randCode
                };
                break;
            case "3":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "4":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "verifyCode": params.verifyCode
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("税务事务所taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("税务事务所查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })

};

exports.taxOfficeService = taxOfficeService;