const urlParse = require("url"),
    serviceCategoryLogic = require("../logic/serviceCategory").serviceCategoryLogic;
let serviceCategoryCon = {};

serviceCategoryCon.getCon = async(ctx) => {
    const methodName = urlParse.parse(ctx.req.url).pathname.split("/")[2];
    await eval(methodName + "(ctx)");
};
//获取类别列表
const getCategoryList = async(ctx) => {
    await serviceCategoryLogic.getCategoryList(ctx);
};
//新增类别
const addCategory = async(ctx) => {
    await serviceCategoryLogic.addCategory(ctx);
};
//编辑类别
const editCategory = async(ctx) => {
    await serviceCategoryLogic.editCategory(ctx);
};
//删除类别
const deleteCategory = async(ctx) => {
    await serviceCategoryLogic.deleteCategory(ctx);
};
//校验类别名称唯一性
const checkCategoryName = async(ctx) => {
    await serviceCategoryLogic.checkCategoryName(ctx);
};
//校验类别是否已被服务引用
const checkCategoryUsed = async(ctx) => {
    await serviceCategoryLogic.checkCategoryUsed(ctx);
};
exports.serviceCategoryCon = serviceCategoryCon;