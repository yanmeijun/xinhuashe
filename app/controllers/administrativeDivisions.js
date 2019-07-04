const urlParse = require('url'),
    _ = require('underscore'),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    administrativeDivisionsService = require("../logics/administrativeDivisions").administrativeDivisionsService;
const path = "administrativeDivisions/";
let administrativeDivisionsCon = {};
const serviceID = "LAB0001", templateID = "administrativeDivisions";

administrativeDivisionsCon.getCon = (req, res, next) => {
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
    console.log("全国行政区划信息查询renderName: " + renderName);
    const cityID = req.query.cityID;
    cityDAO.get(cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("全国行政区划信息查询请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
//按照地区选择查询
const searchByCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "1",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        shengji: req.body.shengji
    };
    if (util.isEmptyValue("administrativeDivisionsCon.searchByCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.diji = req.body.diji;
        params.xianji = req.body.xianji;
        administrativeDivisionsService.administrativeDivisions(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "全国行政区划按照地区选择查询",//服务名称
                    params: {//请求参数
                        shengji: req.body.shengji,
                        diji: req.body.diji,
                        xianji: req.body.xianji
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//按照地区关键字查询
/*const searchByKeyword = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "2",
        serviceId: templateID,
        keyword: req.body.keyword,//地区名字关键字
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("administrativeDivisionsCon.searchByKeyword", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        administrativeDivisionsService.administrativeDivisions(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "全国行政区划按照地区关键字查询",//服务名称
                    params: {//请求参数
                        keyword: req.body.keyword//地区名字关键字
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};*/
//获取城市列表、获取区县列表
/*const getCityOrCounty = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: req.body.taskId,
        serviceId: templateID,
        parentcode: req.body.parentcode,//地区的行政区划代码
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("administrativeDivisionsCon.getCity", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        administrativeDivisionsService.administrativeDivisions(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};*/
const getCityOrCounty = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "2",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        shengji: req.body.shengji
    };
    if (util.isEmptyValue("administrativeDivisionsCon.getCity", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.diji = req.body.diji;
        administrativeDivisionsService.administrativeDivisions(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};

exports.administrativeDivisionsCon = administrativeDivisionsCon;