const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    networkCrimeReportService = require("../logics/networkCrimeReport").networkCrimeReportService;
const path = "networkCrimeReport/";
const serviceID = "IAG0010", templateID = "NetworkcrimeReport";
let networkCrimeReportCon = {};
networkCrimeReportCon.getCon = (req, res, next) => {
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
    console.log("网络违法犯罪举报查询renderName: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("网络违法犯罪举报请求方法:" + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
//除了“网络诈骗”外的普通举报类型
const ordinaryReport = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: req.body.taskId,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        "t_wfjb_report.event_time": req.body["t_wfjb_report.event_time"],
        "t_wfjb_report.event_description": req.body["t_wfjb_report.event_description"],
        "t_wfjb_report.anonymity_user_sex": req.body["t_wfjb_report.anonymity_user_sex"]
    };
    if (util.isEmptyValue("networkCrimeReportCon.verification", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params["t_wfjb_report.ext22"] = req.body["t_wfjb_report.ext22"];
        params["t_wfjb_report.ext21"] = req.body["t_wfjb_report.ext21"] || "";
        params["t_wfjb_report.report_type"] = req.body["t_wfjb_report.report_type"];
        params["t_wfjb_report.website_name"] = req.body["t_wfjb_report.website_name"];
        params["t_wfjb_report.website_url"] = req.body["t_wfjb_report.website_url"];
        params["t_wfjb_report.app_type"] = req.body["t_wfjb_report.app_type"];
        params["t_wfjb_report.app_account"] = req.body["t_wfjb_report.app_account"];
        params["uploadForm.file"] = req.body["uploadForm.file"] || "";
        params["t_wfjb_report.anonymity_user_name"] = req.body["t_wfjb_report.anonymity_user_name"] || "";
        params["t_wfjb_report.anonymity_credentials_type"] = req.body["t_wfjb_report.anonymity_credentials_type"] || "";
        params["t_wfjb_report.anonymity_credentials_no"] = req.body["t_wfjb_report.anonymity_user_name"] || "";
        params["t_wfjb_report.anonymity_phone"] = req.body["t_wfjb_report.anonymity_user_name"] || "";
        params["t_wfjb_report.anonymity_email"] = req.body["t_wfjb_report.anonymity_user_name"] || "";
        networkCrimeReportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "网络违法犯罪举报普通举报类型",//服务名称
                    params: {//请求参数
                        "t_wfjb_report.report_type": req.body["t_wfjb_report.report_type"],
                        "t_wfjb_report.event_time": req.body["t_wfjb_report.event_time"],
                        "t_wfjb_report.ext22": req.body["t_wfjb_report.ext22"],
                        "t_wfjb_report.ext21": req.body["t_wfjb_report.ext21"],
                        "t_wfjb_report.website_name": req.body["t_wfjb_report.website_name"],
                        "t_wfjb_report.website_url": req.body["t_wfjb_report.website_url"],
                        "t_wfjb_report.app_type": req.body["t_wfjb_report.app_type"],
                        "t_wfjb_report.app_account": req.body["t_wfjb_report.app_account"],
                        "t_wfjb_report.event_description": req.body["t_wfjb_report.event_description"],
                        "t_wfjb_report.anonymity_user_sex": req.body["t_wfjb_report.anonymity_user_sex"],
                        "uploadForm.file": req.body["uploadForm.file"] || "",
                        "t_wfjb_report.anonymity_user_name": req.body["t_wfjb_report.anonymity_user_name"] || "",
                        "t_wfjb_report.anonymity_credentials_type": req.body["t_wfjb_report.anonymity_credentials_type"] || "",
                        "t_wfjb_report.anonymity_credentials_no": req.body["t_wfjb_report.anonymity_user_name"] || "",
                        "t_wfjb_report.anonymity_phone": req.body["t_wfjb_report.anonymity_user_name"] || "",
                        "t_wfjb_report.anonymity_email": req.body["t_wfjb_report.anonymity_user_name"] || ""
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//网络诈骗举报类型
const fraudReport = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: req.body.taskId,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        "t_wfjb_report.event_time": req.body["t_wfjb_report.event_time"],
        "t_wfjb_report.is_victim": req.body["t_wfjb_report.is_victim"],
        "t_wfjb_report.ext40": req.body["t_wfjb_report.ext40"],
        "t_wfjb_report.event_description": req.body["t_wfjb_report.event_description"],
        "t_wfjb_report.anonymity_user_sex": req.body["t_wfjb_report.anonymity_user_sex"],
        "t_wfjb_report.anonymity_credentials_type": req.body["t_wfjb_report.anonymity_credentials_type"]
    };
    if (util.isEmptyValue("corruptionReportCon.anonymousReport", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params["t_wfjb_report.report_type"] = req.body["t_wfjb_report.report_type"];
        params["t_wfjb_report.ext22"] = req.body["t_wfjb_report.ext22"];
        params["t_wfjb_report.ext21"] = req.body["t_wfjb_report.ext21"] || "";
        params["t_wfjb_report.website_name"] = req.body["t_wfjb_report.website_name"] || "";
        params["t_wfjb_report.website_url"] = req.body["t_wfjb_report.website_url"] || "";
        params['t_wfjb_report.app_type'] = req.body["t_wfjb_report.app_type"] || "";
        params["t_wfjb_report.app_account"] = req.body["t_wfjb_report.app_account"] || "";
        params["uploadForm.file"] = req.body["uploadForm.file"] || "";
        params["t_wfjb_report.anonymity_credentials_no"] = req.body["t_wfjb_report.anonymity_credentials_no"] || "";
        params["t_wfjb_report.anonymity_phone"] = req.body["t_wfjb_report.anonymity_phone"] || "";
        params["t_wfjb_report.anonymity_email"] = req.body["t_wfjb_report.anonymity_email"] || "";
        params["t_wfjb_report.anonymity_user_name"] = req.body["t_wfjb_report.anonymity_user_name"] || "";
        params["t_wfjb_report.ext31"] = req.body["t_wfjb_report.ext31"] || "";
        params["secondRegion_num"] = req.body["secondRegion_num"] || "0";
        params["region_num1"] = req.body["region_num1"] || "0";
        params["t_wfjb_report.region_num"] = req.body["t_wfjb_report.region_num"] || "0";
        networkCrimeReportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "网络违法犯罪举报网络诈骗举报类型",//服务名称
                    params: {//请求参数
                        "t_wfjb_report.report_type": req.body["t_wfjb_report.report_type"],
                        "t_wfjb_report.event_time": req.body["t_wfjb_report.event_time"],
                        "t_wfjb_report.ext22": req.body["t_wfjb_report.ext22"],
                        "t_wfjb_report.ext21": req.body["t_wfjb_report.ext21"],
                        "t_wfjb_report.is_victim": req.body["t_wfjb_report.is_victim"],
                        "t_wfjb_report.website_name": req.body["t_wfjb_report.website_name"],
                        "t_wfjb_report.website_url": req.body["t_wfjb_report.website_url"],
                        "t_wfjb_report.app_type": req.body["t_wfjb_report.app_type"],
                        "t_wfjb_report.app_account": req.body["t_wfjb_report.app_account"],
                        "t_wfjb_report.ext40": req.body["t_wfjb_report.ext40"],
                        "t_wfjb_report.event_description": req.body["t_wfjb_report.event_description"],
                        "t_wfjb_report.anonymity_user_sex": req.body["t_wfjb_report.anonymity_user_sex"],
                        "t_wfjb_report.anonymity_credentials_type": req.body["t_wfjb_report.anonymity_credentials_type"],
                        "ext19": req.body.ext19 || null,
                        "ext20": req.body.ext20 || null,
                        "uploadForm.file": req.body["uploadForm.file"] || "",
                        "t_wfjb_report.anonymity_credentials_no": req.body["t_wfjb_report.anonymity_credentials_no"] || "",
                        "t_wfjb_report.anonymity_phone": req.body["t_wfjb_report.anonymity_phone"] || "",
                        "t_wfjb_report.anonymity_email": req.body["t_wfjb_report.anonymity_email"] || "",
                        "t_wfjb_report.anonymity_user_name": req.body["t_wfjb_report.anonymity_user_name"] || ""
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//查询结果
const search = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "3",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        report_no: req.body.report_no,
        search_code: req.body.search_code
    };
    if (util.isEmptyValue("networkCrimeReportCon.search", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        networkCrimeReportService.postData(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};
/*举报类型*/
const reportType = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "4",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        secondValue: req.body.secondValue
    };
    if (util.isEmptyValue("networkCrimeReportCon.reportType", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        networkCrimeReportService.postData(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};

const country = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "5",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        secondValue: req.body.secondValue
    };
    if (util.isEmptyValue("networkCrimeReportCon.country", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        networkCrimeReportService.postData(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};
/*获取其他下拉内容*/

const allType = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "6",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("networkCrimeReportCon.allType", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        networkCrimeReportService.postData(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};
exports.networkCrimeReportCon = networkCrimeReportCon;