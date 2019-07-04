const urlParse = require('url'),
    serviceLogic = require('../logic/service').serviceLogic;

let serviceCon = {};

serviceCon.getCon = async(ctx)=> {
    const pathName = urlParse.parse(ctx.req.url).pathname.replace("/", "").split("/")[1];
    await eval(pathName + "(ctx)");
};
//搜索服务
const search = async(ctx)=> {
    await serviceLogic.search(ctx);
};
const getServiceList = async(ctx)=> {
    await serviceLogic.getServiceList(ctx);
};
const addService = async(ctx)=> {
    await serviceLogic.addService(ctx);
};
const modifyService = async(ctx)=> {
    await serviceLogic.modifyService(ctx);
};
const searchByName = async(ctx)=> {
    await serviceLogic.searchByName(ctx);
};
const upload = async(ctx)=> {
    await serviceLogic.upload(ctx);
};

exports.serviceCon = serviceCon;