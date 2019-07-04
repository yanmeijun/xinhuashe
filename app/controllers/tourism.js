const urlParse = require('url'),
    _ = require('underscore'),
    util = require('../../lib/util').util,
    tourismService = require("../logics/tourism").tourismService,
    userLogDAO = require('../dao/userLog').userLogDAO,
    cityDAO = require('../dao/city').cityDAO;

let tourismCon = {};
const path = "tourism/", serviceID = 'IAE0002', templateID = "touristComplaint";

//跳转旅游投诉
tourismCon.touristComplaint = (req, res, next) => {
    const {randomKey, userID, clientID, cityID, local_x, local_y, citySRC} = req.query;
    res.render("tourism/touristComplaint", _.extend(req.query, {cityInfo: {citySRC: citySRC}}));
}
//跳转旅游投诉查询
tourismCon.tourismComplaintProgress = (req, res, next) => {
    const {randomKey, userID, clientID, cityID, local_x, local_y, citySRC} = req.query;
    res.render("tourism/tourismComplaintProgress", _.extend(req.query, {cityInfo: {citySRC: citySRC}}));
}
tourismCon.getCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("12301旅游投诉请求方法名: " + pathName);
    if (!pathName) return;
    const method = req.method.toUpperCase();
    if (method == "GET" && pathName == "getVerifyCode") {
        getVerifyCode(req, res, next)
    } else if (method == "POST" && pathName == "uploadFile") {
        uploadFile(req, res, next)
    } else if (method == "POST" && pathName == "submitInfo") {
        submitInfo(req, res, next)
    } else if (method == "GET" && pathName == "findInfo") {
        findInfo(req, res, next)
    } else {
        eval(pathName + "(req, res, next)");
    }
}
//12301旅游投诉获取短信验证码
const getVerifyCode = (req, res, next) => {
    const params = {
        sessionId: req.query.randomKey,
        taskId: "1",
        serviceId: templateID,
        phone: req.query.phone,
        randomKey: req.query.randomKey,
        userID: req.query.userID,
        clientID: req.query.clientID,
        cityID: req.query.cityID,
        local_x: req.query.local_x,
        local_y: req.query.local_y
    };
    if (util.isEmptyValue("tourismCon.getVerifyCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        tourismService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.query.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: "1",//引擎模板服务taskID
                    taskName: "12301旅游投诉获取短信验证码",//服务名称
                    params: {//请求参数
                        phone: req.query.phone,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//12301旅游投诉验证短信验证码
const checkVerifyCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "2",
        serviceId: templateID,
        phone: req.body.phone,
        captcha: req.body.captcha,
        randomKey: req.body.randomKey,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y
    };
    if (util.isEmptyValue("tourismCon.checkVerifyCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        tourismService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.query.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: "2",//引擎模板服务taskID
                    taskName: "12301旅游投诉验证短信验证码",//服务名称
                    params: {//请求参数
                        phone: req.body.phone,
                        captcha: req.body.captcha,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//12301旅游投诉上传附件
// const uploadFile = (req, res, next) => {
//     util.parsePostBody(req, (body) => {
//         const code = body.toString();
//         const params = JSON.parse(code);
//         if (util.isEmptyValue("tourismCon.uploadFile", params)) {
//             res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
//         } else {
//             tourismService.uploadFile(params, (err, body) => {
//                 if (err) {
//                     return next(err)
//                 }
//                 res.send(body);
//             })
//         }
//     })
// };
//上传文件
const uploadFile = (req, res, next) => {
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
                res.send({ossList: results, deleteFolder: filePath});
                util.deleteFolder(filePath)
            }).catch(err => {
                console.log(err)
            })
        })
};
const getFileList = async (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "6",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        ossList: req.body.ossList
    };
    if (util.isEmptyValue("tourismCon.getFileList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        let fileList = [], filePath = "";
        Promise.all(params.ossList.map(item => {
            let data = {
                sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
                taskId: params.taskId,
                serviceId: templateID,
                files: item
            };
            return new Promise((resolve, reject) => {
                tourismService.postData(data).then(itemRes => {
                    if (itemRes.retCode == "000000" && itemRes.responseBody.ok) {
                        var fileItem;
                        for (var key in itemRes.responseBody.tmpFileIds) {
                            fileItem = {
                                isImg: true,
                                src: itemRes.responseBody.tmpFileIds[key].url,
                                filename: itemRes.responseBody.tmpFileIds[key].name,
                                serverurl: itemRes.responseBody.tmpFileIds[key].id
                            }
                        }
                        fileList.push(fileItem);
                        filePath += item + ",";
                    }
                    resolve();
                })
            })
        })).then(function () {
            res.send({
                fileList: fileList,
                filePath: filePath
            })
        });
        // try {
        //     for (let i = 0; i < params.ossList.length; i++) {
        //         let item = params.ossList[i];
        //         var data = {
        //             sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        //             taskId: params.taskId,
        //             serviceId: templateID,
        //             files: item
        //         }
        //         var itemRes = await tourismService.postData(data);
        //         if (itemRes.retCode == "000000" && itemRes.responseBody.ok) {
        //             var fileItem;
        //             for(var key in itemRes.responseBody.tmpFileIds){
        //                 fileItem = {
        //                     isImg: true,
        //                     src: itemRes.responseBody.tmpFileIds[key].url,
        //                     filename: itemRes.responseBody.tmpFileIds[key].name,
        //                     serverurl: itemRes.responseBody.tmpFileIds[key].id,
        //                 }
        //             }
        //             fileList.push(fileItem);
        //             filePath += item + ","
        //         }
        //     }
        //     res.send({
        //         fileList: fileList,
        //         filePath: filePath
        //     });
        // } catch (err) {
        //     res.send(err);
        // }
    }
}
//12301旅游投诉提交投诉信息
const submitInfo = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "3",
        serviceId: templateID,
        name: req.body.name,
        ts_fact: req.body.complaints,
        sex: req.body.sex,
        unitname: req.body.respondent,
        captcha: req.body.verifycode,
        phone: req.body.phone,
        files: req.body.files,
        attachment: req.body.attachment,
        randomKey: req.body.randomKey,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y
    };
    if (util.isEmptyValue("tourismCon.submitInfo", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        tourismService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: "3",//引擎模板服务taskID
                    taskName: "12301旅游投诉提交投诉信息",//服务名称
                    params: {//请求参数
                        name: req.body.name,
                        ts_fact: req.body.complaints,
                        sex: req.body.sex,
                        unitname: req.body.respondent,
                        captcha: req.body.verifycode,
                        phone: req.body.phone,
                        files: req.body.files,
                        attachment: req.body.attachment,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//12301旅游投诉查询投诉信息
const findInfo = (req, res, next) => {
    const params = {
        sessionId: req.query.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "4",
        serviceId: templateID,
        phone: req.query.phone,
        captcha: req.query.verifycode,
        randomKey: req.query.randomKey,
        userID: req.query.userID,
        clientID: req.query.clientID,
        cityID: req.query.cityID,
        local_x: req.query.local_x,
        local_y: req.query.local_y
    };
    if (util.isEmptyValue("tourismCon.findInfo", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        tourismService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.query.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: "tourism",//引擎模板服务ID
                    taskId: "4",//引擎模板服务taskID
                    taskName: "12301旅游投诉提交投诉信息",//服务名称
                    params: {//请求参数
                        phone: req.query.phone,
                        captcha: req.query.verifycode,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//get方式跳转页面
tourismCon.page = (req, res) => {
    const url = urlParse.parse(req.url).pathname, renderName = url.replace("/", "");
    if (req.method === "get" || req.method === "GET") {
        const {randomKey, userID, clientID, cityID, local_x, local_y} = req.query;
        cityDAO.get(cityID, (err, cityInfo) => {
            res.render(path + renderName, {randomKey, cityID, userID, clientID, local_x, local_y, cityInfo});
        })
    } else {
        let data;
        if (req.body.data) {
            data = JSON.parse(tools.decrypt(req.body.data));
        } else {
            data = req.body;
        }
        const randomKey = Math.random().toString(36).substr(2),
            vDate = data.vDate,
            userID = data.info.userID,
            tel = data.info.tel,
            clientID = data.info.clientID,
            cityID = data.local.cityNum,
            local_x = data.local.local_x,
            local_y = data.local.local_y,
            timestamp = Date.parse(new Date());
        if (timestamp > vDate) {
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
            res.end("该请求已经超过有效期！");
        } else {
            cityDAO.get(cityID, (err, cityInfo) => {
                res.render(path + renderName, {
                    cityInfo: cityInfo, randomKey, cityID, userID, clientID, local_x, local_y
                });
            })
        }
    }
};
exports.tourismCon = tourismCon;