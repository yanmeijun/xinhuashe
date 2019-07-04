const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    userLogDAO = require('../dao/userLog').userLogDAO,
    bjGJJService = require("../logics/bjGJJ").bjGJJService,
    cityDAO = require('../dao/city').cityDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO;
const path = "bjGJJ/";
const serviceID = "BAB0001", templateID = "BeijingFund";
let bjgjjCon = {};

bjgjjCon.getCon = (req, res, next) => {
    if (req.method.toUpperCase() === "GET") {
        if (_.isEmpty(req.query.page)) {
            apiCon(req, res, next)
        } else {
            pageCon(req, res, next)
        }
    } else {
        apiCon(req, res, next);
    }
}
const pageCon = (req, res, next) => {
    const renderName = req.query.page;
    console.log("北京公积金查询renderName: " + renderName);
    const cityID = req.query.cityID;
    cityDAO.get(cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
}
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("北京公积金查询请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
}
/*const login = (req, res, next) => {
    const {randomKey, userID, clientID, cityID, local_x, local_y, citySRC, cityName} = req.body;
    const type = req.body.type,
        veriCode = req.body.veriCode,
        password = req.body.password,
        idCode = req.body.idCode;
    var url = config.get("api.apiInfo.host_199") + "/bjsgrzfgjj/login?iw-apikey=" + config.get("api.apiInfo.apikey_199") + "&iw-cmd=grgjjInfo&idCode="
        + idCode + "&password=" + password + "&type=" + type + "&veriCode=" + veriCode + "&APISession=" + randomKey;
    console.log("grgjjInfo:" + url);
    util.getData(url, {rejectUnauthorized: false}, (err, body) => {
        cityDAO.get(cityID, (err, cityInfo) => {
            if (err) {
                return next(err)
            } else if (body.rtnCode == '000000' && !_.isEmpty(body.data)) {
                res.render(path + "bjGJJIndex", {
                    data: body,
                    randomKey: randomKey,
                    cityID: cityID,
                    userID: userID,
                    clientID: clientID,
                    local_x: local_x, localFrom: localFrom,
                    local_y: local_y,
                    cityInfo: cityInfo
                });
            } else {
                res.render(path + "bjGJJ", {
                    data: body,
                    type: type,
                    idCode: idCode,
                    randomKey: randomKey,
                    cityID: cityID,
                    userID: userID,
                    clientID: clientID,
                    local_x: local_x, localFrom: localFrom,
                    local_y: local_y,
                    cityInfo: cityInfo,
                    errMsg: body.rtnMsg == "success" ? "未查询到数据" : body.rtnMsg
                });
            }
            // res.send(body);
        })
    })
};*/
//验证方式
/*const VerificationMethod = (req, res, next) => {
    const params = {
        randomKey: req.query.randomKey,
        userID: req.query.userID,
        clientID: req.query.clientID,
        cityID: req.query.cityID,
        local_x: req.query.local_x,
        local_y: req.query.local_y
    };
    if (util.isEmptyValue("bjgjjCon.VerificationMethod", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        bjGJJService.getVerifyMethod(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }

};*/
//登录
/*const MPFLogin = (req, res, next) => {
    const params = {
        randomKey: req.query.randomKey,
        userID: req.query.userID,
        clientID: req.query.clientID,
        cityID: req.query.cityID,
        local_x: req.query.local_x,
        local_y: req.query.local_y,
        yzfs: req.query.yzfs,
        password: req.query.password,
        hm: req.query.hm
    };
    if (util.isEmptyValue("bjgjjCon.MPFLogin", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        bjGJJService.getMPFLogin(params)
            .then((results) => {
                if (results.rtnCode == "000000") {
                    var modifyFields = {
                        userName: params.hm,
                        password: params.password,
                        loginType: params.yzfs,
                        localFrom: req.body.localFrom
                    };
                    userLoginInfoDAO.modify(params.clientID, serviceID, modifyFields, () => {
                    });
                }
                var logData = {
                    localFrom: req.query.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: "1",//引擎模板服务taskID
                    taskName: "北京公积金登录",//服务名称
                    params: {//请求参数
                        yzfs: req.query.yzfs,
                        password: req.query.password,
                        hm: req.query.hm
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};*/

const MPFLogin = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "1",
        serviceId: templateID,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y,
        yzfs: req.body.yzfs,//登录方式
        mm: req.body.password,//密码
        hm: req.body.hm//号码
    };
    if (util.isEmptyValue("bjgjjCon.MPFLogin", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        bjGJJService.postData(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    var modifyFields = {
                        userName: params.hm,
                        password: params.mm,
                        loginType: params.yzfs,
                        localFrom: req.body.localFrom
                    };
                    userLoginInfoDAO.modify(params.clientID, serviceID, modifyFields, () => {
                    });
                }
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京公积金登录",//服务名称
                    params: {//请求参数
                        yzfs: req.body.yzfs,//登录方式
                        mm: req.body.password,//密码
                        hm: req.body.hm//号码
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//北京市个人公积金查询
const getfund = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "2",
        serviceId: templateID,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y
    };
    if (util.isEmptyValue("bjgjjCon.getfund", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        bjGJJService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京市个人公积金查询",//服务名称
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
//住房公积金账户信息查询
const housingFund = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "3",
        serviceId: templateID,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y,
        ksrq: req.body.ksrq,//开始日期
        zzrq: req.body.jsrq,//结束日期
        list_page_no: req.body.pageNum, //页码
        gjjywxx_pagesize:"10"
    };
    if (util.isEmptyValue("bjgjjCon.housingFund", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        bjGJJService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京公积金住房公积金账户信息查询",//服务名称
                    params: {//请求参数
                        ksrq: req.body.ksrq,//开始日期
                        zzrq: req.body.jsrq,//结束日期
                        list_page_no: req.body.pageNum, //页码
                        gjjywxx_pagesize:"10"
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//住房公积金业务信息查询
/*const getBusinessFund = (req, res, next) => {
    const params = {
        randomKey: req.query.randomKey,
        userID: req.query.userID,
        clientID: req.query.clientID,
        cityID: req.query.cityID,
        local_x: req.query.local_x,
        local_y: req.query.local_y,
        ksrq: req.query.ksrq,//开始日期
        jsrq: req.query.jsrq,//结束日期
        page: req.query.pageNum //页码
    };
    if (util.isEmptyValue("bjgjjCon.businessFund", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        bjGJJService.getBusinessFund(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.query.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: "4",//引擎模板服务taskID
                    taskName: "住房公积金业务信息查询",//服务名称
                    params: {//请求参数
                        ksrq: req.query.ksrq,//开始日期
                        jsrq: req.query.jsrq,//结束日期
                        page: req.query.pageNum //页码
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};*/
exports.bjgjjCon = bjgjjCon;