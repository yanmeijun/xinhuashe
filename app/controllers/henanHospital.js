const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    henanHospitalService = require("../logics/henanHospital").henanHospitalService;
const path = "heNanHospital/";
const serviceID = "DAA0002", templateID = "hospitalRegister";
let henanHospitalCon = {};

henanHospitalCon.getCon = (req, res, next) => {
    if (req.method.toUpperCase() === "GET") {
        pageCon(req, res, next);
    } else {
        apiCon(req, res, next);
    }
}
const pageCon = (req, res, next) => {
    const renderName = req.query.page;
    console.log("河南省预约挂号renderName: " + renderName);
    const cityID = req.query.cityID;
    cityDAO.get(cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
}
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("河南省预约挂号请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
}

//河南医院默认展示
const allHospital = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "hospitalRegister",
        taskId: "1",
        p: req.body.p,//页码（默认值为1）
        dept_a: req.body.dept_a,//医院类别（默认值为-1）
        dept_b: req.body.dept_b,//等级（默认值为-1）
        city: req.body.city,//城市（默认值为0）
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        henanHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "河南医院默认展示",//服务名称
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

//医院详情页面接口
const hospitalDetails = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        id: req.body.id,//省份ID(从获取可选省份allHospital接口获取)
        serviceId: "hospitalRegister",
        taskId: "2",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.hospitalDetails", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        henanHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "河南挂号医院详情页面接口",//服务名称
                    params: {//请求参数
                        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
                        id: req.body.id//省份ID(从获取可选省份allHospital接口获取)
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//查询接口：点击科室的其中一个门诊，进入该科室的预约剩余号量页面
const surplus = (req, res, next) => {
    const params = {
        serviceId: "hospitalRegister",
        taskId: "5",
        id: req.body.id,//记录号（从接口2中获取）
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.surplus", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        henanHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "河南挂号科室的预约剩余号量页面",//服务名称
                    params: {//请求参数
                        id: req.body.id//记录号（从接口2中获取）
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//预约挂号：选择其中一个医师，点击预约按钮，进入预约挂号的页面
//备注：eid、sl只有在接口3处于登录状态时才能获取到。
const register = (req, res, next) => {
    const params = {
        serviceId: "hospitalRegister",
        taskId: "6",
        eid: req.body.eid,//记录号（从接口3中获取）
        sl: req.body.sl,//记录号（从接口3中获取）
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.register", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        henanHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "河南挂号预约挂号的页面",//服务名称
                    params: {//请求参数
                        eid: req.body.eid,//记录号（从接口3中获取）
                        sl: req.body.sl//记录号（从接口3中获取）
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//获取验证码    1.8.1 获取验证码
const verifycode = (req, res, next) => {
    const params = {
        serviceId: "hospitalRegister",
        taskId: "3",
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userIDf
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.verifycode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        henanHospitalService.allHospital(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    //http://47.96.254.45/service/
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
                    taskName: "河南挂号获取验证码",//服务名称
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
};
//点击确预约  输入相关信息（需登录后查询）
const getInfo = (req, res, next) => {
    const params = {
        validate: req.body.validate,//验证码
        cfz: req.body.cfz,//初复诊选择（1为初诊，2为复诊）
        schdid: req.body.schdid,//记录号，与接口3中的sl一致
        expert: req.body.expert,//记录号，与接口3中的eid一致
        person: req.body.person,//可选择的联系人（默认值为0）
        jzktype: req.body.jzktype,//就诊卡类型（01为医保卡，02为院内就诊卡）
        serviceId: "hospitalRegister",
        taskId: "7.1",
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.getInfo", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        params.jzkno = req.body.jzkno,//就诊卡号
            henanHospitalService.allHospital(params)
                .then((results) => {
                    res.send(results);
                    var logData = {
                        localFrom: req.body.localFrom,//项目用户名称
                        clientID: req.body.clientID,//用户设备ID
                        serviceID: serviceID,//前台服务ID
                        templateID: templateID,//引擎模板服务ID
                        taskId: params.taskId,//引擎模板服务taskID
                        taskName: "河南挂号登录后确认预约",//服务名称
                        params: {//请求参数
                            validate: req.body.validate,//验证码
                            cfz: req.body.cfz,//初复诊选择（1为初诊，2为复诊）
                            schdid: req.body.schdid,//记录号，与接口3中的sl一致
                            expert: req.body.expert,//记录号，与接口3中的eid一致
                            person: req.body.person,//可选择的联系人（默认值为0）
                            jzktype: req.body.jzktype//就诊卡类型（01为医保卡，02为院内就诊卡）
                        },
                        results: JSON.stringify(results)//返回结果
                    };
                    userLogDAO.add(logData);
                }).catch((err) => {
                res.send(err);
            });
    }
};
//个人中心—查看我的预约订单信息+订单详情（需登录）
const getDetail = (req, res, next) => {
    const params = {
        p: req.body.p,//页码（默认值为1）
        state: req.body.state,//预约状态（默认值为0）
        serviceId: "hospitalRegister",
        taskId: "8",
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.getDetail", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        params.yys = req.body.yys;//预约开始时间
        params.yye = req.body.yye;//预约结束时间
        henanHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "河南挂号个人中心",//服务名称
                    params: {//请求参数
                        p: req.body.p,//页码（默认值为1）
                        state: req.body.state,//预约状态（默认值为0）
                        yys: req.body.yys,//预约开始时间
                        yye: req.body.yye//预约结束时间
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//取消订单
const regCancel = (req, res, next) => {
    const params = {
        id: req.body.id,
        serviceId: "hospitalRegister",
        taskId: "9",
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.regCancel", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        henanHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "河南挂号取消订单",//服务名称
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
//登录
const loginInfo = (req, res, next) => {
    const params = {
        logname: req.body.logname,//用户名
        password: req.body.password,//密码
        validate: req.body.validate,//验证码
        serviceId: "hospitalRegister",
        taskId: "4",
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.loginInfo", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        henanHospitalService.allHospital(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    var modifyFields = {
                        userName: req.body.logname,
                        password: req.body.password,
                        localFrom: req.body.localFrom
                    };
                    userLoginInfoDAO.modify(params.clientID, serviceID, modifyFields, () => {
                    });
                }
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "河南挂号登录",//服务名称
                    params: {//请求参数
                        logname: req.body.logname,//用户名
                        password: req.body.password,//密码
                        validate: req.body.validate//验证码
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//获取手机验证码
const getPhoneVerification = (req, res, next) => {
    const params = {
        logname: req.body.logname,//用户名
        validateCode: req.body.validateCode,//验证码（从上一步获取）
        serviceId: "hospitalRegister",
        taskId: "10",
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.getPhoneVerification", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        henanHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "河南挂号获取手机验证码",//服务名称
                    params: {//请求参数
                        logname: req.body.logname,//用户名
                        validateCode: req.body.validateCode//验证码（从上一步获取）
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//注册点击下一步  设置登录名
const nextRegister = (req, res, next) => {
    const params = {
        validateCode: req.body.validateCode,//图片验证码
        logname: req.body.logname,//手机号
        code: req.body.code,//手机号验证码
        taskId: "11",
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "hospitalRegister",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.next", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        //res.render("heNanHospital/registerSupplement",params);
        henanHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "河南挂号设置登录名",//服务名称
                    params: {//请求参数
                        validateCode: req.body.validateCode,//图片验证码
                        logname: req.body.logname,//手机号
                        code: req.body.code//手机号验证码
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//设置登录名与补充注册信息
const registerCode = (req, res, next) => {
    const params = {
        // logname:req.body.logname,//手机号
        nlogname: req.body.nlogname,//登录名
        npassword: req.body.npassword,//登录密码
        nname: req.body.nname,//真实姓名
        nidnotype: req.body.nidnotype,//证件类型（身份证的编号为1，出生证的编号为6）
        nidno: req.body.nidno,//证件号
        nphone: req.body.nphone,//手机号
        nemail: req.body.nemail,//邮箱
        ngender: req.body.ngender,//性别（女的编号为0，男的编号为1）
        nage: req.body.nage,//年龄
        serviceId: "hospitalRegister",
        taskId: "12",
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.registerCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        //  params.validateCode = req.body.validateCode;//图片验证码
        // params.code = req.body.code;//手机号验证码
        henanHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "河南挂号设置登录名与补充注册信息",//服务名称
                    params: {//请求参数
                        nlogname: req.body.nlogname,//登录名
                        npassword: req.body.npassword,//登录密码
                        nname: req.body.nname,//真实姓名
                        nidnotype: req.body.nidnotype,//证件类型（身份证的编号为1，出生证的编号为6）
                        nidno: req.body.nidno,//证件号
                        nphone: req.body.nphone,//手机号
                        nemail: req.body.nemail,//邮箱
                        ngender: req.body.ngender,//性别（女的编号为0，男的编号为1）
                        nage: req.body.nage//年龄
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//1.10个人中心—退出登录
const addPeople = (req, res, next) => {
    const params = {
        serviceId: "hospitalRegister",
        taskId: "13",
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("hospitalCon.addPeople", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        henanHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "河南挂号退出登录",//服务名称
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
exports.henanHospitalCon = henanHospitalCon;