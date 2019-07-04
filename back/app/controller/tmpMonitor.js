const urlParse = require('url'),
    moment = require('moment'),
    _ = require('underscore'),
    tmpMonitorService = require('../logic/tmpMonitor').tmpMonitorService;

let tmpMonitorCon = {};

tmpMonitorCon.getCon = async(ctx)=> {
    const pathName = urlParse.parse(ctx.req.url).pathname.replace("/", "").split("/")[1];
    await eval(pathName + "(ctx)");
};

// 查找所有的模板信息
const lookupTemplate = async(ctx) => {
    await tmpMonitorService.lookupTemplate(ctx);
};
//添加服务监控
const addTmpMonitor = async(ctx)=> {
    await tmpMonitorService.addTmpMonitor(ctx);
};
//获取服务监控列表 按顺序分页获取
const getTmpMonitor = async(ctx)=> {
    await tmpMonitorService.getTmpMonitor(ctx);
};
//模糊查询
const searchTmpMonitor = async (ctx) => {
    await tmpMonitorService.searchTmpMonitor(ctx);
};
//删除服务监控（支持批量）
const deleteMonitor = async(ctx) => {
    await tmpMonitorService.deleteMonitor(ctx)
};
//启用/停止监控（支持批量）
const startOrStop = async(ctx) => {
    await tmpMonitorService.startOrStop(ctx)
};

//修改监控模板
const modifyTmpMonitorID = async(ctx) =>{
    await tmpMonitorService.modifyTmpMonitorID(ctx);
};
//修改监控模板 回填
const getModifyTmpMonitorID = async(ctx) =>{
    await tmpMonitorService.getModifyTmpMonitorID(ctx);
};
exports.tmpMonitorCon = tmpMonitorCon;