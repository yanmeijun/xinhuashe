const urlParse = require('url'),
    userServiceLogic = require('../logic/userService').userServiceLogic;

let userServiceCon = {};

userServiceCon.getCon = async (ctx) => {
    const pathName = urlParse.parse(ctx.req.url).pathname.replace("/", "").split("/")[1];
    await eval(pathName + "(ctx)");
};
//按顺序分页获取、查询数据
const getUserServiceList = async (ctx) => {
    await userServiceLogic.getUserServiceList(ctx)
};
//服务上下线修改
const modifyService = async (ctx) => {
    await userServiceLogic.modifyService(ctx)
};

exports.userServiceCon = userServiceCon;