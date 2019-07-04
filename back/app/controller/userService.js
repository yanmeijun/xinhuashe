const urlParse = require('url'),
    userServiceLogic = require('../logic/userService').userServiceLogic;

let userServiceCon = {};

userServiceCon.getCon = async(ctx)=> {
    const pathName = urlParse.parse(ctx.req.url).pathname.replace("/", "").split("/")[1];
    await eval(pathName + "(ctx)");
};
//添加服务
const addService = async(ctx)=> {
    await userServiceLogic.addService(ctx);
};
const getServiceList = async(ctx)=> {
    await userServiceLogic.getServiceList(ctx);
};
const modifyService = async(ctx)=> {
    await userServiceLogic.modifyService(ctx);
};
const searchByName = async(ctx)=> {
    await userServiceLogic.searchByName(ctx);
};
const upload = async(ctx)=> {
    await userServiceLogic.upload(ctx);
};
/*获取localFrom*/
const getLocalFrom = async (ctx) => {
    await userServiceLogic.getLocalFrom(ctx)
}
exports.userServiceCon = userServiceCon;