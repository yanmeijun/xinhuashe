const config = require("../../config"),
    util = require('../../lib/util').util;
let ncreService = {};

//全国计算机等级证书查询
ncreService.certificate = (params, next) => {
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
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "2":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "examid": params.examid
                };
                break;
            case "3":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "verify": params.verify, "ksnf": params.ksnf, "bkjb": params.bkjb, "name": params.name,
                    "sfzh": params.sfzh, "zkzh": params.zkzh
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
        console.log("全国计算机等级证书taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("全国计算机等级证书查询报错:" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};
exports.ncreService = ncreService;