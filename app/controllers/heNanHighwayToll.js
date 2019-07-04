const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    http = require('http'),
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    heNanHighwayTollService = require("../logics/heNanHighwayToll").heNanHighwayTollService;
const path = "heNanHighwayTolls/", serviceID = "AAD0002";
let heNanHighwayTollCon = {};

heNanHighwayTollCon.getCon = (req, res, next) => {
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
const pageCon = (req, res, next) => {
    const renderName = req.query.page;
    console.log("河南省高速公路通行费查询renderName: " + renderName);
    const cityID = req.query.cityID;
    cityDAO.get(cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
}
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("河南省高速公路通行费查询请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
}

const search = (req, res, next) => {
    const params = {
        serviceId: "highway",
        taskId: "3",
        sessionId: req.body.randomKey,
        enterStation: req.body.enterStation,
        exitStation: req.body.exitStation,
        vehicleType: req.body.vehicleType,
        randomKey: req.body.randomKey,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y,
        datas: req.body.datas
    };
    if (util.isEmptyValue("heNanHighwayToll.search", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        heNanHighwayTollService.allHighway(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    res.send(results);
                } else {
                    res.send({err: "fail"});
                }
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "河南省高速公路通行费查询",//服务名称
                    params: {//请求参数
                        enterStation: req.body.enterStation,
                        exitStation: req.body.exitStation,
                        vehicleType: req.body.vehicleType,
                        datas: req.body.datas
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//
// //获取验证码
// const verifycode = (req, res, next) => {
//     const params = {
//         serviceId:"highway",
//         taskId:"1",
//         sessionId: req.query.randomKey
//
//     };
//     if (util.isEmptyValue("heNanHighwayToll.verifycode", params)) {
//         res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
//     } else {
//         heNanHighwayTollService.allHighway(params)
//             .then((results) => {
//                 if(results.retCode == "000000"){
//                     readRemoteFile(results.responseBody.data, function (err, buffer) {
//                         if (err) throw err;
//                         res.send(buffer);
//                     });
//                 }else{
//                     res.send("/images/refreshCode.png");
//                 }
//             }).catch((err) => {
//             res.send(err);
//         });
//     }
// };
//
// function readRemoteFile (url, cb) {
//     var callback = function () {
//         // 回调函数，避免重复调用
//         callback = function () {};
//         cb.apply(null, arguments);
//     };
//
//     var req = http.get(url, function (res) {
//         var b = [];
//         res.on('data', function (c) {
//             b.push(c);
//         });
//         res.on('end', function () {
//             callback(null, Buffer.concat(b));
//         });
//         res.on('error', callback);
//     });
//     req.on('error', callback);
// }
exports.heNanHighwayTollCon = heNanHighwayTollCon;