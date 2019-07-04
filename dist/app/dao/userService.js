const _ = require('underscore'),
    monk = require('monk'),
    moment = require('moment'),
    config = require('../../config/config'),
    DB = monk(config.db.url, config.db.options),
    log4js = require('../util/log4j');
const table = "userService";
let userServiceDAO = {};

userServiceDAO.get = async (query, options) =>{
    try {
        let dataList = await DB.get(table).find(query, options);
        let dataCount = await DB.get(table).count(query);
        return {dataList: dataList, dataCount: dataCount};
    } catch (e) {
        log4js.error(e);
        throw new Error("获取用户服务列表失败")
    }
};
userServiceDAO.modify = async (query, modifyFields) =>{
    try {
        return await DB.get(table).update(query, {$set: modifyFields});
    } catch (e) {
        log4js.error(e);
        throw new Error("修改服务失败")
    }
};
exports.userServiceDAO = userServiceDAO;