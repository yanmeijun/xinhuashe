const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    shangHaiFundService = require("../logics/shangHaiFund").shangHaiFundService;
const path = "shangHaiFund/";
const serviceID = "BAB0002", templateID = "ShanghaiFund";
let shangHaiFundCon = {};

shangHaiFundCon.getCon = (req, res, next) => {
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
    console.log("上海公积金renderName: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("上海公积金请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
/*
 *获取图片验证码
 */
const verification = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "1",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("shangHaiFundCon.verification", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        shangHaiFundService.all(params)
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
                    taskName: "上海公积金查询获取图片验证码",//服务名称
                    params: {//请求参数
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send({data: "/images/refreshCode.png"});
        });
    }
}
//登陆
const login = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "3",
        username: req.body.username,
        password: req.body.password,
        imagecode: req.body.imagecode,
        password_md5: util.md5(req.body.password),
        ID: req.body.ID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("shangHaiFundCon.login", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params["SUBMIT.x"] = req.body["SUBMIT.x"] || "46";
        params["SUBMIT.y"] = req.body["SUBMIT.y"] || "7";
        shangHaiFundService.all(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    var modifyFields = {
                        userName: params.username,
                        password: params.password,
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
                    taskName: "上海公积金查询登录",//服务名称
                    params: {//请求参数
                        username: req.body.username,
                        password: req.body.password,
                        imagecode: req.body.imagecode,
                        password_md5: util.md5(req.body.password),
                        ID: req.body.ID,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            })
            .catch((err) => {
                res.send(err);
            });
    }
}

//历史详情
const historyDetails = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "4",
        ID: req.body.ID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("shangHaiFundCon.historyDetails", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        shangHaiFundService.all(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "上海公积金查询历史详情",//服务名称
                    params: {//请求参数
                        ID: req.body.ID,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}


exports.shangHaiFundCon = shangHaiFundCon;