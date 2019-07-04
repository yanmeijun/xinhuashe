const config = require("../../config"),
    util = require('../../lib/util').util;
let sameNameService = {};

sameNameService.getService = (params) => {
    return new Promise((resolve, reject) => {
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "1"://获取区县的名称和ID
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "pID": params.pID
                };
                break;
            case "2"://河南省重名查询
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "form_areaid": params.form_areaid,
                    "form_areaname": params.form_areaname,
                    "form_Name": params.queryName,
                };
                break;
            case "3"://海南省重名查询
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "xm": params.queryName
                };
                break;
            case "4"://江苏省重名查询
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "datas": "dhzkh'name':'" + params.queryName + "'dhykh"
                };
                break;
            case "5"://山西省重名查询
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "Name": params.queryName
                };
                break;
            case "6"://吉林省重名查询
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "CommndName": encodeURIComponent(JSON.stringify({"xm": params.queryName}))
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("重名查询taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("重名服务请求错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
}
exports.sameNameService = sameNameService;