const urlParse = require('url'),
    _ = require('underscore'),
    cityDAO = require('../dao/city').cityDAO,
    util = require('../../lib/util').util;
const path = "pointsSettled/";
let pointsSettledCon = {};

pointsSettledCon.getCon = (req, res, next) => {
    if (req.method.toUpperCase() === "GET") {
        if (_.isEmpty(req.query.page)) {
            apiCon(req, res, next)
        } else {
            pageCon(req, res, next)
        }
    } else {
        //apiCon(req, res, next);
        pageCons(req, res, next)
    }
};
//页面跳转方法
const pageCon = (req, res, next) => {
    const renderName = req.query.page;
    console.log("北京积分入户renderName: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};

//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("北京积分入户请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};


const pageCons = (req, res, next) => {
    const renderName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("北京积分入户renderName: " + renderName);
    const {randomKey, userID, clientID, cityID, local_x, local_y} = req.body;
    cityDAO.get(req.body.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.body, {cityInfo: cityInfo}));
    })
};

exports.pointsSettledCon = pointsSettledCon;