const urlParse = require('url'),
    templateService = require('../logic/template').templateService;

let templateCon = {};

templateCon.getCon = async(ctx)=> {
    const pathName = urlParse.parse(ctx.req.url).pathname.replace("/", "").split("/")[1];
    await eval(pathName + "(ctx)");
};
//获取服务模板列表
const getTemplateMan = async(ctx)=> {
    await templateService.getTemplateMan(ctx)
};

//添加服务模板
const addTemplate = async(ctx)=> {
    await templateService.addTemplate(ctx)
};

//启用或停用服务模板（支持批量）
const modifyStatus = async(ctx)=> {
    await templateService.modifyStatus(ctx)
};

//删除服务模板（支持批量）
const deleTemplate = async(ctx)=> {
    await templateService.deleTemplate(ctx)
};

//获取服务模板信息
const getTemplate = async(ctx)=> {
    await templateService.getTemplate(ctx)
};

//修改服务模板
const modifyTemplate = async(ctx)=> {
    await templateService.modifyTemplate(ctx)
};
exports.templateCon = templateCon;