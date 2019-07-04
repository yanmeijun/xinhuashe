const monk = require('monk'),
    log4js = require('../util/log4j'),
    moment = require('moment'),
    config = require('../../config/config'),
    DB = monk(config.db.url, config.db.options);
const table = "code";
let codeDAO = {};

//生成短信验证码
codeDAO.saveCode = async (parameter) => {
    let insertData = {
        actionName: parameter.actionName,
        mobile: parameter.mobile,
        checkCode: parameter.checkCode,
        createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        expireTime: moment().add(15, 'm').format('YYYY-MM-DD HH:mm:ss')
    };
    try {
        return await  DB.get(table).update({
            "mobile": insertData.mobile,
            "actionName": insertData.actionName
        }, {$set: insertData}, {upsert: true, w: 1});
    } catch (e) {
        log4js.error(e);
        return null;
    }
};

//根据条件查找验证码记录
codeDAO.findOne = async (query) => {
    try {
        return await DB.get(table).findOne(query);
    } catch (e) {
        log4js.error(e);
        return null;
    }
};

exports.codeDAO = codeDAO;