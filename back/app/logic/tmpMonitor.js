const urlParse = require('url'),
    moment = require('moment'),
    _ = require('underscore'),
    log4js = require('../util/log4j'),
    util = require('../util/util'),
    tmpMonitorDAO = require('../dao/tmpMonitor').tmpMonitorDAO;

let tmpMonitorService = {};
// 查找所有的模板信息
tmpMonitorService.lookupTemplate = async(ctx) => {
    let paramter = {
        domain: ctx.request.body.domain,
        status: ctx.request.body.status
    };
    const flag = util.isEmptyValue("tmpMonitorService.lookupTemplate", paramter);
    if (flag) {
        ctx.body = {"msg": "缺少关键字段，参数不能为空", "code": 500}
        return;
    }
    ;
    //数据存入数据库
    try {
        const dataUser = await tmpMonitorDAO.lookUp(paramter);
        if (dataUser) {
            ctx.body = {dataUser, "code": 200};
        } else {
            ctx.body = {"msg": "数据操作失败", "code": 500}
        }
    } catch (err) {
        log4js.error(err);
        ctx.body = {
            code: 500,
            msg: err
        };
    }
};
//添加服务监控
tmpMonitorService.addTmpMonitor = async(ctx)=> {
    let conditions = ctx.request.body;
    const paramter = {
        templateID: ctx.request.body.templateID,//模板ID（主key，全表唯一）
        userID: ctx.request.body.userID,//用户ID
        domain: ctx.request.body.domain,
        templateName: ctx.request.body.templateName,//模板名称
        isStart: ctx.request.body.isStart,//是否启用
        type: ctx.request.body.type,
        monitorFreq: ctx.request.body.monitorFreq,//监控频率(时间间隔)
        alarmFreq: ctx.request.body.alarmFreq//报警频率(时间间隔，单位为分钟)
    }
    const flag = util.isEmptyValue("tmpMonitorService.addTmpMonitor", paramter);
    if (flag) {
        ctx.body = {"msg": "缺少关键字段，参数不能为空", "code": 500}
        return;
    }
    ;
    try {
        let checkName = await tmpMonitorDAO.lookTemplate({
            templateName: conditions.templateName,
            domain: conditions.domain
        });
        let checkID = await tmpMonitorDAO.lookTemplate({templateID: conditions.templateID, domain: conditions.domain});
        if (checkName.dataCount > 0 || checkID.dataCount > 0) {
            ctx.body = {
                msg: "exist",
                results: {
                    name: checkName.dataCount > 0 ? true : false,
                    tempID: checkID.dataCount > 0 ? true : false
                }
            };
        } else {
            //数据存入数据库
            const dataUser = await tmpMonitorDAO.add(conditions);
            if (dataUser) {
                ctx.body = {"msg": "数据保存成功", "code": 200}
            } else {
                ctx.body = {"msg": "数据操作失败", "code": 500}
            }
        }
    } catch (err) {
        log4js.error(err);
        ctx.body = {
            code: 500,
            msg: err
        };
    }
};
/*
 *获取服务监控列表
 */
tmpMonitorService.getTmpMonitor = async(ctx) => {
    let paramter = {
        domain: ctx.request.body.query.domain,
        sort: ctx.request.body.sort,//
        page: ctx.request.body.page,//当前页数
        rows: ctx.request.body.rows//每页显示几条
    };
    const flag = util.isEmptyValue("tmpMonitorService.getTmpMonitor", paramter);
    if (flag) {
        ctx.body = {"msg": "缺少关键字段，参数不能为空", "code": 500}
        return;
    }
    ;
    let options = {
        sort: ctx.request.body.sort || {isStart: -1, statusCode: -1, time: -1},
        skip: (ctx.request.body.page - 1) * ctx.request.body.rows || 0,
        limit: ctx.request.body.rows || 10
    };
    try {
        //获取服务监控列表
        const dataUser = await tmpMonitorDAO.lookTemplate({domain: paramter.domain}, options);
        if (dataUser) {
            ctx.body = {dataUser, "code": 200}
        } else {
            ctx.body = {"msg": "数据操作失败", "code": 500}
        }
    } catch (err) {
        log4js.error(err);
        ctx.body = {
            code: 500,
            msg: err
        };
    }
};
/*
 *模糊查询
 */
