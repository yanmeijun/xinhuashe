const urlParse = require('url'),
    _ = require('underscore'),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    haiNanTourismService = require("../logics/haiNanTourism").haiNanTourismService;
const path = "haiNanTourism/" , serviceID = "GAB0003";
let haiNanTourismCon = {};

haiNanTourismCon.getCon = (req, res, next) => {
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
    console.log("海南省景区查询renderName: " + renderName);
    const cityID = req.query.cityID;
    cityDAO.get(cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("海南省景区查询请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
const search = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "1",
        serviceId: "haiNanTourism",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        page: req.body.page,
        pagesize: req.body.pagesize,
        Theme: req.body.Theme,
        crowd: req.body.crowd,
        ScenicLevel: req.body.ScenicLevel,
        Price_down: req.body.Price_down,
        Price_up: req.body.Price_up,
        organID: req.body.organID,
        RelatedWords: req.body.RelatedWords,
        timestamp: (new Date()).getDate()
    };
    // if (util.isEmptyValue("haiNanTourismCon.haiNanTourismSearchs", params)) {
    //     res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    // } else {
    haiNanTourismService.haiNanTourismSearchAll(params)
        .then((results) => {
            res.send(results);
            var logData = {
                localFrom: req.body.localFrom,//项目用户名称
                clientID: req.body.clientID,//用户设备ID
                serviceID: serviceID,//前台服务ID
                templateID: params.serviceId,//引擎模板服务ID
                taskId: params.taskId,//引擎模板服务taskID
                taskName: "海南省景区查询",//服务名称
                params: {//请求参数
                    page: req.body.page,
                    pagesize: req.body.pagesize,
                    Theme: req.body.Theme,
                    crowd: req.body.crowd,
                    ScenicLevel: req.body.ScenicLevel,
                    Price_down: req.body.Price_down,
                    Price_up: req.body.Price_up,
                    organID: req.body.organID,
                    RelatedWords: req.body.RelatedWords,
                },
                results: JSON.stringify(results)//返回结果
            };
            userLogDAO.add(logData);
        }).catch((err) => {
        res.send(err);
    });
    // }
};
exports.haiNanTourismCon = haiNanTourismCon;