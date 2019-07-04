const urlParse = require('url'),
    _ = require('underscore'),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    remoteHospService = require("../logics/remoteHosp").remoteHospService;
const path = "remoteHosp/", templateID = "dingdianyiliao", serviceID = "DAB0001";
let remoteHospCon = {};

remoteHospCon.getCon = (req, res, next) => {
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
    console.log("异地定点医疗机构查询renderName: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("异地定点医疗机构查询请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
//所属行政区编码查询
const getRegionCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "1",
        serviceId: templateID,
        // aab301: req.body.aab301,//地区编码代号（获取省级编码时，aab301为空；获取市级编码时，aab301等于上一级的获取到的编码；区级编码同上。）
        randomKey: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("remoteHospCon.remoteHospSearch", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.aab301 = req.body.aab301;
        remoteHospService.remoteHosp(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "异地定点医疗机构查询所属行政区编码查询",//服务名称
                    params: {//请求参数
                        aab301: req.body.aab301
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//异地定点医疗机构查询
const remoteHospSearch = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "2",
        serviceId: templateID,
        pageNo: req.body.pageNo,//当前页
        randomKey: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("remoteHospCon.remoteHospSearch", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.provinceDesc = req.body.provinceDesc;//省级名称
        params.aab299 = req.body.aab299;//所属行政区编码（河北省的编码为：130000，所以aab299=13，取省的前两位；如果选择河北省、邯郸市，又邯郸市的编码为：130400，则aab229=1304，取市的前四位。）
        params.townDesc = req.body.townDesc;//市级名称
        params.akb021 = req.body.akb021; //医疗机构名称
        remoteHospService.remoteHosp(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "异地定点医疗机构查询",//服务名称
                    params: {//请求参数
                        pageNo: req.body.pageNo,
                        provinceDesc: req.body.provinceDesc,
                        aab299: req.body.aab299,
                        townDesc: req.body.townDesc,
                        akb021: req.body.akb021
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//异地就医经办机构查询
const mechanismSearch = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "3",
        serviceId: templateID,
        pageNo: req.body.pageNo,//当前页
        randomKey: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("remoteHospCon.mechanismSearch", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.yab003 = req.body.yab003;//所在行政区编码
        params.provinceDesc = req.body.provinceDesc;//省级名称
        params.countyDesc = req.body.countyDesc;//区级名称
        params.townDesc = req.body.townDesc;//市级名称
        remoteHospService.remoteHosp(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: "DAB0002",//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "异地就医经办机构查询",//服务名称
                    params: {//请求参数
                        pageNo: req.body.pageNo,
                        yab003: req.body.yab003,//所在行政区编码
                        provinceDesc: req.body.provinceDesc,
                        countyDesc: req.body.countyDesc,
                        townDesc: req.body.townDesc
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
exports.remoteHospCon = remoteHospCon;