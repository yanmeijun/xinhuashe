'use strict'
const urlParse = require('url'),
userService=require('../logic/user').userService;

let userCon={};
userCon.getCon = async(ctx)=>{
    const pathName = urlParse.parse(ctx.req.url).pathname.replace("/", "").split("/")[1];
    await eval(pathName + "(ctx)");
};
/*
登录
*/
const login = async(ctx)=>{
    await userService.login(ctx);
}
/*
*修改密码
*/

const ModifyPassword = async (ctx) =>{
  await userService.ModifyPassword(ctx);
}

/*
*退出登录
*/
const logout = async (ctx) =>{
    await userService.logout(ctx);
};
/*
*判断是否已经绑定邮箱
*/
const mailbox = async (ctx) =>{
    await userService.mailbox(ctx);
};
/*
*绑定邮箱
*/
const mailboxBind =async (ctx) =>{
    await userService.mailboxBind(ctx);
};
/*
*修改绑定邮箱
*/
const modifyBindMail = async (ctx) =>{
    await userService.modifyBindMail(ctx);
};
/*
*选择预警方式
*/
const earlyWarning = async (ctx) => {
    await userService.earlyWarning(ctx);
};
//根据userName获取用户信息
const getUser = async (ctx) => {
    await userService.getUser(ctx);
};
//添加用户
const addUser = async (ctx) => {
    await userService.addUser(ctx);
};
//获取用户列表
const getUserList = async (ctx) => {
    await userService.getUserList(ctx);
};
//修改用户信息
const modifyUser = async (ctx) => {
    await userService.modifyUser(ctx);
};
//删除用户（支持批量）
const deleteUser = async (ctx) => {
    await userService.deleteUser(ctx);
};

exports.userCon = userCon;