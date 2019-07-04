const config = require("../../config"),
    util = require('../../lib/util').util;
let passportService = {};
//
passportService.postData = (params) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "1"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                };
                break;
            case "2"://
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "sldw": params.sldw,
                    "cnzz_eid": params.cnzz_eid,
                    "umuuid": params.umuuid,
                    "rnd": params.rnd,
                };
                break;
            case "3"://
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "sldw": params.sldw
                };
                break;
            case "4"://
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "sldw": params.sldw
                };
                break;
            case "5"://
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "sldw": params.sldw
                    ,
                    "wsyyrq": params.wsyyrq
                };
                break;
            case "6"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "zwzf": params.zwzf
                };
                break;
            case "7"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "9"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "10"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "11"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "province": params.province
                };
                break;
            case "12"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "city": params.city
                };
                break;
            case "15"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "bzlx": params.bzlx, "pthzlb": params.pthzlb, "qzfs": params.qzfs, "yzbm": params.yzbm,
                    "txtXML": params.txtXML
                };
                break;
            case "16"://
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "sldw": params.sldw,
                    "wsyyrq": params.wsyyrq,
                    "wsyysj": params.wsyysj,
                    "provinceCode": params.provinceCode,
                    "cityCode": params.cityCode
                };
                break;
            case "18"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "csrq": params.csrq, "yymm": params.yymm
                };
                break;
            case "19"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "sqxxId": params.sqxxId
                };
                break;
            case "20"://
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "sldw": params.sldw,
                    "cnzz_eid": params.cnzz_eid,
                    "umuuid": params.umuuid,
                    "rnd": params.rnd,
                    showp: params.showp
                };
                break;
            default:
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
        console.log("出入境办理taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            console.log(body)
            if (err) {
                console.error("出入境办理错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.passportService = passportService;