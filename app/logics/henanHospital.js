const config = require("../../config"),
    util = require('../../lib/util').util;
let henanHospitalService = {};
//河南医院默认展示
henanHospitalService.allHospital = (params) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "1":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "p": params.p, "dept_a": params.dept_a, "dept_b": params.dept_b, "city": params.city
                };
                break;
            case "2"://医院详情页面接口
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "id": params.id
                };
                break;
            case "5"://该科室的预约剩余号量
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "id": params.id
                };
                break;
            case "6"://预约挂号
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "eid": params.eid, "sl": params.sl
                };
                break;
            case "3"://预约挂号  1.9.1、获取图片验证码
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "7.1"://预约挂号
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "xml": "<root><validate>" + params.validate + "</validate><cfz>" + params.cfz + "</cfz><schdid>" + params.schdid + "</schdid><expert>" + params.expert + "</expert><person>" + params.person + "</person><sort></sort><jzktype>" + params.jzktype + "</jzktype><jzkno>" + params.jzkno + "</jzkno></root>"
                };
                break;
            case "8"://查看我的预约订单信息+订单详情（需登录）
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "p": params.p, "yys": params.yys, "yye": params.yye, "state": params.state
                };
                break;
            case "9"://查看我的预约订单信息+订单详情（需登录）
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "id": params.id
                };
                break;
            case "4"://1.8登录
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "xml": "<root><logname>" + params.logname + "</logname><password>" + params.password + "</password><validate>" + params.validate + "</validate></root>"
                };
                break;
            case "10"://1.8获取短信验证码
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "logname": params.logname, "validateCode": params.validateCode
                };
                break;
            case "11"://设置登录名
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "logname": params.logname, "validateCode": params.validateCode, "code": params.code
                };
                break;
            case "12"://设置登录名与补充注册信息
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "nlogname": params.nlogname,
                    "npassword": params.npassword,
                    "nname": params.nname,
                    "nidnotype": params.nidnotype,
                    "nidno": params.nidno,
                    "nphone": params.nphone,
                    "nemail": params.nemail,
                    "ngender": params.ngender,
                    "nage": params.nage
                };
                break;
            case "13"://1.10个人中心—退出登录[此功能去掉]
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
        console.log("河南省预约挂号taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("河南省预约挂号查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.henanHospitalService = henanHospitalService;