tmpMonitorService.searchTmpMonitor = async(ctx) => {
    let body = ctx.request.body;
    if (util.isEmptyValue("tmpMonitorService.searchTmpMonitor", {
            domain: body.domain
        })) {
        ctx.body = {
            error: "domain不能为空"
        };
    } else {
        let query = {
                domain: body.domain,
                $or: [{templateName: new RegExp(body.keyword)},
                    {templateID: new RegExp(body.keyword)}]
            },
            option = {
                sort: body.sort || {isStart: -1, statusCode: -1, time: -1},//排序  statusCode 先按正常 异常排序， 再按创建时间排 倒叙
                skip: (body.page - 1) * body.rows || 0,
                limit: body.rows || 10
            };
        if (body.status == 1) {//异常
            query = _.extend(query, {statusCode: {$nin: ["000000", "0"]}, isStart: true})
        } else if (body.status == 2) {//正常
            query = _.extend(query, {statusCode: "000000", isStart: true})
        } else if (body.status == 3) {//未启用
            query = _.extend(query, {isStart: false})
        } else if (body.status == 4) {//已启用
            query = _.extend(query, {statusCode: "0", isStart: true})
        }
        try {
            let dataUser = await tmpMonitorDAO.lookTemplate(query, option);
            ctx.body = {
                msg: "success",
                "code": 200,
                dataUser
            };
        } catch (err) {
            log4js.error(err);
            ctx.body = {
                code: 500,
                msg: err
            };
        }
    }
};
//删除服务监控（支持批量）
tmpMonitorService.deleteMonitor = async(ctx) => {
    if (util.isEmptyValue("tmpMonitorService.deleteMonitor", {templateID: ctx.request.body.templateID})) {
        ctx.body = {
            error: "templateID不能为空"
        };
    } else {
        let queryArray = ctx.request.body.templateID;
        let hasStart;
        try {
            await Promise.all(queryArray.map(async function (item) {
                let tmpMonitor = await tmpMonitorDAO.getOne({templateID: item});
                if (tmpMonitor.isStart == true) {
                    hasStart = true;
                    return;
                }
            }));
            if (hasStart) {
                ctx.body = {
                    msg: "hasStart"
                };
            } else {
                if (ctx.request.body.isDelete) {
                    await Promise.all(queryArray.map(async function (item) {
                        await tmpMonitorDAO.delete({templateID: item});
                    }));
                    ctx.body = {
                        msg: "success"
                    };
                } else {
                    ctx.body = {
                        msg: "noStart"
                    };
                }
            }
        } catch (err) {
            log4js.error(err);
            ctx.body = {
                code: 500,
                msg: err
            };
        }
    }
};
//启用/停止监控（支持批量）
tmpMonitorService.startOrStop = async(ctx) => {
    if (util.isEmptyValue("tmpMonitorService.startOrStop", {templateID: ctx.request.body.templateID})) {
        ctx.body = {
            error: "templateID不能为空"
        };
    } else {
        let queryArray = ctx.request.body.templateID, modifyFields, updateArray = [];
        if (ctx.request.body.isStart == true) {
            modifyFields = {
                statusCode: "0",
                isStart: true,
                startDate: moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
                nextTime: new Date().getHours() + 1 >= 24 ? 0 : new Date().getHours() + 1
            };
        } else {
            modifyFields = {
                statusCode: "0",
                isStart: false,
                startDate: moment().format('YYYY-MM-DD HH:mm:ss')
            };
        }
        try {
            await Promise.all(queryArray.map(async function (item) {
                let tmpMonitor = await tmpMonitorDAO.getOne({templateID: item});
                if (tmpMonitor && (tmpMonitor.isStart != modifyFields.isStart)) {
                    updateArray.push({
                        updateOne: {
                            filter: {templateID: tmpMonitor.templateID},
                            update: {$set: modifyFields}
                        }
                    });
                }
            }));
            await tmpMonitorDAO.batchUpdate(updateArray);
            ctx.body = {
                msg: "success",
                code: 200
            };
        } catch (err) {
            log4js.error(err);
            ctx.body = {
                code: 500,
                msg: err
            };
        }
    }
};

//修改监控模板
tmpMonitorService.getModifyTmpMonitorID = async(ctx) => {
    let paramter = {
        templateID: ctx.request.body.templateID
    };
    if (util.isEmptyValue("tmpMonitorService.modifyTmpMonitorID", paramter)) {
        ctx.body = {
            error: "templateID不能为空"
        };
    } else {
        try {
            let dataUser = await tmpMonitorDAO.lookTemplate(paramter);
            ctx.body = {
                msg: "success",
                dataUser,
                code: "200"
            };
        } catch (err) {
            log4js.error(err);
            ctx.body = {
                code: 500,
                msg: err
            };
        }
    }
};
tmpMonitorService.modifyTmpMonitorID = async(ctx) => {
    let body = ctx.request.body;
    if (util.isEmptyValue("tmpMonitorService.modifyTmpMonitorID", {templateID: body.templateID})) {
        ctx.body = {
            error: "templateID不能为空"
        };
    } else {
        let query = {templateID: body.templateID, domain: body.domain, templateName: body.templateName},
            modify = {
                statusCode: "0",
                type: body.type,
                monitorFreq: body.monitorFreq,
                alarmFreq: body.alarmFreq,
                isStart: body.isStart,
                startDate: moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
                nextTime: new Date().getHours() + 1 >= 24 ? 0 : new Date().getHours() + 1
            };
        try {
            let results = await tmpMonitorDAO.modify(query, modify);
            ctx.body = {
                msg: "success",
                results: results
            };
        } catch (err) {
            log4js.error(err);
            ctx.body = {
                msg: "error",
                msg: err
            };
        }
    }
};

exports.tmpMonitorService = tmpMonitorService;