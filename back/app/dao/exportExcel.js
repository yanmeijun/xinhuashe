const _ = require('underscore'),
    monk = require('monk'),
    log4js = require('../util/log4j'),
    config = require('../../config/config'),
    DB = monk(config.db.url, config.db.options);
const tableP = "procure";
const tableS = "service";
let exportExcelDAO = {};

//查询所有采购信息，并与服务信息合并
exportExcelDAO.findProcureAll = async (query,sort) => {
    console.log(query);
    let options  = {};
    if (!_.isEmpty(sort)) {
        options = _.extend(options, {"sort": sort});
    }
    try {
        const procureData = await DB.get(tableP).find(query, options);
        const serviceData = await DB.get(tableS).find({});
        procureData.forEach(item=>{
            let f=serviceData.find(data=>{
                return data.serviceID===item.serviceID;
            });
            Object.assign(item,f);
        });
        let count=procureData.length;
        return procureData;
    } catch (err) {
        log4js.error(err);
        return null;
    }
}


exports.exportExcelDAO = exportExcelDAO;