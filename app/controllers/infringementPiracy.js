const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    infringementPiracyService = require("../logics/infringementPiracy").infringementPiracyService;
const path = "infringementPiracy/";
let infringementPiracyCon = {};
const serviceID = "IAJ0001", templateID = "Infringement";

infringementPiracyCon.getCon = (req, res, next) => {
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
    console.log("侵权盗版举报renderName: " + renderName);
    const cityID = req.query.cityID;
    cityDAO.get(cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("侵权盗版举报请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
//侵权盗版举报查询 获取验证码
const infringementPiracyVerification = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "1",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("infringementPiracyCon.infringementPiracyVerification", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        infringementPiracyService.infringementPiracy(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    //http://47.96.254.45/service/
                    res.send(results.responseBody.data);
                } else {
                    res.send("/images/refreshCode.png");
                }
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "侵权盗版举报查询-获取验证码",//服务名称
                    params: {//请求参数
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
                //res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//侵权盗版举报查询
const infringementPiracySearch = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "2",
        serviceId: templateID,
        realName: req.body.realName,//真实姓名
        phone: req.body.phone,//联系电话
        email: req.body.email,//电子邮件
        title: req.body.title,//单位或个人
        content: req.body.content,//事实与线索
        code: req.body.code,//验证码
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("infringementPiracyCon.infringementPiracySearch", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        params.organization = req.body.organization;//化名
        params.address = req.body.address;//通讯地址
        params.postCode = req.body.postCode;//邮政编码
        params.kaipu_file = req.body.kaipu_file;//附件
        params.wzbaxx = req.body.wzbaxx;//网站备案信息
        params.wzmcjwz = req.body.wzmcjwz;//网站名称及网址
        params.dxdz = req.body.dxdz;//详细地址
        params.fax = req.body.fax;//联系电话
        infringementPiracyService.infringementPiracy(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "侵权盗版举报查询",//服务名称
                    params: {//请求参数
                        realName: req.body.realName,//真实姓名
                        phone: req.body.phone,//联系电话
                        email: req.body.email,//电子邮件
                        title: req.body.title,//单位或个人
                        content: req.body.content,//事实与线索
                        code: req.body.code,//验证码
                        organization: req.body.organization,//化名
                        address: req.body.address,//通讯地址
                        postCode: req.body.postCode,//邮政编码
                        kaipu_file: req.body.kaipu_file,//附件
                        wzbaxx: req.body.wzbaxx,//网站备案信息
                        wzmcjwz: req.body.wzmcjwz,//网站名称及网址
                        dxdz: req.body.dxdz,//详细地址
                        fax: req.body.fax//联系电话
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
exports.infringementPiracyCon = infringementPiracyCon;