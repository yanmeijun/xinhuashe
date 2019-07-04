const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    overseasNgoReportService = require("../logics/overseasNgoReport").overseasNgoReportService;
const path = "overseasNgoReport/";
const serviceID = "IAC0012", templateID = "overseasNgoReport";
let overseasNgoReportCon = {};
overseasNgoReportCon.getCon = (req, res, next) => {

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
    console.log("境外非政府组织办事服务平台renderName: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("境外非政府组织办事服务平台方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};

//境外非政府组织办事服务平台（验证码下载）
const verificationCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "1",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度


    };

    if (util.isEmptyValue("overseasNgoReportCon.VerificationCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        overseasNgoReportService.postData(params)
            .then((results) => {

                if (results.retCode == "000000") {
                    //http://47.96.254.45/service/
                    res.send(results.responseBody.data);
                } else {
                    res.send("/images/refreshCode.png");
                }
                 userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};

//境外非政府组织办事服务平台（举报）
const report = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "3",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        reportType: req.body.reportType, //举报类型
        reportDate: req.body.reportDate, // 举报时间
        reportRegion: req.body.reportRegion, //违法地区
        reportAddress: req.body.reportAddress, //违法地址
        reportReason: req.body.reportReason, //举报原因|主要问题
        type: req.body.type, //举报类型   默认实名举报
        reportName: req.body.reportName, //举报人姓名
        idcardType: req.body.idcardType, //证件类型
        reportId: req.body.reportId, //证件号码
        reportPhone: req.body.reportPhone, //联系方式
        validCode: req.body.validCode  //验证码

    };

    if (util.isEmptyValue("overseasNgoReportCon.report", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        overseasNgoReportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "境外非政府组织办事服务平台-举报",//服务名称
                    params: {//请求参数
                        reportType: req.body.reportType, //举报类型
                        reportDate: req.body.reportDate, // 举报时间
                        reportRegion: req.body.reportRegion, //违法地区
                        reportAddress: req.body.reportAddress, //违法地址
                        reportReason: req.body.reportReason, //举报原因|主要问题
                        type: req.body.type, //举报类型   默认实名举报
                        reportName: req.body.reportName, //举报人姓名
                        idcardType: req.body.idcardType, //证件类型
                        reportId: req.body.reportId, //证件号码
                        reportPhone: req.body.reportPhone, //联系方式
                        validCode: req.body.validCode  //验证码
                    },

                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};


exports.overseasNgoReportCon = overseasNgoReportCon;
