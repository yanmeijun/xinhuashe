const monk = require('monk'),
    moment = require('moment'),
    config = require('../../config/config'),
    DB = monk(config.db.url, config.db.options),
    log4js = require('../util/log4j');
const table = "originMonitor";
let originDAO = {};

//根据查找条件获取数据，并进行排序
originDAO.get = async (query, options) => {
    try {
        let dataList = await DB.get(table).find(query, options);
        let dataCount = await DB.get(table).count(query);
        return {dataList: dataList, dataCount: dataCount};
    } catch (e) {
        log4js.error(e);
        return null;
    }
};
//查找单条数据
originDAO.getOne = async (query) => {
    try {
        let results = await DB.get(table).findOne(query);
        return results;
    } catch (e) {
        log4js.error(e);
        return null;
    }
};
//单条数据插入
originDAO.add = async (conditions) => {
    let insertData = {
        // originID: conditions.originID || util.md5(conditions.userID + conditions.originUrl),
        userID: conditions.userID,
        originName: conditions.originName,
        originUrl: conditions.originUrl,
        createDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        startDate: moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
        statusCode: 1,
        type: conditions.type,
        monitorFreq: conditions.monitorFreq,
        alarmFreq: conditions.alarmFreq,
        domain: conditions.domain,
        isStart: conditions.isStart || false,
        nextTime: new Date().getHours() + 1 >= 24 ? 0 : new Date().getHours() + 1
    };
    try {
        return await DB.get(table).insert(insertData);
    } catch (e) {
        log4js.error(e);
        return null;
    }
};
//删除数据
originDAO.delete = async (query) => {
    try {
        return await DB.get(table).remove(query);
    } catch (e) {
        log4js.error(e);
        return null;
    }
};
//单条数据修改
originDAO.modify = async (query, modifyFields) => {
    try {
        return await DB.get(table).update(query, {$set: modifyFields});
    } catch (e) {
        log4js.error(e);
        return null;
    }
};
//批量修改数据
originDAO.batchUpdate = async (dataList) => {
    try {
        await DB.get(table).bulkWrite(dataList);
        DB.close();
    } catch (e) {
        log4js.error(e);
    }
}
//查询符合条件的记录，返回为list
originDAO.findAll = async (query) => {
    try {
        const listData = await DB.get(table).find(query);
        DB.close();
        return listData;
    } catch (err) {
        log4js.error(err);
    }
}
exports.originDAO = originDAO;