const urlParse = require('url'),
    originService = require('../logic/origin').originService;

let originCon = {};

originCon.getCon = async(ctx)=> {
    const pathName = urlParse.parse(ctx.req.url).pathname.replace("/", "").split("/")[1];
    await eval(pathName + "(ctx)");
};
//添加服务监控
const addMonitor = async(ctx)=> {
    await originService.addMonitor(ctx)
};
//修改监控服务信息
const modifyMonitor = async(ctx) => {
    await originService.modifyMonitor(ctx)
};
//删除服务监控（支持批量）
const deleteMonitor = async(ctx) => {
    await originService.deleteMonitor(ctx)
};
//启用/停止监控（支持批量）
const startOrStop = async(ctx) => {
    await originService.startOrStop(ctx)
};
//按顺序分页获取、查询数据
const getMonitorList = async (ctx) =>{
    await originService.getMonitorList(ctx)
};
//模糊查询
const searchByKwd = async (ctx) =>{
    await originService.searchByKwd(ctx)
};
//校验监控名和监控地址的唯一性
const checkOnlyOne = async (ctx) => {
    await originService.checkOnlyOne(ctx)
};
//根据id获取单条数据
const getByID = async (ctx) => {
    await originService.getByID(ctx)
};
exports.originCon = originCon;