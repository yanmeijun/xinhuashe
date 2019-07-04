const config = require("../../config"),
    util = require('../../lib/util').util;
let anhuiHospitalService = {};
//安徽省预约挂号
anhuiHospitalService.postData = (params) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "3"://按医院查询和热门医院
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "pageNo": params.pageNo, "pageSize": params.pageSize, "lname": params.lname, "tname": params.tname,
                    "cid": params.cid, "odType": params.odType, "clevel": params.clevel
                };
                break;
            case "4"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "keyWord": params.keyWord, "cateId": params.cateId, "currentPage": params.currentPage
                };
                break;
            case "5"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "shopId": params.shopId
                };
                break;
            case "7"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "shopId": params.shopId
                };
                break;
            case "6"://
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "pageNo": params.pageNo,
                    "pageSize": params.pageSize,
                    "shopId": params.shopId,
                    "depaId": params.depaId,
                    "dayTimes": params.dayTimes
                };
                break;
            case "8"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "hosId": params.hosId, "deptId": params.deptId, "doctorId": params.doctorId
                };
                break;
            case "9"://
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "hosId": params.hosId,
                    "deptId": params.deptId,
                    "doctorId": params.doctorId,
                    "doctorName": params.doctorName
                };
                break;
            case "10"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "pageSize": params.pageSize, "pageNo": params.pageNo
                };
                break;
            case "11"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "depaId": params.depaId, "sourceId": params.sourceId, "dateTime": params.dateTime,
                    "period": params.period, shopId: params.shopId
                };
                break;
            case "12"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "depaId": params.depaId, "nsId": params.nsId, "dayTimes": params.dayTimes,
                    shopId: params.shopId
                };
                break;
            case "14"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "orderId": params.orderId
                };
                break;
            case "18"://
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "FRIEND_NAME": params.FRIEND_NAME,
                    "FRIEND_GENDER": params.FRIEND_GENDER,
                    "FRIEND_AGE": params.FRIEND_AGE,
                    "FRIEND_SFCODE": params.FRIEND_SFCODE,
                    "FRIEND_MOBILE": params.FRIEND_MOBILE,
                    "FRIEND_ADDR": params.FRIEND_ADDR,
                    "FRIEND_CARD_NUM": params.FRIEND_CARD_NUM
                };
                break;
            case "15"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "pageNo": params.pageNo, "pageSize": params.pageSize, "keyword": params.keyword,
                    "stime": params.stime, "etime": params.etime
                };
                break;
            case "16"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "orderId": params.orderId, "hosId": params.hosId
                };
                break;
            case "2"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "mobile": params.mobile, "password": params.password, "challenge": params.challenge,
                    "validate": params.validate, "seccode": params.seccode
                };
                break;
            case "1"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "21"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "mobile": params.mobile, "vcode": params.vcode, "password": params.password
                };
                break;
            case "17"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "19"://
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "mobile": params.mobile,
                    "randomCode": params.randomCode,
                    "challenge": params.challenge,
                    "validate": params.validate,
                    "seccode": params.seccode,
                    "type": params.type
                };
                break;
            case "20"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "mobile": params.mobile, "vcode": params.vcode, "password": params.password, "name": params.name,
                    "sfcode": params.sfcode, "province": params.province
                };
                break;
            case "13"://
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "friendBirthday": params.friendBirthday,
                    "patientCard": params.patientCard,
                    "num": params.num,
                    "tzbNum": params.tzbNum,
                    "jhName": params.jhName,
                    "jhSfcode": params.jhSfcode,
                    "jhMobile": params.jhMobile,
                    "nsId": params.nsId,
                    "nsName": params.nsName,
                    "nsPrice": params.nsPrice,
                    "depaId": params.depaId,
                    "depaName": params.depaName,
                    "lockNo": params.lockNo,
                    "hosId": params.hosId,
                    "nsTime": params.nsTime,
                    "nsPeriod": params.nsPeriod,
                    "nsDoctorseq": params.nsDoctorseq,
                    "gender": params.gender,
                    "urlsearch": params.urlsearch,
                    "name": params.name,
                    "age": params.age,
                    "sfcode": params.sfcode,
                    "address": params.address,
                    "mobile": params.mobile
                };
                break;
            case "22"://
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "hosId": params.hosId,
                    "deptId": params.deptId,
                    "doctorId": params.doctorId,
                    "doctorName": params.doctorName
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("安徽省预约挂号taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("安徽省预约挂号查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.anhuiHospitalService = anhuiHospitalService;
