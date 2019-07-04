const config = require("../../config"),
    util = require('../../lib/util').util;
let shanxiHospitalService = {};
//陕西省预约挂号
shanxiHospitalService.allHospital = (params) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "1"://按医院和姓名进行查询
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "hosName": params.hosName, "pageSize": params.pageSize, "pageIndex": params.pageIndex
                };
                break;
            case "2"://按医院和姓名进行查询
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "hosName": params.hosName, "pageSize": params.pageSize, "pageIndex": params.pageIndex
                };
                break;
            case "26"://默认展示医院
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "pageSize": params.pageSize, "pageIndex": params.pageIndex

                };
                break;
            case "4"://医院的预约科室信息和所对应医院详情
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "hosId": params.hosId

                };
                break;
            case "27"://医院的预约科室信息和所对应医院详情
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "pId": params.pId, "hosCode": params.hosCode
                };
                break;
            case "6"://科室门诊详情 余量查询
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "hosCode": params.hosCode,
                    "deptCode": params.deptCode,
                    "pageSize": params.pageSize,
                    "pageIndex": params.pageIndex
                };
                break;
            case "28"://科室门诊详情 余量查询
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "hosCode": params.hosCode
                };
                break;
            case "7"://科室门诊详情 余量查询
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "hosCode": params.hosCode, "startDate": params.startDate, "maxRegDays": params.maxRegDays
                };
                break;
            case "29"://科室门诊详情 余量查询
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "hospId": params.hospId
                };
                break;
            case "5"://科室门诊详情
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "hosCode": params.hosCode

                };
                break;
            case "10"://点击有号按钮，选择就诊时间
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "doctorId": params.doctorId,
                    "deptCode": params.deptCode,
                    "hosCode": params.hosCode,
                    "regDate": params.regDate,
                    "isTime": params.isTime

                };
                break;
            case "8":
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "DocId": params.DocId,
                    "Deptcode": params.Deptcode,
                    "HosId": params.HosId,
                    "pageIndex": params.pageIndex,
                    "pageSize": params.pageSize
                };
                break;
            case "9"://获得排班的时间日历
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "doctorId": params.doctorId,
                    "deptCode": params.deptCode,
                    "hosCode": params.hosCode,
                    "pageIndex": params.pageIndex,
                    "pageSize": params.pageSize,
                    "maxRegDays": params.maxRegDays

                };
                break;
            case "17":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "docCode": params.docCode, "deptCode": params.deptCode, "hosCode": params.hosCode

                };
                break;
            case "30":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "deptCode": params.deptCode, "hosCode": params.hosCode
                };
                break;
            case "32":
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "patientbirthday": params.patientbirthday,
                    "patientmobile": params.patientmobile,
                    "patientidCode": params.patientidCode,
                    "patientuSex": params.patientuSex,
                    "patientidType": params.patientidType,
                    "regDateDate": params.regDateDate,
                    "returnFlag": params.returnFlag,
                    "patientuName": params.patientuName,
                    "hosId": params.hosId,
                    "mUserId": params.mUserId,
                    "corpId": params.corpId
                };
                break;
            case "18":
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "hospCode": params.hospCode,
                    "deptCode": params.deptCode,
                    "docCode": params.docCode,
                    "regDateDate": params.regDateDate,
                    "isTime": params.isTime,
                    "regLevel": params.regLevel,
                    "timeFlag": params.timeFlag,
                    "regFee": params.regFee,
                    "cliFee": params.cliFee,
                    "totalFee": params.totalFee,
                    "startTime": params.startTime,
                    "endTime": params.endTime,
                    "muserId": params.muserId,
                    "accountId": params.accountId
                };
                break;
            case "19":
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "uName": params.uName,
                    "idType": params.idType,
                    "uSex": params.uSex,
                    "birthday": params.birthday,
                    "idCode": params.idCode,
                    "mobile": params.mobile,
                    "address": params.address,
                    "mUserType": params.mUserType,
                    "accountId": params.accountId,
                    "muserId": params.muserId
                };
                break;
            case "20"://确认预约
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "hosId": params.hosId,
                    "deptId": params.deptId,
                    "doctorId": params.doctorId,
                    "regDate": params.regDate,
                    "timeFlag": params.timeFlag,
                    "startTime": params.startTime,
                    "endTime": params.endTime,
                    "payableFee": params.payableFee,
                    "returnFlag": params.returnFlag,
                    "regLevel": params.regLevel,
                    "openId": params.openId,
                    "ordType": params.ordType,
                    "address": params.address,
                    "birthday": params.birthday,
                    "regType": params.regType,
                    "idCardNo": params.idCardNo,
                    "cardNo": params.cardNo,
                    "cardType": params.cardType,
                    "idCardType": params.idCardType,
                    "patientuName": params.patientuName,
                    "patientType": params.patientType,
                    "sex": params.sex,
                    "mobile": params.mobile,
                    "parentIdCardNo": params.parentIdCardNo,
                    "parentIdCardType": params.parentIdCardType,
                    "parentMobile": params.parentMobile,
                    "parentName": params.parentName,
                    "deptName": params.deptName,
                    "docName": params.docName,
                    "patientmuserId": params.patientmuserId,
                    "regBindCardno": params.regBindCardno

                };
                break;
            case "31":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "21":
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "orderno": params.orderno,
                    "beginDate": params.beginDate,
                    "endDate": params.endDate,
                    "orderStatus": params.orderStatus,
                    "pageIndex": params.pageIndex,
                    "pageSize": params.pageSize,
                };
                break;
            case "22":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "beginDate": params.beginDate, "endDate": params.endDate, "orderStatus": params.orderStatus,
                    "pageIndex": params.pageIndex, "pageSize": params.pageSize,
                };
                break;
            case "23":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "orderNo": params.orderNo
                };
                break;
            case "24":
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "orderNo": params.orderNo,
                    "regName": params.regName,
                    "hospName": params.hospName,
                    "deptName": params.deptName,
                    "docName": params.docName,
                    "orderTime": params.orderTime,
                    "regMobil": params.regMobil
                };
                break;
            case "13":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "data": params.data
                };
                break;
            case "12":
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "loginId": params.loginId,
                    "password": params.password,
                    "validCode": params.validCode,
                    "isRemember": params.isRemember
                };
                break;
            case "11":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "14":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "telNum": params.telNum, "loginId": params.loginId, "password": params.password,
                    "realName": params.realName, "mobileImgCode": params.mobileImgCode
                };
                break;
            case "25":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "memCard": params.memCard, "vCode": params.vCode, "memTel": params.memTel
                };
                break;
            case "16":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "memTel": params.memTel, "memCard": params.memCard, "newPwd": params.newPwd
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("陕西省预约挂号taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("陕西省预约挂号查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.shanxiHospitalService = shanxiHospitalService;