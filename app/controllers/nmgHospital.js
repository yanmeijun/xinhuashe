const urlParse = require('url'),
    _ = require('underscore'),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    nmgHospitalService = require("../logics/nmgHospital").nmgHospitalService;
const path = "nmgHospital/";
const serviceID = "DAA0006";
let nmgHospitalCon = {};

nmgHospitalCon.getCon = (req, res, next) => {
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
    console.log("内蒙古预约挂号renderName: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
}
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("内蒙古预约挂号请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
}

//甘肃省首页默认展示接口（按预约量查询，默认展示前五，滑动到最后，加载下一页）
const allHospital = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "nmgHospital",
        taskId: "1",
        pagenum: req.body.pagenum//页码（默认值为1）
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params['hos_type'] = req.body.hos_type;//按全部查询，此字段为空，
        nmgHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "内蒙古挂号首页默认展示接口",//服务名称
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
const toUserCenter = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "nmgHospital",
        taskId: "14"
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        nmgHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};

const login = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "nmgHospital",
        taskId: "3",
        username: req.body.username,
        password: req.body.password,
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        nmgHospitalService.allHospital(params)
            .then((results) => {
                if (results.retCode == "000000" && results.responseBody.res) {
                    var modifyFields = {
                        userName: req.body.username,
                        password: req.body.password,
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
                    taskName: "内蒙古挂号登录",//服务名称
                    params: {//请求参数
                        username: req.body.username,
                        password: req.body.password,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const exit = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "nmgHospital",
        taskId: "21",
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        nmgHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "内蒙古挂号退出登录",//服务名称
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
const getCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "nmgHospital",
        taskId: "1",
        phone: req.body.phone
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        nmgHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "内蒙古挂号获取短信验证码",//服务名称
                    params: {//请求参数
                        phone: req.body.phone
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const resigter = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "nmgHospital",
        taskId: "2",
        phone: req.body.phone,
        code: req.body.code,
        password: req.body.password,
        sex: req.body.sex,
        realname: req.body.realname,
        cardid: req.body.cardid,
        address: req.body.address,
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        nmgHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "内蒙古挂号注册",//服务名称
                    params: {//请求参数
                        phone: req.body.phone,
                        code: req.body.code,
                        password: req.body.password,
                        sex: req.body.sex,
                        realname: req.body.realname,
                        cardid: req.body.cardid,
                        address: req.body.address,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const search = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "nmgHospital",
        taskId: "4",
        pageNo: req.body.pageNo,
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.type = "";
        params.grade = "";
        params.hosName = req.body.hosName;
        params.RRegionId = req.body.RRegionId;
        nmgHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "内蒙古挂号查询",//服务名称
                    params: {//请求参数
                        pageNo: req.body.pageNo,
                        hosName: req.body.hosName,
                        RRegionId: req.body.RRegionId,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const getHosInfo = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "nmgHospital",
        taskId: "5",
        RRegionId: req.body.RRegionId,
        RHospitalId: req.body.RHospitalId
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        nmgHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "内蒙古挂号获取医院信息",//服务名称
                    params: {//请求参数
                        RRegionId: req.body.RRegionId,
                        RHospitalId: req.body.RHospitalId
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const orderInfo = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "nmgHospital",
        taskId: "6",
        RDepartmentId: req.body.RDepartmentId,
        RHospitalId: req.body.RHospitalId
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        nmgHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "内蒙古挂号获取订单信息",//服务名称
                    params: {//请求参数
                        RDepartmentId: req.body.RDepartmentId,
                        RHospitalId: req.body.RHospitalId
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const checkLogin = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "nmgHospital",
        taskId: "7",
        RDepartmentId: req.body.RDepartmentId,
        RHospitalId: req.body.RHospitalId
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        nmgHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "内蒙古挂号检查是否登录",//服务名称
                    params: {//请求参数
                        RDepartmentId: req.body.RDepartmentId,
                        RHospitalId: req.body.RHospitalId
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const getDocInfo = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "nmgHospital",
        taskId: "8",
        hosId: req.body.hosId,
        docId: req.body.docId,
        dateStr: req.body.dateStr,
        ampm: req.body.ampm,
        RDepartmentId: req.body.RDepartmentId
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        nmgHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "内蒙古挂号获取医生信息",//服务名称
                    params: {//请求参数
                        hosId: req.body.hosId,
                        docId: req.body.docId,
                        dateStr: req.body.dateStr,
                        ampm: req.body.ampm,
                        RDepartmentId: req.body.RDepartmentId
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const order = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "nmgHospital",
        taskId: "9",
        RShiftId: req.body.RShiftId,
        RDepartmentId: req.body.RDepartmentId,
        weekName: req.body.weekName,
        RPatientId: req.body.RPatientId,
        hospitalId: req.body.hospitalId,
        doctorId: req.body.doctorId,
        outDate: req.body.outDate,
        timestampName: req.body.timestampName,
        ampm: req.body.ampm,
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        nmgHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "内蒙古挂号预约",//服务名称
                    params: {//请求参数
                        RShiftId: req.body.RShiftId,
                        RDepartmentId: req.body.RDepartmentId,
                        weekName: req.body.weekName,
                        RPatientId: req.body.RPatientId,
                        hospitalId: req.body.hospitalId,
                        doctorId: req.body.doctorId,
                        outDate: req.body.outDate,
                        timestampName: req.body.timestampName,
                        ampm: req.body.ampm,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const getOrderData = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "nmgHospital",
        taskId: "10",
        appointId: req.body.appointId,
        hosId: req.body.hosId,
        docId: req.body.docId,
        dateStr: req.body.dateStr,
        ampm: req.body.ampm
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        nmgHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "内蒙古挂号获取订单日期",//服务名称
                    params: {//请求参数
                        appointId: req.body.appointId,
                        hosId: req.body.hosId,
                        docId: req.body.docId,
                        dateStr: req.body.dateStr,
                        ampm: req.body.ampm
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const waitForOrder = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "nmgHospital",
        taskId: "11"
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        nmgHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const historyOrder = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "nmgHospital",
        taskId: "13"
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        nmgHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "内蒙古挂号获取订单列表",//服务名称
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

const cancelOrder = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        appoint_id: req.body.appoint_id,
        serviceId: "nmgHospital",
        taskId: "12"
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        nmgHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "内蒙古挂号取消订单",//服务名称
                    params: {//请求参数
                        appoint_id: req.body.appoint_id,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const getPatientId = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "nmgHospital",
        taskId: "14"
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        nmgHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "内蒙古挂号获取就诊人id",//服务名称
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
const getVisit = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        id: req.body.id,
        serviceId: "nmgHospital",
        taskId: "15"
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        nmgHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "内蒙古挂号获取就诊人",//服务名称
                    params: {//请求参数
                        id: req.body.id,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const delPatient = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        id: req.body.id,
        pid: req.body.pid,
        serviceId: "nmgHospital",
        taskId: "17"
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        nmgHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "内蒙古挂号删除就诊人",//服务名称
                    params: {//请求参数
                        id: req.body.id,
                        pid: req.body.pid,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const addPatient = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "nmgHospital",
        taskId: "16",
        pid: req.body.pid,
        realname: req.body.realname,
        sex: req.body.sex,
        phone: req.body.phone,
        cardid: req.body.cardid,
        address: req.body.address
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        nmgHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "内蒙古挂号添加就诊人",//服务名称
                    params: {//请求参数
                        pid: req.body.pid,
                        realname: req.body.realname,
                        sex: req.body.sex,
                        phone: req.body.phone,
                        cardid: req.body.cardid,
                        address: req.body.address
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const getPersonInfo = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "nmgHospital",
        taskId: "18",
        id: req.body.id
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        nmgHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "内蒙古挂号获取个人信息",//服务名称
                    params: {//请求参数
                        id: req.body.id
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const getCodeForget = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "nmgHospital",
        taskId: "19",
        phone: req.body.phone,
        back: "*"
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        nmgHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "内蒙古挂号获短信验证码",//服务名称
                    params: {//请求参数
                        phone: req.body.phone,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const ForgetPass = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "nmgHospital",
        taskId: "20",
        phone: req.body.phone,
        code: req.body.code,
        pass: req.body.pass
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        nmgHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "内蒙古挂号忘记密码",//服务名称
                    params: {//请求参数
                        phone: req.body.phone,
                        code: req.body.code,
                        pass: req.body.pass
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
exports.nmgHospitalCon = nmgHospitalCon;