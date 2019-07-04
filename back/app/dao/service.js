const monk = require('monk'),
    config = require('../../config/config'),
    DB = monk(config.db.url, config.db.options),
    log4js = require('../util/log4j');
const table = "service";
let serviceDAO = {};
//单条数据插入
serviceDAO.add = async(conditions) => {
    try {
        return await DB.get(table).insert(conditions);
    } catch (e) {
        log4js.error(e);
        throw new Error("添加service服务失败")
    }
};
serviceDAO.get = async(query) => {
    try {
        let dataList = await DB.get(table).find(query);
        return dataList;
    } catch (e) {
        log4js.error(e);
        throw new Error("获取service服务失败")
    }
};
//获取服务列表
serviceDAO.getList = async(query, options) => {
    try {
        let dataList = await DB.get(table).find(query, options);
        let dataCount = await DB.get(table).count(query);

        return {dataList: dataList, dataCount: dataCount};
    } catch (e) {
        log4js.error(e);
        throw new Error("获取service服务列表失败")
    }
};
//修改服务
serviceDAO.modify = async(query, modifyFields) => {
    try {
        return await DB.get(table).update(query, {$set: modifyFields})
    } catch (e) {
        log4js.error(e);
        throw new Error("修改service服务失败");
    }
};
exports.serviceDAO = serviceDAO;