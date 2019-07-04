const monk = require('monk'),
    _ = require('underscore'),
    config = require('../../config/config'),
    DB = monk(config.db.url, config.db.options),
    log4js = require('../util/log4j');
const table = "service";
let serviceDAO = {};
//根据查找条件获取数据，并进行排序
serviceDAO.getAllService = async (query, options) => {
    try {
        query=_.extend(query,{"online":true});
        let dataList = await DB.get(table).find(query, options);
        let dataCount = await DB.get(table).count(query);
        return {dataList: dataList, dataCount: dataCount};
    } catch (e) {
        log4js.error(e);
        throw new Error("获取服务列表失败")
    }
};

//根据查找条件获取单个服务详情
serviceDAO.getService = async (query) => {
    try {
        query=_.extend(query,{"online":true});
        return await DB.get(table).findOne(query);
    } catch (e) {
        log4js.error(e);
        throw new Error("获取单个服务信息失败")
    }
};
exports.serviceDAO = serviceDAO;