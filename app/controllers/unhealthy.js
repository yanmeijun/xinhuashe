const urlParse = require('url'),
    _ = require('underscore'),
    util = require('../../lib/util').util,
    tools = require('./tools.js'),
    config = require("../../config"),
    cityDAO = require('../dao/city').cityDAO,
    userDAO = require('../dao/user').userDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    unhealthyService = require('../logics/unhealthy').unhealthyService;
const path = "unhealthy/", templateID = "unhealthy";
let unhealthyCon = {};
unhealthyCon.render = (req, res) => {
    const url = urlParse.parse(req.url).pathname, renderName = url.replace("/", "");
    console.log("不良信息renderName: " + renderName);
    if (req.method === "get" || req.method === "GET") {
        cityDAO.get(req.query.cityID, (err, cityInfo) => {
            res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
        })
    }
}
unhealthyCon.getCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("不良信息请求方法名: " + pathName);
    if (!pathName) return;
    if (pathName == "subMessage") {
        subMessage(req, res, next)
    } else if (pathName == "findMessageSpeed") {
        findMessageSpeed(req, res, next)
    } else if (pathName == "subPersonInfo") {
        subPersonInfo(req, res, next)
    } else if (pathName == "subPhoneInfo") {
        subPhoneInfo(req, res, next)
    } else if (pathName == "subWebInfo") {
        subWebInfo(req, res, next)
    } else if (pathName == "subMobileInfo") {
        subMobileInfo(req, res, next)
    } else if (pathName == "getVerifyCode") {
        getVerifyCode(req, res, next)
    } else if (pathName == "verifyCode") {//图片验证码
        verifyCode(req, res, next);
    } else if (pathName == "shortMessage") {//获得短信验证码
        shortMessage(req, res, next);
    }
}
//图片验证码
const verifyCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "1",
        serviceId: templateID,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y
    };
    if (util.isEmptyValue("unhealthyCon.verifyCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        unhealthyService.unhealthyMessage(params).then((results) => {
            if (results.retCode == "000000") {
                res.send(results.responseBody.data);
            } else {
                res.send("/images/refreshCode.png");
            }
        }).catch((err) => {
            res.send(err);
        })
    }
};
//获得短信验证码
const shortMessage = (req, res, next) => {
    const params = {
        jbphone: req.body.jbphone,//手机号
        code: req.body.code,//图片验证码
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "2",
        serviceId: templateID,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y
    };
    if (util.isEmptyValue("unhealthyCon.shortMessage", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        unhealthyService.unhealthyMessage(params).then((results) => {
            res.send(results);
        }).catch((err) => {
            res.send(err);
        })
    }
};
//12321举报垃圾短信
const subMessage = (req, res, next) => {
    const params = {
        sms_content: req.body.content,
        sms_phone: req.body.smsphone,
        phonecode: req.body.phonecode,
        phone: req.body.phone,
        code: req.body.code,
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "4",
        serviceId: templateID,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y
    };
    if (util.isEmptyValue("unhealthyCon.subMessage", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        unhealthyService.unhealthyMessage(params).then((content) => {
            res.send(content);
            var logData = {
                localFrom: req.body.localFrom,//项目用户名称
                clientID: params.clientID,//用户设备ID
                serviceID: "IAC0001",//前台服务ID
                templateID: templateID,//引擎模板服务ID
                taskId: params.taskId,//引擎模板服务taskID
                taskName: "12321举报垃圾短信",//服务名称
                params: {//请求参数
                    sms_content: req.body.content,
                    sms_phone: req.body.smsphone,
                    phonecode: req.body.phonecode,
                    phone: req.body.phone,
                    code: req.body.code, keyword: req.body.keyword
                },
                results: JSON.stringify(content)//返回结果
            };
            userLogDAO.add(logData);
        }).catch((err) => {
            res.send(err);
        })
    }
}
//12321举报垃圾短信进度查询
const findMessageSpeed = (req, res, next) => {
    const params = {
        code: req.body.code,
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "20",
        serviceId: templateID,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y
    };
    if (util.isEmptyValue("unhealthyCon.findMessageSpeed", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        unhealthyService.unhealthyMessage(params).then((content) => {
            res.send(content);
            var logData = {
                localFrom: req.body.localFrom,//项目用户名称
                clientID: params.clientID,//用户设备ID
                serviceID: "IAC0006",//前台服务ID
                templateID: templateID,//引擎模板服务ID
                taskId: params.taskId,//引擎模板服务taskID
                taskName: "12321举报垃圾短信进度查询",//服务名称
                params: {//请求参数
                    code: req.body.code
                },
                results: JSON.stringify(content)//返回结果
            };
            userLogDAO.add(logData);
        }).catch((err) => {
            res.send(err);
        })
    }
}
//12321举报个人信息泄露
const subPersonInfo = (req, res, next) => {
    const params = {
        sms_content: req.body.sms_content,
        code: req.body.code,
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "7",
        serviceId: templateID,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y
    };
    if (util.isEmptyValue("unhealthyCon.subPersonInfo", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        unhealthyService.unhealthyMessage(params).then((content) => {
            res.send(content);
            var logData = {
                localFrom: req.body.localFrom,//项目用户名称
                clientID: params.clientID,//用户设备ID
                serviceID: "IAC0005",//前台服务ID
                templateID: templateID,//引擎模板服务ID
                taskId: params.taskId,//引擎模板服务taskID
                taskName: "12321举报个人信息泄露",//服务名称
                params: {//请求参数
                    sms_content: req.body.sms_content,
                    code: req.body.code,
                },
                results: JSON.stringify(content)//返回结果
            };
            userLogDAO.add(logData);
        }).catch((err) => {
            res.send(err);
        })
    }
}
//12321举报骚扰电话
const subPhoneInfo = (req, res, next) => {
    const params = {
        called_time: req.body.calltime,
        sms_content: req.body.content,
        phone: req.body.phone,
        duration_time: req.body.durtime,
        sms_code: req.body.phonecode,
        bad_type: req.body.badtype,
        sms_phone: req.body.smsphone,
        type: req.body.smstype,
        code: req.body.verifycode,
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "14",
        serviceId: templateID,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y
    };
    if (util.isEmptyValue("unhealthyCon.subPhoneInfo", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        unhealthyService.unhealthyMessage(params).then((content) => {
            res.send(content);
            var logData = {
                localFrom: req.body.localFrom,//项目用户名称
                clientID: params.clientID,//用户设备ID
                serviceID: "IAC0003",//前台服务ID
                templateID: templateID,//引擎模板服务ID
                taskId: params.taskId,//引擎模板服务taskID
                taskName: "12321举报骚扰电话",//服务名称
                params: {//请求参数
                    called_time: req.body.calltime,
                    sms_content: req.body.content,
                    phone: req.body.phone,
                    duration_time: req.body.durtime,
                    sms_code: req.body.phonecode,
                    bad_type: req.body.badtype,
                    sms_phone: req.body.smsphone,
                    type: req.body.smstype,
                    code: req.body.verifycode,
                },
                results: JSON.stringify(content)//返回结果
            };
            userLogDAO.add(logData);
        }).catch((err) => {
            res.send(err);
        })
    }
}
//12321举报网站
const subWebInfo = (req, res, next) => {
    const params = {
        content: req.body.content,
        type: req.body.type,
        url: req.body.url,
        code: req.body.verifycode,
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "9",
        serviceId: templateID,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y
    };
    if (util.isEmptyValue("unhealthyCon.subWebInfo", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        unhealthyService.unhealthyMessage(params).then((content) => {
            res.send(content);
            var logData = {
                localFrom: req.body.localFrom,//项目用户名称
                clientID: params.clientID,//用户设备ID
                serviceID: "IAC0004",//前台服务ID
                templateID: templateID,//引擎模板服务ID
                taskId: params.taskId,//引擎模板服务taskID
                taskName: "12321举报网站",//服务名称
                params: {//请求参数
                    content: req.body.content,
                    type: req.body.type,
                    url: req.body.url,
                    code: req.body.verifycode,
                },
                results: JSON.stringify(content)//返回结果
            };
            userLogDAO.add(logData);
        }).catch((err) => {
            res.send(err);
        })
    }
}
//12321举报诈骗电话
const subMobileInfo = (req, res, next) => {
    const params = {
        sms_content: req.body.content,
        called_time: req.body.calltime,
        phone: req.body.phone,
        sms_phone: req.body.phoneZP,
        duration_time: req.body.durationtime,
        sms_code: req.body.phonecode,
        bad_type: req.body.badtype,
        code: req.body.verifycode,
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "11",
        serviceId: templateID,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y
    };
    if (util.isEmptyValue("unhealthyCon.subMobileInfo", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        unhealthyService.unhealthyMessage(params).then((content) => {
            res.send(content);
            var logData = {
                localFrom: req.body.localFrom,//项目用户名称
                clientID: params.clientID,//用户设备ID
                serviceID: "IAC0002",//前台服务ID
                templateID: templateID,//引擎模板服务ID
                taskId: params.taskId,//引擎模板服务taskID
                taskName: "12321举报诈骗电话",//服务名称
                params: {//请求参数
                    sms_content: req.body.content,
                    called_time: req.body.calltime,
                    phone: req.body.phone,
                    sms_phone: req.body.phoneZP,
                    duration_time: req.body.durationtime,
                    sms_code: req.body.phonecode,
                    bad_type: req.body.badtype,
                    code: req.body.verifycode,
                },
                results: JSON.stringify(content)//返回结果
            };
            userLogDAO.add(logData);
        }).catch((err) => {
            res.send(err);
        })
    }
}
//12321获取手机短信进度查询手机验证码
const getVerifyCode = (req, res, next) => {
    const params = {
        phone: req.body.phone,
        code: req.body.code,
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "17",
        serviceId: templateID,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y
    };
    if (util.isEmptyValue("unhealthyCon.subMobileInfo", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        unhealthyService.unhealthyMessage(params).then((content) => {
            res.send(content);
            var logData = {
                localFrom: req.body.localFrom,//项目用户名称
                clientID: params.clientID,//用户设备ID
                serviceID: "IAC0006",//前台服务ID
                templateID: templateID,//引擎模板服务ID
                taskId: params.taskId,//引擎模板服务taskID
                taskName: "12321获取手机短信进度查询手机验证码",//服务名称
                params: {//请求参数
                    phone: req.body.phone,
                    code: req.body.code,
                },
                results: JSON.stringify(content)//返回结果
            };
            userLogDAO.add(logData);
        }).catch((err) => {
            res.send(err);
        })
    }
}

exports.unhealthyCon = unhealthyCon;