const urlParse = require('url'),
    _ = require('underscore'),
    util = require('../../lib/util').util,
    userLogDAO = require('../dao/userLog').userLogDAO,
    QhPassengerTransportService = require("../logics/QhPassengerTransport").QhPassengerTransportService;
const path = "QhPassengerTransport/", serviceID = 'AAD0001';
let QhPassengerTransportCon = {};

QhPassengerTransportCon.getCon = (req, res, next) => {
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
    console.log("青海省客运班线信息查询: " + renderName);
    res.render(path + renderName, req.query);
}
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("青海省客运班线信息查询请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
}
//青海省客运班线信息查询
const search = (req, res, next) => {
    const params = {
        serviceId: "kyTraffic",
        taskId: "1",
        sessionId: req.body.randomKey,
        randomKey: req.body.randomKey,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y,
        currentpage: req.body.currentpage,
        pagesize: req.body.pagesize,
        startstation: req.body.startstation,
        endstation: req.body.endstation,
        model: req.body.model
    };
    if (util.isEmptyValue("QhPassengerTransportCon.search", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        QhPassengerTransportService.allPassenger(params)
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
                    taskName: "青海省客运班线信息查询",//服务名称
                    params: {//请求参数
                        currentpage: req.body.currentpage,
                        pagesize: req.body.pagesize,
                        startstation: req.body.startstation,
                        endstation: req.body.endstation,
                        model: req.body.model
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
exports.QhPassengerTransportCon = QhPassengerTransportCon;