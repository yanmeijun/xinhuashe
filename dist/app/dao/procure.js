const _ = require('underscore'),
    monk = require('monk'),
    log4js = require('../util/log4j'),
    config = require('../../config/config'),
    DB = monk(config.db.url, config.db.options);
const serviceTable = "service";
const procureTable = "procure";
let procureDAO = {};

procureDAO.getProcureID = async (query) => {
    try {
        return await DB.get(procureTable).findOne(query);
    } catch (e) {
        log4js.error(e);
        return null;
    }
};
//采购申请  再次申请
procureDAO.procureApply = async (query, update) => {
    try {
        return await DB.get(procureTable).update(query, {$set: update}, {upsert: true});
    } catch (err) {
        log4js.error(err);
        return null;
    }
}

//查询所有采购信息，并与服务信息合并
procureDAO.findApplyAll = async (query, option) => {
    try {
        const procureData = await DB.get(procureTable).find(query, option);  //procureData
        const procureCount = await DB.get(procureTable).count(query);  //procureCount
        if (_.size(procureData) > 0) {
            for (let item of procureData) {
                const serviceQuery = {serviceID: item.serviceID}
                const serviceData = await DB.get(serviceTable).findOne(serviceQuery);
                if (!_.isEmpty(serviceData)) {
                    _.extend(item, {
                        price: serviceData.price,
                        deadline: serviceData.deadline,
                        summary: serviceData.summary,
                        logo: serviceData.logo,
                        relief: serviceData.relief
                    })
                }
            }
        }
        return {res: procureData, count: procureCount};
    } catch (err) {
        log4js.error(err);
        return null;
    }
}
//查询所有采购信息，无service信息
procureDAO.findProcureAll = async (query, option) => {
    try {
        const procureData = await DB.get(procureTable).find(query, option);  //procureData
        const procureCount = await DB.get(procureTable).count(query);  //procureCount
        return {dataList: procureData, dataCount: procureCount};
    } catch (err) {
        log4js.error(err);
        return null;
    }
}
//查询单条采购信息，并与服务信息合并
procureDAO.getServiceInfo = async (query) => {
    try {
        const procureData = await DB.get(procureTable).findOne(query);  //procureData
        if (!_.isEmpty(procureData)) {
                const serviceQuery = {serviceID: procureData.serviceID};
                const serviceData = await DB.get(serviceTable).findOne(serviceQuery);
                if (!_.isEmpty(serviceData)) {
                    _.extend(procureData, {
                        price: serviceData.price,
                        deadline: serviceData.deadline,
                        summary: serviceData.summary,
                        logo: serviceData.logo,
                        relief: serviceData.relief
                    })
            }
        }
        return procureData;
    } catch (err) {
        log4js.error(err);
        return null;
    }
}

//撤销申请
procureDAO.cancelApply = async (query, update) => {
    try {
        return await DB.get(procureTable).update(query, {$set: update});
    } catch (err) {
        log4js.error(err);
        return null;
    }
}

exports.procureDAO = procureDAO;