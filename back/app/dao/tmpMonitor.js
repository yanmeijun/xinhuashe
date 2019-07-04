const _ = require('underscore'),
    monk = require('monk'),
    config = require('../../config/config'),
    DB = monk(config.db.url, config.db.options),
    log4js = require('../util/log4j');
const table = "tmpMonitor";
let tmpMonitorDAO = {};

tmpMonitorDAO.getOne = async (query) =>{
    try {
        return await DB.get(table).findOne(query);
    } catch (e) {
        log4js.error(e);
        throw new Error("获取服务监控列表失败")
    }
};

exports.tmpMonitorDAO = tmpMonitorDAO;