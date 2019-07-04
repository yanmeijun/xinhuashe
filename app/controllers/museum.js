const urlParse = require('url'),
    _ = require('underscore'),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    museumService = require("../logics/museum").museumService;
const path = "museum/";
let museumCon = {};

museumCon.getCon = (req, res, next) => {
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
    console.log("中国国家博物馆网上预约信息查询renderName: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        if (renderName == "onlineBooking") {
            let param = req.query.param;
            let id = param.split("_")[1],
                cgrq = param.split("_")[0].split("星")[0];
            res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo, id: id, cgrq: cgrq}));
        } else {
            res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
        }
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("中国国家博物馆网上预约信息查询请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
//博物馆网上预约服务列表查询
const dateList = (req, res, next) => {
    const params = {
        randomKey: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("museumCon.dateList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        museumService.dateList(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//博物馆网上预约
const register = (req, res, next) => {
    const params = {
        cgrq: req.body.cgrq,//参观日期
        xm: req.body.xm,//姓名
        zjh: req.body.zjh,//证件号
        Email: req.body.Email,//邮箱
        code: req.body.code,//验证码
        id: req.body.id,//预约id（dateList接口返回）
        randomKey: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("museumCon.register", params)) {
        res.render(path + "onlineBooking", _.extend(params, {err: "请求参数不完整，请检查！"}))
        // res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        cityDAO.get(params.cityID, (err, cityInfo) => {
            let sendBackParams = _.extend(params, {cityInfo: cityInfo});
            museumService.register(params)
                .then((results) => {
                    if (results.rtnCode == '000000') {
                        res.render(path + "reservationSuccess", _.extend(sendBackParams, results.data))
                    } else {
                        res.render(path + "onlineBooking", _.extend(sendBackParams, {err: results.rtnMsg}))
                    }
                    // res.send(results);
                }).catch((err) => {
                res.render(path + "onlineBooking", _.extend(sendBackParams, {err: err}))
                // res.send(err);
            });
        });
    }
};
//博物馆网上预约列表查询
const registerSearch = (req, res, next) => {
    const params = {
        xm: req.body.xm,//姓名
        zjh: req.body.zjh,//证件号
        randomKey: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("museumCon.registerSearch", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        museumService.registerSearch(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};
exports.museumCon = museumCon;