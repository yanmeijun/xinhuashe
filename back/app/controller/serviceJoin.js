const urlParse = require('url'),
    serviceJoinLogic = require('../logic/serviceJoin').serviceJoinLogic;

let serviceJoinCon = {};

serviceJoinCon.getCon = async(ctx)=> {
    const pathName = urlParse.parse(ctx.req.url).pathname.replace("/", "").split("/")[1];
    await eval(pathName + "(ctx)");
};
//文件下载
const download = async(ctx)=> {
    await serviceJoinLogic.download(ctx);
};
//文件上传
const upload = async(ctx)=> {
    await serviceJoinLogic.upload(ctx);
};
//按顺序分页获取、查询数据
const getServiceList = async(ctx) => {
    await serviceJoinLogic.getServiceList(ctx)
};
//添加服务
const addService = async(ctx)=> {
    await serviceJoinLogic.addService(ctx)
};
//修改服务
const modifyService = async(ctx) => {
    await serviceJoinLogic.modifyService(ctx)
};
//根据idNumber获取单条数据
const getByID = async(ctx) => {
    await serviceJoinLogic.getByID(ctx)
};
//模糊查询
const searchByKwd = async(ctx) => {
    await serviceJoinLogic.searchByKwd(ctx)
};
//校验服务名称的唯一性
const checkOnlyOne = async(ctx) => {
    await serviceJoinLogic.checkOnlyOne(ctx)
};

exports.serviceJoinCon = serviceJoinCon;