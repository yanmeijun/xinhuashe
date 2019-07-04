const urlParse = require('url'),
    _ = require('underscore'),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    buildEntCertificateService = require("../logics/buildEntCertificate").buildEntCertificateService;
const path = "buildEntCertificate/";
const serviceID = "CAG0003", templateID = "Certifications";
let buildEntCertificateCon = {};

buildEntCertificateCon.getCon = (req, res, next) => {
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
    console.log("建设工程企业资质证书查询renderName: " + renderName);
    const cityID = req.query.cityID;
    cityDAO.get(cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("建设工程企业资质证书查询请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
//建设工程企业资质证书查询
const buildEntCertificate = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "1",
        serviceId: templateID,
        currentPage: req.body.currentPage,//页码
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("buildEntCertificateCon.buildEntCertificate", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.filter_LIKE_QYMC = req.body.filter_LIKE_QYMC;//企业名称
        params.filter_LIKE_YYZZZCH = req.body.filter_LIKE_YYZZZCH;//统一社会信用代码或营业执照注册号
        params.filter_LIKE_ZSBH = req.body.filter_LIKE_ZSBH;//资质证书号
        params.filter_LIKE_XXDZ = req.body.filter_LIKE_XXDZ;//详细地址
        buildEntCertificateService.buildEntCertificate(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    res.send(_.extend(JSON.parse(results.responseBody.data), {retCode: "000000"}));
                } else {
                    res.send(results);
                }
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "建设工程企业资质证书查询",//服务名称
                    params: {//请求参数
                        currentPage: req.body.currentPage,//页码
                        filter_LIKE_QYMC: req.body.filter_LIKE_QYMC,//企业名称
                        filter_LIKE_YYZZZCH: req.body.filter_LIKE_YYZZZCH,//统一社会信用代码或营业执照注册号
                        filter_LIKE_ZSBH: req.body.filter_LIKE_ZSBH,//资质证书号
                        filter_LIKE_XXDZ: req.body.filter_LIKE_XXDZ//详细地址
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//建设工程企业资质证书-查看详情
const certificateDetail = (req, res, next) => {
    const params = {
        randomKey: req.query.randomKey,//用户randomKey,用来识别用户的唯一性
        sessionId: req.query.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "2",
        serviceId: templateID,
        ZSBH: req.query.ZSBH,//证书编号
        userID: req.query.userID,//用户userID
        clientID: req.query.clientID,//用户设备id
        cityID: req.query.cityID,//城市代号
        local_x: req.query.local_x,//城市经度
        local_y: req.query.local_y//城市纬度
    };
    if (util.isEmptyValue("buildEntCertificateCon.certificateDetail", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        buildEntCertificateService.buildEntCertificate(params)
            .then((results) => {
                cityDAO.get(params.cityID, (err, cityInfo) => {
                    // cityInfo.citySRC = cityInfo.citySRC.replace(".","");
                    if (results.retCode == "000000") {
                        res.render(path + "result", _.extend(_.extend(params, {cityInfo: cityInfo}), results.responseBody))
                    } else {
                        res.render(path + "buildEntCertificate", _.extend(_.extend(params, {cityInfo: cityInfo}), {
                            err: results
                        }))
                    }
                })
                var logData = {
                    localFrom: req.query.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "建设工程企业资质证书-查看详情",//服务名称
                    params: {//请求参数
                        ZSBH: req.query.ZSBH,//证书编号
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
                // res.send(results);
            }).catch((err) => {
            cityDAO.get(params.cityID, (err, cityInfo) => {
                cityInfo.citySRC = cityInfo.citySRC.replace(".", "");
                res.render(path + "buildEntCertificate", _.extend(_.extend(params, {cityInfo: cityInfo}), {err: err}))
            });
        });
    }
};
exports.buildEntCertificateCon = buildEntCertificateCon;