const urlParse = require('url'),
    procureService = require('../logic/procure').procureService;

let procureCon = {};

procureCon.getCon = async(ctx)=> {
    const pathName = urlParse.parse(ctx.req.url).pathname.replace("/", "").split("/")[1];
    await eval(pathName + "(ctx)");
};
//获取服务采购列表
const getProcureMan = async(ctx)=> {
    await procureService.getProcureMan(ctx)
};
//获取服务详情信息
const getProcureInfo = async(ctx)=> {
    await procureService.getProcureInfo(ctx)
};
//审核采购（通过或驳回）
const checkProcure = async(ctx)=> {
    await procureService.checkProcure(ctx)
};
exports.procureCon = procureCon;