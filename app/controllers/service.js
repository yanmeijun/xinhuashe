const config = require("../../config"),
    util = require('../../lib/util').util,
    serviceLogic = require('../logics/service').serviceLogic;
let serviceCon = {};
//城市服务列表查询（新华社首页显示用）
serviceCon.serviceList = (req, res) => {
    const params = {
        cityID: req.query.cityNum,
        localFrom: req.query.localFrom || "xinhuashe_app"
        // getNum: "all"
    };
    console.log("serviceCon.serviceList:" + params.cityID);
    serviceLogic.getServiceList_new(params).then((results) => {
        // serviceLogic.getServiceList_old(params).then((results) => {
        res.send(results);
    }).catch((err) => {
        res.send(err);
    })
};
//城市服务列表查询（频道页显示用）
serviceCon.getAllService = (req, res) => {
    const params = {
        cityID: req.query.cityID,
        localFrom: req.query.localFrom || "xinhuashe_app",
        getNum: "all"
    };
    console.log("serviceCon.getAllService:" + params.cityID);
    serviceLogic.getServiceList_new(params)
        .then((results) => {
            res.send(results);
        }).catch((err) => {
        res.send(err);
    });
};
exports.serviceCon = serviceCon;