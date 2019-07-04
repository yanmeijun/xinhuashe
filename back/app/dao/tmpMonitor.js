const _ = require('underscore'),
    monk = require('monk'),
    moment = require('moment'),
    config = require('../../config/config'),
    DB = monk(config.db.url, config.db.options),
    log4js = require('../util/log4j');
const table = "tmpMonitor";
let tmpMonitorDAO = {};
/*
*查找所有的模板信息
*/
tmpMonitorDAO.lookUp = async (query) =>{
    try {
        return await DB.get("template").find(query);
    } catch (e) {
        log4js.error(e);
        return null;
    }
};
/*
*存入模板监控信息表
*/
tmpMonitorDAO.add = async (conditions) => {
    let insertData = {
        templateID:conditions.templateID,
        userID: conditions.userID,
        templateName: conditions.templateName,
        createDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        startDate: moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
        statusCode: "0",
        type: conditions.type,//监控类别
        monitorFreq: conditions.monitorFreq,//监控频率(时间间隔)
        alarmFreq: conditions.alarmFreq,//报警频率(时间间隔，单位为分钟)
        domain: conditions.domain,
        isStart: conditions.isStart || false, //是否启用
        nextTime: new Date().getHours() + 1 >= 24 ? 0 : new Date().getHours() + 1 //下次执行时间（只存小时）
    };
    try{
        return await DB.get(table).insert(insertData);
    }catch (e){
        log4js.error(e);
        return null;
    }
    DB.close();
};
/*
*获取服务监控列表
*/
tmpMonitorDAO.lookTemplate = async (query, options) =>{
    try {
        let dataList = await DB.get(table).find(query, options);
        let dataCount = await DB.get(table).count(query);
        return {dataList: dataList, dataCount: dataCount};
    } catch (e) {
        log4js.error(e);
        return null;
    }
};
tmpMonitorDAO.delete = async (query) => {
    try {
        return await DB.get(table).remove(query);
    } catch (e) {
        log4js.error(e);
        return null;
    }
};
tmpMonitorDAO.getOne = async (query) => {
    try {
        let results = await DB.get(table).findOne(query);
        return results;
    } catch (e) {
        log4js.error(e);
        return null;
    }
};


//批量修改数据，用于监控任务
tmpMonitorDAO.batchUpdate = async (dataList) => {
    try {
        await DB.get(table).bulkWrite(dataList);
        DB.close();
    } catch (e) {
        log4js.error(e);
    }
}
//查询符合条件的记录，返回为list
tmpMonitorDAO.findAll = async (query) => {
    try {
        const listData = await DB.get(table).find(query, '-_id');
        DB.close();
        return listData;
    } catch (err) {
        log4js.error(err);
    }
};
tmpMonitorDAO.modify = async (query, modifyFields) => {
    try {
        return await DB.get(table).update(query, {$set: modifyFields});
    } catch (e) {
        log4js.error(e);
        return null;
    }
};
exports.tmpMonitorDAO = tmpMonitorDAO;