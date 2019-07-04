'use strict'
const userMarkDao = require("../dao/userMark").userMarkDao,
    log4js = require('../util/log4j'),
    util = require("../util/util").util,
    request = require('request'),
    moment = require('moment'),
    _ = require("underscore");
let userMarkService = {};
// 获取数据列表
userMarkService.getMarkList = async (ctx) => {
    const user = {
        openID: ctx.request.body.openID
    };
    const flag = util.isEmptyValue("userMarkService.getMarkList", user);
    //非空判断
    if (flag) {
        ctx.body = {"msg": "openID和serviceID不能为空", "code": 500};
        return;
    } else {
        try {
            let {userMarkData, count}= await userMarkDao.findAll(user), result = [];
            result = userMarkData;
            ctx.body = {
                code: 200,
                msg: '数据获取成功',
                info: result,
                count:count
            }
        } catch (e) {
            log4js.error(e);
            ctx.body = {
                code: 500,
                msg: '列表数据加载失败'
            }
        }
    }
};
userMarkService.cancelMark =  async (ctx) => {
    const user = {
        serviceID: ctx.request.body.serviceID,
        openID:ctx.request.body.openID
    };
    const flag = util.isEmptyValue("userMarkService.cancelMark", user);
    //非空判断
    if (flag) {
        ctx.body = {"msg": "serviceID不能为空", "code": 500};
        return;
    } else {
        try {
            let result= await userMarkDao.delete(user);
            ctx.body = {
                code: 200,
                msg: '数据获取成功',
                info: result
            }
        } catch (e) {
            log4js.error(e);
            ctx.body = {
                code: 500,
                msg: '列表数据加载失败'
            }
        }
    }
};
userMarkService.addMark =  async (ctx) => {
    const data = {
        serviceID: ctx.request.body.serviceID,
        openID:ctx.request.body.openID
    };
    const flag = util.isEmptyValue("userMarkService.addMark", data);
    //非空判断
    if (flag) {
        ctx.body = {"msg": "serviceID不能为空", "code": 500};
        return;
    } else {
        data.createTime = moment().format('YYYY-MM-DD HH:mm:ss')//用户关注时间
        try {
            let result= await userMarkDao.addMark(data);
            ctx.body = {
                code: 200,
                msg: '数据获取成功',
                info: result
            }
        } catch (e) {
            log4js.error(e);
            ctx.body = {
                code: 500,
                msg: '列表数据加载失败'
            }
        }
    }
}
userMarkService.isFollow = async (ctx) => {
    const user = {
        serviceID: ctx.request.body.serviceID,
        openID:ctx.request.body.openID
    };
    const flag = util.isEmptyValue("userMarkService.isFollow", user);
    //非空判断
    if (flag) {
        ctx.body = {"msg": "serviceID不能为空", "code": 500};
        return;
    } else {
        try {
            let result= await userMarkDao.isFollow(user);
            ctx.body = {
                code: 200,
                msg: '数据获取成功',
                info: result
            }
        } catch (e) {
            log4js.error(e);
            ctx.body = {
                code: 500,
                msg: '列表数据加载失败'
            }
        }
    }
}
exports.userMarkService = userMarkService;