const cityDAO = require('../dao/city').cityDAO,
    _ = require('underscore');
const path = "personalTax/";
let personalTaxCon = {};

personalTaxCon.getCon = (req, res, next) => {
    const renderName = req.query.page;
    console.log("个人所得税计算renderName: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
exports.personalTaxCon = personalTaxCon;