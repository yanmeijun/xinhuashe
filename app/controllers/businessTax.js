const _ = require('underscore'),
    cityDAO = require('../dao/city').cityDAO;
const path = "businessTax/";
let businessTaxCon = {};

businessTaxCon.getCon = (req, res, next) => {
    const renderName = req.query.page;
    console.log("营业税计算renderName: " + renderName);
    const cityID = req.query.cityID;
    cityDAO.get(cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
exports.businessTaxCon = businessTaxCon;
