const config = require("../../config"),
    util = require('../../lib/util').util;
let nmgHospitalService = {};
//内蒙古医院挂号
nmgHospitalService.allHospital = (params) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "1"://注册——获取手机验证码
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "phone": params.phone
                };
                break;
            case "2"://注册
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "phone": params.phone, "code": params.code, "password": params.password, "sex": params.sex,
                    "realname": params.realname, "cardid": params.cardid, "address": params.address
                };
                break;
            case "3"://登录
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "username": params.username, "password": params.password
                };
                break;
            case "4"://首页展示
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "RRegionId": params.RRegionId, "type": params.type, "grade": params.grade, "pageNo": params.pageNo,
                    "hosName": params.hosName
                };
                break;
            case "5"://科室分类
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "RRegionId": params.RRegionId, "RHospitalId": params.RHospitalId
                };
                break;
            case "6"://科室信息
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "RDepartmentId": params.RDepartmentId, "RHospitalId": params.RHospitalId
                };
                break;
            case "7"://检查是否登录
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "RDepartmentId": params.RDepartmentId, "RHospitalId": params.RHospitalId
                };
                break;
            case "8"://预约
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "hosId": params.hosId, "dateStr": params.dateStr, "ampm": params.ampm, "docId": params.docId,
                    "RDepartmentId": params.RDepartmentId
                };
                break;
            case "9"://预约提交
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "RShiftId": params.RShiftId, "RDepartmentId": params.RDepartmentId, "weekName": params.weekName,
                    "RPatientId": params.RPatientId, "hospitalId": params.hospitalId, "doctorId": params.doctorId,
                    "outDate": params.outDate, "timestampName": params.timestampName, "ampm": params.ampm
                };
                break;
            case "10"://预约单信息
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "appointId": params.appointId, "hosId": params.hosId, "docId": params.docId,
                    "dateStr": params.dateStr, "ampm": params.ampm
                };
                break;
            case "11"://待就诊预约记录
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                };
                break;
            case "12"://历史预约记录
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "appoint_id": params.appoint_id
                };
                break;
            case "13"://历史预约记录
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "14"://获取就诊人序号
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "15"://就诊人列表
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "id": params.id
                };
                break;
            case "16"://添加就诊人
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "realname": params.realname, "sex": params.sex, "phone": params.phone,
                    "cardid": params.cardid, "address": params.address, "pid": params.pid
                };
                break;
            case "17"://删除就诊人
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "id": params.id, "pid": params.pid
                };
                break;
            case "18"://个人信息查看
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "id": params.id
                };
                break;
            case "19"://"忘记密码——获取手机验证码
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "phone": params.phone, "back": params.back
                };
                break;
            case "20"://"忘记密码
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "phone": params.phone, "code": params.code, "pass": params.pass
                };
                break;
            case "21"://"退出登录
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
        console.log("内蒙古预约挂号taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("内蒙古预约挂号查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.nmgHospitalService = nmgHospitalService;