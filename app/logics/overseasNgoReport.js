const config = require("../../config"),
    util = require('../../lib/util').util;
let overseasNgoReportService = {};
overseasNgoReportService.postData = (params) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            /*验证码下载*/
            case "1":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,

                };
                break;
            /*实名举报*/
            case "3"://
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "reportType": params.reportType,
                    'reportDate': params.reportDate,
                    "reportRegion": params.reportRegion,
                    "reportAddress": params.reportAddress,
                    "reportReason": params.reportReason,
                    "type": params.type,
                    "reportName": params.reportName,
                    "idcardType": params.idcardType,
                    'reportId': params.reportId,
                    "reportPhone": params.reportPhone,
                    "validCode": params.validCode
                };
                break;

        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("境外非政府组织办事服务平台taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("境外非政府组织办事服务平台错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.overseasNgoReportService = overseasNgoReportService;