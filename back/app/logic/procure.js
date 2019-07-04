const moment = require('moment'),
    _ = require('underscore'),
    log4js = require('../util/log4j'),
    util = require('../util/util'),
    procureDao = require('../dao/procure').procureDAO,
    userServiceDAO = require('../dao/userService').userServiceDAO;

let procureService = {};
procureService.getProcureMan = async (ctx) => {
    let data = {
        pageSize: ctx.request.body.pageSize,
        pageNum: ctx.request.body.pageNum,
    }

    if (util.isEmptyValue("buildEntCertificateCon.buildEntCertificate", data)) {
        ctx.body = {code: 500, "msg": "请求参数不完整，请检查！"};
    } else {
        let procureQuery = [], procureQueryAll = [], serviceQueryAll = [], serviceQuery = [], serviceAgain = {},
            procureAgain = {}, limit = '', skip = '', sort = {applyTime: -1};
        data.status = Number(ctx.request.body.status);  //0 全部 1 待审核 2 通过 3未通过 4已撤销
        data.key = ctx.request.body.key;    //单位名称或联系人
        data.serviceType = ctx.request.body.serviceType;
        data.city = ctx.request.body.city;
        console.log(typeof data.status);
        if (data.status) {
            procureQuery.push({'status': data.status});
            procureAgain.status = data.status;
        } else {
            procureQuery.push({});
        }

        if (data.key) {
            procureQueryAll.push({'contactName': new RegExp(data.key)});
            serviceQueryAll.push({'serviceName': new RegExp(data.key)});
        } else {
            procureQueryAll.push({});
            serviceQueryAll.push({});
        }
        if (data.serviceType) {
            serviceQuery.push({serviceID: new RegExp('^'+data.serviceType)});
            serviceAgain.serviceID = new RegExp('^'+data.serviceType);
        }
        if (data.city) {
            // serviceQuery.push({city:{'$in':[data.city,'all']}});
            // serviceAgain.city={'$in':[data.city,'all']};
            serviceQuery.push({city: new RegExp(data.city)});
            serviceAgain.city = new RegExp(data.city);
        }
        if (!data.city && !data.serviceType) {
            serviceQuery.push({});
        }

        skip = (data.pageNum - 1) * data.pageSize;
        limit = Number(data.pageSize);

        try {
            let r = await procureDao.findProcureAll(procureQuery, procureQueryAll, procureAgain, serviceQuery, serviceQueryAll, serviceAgain, sort, skip, limit);
            ctx.body = {
                code: 200,
                msg: '数据获取成功',
                info: r
            }
        } catch (e) {
            log4js.error(e);
            ctx.body = {
                code: 500,
                msg: '列表数据加载失败'
            }
        }
    }
}

//获取采购详情信息
procureService.getProcureInfo = async (ctx) => {
    let data = {
        procureID: ctx.request.body.procureID,
        serviceID: ctx.request.body.serviceID
    }

    if (util.isEmptyValue("buildEntCertificateCon.buildEntCertificate", data)) {
        ctx.body = {code: 500, "msg": "请求参数不完整，请检查！"};
    } else {
        let procureQuery = {}, serviceQuery = {};
        procureQuery.procureID = data.procureID;
        serviceQuery.serviceID = data.serviceID;

        try {
            let r = await procureDao.getProcureInfo(procureQuery, serviceQuery);
            ctx.body = {
                code: 200,
                msg: '数据获取成功',
                info: r
            }
        } catch (e) {
            log4js.error(e);
            ctx.body = {
                code: 500,
                msg: '列表数据加载失败'
            }
        }
    }
}

//审核采购（通过或驳回）
procureService.checkProcure = async (ctx) => {
    let data = {
        procureID: ctx.request.body.procureID,
        type: ctx.request.body.type,   //1 通过 2 驳回
    }

    if (util.isEmptyValue("buildEntCertificateCon.buildEntCertificate", data)) {
        ctx.body = {code: 500, "msg": "请求参数不完整，请检查！"};
    } else {
        data.rejectReason = ctx.request.body.rejectReason;
        let query = {}, update = {};
        query.procureID = data.procureID;
        if (data.type == 1) {
            update.status = 2;
            update.reviewed = "通过审核！";

        } else {
            update.status = 3;
            update.reviewed = ctx.request.body.rejectReason;
        }
        try {
            let r = await procureDao.checkProcure(query, update);
            if (data.type == 1) {
                await insertUserService({procureID: data.procureID});
            }
            ctx.body = {
                code: 200,
                msg: '数据获取成功',
                info: r
            }
        } catch (e) {
            log4js.error(e);
            ctx.body = {
                code: 500,
                msg: '列表数据加载失败'
            }
        }
    }
}

const insertUserService = async (query) => {
    let procureData = await procureDao.getServiceInfo(query);
    if (_.isEmpty(procureData)) {
        return;
    }
    const useForAddress = procureData.useForAddress;
    const cityList = _.pluck(procureData.city, 'id').join(',');
    if (_.size(procureData.useForAddress) > 0) {
        let dataList = [];
        for (const item of useForAddress) {
            const userServiceData = _.extend(_.omit(procureData, ['city', 'useForAddress']), {city: cityList});
            const localFrom = util.md5(userServiceData.openID + item.address) + "_" + item.useFor;
            dataList.push({
                updateOne: {
                    filter: {localFrom: localFrom},
                    update: {
                        $set: _.extend(userServiceData, {
                            localFrom: localFrom,
                            useFor: item.useFor,
                            createDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                            useForAddress: item.address
                        })
                    },
                    upsert: true
                }
            });
        }
        return await userServiceDAO.batchUpdate(dataList);
    } else {
        return;
    }

}


exports.procureService = procureService;