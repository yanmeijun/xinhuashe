const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    gsHospitalService = require("../logics/gsHospital").gsHospitalService;
const path = "gsHospital/";
const serviceID = "DAA0005";
let gsHospitalCon = {};

gsHospitalCon.getCon = (req, res, next) => {
    if (req.method.toUpperCase() === "GET") {
        pageCon(req, res, next);
    } else {
        apiCon(req, res, next);
    }
}
const pageCon = (req, res, next) => {
    if (!req.query.page) {
        apiCon(req, res, next);
        return;
    }
    const renderName = req.query.page;
    console.log("甘肃省预约挂号renderName: " + renderName);
    const cityID = req.query.cityID;
    cityDAO.get(cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
}
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("甘肃省预约挂号请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
}

//甘肃省首页默认展示接口（按预约量查询，默认展示前五，滑动到最后，加载下一页）
const allHospital = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "3",
        pagenum: req.body.pagenum//页码（默认值为1）
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params['hos_type'] = req.body.hos_type;//按全部查询，此字段为空，
        gsHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "甘肃省首页默认展示接口",//服务名称
                    params: {//请求参数
                        pagenum: req.body.pagenum//页码（默认值为1）
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//甘肃省首页搜索医院
const searchHospital = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "1",
        pagenum: req.body.pagenum,//页码（默认值为1）
        t: req.body.t//搜索关键字
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gsHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "甘肃省首页搜索医院",//服务名称
                    params: {//请求参数
                        pagenum: req.body.pagenum,//页码（默认值为1）
                        t: req.body.t//搜索关键字
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};

//甘肃省获取医院信息
const Hospitalinfo = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "4",
        "hos_key": req.body.hos_key
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gsHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "甘肃省获取医院信息",//服务名称
                    params: {//请求参数
                        "hos_key": req.body.hos_key
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//甘肃省获取医院科室信息
const HospitalDeptInfo = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "5",
        "hos_key": req.body.hos_key
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gsHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "甘肃省获取医院科室信息",//服务名称
                    params: {//请求参数
                        "hos_key": req.body.hos_key
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};

//甘肃省获取医院科室放号量信息
const HospitalShiftInfo = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "6",
        hosid: req.body.hosid
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gsHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "甘肃省获取医院科室放号量信息",//服务名称
                    params: {//请求参数
                        hosid: req.body.hosid
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};

//甘肃省获取医院科室排班--医院信息
const HospitalDeptShiftInfo = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "7",
        hosKey: req.body.hosKey,
        deptKey: req.body.deptKey,
        ts: req.body.ts
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gsHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "甘肃省获取医院科室排班--医院信息",//服务名称
                    params: {//请求参数
                        hosKey: req.body.hosKey,
                        deptKey: req.body.deptKey,
                        ts: req.body.ts
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};

//甘肃省获取医院科室排班--日历信息
const HospitalDeptRili = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "8",
        hosKey: req.body.hosKey,
        deptKey: req.body.deptKey,
        startDate: req.body.startDate
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gsHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "甘肃省获取医院科室排班--日历信息",//服务名称
                    params: {//请求参数
                        hosKey: req.body.hosKey,
                        deptKey: req.body.deptKey,
                        startDate: req.body.startDate
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};

//甘肃省注册——图形验证码
const HospitalRegImg = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "9"
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gsHospitalService.allHospital(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    res.send(results.responseBody.data);
                } else {
                    res.send("/images/refreshCode.png");
                }
            }).catch((err) => {
            res.send(err);
        });
    }
};

//甘肃省注册——校验图形验证码
const HospitalRegImgCheck = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "10",
        capCode: req.body.capCode
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gsHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};

