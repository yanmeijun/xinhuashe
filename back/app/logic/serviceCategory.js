const _ = require('underscore'),
    log4js = require('../util/log4j'),
    util = require('../util/util'),
    moment = require('moment'),
    serviceCategoryDAO = require("../dao/serviceCategory").serviceCategoryDAO,
    serviceDAO = require("../dao/service").serviceDAO;
let serviceCategoryLogic = {};
//获取服务类别列表
serviceCategoryLogic.getCategoryList = async(ctx) => {
    const options = {
        sort: ctx.request.body.sort || {category: 1},
        skip: (ctx.request.body.page - 1) * ctx.request.body.rows || 0,
        limit: ctx.request.body.rows || 10
    };
    try {
        const results = await serviceCategoryDAO.get({}, ctx.request.body.all?{}:options);
        ctx.body = {
            code: 200,
            results: {categoryList: results.dataList, count: results.dataCount}
        }
    } catch (e) {
        log4js.error(e);
        ctx.body = {
            code: 500,
            error: "获取服务类别列表失败！"
        }
    }
};
//添加服务类别
serviceCategoryLogic.addCategory = async(ctx) => {
    let conditions = ctx.request.body;
    if (util.isEmptyValue("serviceCategoryLogic.addCategory", {
            name: conditions.name
        })) {
        ctx.body = {
            code: 500,
            error: "name不能为空"
        };
    } else {
        try {
            const checkResults = await serviceCategoryDAO.get({name: conditions.name});
            if (checkResults.dataCount > 0) {
                ctx.body = {
                    code: 500,
                    error: "该服务类别已存在！"
                };
                return;
            }
            const existList = await serviceCategoryDAO.get();
            let existArr = [];
            for (let i = 0; i < existList.dataList.length; i++) {
                existArr.push(existList.dataList[i].category)
            }
            conditions.category = await util.getDiffOne(existArr, conditions.level);
            conditions.createDate = moment().format('YYYY-MM-DD HH:mm:ss');
            const results = await serviceCategoryDAO.add(conditions);
            ctx.body = {
                code: 200,
                results: results
            }
        } catch (e) {
            log4js.error(e);
            ctx.body = {
                code: 500,
                error: "添加服务类别失败！"
            }
        }
    }
};
//编辑类别
serviceCategoryLogic.editCategory = async(ctx) => {
    const category = ctx.request.body.category, modifyFields = ctx.request.body.modifyFields;
    try {
        const results = await serviceCategoryDAO.modify({category: category}, modifyFields);
        ctx.body = {
            code: 200,
            results: results
        }
    } catch (e) {
        log4js.error(e);
        ctx.body = {
            code: 500,
            error: "修改服务类别失败！"
        }
    }
};
//删除类别
serviceCategoryLogic.deleteCategory = async(ctx) => {
    const query = ctx.request.body;
    try {
        const results = await serviceCategoryDAO.delete(query);
        ctx.body = {
            code: 200,
            results: results
        }
    } catch (e) {
        log4js.error(e);
        ctx.body = {
            code: 500,
            error: "删除服务类别失败！"
        }
    }
};
//校验类别名称唯一性
serviceCategoryLogic.checkCategoryName = async(ctx) => {
    const conditions = ctx.request.body;
    try {
        const checkResults = await serviceCategoryDAO.get({name: conditions.categoryName});
        if (checkResults.dataCount > 0) {
            ctx.body = {
                code: 500,
                error: "该服务类别已存在！"
            };
        }else{
            ctx.body = {
                code: 200,
                msg: "ok"
            };
        }
    } catch (e) {
        log4js.error(e);
        ctx.body = {
            code: 500,
            error: "校验类别名称唯一性失败！"
        }
    }
};
//校验类别是否已被服务引用
serviceCategoryLogic.checkCategoryUsed = async(ctx) => {
    const category = ctx.request.body.category;
    try {
        if(category.length == 1){//如果删除的是一级分类
            const check1 = await serviceCategoryDAO.get({parent: category});
            if(check1.dataCount > 0){
                ctx.body = {
                    code: 500,
                    error: "该服务类别已被引用！"
                };
            }else{
                ctx.body = {
                    code: 200,
                    msg: "ok"
                };
            }
        }else{//如果删除的是二级分类
            const dataInfo = await serviceCategoryDAO.get({category: category});
            let checkCategory = dataInfo.dataList[0].parent + category;
            const check2 = await serviceDAO.get({serviceID: new RegExp(checkCategory)});
            if(!_.isEmpty(check2)){
                ctx.body = {
                    code: 500,
                    error: "该服务类别已被引用！"
                };
            }else{
                ctx.body = {
                    code: 200,
                    msg: "ok"
                };
            }
        }
    } catch (e) {
        log4js.error(e);
        ctx.body = {
            code: 500,
            error: "校验类别是否被引用失败！"
        }
    }
};
exports.serviceCategoryLogic = serviceCategoryLogic;