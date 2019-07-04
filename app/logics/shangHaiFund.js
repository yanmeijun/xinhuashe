const config = require("../../config"),
    util = require('../../lib/util').util;
let shangHaiFundService = {};
//上海公积金查询
shangHaiFundService.all = (params) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "1"://图片验证码
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "3"://登陆
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "ID": params.ID,
                    "username": params.username,
                    "password": params.password,
                    "imagecode": params.imagecode,
                    "password_md5": params.password_md5,
                    "SUBMIT.x": params["SUBMIT.x"],
                    "SUBMIT.y": params["SUBMIT.y"]
                };
                break;
            case "4"://历史详情
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "ID": params.ID
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("上海公积金taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            console.log(body)
            if (err) {
                console.error("上海公积金查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.shangHaiFundService = shangHaiFundService;