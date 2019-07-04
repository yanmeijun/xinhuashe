const urlParse = require('url'),
    config = require("../../config"),
    _ = require('underscore'),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    educationService = require("../logics/education").educationService;
let path = "education/";
const serviceID = "CAB0001", templateID = "xuexinwang";
let educationCon = {};

educationCon.getCon = (req, res, next) => {
    if (req.method.toUpperCase() === "GET") {
        if (_.isEmpty(req.query.page)) {
            apiCon(req, res, next)
        } else {
            pageCon(req, res, next)
        }
    } else {
        apiCon(req, res, next);
    }
};
//页面跳转方法
const pageCon = (req, res, next) => {
    const renderName = req.query.page;
    console.log("学历证书查询renderName: " + renderName);
    const cityID = req.query.cityID;
    cityDAO.get(cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("学历证书查询请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
//获取图片验证码
const getVeryCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: templateID,
        taskId: "1",
        randomKey: req.body.randomKey,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y
    };
    if (util.isEmptyValue("educationCon.getVeryCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        educationService.postData(params).then((content) => {
            if (content.retCode == "000000") {
                res.send(content.responseBody.data);
            } else {
                res.send("/images/refreshCode.png");
            }
            var logData = {
                localFrom: req.body.localFrom,//项目用户名称
                clientID: params.clientID,//用户设备ID
                serviceID: serviceID,//前台服务ID
                templateID: templateID,//引擎模板服务ID
                taskId: params.taskId,//引擎模板服务taskID
                taskName: "学历证书获取图片验证码",//服务名称
                params: {//请求参数
                },
                results: JSON.stringify(content)//返回结果
            };
            userLogDAO.add(logData);
        }).catch((err) => {
            res.send("/images/refreshCode.png");
        })
    }
};
//获取短信验证码
const getPhoneCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: templateID,
        taskId: "2",
        zsbh: req.body.zsbh,
        xm: req.body.name,
        mphone: req.body.mphone,
        yzm: req.body.verifycode,
        randomKey: req.body.randomKey,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y
    };
    if (util.isEmptyValue("educationCon.getPhoneCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        educationService.postData(params).then((content) => {
            res.send(content);
            var modifyFields = {
                zsbh: req.body.zsbh,
                xm: req.body.name,
                mphone: req.body.mphone,
                localFrom: req.body.localFrom
            };
            userLoginInfoDAO.modify(params.clientID, serviceID, modifyFields, () => {
            });
            var logData = {
                localFrom: req.body.localFrom,//项目用户名称
                clientID: params.clientID,//用户设备ID
                serviceID: serviceID,//前台服务ID
                templateID: templateID,//引擎模板服务ID
                taskId: params.taskId,//引擎模板服务taskID
                taskName: "学历证书获取短信验证码",//服务名称
                params: {//请求参数
                    zsbh: req.body.zsbh,
                    xm: req.body.name,
                    mphone: req.body.mphone,
                    yzm: req.body.verifycode,
                },
                results: JSON.stringify(content)//返回结果
            };
            userLogDAO.add(logData);
        }).catch((err) => {
            res.send(err);
        })
    }
};
//学历证书查询
const search = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: templateID,
        taskId: "4",
        vcode: req.body.phoneCode,
        randomKey: req.body.randomKey,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y
    };
    if (util.isEmptyValue("educationCon.search", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        cityDAO.get(params.cityID, (err, cityInfo) => {
            let renderParams = _.extend(params, {cityInfo: cityInfo});
            educationService.postData(params).then((body) => {
                if (body.retCode == '000000') {
                    body.responseBody.img = body.responseBody.picUrl.replace("https", "http");
                    res.render(path + "educationInfo", _.extend(renderParams, {data: body.responseBody}));
                } else {
                    res.render(path + "education", _.extend(renderParams, {error: body.rtnMsg}));
                }
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "学历证书查询",//服务名称
                    params: {//请求参数
                        vcode: req.body.phoneCode,
                    },
                    results: JSON.stringify(body)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
                res.render(path + "education", _.extend(renderParams, {error: err}));
            })
        })
    }
};
exports.educationCon = educationCon;