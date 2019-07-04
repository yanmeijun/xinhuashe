const moment = require('moment'),
    _ = require('underscore'),
    urlParse = require('url'),
    log4js = require('../util/log4j'),
    util = require('../util/util').util,
    send = require('koa-send'),
    config = require('../../config/config'),
    serviceJoinDAO = require('../dao/serviceJoin').serviceJoinDAO;
let serviceJoinLogic = {};

//上传文件
serviceJoinLogic.upload = async (ctx) => {
    const idNumber = urlParse.parse(ctx.req.url).pathname.replace("/", "").split("/")[2];
    const serverPath = `./dist/upload/${idNumber}/`;
    if (util.isEmptyValue("serviceJoinLogic.upload", {
            idNumber: idNumber
        })) {
        ctx.body = {
            code: 500,
            msg: "error",
            error: "idNumber不能为空"
        };
    } else {
        try {
            const result = await util.uploadFile(ctx, {
                filePath: `/upload/${idNumber}/`,
                serverPath: serverPath
            })
            ctx.body = {
                code: 200,
                msg: "success",
                filePath: result.filePath,
                fileName: result.fileName
            }
        } catch (err) {
            log4js.error(err);
            ctx.body = {
                code: 500,
                msg: "error",
                error: err
            };
        }
    }
}
//下载文件
serviceJoinLogic.download = async (ctx) => {
    const filePath = ctx.query.filePath,
        type = ctx.query.type || "";
    if (util.isEmptyValue("serviceJoinLogic.download", {
            filePath: filePath
        })) {
        ctx.body = {
            code: 500,
            msg: "error",
            error: "filePath不能为空"
        };
    } else {
        let path;
        if (type) {
            path = "./download/申请函范例下载.jpg";
        } else {
            path = "./dist" + filePath;
        }
        ctx.attachment(path);
        try {
            await send(ctx, path);
        } catch (err) {
            log4js.error(err);
            ctx.body = {
                code: 500,
                msg: "error",
                error: err
            };
        }
    }
}
//添加服务
serviceJoinLogic.addService = async (ctx) => {
    let conditions = ctx.request.body;
    if (util.isEmptyValue("serviceJoinLogic.addService", {
            openID: conditions.openID,
            idNumber: conditions.idNumber
        })) {
        ctx.body = {
            code: 500,
            msg: "error",
            error: "openID、idNumber不能为空"
        };
    } else {
        try {
            let checkName = await serviceJoinDAO.get({
                serviceName: conditions.serviceName,
                openID: conditions.openID,
                reviewState: {$in: [1, 3, 4]}
            });
            let checkidNumber = await serviceJoinDAO.get({idNumber: conditions.idNumber});
            if (checkName.dataCount > 0 || checkidNumber.dataCount > 0) {
                ctx.body = {
                    code: 500,
                    msg: "exist",
                    results: {
                        serviceName: checkName.dataCount > 0 ? true : false,
                        idNumber: checkidNumber.dataCount > 0 ? true : false
                    }
                };
            } else {
                if(!_.isEmpty(conditions.logo)){
                    let logo = await util.uploadToOss(conditions.logo);
                    conditions.logo = logo.filePath;
                }
                if(!_.isEmpty(conditions.guide)){
                    let guide = await util.uploadToOss(conditions.guide);
                    conditions.guide = guide.filePath;
                }
                if(!_.isEmpty(conditions.testReport)){
                    let testReport = await util.uploadToOss(conditions.testReport);
                    conditions.testReport = testReport.filePath;
                }
                let results = await serviceJoinDAO.add(conditions);
                let deleteFolder = await util.deleteFolder(`./dist/upload/${conditions.idNumber}`);
                ctx.body = {
                    code: 200,
                    msg: "success",
                    results: results
                };
            }
        } catch (err) {
            log4js.error(err);
            ctx.body = {
                code: 500,
                msg: "error",
                error: err
            };
        }
    }
};
//修改服务审批状态
serviceJoinLogic.modifyService = async (ctx) => {
    let body = ctx.request.body;
    let query = body.query;
    let modifyField = body.modifyField;
    if (util.isEmptyValue("serviceJoinLogic.modifyService", {
            query: body.query,
            modifyField: body.modifyField
        })) {
        ctx.body = {
            code: 500,
            msg: "error",
            error: "query、modifyField不能为空"
        };
    } else {
        try {
            if(!_.isEmpty(modifyField.logo) && modifyField.logo.indexOf(config.oss.bucket)<0){
                let logo = await util.uploadToOss(modifyField.logo);
                modifyField.logo = logo.filePath;
            }
            if(!_.isEmpty(modifyField.guide) && modifyField.guide.indexOf(config.oss.bucket)<0){
                let guide = await util.uploadToOss(modifyField.guide);
                modifyField.guide = guide.filePath;
            }
            if(!_.isEmpty(modifyField.testReport) && modifyField.testReport.indexOf(config.oss.bucket)<0){
                let testReport = await util.uploadToOss(modifyField.testReport);
                modifyField.testReport = testReport.filePath;
            }
            let results = await serviceJoinDAO.modify(query, modifyField);
            let deleteFolder = await util.deleteFolder(`./dist/upload/${query.idNumber}`);
            ctx.body = {
                code: 200,
                msg: "success",
                results: results
            };
        } catch (err) {
            log4js.error(err);
            ctx.body = {
                code: 500,
                msg: "error",
                error: err
            };
        }
    }
};
//按顺序分页获取、查询数据
serviceJoinLogic.getServiceList = async (ctx) => {
    const body = ctx.request.body;
    let query = body.query;
    if (util.isEmptyValue("serviceJoinLogic.getServiceList", {
            openID: query.openID
        })) {
        ctx.body = {
            code: 500,
            msg: "error",
            error: "openID不能为空"
        };
    } else {
        let options = {
            sort: body.sort || {createDate: -1},
            skip: (body.page - 1) * body.rows || 0,
            limit: body.rows || 10
        };
        try {
            let results = await serviceJoinDAO.get(query, options);
            ctx.body = {
                code: 200,
                msg: "success",
                results: results
            };
        } catch (err) {
            log4js.error(err);
            ctx.body = {
                code: 500,
                msg: "error",
                error: err
            };
        }
    }
};
//模糊查询
serviceJoinLogic.searchByKwd = async (ctx) => {
    let body = ctx.request.body;
    if (util.isEmptyValue("serviceJoinLogic.searchByKwd", {
            openID: body.openID
        })) {
        ctx.body = {
            msg: "error",
            error: "openID不能为空"
        };
    } else {
        let query = {
                openID: body.openID
            },
            option = {
                sort: body.sort || {createDate: -1},
                skip: (body.page - 1) * body.rows || 0,
                limit: body.rows || 10
            };
        if (body.reviewState != 0) {
            query = _.extend(query, {reviewState: body.reviewState})
        }
        if (body.keyword) {
            query = _.extend(query, {serviceName: new RegExp(body.keyword)})
        }
        try {
            let results = await serviceJoinDAO.get(query, option);
            ctx.body = {
                code: 200,
                msg: "success",
                results: results
            };
        } catch (err) {
            log4js.error(err);
            ctx.body = {
                code: 500,
                msg: "error",
                error: err
            };
        }
    }
};
//根据idNumber获取单条数据
serviceJoinLogic.getByID = async (ctx) => {
    const idNumber = ctx.request.body.idNumber;
    if (util.isEmptyValue("serviceJoinLogic.getByID", {
            idNumber: idNumber
        })) {
        ctx.body = {
            code: 500,
            msg: "error",
            error: "idNumber不能为空"
        };
    } else {
        try {
            let results = await serviceJoinDAO.get({idNumber: idNumber});
            ctx.body = {
                code: 200,
                msg: "success",
                results: results
            };
        } catch (err) {
            log4js.error(err);
            ctx.body = {
                code: 500,
                msg: "error",
                error: err
            };
        }
    }
}
//校验服务名称的唯一性
serviceJoinLogic.checkOnlyOne = async (ctx) => {
    const query = ctx.request.body;
    if (util.isEmptyValue("serviceJoinLogic.checkOnlyOne", {
            openID: query.openID,
            serviceName: query.serviceName
        })) {
        ctx.body = {
            msg: "error",
            error: "openID、serviceName不能为空"
        };
    } else {
        try {
            let results = await serviceJoinDAO.get(_.extend(query,{reviewState:{$in:[1,3,4]}}));
            ctx.body = {
                code: 200,
                msg: "success",
                results: results
            };
        } catch (err) {
            log4js.error(err);
            ctx.body = {
                msg: "error",
                error: err
            };
        }
    }
};

exports.serviceJoinLogic = serviceJoinLogic;