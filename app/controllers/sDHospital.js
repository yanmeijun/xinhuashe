const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    sDHospitalService = require("../logics/sDHospital").sDHospitalService;
const path = "sDHospital/", templateID = "sdHospital";
const serviceID = "DAA0003";
let sDHospitalCon = {};

sDHospitalCon.getCon = (req, res, next) => {
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
    console.log("山东挂号renderName: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("山东挂号请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
//获取热门医院列表
const getHospList = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "1",
        serviceId: templateID,
        page: req.body.page,//页码
        pageSize: req.body.pageSize,//每页几条
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sDHospitalCon.getHospList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.hospitalType = req.body.hospitalType;//医院类型编码
        params.hospitalLevel = req.body.hospitalLevel;//医院等级编码
        params.hospitalCant = req.body.hospitalCant;//医院位置编码
        sDHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山东挂号获取热门医院列表",//服务名称
                    params: {//请求参数
                        page: req.body.page,//页码
                        pageSize: req.body.pageSize,//每页几条
                        hospitalType: req.body.hospitalType,
                        hospitalLevel: req.body.hospitalLevel,
                        hospitalCant: req.body.hospitalCant,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//查询医院
const hospSearch = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "2",
        serviceId: templateID,
        page: req.body.page,//页码
        checkStr: req.body.checkStr,//搜索关键字
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sDHospitalCon.hospSearch", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sDHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山东挂号查询医院",//服务名称
                    params: {//请求参数
                        page: req.body.page,//页码
                        checkStr: req.body.checkStr,//搜索关键字
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//获取分医院列表
const getBranchList = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "3",
        serviceId: templateID,
        hosId: req.body.hosId,//医院id
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sDHospitalCon.getBranchList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sDHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山东挂号获取分医院列表",//服务名称
                    params: {//请求参数
                        hosId: req.body.hosId,//医院id
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//获取医院详情
const getHospDetail = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "4",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sDHospitalCon.getHospDetail", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.hospitalId = req.body.hospitalId;//总医院id
        params.branchId = req.body.branchId;//分医院id
        params.hospitalCode = req.body.hospitalCode;//没有分医院的医院id
        sDHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山东挂号获取医院详情",//服务名称
                    params: {//请求参数
                        hospitalId: req.body.hospitalId,//医院id
                        branchId: req.body.branchId,//医院id
                        hospitalCode: req.body.hospitalCode,//医院id
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//获取科室医生日程表
const getDocSchedule = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "5",
        serviceId: templateID,
        hospitalId: req.body.hospitalId,//总医院id
        deptId: req.body.deptId,//科室id
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sDHospitalCon.getDocSchedule", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.branchId = req.body.branchId || "";//分医院id
        sDHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山东挂号获取科室医生日程表",//服务名称
                    params: {//请求参数
                        hospitalId: req.body.hospitalId,//总医院id
                        deptId: req.body.deptId,//科室id
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//获取日程表剩余号量
const getAppNum = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "6",
        serviceId: templateID,
        scheduleAmPmId: req.body.scheduleAmPmId,//医生日程id
        hospitalCode: req.body.hospitalCode,//医院code
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sDHospitalCon.getAppNum", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sDHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山东挂号获取日程表剩余号量",//服务名称
                    params: {//请求参数
                        scheduleAmPmId: req.body.scheduleAmPmId,//医生日程id
                        hospitalCode: req.body.hospitalCode,//医院code
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//获取医生详细信息
const getDocDetail = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "7",
        serviceId: templateID,
        docId: req.body.docId,//医生id
        deptId: req.body.deptId,//科室id
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sDHospitalCon.getDocDetail", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sDHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山东挂号获取医生详细信息",//服务名称
                    params: {//请求参数
                        docId: req.body.docId,//医生id
                        deptId: req.body.deptId,//科室id
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//获取登录图片验证码
const getPicCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "8",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sDHospitalCon.getPicCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sDHospitalService.postData(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    res.send(results.responseBody.data);
                } else {
                    res.send("/images/refreshCode.png");
                }
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山东挂号获取登录图片验证码",//服务名称
                    params: {//请求参数
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send("/images/refreshCode.png");
        });
    }
}
//登录
const login = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "9",
        serviceId: templateID,
        mobile: req.body.mobile,//手机号
        password: req.body.password,//密码
        code: req.body.code,//验证码
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sDHospitalCon.login", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sDHospitalService.postData(params)
            .then((results) => {
                if (results.retCode == "000000" && results.responseBody.data == "success") {
                    var modifyFields = {
                        userName: req.body.mobile,
                        password: req.body.password,
                        localFrom: req.body.localFrom
                    };
                    userLoginInfoDAO.modify(params.clientID, serviceID, modifyFields, () => {
                    });
                }
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山东挂号登录",//服务名称
                    params: {//请求参数
                        mobile: req.body.mobile,//手机号
                        password: req.body.password,//密码
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//注册获取短信验证码
const getRegisterCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "10",
        serviceId: templateID,
        mobile: req.body.mobile,//手机号
        imgCode: req.body.imgCode,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sDHospitalCon.getRegisterCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sDHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山东挂号注册获取短信验证码",//服务名称
                    params: {//请求参数
                        mobile: req.body.mobile,//手机号
                        imgCode: req.body.imgCode,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//注册
const register = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "11",
        serviceId: templateID,
        mobile: req.body.mobile,//手机号
        idCard: req.body.idCard,//身份证
        conformIdCard: req.body.conformIdCard,//确认身份证
        password: req.body.password,//密码
        conformPassword: req.body.conformPassword,//确认密码
        email: req.body.email,//邮箱
        realName: req.body.realName,//姓名
        sMSCode: req.body.sMSCode,//短信验证码
        code: req.body.code,//短信验证码
        imgCode: req.body.imgCode,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sDHospitalCon.register", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sDHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山东挂号注册",//服务名称
                    params: {//请求参数
                        mobile: req.body.mobile,//手机号
                        idCard: req.body.idCard,//身份证
                        conformIdCard: req.body.conformIdCard,//确认身份证
                        password: req.body.password,//密码
                        conformPassword: req.body.conformPassword,//确认密码
                        email: req.body.email,//邮箱
                        realName: req.body.realName,//姓名
                        sMSCode: req.body.sMSCode,//短信验证码
                        code: req.body.code,//短信验证码
                        imgCode: req.body.imgCode,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//修改密码获取短信验证码
const getResetPassCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "13",
        serviceId: templateID,
        mobile: req.body.mobile,//手机号
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sDHospitalCon.getResetPassCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sDHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山东挂号修改密码获取短信验证码",//服务名称
                    params: {//请求参数
                        mobile: req.body.mobile,//手机号
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//修改密码
const resetPassword = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "14",
        serviceId: templateID,
        mobile: req.body.mobile,//手机号
        newPassword: req.body.newPassword,//新密码
        code: req.body.code,//短信验证码
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sDHospitalCon.resetPassword", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sDHospitalService.postData(params)
            .then((results) => {
                if (results.retCode == "000000" && results.responseBody.success == true) {
                    params.taskId = '15';
                    sDHospitalService.postData(params)
                        .then((results) => {
                            res.send(results);
                            var logData = {
                                localFrom: req.body.localFrom,//项目用户名称
                                clientID: req.body.clientID,//用户设备ID
                                serviceID: serviceID,//前台服务ID
                                templateID: params.serviceId,//引擎模板服务ID
                                taskId: params.taskId,//引擎模板服务taskID
                                taskName: "山东挂号修改密码",//服务名称
                                params: {//请求参数
                                    mobile: req.body.mobile,//手机号
                                    newPassword: req.body.newPassword,//新密码
                                    code: req.body.code,//短信验证码
                                },
                                results: JSON.stringify(results)//返回结果
                            };
                            userLogDAO.add(logData);
                        }).catch((err) => {
                        res.send(err);
                    });
                } else {
                    res.send(results);
                }
            }).catch((err) => {
            res.send(err);
        });
    }
}
//获取挂号页面数据
const getRegisterData = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "16",
        serviceId: templateID,
        scheduleAmPmId: req.body.scheduleAmPmId,//日程id
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sDHospitalCon.getRegisterData", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sDHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山东挂号获取挂号页面数据",//服务名称
                    params: {//请求参数
                        scheduleAmPmId: req.body.scheduleAmPmId,//日程id
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//获取就诊人列表
const getPatientList = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "17",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sDHospitalCon.getPatientList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sDHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山东挂号获取就诊人列表",//服务名称
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
//添加就诊人
const addPatient = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "18",
        serviceId: templateID,
        name: req.body.name,//姓名
        idNum: req.body.idNum,//身份证
        sex: req.body.sex,//性别（男1，女2）
        userRelation: req.body.userRelation,//关系
        mobile: req.body.mobile,//手机号
        oldmobile: req.body.mobile,//手机号
        citySelect: req.body.citySelect,//城市代号
        liveCantCode: req.body.liveCantCode,//区号
        address: req.body.address,//住址
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sDHospitalCon.addPatient", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sDHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山东挂号添加就诊人",//服务名称
                    params: {//请求参数
                        name: req.body.name,//姓名
                        idNum: req.body.idNum,//身份证
                        sex: req.body.sex,//性别（男1，女2）
                        userRelation: req.body.userRelation,//关系
                        mobile: req.body.mobile,//手机号
                        oldmobile: req.body.mobile,//手机号
                        citySelect: req.body.citySelect,//城市代号
                        liveCantCode: req.body.liveCantCode,//区号
                        address: req.body.address,//住址
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//挂号
const registerHosp = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "20",
        serviceId: templateID,
        docName: req.body.docName,//医生姓名
        hospitalName: req.body.hospitalName,//医院名称
        deptName: req.body.deptName,//科室名称
        opType: req.body.opType,//门诊类别
        scheduleDate: req.body.scheduleDate,//日程时间
        amOrPm: req.body.amOrPm,//上午下午
        arAmt: req.body.arAmt,
        treatName: req.body.treatName,//就诊人名字
        treatId: req.body.treatId,//就诊人id
        beginTime: req.body.beginTime,//开始时间
        endTime: req.body.endTime,//结束时间
        regionid: req.body.regionid,//日程id
        ampmid: req.body.ampmid,
        hospitalId: req.body.hospitalId,//医院id
        deptId: req.body.deptId,//科室id
        docId: req.body.docId,//医生id
        medicalCardNum: req.body.medicalCardNum,
        docCode: req.body.docCode,//医生code
        deptCode: req.body.deptCode,//科室code
        hosCode: req.body.hosCode,//医院code
        branchId: req.body.branchId,//分院id
        branchName: req.body.branchName,//分院名称
        schDateType: req.body.schDateType,//
        appNum: req.body.appNum,//剩余号量
        isPatientCard: req.body.isPatientCard || "2",//
        idCardNum: req.body.idCardNum,//身份证号
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    // if (util.isEmptyValue("sDHospitalCon.registerHosp", params)) {
    //     res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    // } else {
    sDHospitalService.postData(params)
        .then((results) => {
            res.send(results);
            var logData = {
                localFrom: req.body.localFrom,//项目用户名称
                clientID: req.body.clientID,//用户设备ID
                serviceID: serviceID,//前台服务ID
                templateID: params.serviceId,//引擎模板服务ID
                taskId: params.taskId,//引擎模板服务taskID
                taskName: "山东挂号预约",//服务名称
                params: {//请求参数
                    docName: req.body.docName,//医生姓名
                    hospitalName: req.body.hospitalName,//医院名称
                    deptName: req.body.deptName,//科室名称
                    opType: req.body.opType,//门诊类别
                    scheduleDate: req.body.scheduleDate,//日程时间
                    amOrPm: req.body.amOrPm,//上午下午
                    arAmt: req.body.arAmt,
                    treatName: req.body.treatName,//就诊人名字
                    treatId: req.body.treatId,//就诊人id
                    beginTime: req.body.beginTime,//开始时间
                    endTime: req.body.endTime,//结束时间
                    regionid: req.body.regionid,//日程id
                    ampmid: req.body.ampmid,
                    hospitalId: req.body.hospitalId,//医院id
                    deptId: req.body.deptId,//科室id
                    docId: req.body.docId,//医生id
                    medicalCardNum: req.body.medicalCardNum,
                    docCode: req.body.docCode,//医生code
                    deptCode: req.body.deptCode,//科室code
                    hosCode: req.body.hosCode,//医院code
                    branchId: req.body.branchId,//分院id
                    branchName: req.body.branchName,//分院名称
                    schDateType: req.body.schDateType,//
                    appNum: req.body.appNum,//剩余号量
                    isPatientCard: req.body.isPatientCard || "2",//
                    idCardNum: req.body.idCardNum,//身份证号
                },
                results: JSON.stringify(results)//返回结果
            };
            userLogDAO.add(logData);
        }).catch((err) => {
        res.send(err);
    });
    // }
}

//获取、查询预约列表
const searchRegisterHosp = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "21",
        serviceId: templateID,
        page: req.body.page,//页码
        pageSize: req.body.pageSize,//每页几条
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sDHospitalCon.searchRegisterHosp", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.state = req.body.state;//预约状态
        params.startTime = req.body.startTime;//开始时间
        params.endTime = req.body.endTime;//结束时间
        sDHospitalService.postData(params)
            .then((results) => {
                params.taskId = '23';
                sDHospitalService.postData(params)
                    .then((_results) => {
                        results.dataNum = _results.responseBody;
                        res.send(results);
                        var logData = {
                            localFrom: req.body.localFrom,//项目用户名称
                            clientID: req.body.clientID,//用户设备ID
                            serviceID: serviceID,//前台服务ID
                            templateID: params.serviceId,//引擎模板服务ID
                            taskId: params.taskId,//引擎模板服务taskID
                            taskName: "山东挂号获取、查询预约列表",//服务名称
                            params: {//请求参数
                                page: req.body.page,//页码
                                pageSize: req.body.pageSize,//每页几条
                                state: req.body.state,//每页几条
                                startTime: req.body.startTime,//每页几条
                                endTime: req.body.endTime,//每页几条
                            },
                            results: JSON.stringify(results)//返回结果
                        };
                        userLogDAO.add(logData);
                    }).catch((err) => {
                    res.send(err);
                });
            }).catch((err) => {
            res.send(err);
        });
    }
}
//取消预约
const cancelRegisterHosp = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "22",
        serviceId: templateID,
        state: req.body.state || "4",//预约状态
        id: req.body.id,//挂号id
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sDHospitalCon.cancelRegisterHosp", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sDHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山东挂号取消预约",//服务名称
                    params: {//请求参数
                        state: req.body.state || "4",//预约状态
                        id: req.body.id,//挂号id
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//个人中心按钮
const toUserCenter = (req, res, next) => {
    const params = {
        sessionId: req.query.randomKey,
        taskId: "24",
        serviceId: templateID,
        comeFrom: req.query.comeFrom,
        randomKey: req.query.randomKey,//用户userID
        userID: req.query.userID,//用户userID
        clientID: req.query.clientID,//用户设备id
        cityID: req.query.cityID,//城市代号
        local_x: req.query.local_x,//城市经度
        local_y: req.query.local_y//城市纬度
    };
    if (util.isEmptyValue("sDHospitalCon.toUserCenter", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        cityDAO.get(params.cityID, (err, cityInfo) => {
            sDHospitalService.postData(params)
                .then((results) => {
                    if (results.retCode == '000000') {
                        if (results.responseBody.length == 0) {
                            res.render(path + "login", _.extend(req.query, {cityInfo: cityInfo}));
                        } else {
                            res.render(path + "personalCenter", _.extend(req.query, {cityInfo: cityInfo}));
                        }
                    } else {
                        res.render(path + "login", _.extend(req.query, {cityInfo: cityInfo}));
                    }
                }).catch((err) => {
                res.render(path + "login", _.extend(req.query, {cityInfo: cityInfo}));
            });
        });
    }
}

exports.sDHospitalCon = sDHospitalCon;