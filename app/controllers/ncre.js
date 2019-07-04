const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    ncreService = require("../logics/ncre").ncreService;
const path = "ncre/";
const serviceID = "CAF0003", templateID = "computer";
let ncreCon = {};

ncreCon.getCon = (req, res, next) => {
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
    console.log("全国计算机等级考试查询renderName: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("全国计算机等级考试查询请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
//计算机等级考试时间列表查询
const dateList = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "4",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("ncreCon.dateList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        ncreService.certificate(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "计算机等级考试时间列表查询",//服务名称
                    params: {//请求参数
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//计算机等级考试科目列表查询
const subjectList = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "2",
        examid: req.body.examid,//考试时间编码（第二步中获取）
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("ncreCon.subjectList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        ncreService.certificate(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "计算机等级考试科目列表查询",//服务名称
                    params: {//请求参数
                        examid: req.body.examid,//考试时间编码（第二步中获取）
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//计算机等级证书查询验证码
const verify = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "1",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("ncreCon.verify", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        ncreService.certificate(params)
            .then((results) => {
                if (results.retCode == "000000") {
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
                    taskName: "计算机等级证书查询验证码",//服务名称
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
//计算机等级证书查询
const certificate = (req, res, next) => {
    const params = {
        verify: req.body.verify,//验证码
        ksnf: req.body.ksnf,//考试时间(接口dateList返回的value)
        bkjb: req.body.bkjb,//考试科目(接口subjectList返回的value)
        // ksxm: req.body.ksxm,//参数一(接口dateList返回的ksxm)
        // pram: req.body.pram,//参数二(接口dateList返回的pram)
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "3",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("ncreCon.certificate", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.name = req.body.name;//姓名
        params.sfzh = req.body.sfzh;//身份证证件号码
        params.zkzh = req.body.zkzh;//准考证号
        params.zsbh = req.body.zsbh;//证书编号
        ncreService.certificate(params)
            .then((results) => {
                results.responseBody.tx = config.get("system.imgUrl") + results.responseBody.tx;//图片处理
                res.send(results);
                var modifyFields = {
                    ksnf: req.body.ksnf,//考试时间(接口dateList返回的value)
                    bkjb: req.body.bkjb,//考试科目(接口subjectList返回的value)
                    name: req.body.name,//姓名
                    sfzh: req.body.sfzh,//身份证证件号码
                    zkzh: req.body.zkzh,//准考证号
                    zsbh: req.body.zsbh,//证书编号
                    localFrom: req.body.localFrom
                };
                userLoginInfoDAO.modify(params.clientID, serviceID, modifyFields, () => {
                });
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "计算机等级证书查询验证码",//服务名称
                    params: {//请求参数
                        verify: req.body.verify,//验证码
                        ksnf: req.body.ksnf,//考试时间(接口dateList返回的value)
                        bkjb: req.body.bkjb,//考试科目(接口subjectList返回的value)
                        name: req.body.name,//姓名
                        sfzh: req.body.sfzh,//身份证证件号码
                        zkzh: req.body.zkzh,//准考证号
                        zsbh: req.body.zsbh//证书编号
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};

exports.ncreCon = ncreCon;