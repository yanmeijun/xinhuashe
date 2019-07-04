const monk = require('monk'),
    moment = require('moment'),
    log4js = require('../util/log4j'),
    config = require('../../config/config'),
    util = require("../util/util"),
    DB = monk(config.db.url, config.db.options);
const table = "user";
let userDAO = {};

/*
*查找用户信息
*/
userDAO.getUserByUserID = async (userID) => {
    try {
        return await DB.get(table).findOne({"userID": userID});
    } catch (e) {
        log4js.error(e);
        return null;
    }
};
//判断用户是否存在，是否启用
userDAO.getUserByUserName = async (userName) => {
    try {
        const user = await DB.get(table).findOne({"userName": userName});
        return (user&&user.isEnable)? true : false;
    } catch (e) {
        log4js.error(e);
        return null;
    }
};
/*
*修改密码
*/
userDAO.ModifyPassword = async (query, parameter) => {
    try {
        return await DB.get(table).update(query, {$set: {password: parameter.aginPassword}});
    } catch (err) {
        log4js.errLogger(err)
    }
};

/*
*绑定邮箱
*/
userDAO.mailboxBind = async (query, parameter) => {
    try {
        return await DB.get(table).update(query, {$set: {email: parameter.email}});
    } catch (err) {
        log4js.errLogger(err)
    }
};
/*
*修改绑定邮箱
*/
userDAO.modifyBindMail = async (query, parameter) => {
    try {
        return await DB.get(table).update(query, {$set: {email: parameter.email}});
    } catch (err) {
        log4js.errLogger(err)
    }
};
/*
*选择预警方式
*/
userDAO.earlyWarning = async (query, parameter) => {
    try {
        return await DB.get(table).update(query, {$set: {warning: parameter.warning}});
    } catch (err) {
        log4js.errLogger(err)
    }
};
//添加用户
userDAO.add = async (conditions) => {
    let insertData = {
        userID: util.md5(conditions.userName),
        domain: conditions.domain,
        userName: conditions.userName,
        password: util.md5(conditions.password),
        name: conditions.name,
        mobile: conditions.mobile,
        email: conditions.email,
        permission: conditions.permission,
        isEnable: true,
        createDate: moment().format('YYYY-MM-DD HH:mm:ss')
    };
    try {
        return await DB.get(table).insert(insertData);
    } catch (e) {
        log4js.error(e);
        return null;
    }
};
userDAO.getUserList = async (query, options) => {
    try {
        let dataList = await DB.get(table).find(query, options);
        let dataCount = await DB.get(table).count(query);
        return {dataList: dataList, dataCount: dataCount};
    } catch (e) {
        log4js.error(e);
        return null;
    }
};
userDAO.modify = async (query, modify) => {
    try {
        return await DB.get(table).update(query, {$set: modify});
    } catch (e) {
        log4js.error(e);
        return null;
    }
};
//删除用户
userDAO.delete = async (query) => {
    try {
        return await DB.get(table).remove(query);
    } catch (e) {
        log4js.error(e);
        return null;
    }
};
exports.userDAO = userDAO;