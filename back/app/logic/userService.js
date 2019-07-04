const moment = require('moment'),
    _ = require('underscore'),
    urlParse = require('url'),
    log4js = require('../util/log4j'),
    util = require('../util/util').util,
    userServiceDAO = require('../dao/userService').userServiceDAO;
let userServiceLogic = {};
userServiceLogic.getUserServiceList = async (ctx) => {
    const body = ctx.request.body || ctx.request.query;
    let query = body.query;
    if (util.isEmptyValue("userServiceLogic.getUserServiceList", {
            openID: query.openID
        })) {
        ctx.body = {
            code: 500,
            msg: "error",
            error: "openID不能为空"
        };
    } else {
        let options = {
            sort: body.sort,
            skip: (body.page - 1) * body.rows || 0,
            limit: body.rows || 10
        };
        if(body.keyword){
            query.serviceName = new RegExp(body.keyword)
        }
        try {
            let serviceList = await userServiceDAO.get(query, options);
            ctx.body = {
                code: 200,
                msg: "success",
                results: serviceList
            };
        } catch (err) {
            log4js.error(err);
            ctx.body = {
                code: 500,
                msg: "error",
                error: err
            };
        }
    }
}
userServiceLogic.modifyService = async (ctx) => {
    const body = ctx.request.body;
    let query = body.query, modify = body.modify;
    if (util.isEmptyValue("userServiceLogic.getUserServiceList", {
            openID: query.localFrom
        })) {
        ctx.body = {
            code: 500,
            msg: "error",
            error: "openID不能为空"
        };
    } else {
        try {
            let result = await userServiceDAO.modify(query, modify);
            ctx.body = {
                code: 200,
                msg: "success",
                results: result
            };
        } catch (err) {
            log4js.error(err);
            ctx.body = {
                code: 500,
                msg: "error",
                error: err
            };
        }
    }
}
exports.userServiceLogic = userServiceLogic;