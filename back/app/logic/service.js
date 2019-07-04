const moment = require('moment'),
    _ = require('underscore'),
    log4js = require('../util/log4j'),
    urlParse = require('url'),
    util = require('../util/util'),
    config = require('../../config/config'),
    serviceDAO = require('../dao/service').serviceDAO;
let serviceLogic = {};
serviceLogic.search = async(ctx) => {
    let params = ctx.request.query;
    const conditions = {
        city: {$in: ["all", new RegExp(params.cityID), new RegExp(params.cityID.substring(0, 2) + "0000")]},
        serviceName: new RegExp(params.keyword),
        online: true
    };
    try {
        let serviceInfo = await serviceDAO.get(conditions);
        let serviceList = [], localUrl = config.localUrl;
        serviceInfo.forEach((item) => {
            serviceList.push({
                serviceName: item.serviceName,
                serviceID: item.serviceID,
                url: localUrl + item.url,
                logo: localUrl + item.logo,
                index: item.index
            });
        });
        const results = {
            count: serviceList.length,
            serviceList: serviceList
        };
        ctx.body = {
            results: results,
            code: 200,
            msg: "success"
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
serviceLogic.getServiceList = async(ctx) => {
    const options = {
        sort: ctx.request.body.sort || {index: -1},
        skip: (ctx.request.body.page - 1) * ctx.request.body.rows || 0,
        limit: ctx.request.body.rows || 10
    };
    try {
        const results = await serviceDAO.getList(ctx.request.body.query, ctx.request.body.all ? {} : options);
        ctx.body = {
            code: 200,
            msg: "success",
            results: results
        }
    } catch (e) {
        log4js.error(e);
        ctx.body = {
            code: 500,
            msg: "error",
            error: "获取service服务列表失败！"
        }
    }
}
serviceLogic.addService = async(ctx) => {
    let conditions = ctx.request.body;
    if (util.isEmptyValue("serviceLogic.addService", {
            serviceID: conditions.serviceID
        })) {
        ctx.body = {
            code: 500,
            msg: "error",
            error: "serviceID不能为空"
        };
    } else {
        try {
            let logoUrl = conditions.logo,
                exampleUrl = conditions.example.split(","),
                defaultPath = conditions.serviceID + '/default/',
                examplePath = conditions.serviceID + '/detail/',
                exampleUrl_delete = '';
            let checkExist = await serviceDAO.get({serviceID: conditions.serviceID});
            if (_.isEmpty(checkExist)) {
                if(logoUrl.indexOf(config.oss.bucket) < 0){
                    conditions.logo =  await util.uploadToOss(logoUrl, defaultPath);
                }
                conditions.example = '';
                for(let i = 0; i < exampleUrl.length-1; i++){
                    if(exampleUrl[i].indexOf(config.oss.bucket) < 0){
                        conditions.example +=  await util.uploadToOss(exampleUrl[i], examplePath) + ",";
                        exampleUrl_delete = exampleUrl[i].split("/")[2]
                    }else{
                        conditions.example += exampleUrl[i] + ","
                    }
                }
                // if(exampleUrl.indexOf(config.oss.bucket) < 0){
                //     conditions.example =  await util.uploadToOss(exampleUrl, examplePath);
                // }
                let insertData = {
                    serviceID: conditions.serviceID,
                    serviceName: conditions.serviceName,
                    city: conditions.city,
                    logo: conditions.logo,
                    url: conditions.url,
                    online: conditions.online,
                    summary: conditions.summary,
                    index: conditions.index,
                    price: 200,
                    saleNum: 0,
                    markNum: 0,
                    serviceType: 2,
                    deadline: conditions.deadline,
                    detail: conditions.detail,
                    example: conditions.example.substr(0, conditions.example.length-1),
                    relief: conditions.relief,
                    templateID: conditions.templateID,
                    serviceSource: conditions.serviceSource,
                    createDate: moment().format('YYYY-MM-DD HH:mm:ss')
                };
                await serviceDAO.add(insertData);
                await util.deleteFolder(`./dist/upload/${logoUrl.split("/")[2]}`);
                await util.deleteFolder(`./dist/upload/${exampleUrl_delete}`);
                ctx.body = {
                    code: 200,
                    msg: "success"
                };
            }else{
                ctx.body = {
                    code: 500,
                    msg: "exist"
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
}
serviceLogic.modifyService = async(ctx) => {
    let conditions = ctx.request.body;
    if (util.isEmptyValue("serviceLogic.modifyService", {
            serviceID: conditions.serviceID
        })) {
        ctx.body = {
            code: 500,
            msg: "error",
            error: "serviceID不能为空"
        };
    } else {
        try {
            let logoUrl = conditions.modifyFields.logo,
                exampleUrl = conditions.modifyFields.example.split(","),
                defaultPath = conditions.serviceID + '/default/',
                examplePath = conditions.serviceID + '/detail/',
                exampleUrl_delete = '';
            if(logoUrl.indexOf(config.oss.bucket) < 0){
                conditions.modifyFields.logo =  await util.uploadToOss(logoUrl, defaultPath);
            }
            conditions.modifyFields.example = '';
            for(let i = 0; i < exampleUrl.length-1; i++){
                if(exampleUrl[i].indexOf(config.oss.bucket) < 0){
                    conditions.modifyFields.example +=  await util.uploadToOss(exampleUrl[i], examplePath) + ",";
                    exampleUrl_delete = exampleUrl[i].split("/")[2]
                }else{
                    conditions.modifyFields.example += exampleUrl[i] + ","
                }
            }
            if(conditions.modifyFields.example){
                conditions.modifyFields.example = conditions.modifyFields.example.substr(0, conditions.modifyFields.example.length-1)
            }
            if(conditions.modifyFields.price){
                conditions.modifyFields.price = Number(conditions.modifyFields.price)
            }
            await serviceDAO.modify({serviceID: conditions.serviceID}, conditions.modifyFields);
            if(logoUrl.indexOf(config.oss.bucket) < 0){
                await util.deleteFolder(`./dist/upload/${logoUrl.split("/")[2]}`);
            }
            if(exampleUrl_delete){
                await util.deleteFolder(`./dist/upload/${exampleUrl_delete}`);
            }
            ctx.body = {
                code: 200,
                msg: "success"
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
serviceLogic.searchByName = async(ctx) => {
    let conditions = ctx.request.body;
    // if (util.isEmptyValue("serviceLogic.searchByName", {
    //         serviceID: conditions.keyword
    //     })) {
    //     ctx.body = {
    //         code: 500,
    //         msg: "error",
    //         error: "keyword不能为空"
    //     };
    // } else {
        try {
            const options = {
                sort: ctx.request.body.sort || {index: -1},
                skip: (ctx.request.body.page - 1) * ctx.request.body.rows || 0,
                limit: ctx.request.body.rows || 10
            };
            let results = await serviceDAO.getList({serviceName: new RegExp(conditions.keyword)}, options);
            ctx.body = {
                code: 200,
                results: results,
                msg: "success"
            };
        } catch (err) {
            log4js.error(err);
            ctx.body = {
                code: 500,
                msg: "error",
                error: err
            };
        }
    // }
}

//上传文件
serviceLogic.upload = async (ctx) => {
    const logoKey = urlParse.parse(ctx.req.url).pathname.replace("/", "").split("/")[2];
    const serverPath = `./dist/upload/${logoKey}/`;
    if (util.isEmptyValue("serviceLogic.upload", {
            logoKey: logoKey
        })) {
        ctx.body = {
            code: 500,
            msg: "error",
            error: "logoKey不能为空"
        };
    } else {
        try {
            const result = await util.uploadFile(ctx, {
                filePath: `/upload/${logoKey}/`,
                serverPath: serverPath
            });
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
exports.serviceLogic = serviceLogic;
