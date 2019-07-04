'use strict'
const urlParse = require('url'),
    userInformationService = require('../logic/userInformation').userInformationService;
let userInformationCon = {};
userInformationCon.getCon = async (ctx) => {
    const pathName = urlParse.parse(ctx.req.url).pathname.replace("/", "").split("/")[1];
    await eval(pathName + "(ctx)");
};
/*
登录
*/
const login = async (ctx) => {
    await userInformationService.login(ctx);
};
//注册
const register = async (ctx) => {
    await userInformationService.register(ctx);
};
//退出登录
const logout = async (ctx) => {
    await userInformationService.logout(ctx);
};
// 执行验证码
const verification = async (ctx) => {
    await userInformationService.verification(ctx)
}
// 判断用户是否以及注册过
const isRegister = async (ctx) => {
    await userInformationService.isRegister(ctx);
};
//判断用户是否实名认证过
const realName = async (ctx) => {
    await userInformationService.realName(ctx);
};
//修改密码
const ModifyPassword = async (ctx) => {
    await userInformationService.ModifyPassword(ctx);
};
//找回密码
const findPassword = async (ctx) => {
    await userInformationService.findPassword(ctx);
};
//修改手机号
const modifyPhone = async (ctx) => {
    await userInformationService.modifyPhone(ctx);
};
//绑定手机号是否注册过
const isOnlymobile = async (ctx) => {
    await userInformationService.isOnlymobile(ctx);
};
//判断密码是否正确
const isJsutPassword = async (ctx) => {
    await userInformationService.isJsutPassword(ctx);
};
/*上传图片*/
const upload = async (ctx) => {
    await userInformationService.upload(ctx);
};
//实名认证
const government = async (ctx) => {
    await userInformationService.government(ctx);
}
//根据openID获取用户信息
const getUserByOpenID = async (ctx) => {
    await userInformationService.getUserByOpenID(ctx)
};
//判断是否登录
const isLogin = async (ctx) => {
    await userInformationService.isLogin(ctx);
};
//获取预警邮箱
const getWarnEmail = async (ctx) => {
    await userInformationService.getWarnEmail(ctx);
};
//修改预警邮箱
const modifyWarnEmail = async (ctx) => {
    await userInformationService.modifyWarnEmail(ctx);
};

exports.userInformationCon = userInformationCon;