const config = require("../../config"),
    util = require('../../lib/util').util;
let gsHospitalService = {};
//甘肃医院默认展示
gsHospitalService.allHospital = (params) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "1"://搜索医院
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "t": params.t, "pagenum": params.pagenum
                };
                break;
            case "2"://"醫院分类信息获取
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "3"://预约量排名
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "pagenum": params.pagenum, "hos_type": params.hos_type
                };
                break;
            case "4"://获取医院详情信息
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "hos_key": params.hos_key
                };
                break;
            case "5"://获取医院科室信息
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "hos_key": params.hos_key
                };
                break;
            case "6"://科室放号量
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "hosid": params.hosid
                };
                break;
            case "7"://科室坐班信息医院信息
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "hosKey": params.hosKey, "deptKey": params.deptKey, "ts": params.ts
                };
                break;
            case "8"://科室坐班信息
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "hosKey": params.hosKey, "deptKey": params.deptKey, "startDate": params.startDate
                };
                break;
            case "9"://1.8注册——手机图形验证码
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "10"://1.8注册——校验图形验证码
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "capCode": params.capCode
                };
                break;
            case "11"://注册——获取手机验证码
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "authType": params.authType, "authCode": params.authCode, "capCode": params.capCode, "ts": params.ts
                };
                break;
            case "12"://注册——最后接口
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "userName": params.userName, "userAccount": params.userAccount, "passWordOne": params.passWordOne,
                    "registerCard": params.registerCard, "ts": params.ts
                };
                break;
            case "27"://注册——最后接口
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "registerCard": params.registerCard, "cardCheck": params.cardCheck, "userName": params.userName
                };
                break;
            case "13"://登录——获取图形验证码
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "14"://登录
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "userAccount": params.userAccount, "passWord": params.passWord, "capCode": params.capCode
                };
                break;
            case "15"://忘记密码-获取图形验证码
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "16"://忘记密码-验证图形验证码
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "capCode": params.capCode
                };
                break;
            case "17"://忘记密码-获取账户信息
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "userAccount": params.userAccount, "capCode": params.capCode, "ts": params.ts
                };
                break;
            case "18"://忘记密码-获取手机验证码
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "authType": params.authType, "authCode": params.authCode, "capCode": params.capCode,
                    "ts": params.ts
                };
                break;
            case "19"://忘记密码-最后接口
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "pwdRandom": params.pwdRandom, "authCode": params.authCode, "newPwd": params.newPwd
                };
                break;
            case "20"://预约挂号--获取回显信息
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "doctorKey": params.doctorKey, "deptKey": params.deptKey, "orderDate": params.orderDate,
                    "orderSort": params.orderSort, "userKey": params.userKey, "ts": params.ts
                };
                break;
            case "21"://预约挂号
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "patientKey": params.patientKey, "scheduleKey": params.scheduleKey, "capCode": params.capCode,
                    "visitCard": params.visitCard, "random": params.random, "doctorKey": params.doctorKey,
                    "orderDate": params.orderDate, "deptKey": params.deptKey, "orderSort": params.orderSort,
                    "userKey": params.userKey
                };
                break;
            case "22"://预约挂号--图形验证码
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "userKey": params.userKey
                };
                break;
            case "23"://个人中心
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "userKey": params.userKey, "hosName": params.hosName, "startTime": params.startTime,
                    "endTime": params.endTime, "state": params.state, "s": params.s, "pagenums": params.pagenums
                };
                break;
            case "24"://取消预约
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "orderNumber": params.orderNumber,
                    "createTime": params.createTime,
                    "patinetCard": params.patinetCard,
                    "userKey": params.userKey
                };
                break;
            case "25"://预约挂号--获取预约单信息
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "patientId": params.patientId, "scheduleId": params.scheduleId, "orderNum": params.orderNum,
                    "endTime": params.endTime, "state": params.state, "s": params.s
                };
                break;
            case "28"://预约挂号--获取预约单信息
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "29"://预约挂号--获取预约单信息
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "name": params.name,
                    "idCode": params.idCode,
                    "userAccount": params.userAccount,
                    "realCapCode": params.realCapCode
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("甘肃省预约挂号taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("甘肃省预约挂号查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.gsHospitalService = gsHospitalService;