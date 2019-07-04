const moment = require('moment'),
    _ = require('underscore'),
    urlParse = require('url'),
    log4js = require('../util/log4j'),
    util = require('../util/util'),
    config = require('../../config/config'),
    userServiceDAO = require('../dao/userService').userServiceDAO,
    userInformationDAO = require('../dao/userInformation').userInformationDAO;
let userServiceLogic = {};
userServiceLogic.addService = async (ctx) => {
    let conditions = ctx.request.body;
    if (util.isEmptyValue("userServiceLogic.addService", {
            serviceID: conditions.serviceID,
            localFrom: conditions.localFrom
        })) {
        ctx.body = {
            code: 500,
            msg: "error",
            error: "serviceID、localFrom不能为空"
        };
    } else {
        try {
            let logoUrl = conditions.logo,
                hotLogoUrl = conditions.hotLogo,
                ossPath = conditions.serviceID + '/' + conditions.localFrom;
            let checkExist1 = await userServiceDAO.get({
                serviceID: conditions.serviceID,
                localFrom: conditions.localFrom
            });
            // let checkExist2 = await serviceDAO.get({serviceID: conditions.serviceID});
            if (_.isEmpty(checkExist1.dataList)) {
                conditions.logo = await util.uploadToOss(logoUrl, ossPath + "/logo/");
                conditions.hotLogo = await util.uploadToOss(hotLogoUrl, ossPath + "/hotLogo/");
                let insertData = {
                    serviceID: conditions.serviceID,
                    serviceName: conditions.serviceName,
                    city: conditions.city,
                    logo: conditions.logo,
                    hotLogo: conditions.hotLogo,
                    url: conditions.url,
                    index: conditions.index,
                    online: conditions.online,
                    summary: conditions.summary,
                    localFrom: conditions.localFrom,
                    templateID: conditions.templateID,
                    openID : conditions.openID,
                    serviceType : conditions.serviceType,
                    useFor : conditions.useFor,
                    useForAddress : conditions.useForAddress,
                    createDate: moment().format('YYYY-MM-DD HH:mm:ss')
                };
                await userServiceDAO.add(insertData);
                await util.deleteFolder(`./dist/upload/${logoUrl.split("/")[2]}`);
                await util.deleteFolder(`./dist/upload/${hotLogoUrl.split("/")[2]}`);
                ctx.body = {
                    code: 200,
                    msg: "success"
                };
            } else {
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
userServiceLogic.getServiceList = async (ctx) => {
    const options = {
        sort: ctx.request.body.sort || {index: -1},
        skip: (ctx.request.body.page - 1) * ctx.request.body.rows || 0,
        limit: ctx.request.body.rows || 10
    };
    try {
        const results = await userServiceDAO.get(ctx.request.body.query, ctx.request.body.all ? {} : options);
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
            error: "获取userService服务列表失败！"
        }
    }
}
userServiceLogic.modifyService = async (ctx) => {
    let conditions = ctx.request.body;
    if (util.isEmptyValue("userServiceLogic.modifyService", {
            serviceID: conditions.serviceID,
            localFrom: conditions.localFrom
        })) {
        ctx.body = {
            code: 500,
            msg: "error",
            error: "serviceID、localFrom不能为空"
        };
    } else {
        try {
            let logoUrl = conditions.modifyFields.logo,
                hotLogoUrl = conditions.modifyFields.hotLogo,
                ossPath = conditions.serviceID + '/' + conditions.localFrom;
            if (logoUrl.indexOf(config.oss.bucket) < 0) {
                conditions.modifyFields.logo = await util.uploadToOss(logoUrl, ossPath + "/logo/");
            }
            if (hotLogoUrl) {
                if (hotLogoUrl.indexOf(config.oss.bucket) < 0) {
                    conditions.modifyFields.hotLogo = await util.uploadToOss(hotLogoUrl, ossPath + "/hotLogo/");
                }
            }
            await userServiceDAO.modify({
                serviceID: conditions.serviceID,
                localFrom: conditions.localFrom
            }, conditions.modifyFields);
            if (logoUrl.indexOf(config.oss.bucket) < 0) {
                await util.deleteFolder(`./dist/upload/${logoUrl.split("/")[2]}`);
            }
            if (hotLogoUrl) {
                if (hotLogoUrl.indexOf(config.oss.bucket) < 0) {
                    await util.deleteFolder(`./dist/upload/${hotLogoUrl.split("/")[2]}`);
                }
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
userServiceLogic.searchByName = async (ctx) => {
    let conditions = ctx.request.body;
    // if (util.isEmptyValue("userServiceLogic.searchByName", {
    //         keyword: conditions.keyword
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
        let results = await userServiceDAO.get({
            serviceName: new RegExp(conditions.keyword),
            openID: new RegExp(conditions.openID)
        }, options);
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
userServiceLogic.upload = async (ctx) => {
    const logoKey = urlParse.parse(ctx.req.url).pathname.replace("/", "").split("/")[2];
    const serverPath = `./dist/upload/${logoKey}/`;
    if (util.isEmptyValue("userServiceLogic.upload", {
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

userServiceLogic.getLocalFrom = async (ctx) => {
    const query = {
        "confirmStatus": ctx.request.body.confirmStatus
    }
    try {
        let results = await userInformationDAO.getUserByQuery(query);
        let localArr = [];
        localArr.push({"openID": "ucap", "name": "ucap"});
        results.forEach((item, index) => {
            localArr.push({"openID": item.openID, "name": item.name});
        });
        ctx.body = {
            code: 200,
            msg: "success",
            results: localArr
        };
    } catch (e) {
        log4js.error(e);
        ctx.body = {
            code: 500,
            msg: "error",
            error: "获取userService服务失败！"
        }
    }
}
exports.userServiceLogic = userServiceLogic;
