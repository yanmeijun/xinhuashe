const urlParse = require('url'),
    _ = require('underscore'),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    creditService = require("../logics/credit").creditService;
const path = "credit/";
let creditCon = {};

creditCon.getCon = (req, res, next) => {
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
    console.log("统一信用renderName: " + renderName);
    const cityID = req.query.cityID;
    cityDAO.get(cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("统一信用请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
/**********************************企业异常服务类别新接口 start***********************************/
const getProblemEntLists = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "2",
        serviceId: "creditableChina",
        page: req.body.pageNum,  //页数
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("creditCon.getProblemEntLists", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}})
    } else {
        params.keyword = req.body.keyword;//关键字
        creditService.allProblemEntList(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: "XAA0002",//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "企业经营异常名录查询",//服务名称
                    params: {//请求参数
                        page: req.body.pageNum,  //页数
                        keyword: req.body.keyword  //关键字
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
/******************************企业异常服务类别新接口 end**********************************/

/******************************企业经营异常名录查询详情 start***********************************/
const getProblemEntDetails = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "3",
        serviceId: "creditableChina",
        name: req.body.name,  //页数
        encryStr: req.body.encryStr,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("creditCon.getProblemEntDetails", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}})
    } else {
        creditService.allProblemEntList(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: "XAA0002",//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "企业经营异常名录查询企业详情",//服务名称
                    params: {//请求参数
                        name: req.body.name,  //页数
                        encryStr: req.body.encryStr
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
/******************************企业经营异常名录查询详情 end**********************************/

/******************************失信被执行人查询列表 start**********************************/
const getDishonestyLists = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "1",
        serviceId: "sxbzxrcx",
        keyword: req.body.keyword,//关键字
        page: req.body.pageNum,//页码
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("creditCon.getDishonestyLists", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        creditService.allDishonestyList(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,
                    clientID: params.clientID,//用户设备ID
                    serviceID: "XAB0001",//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "失信被执行人查询列表",//服务名称
                    params: {//请求参数
                        keyword: req.body.keyword,//关键字
                        page: req.body.pageNum,//页码
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
/******************************失信被执行人查询列表 end**********************************/

/******************************失信被执行人查询详情 start**********************************/
const getDishonestyDetails = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "2",
        serviceId: "sxbzxrcx",
        name: req.body.name,  //页数
        encryStr: req.body.encryStr,//记录号
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("creditCon.getDishonestyDetails", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        creditService.allDishonestyList(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: "XAB0001",//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "失信被执行人查询详情",//服务名称
                    params: {//请求参数
                        name: req.body.name,  //页数
                        encryStr: req.body.encryStr//记录号
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
/******************************失信被执行人查询详情 end**********************************/

/******************************统一社会信用代码查询列表 start**********************************/
const getCreditLists = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "1",
        serviceId: "creditableChina",
        page: req.body.pageNum,  //页数
        keyword: req.body.keyword,//关键字
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("creditCon.getCreditLists", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}})
    } else {
        creditService.allDishonestyList(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: "XAA0001",//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "统一社会信用代码查询列表",//服务名称
                    params: {//请求参数
                        page: req.body.pageNum,  //页数
                        keyword: req.body.keyword//关键字
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
/******************************统一社会信用代码查询列表 end**********************************/

/******************************重大税收违法案件当事人名单查询列表 start**********************************/
const getTaxIllegalLists = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "1",
        serviceId: "zdsswfaj",
        keyword: req.body.keyword,//关键字
        page: req.body.pageNum,//页码
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("creditCon.getTaxIllegalLists", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        creditService.allDishonestyList(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: "KAB0001",//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "重大税收违法案件当事人名单查询列表",//服务名称
                    params: {//请求参数
                        keyword: req.body.keyword,//关键字
                        page: req.body.pageNum//页码
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
/******************************重大税收违法案件当事人名单查询列表 end**********************************/

/******************************重大税收违法案件当事人名单查询详情 start**********************************/
const getTaxIllegalDetails = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "2",
        serviceId: "zdsswfaj",
        name: req.body.name,  //页数
        encryStr: req.body.encryStr,//记录号
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("creditCon.getTaxIllegalDetails", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        creditService.allDishonestyList(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: "KAB0001",//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "重大税收违法案件当事人名单查询详情",//服务名称
                    params: {//请求参数
                        name: req.body.name,  //页数
                        encryStr: req.body.encryStr,//记录号
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
/******************************重大税收违法案件当事人名单查询详情 end**********************************/

/******************************政府采购严重违法失信名单查询列表 start**********************************/
const getPurchaseIllegalLists = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "1",
        serviceId: "zfcg",
        keyword: req.body.keyword,//关键字
        page: req.body.pageNum,//页码
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("creditCon.getPurchaseIllegalLists", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        creditService.allDishonestyList(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: "XAA0003",//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "政府采购严重违法失信名单查询列表",//服务名称
                    params: {//请求参数
                        keyword: req.body.keyword,//关键字
                        page: req.body.pageNum,//页码
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
/******************************政府采购严重违法失信名单查询列表 end**********************************/

/******************************政府采购严重违法失信名单查询详情 start**********************************/
const getPurchaseIllegalDetails = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "2",
        serviceId: "zfcg",
        name: req.body.name,  //页数
        encryStr: req.body.encryStr,//记录号
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("creditCon.getPurchaseIllegalDetails", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        creditService.allDishonestyList(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: "XAA0003",//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "政府采购严重违法失信名单查询详情",//服务名称
                    params: {//请求参数
                        name: req.body.name,  //页数
                        encryStr: req.body.encryStr,//记录号
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
/******************************政府采购严重违法失信名单查询详情 end**********************************/
exports.creditCon = creditCon;