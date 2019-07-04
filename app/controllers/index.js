const fs = require("fs"),
    async = require('async'),
    _ = require('underscore'),
    urlParse = require('url'),
    tools = require('./tools.js'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userServiceDAO = require('../dao/userService').userServiceDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
// userDAO = require('../dao/user').userDAO,
// userLogDAO = require('../dao/userLog').userLogDAO,
    sfCodeDAO = require("../dao/sf").sfCodeDAO;
let indexCon = {};
//获取文件服务器上的验证码
indexCon.getFile = (req, res) => {
    const url = config.get("system.imgUrl") + req.url.split("/service/")[1];
    console.log("获取文件服务器上的验证码地址：" + url);
    util.getData(url, {rejectUnauthorized: false}, (err, body) => {
        if (err) {
            console.error("获取文件服务器上的验证码报错：" + err);
            res.send("/images/refreshCode.png");
        }
        res.send(body);
    });
}
// //频道页get入口
// indexCon.indexPage = (req, res) => {
//     let data = {};
//     data.randomKey = "indexPage_" + Math.random().toString(36).substr(2);
//     data.userID = "0";
//     data.clientID = "0000";
//     data.local_x = "110000";
//     data.local_y = "110000";
//     data.tel = "110000";
//     data.vDate = "2515745339000";
//     data.cityID = req.query.cityID || "110000";
//     data.localFrom = ""
//     cityDAO.get(data.cityID, (err, cityInfo) => {
//         res.render("webIndex", _.extend({
//             cityInfo: cityInfo
//         }, data));
//     })
// }
//微信频道页get入口
indexCon.indexPageWechat = (req, res) => {
    let data = {};
    if(req.query.localFrom == "wx_program"){//判断是否是小程序
        data.randomKey = "wxProgram_" + Math.random().toString(36).substr(2);
        data.userID = req.query.userID;
        data.clientID = req.query.clientID;
        data.local_x = req.query.latitude || "110000";
        data.local_y = req.query.longitude || "110000";
        data.tel = "110000";
        data.localFrom = "ucap_weChat";
    }else{
        data.randomKey = "wechatIndexPage_" + Math.random().toString(36).substr(2);
        data.userID = "0";
        data.clientID = "0000";
        data.local_x = "110000";
        data.local_y = "110000";
        data.tel = "110000";
        data.localFrom = req.query.localFrom || "ucap_weChat";
    }
    data.vDate = "2515745339000";
    if (req.query.cityID) {
        data.cityID = req.query.cityID;
    } else {
        data.cityID = "";
    }
    if (req.query.oldCity) {
        data.oldCity = req.query.oldCity;
    }
    if (req.query.page) {
        let pageName = req.query.page;
        cityDAO.get(data.cityID, (err, cityInfo) => {
            res.render("city/" + pageName, _.extend({
                cityInfo: cityInfo
            }, data));
        })
    } else {
        if (data.cityID) {
            cityDAO.get(data.cityID, (err, cityInfo) => {
                res.render("wechatIndexPage", _.extend({
                    cityInfo: cityInfo
                }, data));
            })
        } else {
            // cityDAO.get(data.cityID, (err, cityInfo) => {
            res.render("wechatIndexPage", _.extend({
                cityInfo: {cityID: "", citySRC: "", cityName: ""}
            }, data));
            // })
        }
    }
}
//暴露给新华社用户的页面跳转
indexCon.render = (req, res) => {
    const url = urlParse.parse(req.url).pathname, renderName = url.replace("/", "");
    console.log("renderName: " + renderName);
    let randomKey, userID, clientID, cityID, local_x, local_y, timestamp, vDate, tel, isAccredit, localFrom;
    if (req.method.toUpperCase() === "GET") {
        randomKey = req.query.randomKey;
        userID = req.query.userID;
        clientID = req.query.clientID;
        cityID = req.query.cityID;
        local_x = req.query.local_x;
        local_y = req.query.local_y;
        localFrom = req.query.localFrom || "xinhuashe_app";
    } else {
        let data;
        if (req.body.data) {
            data = JSON.parse(tools.decrypt(req.body.data));
        } else {
            data = req.body;
        }
        if(_.isEmpty(data)){
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
            res.end("非法的数据请求，请检查数据");
            return;
        }
        tel = data.info.hasOwnProperty('tel') ? data.info.tel : "";
        vDate = data.vDate;
        timestamp = Date.parse(new Date());
        randomKey = renderName + "_" + Math.random().toString(36).substr(2);
        userID = data.info.userID || "0";
        clientID = data.info.clientID;
        cityID = data.local.cityNum;
        local_x = data.local.local_x;
        local_y = data.local.local_y;
        isAccredit = data.isAccredit;
        localFrom = data.localFrom || "xinhuashe_app"
    }
    if (req.method.toUpperCase() === "POST" && timestamp > vDate) {
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        res.end("该请求已经超过有效期！");
    } else {
        let params = {randomKey, userID, clientID, cityID, local_x, local_y, renderName, isAccredit, localFrom};
        if (localFrom == "xinhuashe_app") {//如果入口是新华社app 则须授权
            if (renderName == "indexPage") {
                // if (isAccredit) {
                postRender(req, res, params);
                // }
                // else {
                //     userLoginInfoDAO.get(clientID, '000000', (err, results) => {
                //         if (err) {
                //             res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                //             res.end(err);
                //             return;
                //         }
                //         if (results && results.accredit) {
                //             postRender(req, res, params);
                //         } else {
                //             cityDAO.get(cityID, (err, cityInfo) => {
                //                 if (err) {
                //                     res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                //                     res.end(err);
                //                     return;
                //                 }
                //                 res.render("serviceAuthorization/serviceAuthorization",
                //                     {
                //                         cityInfo: cityInfo,
                //                         randomKey,
                //                         cityID,
                //                         userID,
                //                         clientID,
                //                         local_x,
                //                         local_y,
                //                         tel,
                //                         vDate,
                //                         url: renderName,
                //                         serviceID: '000000',
                //                         localFrom
                //                     });
                //             })
                //         }
                //     })
                // }

            } else {
                userServiceDAO.get({url: params.renderName,localFrom:params.localFrom,online:true}, function (err, serviceInfo) {
                    if (err) {
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                        res.end(err);
                        return;
                    }
                    if (!_.isEmpty(serviceInfo[0])) {
                        userLoginInfoDAO.get(clientID, serviceInfo[0].serviceID, (err, results) => {
                            if (err) {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                                res.end(err);
                                return;
                            }
                            // if (results && results.accredit) {
                            if (results) {
                                postRender(req, res, _.extend(params, {
                                    loginInfo: {
                                        userName: results.userName,
                                        password: results.password,
                                        loginType: results.loginType
                                    }
                                }));
                            } else {
                                postRender(req, res, params);
                                // cityDAO.get(cityID, (err, cityInfo) => {
                                //     if (err) {
                                //         res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                                //         res.end(err);
                                //         return;
                                //     }
                                //     res.render("serviceAuthorization/serviceAuthorization",
                                //         {
                                //             cityInfo: cityInfo,
                                //             randomKey,
                                //             cityID,
                                //             userID,
                                //             clientID,
                                //             local_x,
                                //             local_y,
                                //             tel,
                                //             vDate,
                                //             url: renderName,
                                //             serviceID: serviceInfo[0].serviceID,
                                //             localFrom
                                //         });
                                // })
                            }
                        })
                    } else {
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                        res.end("该服务不存在！");
                        return;
                    }

                })
            }
        } else {
            postRender(req, res, params);
        }
    }
};
const postRender = (req, res, params) => {
    let {randomKey, userID, clientID, cityID, local_x, local_y, renderName, loginInfo, localFrom} = params;
    let conditions;
    if (_.isEmpty(userID) || userID == "0" || userID == 0) {
        conditions = {clientID: clientID}
    } else {
        conditions = {userID: userID}
    }
    let pageName;
    // userDAO.getByConditions(conditions, (err, user) => {
    //     let userInfo = {
    //             licenseNo: "",
    //             fileNo: "",
    //             IDCard: "",
    //             carNum: "",
    //             engineNum: "",
    //             zsbh: "",
    //             userName: '',
    //             mobile: ''
    //         },
    //         pageName;
    //     if (!_.isEmpty(user)) {
    //         userInfo.licenseNo = user.licenseNo || "",
    //             userInfo.fileNo = user.fileNo || "",
    //             userInfo.IDCard = user.IDCard || "",
    //             userInfo.carNum = user.carNum || "",
    //             userInfo.engineNum = user.engineNum || "",
    //             userInfo.zsbh = user.xlCertNumber || "",
    //             userInfo.userName = user.userName || "",
    //             userInfo.mobile = user.mobile || ""
    //     }
    cityDAO.get(cityID, (err, cityInfo) => {
        if(_.isEmpty(cityInfo)){
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
            res.end("该城市区划代码不存在！");
            return;
        }
        if (renderName == "infraction" || renderName == "deduction" || renderName == "carScrapped") {
            // renderBefore(cityID, randomKey, (err, cityInfo) => {
            getSFCode(cityID, (err, sfCode) => {
                if (err) {
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                    res.end(err);
                    return;
                }
                res.render(renderName + "/" + renderName, _.extend({
                    cityInfo: cityInfo,
                    randomKey,
                    cityID,
                    userID,
                    clientID,
                    local_x,
                    local_y,
                    localFrom,
                    sfCode: sfCode,
                }, loginInfo));
            })
        } else {
            if (renderName == "carYaohao") {
                pageName = "caryaohao/" + renderName;
            } else if (renderName == "insuranceLogin") {
                pageName = "insurance/" + renderName;
            } else if (renderName == "indexPage") {
                pageName = renderName;
            } else if (renderName == "seekMedicalAdvice") {
                pageName = "remoteHosp/" + renderName;
            } else if (renderName == "trainYupiao" || renderName == "trainTimetable" || renderName == "trainSellTime" || renderName == "trainLate") {
                pageName = "train/" + renderName;
            } else if (renderName == "code" || renderName == "enterprise" || renderName == "lostTrusteeInquiry"
                || renderName == "taxIllegalInquiry" || renderName == "governmentProcurementInquiry") {
                pageName = "credit/" + renderName;
            } else if (renderName == "unhealthyReportMessage" || renderName == "unhealthySwindlePhone"
                || renderName == "unhealthyHarassPhone" || renderName == "unhealthyWebsite"
                || renderName == "unhealthyPersonInfo" || renderName == "unhealthyMessage") {
                pageName = "unhealthy/" + renderName;
            } else if (renderName == "examResultInquiry" || renderName == "qualificationCertificate") {
                pageName = "teacherQualification/" + renderName;
            } else if (renderName == "scoreSearch" || renderName == "certificateSearch") {
                pageName = "mandarin/" + renderName;
            } else {
                pageName = renderName + "/" + renderName;
            }
            res.render(pageName, _.extend({
                cityInfo: cityInfo, randomKey, cityID, userID, clientID, local_x, local_y, localFrom
            }, loginInfo));
        }
    })
    // })
}
//获取单个服务，链接地址：https://fw.kaipuyun.cn/servicePage?serviceName=deduction&cityID=110000&clientID=123qwe&localFrom=xinhuashe
indexCon.getServicePage = (req, res) => {
    const params = {
        randomKey: "aloneService_" + Math.random().toString(36).substr(2),
        renderName: req.query.serviceName,
        userID: req.query.userID || "00000",
        clientID: req.query.clientID,
        cityID: req.query.cityID,
        local_x: req.query.local_x || "00000",
        local_y: req.query.local_y || "00000",
        localFrom: req.query.localFrom || "xinhuashe_app"
    }
    userServiceDAO.get({url: params.renderName,localFrom:params.localFrom,online:true}, function (err, serviceInfo) {
        if (err) {
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
            res.end(err);
            return;
        }
        if (!_.isEmpty(serviceInfo[0])) {
            userLoginInfoDAO.get(params.clientID, serviceInfo[0].serviceID, (err, result) => {
                if (err) {
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                    res.end(err);
                    return;
                }
                if (result) {
                    postRender(req, res, _.extend(params, {
                        loginInfo: {
                            userName: result.userName,
                            password: result.password,
                            loginType: result.loginType
                        }
                    }));
                } else {
                    postRender(req, res, params);
                }
            })
        } else {
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
            res.end("该服务不存在！");
            return;
        }
    })
}
//get方式跳转页面
indexCon.page = (req, res) => {
    const {randomKey, userID, clientID, cityID, local_x, local_y, localFrom} = req.query;
    const url = urlParse.parse(req.url).pathname;
    if (url == "/") {
        console.log("renderName: index");
        res.render("index");
    } else {
        const renderName = url.replace("/", "");
        console.log("renderName: " + renderName);
        cityDAO.get(cityID, (err, cityInfo) => {
            if (renderName == "infraction" || renderName == "deduction" || renderName == "carScrapped") {
                // renderBefore(cityID, randomKey, (err, cityInfo) => {
                getSFCode(cityID, (err, sfCode) => {
                    const params = {
                        randomKey,
                        cityID,
                        userID,
                        clientID,
                        local_x,
                        local_y,
                        localFrom,
                        sfCode: sfCode,
                        cityInfo: cityInfo
                    };
                    if (err) {
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                        res.end(err);
                        return;
                    }
                    res.render(renderName + "/" + renderName, params);
                })
            } else {
                const params = {randomKey, cityID, userID, clientID, local_x, local_y, cityInfo: cityInfo, localFrom};
                if (url == "/educationInfo") {
                    const phoneCode = req.query.phoneCode;
                    res.render("education/" + renderName, _.extend(params, {phoneCode: phoneCode}));
                } else if (url == "/insuranceList" || url == "/userInfor" || url == "/insuranceMedical" || url == "/insurancePayment") {
                    const IDCard = req.query.IDCard;
                    res.render("insurance/" + renderName, _.extend(params, {IDCard: IDCard}));
                } else if (url == "/train" || url == "/trainTimetable" || url == "/trainYupiao" || url == "/trainSellTime") {
                    res.render("train/" + renderName, params);
                } else if (url == "/timetable" || url == "/stationList") {
                    res.render("train/" + renderName, params);
                    // }else if (url == "/bjGJJ") {
                    //     res.render("bjGJJ/"+renderName, _.extend(params, {cityInfo: {cityName: req.query.cityName,citySRC: citySRC}}));
                } else {
                    // cityDAO.get(cityID, (err, cityInfo) => {
                    if (renderName == "insuranceLogin") {
                        res.render("insurance/" + renderName, params);
                    } else {
                        res.render(renderName + "/" + renderName, params);
                    }
                    // })
                }
            }
        })

    }
};

//同步城市信息
indexCon.cityInfo = (req, res) => {
    const type = req.body.data.type, content = req.body.data.content;
    let success = 0, error = 0, msg = [];
    if (type == "add") {
        async.eachLimit(content, 10, (item, callback) => {
            cityDAO.add(item, (err) => {
                if (err) {
                    error++;
                    msg.push(err);
                } else {
                    success++;
                }
                callback(null);
            });
        }, (err) => {
            res.send({success: success, err: error, msg: msg ? msg : "ok"});
        })

    } else if (type == "modify") {
        async.eachLimit(content, 10, (item, callback) => {
            cityDAO.modify(item.cityID, item, (err) => {
                if (err) {
                    error++;
                    msg.push(err);
                } else {
                    success++;
                }
                callback(null);
            });
        }, (err) => {
            res.send({success: success, err: error, msg: msg ? msg : "ok"});
        })
    } else if (type == "delete") {
        async.eachLimit(content, 10, (item, callback) => {
            cityDAO.delete(item.cityID, (err) => {
                if (err) {
                    error++;
                    msg.push(err);
                } else {
                    success++;
                }
                callback(null);
            }, (err) => {
                res.send({success: success, err: error, msg: msg ? msg : "ok"});
            });
        })
    }
};
//获取服务中返回信息中的照片
indexCon.getIMG = (req, res, next) => {
    // const url = req.query.img ;
    const url = req.url.split("/getIMG?img=")[1];
    console.log("获取服务中返回信息中的照片地址：" + url)
    util.getData(url, {rejectUnauthorized: false}, (err, body) => {
        // console.log(body);
        if (err) {
            console.error("获取服务中返回信息中的照片报错：" + err);
            return next(err)
        }
        res.send(body);
    });
};

//获取学历证书信息中的照片
indexCon.getXlIMG = (req, res, next) => {
    // var url = req.query.img ;
    const url = req.url.replace("/getXlIMG?img=", "");
    util.getData(url, {rejectUnauthorized: false}, (err, body) => {
        if (err) {
            console.log(err);
            return next(err)
        }
        res.send(body);
    });
};
//验证码图片
// indexCon.image = (req, res, next) => {
//     console.log("velidate");
//     const action = req.query.action,
//         randomKey = req.query.randomKey;
//     let url;
//     if (action == "deduction") {//驾照扣分图片验证码
//         // url = apiUrl + "/deductionVeriCode?iw-apikey=" + randomKey + "&iw-cmd=deductionVeriCode";
//         url = `${config.get("api.apiInfo.host_199")}/sbgajtaqzhfwglpt/deductionVeriCode?iw-apikey=${config.get("api.apiInfo.apikey_199")}&iw-cmd=deductionVeriCode&APISession=${randomKey}`;
//     } else if (action == "infraction") {//车辆违章图片验证码
//         // url = apiUrl + "/infractionveriCode?iw-apikey=" + randomKey + "&iw-cmd=infractionveriCode";
//         url = `${config.get("api.apiInfo.host_199")}/sbgajtaqzhfwglpt/infractionveriCode?iw-apikey=${config.get("api.apiInfo.apikey_199")}&iw-cmd=infractionveriCode&APISession=${randomKey}`;
//     } else if (action == "insuranceLogin") {//北京社保图片验证码
//         // url = apiUrl + "/yanzhengma?iw-apikey=" + randomKey + "&iw-cmd=yanzhengma";
//         url = `${config.get("api.apiInfo.host_199")}/sbgajtaqzhfwglpt/yanzhengma?iw-apikey=${config.get("api.apiInfo.apikey_199")}&iw-cmd=yanzhengma&APISession=${randomKey}`;
//     } else if (action == "education") {//学历证书
//         // url = config.get("api.apiInfo.xlUrl") + "/xlverifycode?iw-apikey=" + randomKey + "&iw-cmd=xlverifycode";
//         url = `${config.get("api.apiInfo.host_199")}/xlxwcx/xlverifycode?iw-apikey=${config.get("api.apiInfo.apikey_199")}&iw-cmd=xlverifycode&APISession=${randomKey}`;
//     } else if (action == "bjGJJ") {//北京公积金
//         url = `${config.get("api.apiInfo.host_199")}/bjgrgjjcx/verifyCode?iw-apikey=${config.get("api.apiInfo.apikey_199")}&iw-cmd=verifyCode&APISession=${randomKey}`;
//     } else if (action == "jb12321") {//不良信息举报
//         url = `${config.get("api.apiInfo.host_199")}/wlblyljxxjb/verifycode?iw-apikey=${config.get("api.apiInfo.apikey_199")}&iw-cmd=verifycode&APISession=${randomKey}`;
//     } else if (action == "hospital") {//医院挂号
//         url = `${config.get("api.apiInfo.host_199")}/bjsyyghtypt/addPyzm?iw-apikey=${config.get("api.apiInfo.apikey_199")}&iw-cmd=addPyzm&APISession=${randomKey}`;
//     } else if (action == "degree") {//学位查询
//         url = `${config.get("api.apiInfo.host_199")}/xlxwcx/xwverifycode?iw-apikey=${config.get("api.apiInfo.apikey_199")}&iw-cmd=xwverifycode&APISession=${randomKey}`;
//     } else if (action == "mandarin") {//普通话查询
//         url = `${config.get("api.apiInfo.host_199")}/qgpthkscjyzscx/zsVerificode?iw-apikey=${config.get("api.apiInfo.apikey_199")}&iw-cmd=zsVerificode&APISession=${randomKey}`;
//     } else if (action == "teacherScore") {//中小学教师资格证考试成绩查询
//         url = `${config.get("api.apiInfo.host_199")}/qgpthkscjyzscx/ExamResultsVerifycode?iw-apikey=${config.get("api.apiInfo.apikey_199")}&iw-cmd=ExamResultsVerifycode&APISession=${randomKey}`;
//     } else if (action == "teacherQualification") {//中小学教师资格证合格证明查询
//         url = `${config.get("api.apiInfo.host_199")}/qgpthkscjyzscx/kaoshihegezhengmingyanzhengma?iw-apikey=${config.get("api.apiInfo.apikey_199")}&iw-cmd=kaoshihegezhengmingyanzhengma&APISession=${randomKey}`;
//     } else if (action == "museum") {//国家博物馆网上预约信息查询
//         url = `${config.get("api.apiInfo.host_199")}/qgjsjdjkscjcxgjbwg/chnmuseum_code?iw-apikey=${config.get("api.apiInfo.apikey_199")}&iw-cmd=chnmuseum_code&APISession=${randomKey}`;
//     } else if (action == "ncre") {//国家博物馆网上预约信息查询
//         url = `${config.get("api.apiInfo.host_199")}/qgjsjdjkscjcxgjbwg/verifycode?iw-apikey=${config.get("api.apiInfo.apikey_199")}&iw-cmd=verifycode&APISession=${randomKey}`;
//     } else if (action == "heNanLogin") {//河南预约挂号登陆验证码
//         url = `${config.get("api.apiInfo.host_199")}/qgjsjdjkscjcxgjbwg/verifycode?iw-apikey=${config.get("api.apiInfo.apikey_199")}&iw-cmd=verifycode&APISession=${randomKey}`;
//     }
//
//     console.log("image:" + url);
//     if (!_.isEmpty(url)) {
//         util.getData(url, {rejectUnauthorized: false}, (err, body) => {
//             if (err) {
//                 console.log(err);
//                 return next(err)
//             }
//             if (body.length > 0) {
//                 res.send(body);
//             } else {
//                 fs.readFile("public/images/refreshCode.png", (err, buffer) => {
//                     res.send(buffer);
//                 });
//             }
//         });
//     } else {
//         res.send(null);
//     }
//
// };

// function renderBefore(cityID, randomKey, cb) {
//     async.waterfall([(callback) => {
//         cityDAO.get(cityID, (err, cityInfo) => {
//             callback(err, cityInfo)
//         })
//     }, (cityInfo, callback) => {
//         let cityName = cityInfo.cityName;
//         if (cityName.length == 1) {
//             callback(null, null, cityInfo)
//         } else {
//             cityName = cityName.replace(cityName[cityName.length - 1], "");
//             sfCodeDAO.findRegExp(cityName, (err, sf) => {
//                 callback(err, sf, cityInfo)
//             })
//         }
//     }, (sf, cityInfo, callback) => {
//         if (_.isEmpty(sf)) {
//             const cityID = cityInfo.cityID;
//             const cityNum = cityID[0] + cityID[1] + "0000";
//             cityDAO.get(cityNum, (err, _cityInfo) => {
//                 let _cityName = _cityInfo.cityName;
//                 // _cityName = _cityName.replace(_cityName[_cityName.length - 1], "")
//                 _cityName = _cityName[0] + _cityName[1];
//                 sfCodeDAO.findRegExp(_cityName, (err, _sf) => {
//                     if (_.isEmpty(_sf)) {
//                         return cb("该城市暂时没有此服务");
//                     }
//                     callback(err, _sf.sfCode, cityInfo);
//                 })
//             })
//         } else {
//             callback(null, sf.sfCode, cityInfo)
//         }
//     }], (err, sfCode, cityInfo) => {
//         // const url = config.get("api.apiInfo.url") + "/deductionBefore?iw-apikey=" + randomKey + "&iw-cmd=deductionBefore&sfCode=" + sfCode;
//         const url = `${config.get("api.apiInfo.host_199")}/sbgajtaqzhfwglpt/deductionBefore?iw-apikey=${config.get("api.apiInfo.apikey_199")}&iw-cmd=deductionBefore&sfCode=${sfCode}&APISession=${randomKey}`;
//         console.log("renderBefore:" + url);
//         util.getData(url, {rejectUnauthorized: false}, (err, body) => {
//             return cb(null, cityInfo);
//         })
//     });
// }

const getSFCode = (cityID, cb) => {
    if (!cityID) {
        return cb("城市地址为空！");
    }
    async.waterfall([(callback) => {
        cityDAO.get(cityID, (err, cityInfo) => {
            callback(err, cityInfo)
        })
    }, (cityInfo, callback) => {
        let cityName = cityInfo.cityName;
        if (cityName.length == 1) {
            callback(null, null, cityInfo)
        } else {
            cityName = cityName.replace(cityName[cityName.length - 1], "");
            sfCodeDAO.findRegExp(cityName, (err, sf) => {
                callback(err, sf, cityInfo)
            })
        }
    }, (sf, cityInfo, callback) => {
        if (_.isEmpty(sf)) {
            const cityID = cityInfo.cityID;
            const cityNum = cityID[0] + cityID[1] + "0000";
            cityDAO.get(cityNum, (err, _cityInfo) => {
                let _cityName = _cityInfo.cityName;
                // _cityName = _cityName.replace(_cityName[_cityName.length - 1], "")
                if (_cityName.indexOf("椰") > -1) {
                    _cityName = "海南"
                } else {
                    _cityName = _cityName[0] + _cityName[1];
                }
                sfCodeDAO.findRegExp(_cityName, (err, _sf) => {
                    if (_.isEmpty(_sf)) {
                        callback("该城市暂时没有此服务");
                    }
                    callback(err, _sf.sfCode);
                })
            })
        } else {
            callback(null, sf.sfCode)
        }
    }], (err, sfCode) => {
        return cb(err, sfCode);
    })
};

exports.indexCon = indexCon;
