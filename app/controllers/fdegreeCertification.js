const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    fdegreeCertificationService = require("../logics/fdegreeCertification").fdegreeCertificationService;
const path = "fdegreeCertification/";
const serviceID = "CAG0005", templateID = "fdegreeCertification";
let fdegreeCertificationCon = {};

fdegreeCertificationCon.getCon = (req, res, next) => {
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
    console.log("国（境）外学历学位认证证书查询renderName: " + renderName);
    const cityID = req.query.cityID;
    cityDAO.get(cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
}
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("国（境）外学历学位认证证书查询请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
}
//获取图片验证码
const getVeryCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "2",
        serviceId: templateID,
        randomKey: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("fdegreeCertificationCon.getVeryCode", params)) {
        res.send({"retCode": "000001", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        fdegreeCertificationService.postData(params)
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
                    taskName: "国（境）外学历学位认证证书查询获取图片验证码",//服务名称
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
const reportText = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "1",
        serviceId: templateID,
        randomKey: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        txtFullName : req.body.txtFullName, //姓名
        txtCountry : req.body.txtCountry, //认证证书编号-国籍
        txtYear : req.body.txtYear, //认证证书编号-年份
        txtNumber : req.body.txtNumber, //认证证书编号-编号
        ddlRzlb : req.body.ddlRzlb, //认证类别
        vCCode_validateInputControl : req.body.vCCode_validateInputControl //验证码
    };

    if (util.isEmptyValue("fdegreeCertificationCon.reportText", params)) {
        res.send({"retCode": "000001", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {

        fdegreeCertificationService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "国（境）外学历学位认证证书查询正文",//服务名称
                    params: {//请求参数
                        txtFullName : req.body.txtFullName, //姓名
                        txtCountry : req.body.txtCountry, //认证证书编号-国籍
                        txtYear : req.body.txtYear, //认证证书编号-年份
                        txtNumber : req.body.txtNumber, //认证证书编号-编号
                        ddlRzlb : req.body.ddlRzlb, //认证类别
                        vCCode_validateInputControl : req.body.vCCode_validateInputControl //验证码
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        })
    }
};

exports.fdegreeCertificationCon = fdegreeCertificationCon;