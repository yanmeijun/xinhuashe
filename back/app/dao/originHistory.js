const monk = require('monk'),
    log4js = require('../util/log4j'),
    config = require('../../config/config'),
    DB = monk(config.db.url, config.db.options);

const table = "originMonitorHistory";
let originHistoryDAO = {};

originHistoryDAO.batchUpdate = async (dataList) => {
    try {
        await DB.get(table).bulkWrite(dataList);
        DB.close();
    } catch (e) {
        log4js.error(e);
    }
}

exports.originHistoryDAO = originHistoryDAO;