'use strict'
const urlParse = require('url'),
  userInformationService=require('../logic/userInformation').userInformationService;

let userInformationCon={};
userInformationCon.getCon = async(ctx)=>{
  const pathName = urlParse.parse(ctx.req.url).pathname.replace("/", "").split("/")[1];
  await eval(pathName + "(ctx)");
};
// 获取前台所有的用户
const getUserDate = async (ctx) => {
  await userInformationService.getUserDate(ctx);
};
//模糊查询
const getUserKey = async (ctx) => {
  await userInformationService.getUserKey(ctx);
};
//修改密码
const ModifyPassword = async (ctx) =>{
  await userInformationService.ModifyPassword(ctx);
};
//根据openID获取用户信息
const getUserByOpenID = async (ctx) => {
  await userInformationService.getUserByOpenID(ctx)
};
//启用停用
const startOrStop = async (ctx) => {
  await userInformationService.startOrStop(ctx)
};
//通过审核
const checkAdopt = async (ctx) => {
  await userInformationService.checkAdopt(ctx)
};
//驳回意见
const fillReject = async (ctx) => {
  await userInformationService.fillReject(ctx)
};
//注册
const register = async (ctx) => {
  await userInformationService.register(ctx);
};
// 判断用户是否以及注册过
const isRegister = async (ctx) => {
  await userInformationService.isRegister(ctx);
};
exports.userInformationCon = userInformationCon;