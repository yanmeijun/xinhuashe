const urlParse = require('url'),
    _ = require('underscore'),
    cityDAO = require('../dao/city').cityDAO,
    util = require('../../lib/util').util;
const path = "propertyTax/";
let propertyTaxCon = {};

propertyTaxCon.getCon = (req, res, next) => {
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
    console.log("房产税计算: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
}
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("房产税计算请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
}
exports.propertyTaxCon = propertyTaxCon;