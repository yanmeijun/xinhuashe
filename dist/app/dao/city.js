const monk = require('monk'),
    _ = require('underscore'),
    config = require('../../config/config'),
    DB = monk(config.db.url, config.db.options),
    log4js = require('../util/log4j');
const table = "city";
let cityDAO = {};
//根据查找条件获取数据，并进行排序
cityDAO.get = async (query,) => {
    try {
        return await DB.get(table).find(query);
    } catch (e) {
        log4js.error(e);
        throw new Error("获取城市失败")
    }
};
exports.cityDAO = cityDAO;