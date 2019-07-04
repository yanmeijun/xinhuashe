const config = require("../../config"),
    util = require('../../lib/util').util;
let beiJingPassportService = {};
beiJingPassportService.search = (params, next) => {
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
                    "contactName": params.contactName, "address": params.address, "telePhone": params.telePhone,
                    "idNo": params.idNo, "placeCode": params.placeCode
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
        console.log("北京出入境taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("北京出入境查询时错误：" + err);
                reject(err)
            }
            resolve(body);
        })

    })
};
exports.beiJingPassportService = beiJingPassportService;