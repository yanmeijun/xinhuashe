const config = require("../../config"),
    util = require('../../lib/util').util;

let unhealthyService = {};
unhealthyService.unhealthyMessage = (params, next) => {
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
                    "code": params.code, "jbphone": params.jbphone
                };
                break;
            case "4":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "sms_content": params.sms_content, "phone": params.phone, "sms_phone": params.sms_phone,
                    "phonecode": params.phonecode, "code": params.code
                };
                break;
            case "7":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "sms_content": params.sms_content, "code": params.code
                };
                break;
            case "9":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "content": params.content, "type": params.type, "url": params.url, "code": params.code
                };
                break;
            case "17":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "code": params.code, "phone": params.phone
                };
                break;
            case "20":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "code": params.code
                };
                break;
            case "11":
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "code": params.code,
                    "sms_content": params.sms_content,
                    "called_time": params.called_time,
                    "phone": params.phone,
                    "sms_phone": params.sms_phone,
                    "duration_time": params.duration_time,
                    "sms_code": params.sms_code,
                    "bad_type": params.bad_type
                };
                break;
            case "14":
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "code": params.code,
                    "sms_content": params.sms_content,
                    "called_time": params.called_time,
                    "phone": params.phone,
                    "sms_phone": params.sms_phone,
                    "duration_time": params.duration_time,
                    "sms_code": params.sms_code,
                    "bad_type": params.bad_type,
                    "type": params.type
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("12321网络不良与垃圾信息举报taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("12321网络不良与垃圾信息举报受理中心接口错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};


exports.unhealthyService = unhealthyService;