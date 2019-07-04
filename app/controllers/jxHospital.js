const urlParse = require('url'),
    _ = require('underscore'),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    jxHospitalService = require("../logics/jxHospital").jxHospitalService;
const path = "JXHospital/", templateID = "jxHospital";
const serviceID = "DAA0007";
let jxHospitalCon = {};

jxHospitalCon.getCon = (req, res, next) => {
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
    console.log("江西挂号renderName: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("江西挂号请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
//个人中心按钮
const toUserCenter = (req, res, next) => {
    const params = {
        sessionId: req.query.randomKey,
        taskId: "11",
        hospitalCode: '30655',
        serviceId: templateID,
        comeFrom: req.query.comeFrom,
        randomKey: req.query.randomKey,//用户userID
        userID: req.query.userID,//用户userID
        clientID: req.query.clientID,//用户设备id
        cityID: req.query.cityID,//城市代号
        local_x: req.query.local_x,//城市经度
        local_y: req.query.local_y//城市纬度
    };
    if (util.isEmptyValue("jxHospitalCon.toUserCenter", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        cityDAO.get(params.cityID, (err, cityInfo) => {
            jxHospitalService.postData(params)
                .then((results) => {
                    if (results.retCode == '000000') {
                        res.render(path + "personalCenter", _.extend(req.query, {cityInfo: cityInfo}));
                    } else {
                        res.render(path + "login", _.extend(req.query, {cityInfo: cityInfo}));
                    }
                    var logData = {
                        localFrom: req.body.localFrom,//项目用户名称
                        clientID: req.body.clientID,//用户设备ID
                        serviceID: serviceID,//前台服务ID
                        templateID: params.serviceId,//引擎模板服务ID
                        taskId: params.taskId,//引擎模板服务taskID
                        taskName: "江西挂号个人中心",//服务名称
                        params: {//请求参数
                            comeFrom: req.query.comeFrom,
                            hospitalCode: '30655'
                        },
                        results: JSON.stringify(results)//返回结果
                    };
                    userLogDAO.add(logData);
                }).catch((err) => {
                res.render(path + "login", _.extend(req.query, {cityInfo: cityInfo}));
            });
        });
    }
}
//获取医院列表
const getHospList = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "1",
        serviceId: templateID,
        cityRegId: req.body.cityRegId,//城市区号
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("jxHospitalCon.getHospList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        jxHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "江西挂号获取医院列表",//服务名称
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
//获取医院详情
const getHospDetail = async (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        //taskId: "3",
        serviceId: templateID,
        hosId: req.body.hosId,//医院ID
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("jxHospitalCon.getHospDetail", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        try{
            const results1=await jxHospitalService.postData(_.extend(params, {taskId: "3"}));
            const results2=await jxHospitalService.postData(_.extend(params, {taskId: "4"}));
            const results={hospDetail: JSON.parse(results1.responseBody.data),deptList: JSON.parse(results2.responseBody.data)};
            res.send(results);
            const logData = {
                localFrom: req.body.localFrom,//项目用户名称
                clientID: req.body.clientID,//用户设备ID
                serviceID: serviceID,//前台服务ID
                templateID: params.serviceId,//引擎模板服务ID
                taskId: params.taskId,//引擎模板服务taskID
                taskName: "江西挂号获取医院详情",//服务名称
                params: {//请求参数
                },
                results: JSON.stringify(results)//返回结果
            };
            userLogDAO.add(logData);
        }catch (err){
            res.send(err);
        }
    }
}
//科室查询
const deptSearch = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "5",
        serviceId: templateID,
        hosName: req.body.hosName,//医院名称
        deptName: req.body.deptName,//科室名称
        pageIndex: req.body.pageIndex,//页码
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("jxHospitalCon.deptSearch", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        jxHospitalService.postData(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//获取科室医生列表
const getDocList = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "6",
        serviceId: templateID,
        hospitalId: req.body.hospitalId,//医院ID
        deptId: req.body.deptId,//科室ID
        city: req.body.city,//城市区号
        pageIndex: req.body.pageIndex,//页码
        pageSize: req.body.pageSize,//页容量
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("jxHospitalCon.getDocList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        jxHospitalService.postData(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//获取医生日程表
const getDocSchedule = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "7",
        serviceId: templateID,
        hosId: req.body.hosId,//医院ID
        deptId: req.body.deptId,//科室ID
        doctorId: req.body.doctorId,//医生ID
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("jxHospitalCon.getDocSchedule", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        jxHospitalService.postData(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//获取预约时间列表
const getScheduleTime = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "8",
        serviceId: templateID,
        shitCode: req.body.shitCode,//日程code
        type: req.body.type,//医生类型
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("jxHospitalCon.getScheduleTime", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        jxHospitalService.postData(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//登录
const login = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "9",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        UserName: req.body.UserName,//用户名
        Password: req.body.Password,//密码
        Code: req.body.Code
    };
    if (util.isEmptyValue("jxHospitalCon.login", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        jxHospitalService.postData(params)
            .then((results) => {
                if (results.retCode == "000000" && results.responseBody.data == "/YYZL/PersonalCenter/PersonalCenterIndex") {
                    var modifyFields = {
                        userName: req.body.UserName,
                        password: req.body.Password,
                        localFrom: req.body.localFrom,
                        Code: req.body.Code
                    };
                    userLoginInfoDAO.modify(params.clientID, serviceID, modifyFields, () => {
                    });
                }
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
}
/*获取登录图片验证码*/
const getVerification = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "10.2",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("jxHospitalCon.getVerification", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        jxHospitalService.postData(params)
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
                    taskName: "江西挂号--获取登录图片验证码",//服务名称
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
//获取确认预约信息
const getRegisterData = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "10",
        serviceId: templateID,
        bussKey: req.body.bussKey,//bussKey
        hospitalName: req.body.hospitalName,//医院名称
        deptName: req.body.deptName,//科室名称
        doctorName: req.body.doctorName,//医生名称
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("jxHospitalCon.getRegisterData", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        jxHospitalService.postData(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//获取就诊人列表
const getPatientList = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "11",
        serviceId: templateID,
        hospitalCode: req.body.hospitalCode,//医院code
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("jxHospitalCon.getPatientList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        jxHospitalService.postData(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//挂号
const registerHosp = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "12",
        serviceId: templateID,
        bussKey: req.body.bussKey,//bussKey
        contactId: req.body.contactId,//contactId
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("jxHospitalCon.registerHosp", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        jxHospitalService.postData(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//获取挂号记录
const getRegisterList = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "13",
        serviceId: templateID,
        pageIndex: req.body.pageIndex,
        pageSize: req.body.pageSize,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("jxHospitalCon.getRegisterList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.processStatus = req.body.processStatus;
        params.startTime = req.body.startTime;
        params.endTime = req.body.endTime;
        jxHospitalService.postData(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//取消挂号
const cancelRegister = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "14",
        serviceId: templateID,
        orderId: req.body.orderId,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("jxHospitalCon.cancelRegister", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        jxHospitalService.postData(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//添加就诊人
const addPatient = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "15",
        serviceId: templateID,
        birthDate: req.body.birthDate || "",
        city: req.body.city,
        idenNo: req.body.idenNo || "",
        phone: req.body.phone || "",
        patientName: req.body.patientName,
        sex: req.body.sex,
        isChildren: req.body.isChildren,
        guardianIdenNo: req.body.guardianIdenNo || "",
        guardianName: req.body.guardianName || "",
        guardianPhone: req.body.guardianPhone || "",
        guardianshipRelationship: req.body.guardianshipRelationship || "",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    // if (util.isEmptyValue("jxHospitalCon.addPatient", params)) {
    //     res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    // } else {
    jxHospitalService.postData(params)
        .then((results) => {
            res.send(results);
        }).catch((err) => {
        res.send(err);
    });
    // }
}
//获取短信验证码
const getPhoneCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "16",
        serviceId: templateID,
        phone: req.body.phone,
        type: req.body.type,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("jxHospitalCon.getPhoneCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        jxHospitalService.postData(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//注册
const register = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "17",
        serviceId: templateID,
        realName: req.body.realName,
        identityNO: req.body.identityNO,
        password: req.body.password,
        userName: req.body.userName,
        phone: req.body.phone,
        validateCode: req.body.validateCode,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("jxHospitalCon.register", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        jxHospitalService.postData(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//修改密码
const resetPassword = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "18",
        serviceId: templateID,
        pwd: req.body.pwd,
        userName: req.body.userName,
        phone: req.body.phone,
        valiCode: req.body.valiCode,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("jxHospitalCon.resetPassword", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        jxHospitalService.postData(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
}
exports.jxHospitalCon = jxHospitalCon;