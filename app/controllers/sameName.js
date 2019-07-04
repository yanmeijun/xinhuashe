const urlParse = require('url'),
    _ = require('underscore'),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    sameNameService = require("../logics/sameName").sameNameService;
const path = "sameName/";
let sameNameCon = {};
const serviceID = "ZAQ0001", templateID = "sameName";
sameNameCon.getCon = (req, res, next) => {
    if (req.method.toUpperCase() === "GET") {
        pageCon(req, res, next);
    } else {
        apiCon(req, res, next);
    }
}

const pageCon = (req, res, next) => {
    const renderName = req.query.page;
    console.log("同名查询renderName: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
}
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("同名查询请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
}
const getSameName = (req, res, next) => {
    let params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        serviceId: "sameName",//城市纬度
        queryName: req.body.queryName//查询的姓名
    };
    if (util.isEmptyValue("sameNameCon.getSameName", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        const provinceNum = params.cityID.substring(0, 2);
        switch (provinceNum) {
            case "41"://河南省重名查询
                params = _.extend(params, {
                    "taskId": "2",
                    "form_areaid": req.body.form_areaid || "410000",
                    "form_areaname": req.body.form_areaname || "全部"
                });
                break;
            case "46"://海南省重名查询
                params = _.extend(params, {"taskId": "3"});
                break;
            case "32"://江苏省重名查询
                params = _.extend(params, {"taskId": "4"});
                break;
            case "14"://山西省重名查询
                params = _.extend(params, {"taskId": "5"});
                break;
            case "22"://吉林省重名查询
                params = _.extend(params, {"taskId": "6"});
                break;
        }
        sameNameService.getService(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "同名查询",//服务名称
                    params: {//请求参数
                        queryName: req.body.queryName,//查询的姓名
                        "form_areaid": req.body.form_areaid || "410000",
                        "form_areaname": req.body.form_areaname || "全部"
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//获取区县的名称和ID
const getCityDetail = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        serviceId: "sameName",//城市纬度
        taskId: "1",//城市纬度
        pID: req.body.pID//市级编号
    };
    if (util.isEmptyValue("sameNameCon.getCityDetail", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        sameNameService.getService(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "同名查询获取区县的名称和ID",//服务名称
                    params: {//请求参数
                        pID: req.body.pID//市级编号
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}

exports.sameNameCon = sameNameCon;