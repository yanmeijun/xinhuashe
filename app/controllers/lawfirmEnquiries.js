const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    lawfirmEnquiriesService = require("../logics/lawfirmEnquiries").lawfirmEnquiriesService;
const path = "lawfirmEnquiries/";
const serviceID = "ZAA0001", templateID = "lawfirmEnquiries";
let lawfirmEnquiriesCon = {};

lawfirmEnquiriesCon.getCon = (req, res, next) => {
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
    console.log("律师事务所查询renderName: " + renderName);
    const cityID = req.query.cityID;
    cityDAO.get(cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
}
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("律师事务所查询请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
}
/*地区,关键词查询功能*/
const queryString = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "1",
        serviceId: templateID,
        randomKey: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
    };
    if (util.isEmptyValue("lawfirmEnquiriesCon.queryString", params)) {
        res.send({"retCode": "000001", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.dept_name = req.body.dept_name || "";//事务所名称
        params.districtcode = req.body.districtcode || "";//事务所名称
        params.pagenum =  req.body.pagenum || "1", //当前页数
        params.pagesize =  req.body.pagesize || "5" //每页数量
        lawfirmEnquiriesService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "律师事务所查询正文",//服务名称
                    params: {//请求参数
                        dept_name : req.body.dept_name, //事务所名称
                        districtcode : req.body.districtcode, //省级或者城市级地区代号
                        pagenum : req.body.pagenum, //当前页数
                        pagesize : req.body.pagesize //每页数量
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        })
    }
};
/*查询省及直辖市*/
const quueryProvince = (req, res, next) => {
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

    };
    if (util.isEmptyValue("lawfirmEnquiriesCon.quueryProvince", params)) {
        res.send({"retCode": "000001", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        lawfirmEnquiriesService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "律师事务所查询查询-省及直辖市接口",//服务名称
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
/*城市查询*/
const quueryCity = (req, res, next) => {
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
        pkid : req.body.pkid //城市id

    };
    if (util.isEmptyValue("lawfirmEnquiriesCon.quueryCity", params)) {
        res.send({"retCode": "000001", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        lawfirmEnquiriesService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "律师事务所查询查询-城市查询接口",//服务名称
                    params: {//请求参数
                        pkid: req.body.pkid //城市id
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        })
    }
};


exports.lawfirmEnquiriesCon = lawfirmEnquiriesCon;