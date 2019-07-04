const moment = require('moment'),
    _ = require('underscore'),
    log4js = require('../util/log4j'),
    util = require('../util/util'),
    originDAO = require('../dao/origin').originDAO;

let originService = {};

//添加服务监控
originService.addMonitor = async(ctx)=> {
    let conditions = ctx.request.body;
    if (util.isEmptyValue("originService.addMonitor", {
            domain: conditions.domain,
            userID: conditions.userID,
            originUrl: conditions.originUrl,
            originName: conditions.originName
        })) {
        ctx.body = {
            msg: "error",
            error: "domain、userID、originUrl和originName不能为空"
        };
    } else {
        try {
            // conditions.originID = util.md5(conditions.domain + conditions.originUrl);
            let checkName = await originDAO.get({originName: conditions.originName, domain: conditions.domain});
            let checkUrl = await originDAO.get({originUrl: conditions.originUrl, domain: conditions.domain});
            if (checkName.dataCount > 0 || checkUrl.dataCount > 0) {
                ctx.body = {
                    msg: "exist",
                    results: {
                        name: checkName.dataCount > 0 ? true : false,
                        url: checkUrl.dataCount > 0 ? true : false
                    }
                };
            } else {
                let results = await originDAO.add(conditions);
                ctx.body = {
                    msg: "success",
                    results: results
                };
            }
        } catch (err) {
            log4js.error(err);
            ctx.body = {
                msg: "error",
                error: err
            };
        }

    }
};
//修改监控服务信息
originService.modifyMonitor = async(ctx) => {
    let body = ctx.request.body;
    if (util.isEmptyValue("originService.modifyMonitor", {originID: body.originID})) {
        ctx.body = {
            msg: "error",
            error: "originID不能为空"
        };
    } else {
        let query = {_id: body.originID},
            modify = {
                statusCode: 1,
                originName: body.originName,
                originUrl: body.originUrl,
                type: body.type,
                monitorFreq: body.monitorFreq,
                alarmFreq: body.alarmFreq,
                isStart: body.isStart,
                startDate: moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
                nextTime: new Date().getHours() + 1 >= 24 ? 0 : new Date().getHours() + 1
            };
        try {
            let results = await originDAO.modify(query, modify);
            ctx.body = {
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
//删除服务监控（支持批量）
originService.deleteMonitor = async(ctx) => {
    if (util.isEmptyValue("originService.deleteMonitor", {originID: ctx.request.body.originID})) {
        ctx.body = {
            msg: "error",
            error: "originID不能为空"
        };
    } else {
        let queryArray = ctx.request.body.originID;
        let hasStart;
        try {
            await Promise.all(queryArray.map(async function (item) {
                let origin = await originDAO.getOne({_id: item});
                if (origin.isStart == true) {
                    hasStart = true;
                    return;
                }
            }));
            if (hasStart) {
                ctx.body = {
                    msg: "hasStart"
                };
            } else {
                if(ctx.request.body.isDelete){
                    await Promise.all(queryArray.map(async function (item) {
                        await originDAO.delete({_id: item});
                    }));
                    ctx.body = {
                        msg: "success"
                    };
                }else{
                    ctx.body = {
                        msg: "noStart"
                    };
                }
            }
        } catch (err) {
            log4js.error(err);
            ctx.body = {
                msg: "error",
                error: err
            };
        }
    }
};
//启用/停止监控（支持批量）
originService.startOrStop = async(ctx) => {
    if (util.isEmptyValue("originService.startOrStop", {originID: ctx.request.body.originID})) {
        ctx.body = {
            msg: "error",
            error: "originID不能为空"
        };
    } else {
        let queryArray = ctx.request.body.originID, modifyFields, updateArray = [];
        if (ctx.request.body.isStart == true) {
            modifyFields = {
                statusCode: 1,
                isStart: true,
                startDate: moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
                nextTime: new Date().getHours() + 1 >= 24 ? 0 : new Date().getHours() + 1
            };
        } else {
            modifyFields = {
                statusCode: 1,
                isStart: false,
                startDate: moment().format('YYYY-MM-DD HH:mm:ss')
            };
        }
        try {
            await Promise.all(queryArray.map(async function (item) {
                let origin = await originDAO.getOne({_id: item});
                if (origin && (origin.isStart != modifyFields.isStart)) {
                    updateArray.push({
                        updateOne: {
                            filter: {_id: origin._id},
                            update: {$set: modifyFields}
                        }
                    });
                }
            }));
            await originDAO.batchUpdate(updateArray);
            ctx.body = {
                msg: "success"
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
//按顺序分页获取、查询数据
originService.getMonitorList = async(ctx) => {
    const body = ctx.request.body;
    let query = body.query;
    if (util.isEmptyValue("originService.getMonitorList", {
            domain: query.domain
        })) {
        ctx.body = {
            msg: "error",
            error: "domain不能为空"
        };
    } else {
        let options = {
            sort: body.sort || {isStart: -1,statusCode: -1, time: -1},
            skip: (body.page - 1) * body.rows || 0,
            limit: body.rows || 10
        };
        try {
            let results = await originDAO.get(query, options);
            ctx.body = {
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
//模糊查询
originService.searchByKwd = async(ctx) => {
    let body = ctx.request.body;
    if (util.isEmptyValue("originService.searchByKwd", {
            domain: body.domain
        })) {
        ctx.body = {
            msg: "error",
            error: "domain不能为空"
        };
    } else {
        let query = {
                domain: body.domain,
                $or: [{originName: new RegExp(body.keyword)},
                    {originUrl: new RegExp(body.keyword)}]
            },
            option = {
                sort: body.sort || {isStart: -1, statusCode: -1, time: -1},
                skip: (body.page - 1) * body.rows || 0,
                limit: body.rows || 10
            };
        if (body.status == 1) {//异常
            query = _.extend(query, {statusCode: {$nin: [200, 1]}, isStart: true})
        } else if (body.status == 2) {//正常
            query = _.extend(query, {statusCode: 200, isStart: true})
        } else if (body.status == 3) {//未启用
            query = _.extend(query, {isStart: false})
        } else if (body.status == 4) {//已启用
            query = _.extend(query, {statusCode: 1, isStart: true})
        } 
        try {
            let results = await originDAO.get(query, option);
            ctx.body = {
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
//校验监控名和监控地址的唯一性
originService.checkOnlyOne = async(ctx) => {
    const query = ctx.request.body;
    if (util.isEmptyValue("originService.checkOnlyOne", {
            domain: query.domain
        })) {
        ctx.body = {
            msg: "error",
            error: "domain不能为空"
        };
    } else {
        try {
            let results = await originDAO.get(query);
            ctx.body = {
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
//根据id获取单条数据
originService.getByID = async(ctx) => {
    const originID = ctx.request.body.originID;
    if (util.isEmptyValue("originService.getByID", {
            originID: originID
        })) {
        ctx.body = {
            msg: "error",
            error: "originID不能为空"
        };
    } else {
        try {
            let results = await originDAO.get({_id: originID});
            ctx.body = {
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
}
exports.originService = originService;