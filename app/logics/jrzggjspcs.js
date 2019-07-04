const config = require("../../config"),
    util = require('../../lib/util').util;
let jrzggjspcsService = {};
jrzggjspcsService.postData = (params) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "4":
                body={
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "contactName" : params.contactName, "address" : params.address,"telePhone":params.telePhone,
                    "idNo":params.idNo,"placeCode":params.placeCode
                }
                break;
            case "1"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "4.1"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "reserveCode": params.reportRand, "f_code": params.reportImg,
                    "idNo":params.cardID,"phone":params.tel
                };
                break;
            case "2":
                body={
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "reserveDate" : params.reserveDate, "reserveTime" : params.reserveTime,"applyId":params.applyId
                }
                break;
            case "3":
                body={
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                }
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("加入中国国籍审批初审taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("加入中国国籍审批初审错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.jrzggjspcsService = jrzggjspcsService;