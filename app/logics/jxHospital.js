const config = require("../../config"),
    util = require('../../lib/util').util;
let jxHospitalService = {};

jxHospitalService.postData = (params, next) => {
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
                    "cityRegId": params.cityRegId
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
                    "hospitalId": params.hosId
                };
                break;
            case "5":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "hosName": params.hosName, "deptName": params.deptName, "pageIndex": params.pageIndex
                };
                break;
            case "6":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "hospitalId": params.hospitalId, "deptId": params.deptId, "city": params.city,
                    "pageSize": params.pageSize, "pageIndex": params.pageIndex
                };
                break;
            case "7":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "hosId": params.hosId, "deptId": params.deptId, "doctorId": params.doctorId
                };
                break;
            case "8":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "shitCode": params.shitCode, "type": params.type
                };
                break;
            case "9":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "UserName": params.UserName, "Password": params.Password, "Code": params.Code
                };
                break;
            case "10.2":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "10":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "bussKey": params.bussKey, "hospitalName": params.hospitalName, "deptName": params.deptName,
                    "doctorName": params.doctorName
                };
                break;
            case "11":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "hospitalCode": params.hospitalCode
                };
                break;
            case "12":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "bussKey": params.bussKey, "contactId": params.contactId
                };
                break;
            case "13":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "pageIndex": params.pageIndex, "pageSize": params.pageSize, "processStatus": params.processStatus,
                    "startTime": params.startTime, "endTime": params.endTime
                };
                break;
            case "14":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "orderId": params.orderId
                };
                break;
            case "15":
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "birthDate": params.birthDate,
                    "city": params.city,
                    "idenNo": params.idenNo,
                    "phone": params.phone,
                    "patientName": params.patientName,
                    "sex": params.sex,
                    "isChildren": params.isChildren,
                    "guardianIdenNo": params.guardianIdenNo,
                    "guardianName": params.guardianName,
                    "guardianPhone": params.guardianPhone,
                    "guardianshipRelationship": params.guardianshipRelationship
                };
                break;
            case "16":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "phone": params.phone, "type": params.type
                };
                break;
            case "17":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "realName": params.realName, "identityNO": params.identityNO, "password": params.password,
                    "userName": params.userName, "phone": params.phone, "validateCode": params.validateCode
                };
                break;
            case "18":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "pwd": params.pwd, "userName": params.userName, "phone": params.phone,
                    "valiCode": params.valiCode
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
        console.log("江西挂号taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("江西挂号错误：" + err);
                reject(err)
            }
            resolve(body);
        })

    })
};
exports.jxHospitalService = jxHospitalService;