//甘肃省注册——获取手机验证码
const HospitalRegGetPhone = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "11",
        authType: req.body.authType,
        authCode: req.body.authCode,
        capCode: req.body.capCode,
        ts: req.body.ts
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gsHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "甘肃省挂号注册——获取手机验证码",//服务名称
                    params: {//请求参数
                        authType: req.body.authType,
                        authCode: req.body.authCode,
                        capCode: req.body.capCode,
                        ts: req.body.ts
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//甘肃省注册——校验
const userCardCheck = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "27",
        registerCard: req.body.registerCard,
        cardCheck: req.body.registerCard,
        userName: req.body.userName
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gsHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "甘肃省挂号注册——校验",//服务名称
                    params: {//请求参数
                        registerCard: req.body.registerCard,
                        cardCheck: req.body.registerCard,
                        userName: req.body.userName
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//甘肃省登录---实名认证获取验证码
const getImg = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "28"
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gsHospitalService.allHospital(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    res.send(results.responseBody.data);
                } else {
                    res.send("/images/refreshCode.png");
                }
            }).catch((err) => {
            res.send(err);
        });
    }
};
//甘肃省登录---实名认证
const idCodeCheck = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "29",
        name: req.body.name,
        userAccount: req.body.userAccount,
        idCode: req.body.idCode,
        realCapCode: req.body.realCapCode
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gsHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "甘肃省挂号登录---实名认证",//服务名称
                    params: {//请求参数
                        name: req.body.name,
                        userAccount: req.body.userAccount,
                        idCode: req.body.idCode,
                        realCapCode: req.body.realCapCode
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//甘肃省注册——最后接口
const HospitalReg = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "12",
        userName: req.body.userName,
        userAccount: req.body.userAccount,
        passWordOne: req.body.passWordOne,
        registerCard: req.body.registerCard,
        ts: req.body.ts
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gsHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "甘肃省挂号注册",//服务名称
                    params: {//请求参数
                        userName: req.body.userName,
                        userAccount: req.body.userAccount,
                        passWordOne: req.body.passWordOne,
                        registerCard: req.body.registerCard,
                        ts: req.body.ts
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};

//甘肃省登录——获取图形验证码
const HospitalLoginImg = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "13"
    };
    console.log("randomKey:" + req.body.randomKey);
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gsHospitalService.allHospital(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    res.send(results.responseBody.data);
                } else {
                    res.send("/images/refreshCode.png");
                }
            }).catch((err) => {
            res.send(err);
        });
    }
};
//甘肃省登录
const HospitalLogin = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "14",
        userAccount: req.body.userAccount,
        passWord: req.body.passWord,
        capCode: req.body.capCode
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gsHospitalService.allHospital(params)
            .then((results) => {
                if (results.retCode == "000000" && (results.responseBody.success == '1' || results.responseBody.success == '3')) {
                    var modifyFields = {
                        userName: req.body._userAccount,
                        password: req.body._passWord,
                        localFrom: req.body.localFrom
                    };
                    userLoginInfoDAO.modify(req.body.clientID, serviceID, modifyFields, () => {
                    });
                }
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "甘肃省挂号登录",//服务名称
                    params: {//请求参数
                        userAccount: req.body.userAccount,
                        passWord: req.body.passWord,
                        capCode: req.body.capCode
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//甘肃省忘记密码-获取图形验证码
const HospitalfindPassImg = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "15"
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gsHospitalService.allHospital(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    res.send(results.responseBody.data);
                } else {
                    res.send("/images/refreshCode.png");
                }
            }).catch((err) => {
            res.send(err);
        });
    }
};
//甘肃省忘记密码-验证图形验证码
const HospitalfindPassImgCheck = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "16",
        capCode: req.body.capCode
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gsHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//甘肃省忘记密码-获取账户信息
const HospitalfindPassAccountInfo = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "17",
        userAccount: req.body.userAccount,
        capCode: req.body.capCode,
        ts: req.body.ts
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gsHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "甘肃省挂号忘记密码-获取账户信息",//服务名称
                    params: {//请求参数
                        userAccount: req.body.userAccount,
                        capCode: req.body.capCode,
                        ts: req.body.ts
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//甘肃省忘记密码-获取手机验证码
const HospitalfindPassGetPhone = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "18",
        authType: req.body.authType,
        authCode: req.body.authCode,
        capCode: req.body.capCode,
        ts: req.body.ts
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gsHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "甘肃省挂号忘记密码-获取手机验证码",//服务名称
                    params: {//请求参数
                        authType: req.body.authType,
                        authCode: req.body.authCode,
                        capCode: req.body.capCode,
                        ts: req.body.ts
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//甘肃省忘记密码-最后接口
const HospitalfindPass = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "19",
        pwdRandom: req.body.pwdRandom,
        authCode: req.body.authCode,
        newPwd: req.body.newPwd
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gsHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "甘肃省挂号忘记密码",//服务名称
                    params: {//请求参数
                        pwdRandom: req.body.pwdRandom,
                        authCode: req.body.authCode,
                        newPwd: req.body.newPwd
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//甘肃省预约挂号--获取回显信息
const HospitalOrderInfo = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "20",
        doctorKey: req.body.doctorKey,
        deptKey: req.body.deptKey,
        orderDate: req.body.orderDate,
        orderSort: req.body.orderSort,
        userKey: req.body.userKey,
        ts: req.body.ts
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gsHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "甘肃省预约挂号--获取回显信息",//服务名称
                    params: {//请求参数
                        doctorKey: req.body.doctorKey,
                        deptKey: req.body.deptKey,
                        orderDate: req.body.orderDate,
                        orderSort: req.body.orderSort,
                        userKey: req.body.userKey,
                        ts: req.body.ts
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};

//甘肃省预约挂号
const HospitalOrder = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "21",
        patientKey: req.body.patientKey,
        scheduleKey: req.body.scheduleKey,
        capCode: req.body.capCode,
        random: req.body.random,
        doctorKey: req.body.doctorKey,
        deptKey: req.body.deptKey,
        orderDate: req.body.orderDate,
        orderSort: req.body.orderSort,
        userKey: req.body.userKey
    };

    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params['visitCard'] = req.body.visitCard;
        gsHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "甘肃省预约挂号",//服务名称
                    params: {//请求参数
                        patientKey: req.body.patientKey,
                        scheduleKey: req.body.scheduleKey,
                        capCode: req.body.capCode,
                        random: req.body.random,
                        doctorKey: req.body.doctorKey,
                        deptKey: req.body.deptKey,
                        orderDate: req.body.orderDate,
                        orderSort: req.body.orderSort,
                        userKey: req.body.userKey
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//甘肃省预约挂号--图形验证码
const HospitalOrderImg = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "22"
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gsHospitalService.allHospital(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    res.send(results.responseBody.data);
                } else {
                    res.send("/images/refreshCode.png");
                }
            }).catch((err) => {
            res.send(err);
        });
    }
};
//甘肃省个人中心
const HospitalPersonal = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "23",
        userKey: req.body.userKey,
        s: req.body.s,
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params['hosName'] = req.body.hosName;
        params['startTime'] = req.body.startTime;
        params['endTime'] = req.body.endTime;
        params['state'] = req.body.state;
        params['pagenums'] = req.body.pagenums;
        gsHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "甘肃省预约挂号个人中心",//服务名称
                    params: {//请求参数
                        userKey: req.body.userKey,
                        s: req.body.s,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//甘肃省取消预约
const HospitalCancleOrder = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "24",
        orderNumber: req.body.orderNumber,
        createTime: req.body.createTime,
        patinetCard: req.body.patinetCard,
        userKey: req.body.userKey,
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gsHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "甘肃省预约挂号取消预约",//服务名称
                    params: {//请求参数
                        orderNumber: req.body.orderNumber,
                        createTime: req.body.createTime,
                        patinetCard: req.body.patinetCard,
                        userKey: req.body.userKey,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};

//甘肃省预约挂号--获取预约单信息
const HospitalGetOrderInfo = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "gsHospital",
        taskId: "25",
        patientId: req.body.patientId,
        scheduleId: req.body.scheduleId,
        orderNum: req.body.orderNum
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        gsHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "甘肃省预约挂号--获取预约单信息",//服务名称
                    params: {//请求参数
                        patientId: req.body.patientId,
                        scheduleId: req.body.scheduleId,
                        orderNum: req.body.orderNum
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
exports.gsHospitalCon = gsHospitalCon;