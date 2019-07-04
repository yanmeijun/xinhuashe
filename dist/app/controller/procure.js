const urlParse = require('url'),
    procureService = require('../logic/procure').procureService;

let procureCon = {};

procureCon.getCon = async (ctx) => {
    const pathName = urlParse.parse(ctx.req.url).pathname.replace("/", "").split("/")[1];
    await eval(pathName + "(ctx)");
};

/*是否已申请*/
const getProcureID = async (ctx) => {
    await procureService.getProcureID(ctx)
};
//申请采购  再次申请
const procureApply = async (ctx) => {
    await procureService.procureApply(ctx)
};
//获取申请采购列表（个人中心）
const getApplyList = async (ctx) => {
    await procureService.getApplyList(ctx)
};
//根据serviceID获取服务详情
const getService = async (ctx) => {
    await procureService.getService(ctx)
};

//撤销申请
const cancelApply = async (ctx) => {
    await procureService.cancelApply(ctx)
};
//获取申请列表
const getServiceList = async (ctx) => {
    await procureService.getServiceList(ctx)
};
//获取单条采购申请详情
const getServiceInfo = async (ctx) => {
    await procureService.getServiceInfo(ctx)
};
exports.procureCon = procureCon;