const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    publishedReportService = require("../logics/publishedReport").publishedReportService;
const path = "publishedReport/";
const serviceID = "IAC0016", templateID = "publishedReport";
let publishedReportCon = {};
publishedReportCon.getCon = (req, res, next) => {

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
    console.log("非法出版活动举报renderName: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("非法出版活动举报方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};

//非法出版活动举报（验证码下载）
const verificationCode =  (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "1",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
    };

    if (util.isEmptyValue("publishedReportCon.VerificationCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        publishedReportService.postData(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    //http://47.96.254.45/service/
                    res.send(results.responseBody.data);
                } else {

                    res.send("/images/refreshCode.png");
                }
                /*var logData = {
                 localFrom: req.body.localFrom,//项目用户名称
                 clientID: params.clientID,//用户设备ID
                 serviceID: serviceID,//前台服务ID
                 templateID: templateID,//引擎模板服务ID
                 taskId: params.taskId,//引擎模板服务taskID
                 taskName: "纪检监察机举报验证码",//服务名称
                 params: {//请求参数
                 },
                 results: JSON.stringify(results)//返回结果
                 };
                 userLogDAO.add(logData);*/

            }).catch((err) => {
            res.send(err);
        });


    }
};
//校验验证码
const verificationCode_check = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "2",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        code: req.body.code //查询码
    };

    if (util.isEmptyValue("publishedReportCon.verificationCode_check", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        publishedReportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "非法出版活动举报-校验验证码",//服务名称
                    params: {//请求参数
                        code: req.body.code //查询码
                    },
                    results: JSON.stringify(results)//返回结果
                };

                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//非法出版活动举报（举报正文）
const reportContents = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "3",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        realName: req.body.realName, //真实姓名
        cardNo: req.body.cardNo, //性别
        phone: req.body.phone, //联系电话
        email: req.body.email, //邮箱
        title: req.body.title, //单位或者个人
        dxdz: req.body.dxdz, //举报对象-详细地址
        content: req.body.content, //事实与线索
        fileUrl: req.body.fileUrl, //上传文件的oss地址
        valiCode: req.body.valiCode, //验证码
        organization: req.body.organization, //化名
        postCode: req.body.postCode, //邮编
        address: req.body.address, //地址
        fax: req.body.fax //举报对象-联系电话
    };

    if (util.isEmptyValue("publishedReportCon.reportContents", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        publishedReportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "非法出版活动举报-查询",//服务名称
                    params: {//请求参数
                        realName: req.body.realName, //真实姓名
                        cardNo: req.body.cardNo, //性别
                        phone: req.body.phone, //联系电话
                        email: req.body.email, //邮箱
                        title: req.body.title, //单位或者个人
                        dxdz: req.body.dxdz, //举报对象-详细地址
                        content: req.body.content, //事实与线索
                        fileUrl: req.body.fileUrl, //上传文件的oss地址
                        valiCode: req.body.valiCode, //验证码
                        organization: req.body.organization, //化名
                        postCode: req.body.postCode, //邮编
                        address: req.body.address, //地址
                        fax: req.body.fax //举报对象-联系电话
                    },
                    results: JSON.stringify(results)//返回结果
                };

                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};

//上传文件
const uploadFile = (req, res, next) => {
    const filePath = "./" + templateID + Math.random().toString(36).substr(2) + "/";
    util.uploadFile(req, {filePath: filePath})
        .then(filePathList => {
            Promise.all(filePathList.map(item => {
                return new Promise((resolve, reject) => {
                    util.uploadToOss(item).then(url => {
                        resolve(url)
                    })
                });
            })).then(results => {
                res.send(results);
                util.deleteFolder(filePath)
            })
        })
};

exports.publishedReportCon = publishedReportCon;

