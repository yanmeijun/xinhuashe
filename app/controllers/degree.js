const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    degreeService = require("../logics/degree").degreeService;
const path = "degree/";
const serviceID = "CAC0001", templateID = "degreeInquiry";
let degreeCon = {};

degreeCon.getCon = (req, res, next) => {
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
    console.log("学位查询renderName: " + renderName);
    const cityID = req.query.cityID;
    cityDAO.get(cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
}
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("学位查询请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
}
//获取图片验证码
const getVeryCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "1",
        serviceId: templateID,
        randomKey: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("degreeCon.getVeryCode", params)) {
        res.send({"retCode": "000001", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        degreeService.postData(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    res.send(results.responseBody.data);
                } else {
                    res.send("/images/refreshCode.png");
                }
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "学位证书获取图片验证码",//服务名称
                    params: {//请求参数
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send("/images/refreshCode.png");
        })
    }
};
//学位证书查询获取短信验证码
const getCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "2",
        serviceId: templateID,
        checkcode: req.body.verifycode,//图片验证码
        mobilephone: req.body.phone,//手机号
        xwzsbh: req.body.xwzsbh,//学位证书编号
        xm: req.body.name,//姓名
        randomKey: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("degreeCon.getCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        degreeService.postData(params)
            .then((results) => {
                res.send(results);
                var modifyFields = {
                    mobilephone: req.body.phone,//手机号
                    xwzsbh: req.body.xwzsbh,//学位证书编号
                    xm: req.body.name,//姓名
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
                    taskName: "学位证书查询获取短信验证码",//服务名称
                    params: {//请求参数
                        checkcode: req.body.verifycode,//图片验证码
                        mobilephone: req.body.phone,//手机号
                        xwzsbh: req.body.xwzsbh,//学位证书编号
                        xm: req.body.name,//姓名
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//学位证书查询
const getDegreeInfo = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "4",
        serviceId: templateID,
        verifycode: req.body.provinceId,//图片验证码
        phone: req.body.phone,//手机号
        xwzsbh: req.body.xwzsbh,//学位证书编号
        name: req.body.name,//姓名
        queryID: req.body.phoneCode,//手机验证码
        randomKey: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("degreeCon.getDegreeInfo", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        cityDAO.get(params.cityID, (err, cityInfo) => {
            let sendBackParams = _.extend(params, {cityInfo: cityInfo});
            degreeService.postData(params)
                .then((results) => {
                    if (results.retCode == '000000') {
                        results.responseBody.picUrl = results.responseBody.photo;
                        const _results = _.extend(sendBackParams, results.responseBody);
                        res.render(path + "degreeQueryResult", _results);
                        // } else if (results.retCode == '900005') {
                        //     res.render(path + "degreeNotFound", _.extend(sendBackParams, results))
                    } else {
                        res.render(path + "degree", _.extend(sendBackParams, {errMsg: results.responseBody.errorMsg || "查询失败"}))
                    }
                    var logData = {
                        localFrom: req.body.localFrom,//项目用户名称
                        clientID: params.clientID,//用户设备ID
                        serviceID: serviceID,//前台服务ID
                        templateID: templateID,//引擎模板服务ID
                        taskId: params.taskId,//引擎模板服务taskID
                        taskName: "学位证书查询",//服务名称
                        params: {//请求参数
                            verifycode: req.body.provinceId,//图片验证码
                            phone: req.body.phone,//手机号
                            xwzsbh: req.body.xwzsbh,//学位证书编号
                            name: req.body.name,//姓名
                            queryID: req.body.phoneCode,//手机验证码
                        },
                        results: JSON.stringify(results)//返回结果
                    };
                    userLogDAO.add(logData);
                    // res.send(results);
                }).catch((err) => {
                res.render(path + "degreeNotFound", _.extend(sendBackParams, err));
                // res.send(err);
            });
        });
    }
};

exports.degreeCon = degreeCon;