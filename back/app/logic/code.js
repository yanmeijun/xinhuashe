'use strict'
const codeDAO = require("../dao/code").codeDAO,
    log4js = require('../util/log4j'),
    util = require("../util/util").util,
    request = require('request'),
    moment = require('moment'),
    yunPianCfg = require("../../config/yunpian"),
    _ = require("underscore");
let codeService = {};

// 获取短信验证码
codeService.getCode = async (ctx, actionName) => {
    const number = Math.floor(Math.random() * 100000 + 100000); //短信code
    const paramData = {
        actionName: actionName,
        mobile: ctx.request.body.mobile,
        checkCode: number
    };
    const flag = util.isEmptyValue("codeService.getCode", paramData);
    //非空判断
    if (flag) {
        ctx.body = {"msg": "手机号不能为空", "code": 500};
        return;
    } else {
        const tpl_value = yunPianCfg.yunpian[actionName].tpl_value + number,
            yunPianParam = {
                mobile: paramData.mobile,
                tpl_id: yunPianCfg.yunpian[actionName].tpl_id,
                tpl_value: tpl_value,
            };
        try {
            const historyData = await codeDAO.findOne({actionName: paramData.actionName, mobile: paramData.mobile});
            if (historyData && moment.now() < moment(historyData.expireTime)) {
                ctx.body = {
                    code: 500,
                    msg: "短信验证码还在15分钟有效期内，请勿重复请求！"
                }
            } else {
                const result = await util.sendCode(yunPianParam);
                await codeDAO.saveCode(paramData);// 保存短信验证码 如果有就修改，没有就插入
                ctx.body = {
                    code: 200,
                    result
                };
            }
        } catch (err) {
            log4js.error(err);
            ctx.body = {
                code: 500,
                msg: err.msg
            }
        }
    }
};

// 验证短信验证码是否正确
codeService.checkCode = async (ctx) => {
    const paramData = {
        actionName: ctx.request.body.actionName,
        mobile: ctx.request.body.mobile,
        checkCode: ctx.request.body.checkCode,
    };
    const flag = util.isEmptyValue("codeService.code", paramData);
    if (flag) {
        ctx.body = {"msg": "手机号和验证码为空", "code": 500}
        return;
    }
    try {
        const result = await checkCode(ctx, paramData.actionName, paramData.mobile, paramData.checkCode);
        ctx.body = {
            code: 200,
            result
        };
    } catch (err) {
        log4js.error(err);
        ctx.body = {
            code: 500,
            msg: err
        };
    }
};

const checkCode = async (ctx, actionName, mobile, checkCode) => {
    return new Promise(async (resolve, reject) => {
        try {
            const codeData = await codeDAO.findOne({"mobile": mobile, "actionName": actionName});
            if (!_.isEmpty(codeData)) {
                if (codeData.checkCode == checkCode && moment.now() < moment(codeData.expireTime)) {
                    resolve({"msg": "短信验证码正确", "code": 200});
                } else if (codeData.checkCode == checkCode && moment.now() > moment(codeData.expireTime)) {
                    reject({"msg": "验证码超过有效期，请重新获取", "code": 205});
                } else {
                    reject({"msg": " 短信验证码错误", "code": 203});
                }
            } else {
                reject({"msg": "请先获取验证码", "code": 205});
            }
        } catch (err) {
            log4js.error(err);
            reject({"msg": "短信验证码错误", "code": 204});
        }
    })
};
exports.codeService = codeService;