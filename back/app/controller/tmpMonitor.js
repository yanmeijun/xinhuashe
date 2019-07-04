const urlParse = require('url'),
    tmpMonitorLogic = require('../logic/tmpMonitor').tmpMonitorLogic;

let tmpMonitorCon = {};

tmpMonitorCon.getCon = async (ctx) => {
    const pathName = urlParse.parse(ctx.req.url).pathname.replace("/", "").split("/")[1];
    await eval(pathName + "(ctx)");
};

//按顺序分页获取、查询数据
const getUserServiceList = async (ctx) => {
    await tmpMonitorLogic.getUserServiceList(ctx)
};

exports.tmpMonitorCon = tmpMonitorCon;