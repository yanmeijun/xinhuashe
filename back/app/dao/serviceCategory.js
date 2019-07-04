const monk = require("monk"),
    config = require('../../config/config'),
    DB = monk(config.db.url, config.db.options),
    log4js = require('../util/log4j');
const table = "serviceCategory";
let serviceCategoryDAO = {};
//添加服务类别
serviceCategoryDAO.add = async(conditions) => {
    try {
        return await DB.get(table).insert(conditions);
    } catch (e) {
        log4js.error(e);
        throw new Error("添加服务类别失败");
    }
};
//修改服务类别
serviceCategoryDAO.modify = async(query, modifyFields) => {
    try {
        return await DB.get(table).update(query, {$set: modifyFields})
    } catch (e) {
        log4js.error(e);
        throw new Error("修改服务类别失败");
    }
};
//获取服务类别列表
serviceCategoryDAO.get = async(query, options) => {
    try {
        let dataList = await DB.get(table).find(query, options);
        let dataCount = await DB.get(table).count(query);
        
        return {dataList: dataList, dataCount: dataCount};
    } catch (e) {
        log4js.error(e);
        throw new Error("获取服务类别列表失败")
    }
};
//删除服务类别
serviceCategoryDAO.delete = async(query) => {
    try {
        return await DB.get(table).remove(query);
    } catch (e) {
        log4js.error(e);
        throw new Error("删除服务类别失败");
    }
};
exports.serviceCategoryDAO = serviceCategoryDAO;