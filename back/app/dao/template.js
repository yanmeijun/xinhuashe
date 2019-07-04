const _ = require('underscore'),
    monk = require('monk'),
    log4js = require('../util/log4j'),
    util = require('../util/util'),
    config = require('../../config/config'),
    DB = monk(config.db.url, config.db.options);
const table = "template";
let templateDAO = {};

//查询符合条件的记录，返回为list
templateDAO.findAll = async (queryAll, query, sort, skip, limit) => {
    let options = {"limit": limit, "skip": skip};
    if (!_.isEmpty(sort)) {
        options = _.extend(options, {"sort": sort});
    }

    try {
        const data = await DB.get(table).find({$or: queryAll, $and: query}, options);
        const totalNum = await DB.get(table).count({$or: queryAll, $and: query});
        return {data, totalNum};
    } catch (err) {
        log4js.error(err);
        return null;
    }
}

//查询符合条件的记录，返回为list
templateDAO.insertOne = async (query, insertOne) => {
    try {
        const find = await DB.get(table).find(query);
        console.log('find' + find);
        if (find != "") {
            return {status: '500', errMsg: '模板ID已存在'}
        }
    } catch (err) {
        log4js.error(err);
        return {status: '500', errMsg: '数据库查询失败'};
    }
    try {
        const data = await DB.get(table).insert(insertOne);
        util.redisPublish({"serviceId": insertOne.templateID, "status": insertOne.status})
        return {status: '200', data: data};
    } catch (err) {
        log4js.error(err);
        return {status: '500', errMsg: '数据库查询失败'};
    }
}

//批量修改模板状态为启用或停用
templateDAO.updateAll = async (updateQuery, updateSet) => {
    try {
        let updateAllList = [];
        _.each(updateQuery, (item) => {
            updateAllList.push({
                updateOne:
                    {
                        filter: {templateID: item},
                        update: {$set: updateSet},
                        upsert: true
                    }
            })
            util.redisPublish({"serviceId": item, "status": updateSet.status})
        });
        const data = await DB.get(table).bulkWrite(updateAllList);
        DB.close();
        return {status: '200', data: data};
    } catch (e) {
        log4js.error(e);
        return {status: '500', errMsg: '数据库查询失败'};
    }
}

//批量修改模板状态停用
templateDAO.stopAll = async (updateQuery, updateSet) => {
    try {
        let updateAllList = [];
        _.each(updateQuery, (item) => {
            updateAllList.push({
                updateOne:
                    {
                        filter: {templateID: item},
                        update: {$set: updateSet},
                        upsert: true
                    }
            })
            util.redisPublish({"serviceId": item, "status": updateSet.status})
        });
        const data = await DB.get(table).bulkWrite(updateAllList);
        DB.close();
        return data;
    } catch (e) {
        log4js.error(e);
        return null;
    }
}

//批量或单个删除模板
templateDAO.DeleteAll = async (deleteQuery) => {
    try {
        let deleteAllList = [];
        _.each(deleteQuery, (item) => {
            deleteAllList.push({
                deleteOne:
                    {
                        filter: {templateID: item}
                    }
            })
            util.redisPublish({"serviceId": item, "status": "0"})
        });
        const data = await DB.get(table).bulkWrite(deleteAllList);
        DB.close();
        return {status: '200', data: data};
    } catch (e) {
        log4js.error(e);
        return {status: '500', errMsg: '数据库查询失败'};
    }
}
//获取模板信息
templateDAO.getTem = async (getQuery) => {
    try {
        const data = await DB.get(table).find(getQuery);
        return {status: '200', data: data};
    } catch (err) {
        log4js.error(err);
        return {status: '500', errMsg: '数据库查询失败'};
    }
}


//修改模板
templateDAO.modifyTem = async (newquery, query, modify) => {
    if (newquery.templateID !== query.templateID) {
        try {
            const find = await DB.get(table).find(newquery);
            console.log('find' + find);
            if (find != "") {
                return {status: '500', errMsg: '模板ID已存在'}
            }
        } catch (err) {
            log4js.error(err);
            return {status: '500', errMsg: '数据库查询失败'};
        }
    }
    try {
        const data = await DB.get(table).update(query, {$set: modify});
        util.redisPublish({"serviceId": query.templateID, "status": modify.status})
        return {status: '200', data: data};
    } catch (err) {
        log4js.error(err);
        return {status: '500', errMsg: '数据库查询失败'};
    }
}
exports.templateDAO = templateDAO;