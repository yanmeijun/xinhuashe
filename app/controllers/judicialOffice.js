const urlParse = require('url'),
    _ = require('underscore'),
    util = require('../../lib/util').util,
    userLogDAO = require('../dao/userLog').userLogDAO,
    judicialOfficeService = require("../logics/judicialOffice").judicialOfficeService;
const path = "judicialOffice/";
let judicialOfficeCon = {};
const serviceID = "YAB0001", templateID = "JudicialOffice";

judicialOfficeCon.getCon = (req, res, next) => {
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
const pageCon = (req, res, next) => {
    const renderName = req.query.page;
    console.log("司法所查询查询renderName: " + renderName);
    // const cityID = req.query.cityID;
    // cityDAO.get(cityID, (err, cityInfo) => {
    res.render(path + renderName, req.query);
    // })
}
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("司法所查询查询请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
}
const search = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        serviceId: templateID,//城市纬度
        taskId: "2"
    };
    if (util.isEmptyValue("judicialOffice.next", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        params["Xzqh"] = req.body.Xzqh;
        params["PageIndex"] = req.body.PageIndex;
        params["Query"] = req.body.Query;
        judicialOfficeService.allSearch(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    res.send(results);
                } else {
                    res.send(err);
                }
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "司法所查询查询",//服务名称
                    params: {//请求参数
                        Xzqh:req.body.Xzqh,
                        PageIndex:req.body.PageIndex,
                        Query:req.body.Query
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}

const getCode = (req, res, next) => {
    const params = {
        serviceId: templateID,
        taskId: "1",
        sessionId: req.body.randomKey,
        randomKey: req.body.randomKey,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y
    };
    if (util.isEmptyValue("JudicialOffice.search", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        judicialOfficeService.allSearch(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    res.send(results);
                } else {
                    res.send(err);
                }
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "司法所查询查询地区选择",//服务名称
                    params: {//请求参数

                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}


exports.judicialOfficeCon = judicialOfficeCon;