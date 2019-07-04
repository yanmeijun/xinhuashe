const config = require("../../config"),
    util = require('../../lib/util').util;
let sDHospitalService = {};

sDHospitalService.postData = (params, next) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        // const url = "http://127.0.0.1:8086/api/publicService";
        let body;
        switch (params.taskId) {
            case "1":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "page": params.page, "pageSize": params.pageSize, "hospitalType": params.hospitalType,
                    "hospitalLevel": params.hospitalLevel, "hospitalCant": params.hospitalCant
                };
                break;
            case "2":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "page": params.page, "checkStr": params.checkStr
                };
                break;
            case "3":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "hosId": params.hosId
                };
                break;
            case "4":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "hospitalId": params.hospitalId, "branchId": params.branchId, "hospitalCode": params.hospitalCode
                };
                break;
            case "5":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "hospitalId": params.hospitalId, "branchId": params.branchId, "deptId": params.deptId
                };
                break;
            case "6":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "scheduleAmPmId": params.scheduleAmPmId, "hospitalCode": params.hospitalCode
                };
                break;
            case "7":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "docId": params.docId, "deptId": params.deptId
                };
                break;
            case "9":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "mobile": params.mobile, "password": params.password, "code": params.code
                };
                break;
            case "10":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "mobile": params.mobile, "imgCode": params.imgCode
                };
                break;
            case "11":
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "mobile": params.mobile,
                    "idCard": params.idCard,
                    "conformIdCard": params.conformIdCard,
                    "password": params.password,
                    "conformPassword": params.conformPassword,
                    "email": params.email,
                    "realName": params.realName,
                    "sMSCode": params.sMSCode,
                    "code": params.code,
                    "imgCode": params.imgCode
                };
                break;
            case "13":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "mobile": params.mobile
                };
                break;
            case "14":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "mobile": params.mobile, "newPassword": params.newPassword, "code": params.code
                };
                break;
            case "16":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "scheduleAmPmId": params.scheduleAmPmId
                };
                break;
            case "18":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "name": params.name, "idNum": params.idNum, "sex": params.sex, "userRelation": params.userRelation,
                    "mobile": params.mobile, "oldmobile": params.oldmobile, "citySelect": params.citySelect,
                    "liveCantCode": params.liveCantCode, "address": params.address
                };
                break;
            case "20":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "docName": params.docName, "hospitalName": params.hospitalName, "deptName": params.deptName,
                    "opType": params.opType, "scheduleDate": params.scheduleDate, "amOrPm": params.amOrPm,
                    "arAmt": params.arAmt, "treatName": params.treatName, "treatId": params.treatId,
                    "beginTime": params.beginTime, "endTime": params.endTime, "regionid": params.regionid,
                    "ampmid": params.ampmid, "hospitalId": params.hospitalId, "deptId": params.deptId,
                    "docId": params.docId, "medicalCardNum": params.medicalCardNum, "docCode": params.docCode,
                    "deptCode": params.deptCode, "hosCode": params.hosCode, "branchId": params.branchId,
                    "branchName": params.branchName, "schDateType": params.schDateType, "appNum": params.appNum,
                    "isPatientCard": params.isPatientCard, "idCardNum": params.idCardNum
                };
                break;
            case "21":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "page": params.page, "pageSize": params.pageSize, "state": params.state,
                    "startTime": params.startTime, "endTime": params.endTime
                };
                break;
            case "22":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "id": params.id, "state": params.state
                };
                break;
            default:
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
        }
        ;
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("山东挂号taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("山东挂号错误：" + err);
                reject(err)
            }
            resolve(body);
        })

    })
};
exports.sDHospitalService = sDHospitalService;