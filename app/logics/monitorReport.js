const config = require("../../config"),
    util = require('../../lib/util').util;
let monitorReportService = {};
monitorReportService.postData = (params) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "2"://
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "reportName": params.reportName,
                    "reportDept": params.reportDept,
                    "reportPosition": params.reportPosition,
                    "reportArea": params.reportArea,
                    "reportArea": params.reportArea,
                    "reportLevelId": params.reportLevelId,
                    "title": params.title,
                    "reportQuestionId1": params.reportQuestionId1,
                    "reportQuestionId": params.reportQuestionId,
                    "reportQuestion": params.reportQuestion,
                    "content": params.content,
                    "userName": params.userName,
                    "userIdCard": params.userIdCard,
                    "userContact": params.userContact,
                    "userPoliticalId": params.userPoliticalId,
                    "userPolitical": params.userPolitical,
                    "userAddress": params.userAddress,
                    "userLevelId": params.userLevelId,
                    "uploadify": params.uploadify
                };
                break;
            case "3"://
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "reportProvince": params.reportProvince,
                    "reportProvinceId": params.reportProvinceId,
                    "reportCity": params.reportCity,
                    "reportCityId": params.reportCityId,
                    "reportCounty": params.reportCounty,
                    "reportCountyId": params.reportCountyId,
                    "reportArea": params.reportArea,
                    "reportPolitical": params.reportPolitical,
                    "reportLevel": params.reportLevel,
                    "reportSpecial": params.reportSpecial,
                    "reportState": params.reportState,
                    "reportProvinceCode": params.reportProvinceCode,
                    "reportCityCode": params.reportCityCode,
                    "reportCountyCode": params.reportCountyCode,
                    "reportType": params.reportType,
                    "fileIds": params.fileIds,
                    "submitAreaCode": params.submitAreaCode,
                    "userName": params.userName,
                    "userIdCard": params.userIdCard,
                    "userContact": params.userContact,
                    "userAddress": params.userAddress,
                    "reportName": params.reportName,
                    "reportDept": params.reportDept,
                    "reportPosition": params.reportPosition,
                    "reportLevelCode": params.reportLevelCode,
                    "reportTitle": params.reportTitle,
                    "reportQuestionId1": params.reportQuestionId1,
                    "reportQuestionCode": params.reportQuestionCode,
                    "reportContent": params.reportContent,
                    "reportLevelId": params.reportLevelId,
                    "title": params.title,
                    "reportQuestionId": params.reportQuestionId,
                    "reportQuestion": params.reportQuestion,
                    "reportImg": params.reportImg,
                    "reportRand": params.reportRand,
                    "configurl": params.configurl,
                    "userPoliticalCode": params.userPoliticalCode,
                    "userPolitical": params.userPolitical,
                    "userPoliticalId": params.userPoliticalId,
                    "userLevelId": params.userLevelId,
                    "userLevelCode": params.userLevelCode,
                    "uploadify": params.uploadify,
                    "userLevel": params.userLevel,
                    "content": params.content
                };
                break;
            case "1"://
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "configurl": params.configurl
                };
                break;
            case "4"://
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "reportRand": params.reportRand,
                    "img": params.img,
                    "configurl": params.configurl,
                    "reportImg": params.reportImg
                };
                break;
            case "3.1"://
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "reportImg": params.reportImg,
                    "submitAreaCode": params.submitAreaCode,
                    "configurl": params.configurl,
                    "img": params.img,
                    "reportContent": params.reportContent
                };
                break;
            case "5"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "configurl": params.configurl
                };
                break;
            case "6"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "configurl": params.configurl
                };
                break;
            case "7"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "configurl": params.configurl
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("纪检监察机关举报taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("纪检监察机关举报错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.monitorReportService = monitorReportService;