const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    organizationReportService = require("../logics/organizationReport").organizationReportService;
const path = "organizationReport/";
const serviceID = "IAF0001", templateID = "OrganizationReport";
let organizationReportCon = {};
organizationReportCon.getCon = (req, res, next) => {
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
    console.log("中组部举报查询renderName: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("中组部举报查询请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
//中组部举报 （举报单位）
const reportUnit = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "1",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        unit: req.body.unit,//填写被举报单位
        unitlevelcode: req.body.unitlevelcode,//填写被举报单位级别
        unitreginname: req.body.unitreginname,//填写被举报单位所在地区
        unitregincode: req.body.unitregincode,//填写被举报单位地区编号
        problem: req.body.problem //填写主要问题
    };
    if (util.isEmptyValue("organizationReportCon.reportUnit", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.peoplename = req.body.peoplename;//举报人姓名
        params.gendercode = req.body.gendercode;//举报人性别
        params.peopleunit = req.body.peopleunit;//举报人单位
        params.dutycode = req.body.dutycode;//举报人职务
        params.peopleidnumber = req.body.peopleidnumber;//举报人身份证号码
        params.peoplepostalcode = req.body.peoplepostalcode;//举报人所在地区邮政编码
        params.peopleaddress = req.body.peopleaddress;//举报人地址
        params.reginname = req.body.reginname;//举报人地区
        params.regincode = req.body.regincode;//举报人地区编号
        params.phone = req.body.phone;//举报人电话号码
        params.mobilephone = req.body.mobilephone;//举报人手机号码
        params.email = req.body.email;//举报人邮箱地址
        organizationReportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "中组部举报单位",//服务名称
                    params: {//请求参数
                        unit: req.body.unit,//填写被举报单位
                        unitlevelcode: req.body.unitlevelcode,//填写被举报单位级别
                        unitreginname: req.body.unitreginname,//填写被举报单位所在地区
                        unitregincode: req.body.unitregincode,//填写被举报单位地区编号
                        problem: req.body.problem, //填写主要问题
                        peoplename: req.body.peoplename,//举报人姓名
                        gendercode: req.body.gendercode,//举报人性别
                        peopleunit: req.body.peopleunit,//举报人单位
                        dutycode: req.body.dutycode,//举报人职务
                        peopleidnumber: req.body.peopleidnumber,//举报人身份证号码
                        peoplepostalcode: req.body.peoplepostalcode,//举报人所在地区邮政编码
                        peopleaddress: req.body.peopleaddress,//举报人地址
                        reginname: req.body.reginname,//举报人地区
                        regincode: req.body.regincode,//举报人地区编号
                        phone: req.body.phone,//举报人电话号码
                        mobilephone: req.body.mobilephone,//举报人手机号码
                        email: req.body.email//举报人邮箱地址
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};

//中组部举报 （举报个人）
const reportPerson = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "2",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        reportedname: req.body.reportedname,//填写被举报人
        reportedunit: req.body.reportedunit,//填写举报人单位
        reportedutycode: req.body.reportedutycode,//填写被举报人职务
        reportedreginname: req.body.reportedreginname,//填写被举报人地区
        reportedregincode: req.body.reportedregincode,//填写被举报人地区编号
        problem: req.body.problem//填写举报问题
    };
    if (util.isEmptyValue("organizationReportCon.reportUnit", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.peopleidnumber = req.body.peopleidnumber || "";//举报人姓名
        params.gendercode = req.body.gendercode || "";//举报人性别
        params.peopleunit = req.body.peopleunit || "";//举报人单位
        params.dutycode = req.body.dutycode || "";
        params.peopleidnumber = req.body.peopleidnumber || "";//举报人身份证号码
        params.peoplepostalcode = req.body.peoplepostalcode || "";//举报人所在地区邮政编码
        params.peopleaddress = req.body.peopleaddress || "";//举报人地址
        params.reginname = req.body.reginname || "";//举报人地区
        params.regincode = req.body.regincode || "";//举报人地区编号
        params.phone = req.body.phone || "";//举报人电话号码
        params.mobilephone = req.body.mobilephone || "";//举报人手机号码
        params.email = req.body.email || "";//举报人邮箱地址
        params.reportedgendercode = req.body.reportedgendercode || "";//被举报人性别
        params.reportedpoliticalcode = req.body.reportedpoliticalcode || "";//被举报人政治面貌
        params.reporteddutylevelcode = req.body.reporteddutylevelcode || "";//被举报人级别
        organizationReportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "中组部举报个人",//服务名称
                    params: {//请求参数
                        reportedname: req.body.reportedname,//填写被举报人
                        reportedunit: req.body.reportedunit,//填写举报人单位
                        reportedutycode: req.body.reportedutycode,//填写被举报人职务
                        reportedreginname: req.body.reportedreginname,//填写被举报人地区
                        reportedregincode: req.body.reportedregincode,//填写被举报人地区编号
                        problem: req.body.problem,//填写举报问题
                        peopleidnumber: req.body.peopleidnumber || "",//举报人姓名
                        gendercode: req.body.gendercode || "",//举报人性别
                        peopleunit: req.body.peopleunit || "",//举报人单位
                        dutycode: req.body.dutycode || "",
                        peopleidnumber: req.body.peopleidnumber || "",//举报人身份证号码
                        peoplepostalcode: req.body.peoplepostalcode || "",//举报人所在地区邮政编码
                        peopleaddress: req.body.peopleaddress || "",//举报人地址
                        reginname: req.body.reginname || "",//举报人地区
                        regincode: req.body.regincode || "",//举报人地区编号
                        phone: req.body.phone || "",//举报人电话号码
                        mobilephone: req.body.mobilephone || "",//举报人手机号码
                        email: req.body.email || "",//举报人邮箱地址
                        reportedgendercode: req.body.reportedgendercode || "",//被举报人性别
                        reportedpoliticalcode: req.body.reportedpoliticalcode || "",//被举报人政治面貌
                        reporteddutylevelcode: req.body.reporteddutylevelcode || ""//被举报人级别
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//中组部举报 （举报查询）
const reportSearch = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "3",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        querynumber: req.body.querynumber//举报查询码
    };
    if (util.isEmptyValue("organizationReportCon.reportUnit", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        organizationReportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "中组部举报查询",//服务名称
                    params: {//请求参数
                        querynumber: req.body.querynumber//举报查询码
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const reporteduty = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "4",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("organizationReportCon.reporteduty", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        organizationReportService.postData(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};
exports.organizationReportCon = organizationReportCon;