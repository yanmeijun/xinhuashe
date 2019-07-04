const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    housingReportService = require("../logics/housingReport").housingReportService;
const path = "housingReport/";
const serviceID = "IAC0007", templateID = "zfcxjswfjb";
let housingReportCon = {};
housingReportCon.getCon = (req, res, next) => {
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
    console.log("住房城乡建设领域违法违规行为网上举报renderName: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    eval(pathName + "(req, res, next)");
};

//举报提交
const reportSubmit = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "1",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        drop_FIsAnonymous:req.body.drop_FIsAnonymous,
        selectreport:req.body.selectreport,
        name:req.body.name,
        phone:req.body.phone,
        project :req.body.project,
        reportname : req.body.reportname,
        address:req.body.address,
        proVinceID:req.body.proVinceID,
        DeptCityID:req.body.DeptCityID,
        districtID:req.body.districtID,
        DomainID1L1:req.body.DomainID1L1,
        DomainID1L2:req.body.DomainID1L2,
        title:req.body.title,
        content:req.body.content,
        __EVENTTARGET:req.body.__EVENTTARGET,
        bn_save:req.body.bn_save
    };
    console.log(params)
    if (util.isEmptyValue("housingReportCon.reportSearch", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        housingReportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "住房城乡举报正文提交",//服务名称
                    params: {//请求参数
                        drop_FIsAnonymous:req.body.drop_FIsAnonymous, //默认实名举报值为0
                        selectreport:req.body.selectreport,
                        name:req.body.name,
                        phone:req.body.phone,
                        project :req.body.project,
                        reportname : req.body.reportname,
                        address:req.body.address,
                        proVinceID:req.body.proVinceID,
                        DeptCityID:req.body.DeptCityID,
                        districtID:req.body.districtID,
                        DomainID1L1:req.body.DomainID1L1,
                        DomainID1L2:req.body.DomainID1L2,
                        title:req.body.title,
                        content:req.body.content,
                        __EVENTTARGET:req.body.__EVENTTARGET,
                        bn_save:req.body.bn_save
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};

exports.housingReportCon = housingReportCon;