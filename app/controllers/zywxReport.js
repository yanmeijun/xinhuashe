const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    zywxReportService = require("../logics/zywxReport").zywxReportService;
const path = "zywxReport/", templateID = "zywxReport";
const serviceID = "IAC007";
let zywxReportCon = {};

zywxReportCon.getCon = (req, res, next) => {
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
    console.log("中国互联网违法不良信息举报renderName: " + renderName);
    // cityDAO.get(req.query.cityID, (err, cityInfo) => {
    //     res.render(path + renderName, _.extend(req.query,{cityInfo: cityInfo}));
    // })
    res.render(path + renderName, req.query);
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("中国互联网违法不良信息举报方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
//获取图片验证码
const getVerifyCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "1",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
    };
    if (util.isEmptyValue("zywxReportCon.getVerifyCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        zywxReportService.postData(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    res.send(results.responseBody.data);
                } else {
                    res.send("/images/refreshCode.png");
                }
                /*var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "中国互联网违法不良信息实名举报获取图片验证码",//服务名称
                    params: {//请求参数
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);*/
            }).catch((err) => {
            res.send(err);
        });
    }
};
//实名举报获取短信验证码
const getCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "3",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        telephone: req.body.telephone
    };
    if (util.isEmptyValue("zywxReportCon.getCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        zywxReportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "中国互联网违法不良信息实名举报获取短信验证码",//服务名称
                    params: {//请求参数
                        telephone: req.body.telephone,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//实名举报校验短信验证码
const checkCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "4",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        verifyCode: req.body.verifyCode
    };
    if (util.isEmptyValue("zywxReportCon.checkCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        zywxReportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "中国互联网违法不良信息实名举报校验短信验证码",//服务名称
                    params: {//请求参数
                        verifyCode: req.body.verifyCode,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//获取举报类型选项
const reportTypeList = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "7",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
    };
    if (util.isEmptyValue("zywxReportCon.reportTypeList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        zywxReportService.postData(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//获取搜索引擎类型选项
const sETypeList = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "8",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
    };
    if (util.isEmptyValue("zywxReportCon.sETypeList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        zywxReportService.postData(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//获取下载源类别选项
const appDownloadList = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "9",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
    };
    if (util.isEmptyValue("zywxReportCon.appDownloadList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        zywxReportService.postData(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//获取通讯工具名称选项
const toolNameList = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "10",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
    };
    if (util.isEmptyValue("zywxReportCon.toolNameList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        zywxReportService.postData(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//获取账号性质选项
const accountNatureList = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "11",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
    };
    if (util.isEmptyValue("zywxReportCon.accountNatureList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        zywxReportService.postData(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//获取网盘名称选项
const driveNameList = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "12",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
    };
    if (util.isEmptyValue("zywxReportCon.driveNameList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        zywxReportService.postData(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//获取有害信息类型选项
const harmTypeList = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "13",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
    };
    if (util.isEmptyValue("zywxReportCon.harmTypeList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        zywxReportService.postData(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//举报
const report = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: req.body.realName ? "15" : "14",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
    };
    if (util.isEmptyValue("zywxReportCon.report", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        zywxReportService.postData(_.extend(req.body, {
            sessionId: req.body.randomKey,
            taskId: req.body.realName ? "15" : "14",
            serviceId: templateID,
        }))
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "中国互联网违法不良信息举报",//服务名称
                    params: req.body,
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//举报查询
const reportSearch = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "16",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        querycode: req.body.querycode,
        verifyCode: req.body.verifyCode,
    };
    if (util.isEmptyValue("zywxReportCon.reportSearch", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        zywxReportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "中国互联网违法不良信息举报查询",//服务名称
                    params: {//请求参数
                        querycode: req.body.querycode,
                        verifyCode: req.body.verifyCode
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//上传文件
const upload = (req, res, next) => {
    const filePath = "./" + templateID + Math.random().toString(36).substr(2) + "/";
    util.uploadFile(req, {filePath: filePath})
        .then(filePathList => {
            Promise.all(filePathList.map(item => {
                return new Promise((resolve, reject) => {
                    util.uploadToOss(item).then(url => {
                        resolve(url)
                    })
                });
            })).then(results => {
                res.send(results);
                util.deleteFolder(filePath)
            })
        })
};
//举报查询
const getFilePath = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "17",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        ossList: req.body.ossList
    };
    if (util.isEmptyValue("zywxReportCon.getFilePath", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        let filePath = "";
        Promise.all(params.ossList.map(item => {
            var data = {
                sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
                taskId: "17",
                serviceId: templateID,
                file: item
            }
            return new Promise(resolve => {
                zywxReportService.postData(data).then(itemRes => {
                    if (itemRes.retCode == "000000") {
                        filePath += itemRes.responseBody.path + ","
                    }
                    resolve()
                })
            })
        })).then(() => {
            res.send(filePath);
        })
    }
};


exports.zywxReportCon = zywxReportCon;