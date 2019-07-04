const config = require("../../config"),
    util = require('../../lib/util').util;
let hospitalService = {};

hospitalService.allHospitalInfo = (params, next) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空!");
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "1":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "words": params.words
                };
                break;
            case "2":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "id": params.id
                };
                break;
            case "3":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "idPath": params.idPath
                };
                break;
            case "3.1":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "hospitalId": params.hospitalId,"departmentId": params.departmentId,"relType":params.relType,
                    "sdFirstId" : params.sdFirstId,"sdSecondId":params.sdSecondId,"departmentName":params.departmentName,
                    "week" : params.week
                };
                break;
            case "4":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "6":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "hospitalId": params.hospitalId, "departmentId": params.departmentId,
                    "dutyDate": params.dutyDate
                };
                break;
            case "5":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "mobileNo": params.mobileNo, "password": params.password, "yzm": params.yzm
                };
                break;
            case "7":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "hospitalId": params.hospitalId, "departmentId": params.departmentId, "doctorId": params.doctorId,
                    "dutySourceId": params.dutySourceId
                };
                break;
            case "8":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "provinceId": params.provinceId, "sign": params.sign
                };
                break;
            case "9":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "cityId": params.cityId, "sign": params.sign
                };
                break;
            case "10":
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "userName": params.userName,
                    "idType": params.idType,
                    "isshefn": params.isshefn,
                    "isshefnAgain": params.isshefn,
                    "sms": params.sms,
                    "passWord": params.passWord,
                    "passWordAgain": params.passWord,
                    "province": params.province,
                    "city": params.city,
                    "county": params.county,
                    "code": params.code
                };
                break;
            case "11":
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "name": params.name,
                    "sex": params.sex,
                    "idType": params.idType,
                    "idNo": params.idNo,
                    "cardNoConfirm": params.cardNoConfirm,
                    "password": params.password,
                    "passwordConfirm": params.passwordConfirm,
                    "provinceId": params.provinceId,
                    "cityId": params.cityId,
                    "countyId": params.countyId,
                    "mobileNo": params.mobileNo,
                    "code": params.code,
                    "smsCode": params.smsCode,
                    "birthday": params.birthday
                };
                break;
            case "13":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "14":
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "patientId": params.patientId,
                    "reimbursementType": params.reimbursementType,
                    "hospitalCardId": params.hospitalCardId,
                    "hospitalId": params.hospitalId,
                    "medicareCardId": params.medicareCardId,
                    "doctorId": params.doctorId,
                    "dutySourceId": params.dutySourceId,
                    "smsVerifyCode": params.smsVerifyCode,
                    "departmentId": params.departmentId
                };
                break;
            case "15":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "sms": params.sms, "code": params.code, "userName": params.userName,
                    "idType": params.idType, "provinceId": params.provinceId, "cityId": params.cityId,
                    "countyId": params.countyId, "isshefn": params.isshefn
                };
                break;
            case "16":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "mobileNo": params.mobileNo, "tpyzm": params.tpyzm, "name": params.name, "sex": params.sex,
                    "idType": params.idType, "provinceId": params.provinceId, "cityId": params.cityId,
                    "countyId": params.countyId, "idNo": params.idNo, "verifyCode": params.verifyCode,
                    "birthday": params.birthday
                };
                break;
            case "17":
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "orderType": params.orderType,
                    "startDate": params.startDate,
                    "endDate": params.endDate,
                    "page": params.page
                };
                break;
            case "18":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "orderId": params.orderId, "hospitalType": params.hospitalType
                };
                break;
            case "20":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "sign": params.sign
                };
                break;
            case "21":
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
        console.log("北京预约挂号taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("北京预约挂号错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
}
exports.hospitalService = hospitalService;