const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    passportService = require("../logics/passport").passportService;
const path = "passport/", serviceID = 'HAA0001';
let passportCon = {};

passportCon.getCon = (req, res, next) => {
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
    console.log("出入境办理renderName: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
}
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("出入境办理请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
}
const getCity = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "passport",
        taskId: "1",
    };
    if (util.isEmptyValue("passportCon.getCity", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        passportService.postData(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const getBasicInfo = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "passport",
        taskId: "3",
        sldw: req.body.sldw,
    };
    if (util.isEmptyValue("passportCon.getBasicInfo", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        passportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "出入境办理获取基本信息",//服务名称
                    params: {//请求参数
                        sldw: req.body.sldw,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};

const getDate = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "passport",
        taskId: "4",
        sldw: req.body.sldw,
    };
    if (util.isEmptyValue("passportCon.getDate", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        passportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "出入境办理获取日期列表",//服务名称
                    params: {//请求参数
                        sldw: req.body.sldw,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};

const setCookie = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "passport",
        taskId: "2",
        sldw: req.body.sldw,
        cnzz_eid: req.body.cnzz_eid,
        umuuid: req.body.umuuid,
        rnd: req.body.rnd,
    };
    if (util.isEmptyValue("passportCon.setCookie", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        passportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "出入境办理设置cookie",//服务名称
                    params: {//请求参数
                        sldw: req.body.sldw,
                        cnzz_eid: req.body.cnzz_eid,
                        umuuid: req.body.umuuid,
                        rnd: req.body.rnd,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};

const getTime = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "passport",
        taskId: "5",
        sldw: req.body.sldw,
        wsyyrq: req.body.wsyyrq
    };
    if (util.isEmptyValue("passportCon.getTime", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        passportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "出入境办理获取时间列表",//服务名称
                    params: {//请求参数
                        sldw: req.body.sldw,
                        wsyyrq: req.body.wsyyrq
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};

const getNamePinyin = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "passport",
        taskId: "6",
        zwzf: req.body.zwzf
    };
    if (util.isEmptyValue("passportCon.getNamePinyin", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        passportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "出入境办理获取拼音",//服务名称
                    params: {//请求参数
                        zwzf: req.body.zwzf
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const namefamily = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "passport",
        taskId: "7"
    };
    if (util.isEmptyValue("passportCon.namefamily", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        passportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "出入境办理获取民族列表",//服务名称
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
const brithAddress = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "passport",
        taskId: "9"
    };
    if (util.isEmptyValue("passportCon.brithAddress", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        passportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "出入境办理获取出生地",//服务名称
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
/*获取省列表*/
const brithHuji = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "passport",
        taskId: "10"
    };
    if (util.isEmptyValue("passportCon.brithHuji", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        passportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "出入境办理获取省列表",//服务名称
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

const cityChoice = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "passport",
        taskId: "11",
        province: req.body.province
    };
    if (util.isEmptyValue("passportCon.cityChoice", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        passportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "出入境办理获取城市列表",//服务名称
                    params: {//请求参数
                        province: req.body.province
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};

const countyChoice = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "passport",
        taskId: "12",
        city: req.body.city
    };
    if (util.isEmptyValue("passportCon.countyChoice", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        passportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "出入境办理获取区县列表",//服务名称
                    params: {//请求参数
                        city: req.body.city
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const getIdNumber = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "passport",
        taskId: "16",
        sldw: req.body.sldw,
        wsyyrq: req.body.wsyyrq,
        wsyysj: req.body.wsyysj,
        provinceCode: req.body.provinceCode,
        cityCode: req.body.cityCode,
    };
    if (util.isEmptyValue("passportCon.getIdNumber", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        passportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "出入境办理获取IdNumber",//服务名称
                    params: {//请求参数
                        sldw: req.body.sldw,
                        wsyyrq: req.body.wsyyrq,
                        wsyysj: req.body.wsyysj,
                        provinceCode: req.body.provinceCode,
                        cityCode: req.body.cityCode,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const getVerycode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "passport",
        taskId: "13"
    };
    if (util.isEmptyValue("passportCon.getVerycode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        passportService.postData(params)
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
                    taskName: "出入境办理获取验证码",//服务名称
                    params: {//请求参数
                     
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send("/images/refreshCode.png");
        })
    }
};
const submit = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "passport",
        taskId: "15",
        bzlx: req.body.bzlx,
        pthzlb: req.body.pthzlb,
        qzfs: req.body.qzfs,
        yzbm: req.body.yzbm,
        txtXML: req.body.txtXML,
    };
    if (util.isEmptyValue("passportCon.submit", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        passportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "出入境办理提交信息",//服务名称
                    params: {//请求参数
                        bzlx: req.body.bzlx,
                        pthzlb: req.body.pthzlb,
                        qzfs: req.body.qzfs,
                        yzbm: req.body.yzbm,
                        txtXML: req.body.txtXML,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const getOrderInfo = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "passport",
        taskId: "17"
    };
    if (util.isEmptyValue("passportCon.getOrderInfo", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        passportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "出入境办理获取订单信息",//服务名称
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
const searchOrder = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "passport",
        taskId: "18",
        csrq: req.body.csrq,
        yymm: req.body.yymm
    };
    if (util.isEmptyValue("passportCon.searchOrder", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        passportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "出入境办理订单搜索",//服务名称
                    params: {//请求参数
                        csrq: req.body.csrq,
                        yymm: req.body.yymm
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
        serviceId: "passport",
        taskId: "19",
        sqxxId: req.body.sqxxId
    };
    if (util.isEmptyValue("passportCon.cancelOrder", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        passportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "出入境办理取消订单",//服务名称
                    params: {//请求参数
                        sqxxId: req.body.sqxxId
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
/*设置出入境网上预约申请查询Cookie*/
const setSearchCookie = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: "passport",
        taskId: "20",
        cnzz_eid: req.body.cnzz_eid,
        umuuid: req.body.umuuid,
        rnd: req.body.rnd,
        showp: req.body.showp
    };
    if (util.isEmptyValue("passportCon.setSearchCookie", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.sldw = req.body.sldw;
        passportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "出入境网上预约申请设置查询Cookie",//服务名称
                    params: {//请求参数
                        cnzz_eid: req.body.cnzz_eid,
                        umuuid: req.body.umuuid,
                        rnd: req.body.rnd,
                        showp: req.body.showp
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
exports.passportCon = passportCon;