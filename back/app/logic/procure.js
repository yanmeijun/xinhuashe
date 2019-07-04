const moment = require('moment'),
    _ = require('underscore'),
    log4js = require('../util/log4j'),
    util = require('../util/util').util,
    procureDAO = require('../dao/procure').procureDAO,
    serviceDAO = require('../dao/service').serviceDAO;

let procureService = {};

procureService.getProcureID = async (ctx) => {
    let data = {
        serviceID: ctx.request.body.serviceID,
        openID: ctx.request.body.openID
    };
    data = ctx.request.body.status ? _.extend(data, {status: ctx.request.body.status}) : data;
    if (util.isEmptyValue("procureService.getProcureID", data)) {
        ctx.body = {code: 500, "msg": "请求参数不完整，请检查！"};
    } else {
        const basicInfo = await procureDAO.getProcureID(data);
        if (basicInfo && (basicInfo.status == 1 || basicInfo.status == 2)) {
            ctx.body = {
                basicInfor:basicInfo,
                "code": 200
            }
        } else {
            ctx.body = {"msg": "没有查询到相关数据", "code": 204};
        }
    }
}
//采购申请 再次申请
procureService.procureApply = async (ctx) => {
    let data = {
        openID: ctx.request.body.openID,
        serviceID: ctx.request.body.serviceID,
        contactName: ctx.request.body.contactName,
        contactPhone: ctx.request.body.contactPhone,
        unitName: ctx.request.body.unitName,
        address: ctx.request.body.address,
        email: ctx.request.body.email,
        serviceName: ctx.request.body.serviceName,
        templateID: ctx.request.body.templateID,
        serviceUse: ctx.request.body.serviceUse,
        useForAddress: ctx.request.body.useForAddress,
        region: ctx.request.body.region,
        type: ctx.request.body.type,   //1是申请，2是再次申请
        serviceType: Number(ctx.request.body.serviceType)
    };
    if (util.isEmptyValue("procureService.procureApply", data)) {
        ctx.body = {code: 500, "msg": "请求参数不完整，请检查！"};
    } else {
        data['status'] = 1;
        if (data.type === '1') {
            let day = new Date();
            data['applyTime'] = moment(day).format('YYYY-MM-DD HH:mm:ss');
            data['procureID'] = '2' + createIdNumber(day);
        } else if (data.type === '2') {
            data['applyTime'] = moment().format('YYYY-MM-DD HH:mm:ss');
            data['procureID'] = ctx.request.body.procureID;
            data['reviewed'] = "";
        }

        let update = data;
        let query = {procureID: data.procureID};
        try {
            let serviceData = await procureDAO.procureApply(query, update), result = {};
            result['serviceData'] = serviceData;   //{"code":200,"msg":"数据获取成功","info":{"serviceData":{"n":1,"nModified":1,"ok":1}}}
            ctx.body = {
                code: 200,
                msg: '数据获取成功',
                info: result
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

//获取申请采购列表
procureService.getApplyList = async (ctx) => {
    let data = {
        openID: ctx.request.body.openID,
        pageSize: ctx.request.body.pageSize,
        pageNum: ctx.request.body.pageNum,
        sort: ctx.request.body.sort
    };
    if (util.isEmptyValue("buildEntCertificateCon.buildEntCertificate", data)) {
        ctx.body = {code: 500, "msg": "请求参数不完整，请检查！"};
    } else {
        data['serviceName'] = ctx.request.body.serviceName;
        data['status'] = ctx.request.body.status;
        const query = {openID: data.openID};
        const option = {
            skip: data.pageNum ? (data.pageNum - 1) * data.pageSize : 0,
            limit: data.pageSize ? Number(data.pageSize) : 10,
            sort: {applyTime: -1}
        }
        try {
            let dataList = await procureDAO.findApplyAll(query, option);
            ctx.body = {
                code: 200,
                msg: '数据获取成功',
                info: dataList
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

//根据服务的serviceID获取服务范围
procureService.getService = async (ctx) => {
    let data = {
        serviceID: ctx.request.body.serviceID
    };
    if (util.isEmptyValue("procureService.getService", data)) {
        ctx.body = {code: 500, "msg": "请求参数不完整，请检查！"};
    } else {
        const basicInfor = await serviceDAO.getService(data);
        if (basicInfor) {
            ctx.body = {
                basicInfor,
                "code": 200
            }
        } else {
            ctx.body = {"msg": "没有查询到相关数据", "code": 204};
        }
    }
}

//撤销申请
procureService.cancelApply = async (ctx) => {
    let data = {
        procureID: ctx.request.body.procureID,
    };
    if (util.isEmptyValue("procureService.cancelApply", data)) {
        ctx.body = {code: 500, "msg": "请求参数不完整，请检查！"};
    } else {
        data['status'] = 4;
        data['cancelTime'] = moment().format('YYYY-MM-DD HH:mm:ss');

        let update = data;
        let query = {procureID: data.procureID};
        try {
            let Data = await procureDAO.cancelApply(query, update), result = {};
            result['Data'] = Data;
            ctx.body = {
                code: 200,
                msg: '数据获取成功',
                info: result
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

//生成idNumber后14位：8位时间（YYMMDDHH）+6位随机数字
function createIdNumber(date) {
    let m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    this.idNumber = date.getFullYear().toString().slice(2, 4) + m.toString() + d.toString() + h.toString()
        + Math.floor(Math.random() * 100000 + 100000).toString();
    return this.idNumber;
}

//获取采购申请列表信息
procureService.getServiceList = async (ctx) => {
    const body = ctx.request.body || ctx.request.query;
    let query = body.query;
    if (util.isEmptyValue("procureService.getServiceList", {
            openID: query.openID
        })) {
        ctx.body = {
            code: 500,
            msg: "error",
            error: "openID不能为空"
        };
    } else {
        let options = {
            sort: body.sort || {applyTime: -1},
            skip: (body.page - 1) * body.rows || 0,
            limit: body.rows || 10
        };
        if (body.keyword) {
            query.serviceName = new RegExp(body.keyword)
        }
        try {
            let serviceList = await procureDAO.findApplyAll(query, options);
            ctx.body = {
                code: 200,
                msg: "success",
                results: {dataList: serviceList.res, dataCount: serviceList.count}
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

//获取采购申请单条信息详情
procureService.getServiceInfo = async (ctx) => {
    const body = ctx.request.body || ctx.request.query;
    if (util.isEmptyValue("procureService.getServiceInfo", {
            procureID: body.procureID
        })) {
        ctx.body = {
            code: 500,
            msg: "error",
            error: "openID不能为空"
        };
    } else {
        try {
            let procureData = await procureDAO.getServiceInfo({procureID: body.procureID});
            ctx.body = {
                code: 200,
                msg: "success",
                results: procureData
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

exports.procureService = procureService;