const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    monitorReportService = require("../logics/monitorReport").monitorReportService;
const path = "monitorReport/";
const serviceID = "IAG0001", templateID = "monitorReport";
let monitorReportCon = {};
monitorReportCon.getCon = (req, res, next) => {
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
    console.log("纪检监察机关举报查询renderName: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("纪检监察机关举报查询请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
//验证码
const verification = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "1",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        configurl: req.body.configurl
    };
    if (util.isEmptyValue("monitorReportCon.verification", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        monitorReportService.postData(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    //http://47.96.254.45/service/
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
                 taskName: "纪检监察机举报验证码",//服务名称
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
//纪检监察机关举报	匿名举报
const anonymousReport = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "2",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        reportProvinceCode: req.body.reportProvinceCode,//
        reportCityCode: req.body.reportCityCode,//
        reportCountyCode: req.body.reportCountyCode,//
        fileIds: req.body.fileIds, //
        reportType: req.body.reportType, //
        submitAreaCode: req.body.submitAreaCode, //
        reportName: req.body.reportName, //被举报人
        reportDept: req.body.reportDept, //被举报人单位
        reportPosition: req.body.reportPosition, //被举报人职务
        reportArea: req.body.reportArea, //被举报人所在地区
        reportLevelId: req.body.reportLevelId, //被举报人级别
        title: req.body.title, //标题
        reportQuestionId1: req.body.reportQuestionId1, //问题类别选项
        reportQuestionId: req.body.reportQuestionId, //问题类别细选项
        reportQuestion: req.body.reportQuestion, //问题类别
        content: req.body.content //主要问题
    };
    if (util.isEmptyValue("xzMonitorReportCon.anonymousReport", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.userName = req.body.userName || "";//举报人姓名
        params.userIdCard = req.body.userIdCard || "";//举报人身份证号码
        params.userContact = req.body.userContact || "";//举报人联系方式
        params.userPoliticalCode = req.body.userPoliticalCode || "";
        params.userPoliticalId = req.body.userPoliticalId || "";//举报人政治面貌选项
        params.userPolitical = req.body.userPolitical || "";//举报人政治面貌
        params.userAddress = req.body.userAddress || "";//举报人现居住地址
        params.userLevelId = req.body.userLevelId || "";//举报人级别
        params.uploadify = req.body.uploadify || "";//附件上传
        params.reportImg = req.body.reportImg || "";//举报图片验证码
        monitorReportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "纪检监察机关匿名举报",//服务名称
                    params: {//请求参数
                        reportProvinceCode: req.body.reportProvinceCode,//
                        reportCityCode: req.body.reportCityCode,//
                        reportCountyCode: req.body.reportCountyCode,//
                        fileIds: req.body.fileIds, //
                        reportType: req.body.reportType, //
                        submitAreaCode: req.body.submitAreaCode, //
                        reportName: req.body.reportName, //被举报人
                        reportDept: req.body.reportDept, //被举报人单位
                        reportPosition: req.body.reportPosition, //被举报人职务
                        reportArea: req.body.reportArea, //被举报人所在地区
                        reportLevelId: req.body.reportLevelId, //被举报人级别
                        title: req.body.title, //标题
                        reportQuestionId1: req.body.reportQuestionId1, //问题类别选项
                        reportQuestionId: req.body.reportQuestionId, //问题类别细选项
                        reportQuestion: req.body.reportQuestion, //问题类别
                        content: req.body.content, //主要问题
                        userName: req.body.userName || "",//举报人姓名
                        userIdCard: req.body.userIdCard || "",//举报人身份证号码
                        userContact: req.body.userContact || "",//举报人联系方式
                        userPoliticalId: req.body.userPoliticalId || "",//举报人政治面貌选项
                        userPolitical: req.body.userPolitical || "",//举报人政治面貌
                        userAddress: req.body.userAddress || "",//举报人现居住地址
                        userLevelId: req.body.userLevelId || "",//举报人级别
                        uploadify: req.body.uploadify || ""//附件上传
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//纪检监察机关举报 署名举报
const signatureReport = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "3",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        reportProvince: req.body.reportProvince,//被举报人所属省份
        reportProvinceId: req.body.reportProvinceId,//被举报人所属省份id
        reportCity: req.body.reportCity,//被举报人所属市
        reportCityId: req.body.reportCityId,//被举报人所属市id
        reportCounty: req.body.reportCounty,//被举报人所属县
        reportCountyId: req.body.reportCountyId,//被举报人所属县id
        reportArea: req.body.reportArea,//被举报人所在地区
        reportPolitical: req.body.reportPolitical,//被举报人特殊身份
        reportLevel: req.body.reportLevel,//
        reportSpecial: req.body.reportSpecial,
        reportState: req.body.reportState,//当前举报站点代码
        reportProvinceCode: req.body.reportProvinceCode,//被举报人所属省id
        reportCityCode: req.body.reportCityCode,//被举报人所属市id
        reportCountyCode: req.body.reportCountyCode,//被举报人所属县id
        reportType: req.body.reportType,//指定署名or匿名举报 匿名=0，署名=1
        fileIds: req.body.fileIds,//
        submitAreaCode: req.body.submitAreaCode,//提交举报人所在id
        userName: req.body.userName,//举报人姓名
        userIdCard: req.body.userIdCard,//举报人身份证号码
        userContact: req.body.userContact,//举报人联系方式
        userAddress: req.body.userAddress,//举报人现居住地址
        reportName: req.body.reportName,//被举报人
        reportDept: req.body.reportDept,//被举报人单位
        reportPosition: req.body.reportPosition,//被举报人职务
        reportLevelCode: req.body.reportLevelCode,
        reportTitle: req.body.reportTitle,
        reportQuestionId1: req.body.reportQuestionId1,//问题类别选项
        reportQuestionCode: req.body.reportQuestionCode,
        reportContent: req.body.reportContent,
        reportLevelId: req.body.reportLevelId,//被举报人级别
        title: req.body.title,//标题
        reportQuestionId: req.body.reportQuestionId,//问题类别细选项
        reportQuestion: req.body.reportQuestion,//问题类别
        reportImg: req.body.reportImg,
        reportRand: req.body.reportRand,//主要问题
        configurl: req.body.configurl,
        userLevel: req.body.userLevel,
        content: req.body.content
    };
    /* if (util.isEmptyValue("monitorReportCon.signatureReport", params)) {
         res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
     } else {*/
    params.userPoliticalCode = req.body.userPoliticalCode || "";
    params.userPolitical = req.body.userPolitical || "";//举报人政治面貌
    params.userPoliticalId = req.body.userPoliticalId || "";//举报人政治面貌选项
    params.userLevelId = req.body.userLevelId || "";//举报人级别
    params.userLevelCode = req.body.userLevelCode || "";
    params.uploadify = req.body.uploadify || "";//附件上传
    monitorReportService.postData(params)
        .then((results) => {
            res.send(results);
            var logData = {
                localFrom: req.body.localFrom,//项目用户名称
                clientID: params.clientID,//用户设备ID
                serviceID: serviceID,//前台服务ID
                templateID: templateID,//引擎模板服务ID
                taskId: params.taskId,//引擎模板服务taskID
                taskName: "纪检监察机关署名举报",//服务名称
                params: {//请求参数
                    reportProvince: req.body.reportProvince,//被举报人所属省份
                    reportProvinceId: req.body.reportProvinceId,//被举报人所属省份id
                    reportCity: req.body.reportCity,//被举报人所属市
                    reportCityId: req.body.reportCityId,//被举报人所属市id
                    reportCounty: req.body.reportCounty,//被举报人所属县
                    reportCountyId: req.body.reportCountyId,//被举报人所属县id
                    reportArea: req.body.reportArea,//被举报人所在地区
                    reportPolitical: req.body.reportPolitical,//被举报人特殊身份
                    reportLevel: req.body.reportLevel,//
                    reportSpecial: req.body.reportSpecial,
                    reportState: req.body.reportState,//当前举报站点代码
                    reportProvinceCode: req.body.reportProvinceCode,//被举报人所属省id
                    reportCityCode: req.body.reportCityCode,//被举报人所属市id
                    reportCountyCode: req.body.reportCountyCode,//被举报人所属县id
                    reportType: req.body.reportType,//指定署名or匿名举报 匿名=0，署名=1
                    fileIds: req.body.fileIds,//
                    submitAreaCode: req.body.submitAreaCode,//提交举报人所在id
                    userName: req.body.userName,//举报人姓名
                    userIdCard: req.body.userIdCard,//举报人身份证号码
                    userContact: req.body.userContact,//举报人联系方式
                    userAddress: req.body.userAddress,//举报人现居住地址
                    reportName: req.body.reportName,//被举报人
                    reportDept: req.body.reportDept,//被举报人单位
                    reportPosition: req.body.reportPosition,//被举报人职务
                    reportLevelCode: req.body.reportLevelCode,
                    reportTitle: req.body.reportTitle,
                    reportQuestionId1: req.body.reportQuestionId1,//问题类别选项
                    reportQuestionCode: req.body.reportQuestionCode,
                    reportContent: req.body.reportContent,
                    reportLevelId: req.body.reportLevelId,//被举报人级别
                    title: req.body.title,//标题
                    reportQuestionId: req.body.reportQuestionId,//问题类别细选项
                    reportQuestion: req.body.reportQuestion,//问题类别
                    reportImg: req.body.reportImg,
                    reportRand: req.body.reportRand,//主要问题
                    configurl: req.body.configurl,
                    userLevel: req.body.userLevel,
                    content: req.body.content,
                    userPoliticalCode: req.body.userPoliticalCode || "",
                    userPolitical: req.body.userPolitical || "",//举报人政治面貌
                    userPoliticalId: req.body.userPoliticalId || "",//举报人政治面貌选项
                    userLevelId: req.body.userLevelId || "",//举报人级别
                    userLevelCode: req.body.userLevelCode || "",
                    uploadify: req.body.uploadify || ""//附件上传
                },
                results: JSON.stringify(results)//返回结果
            };
            userLogDAO.add(logData);
        }).catch((err) => {
        res.send(err);
    });
    //}
};
const correctVerification = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "3.1",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        reportImg: req.body.reportImg,//图片验证码
        img: req.body.img,//图片验证码
        submitAreaCode: req.body.submitAreaCode,//当前举报站点代码 （地区编码）
        configurl: req.body.configurl
    };
    if (util.isEmptyValue("monitorReportCon.correctVerification", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.reportContent = req.body.reportContent || "";//主要问题
        monitorReportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "纪检监察机举报查询判断验证码",//服务名称
                    params: {//请求参数
                        reportImg: req.body.reportImg,//图片验证码
                        img: req.body.img,//图片验证码
                        submitAreaCode: req.body.submitAreaCode,//当前举报站点代码 （地区编码）
                    },
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
        serviceId: templateID,
        taskId: "4",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        reportRand: req.body.reportRand,//查询码
        img: req.body.img,//验证码
        reportImg: req.body.reportImg,
        configurl: req.body.configurl
    };
    if (util.isEmptyValue("monitorReportCon.reportSearch", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        monitorReportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "纪检监察机举报查询",//服务名称
                    params: {//请求参数
                        reportRand: req.body.reportRand,//查询码
                        img: req.body.img,//验证码
                        reportImg: req.body.reportImg,
                        configurl: req.body.configurl
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//获取举报级别
const levelCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "5",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        configurl: req.body.configurl
    };
    if (util.isEmptyValue("monitorReportCon.levelCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        monitorReportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "纪检监察机举报查询获取举报级别",//服务名称
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
//获取政治面貌
const politicalCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "6",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        configurl: req.body.configurl
    };
    if (util.isEmptyValue("monitorReportCon.politicalCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        monitorReportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "纪检监察机举报获取政治面貌",//服务名称
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
//获取问题类别
const questionCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: templateID,
        taskId: "7",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        configurl: req.body.configurl
    };
    if (util.isEmptyValue("monitorReportCon.questionCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        monitorReportService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "纪检监察机举报获取问题类别",//服务名称
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
//上传文件
const upload = (req, res, next) => {
    const filePath = "./monitorReport" + Math.random().toString(36).substr(2) + "/";
    util.uploadFile(req, {filePath: filePath})
        .then(filePathList => {
            Promise.all(filePathList.map(item => {
                return new Promise((resolve, reject) => {
                    util.uploadToOss(item).then(url => {
                        resolve(url)
                    })
                });
            })).then(results => {
                let filePaths = '';
                for (let i = 0; i < results.length; i++) {
                    let item = results[i];
                    filePaths += item + ","
                }
                res.send(filePaths);
                util.deleteFolder(filePath)
            })
        })
};
exports.monitorReportCon = monitorReportCon;