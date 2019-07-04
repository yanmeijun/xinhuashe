const monk = require('monk'),
    log4js = require('../util/log4j'),
    util = require("../util/util").util,
    config = require('../../config/config'),
    _ = require('underscore'),
    DB = monk(config.db.url, config.db.options);
const userMarkTable = "userMark";
const serviceTable = "service";
let userMarkDao = {};

userMarkDao.findAll = async (query) => {
    try {
        const count = await DB.get(userMarkTable).count(query);
        const userMarkData = await DB.get(userMarkTable).find(query);//根据用户的openID 查出userMark里的所有用户关注的服务
        if (_.size(userMarkData) > 0) {
            for (let item of userMarkData) {
                const serviceQuery = {serviceID: item.serviceID};
                const serviceData = await DB.get(serviceTable).findOne(serviceQuery);
                if (!_.isEmpty(serviceData)) {
                    _.extend(item, serviceData);
                }
            }
        }
        return {userMarkData, count};
    } catch (e) {
        log4js.error(e);
        return null;
    }
};
//删除
userMarkDao.delete = async (query) => {
    try {
        const serviceData = await DB.get(serviceTable).findOne({serviceID: query.serviceID});
        serviceData.markNum = serviceData.markNum - 1;
        if (_.isNumber(serviceData.markNum)) {
            if (serviceData.markNum <= 0) {
                await DB.get(serviceTable).update({serviceID: query.serviceID}, {$set: {markNum: 0}});
            } else {
                await DB.get(serviceTable).update({serviceID: query.serviceID}, {$set: {markNum: serviceData.markNum}});
            }
            return await DB.get(userMarkTable).remove(query);
        } else {
            return null;
        }
    } catch (e) {
        log4js.error(e);
        return null;
    }
}
// 添加关注
userMarkDao.addMark = async (data) => {
    try {
        const serviceData = await DB.get(serviceTable).findOne({serviceID: data.serviceID});
        if (serviceData.markNum >= 0) {
            serviceData.markNum = serviceData.markNum + 1;
        } else {
            serviceData.markNum = 1;
        }
        await DB.get(serviceTable).update({serviceID: data.serviceID}, {$set: {markNum: serviceData.markNum}});
        return await DB.get(userMarkTable).update({serviceID: data.serviceID,openID: data.openID}, {$set: data}, {upsert: true, w: 1});
    } catch (e) {
        log4js.error(e);
        return null;
    }
}
userMarkDao.isFollow = async (query) => {
    try {
        return await DB.get(userMarkTable).findOne(query);
    } catch (e) {
        log4js.error(e);
        return null;
    }
}
exports.userMarkDao = userMarkDao;