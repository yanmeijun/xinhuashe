const _ = require('underscore'),
    monk = require('monk'),
    log4js = require('../util/log4j'),
    config = require('../../config/config'),
    DB = monk(config.db.url, config.db.options);

const table = "tmpMonitorHistory";
let tmpMonitorHistoryDAO = {};

tmpMonitorHistoryDAO.batchUpdate = async (dataList) => {
    try {
        await DB.get(table).bulkWrite(dataList);
        DB.close();
    } catch (e) {
        log4js.error(e);
    }
}

exports.tmpMonitorHistoryDAO = tmpMonitorHistoryDAO;