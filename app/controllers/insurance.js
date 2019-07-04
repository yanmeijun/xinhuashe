const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    insuranceService = require("../logics/insurance").insuranceService;
const path = "insurance/";
const serviceID = "BAA0001", templateID = "bjSecurity";
let insuranceCon = {};

insuranceCon.getCon = (req, res, next) => {
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
    console.log("北京社保查询renderName: " + renderName);
    const cityID = req.query.cityID;
    cityDAO.get(cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("北京社保查询请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
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
    if (util.isEmptyValue("insuranceCon.getVeryCode", params)) {
        res.send({"retCode": "000001", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        insuranceService.postData(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    res.send({
                        data: results.responseBody.data,
                        code: results.responseBody.code
                    });
                } else {
                    res.send({data: "/images/refreshCode.png"});
                }
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京社保查询获取图片验证码",//服务名称
                    params: {//请求参数
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send({data: "/images/refreshCode.png"});
        })
    }
};
//获取短信验证码
const getPhoneCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "3",
        serviceId: templateID,
        idCode: req.body.cardno,
        logPass: req.body.password,
        safeCode: req.body.validcod,
        randomKey: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("insuranceCon.getPhoneCode", params)) {
        res.send({"retCode": "000001", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        insuranceService.postData(params)
            .then((results) => {
                if (results.retCode == "000000" && results.responseBody.data.indexOf("1") > -1) {
                    var modifyFields = {
                        userName: params.idCode,
                        password: params.logPass,
                        localFrom: req.body.localFrom
                    };
                    userLoginInfoDAO.modify(params.clientID, serviceID, modifyFields, () => {
                    });
                }
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京社保查询获取短信验证码",//服务名称
                    params: {//请求参数
                        idCode: req.body.cardno,
                        logPass: req.body.password,
                        safeCode: req.body.validcod
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//登录
const login = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "4",
        serviceId: templateID,
        i_phone: req.body.i_phone,
        randomKey: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("insuranceCon.login", params)) {
        res.send({"retCode": "000001", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        insuranceService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京社保登录",//服务名称
                    params: {//请求参数
                        i_phone: req.body.i_phone,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//获取个人基本信息
const getBasicInfo = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "5",
        serviceId: templateID,
        randomKey: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("insuranceCon.getBasicInfo", params)) {
        res.send({"retCode": "000001", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        insuranceService.postData(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    let _results = {
                        retCode: results.retCode,
                        data: JSON.parse(results.responseBody.data).basicInfo
                    };
                    _results.data.img = _results.data.sbphoto;
                    res.send(_results);
                } else {
                    res.send(results);
                }
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京社保获取个人基本信息",//服务名称
                    params: {//请求参数
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//个人缴费信息查询
const searchByYear = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "7",
        serviceId: templateID,
        searchYear: req.body.searchYear,
        type: req.body.type,
        randomKey: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("insuranceCon.searchByYear", params)) {
        res.send({"retCode": "000001", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        insuranceService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京社保个人缴费信息查询",//服务名称
                    params: {//请求参数
                        searchYear: req.body.searchYear,
                        type: req.body.type,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//医疗保险待遇查询
const getSecurity = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "8",
        serviceId: templateID,
        randomKey: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("insuranceCon.getSecurity", params)) {
        res.send({"retCode": "000001", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        insuranceService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京社保医疗保险待遇查询",//服务名称
                    params: {//请求参数
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
exports.insuranceCon = insuranceCon;