const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    linmuService = require("../logics/linmu").linmuService;
const path = "jxzwfww/", templateID = "linmu", serviceID = "ZAE0001";
let linmuCon = {};

linmuCon.getCon = (req, res, next) => {
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
    console.log("林木种子生产经营许可证申请renderName: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("林木种子生产经营许可证申请方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
//第一章 获取验证码
const getVeryCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "1",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("linmuCon.getVeryCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        linmuService.postData(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    res.send(results.responseBody.data);
                } else {
                    res.send("/images/refreshCode.png");
                }
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "林木种子生产经营许可证申请获取验证码",//服务名称
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
//第二章 登录
const login = (req, res, next) => {
    const params = {
        loginname: req.body.loginname,
        loginpassword: req.body.loginpassword,
        usertype: '0',
        randcode: req.body.randcode,
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "2",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("linmuCon.login", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        linmuService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "林木种子生产经营许可证申请登录",//服务名称
                    params: {//请求参数
                        loginname: req.body.loginname,
                        loginpassword: req.body.loginpassword,
                        usertype: req.body.usertype,
                        randcode: req.body.randcode
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
const uploadFileToOss = (req, res, next) => {
    const filePath = "./" + templateID + Math.random().toString(36).substr(2) + "/";
    util.uploadFile(req, {filePath: filePath})
        .then(filePathList => {
            Promise.all(filePathList.map(item => {
                return new Promise((resolve, reject) => {
                    util.uploadToOss(item)
                        .then(url => {resolve(url)})
                        .catch(err => {reject(err)})
                });
            })).then(results => {
                res.send(results);
                util.deleteFolder(filePath)
            }).catch(err => {
                console.log(err)
            })
        })
};
//第三章 林木种子生产经营许可证申请表文件上传
const uploadTableFile = (req, res, next) => {
    const params = {
        file: req.body.file,
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "3.1",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("linmuCon.uploadTableFile", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        linmuService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "林木种子生产经营许可证申请表文件上传",//服务名称
                    params: {//请求参数
                        file: req.body.file
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//第四章 营业执照或者法人证书文件上传
const uploadCertificateFile = (req, res, next) => {
    const params = {
        file: req.body.file,
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "3.2",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("linmuCon.uploadCertificateFile", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        linmuService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "林木种子生产经营许可证申请营业执照或者法人证书文件上传",//服务名称
                    params: {//请求参数
                        file: req.body.file
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//第五章 身份证文件上传
const uploadIdcardFile = (req, res, next) => {
    const params = {
        file: req.body.file,
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "3.3",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("linmuCon.uploadIdcardFile", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        linmuService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "林木种子生产经营许可证申请身份证文件上传",//服务名称
                    params: {//请求参数
                        file: req.body.file
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//第六章 单位章程文件上传
const uploadUnitcharterFile = (req, res, next) => {
    const params = {
        file: req.body.file,
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "3.4",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("linmuCon.uploadUnitcharterFile", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        linmuService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "林木种子生产经营许可证申请单位章程文件上传",//服务名称
                    params: {//请求参数
                        file: req.body.file
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//第七章 林木种子生产、加工、检验、储藏等设施和仪器设备的所有权或者使用权说明材料以及照片文件上传
const uploadEquipmentFile = (req, res, next) => {
    const params = {
        file: req.body.file,
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "3.5",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("linmuCon.uploadEquipmentFile", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        linmuService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "林木种子生产经营许可证申请设施和仪器设备文件上传",//服务名称
                    params: {//请求参数
                        file: req.body.file
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//第八章 林木种子生产、加工、检验、储藏等技术人员基本情况的说明材料以及劳动合同文件上传
const uploadEmployeeFile = (req, res, next) => {
    const params = {
        file: req.body.file,
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "3.6",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("linmuCon.uploadEmployeeFile", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        linmuService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "林木种子生产经营许可证申请技术人员文件上传",//服务名称
                    params: {//请求参数
                        file: req.body.file
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//第九章 生产地点无检疫性有害生物证明文件上传
const uploadHygieneFile = (req, res, next) => {
    const params = {
        file: req.body.file,
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "3.7",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("linmuCon.uploadHygieneFile", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        linmuService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "林木种子生产经营许可证申请卫生文件上传",//服务名称
                    params: {//请求参数
                        file: req.body.file
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//第十章 经营场所、生产用地权属证明材料文件上传
const uploadLandFile = (req, res, next) => {
    const params = {
        file: req.body.file,
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "3.8",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("linmuCon.uploadLandFile", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        linmuService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "林木种子生产经营许可证申请用地权属文件上传",//服务名称
                    params: {//请求参数
                        file: req.body.file
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//第十一章 在线申请提交接口
const submit = (req, res, next) => {
    const params = {
        xm: req.body.xm,
        zjhm: req.body.zjhm,
        lxdh: req.body.lxdh,
        lxdz: req.body.lxdz,
        xmmc: req.body.xmmc,
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "4.1",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("linmuCon.submit", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        linmuService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "林木种子生产经营许可证申请",//服务名称
                    params: {//请求参数
                        xm: req.body.xm,
                        zjhm: req.body.zjhm,
                        lxdh: req.body.lxdh,
                        lxdz: req.body.lxdz,
                        xmmc: req.body.xmmc
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
/*阅读须知*/
const readNotice = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "6",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("linmuCon.readNotice", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        linmuService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "林木种子生产经营许可证申请",//服务名称
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
exports.linmuCon = linmuCon;