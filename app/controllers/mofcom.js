const urlParse = require('url'),
    util = require('../../lib/util').util,
    userLogDAO = require('../dao/userLog').userLogDAO,
    mofcomService = require("../logics/mofcom").mofcomService;
let mofcomCon = {};
const serviceID = "YAA0001", templateID = "BusinessRegulations";

mofcomCon.getCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("商务法规查询请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};

const search = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        serviceId: templateID,
        taskId: "1",
        randomKey: req.body.randomKey,
        userID: req.body.userID,
        clientID: req.body.clientID,
        cityID: req.body.cityID,
        local_x: req.body.local_x,
        local_y: req.body.local_y,
        keyword: req.body.keyword
    };
    if (util.isEmptyValue("mofcomCon.search", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        mofcomService.postData(params).then((content) => {
            res.send(content);
            var logData = {
                localFrom: req.body.localFrom,//项目用户名称
                clientID: params.clientID,//用户设备ID
                serviceID: serviceID,//前台服务ID
                templateID: templateID,//引擎模板服务ID
                taskId: params.taskId,//引擎模板服务taskID
                taskName: "商务法规查询",//服务名称
                params: {//请求参数
                    keyword: req.body.keyword
                },
                results: JSON.stringify(content)//返回结果
            };
            userLogDAO.add(logData);
        }).catch((err) => {
            res.send(err);
        })
    }
};
exports.mofcomCon = mofcomCon;