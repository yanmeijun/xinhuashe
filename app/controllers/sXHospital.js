const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    sXHospitalService = require("../logics/sXHospital").sXHospitalService;
const path = "sXHospital/";
const serviceID = "DAA0008";
let sXHospitalCon = {};

sXHospitalCon.getCon = (req, res, next) => {
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
    console.log("山西挂号renderName: " + renderName);
    //cityDAO.get(req.query.cityID, (err, cityInfo) => {
        //res.render(path + renderName,req.query);
    //})
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("山西挂号请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
//获取热门医院列表
const getHospList = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "1",
        serviceId: "sXHospital",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        page: req.body.page//页码
    };
    if (util.isEmptyValue("sXHospitalCon.getHospList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.hospitalname = req.body.hospitalname;//医院名称搜索
        params.cityid = req.body.cityid;//编码
        params.addrcountryid = "";//
        params.simplespell = "";//
        params.gradeid = "";//
        params.hosptype = "";//
        sXHospitalService.postData(params)
            .then((results) => {
                if (results.retCode == "000001") {
                    params.taskId = '3';
                    params.q = req.body.hospitalname;
                    params.page = req.body.page;
                    sXHospitalService.postData(params)
                        .then((results) => {
                            res.send(results);
                            var logData = {
                                localFrom: req.body.localFrom,//项目用户名称
                                clientID: params.clientID,//用户设备ID
                                serviceID: serviceID,//前台服务ID
                                templateID: params.serviceId,//引擎模板服务ID
                                taskId: params.taskId,//引擎模板服务taskID
                                taskName: "山西省医院首页查询列表",//服务名称
                                params: {//请求参数
                                    page: req.body.page,//页码
                                    hospitalname: req.body.hospitalname,//医院名称搜索
                                    cityid: req.body.cityid,//编码
                                    addrcountryid: "",//
                                    simplespell: "",//
                                    gradeid: "",//
                                    hosptype: ""//
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
};
//查按地区选择
const getCity = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "2",
        serviceId: "sXHospital",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sXHospitalCon.getCity", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sXHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山西省医院查按地区选择查询",//服务名称
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
//按医生名字搜索
const getDoctorList = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "3",
        serviceId: "sXHospital",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        q: req.body.q
    };
    if (util.isEmptyValue("sXHospitalCon.getDoctorList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sXHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山西省医院按医生名字搜索",//服务名称
                    params: {//请求参数
                        q: req.body.q
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//点击医生名字进入详情页面
const getHospDetail = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "4",
        serviceId: "sXHospital",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        id: req.body.id
    };
    if (util.isEmptyValue("sDHospitalCon.getHospDetail", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sXHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山西省医院点击医生名字进入详情页面",//服务名称
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
}
//点击医院进入科室
const getDepartment = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "5",
        serviceId: "sXHospital",
        hospitaluid: req.body.hospitaluid,//总医院id
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sXHospitalCon.getDepartment", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sXHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山西省医院进入科室页面",//服务名称
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
//点击科室进入
const getSurplus = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "6",
        serviceId: "sXHospital",
        deptuid: req.body.deptuid,//科室id
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sXHospitalCon.getSurplus", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sXHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山西省医院点击科室获取余量查询",//服务名称
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
//点击日期筛选医生列表
const getPicCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "7",
        serviceId: "sXHospital",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        deptuid: req.body.deptuid
    };
    if (util.isEmptyValue("sXHospitalCon.getPicCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.cityid = req.body.cityid;
        params.hosptype = req.body.hosptype;
        params.doctorrankid = req.body.doctorrankid;
        params.commonid = req.body.commonid;
        params.hospitaluid = req.body.hospitaluid;
        params.startdate = req.body.startdate;
        params.enddate = req.body.enddate;
        sXHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山西省医院点击日期筛选医生列表",//服务名称
                    params: {//请求参数
                        cityid: req.body.cityid,
                        hosptype: req.body.hosptype,
                        doctorrankid: req.body.doctorrankid,
                        commonid: req.body.commonid,
                        hospitaluid: req.body.hospitaluid,
                        startdate: req.body.startdate,
                        enddate: req.body.enddate
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//点击预约
const appointment = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "8",
        serviceId: "sXHospital",
        id: req.body.id,//
        workid: req.body.workid,//
        accesstype: req.body.accesstype,
        price: req.body.price,
        periodname: req.body.periodname,
        workdate: req.body.workdate,
        workrank: req.body.workrank,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sXHospitalCon.appointment", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sXHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山西省医院点击预约获得预约详情列表",//服务名称
                    params: {//请求参数
                        id: req.body.id,//
                        workid: req.body.workid,//
                        accesstype: req.body.accesstype,
                        price: req.body.price,
                        periodname: req.body.periodname,
                        workdate: req.body.workdate,
                        workrank: req.body.workrank
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}

//获取图片验证码
const Verification = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "10",
        serviceId: "sXHospital",
        Round: req.body.Round,//验证码
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sXHospitalCon.Verification", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sXHospitalService.postData(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    res.send(results.responseBody.data);
                    //res.send(results.responseBody.data);
                } else {
                    res.send("/images/refreshCode.png");
                }
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山西省医院获取图片验证码",//服务名称
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
//登陆
const login = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "9",
        serviceId: "sXHospital",
        validatecode: req.body.validatecode,
        phone: req.body.phone,//手机号
        userpwd: req.body.userpwd,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sXHospitalCon.login", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.fromurl = req.body.fromurl;
        sXHospitalService.postData(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    var modifyFields = {
                        userName: req.body.phone,
                        password: req.body.userpwd,
                        localFrom: req.body.localFrom
                    };
                    userLoginInfoDAO.modify(params.clientID, serviceID, modifyFields, () => {
                    });
                }
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省预约登陆",//服务名称
                    params: {//请求参数
                        validatecode: req.body.validatecode,
                        phone: req.body.phone,//手机号
                        userpwd: req.body.userpwd
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//成功后得到个人中心列表
const record = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "11",
        serviceId: "sXHospital",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sXHospitalCon.record", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sXHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山西省医院个人中心列表查询",//服务名称
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


//历史纪录
const historyRecord = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "12",
        serviceId: "sXHospital",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sXHospitalCon.historyRecord", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sXHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山西省医院历史纪录",//服务名称
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
//待评论
const waitComment = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "13",
        serviceId: "sXHospital",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sXHospitalCon.waitComment", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sXHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山西省医院历史纪录中待评论查询",//服务名称
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
//确认就诊 预约详情
const confirmAppointment = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "14",
        serviceId: "sXHospital",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        resid: req.body.resid,
        commonpeopleid: req.body.commonpeopleid,
        treattype: req.body.treattype,
        mtype: req.body.mtype,
        validatecode: req.body.validatecode,
        qr: req.body.qr,
        qryy: req.body.qryy,
        workid: req.body.workid,
        configurl: req.body.configurl,
        hospitaluid: req.body.hospitaluid,//医院的
        hospitalname: req.body.hospitalname,
        doctorname: req.body.doctorname,
        deptname: req.body.deptname,
        periodname: req.body.periodname,
        price: req.body.price,
        workdate: req.body.workdate,
        workrank: req.body.workrank,
        cphone: req.body.cphone,
        starttime: req.body.starttime,
        jzrname: req.body.jzrname
    };
    if (util.isEmptyValue("sXHospitalCon.confirmAppointment", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.jzr_xz = req.body.jzr_xz;
        params.showerrorinfo = req.body.showerrorinfo;
        params.noplace = req.body.noplace;
        params.orderid = req.body.orderid;
        sXHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山西省医院确认就诊",//服务名称
                    params: {//请求参数
                        resid: req.body.resid,
                        commonpeopleid: req.body.commonpeopleid,
                        treattype: req.body.treattype,
                        mtype: req.body.mtype,
                        validatecode: req.body.validatecode,
                        qr: req.body.qr,
                        qryy: req.body.qryy,
                        workid: req.body.workid,
                        configurl: req.body.configurl,
                        hospitaluid: req.body.hospitaluid,//医院的
                        hospitalname: req.body.hospitalname,
                        doctorname: req.body.doctorname,
                        deptname: req.body.deptname,
                        periodname: req.body.periodname,
                        price: req.body.price,
                        workdate: req.body.workdate,
                        workrank: req.body.workrank,
                        cphone: req.body.cphone,
                        starttime: req.body.starttime,
                        jzrname: req.body.jzrname,
                        jzr_xz: req.body.jzr_xz,
                        showerrorinfo: req.body.showerrorinfo,
                        noplace: req.body.noplace,
                        orderid: req.body.orderid
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//确认就诊 预约详情
const appointmentDetail = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "15",
        serviceId: "sXHospital",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        resid: req.body.resid,
        commonpeopleid: req.body.commonpeopleid,
        treattype: req.body.treattype,
        mtype: req.body.mtype,
        validatecode: req.body.validatecode,
        qr: req.body.qr,
        workid: req.body.workid
    };
    if (util.isEmptyValue("sXHospitalCon.appointmentDetail", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.jzr_xz = req.body.jzr_xz;
        sXHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山西省医院预约详情",//服务名称
                    params: {//请求参数
                        resid: req.body.resid,
                        commonpeopleid: req.body.commonpeopleid,
                        treattype: req.body.treattype,
                        mtype: req.body.mtype,
                        validatecode: req.body.validatecode,
                        qr: req.body.qr,
                        workid: req.body.workid,
                        jzr_xz: req.body.jzr_xz
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
        taskId: "20",
        serviceId: "sXHospital",
        username: req.body.username,//姓名
        idcard: req.body.idcard,//身份证
        ptype: req.body.ptype,//性别（男1，女2）
        birthdate: req.body.birthdate,//
        phone: req.body.phone,//手机号
        addrprovinceid: req.body.addrprovinceid,//城市代号
        addrcityid: req.body.addrcityid,//区号
        addrcountryid: req.body.addrcountryid,//住址
        B1: req.body.B1,
        usersex: req.body.usersex,
        configUrl: req.body.configUrl,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sXHospitalCon.addPatient", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sXHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山西省医院添加就诊人",//服务名称
                    params: {//请求参数
                        username: req.body.username,//姓名
                        idcard: req.body.idcard,//身份证
                        ptype: req.body.ptype,//性别（男1，女2）
                        birthdate: req.body.birthdate,//
                        phone: req.body.phone,//手机号
                        addrprovinceid: req.body.addrprovinceid,//城市代号
                        addrcityid: req.body.addrcityid,//区号
                        addrcountryid: req.body.addrcountryid,//住址
                        B1: req.body.B1,
                        usersex: req.body.usersex,
                        configUrl: req.body.configUrl
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//取消预约cancel
const cancel = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "16",
        serviceId: "sXHospital",
        orderid: req.body.orderid,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sXHospitalCon.cancel", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sXHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山西省医院取消预约",//服务名称
                    params: {//请求参数
                        orderid: req.body.orderid,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}

//找回密码
const forgetPassword = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "17",
        serviceId: "sXHospital",
        validatecode: req.body.validatecode,
        phone: req.body.phone,
        next: req.body.next,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sXHospitalCon.forgetPassword", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sXHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山西省医院找回密码查询",//服务名称
                    params: {//请求参数
                        validatecode: req.body.validatecode,
                        phone: req.body.phone,
                        next: req.body.next
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
const getPassword = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "18",
        serviceId: "sXHospital",
        validatecode: req.body.validatecode,
        phone: req.body.phone,
        next: req.body.next,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sXHospitalCon.getPassword", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.code = req.body.code;
        sXHospitalService.postData(params)
            .then((results) => {
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山西省医院找回密码判断验证码是否正确",//服务名称
                    params: {//请求参数
                        validatecode: req.body.validatecode,
                        phone: req.body.phone,
                        next: req.body.next,
                        code: req.body.code,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
                if (results.retCode == "000000") {
                    params.taskId = '19';
                    params.userpwd = req.body.userpwd;
                    params.userpwd_r = req.body.userpwd_r;
                    params.next = req.body.next;
                    sXHospitalService.postData(params)
                        .then((results) => {
                            res.send(results);
                            var logData = {
                                localFrom: req.body.localFrom,//项目用户名称
                                clientID: params.clientID,//用户设备ID
                                serviceID: serviceID,//前台服务ID
                                templateID: params.serviceId,//引擎模板服务ID
                                taskId: params.taskId,//引擎模板服务taskID
                                taskName: "山西省医院找回密码成功",//服务名称
                                params: {//请求参数
                                    validatecode: req.body.validatecode,
                                    phone: req.body.phone,
                                    next: req.body.next,
                                    code: req.body.code,
                                    userpwd: req.body.userpwd,
                                    userpwd_r: req.body.userpwd_r,
                                    next: req.body.next
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
//忘记密码的短信验证码
const getMessage = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "24",
        serviceId: "sXHospital",
        phone: req.body.phone,
        next: req.body.next,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sXHospitalCon.getMessage", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.code = req.body.code || "";
        sXHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山西省医院忘记密码的短信验证码",//服务名称
                    params: {//请求参数
                        phone: req.body.phone,
                        next: req.body.next,
                        code: req.body.code || ""
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
        taskId: "22",
        serviceId: "sXHospital",
        addrcityid: req.body.addrcityid,
        addrcountryid: req.body.addrcountryid,
        addrprovinceid: req.body.addrprovinceid,
        B1: req.body.B1,
        code: req.body.code,
        idcard: req.body.idcard,
        phone: req.body.phone,
        username: req.body.username,
        userpwd: req.body.userpwd,
        userpwd_r: req.body.userpwd_r,
        validatecode: req.body.validatecode,
        tyxy: req.body.tyxy,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sXHospitalCon.register", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.fromurl = req.body.fromurl;
        sXHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山西省医院注册",//服务名称
                    params: {//请求参数
                        addrcityid: req.body.addrcityid,
                        addrcountryid: req.body.addrcountryid,
                        addrprovinceid: req.body.addrprovinceid,
                        B1: req.body.B1,
                        code: req.body.code,
                        idcard: req.body.idcard,
                        phone: req.body.phone,
                        username: req.body.username,
                        userpwd: req.body.userpwd,
                        userpwd_r: req.body.userpwd_r,
                        validatecode: req.body.validatecode,
                        tyxy: req.body.tyxy,
                        fromurl: req.body.fromurl
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}

//获取短信验证码
const getRegisterMessage = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "23",
        serviceId: "sXHospital",
        addrcityid: req.body.addrcityid,
        addrcountryid: req.body.addrcountryid,
        addrprovinceid: req.body.addrprovinceid,
        B1: req.body.B1,
        code: req.body.code,
        idcard: req.body.idcard,
        phone: req.body.phone,
        username: req.body.username,
        userpwd: req.body.userpwd,
        userpwd_r: req.body.userpwd_r,
        validatecode: req.body.validatecode,
        tyxy: req.body.tyxy,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
//    if (util.isEmptyValue("sXHospitalCon.toUserCenter", params)) {
//        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
//    } else {
    params.fromurl = req.body.fromurl;
    sXHospitalService.postData(params)
        .then((results) => {
            res.send(results);
            var logData = {
                localFrom: req.body.localFrom,//项目用户名称
                clientID: params.clientID,//用户设备ID
                serviceID: serviceID,//前台服务ID
                templateID: params.serviceId,//引擎模板服务ID
                taskId: params.taskId,//引擎模板服务taskID
                taskName: "山西省医院注册获取短信验证码",//服务名称
                params: {//请求参数
                    addrcityid: req.body.addrcityid,
                    addrcountryid: req.body.addrcountryid,
                    addrprovinceid: req.body.addrprovinceid,
                    B1: req.body.B1,
                    code: req.body.code,
                    idcard: req.body.idcard,
                    phone: req.body.phone,
                    username: req.body.username,
                    userpwd: req.body.userpwd,
                    userpwd_r: req.body.userpwd_r,
                    validatecode: req.body.validatecode,
                    tyxy: req.body.tyxy,
                    fromurl: req.body.fromurl
                },
                results: JSON.stringify(results)//返回结果
            };
            userLogDAO.add(logData);
        }).catch((err) => {
        res.send(err);
    });
    //}
};

//添加就诊人获取省市县地区的下拉选择
const province = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "21",
        serviceId: "sXHospital",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sXHospitalCon.province", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sXHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山西省医院添加就诊人获取省市县地区的下拉选择",//服务名称
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

//添加就诊人获取省市县地区的下拉选择
const addrcity = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "25",
        serviceId: "sXHospital",
        sel: req.body.sel,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sXHospitalCon.addrcity", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sXHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山西省医院添加就诊人获取省市县地区的下拉选择",//服务名称
                    params: {//请求参数
                        sel: req.body.sel,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//添加就诊人获取省市县地区的下拉选择
const addrcountry = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "26",
        serviceId: "sXHospital",
        sel: req.body.sel,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("sXHospitalCon.addrcountry", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        sXHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "山西省医院添加就诊人获取省市县地区的下拉选择",//服务名称
                    params: {//请求参数
                        sel: req.body.sel,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}

exports.sXHospitalCon = sXHospitalCon;