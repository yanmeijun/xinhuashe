const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    teacherQualificationService = require("../logics/teacherQualification").teacherQualificationService;
const path = "teacherQualification/";
const serviceID = "CAF0004", templateID = "teacher";
let teacherQualificationCon = {};

teacherQualificationCon.getCon = (req, res, next) => {
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
    console.log("教师资格证查询renderName: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("教师资格证查询请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
/*
*获得验证码
*/
const getVertication = (req, res, next) => {
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
    if (util.isEmptyValue("teacherQualificationCon.getVertication", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        teacherQualificationService.getScoreSearch(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    res.send(results.responseBody.data);
                } else {
                    res.send("/images/refreshCode.png");
                }
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: "CAI0001",//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "中小学教师资格证考试成绩查询获得验证码",//服务名称
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

/*
*中小学教师资格证考试成绩查询
*/
const scoreSearch = (req, res, next) => {
    const params = {
        name: req.body.username,//用户名
        zjhm: req.body.zjhm,//证件号码
        yzm: req.body.verifycode,//验证码
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "2",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("teacherQualificationCon.scoreSearch", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        teacherQualificationService.getScoreSearch(params)
            .then((results) => {
                res.send(results);
                // var modifyFields = {
                //     name: req.body.username,//用户名
                //     zjhm: req.body.zjhm,//证件号码
                //     localFrom: req.body.localFrom
                // };
                // userLoginInfoDAO.modify(params.clientID, "CAI0001", modifyFields, ()=> {});
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: "CAI0001",//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "中小学教师资格证考试成绩查询",//服务名称
                    params: {//请求参数
                        name: req.body.username,//用户名
                        zjhm: req.body.zjhm,//证件号码
                        yzm: req.body.verifycode,//验证码
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
/*
*中小学教师资格证合格证明考试时间获取
*/
const examTime = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "3",
        serviceId: templateID,
        userID: req.query.userID,//用户userID
        clientID: req.query.clientID,//用户设备id
        cityID: req.query.cityID,//城市代号
        local_x: req.query.local_x,//城市经度
        local_y: req.query.local_y//城市纬度
    };
    if (util.isEmptyValue("teacherQualificationCon.examTime", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        teacherQualificationService.getScoreSearch(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.query.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: "CAJ0001",//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "中小学教师资格证合格证明考试时间获取",//服务名称
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
/*
*中小学教师资格证考试合格图片验证码
*/
const examResultVertica = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "4",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("teacherQualificationCon.examResultVertica", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        teacherQualificationService.getScoreSearch(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    res.send(results.responseBody.data);
                } else {
                    res.send("/images/refreshCode.png");
                }
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: "CAJ0001",//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "中小学教师资格证考试合格图片验证码",//服务名称
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
/*
*中小学教师资格证考试合格证明查询
*/
const examResult = (req, res, next) => {
    const params = {
        // username: req.body.username,//用户名
        //bkjb: req.body.bkjb,//报考级别（代号1）
        verify: req.body.verifycode,//验证码
        ksnf: req.body.ksnf,//考试时间(从考试时间examTime的接口中获取，对应的值是value)
        // zkzh: req.body.zkzh,//准考证号
        // sfzh: req.body.sfzh,//身份证号
        //sf: req.body.sf,//省份（代号01）
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "6",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("teacherQualificationCon.examResult", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.name = req.body.username;//用户名
        params.zkzh = req.body.zkzh;//准考证号
        params.sfzh = req.body.sfzh;//身份证号
        teacherQualificationService.getScoreSearch(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    let _results = {
                        retCode: results.retCode,
                        data: JSON.parse(results.responseBody.data).info
                    };
                    _results.data.kszp = _results.data.kszp;
                    res.send(_results);
                } else {
                    res.send(results);
                }
                var modifyFields = {
                    name: req.body.username,//用户名
                    zkzh: req.body.zkzh,//准考证号
                    sfzh: req.body.sfzh,//身份证号
                    localFrom: req.body.localFrom
                };
                userLoginInfoDAO.modify(params.clientID, "CAJ0001", modifyFields, () => {
                });
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: "CAJ0001",//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "中小学教师资格证考试合格证明查询",//服务名称
                    params: {//请求参数
                        verify: req.body.verifycode,//验证码
                        ksnf: req.body.ksnf,//考试时间(从考试时间examTime的接口中获取，对应的值是value)
                        zkzh: req.body.zkzh,//准考证号
                        sfzh: req.body.sfzh,//身份证号
                        name: req.body.username,//身份证号
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
exports.teacherQualificationCon = teacherQualificationCon;