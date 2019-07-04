const config = require("../../config"),
    util = require('../../lib/util').util;
let teacherQualificationService = {};

//中小学教师资格证获取验证码
teacherQualificationService.getScoreSearch = (params, next) => {
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
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "name": params.name, "zjhm": params.zjhm, "yzm": params.yzm
                };
                break;
            case "3":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "6":
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "verify": params.verify,
                    "zkzh": params.zkzh,
                    "sfzh": params.sfzh,
                    "name": params.name,
                    "ksnf": params.ksnf
                };
                break;
            case "4":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("中小学教师资格证考试成绩taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("中小学教师资格证考试成绩查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};
exports.teacherQualificationService = teacherQualificationService;