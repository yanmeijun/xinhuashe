const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    GzOnlineWorkService = require("../logics/GzOnlineWork").GzOnlineWorkService;
const path = "GzOnlineWork/";
const serviceID = "LAA0001";
let GzOnlineWorkCon = {};

GzOnlineWorkCon.getCon = (req, res, next) => {
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
    console.log("贵州省网上办事大厅renderName: " + renderName);
    const cityID = req.query.cityID;
    cityDAO.get(cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("贵州省网上办事大厅请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};

//贵州省网上办事大厅获取验证码
const getVeryCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "1",
        serviceId: "WorkingOnline",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("GzOnlineWorkCon.getVeryCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        GzOnlineWorkService.GzOnlineWork(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    res.send(results.responseBody.data);
                } else {
                    res.send("/images/refreshCode.png");
                }
                // res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "贵州省网上办事大厅获取验证码",//服务名称
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
//登录
const login = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//
        serviceId: "WorkingOnline",
        taskId: "2",
        username: req.body.username,//用户名
        password: req.body.password,//密码
        piccode: req.body.piccode,//验证码
        randomKey: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("GzOnlineWorkCon.login", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        GzOnlineWorkService.GzOnlineWork(params)
            .then((results) => {
                cityDAO.get(params.cityID, (err, cityInfo) => {
                    let renderParams = _.extend(params, {cityInfo: cityInfo})
                    if (results.retCode == "000000") {
                        var modifyFields = {
                            userName: req.body.username,
                            password: req.body.password,
                            localFrom: req.body.localFrom
                        };
                        userLoginInfoDAO.modify(params.clientID, serviceID, modifyFields, () => {
                        });
                        res.render("GzOnlineWork/reservation", _.extend(renderParams, JSON.parse(results.responseBody.data)));
                    } else {
                        res.render("GzOnlineWork/GzOnlineWork", _.extend(renderParams, {'err': results.responseBody.errorMsg || results.responseBody.data || "登录失败"}));
                    }
                })
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "贵州省网上办事大厅登录",//服务名称
                    params: {//请求参数
                        username: req.body.username,//用户名
                        password: req.body.password,//密码
                        piccode: req.body.piccode,//验证码
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            cityDAO.get(params.cityID, (err, cityInfo) => {
                let renderParams = _.extend(params, {cityInfo: cityInfo})
                res.render("GzOnlineWork/GzOnlineWork", _.extend(renderParams, {'err': err}));
            });
        });
    }
};
//预约
const reserve = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "10",
        serviceId: "WorkingOnline",
        areaid: req.body.areaid,//区划
        departmentid: req.body.departmentid,//部门
        permissionitemId: req.body.permissionitemId,//事项
        // startTime: req.body.startTime,//可以预约的时间,已备注的形式出现在日期的旁边
        createtime: req.body.createtime,//预约的时间,只可以选三天之后的某一个工作日
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("GzOnlineWorkCon.reserve", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        GzOnlineWorkService.GzOnlineWork(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "贵州省网上办事大厅预约",//服务名称
                    params: {//请求参数
                        areaid: req.body.areaid,//区划
                        departmentid: req.body.departmentid,//部门
                        permissionitemId: req.body.permissionitemId,//事项
                        createtime: req.body.createtime,//预约的时间,只可以选三天之后的某一个工作日
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//获取我的预约列表
const myReservation = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "11",
        serviceId: "WorkingOnline",
        pageNo: req.body.pageNo,//页码
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("GzOnlineWorkCon.myReservation", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        GzOnlineWorkService.GzOnlineWork(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "贵州省网上办事大厅获取预约列表",//服务名称
                    params: {//请求参数
                        pageNo: req.body.pageNo,//页码
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//获得部门信息
const getDepartment = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "8",
        serviceId: "WorkingOnline",
        areaid: req.body.areaid,//各个区划对应的数值
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("GzOnlineWorkCon.getDepartment", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        GzOnlineWorkService.GzOnlineWork(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    let dataJson = JSON.parse(results.responseBody.data);
                    let resultData = [];
                    dataJson.forEach((data) => {
                        for (let key in data) {
                            let item = {
                                id: key,
                                name: data[key]
                            };
                            resultData.push(item);
                        }
                    })
                    res.send(resultData);
                } else {
                    res.send(results);
                }
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "贵州省网上办事大厅获得部门信息",//服务名称
                    params: {//请求参数
                        areaid: req.body.areaid,//各个区划对应的数值
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//获得事项信息
const getPermission = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "9",
        serviceId: "WorkingOnline",
        deptId: req.body.deptId,//各个部门对应的数值
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("GzOnlineWorkCon.getPermission", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        GzOnlineWorkService.GzOnlineWork(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    let dataJson = results.responseBody;
                    let resultData = [];
                    dataJson.forEach((data) => {
                        for (let key in data) {
                            let item = {
                                id: key,
                                name: data[key]
                            };
                            resultData.push(item);
                        }
                    })
                    res.send(resultData);
                } else {
                    res.send(results);
                }
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "贵州省网上办事大厅获得事项信息",//服务名称
                    params: {//请求参数
                        deptId: req.body.deptId,//各个部门对应的数值
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
exports.GzOnlineWorkCon = GzOnlineWorkCon;