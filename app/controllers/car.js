const urlParse = require('url'),
    util = require('../../lib/util').util,
    config = require("../../config"),
    userLogDAO = require('../dao/userLog').userLogDAO,
    carService = require("../logics/car").carService,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO;

let carCon = {};
carCon.getCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("车辆违章查询请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
}
//车辆违章查询获取图片验证码
const infractionVeryCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "1",
        serviceId: "illegal",
        sfCode: req.body.sfCode,//查询的省市
        randomKey: req.body.randomKey,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y
    };
    if (util.isEmptyValue("carCon.infractionVeryCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        carService.postData(params)
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
                    serviceID: "AAA0001",//前台服务ID
                    templateID: "illegal",//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "车辆违章查询获取图片验证码",//服务名称
                    params: {//请求参数
                        sfCode: req.body.sfCode//查询的省市
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//车辆违章查询
const findInfraction = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "2",
        serviceId: "illegal",
        sfCode: req.body.sfCode,//查询的省市
        hpzl: req.body.hpzl,
        hphm1b: req.body.hphm1b,
        hphm: req.body.hphm,
        fdjh: req.body.fdjh,
        captcha: req.body.captcha,
        randomKey: req.body.randomKey,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y
    };
    if (util.isEmptyValue("carCon.findInfraction", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        carService.postData(params)
            .then((results) => {
                res.send(results);
                var modifyFields = {
                    sfCode: req.body.sfCode,//查询的省市
                    hpzl: req.body.hpzl,
                    hphm1b: req.body.hphm1b,
                    hphm: req.body.hphm,
                    fdjh: req.body.fdjh,
                    localFrom: req.body.localFrom
                };
                userLoginInfoDAO.modify(params.clientID, "AAA0001", modifyFields, () => {
                });
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: "AAA0001",//前台服务ID
                    templateID: "illegal",//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "车辆违章查询",//服务名称
                    params: {//请求参数
                        sfCode: req.body.sfCode,//查询的省市
                        hpzl: req.body.hpzl,
                        hphm1b: req.body.hphm1b,
                        hphm: req.body.hphm,
                        fdjh: req.body.fdjh,
                        captcha: req.body.captcha
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//驾照扣分查询获取图片验证码
const deductionVeryCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "1",
        serviceId: "koufen",
        sfCode: req.body.sfCode,//查询的省市
        randomKey: req.body.randomKey,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y
    };
    if (util.isEmptyValue("carCon.deductionVeryCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        carService.postData(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    res.send(results.responseBody.data);
                } else {
                    res.send("/images/refreshCode.png");
                }
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: "AAB0001",//前台服务ID
                    templateID: "koufen",//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "驾照扣分查询获取图片验证码",//服务名称
                    params: {//请求参数
                        sfCode: req.body.sfCode,//查询的省市
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
                // res.send(results);
            }).catch((err) => {
            res.send("/images/refreshCode.png");
        });
    }
};
//驾照扣分
const findDeduction = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "2",
        serviceId: "koufen",
        sfCode: req.body.sfCode,//查询的省市
        jszh: req.body.licenseNo,
        dabh: req.body.fileNo,
        captcha: req.body.veriCode,
        randomKey: req.body.randomKey,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y
    };
    if (util.isEmptyValue("carCon.findDeduction", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        carService.postData(params)
            .then((results) => {
                res.send(results);
                var modifyFields = {
                    sfCode: req.body.sfCode,//查询的省市
                    jszh: req.body.licenseNo,
                    dabh: req.body.fileNo,
                    localFrom: req.body.localFrom
                };
                userLoginInfoDAO.modify(params.clientID, "AAB0001", modifyFields, () => {
                });
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: "AAB0001",//前台服务ID
                    templateID: "koufen",//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "驾照扣分查询",//服务名称
                    params: {//请求参数
                        sfCode: req.body.sfCode,//查询的省市
                        jszh: req.body.licenseNo,
                        dabh: req.body.fileNo,
                        captcha: req.body.veriCode,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//六个城市小客车摇号查询
const findShakeNum = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: req.body.isGZ ? "2" : "1",
        serviceId: "yaohao",
        place: req.body.place || "gz",
        id: req.body.id,
        randomKey: req.body.randomKey,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y
    };
    if (util.isEmptyValue("carCon.findShakeNum", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        carService.postData(params).then((content) => {
            res.send(content);
            var logData = {
                localFrom: req.body.localFrom,//项目用户名称
                clientID: req.body.clientID,//用户设备ID
                serviceID: "AAG0000",//前台服务ID
                templateID: "yaohao",//引擎模板服务ID
                taskId: params.taskId,//引擎模板服务taskID
                taskName: "六个城市小客车摇号查询",//服务名称
                params: {//请求参数
                    place: params.place,
                    id: req.body.id
                },
                results: JSON.stringify(content)//返回结果
            };
            userLogDAO.add(logData);
        }).catch((err) => {
            res.send(err);
        })
    }
};

//停车场查询
const findParking = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "1",
        serviceId: "parking",
        tcczmc: req.body.tcczmc,
        randomKey: req.body.randomKey,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y
    };
    if (util.isEmptyValue("carCon.findParking", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.ssqx = req.body.ssqx || "";
        params.page = req.body.page || "1";
        carService.postData(params).then((content) => {
            res.send(content);
            var logData = {
                localFrom: req.body.localFrom,//项目用户名称
                clientID: req.body.clientID,//用户设备ID
                serviceID: "AAE0001",//前台服务ID
                templateID: "parking",//引擎模板服务ID
                taskId: params.taskId,//引擎模板服务taskID
                taskName: "停车场查询",//服务名称
                params: {//请求参数
                    tcczmc: req.body.tcczmc
                },
                results: JSON.stringify(content)//返回结果
            };
            userLogDAO.add(logData);
        }).catch((err) => {
            res.send(err);
        })
    }
};
//获取车辆报废图片验证码
const carScrappedVeryCode = (req, res, next) => {
    const params = {
        serviceId: "baofei",
        taskId: "1",
        sfCode: req.body.sfCode,
        sessionId: req.body.randomKey,
        randomKey: req.body.randomKey,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y
    };
    if (util.isEmptyValue("carCon.carScrappedVeryCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        carService.postData(params).then((content) => {
            if (content.retCode == "000000") {
                res.send(content.responseBody.data);
            } else {
                res.send("/images/refreshCode.png");
            }
            var logData = {
                localFrom: req.body.localFrom,//项目用户名称
                clientID: req.body.clientID,//用户设备ID
                serviceID: "AAA0004",//前台服务ID
                templateID: "baofei",//引擎模板服务ID
                taskId: params.taskId,//引擎模板服务taskID
                taskName: "获取车辆报废图片验证码",//服务名称
                params: {//请求参数
                    sfCode: req.body.sfCode,
                },
                results: JSON.stringify(content)//返回结果
            };
            userLogDAO.add(logData);
        }).catch((err) => {
            res.send("/images/refreshCode.png");
        })
    }
};
//车辆报废查询
const findCarScrapped = (req, res, next) => {
    const params = {
        hpzl: req.body.hpzl,//号牌种类
        hphm2a: req.body.hphm2a,//车牌号牌
        hphm2b: req.body.hphm2b,//车牌号码
        hphm: req.body.hphm,//号牌号码
        fdjh: req.body.fdjh,//发动机号后六位
        sfCode: req.body.sfCode,
        captcha: req.body.captcha,//验证码
        sessionId: req.body.randomKey,
        serviceId: "baofei",
        taskId: "2",
        randomKey: req.body.randomKey,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y
    };
    if (util.isEmptyValue("carCon.findCarScrapped", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        carService.postData(params).then((content) => {
            res.send(content);
            var modifyFields = {
                hpzl: req.body.hpzl,//号牌种类
                hphm2a: req.body.hphm2a,//车牌号牌
                hphm2b: req.body.hphm2b,//车牌号码
                hphm: req.body.hphm,//号牌号码
                fdjh: req.body.fdjh,//发动机号后六位
                sfCode: req.body.sfCode,
                localFrom: req.body.localFrom
            };
            userLoginInfoDAO.modify(params.clientID, "AAA0004", modifyFields, () => {
            });
            var logData = {
                localFrom: req.body.localFrom,//项目用户名称
                clientID: req.body.clientID,//用户设备ID
                serviceID: "AAA0004",//前台服务ID
                templateID: "baofei",//引擎模板服务ID
                taskId: params.taskId,//引擎模板服务taskID
                taskName: "车辆报废查询",//服务名称
                params: {//请求参数
                    hpzl: req.body.hpzl,//号牌种类
                    hphm2a: req.body.hphm2a,//车牌号牌
                    hphm2b: req.body.hphm2b,//车牌号码
                    hphm: req.body.hphm,//号牌号码
                    fdjh: req.body.fdjh,//发动机号后六位
                    sfCode: req.body.sfCode,
                    captcha: req.body.captcha//验证码
                },
                results: JSON.stringify(content)//返回结果
            };
            userLogDAO.add(logData);
        }).catch((err) => {
            res.send(err);
        })
    }
};
exports.carCon = carCon;