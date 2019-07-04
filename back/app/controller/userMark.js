'use strict'
const urlParse = require('url'),
    userMarkService = require('../logic/userMark').userMarkService;
let userMarkCon = {};
userMarkCon.getCon = async (ctx) => {
    const pathName = urlParse.parse(ctx.req.url).pathname.replace("/", "").split("/")[1];
    await eval(pathName + "(ctx)");
};
/*获取关注列表*/
const getMarkList = async (ctx) => {
    await userMarkService.getMarkList(ctx);
};
/*取消关注*/
const cancelMark = async (ctx) => {
    await userMarkService.cancelMark(ctx);
};
/*增加关注量*/
const addMark  = async (ctx) => {
    await userMarkService.addMark(ctx);
};
/*是否关注过*/
const isFollow  = async (ctx) => {
    await userMarkService.isFollow(ctx);
};
exports.userMarkCon = userMarkCon;