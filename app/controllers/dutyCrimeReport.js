const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    dutyCrimeReportService = require("../logics/dutyCrimeReport").dutyCrimeReportService;
const path = "dutyCrimeReport/";
const serviceID = "IAC0015", templateID = "dutyCrimeReport";
let dutyCrimeReportCon = {};

dutyCrimeReportCon.getCon = (req, res, next) => {
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
    console.log("最高人民检察院职务犯罪举报renderName: " + renderName);
    const cityID = req.query.cityID;
    cityDAO.get(cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
}
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("最高人民检察院职务犯罪举报请求方法名: " + pathName);
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
    if (util.isEmptyValue("dutyCrimeReportCon.getVeryCode", params)) {
        res.send({"retCode": "000001", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        dutyCrimeReportService.postData(params)
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
                    taskName: "最高人民检察院职务犯罪举报获取图片验证码",//服务名称
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
        taskId: "2",
        serviceId: templateID,
        randomKey: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        JBKJXSLY_SFSM1:req.body.JBKJXSLY_SFSM1,//是否署名
        JBKJXSLY_JBRXM1:req.body.JBKJXSLY_JBRXM1,//姓名
        JBKJXSLY_JBRSFZH1:req.body.JBKJXSLY_JBRSFZH1,//身份证号
        JBKJXSLY_JBRDH1:req.body.JBKJXSLY_JBRDH1,//联系电话
        JBKJXSLY_LXDQ1:req.body.JBKJXSLY_LXDQ1,//所在地区
        JBKJXSLY_BJBRDW1:req.body.JBKJXSLY_BJBRDW1,//姓名（备注：被举报人）
        JBKJXSLY_BJBRXM1:req.body.JBKJXSLY_BJBRXM1,//单位（备注：被举报人）
        JBKJXSLY_AFDQ1:req.body.JBKJXSLY_AFDQ1,//案发地区（备注：被举报人）
        JBKJXSLY_SF1:req.body.JBKJXSLY_SF1,//身份（备注：被举报人）
        JBKJXSLY_ZYSXXZ1:req.body.JBKJXSLY_ZYSXXZ1,//主要涉嫌性质（备注：被举报人）
        JBKJXSLY_SYZY:req.body.JBKJXSLY_SYZY,//举报内容（备注：被举报人）
        number:req.body.number//验证码
    };
    if (util.isEmptyValue("dutyCrimeReportCon.reportText", params)) {
        res.send({"retCode": "000001", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.JBKJXSLY_TSSF1 = req.body.JBKJXSLY_TSSF1;//特殊身份（备注：被举报人）
        params.JBKJXSLY_SALY1 = req.body.JBKJXSLY_SALY1;//涉嫌领域（备注：被举报人）
        dutyCrimeReportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "最高人民检察院职务犯罪举报正文",//服务名称
                    params: {//请求参数
                        JBKJXSLY_SFSM1:req.body.JBKJXSLY_SFSM1,
                        JBKJXSLY_JBRXM1:req.body.JBKJXSLY_JBRXM1,
                        JBKJXSLY_JBRSFZH1:req.body.JBKJXSLY_JBRSFZH1,
                        JBKJXSLY_JBRDH1:req.body.JBKJXSLY_JBRDH1,
                        JBKJXSLY_LXDQ1:req.body.JBKJXSLY_LXDQ1,
                        JBKJXSLY_JBRDWZZ1:req.body.JBKJXSLY_JBRDWZZ1,
                        JBKJXSLY_BJBRXM1:req.body.JBKJXSLY_BJBRXM1,
                        JBKJXSLY_AFDQ1:req.body.JBKJXSLY_AFDQ1,
                        JBKJXSLY_SF1:req.body.JBKJXSLY_SF1,
                        JBKJXSLY_ZYSXXZ1:req.body.JBKJXSLY_ZYSXXZ1,
                        JBKJXSLY_SYZY:req.body.JBKJXSLY_SYZY,
                        number:req.body.number,
                        JBKJXSLY_TSSF1 : req.body.JBKJXSLY_TSSF1,
                        JBKJXSLY_SALY1 : req.body.JBKJXSLY_SALY1
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        })
    }
};
/*查询结果*/
const searchResult = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "3",
        serviceId: templateID,
        randomKey: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        searchCode:req.body.searchCode
    };
    if (util.isEmptyValue("dutyCrimeReportCon.searchResult", params)) {
        res.send({"retCode": "000001", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        dutyCrimeReportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "最高人民检察院职务犯罪举报查询结果",//服务名称
                    params: {//请求参数
                        searchCode:req.body.searchCode
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        })
    }
};
/*地区;身份;性质*/
const allType = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "4",
        serviceId: templateID,
        randomKey: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
    };
    if (util.isEmptyValue("dutyCrimeReportCon.allType", params)) {
        res.send({"retCode": "000001", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        dutyCrimeReportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "最高人民检察院职务犯罪举报获取地区、身份、性质的类型",//服务名称
                    params: {//请求参数
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        })
    }
};
/*涉嫌领域*/
const suspectedArea = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "5",
        serviceId: templateID,
        randomKey: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
    };
    if (util.isEmptyValue("dutyCrimeReportCon.suspectedArea", params)) {
        res.send({"retCode": "000001", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        dutyCrimeReportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "最高人民检察院职务犯罪举报获取涉嫌领域类型",//服务名称
                    params: {//请求参数
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        })
    }
};
exports.dutyCrimeReportCon = dutyCrimeReportCon;