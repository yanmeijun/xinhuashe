'use strict'
const urlParse = require('url'),
    codeService = require('../logic/code').codeService;
let codeCon = {};
codeCon.getCon = async (ctx) => {
    const pathName = urlParse.parse(ctx.req.url).pathname.replace("/", "").split("/")[1];
    await eval(pathName + "(ctx)");
};
//校验验证码
const code = async (ctx) => {
    await codeService.checkCode(ctx);
};

// 注册获取短信验证码
const getCode = async (ctx) => {
    await codeService.getCode(ctx, 'register');
};

// 获取修改手机号短信验证码
const getModPhoneCode = async (ctx) => {
    await codeService.getCode(ctx, 'modifyMobile');
};

//找回密码获取验证码
const retrievePwd = async (ctx) => {
    await codeService.getCode(ctx, 'forgetPass');
};

exports.codeCon = codeCon;