const config = require("../../config"),
    util = require('../../lib/util').util;
let chainCardService = {};
// 统一社会信用代码查询列表 企业经营异常名录查询详情地址
chainCardService.search = (params, next) => {
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
            case "2":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "reserveDate": params.reserveDate, "reserveTime": params.reserveTime, "applyId": params.applyId
                }
                break;
            case "3":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
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
        console.log("外国人在华居住证代码查询taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("外国人在华居住证查询时错误：" + err);
                reject(err)
            }
            resolve(body);
        })

    })
};
exports.chainCardService = chainCardService;