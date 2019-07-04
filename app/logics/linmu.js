const config = require("../../config"),
    util = require('../../lib/util').util;
let linmuService = {};

//全国普通话考试成绩查询
linmuService.postData = (params, next) => {
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
                    "loginname": params.loginname, "loginpassword": params.loginpassword, "usertype": params.usertype,
                    "randcode": params.randcode
                };
                break;
            case "4.1":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "xm": params.xm, "zjhm": params.zjhm, "lxdh": params.lxdh, "lxdz": params.lxdz, "xmmc": params.xmmc
                };
                break;
            case "6":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
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
        console.log(body)
        console.log("林木种子生产经营许可证申请taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            console.log(body)
            if (err) {
                console.error("林木种子生产经营许可证申请错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};
exports.linmuService = linmuService;