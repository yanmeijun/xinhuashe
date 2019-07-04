const config = require("../../config"),
    util = require('../../lib/util').util;
let corruptionReportService = {};
corruptionReportService.postData = (params) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "1"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "1.1"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "1.2"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "2"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "img": params.img
                };
                break;
            case "3"://
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "userName": params.userName,
                    "userIdCard": params.userIdCard,
                    "userContact": params.userContact,
                    "userPoliticalId": params.userPoliticalId,
                    "userPolitical": params.userPolitical,
                    "userAddress": params.userAddress,//举报人现居住地址
                    "userLevelId": params.userLevelId,
                    "userLevel": params.userLevel,
                    "reportLevelId": params.reportLevelId,
                    "reportName": params.reportName,
                    "reportDept": params.reportDept,
                    "reportPosition": params.reportPosition,
                    "reportArea": params.reportArea,
                    "reportProvince": params.reportProvince, //被举报人单位
                    "reportProvinceId": params.reportProvinceId,
                    "reportCity": params.reportCity,
                    "reportCityId": params.reportCityId,
                    "reportLevel": params.reportLevel, //
                    "title": params.title,
                    "reportQuestionTypeId": params.reportQuestionTypeId,
                    "reportQuestionType": params.reportQuestionType, //问题类别
                    "reportQuestionId": params.reportQuestionId,
                    "reportQuestion": params.reportQuestion,
                    "content": params.content,
                    "reportRand": params.reportRand,
                    "fileIds": params.fileIds,
                    "reportCounty": params.reportCounty,
                    "reportCountyId": params.reportCountyId
                };
                break;
            case "4"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "5"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "reportRand": params.reportRand, "img": params.img
                };
                break;
            case "6"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "7"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "8"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "9"://
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
        console.log("反腐败国际追逃追赃举报taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("反腐败国际追逃追赃举报错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.corruptionReportService = corruptionReportService;