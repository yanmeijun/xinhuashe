const config = require("../../config"),
    util = require('../../lib/util').util;
let sXHospitalService = {};
//山西省预约挂号
sXHospitalService.postData = (params) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "1"://按医院查询和热门医院
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "page": params.page,
                    "hospitalname": params.hospitalname,
                    "cityid": params.cityid,
                    "addrcountryid": params.addrcountryid,
                    "simplespell": params.simplespell,
                    "gradeid": params.gradeid,
                    "hosptype": params.hosptype
                };
                break;
            case "2"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "3"://按医生名字搜索
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "q": params.q, "page": params.page

                };
                break;
            case "4"://点击医生名字进入详情页面
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "id": params.id

                };
                break;
            case "5"://医院的预约科室信息和所对应医院详情
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "hospitaluid": params.hospitaluid
                };
                break;
            case "6"://科室门诊详情 余量查询
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "deptuid": params.deptuid
                };
                break;
            case "7"://科室门诊详情 余量查询
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "deptuid": params.deptuid,
                    "cityid": params.cityid,
                    "hosptype": params.hosptype,
                    "doctorrankid": params.doctorrankid,
                    "commonid": params.commonid,
                    "hospitaluid": params.hospitaluid,
                    "startdate": params.startdate,
                    "enddate": params.enddate
                };
                break;
            case "8"://预约
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "id": params.id,
                    "workid": params.workid,
                    "accesstype": params.accesstype,
                    "price": params.price,
                    "periodname": params.periodname,
                    "workdate": params.workdate,
                    "workrank": params.workrank
                };
                break;
            case "10"://获取图片验证码
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "Round": params.Round
                };
                break;
            case "9"://登陆
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "validatecode": params.validatecode, "phone": params.phone, "userpwd": params.userpwd,
                    "fromurl": params.fromurl

                };
                break;
            case "11"://登陆
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "12"://历史纪录
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "13":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "14"://确认就诊
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "resid": params.resid,
                    "commonpeopleid": params.commonpeopleid,
                    "treattype": params.treattype,
                    "mtype": params.mtype,
                    "validatecode": params.validatecode,
                    "qr": params.qr,
                    "jzr_xz": params.jzr_xz,
                    "qryy": params.qryy,
                    "workid": params.workid,
                    "configurl": params.configurl,
                    "hospitaluid": params.hospitaluid,
                    "hospitalname": params.hospitalname,
                    "deptname": params.deptname,
                    "periodname": params.periodname,
                    "price": params.price,
                    "workdate": params.workdate,
                    "workrank": params.workrank,
                    "doctorname": params.doctorname,
                    "cphone": params.cphone,
                    "orderid": params.orderid,
                    "starttime": params.starttime,
                    "jzrname": params.jzrname,
                    "showerrorinfo": params.showerrorinfo,
                    "noplace": params.noplace

                };
                break;
            case "15"://确认就诊
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "resid": params.resid,
                    "commonpeopleid": params.commonpeopleid,
                    "treattype": params.treattype,
                    "mtype": params.mtype,
                    "validatecode": params.validatecode,
                    "qr": params.qr,
                    "jzr_xz": params.jzr_xz,
                    "workid": params.workid
                };
                break;
            case "20"://添加就诊人
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "username": params.username,
                    "idcard": params.idcard,
                    "ptype": params.ptype,
                    "birthdate": params.birthdate,
                    "phone": params.phone,
                    "addrprovinceid": params.addrprovinceid,
                    "addrcityid": params.addrcityid,
                    "addrcountryid": params.addrcountryid,
                    "B1": params.B1,
                    "configUrl": params.configUrl,
                    "usersex": params.usersex

                };
                break;
            case "16":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "orderid": params.orderid
                };
                break;
            case "17":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "validatecode": params.validatecode, "phone": params.phone, "next": params.next

                };
                break;
            case "18":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "validatecode": params.validatecode, "phone": params.phone, "next": params.next, "code": params.code

                };
                break;
            case "19":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "userpwd": params.userpwd, "userpwd_r": params.userpwd_r, "next": params.next
                };
                break;
            case "24":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "phone": params.phone, "code": params.code, "next": params.next
                };
                break;
            case "22"://注册
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "addrcityid": params.addrcityid,
                    "addrcountryid": params.addrcountryid,
                    "addrprovinceid": params.addrprovinceid,
                    "B1": params.B1,
                    "code": params.code,
                    "idcard": params.idcard,
                    "phone": params.phone,
                    "username": params.username,
                    "userpwd": params.userpwd,
                    "userpwd_r": params.userpwd_r,
                    "validatecode": params.validatecode,
                    "tyxy": params.tyxy,
                    "fromurl": params.fromurl
                };
                break;
            case "23":
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "addrcityid": params.addrcityid,
                    "addrcountryid": params.addrcountryid,
                    "addrprovinceid": params.addrprovinceid,
                    "B1": params.B1,
                    "code": params.code,
                    "idcard": params.idcard,
                    "phone": params.phone,
                    "username": params.username,
                    "userpwd": params.userpwd,
                    "userpwd_r": params.userpwd_r,
                    "validatecode": params.validatecode,
                    "fromurl": params.fromurl,
                    "tyxy": params.tyxy
                };
                break;
            case "21":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "25":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "sel": params.sel
                };
                break;
            case "26":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "sel": params.sel
                };
                break;
        }


        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("山西省预约挂号taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("山西省预约挂号查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.sXHospitalService = sXHospitalService;
