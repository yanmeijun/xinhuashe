const urlParse = require('url'),
    _ = require('underscore'),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    nationalMedicalService = require("../logics/nationalMedical").nationalMedicalService;
const path = "nationalMedical/", serviceID = 'DAB0003';
let nationalMedicalCon = {};

nationalMedicalCon.getCon = (req, res, next) => {
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
    console.log("全国医疗机构查询地址renderName: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("全国医疗机构查询地址请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};

//全国医疗机构查询获取验证码
const getVeryCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "1",
        serviceId: "yiLiaoJiGou",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("nationalMedicalCon.nationalMedicalSearch", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        nationalMedicalService.nationalMedical(params)
            .then((results) => {
                // if(results.retCode == "000000"){
                //     res.send("http://47.96.254.45/service/" + results.responseBody.data);
                // }else{
                //     res.send(results);
                // }
                res.send(results);
                //res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "全国医疗机构查询获取验证码",//服务名称
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
//全国医疗机构查询地址查询
const nationalMedicalSearch = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "3",
        serviceId: "yiLiaoJiGou",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("nationalMedicalCon.nationalMedicalSearch", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        params.Prov = req.body.Prov;//所在省份编码
        params.Unit_Name = req.body.Unit_Name;//医疗机构名称
        params.Check_Code = req.body.Check_Code;//验证码（从上一步获取）
        nationalMedicalService.nationalMedical(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "全国医疗机构查询地址查询",//服务名称
                    params: {//请求参数
                        Prov: req.body.Prov,
                        Unit_Name: req.body.Unit_Name,
                        Check_Code: req.body.Check_Code,
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
exports.nationalMedicalCon = nationalMedicalCon;