const monk = require('monk'),
    config = require('../../config/config'),
    DB = monk(config.db.url, config.db.options),
    log4js = require('../util/log4j');
const table = "userService";
const tableService = "userInformation";
let userServiceDAO = {};
//单条数据插入
userServiceDAO.add = async (conditions) => {
    try {
        return await DB.get(table).insert(conditions);
    } catch (e) {
        log4js.error(e);
        throw new Error("添加userService服务列表失败")
    }
};


userServiceDAO.batchUpdate = async (dataList) => {
    try {
        return await DB.get(table).bulkWrite(dataList);
    } catch (e) {
        log4js.error(e);
    }
};
//获取服务列表
userServiceDAO.get = async (query, options) => {
    try {
        let dataList = await DB.get(table).find(query, options);
        let dataCount = await DB.get(table).count(query);

        return {dataList: dataList, dataCount: dataCount};
    } catch (e) {
        log4js.error(e);
        throw new Error("获取userService服务列表失败")
    }
};
//修改服务
userServiceDAO.modify = async (query, modifyFields) => {
    try {
        return await DB.get(table).update(query, {$set: modifyFields})
    } catch (e) {
        log4js.error(e);
        throw new Error("修改userService服务失败");
    }
};
exports.userServiceDAO = userServiceDAO;