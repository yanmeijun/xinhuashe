const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    hospitalService = require("../logics/hospital").hospitalService;
const path = "hospital/";
const serviceID = "DAA0001", templateID = "bjhospital";
let hospitalCon = {};

hospitalCon.getCon = (req, res, next) => {
    if (req.method.toUpperCase() === "GET") {
        if (_.isEmpty(req.query.page)) {
            apiCon(req, res, next)
        } else {
            pageCon(req, res, next)
        }
    } else {
        apiCon(req, res, next);
    }
}
const pageCon = (req, res, next) => {
    const renderName = req.query.page;
    console.log("预约挂号renderName: " + renderName);
    const cityID = req.query.cityID;
    cityDAO.get(cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
}
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("北京预约挂号请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
}
//医院预约挂号获取可选城市及城市id
const getCity = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: templateID,
        taskId: "8",
        provinceId: req.body.provinceId,//省份ID(从获取可选省份hospGetProv接口获取)
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        sign: req.body.sign
    };
    if (util.isEmptyValue("hospitalCon.getCity", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        hospitalService.allHospitalInfo(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//医院预约挂号获取可选区县及区县id
const getCounty = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: templateID,
        taskId: "9",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        cityId: req.body.cityId,//省份ID(从获取可选省份hospGetProv接口获取)
        sign: req.body.sign
    };
    if (util.isEmptyValue("hospitalCon.getCounty", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        hospitalService.allHospitalInfo(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//医院预约挂号获取注册手机验证码
const regCode = (req, res, next) => {
    const params = {
        isshefn: req.body.isshefn,//身份证号
        // isshefnAgain: req.body.isshefn,//身份证号
        passWord: req.body.passWord,//密码
        // passWordAgain: req.body.passWord,//密码
        userName: req.body.userName,//姓名
        idType: req.body.idType,//证件类别
        city: req.body.city,//用户居住地城市ID（注册信息中的城市id 前面加_为了和默认参数中的cityID区分）
        county: req.body.county,//区县ID
        province: req.body.province,//省份ID
        sms: req.body.sms,//手机号码
        code: req.body.code,//图片验证码
        sessionId: req.body.randomKey,
        serviceId: templateID,
        taskId: "10",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.regCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        hospitalService.allHospitalInfo(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京医院预约挂号获取注册手机验证码",//服务名称
                    params: {//请求参数
                        isshefn: req.body.isshefn,//身份证号
                        passWord: req.body.passWord,//密码
                        userName: req.body.userName,//姓名
                        idType: req.body.idType,//证件类别
                        city: req.body.city,//用户居住地城市ID（注册信息中的城市id 前面加_为了和默认参数中的cityID区分）
                        county: req.body.county,//区县ID
                        province: req.body.province,//省份ID
                        sms: req.body.sms,//手机号码
                        code: req.body.code,//图片验证码
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//医院预约挂号提交用户注册信息
const regSub = (req, res, next) => {
    const params = {
        birthday: req.body.birthday,//出生年月日(证件类别为1的时候默认值为0-0-0)
        provinceId: req.body.provinceId,//省份ID（接口7返回的id字段）
        cityId: req.body.cityId,//城市ID（接口8返回的id字段）
        countyId: req.body.countyId,//区县ID（接口9返回的id字段）
        mobileNo: req.body.mobileNo,//手机号码
        code: req.body.code,//图片验证码
        smsCode: req.body.smsCode,//手机验证码
        passwordConfirm: req.body.passwordConfirm,//确认设置密码
        password: req.body.password,//
        cardNoConfirm: req.body.cardNoConfirm,//确认身份证号
        idNo: req.body.idNo,//身份证号
        idType: req.body.idType,//证件类别  字典值（身份证：1 军官证：2 护照：3 港澳通行证：4 台胞证：5）
        sex: req.body.sex,//
        name: req.body.name,//姓名
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "11",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.regSub", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        hospitalService.allHospitalInfo(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京医院预约挂号提交用户注册信息",//服务名称
                    params: {//请求参数
                        birthday: req.body.birthday,//出生年月日(证件类别为1的时候默认值为0-0-0)
                        provinceId: req.body.provinceId,//省份ID（接口7返回的id字段）
                        cityId: req.body.cityId,//城市ID（接口8返回的id字段）
                        countyId: req.body.countyId,//区县ID（接口9返回的id字段）
                        mobileNo: req.body.mobileNo,//手机号码
                        code: req.body.code,//图片验证码
                        smsCode: req.body.smsCode,//手机验证码
                        passwordConfirm: req.body.passwordConfirm,//确认设置密码
                        password: req.body.password,//
                        cardNoConfirm: req.body.cardNoConfirm,//确认身份证号
                        idNo: req.body.idNo,//身份证号
                        idType: req.body.idType,//证件类别  字典值（身份证：1 军官证：2 护照：3 港澳通行证：4 台胞证：5）
                        sex: req.body.sex,//
                        name: req.body.name,//姓名
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//医院预约挂号用户登录 验证码
const veriCode = (req, res, next) => {
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
    if (util.isEmptyValue("hospitalCon.veriCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        hospitalService.allHospitalInfo(params)
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
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京医院预约挂号获取登录图片验证码",//服务名称
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
//医院预约挂号用户登录
const login = (req, res, next) => {
    const params = {
        // verifycode: req.body.verifycode,//图片验证码
        mobileNo: req.body.username,//用户名
        password: req.body.password,//密码 new Buffer.from(req.body.password).toString('base64')  util.md5(req.body.password)
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "5",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.login", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.yzm = req.body.verifycode;
        hospitalService.allHospitalInfo(params)
            .then((results) => {
                if (results.retCode == "000000" && results.responseBody.code == "200") {
                    var modifyFields = {
                        userName: req.body.username,
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
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京医院预约挂号获取登录",//服务名称
                    params: {//请求参数
                        mobileNo: new Buffer.from(req.body.username).toString('base64'),//用户名
                        password: new Buffer.from(req.body.password).toString('base64'),//密码
                        yzm: req.body.verifycode
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//医院预约挂号查找医院基本信息
const getInfo = (req, res, next) => {
    const params = {
        words: req.body.name,//医院名称
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "1",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.getInfo", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        hospitalService.allHospitalInfo(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京医院预约挂号查找医院基本信息",//服务名称
                    params: {//请求参数
                        words: req.body.name,//医院名称
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//医院预约挂号获取医院详情
const getDetail = (req, res, next) => {
    const params = {
        id: req.body.id,//医院ID（从医院基本信息hospitalInfo接口获取）
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "2",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.getDetail", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        hospitalService.allHospitalInfo(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京医院预约挂号获取医院详情",//服务名称
                    params: {//请求参数
                        id: req.body.id,//医院ID（从医院基本信息hospitalInfo接口获取）
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//医院预约挂号查询剩余号量
const surplus = (req, res, next) => {
    const params = {
        idPath: req.body.idPath,//科室详情路径（从医院详情hospitalDetail接口获取）
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "3",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.surplus", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        hospitalService.allHospitalInfo(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京医院预约挂号查询剩余号量",//服务名称
                    params: {//请求参数
                        idPath: req.body.idPath,//科室详情路径
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const surplusTime = (req,res,next) =>{
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "3.1",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        hospitalId: req.body.hospitalId,
        departmentId: req.body.departmentId,
        relType: req.body.relType,
        sdFirstId: req.body.sdFirstId,
        sdSecondId: req.body.sdSecondId,
        week:req.body.week
    };
    if (util.isEmptyValue("hospitalCon.surplusTime", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.departmentName = req.body.departmentName;
        hospitalService.allHospitalInfo(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京医院预约挂号查询剩余号量",//服务名称
                    params: {//请求参数
                        hospitalId: req.body.hospitalId,
                        departmentId: req.body.departmentId,
                        relType: req.body.relType,
                        sdFirstId: req.body.sdFirstId,
                        sdSecondId: req.body.sdSecondId,
                        departmentName: req.body.departmentName,
                        week:req.body.week
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//医院预约挂号查找对应医院科室的医生信息
const doctorInfo = (req, res, next) => {
    const params = {
        dutyDate: req.body.dutyDate,//有剩余号的日期（从查询剩余号量hospSurplus接口获取）
        departmentId: req.body.departmentId,//科室ID（从医院详情hospitalDetail接口获取）
        hospitalId: req.body.hospitalId,//医院ID（从医院基本信息hospitalInfo接口获取）
       // dutyCode: req.body.dutyCode,//预约时间段(字典值 1上午 2下午 3晚上)（从查询剩余号量hospSurplus接口获取）
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "6",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.doctorInfo", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        hospitalService.allHospitalInfo(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京医院预约挂号查找对应医院科室的医生信息",//服务名称
                    params: {//请求参数
                        dutyDate: req.body.dutyDate,//有剩余号的日期（从查询剩余号量hospSurplus接口获取）
                        departmentId: req.body.departmentId,//科室ID（从医院详情hospitalDetail接口获取）
                        hospitalId: req.body.hospitalId,//医院ID（从医院基本信息hospitalInfo接口获取）
                       // dutyCode: req.body.dutyCode,//预约时间段
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//医院预约挂号获取预约挂号所需信息
const registerInfo = (req, res, next) => {
    const params = {
        doctorId: req.body.doctorId,//医生ID（从医生信息hospDoctorInfo接口获取）
        departmentId: req.body.departmentId,//科室ID（从医生信息hospDoctorInfo接口获取）
        hospitalId: req.body.hospitalId,//医院ID（从医生信息hospDoctorInfo接口获取）
        dutySourceId: req.body.dutySourceId,//预约号ID（从医生信息hospDoctorInfo接口获取）
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "7",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.registerInfo", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        hospitalService.allHospitalInfo(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京医院预约挂号获取预约挂号所需信息",//服务名称
                    params: {//请求参数
                        doctorId: req.body.doctorId,//医生ID（从医生信息hospDoctorInfo接口获取）
                        departmentId: req.body.departmentId,//科室ID（从医生信息hospDoctorInfo接口获取）
                        hospitalId: req.body.hospitalId,//医院ID（从医生信息hospDoctorInfo接口获取）
                        dutySourceId: req.body.dutySourceId,//预约号ID（从医生信息hospDoctorInfo接口获取）
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//医院预约挂号获取预约挂号短信验证码
const registerCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "13",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.registerCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        hospitalService.allHospitalInfo(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京医院预约挂号获取预约挂号短信验证码",//服务名称
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
//医院预约挂号
const register = (req, res, next) => {
    const params = {
        doctorId: req.body.doctorId,//医生ID（从医生信息hospDoctorInfo接口获取）
        departmentId: req.body.departmentId,//科室ID（从医生信息hospDoctorInfo接口获取）
        hospitalId: req.body.hospitalId,//医院ID（从医生信息hospDoctorInfo接口获取）
        dutySourceId: req.body.dutySourceId,//预约号ID（从医生信息hospDoctorInfo接口获取）
        //type: req.body.type,//报销类型（从获取预约挂号所需信息hospRegisterInfo接口获取）
        patientId: req.body.patientId,//病人ID（从获取预约挂号所需信息hospRegisterInfo接口获取）
        smsVerifyCode: req.body.phonecode,//短信验证码
        // hospitalCardId: req.body.hospitalCardId,//就诊卡号（非必填项）
        // medicareCardId: req.body.medicareCardId,//医保卡号（非必填项）
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "14",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.register", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.hospitalCardId = req.body.hospitalCardId || "";
        params.medicareCardId = req.body.medicareCardId || "";
        params.reimbursementType = req.body.type || "";
        let renderData = {
            localFrom: req.body.localFrom,//项目用户名称
            randomKey: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
            userID: req.body.userID,
            clientID: req.body.clientID,
            cityID: req.body.cityID,
            local_x: req.body.local_x,
            local_y: req.body.local_y
        };
        hospitalService.allHospitalInfo(params)
            .then((results) => {
                cityDAO.get(params.cityID, (err, cityInfo) => {
                    renderData.cityInfo = cityInfo;
                    if (results.retCode == '000000') {
                        if (results.responseBody.code == "200") {
                            res.render("hospital/reserveDetails", _.extend(renderData, results.responseBody.data[0]));
                        } else {
                            res.render("hospital/informationConfirm", _.extend(renderData, {err: results.responseBody.msg}))
                        }
                    } else {
                        res.render("hospital/informationConfirm", _.extend(renderData, {err: results.responseBody.msg}))
                    }
                    var logData = {
                        localFrom: req.body.localFrom,//项目用户名称
                        clientID: req.body.clientID,//用户设备ID
                        serviceID: serviceID,//前台服务ID
                        templateID: templateID,//引擎模板服务ID
                        taskId: params.taskId,//引擎模板服务taskID
                        taskName: "北京医院预约挂号",//服务名称
                        params: {//请求参数
                            doctorId: req.body.doctorId,//医生ID（从医生信息hospDoctorInfo接口获取）
                            departmentId: req.body.departmentId,//科室ID（从医生信息hospDoctorInfo接口获取）
                            hospitalId: req.body.hospitalId,//医院ID（从医生信息hospDoctorInfo接口获取）
                            dutySourceId: req.body.dutySourceId,//预约号ID（从医生信息hospDoctorInfo接口获取）
                            patientId: req.body.patientId,//病人ID（从获取预约挂号所需信息hospRegisterInfo接口获取）
                            smsVerifyCode: req.body.phonecode,//短信验证码
                            hospitalCardId: req.body.hospitalCardId || "",
                            medicareCardId: req.body.medicareCardId || "",
                            reimbursementType: req.body.type || ""
                        },
                        results: JSON.stringify(results)//返回结果
                    };
                    userLogDAO.add(logData);
                    // res.send(results);
                })
            }).catch((err) => {
            res.render("hospital/informationConfirm", _.extend(renderData, {err: results.responseBody.msg}))
            // res.send(err);
        });
    }
};
//医院预约挂号查看预约挂号信息
const registerList = (req, res, next) => {
    const params = {
        orderType: req.body.orderType,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        page: req.body.page || "1",
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "17",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.registerList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        hospitalService.allHospitalInfo(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京医院预约挂号查看预约挂号信息",//服务名称
                    params: {//请求参数
                        orderType: req.body.orderType,
                        startDate: req.body.startDate,
                        endDate: req.body.endDate,
                        page: req.body.page || "1"
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//医院预约挂号获取添加就诊人短信验证码
const addPCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: templateID,
        taskId: "15",
        sex: req.body.sex,//性别(1  男 2 女)
        countyId: req.body.countyId,//区县ID
        cityId: req.body.cityId,//城市ID
        provinceId: req.body.provinceId,//省份ID
        code: req.body.verifycode,//图片验证码
        isshefn: req.body.idNo,//身份证号码
        userName: req.body.name,//姓名
        sms: req.body.phone,//手机号
        idType: req.body.idType,//证件类别身份证：1军官证：2护照：3港澳通行证：4台胞证：5
        randomKey: req.body.randomKey,//用户randomKey
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.addPCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        hospitalService.allHospitalInfo(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京医院预约挂号添加就诊人短信验证码",//服务名称
                    params: {//请求参数
                        sex: req.body.sex,//性别(1  男 2 女)
                        countyId: req.body.countyId,//区县ID
                        cityId: req.body.cityId,//城市ID
                        provinceId: req.body.provinceId,//省份ID
                        code: req.body.verifycode,//图片验证码
                        isshefn: req.body.idNo,//身份证号码
                        userName: req.body.name,//姓名
                        sms: req.body.phone,//手机号
                        idType: req.body.idType,//证件类别身份证：1军官证：2护照：3港澳通行证：4台胞证：5
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//医院预约挂号添加就诊人
const addPeople = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: templateID,
        taskId: "16",
        sex: req.body.sex,//性别(1  男 2 女)
        countyId: req.body.countyId,//区县ID
        cityId: req.body.cityId,//城市ID
        provinceId: req.body.provinceId,//省份ID
        tpyzm: req.body.verifycode,//图片验证码
        idNo: req.body.idNo,//身份证号码
        name: req.body.name,//姓名
        mobileNo: req.body.phone,//手机号
        idType: req.body.idType,//证件类别身份证：1军官证：2护照：3港澳通行证：4台胞证：5
        birthday: req.body.birthday || "000",//出生年月日(证件类别为1的时候不要写)
        verifyCode: req.body.tpyzm,//短信验证码
        randomKey: req.body.randomKey,//用户randomKey
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.addPeople", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        hospitalService.allHospitalInfo(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京医院预约挂号添加就诊人",//服务名称
                    params: {//请求参数
                        sex: req.body.sex,//性别(1  男 2 女)
                        countyId: req.body.countyId,//区县ID
                        cityId: req.body.cityId,//城市ID
                        provinceId: req.body.provinceId,//省份ID
                        tpyzm: req.body.verifycode,//图片验证码
                        idNo: req.body.idNo,//身份证号码
                        name: req.body.name,//姓名
                        mobileNo: req.body.phone,//手机号
                        idType: req.body.idType,//证件类别身份证：1军官证：2护照：3港澳通行证：4台胞证：5
                        birthday: req.body.birthday || "000",//出生年月日(证件类别为1的时候不要写)
                        verifyCode: req.body.tpyzm,//短信验证码
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//医院预约挂号取消挂号预约
const regCancel = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: templateID,
        taskId: "18",
        hospitalType: req.body.hospitalType,//医院类别(从查看预约挂号信息接口获取)
        orderId: req.body.orderId,//订单ID(从查看预约挂号信息接口获取)
        randomKey: req.body.randomKey,//用户randomKey
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.regCancel", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        hospitalService.allHospitalInfo(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京医院预约挂号取消挂号预约",//服务名称
                    params: {//请求参数
                        hospitalType: req.body.hospitalType,//医院类别(从查看预约挂号信息接口获取)
                        orderId: req.body.orderId,//订单ID(从查看预约挂号信息接口获取)
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
/*北京预约挂号获取省级数据*/
const getPov = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: templateID,
        taskId: "20",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        sign: req.body.sign
    };
    if (util.isEmptyValue("hospitalCon.getPov", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        hospitalService.allHospitalInfo(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京医院预约挂号----获取地区选择的省级数据",//服务名称
                    params: {//请求参数
                        sign: req.body.sign
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
/*北京预约挂号获取sign值*/
const getSign = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: templateID,
        taskId: "21",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.getSign", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        hospitalService.allHospitalInfo(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "北京医院预约挂号----获取地区选择的sign值",//服务名称
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
exports.hospitalCon = hospitalCon;