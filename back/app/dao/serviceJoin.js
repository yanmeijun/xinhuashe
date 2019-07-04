const monk = require('monk'),
    moment = require('moment'),
    config = require('../../config/config'),
    DB = monk(config.db.url, config.db.options),
    log4js = require('../util/log4j');
const table = "serviceJoin";
let serviceJoinDAO = {};

//单条数据插入
serviceJoinDAO.add = async (conditions) => {
    let insertData = {
        openID: conditions.openID,
        idNumber: conditions.idNumber,
        serviceName: conditions.serviceName,
        serviceUrl: conditions.serviceUrl,
        createDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        serviceType: conditions.serviceType,
        region: conditions.region,
        logo: conditions.logo,
        guide: conditions.guide,
        testReport: conditions.testReport,
        isPay: conditions.isPay,
        isLogin: conditions.isLogin,
        joinType: conditions.joinType,
        describe: conditions.describe,
        contactName: conditions.contactName,
        contactTel: conditions.contactTel,
        company: conditions.company,
        address: conditions.address,
        reviewState: 1
    };
    try {
        return await DB.get(table).insert(insertData);
    } catch (e) {
        log4js.error(e);
        return null;
    }
};
//单条数据修改
serviceJoinDAO.modify = async (query, modifyFields) => {
    try {
        return await DB.get(table).update(query, {$set: modifyFields});
    } catch (e) {
        log4js.error(e);
        return null;
    }
};
//根据查找条件获取数据，并进行排序
serviceJoinDAO.get = async (query, options) => {
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
serviceJoinDAO.getOne = async (query) => {
    try {
        let results = await DB.get(table).findOne(query);
        return results;
    } catch (e) {
        log4js.error(e);
        return null;
    }
};

//删除数据
serviceJoinDAO.delete = async (query) => {
    try {
        return await DB.get(table).remove(query);
    } catch (e) {
        log4js.error(e);
        return null;
    }
};
//批量修改数据
serviceJoinDAO.batchUpdate = async (dataList) => {
    try {
        await DB.get(table).bulkWrite(dataList);
        DB.close();
    } catch (e) {
        log4js.error(e);
    }
}
//查询符合条件的记录，返回为list
serviceJoinDAO.findAll = async (query) => {
    try {
        const listData = await DB.get(table).find(query);
        DB.close();
        return listData;
    } catch (err) {
        log4js.error(err);
    }
}
exports.serviceJoinDAO = serviceJoinDAO;