const config = require("../../config"),
    util = require('../../lib/util').util;
let GzOnlineWorkService = {};

GzOnlineWorkService.GzOnlineWork = (params, next) => {
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
                    "username": params.username, "password": params.password, "piccode": params.piccode
                };
                break;
            case "10":
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "areaid": params.areaid,
                    "departmentid": params.departmentid,
                    "permissionitemId": params.permissionitemId,
                    "createtime": params.createtime
                };
                break;
            case "8":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "areaid": params.areaid
                };
                break;
            case "9":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "deptId": params.deptId
                };
                break;
            case "11":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "pageNo": params.pageNo
                };
                break;
            default:
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("贵州省网上办事大厅taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("贵州省网上办事大厅错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })

};

exports.GzOnlineWorkService = GzOnlineWorkService;