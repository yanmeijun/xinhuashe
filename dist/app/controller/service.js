const urlParse = require('url'),
    serviceLogic = require('../logic/service').serviceLogic;

let serviceCon = {};

serviceCon.getCon = async (ctx) => {
    const pathName = urlParse.parse(ctx.req.url).pathname.replace("/", "").split("/")[1];
    await eval(pathName + "(ctx)");
};
//按顺序分页获取、查询数据
const getServiceList = async (ctx) => {
    await serviceLogic.getServiceList(ctx)
};
//搜索
const searchByKwd = async (ctx) => {
    await serviceLogic.searchByKwd(ctx)
};
//获取服务详情
const getServiceDetail = async (ctx) => {
    await serviceLogic.getServiceDetail(ctx)
};
//获取热门服务列表
const getHotService = async (ctx) => {
    await serviceLogic.getHotService(ctx)
};


exports.serviceCon = serviceCon;