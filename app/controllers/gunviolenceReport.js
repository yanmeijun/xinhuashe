const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    gunviolenceReportService = require("../logics/gunviolenceReport").gunviolenceReportService;
const path = "gunviolenceReport/";
const serviceID = "IAC0011", templateID = "gunviolenceReport";
let gunviolenceReportCon = {};
gunviolenceReportCon.getCon = (req, res, next) => {
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
    console.log("涉枪涉暴违法举报renderName: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("涉枪涉暴违法举报方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
//验证码
const verification = (req, res, next) => {
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
    if (util.isEmptyValue("gunviolenceReportCon.verification", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gunviolenceReportService.postData(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    //http://47.96.254.45/service/
                    res.send(results.responseBody.data);
                } else {
                    res.send("/images/refreshCode.png");
                }
            }).catch((err) => {
            res.send(err);
        });
    }
};

//提交正文
const reportsubmit = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "2",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        address: req.body.address,//地址
        tel: req.body.tel,//举报人电话
        txtname: req.body.txtname,//举报人姓名
        reportImg: req.body.reportImg,//验证码
        txtcontent: req.body.txtcontent,//举报内容
        name: req.body.name,//为首分子姓名
    };
    console.log(params)
    if (util.isEmptyValue("gunviolenceReportCon.reportSearch", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gunviolenceReportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "涉枪涉暴举报提交正文",//服务名称
                    params: {//请求参数
                        address: req.body.address,//预约码
                        tel: req.body.tel,//举报人电话
                        txtname: req.body.txtname,//举报人姓名
                        reportImg: req.body.reportImg,//验证码
                        txtcontent: req.body.txtcontent,//举报内容
                        name: req.body.name,//为首分子姓名
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
exports.gunviolenceReportCon = gunviolenceReportCon;