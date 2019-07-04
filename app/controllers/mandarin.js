const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    mandarinService = require("../logics/mandarin").mandarinService;
const path = "mandarin/", templateID = "mandarin";
let mandarinCon = {};

mandarinCon.getCon = (req, res, next) => {
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
    console.log("普通话考试查询renderName: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("普通话考试查询请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
//全国普通话考试成绩查询
const mandarinGrades = (req, res, next) => {
    const params = {
        // stuID: req.body.stuID,//准考证号（选填）
        // name: req.body.name,//姓名
        // idCard: req.body.idCard,//身份证号（选填）
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "1",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("mandarinCon.mandarinGrades", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.stuID = req.body.stuID;//准考证号
        params.idCard = req.body.idCard;//身份证号
        params.name = req.body.name;//姓名
        mandarinService.mandarinGrade(params)
            .then((results) => {
                res.send(results);
                var modifyFields = {
                    stuID: req.body.stuID,//准考证号（选填）
                    name: req.body.name,//姓名
                    idCard: req.body.idCard,//身份证号（选填）
                    localFrom: req.body.localFrom
                };
                userLoginInfoDAO.modify(params.clientID, "CAF0001", modifyFields, () => {
                });
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: "CAF0001",//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "全国普通话考试成绩查询",//服务名称
                    params: {//请求参数
                        stuID: req.body.stuID,//准考证号（选填）
                        name: req.body.name,//姓名
                        idCard: req.body.idCard,//身份证号（选填）
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//证书查询验证码
const veriCodeImage = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "2",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("mandarinCon.mandarinCertificate", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        mandarinService.mandarinGrade(params)
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
                    serviceID: "CAG0001",//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "全国普通话证书查询验证码",//服务名称
                    params: {//请求参数
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
                // res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//全国普通话考试证书查询
const mandarinCertificate = (req, res, next) => {
    const params = {
        certID: req.body.certID,//证书编号
        vCode: req.body.vCode,//验证码
        idCard: req.body.idCard,//身份证号
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "3",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("mandarinCon.mandarinCertificate", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        mandarinService.mandarinGrade(params)
            .then((results) => {
                res.send(results);
                var modifyFields = {
                    certID: req.body.certID,//证书编号
                    idCard: req.body.idCard,//身份证号
                    localFrom: req.body.localFrom
                };
                userLoginInfoDAO.modify(params.clientID, "CAG0001", modifyFields, () => {
                });
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: "CAG0001",//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "全国普通话考试证书查询",//服务名称
                    params: {//请求参数
                        certID: req.body.certID,//证书编号
                        vCode: req.body.vCode,//验证码
                        idCard: req.body.idCard//身份证号
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
exports.mandarinCon = mandarinCon;