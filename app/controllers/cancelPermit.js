const urlParse = require('url'),
    _ = require('underscore'),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    cancelPermitService = require("../logics/cancelPermit").cancelPermitService;
const path = "cancelPermit/", templateID = "gwyDevolution";
let cancelPermitCon = {};

cancelPermitCon.getCon = (req, res, next) => {
    //const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
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
    console.log("取消的职业资格许可和认定事项renderName: " + renderName);
    const cityID = req.query.cityID;
    cityDAO.get(cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("取消的职业资格许可和认定事项请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
//取消的职业资格许可和认定事项查询
const cancelPermitSearch = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "5",
        serviceId: templateID,
        pageNo: req.body.pageNo,//页码
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("cancelPermitCon.cancelPermitSearch", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        params.searchContent = req.body.searchContent;//查询条件
        params.department = req.body.department;//部门（默认值为空，即全部）
        cancelPermitService.cancelPermit(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: "LAD0001",//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "取消的职业资格许可和认定事项查询",//服务名称
                    params: {//请求参数
                        pageNo: req.body.pageNo,//页码
                        searchContent: req.body.searchContent,//查询条件
                        department: req.body.department,//部门（默认值为空，即全部）
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};

//国务院已公布下放的行政审批事项查询
const cancelPermitPublic = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "7",
        serviceId: templateID,
        pageNo: req.body.pageNo,//页码
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("cancelPermitCon.cancelPermitPublic", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        params.searchContent = req.body.searchContent;//查询条件
        params.department = req.body.department;//部门（默认值为空，即全部）
        cancelPermitService.cancelPermit(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: "LAD0002",//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "国务院已公布下放的行政审批事项查询",//服务名称
                    params: {//请求参数
                        pageNo: req.body.pageNo,//页码
                        searchContent: req.body.searchContent,//查询条件
                        department: req.body.department,//部门（默认值为空，即全部）
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
exports.cancelPermitCon = cancelPermitCon;