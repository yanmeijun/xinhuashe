const moment = require('moment'),
    _ = require('underscore'),
    log4js = require('../util/log4j'),
    templateDao = require('../dao/template').templateDAO;

let templateService = {};
templateService.getTemplateMan = async (ctx) => {
    let data = {
        status: ctx.request.body.status,
        key: ctx.request.body.key,
        pageSize: ctx.request.body.pageSize,
        pageNum: ctx.request.body.pageNum,
        sort: ctx.request.body.sort,
        domain: ctx.request.body.domain
    }

    let query = [], queryAll = [], limit = '', skip = '',
        sort = data.sort || {status: -1, startDate: -1};

    skip = (data.pageNum - 1) * data.pageSize;
    limit = Number(data.pageSize);

    if (data.key) {
        queryAll.push({'templateID': new RegExp(data.key)});
        queryAll.push({'templateName': new RegExp(data.key)});
    } else {
        queryAll.push({})
    }
    if (data.domain) {
        query.push({'domain': data.domain});
    } else {
        ctx.body = {
            success: false,
            info: 'domain字段参数为空'
        }
    }
    if (data.status != '2') {
        query.push({'status': data.status});
    } else {
        query.push({});
    }
    try {
        let {data, totalNum} = await templateDao.findAll(queryAll, query, sort, skip, limit), result = {};
        result['data'] = data;
        result['totalNum'] = totalNum;
        ctx.body = {
            success: true,
            info: result
        }
    } catch (e) {
        log4js.error(e);
        ctx.body = {
            success: false,
            info: '列表数据加载失败'
        }
    }
}

//新增模板信息
templateService.addTemplate = async (ctx) => {
    let data = {
        templateID: ctx.request.body.templateID,
        templateName: ctx.request.body.templateName,
        content: ctx.request.body.content,
        apiNum: ctx.request.body.apiNum,
        status: ctx.request.body.status,
        userID: ctx.request.body.userID,
        domain: ctx.request.body.domain,
        startDate: ctx.request.body.startDate,
    };
    if (data.templateID.trim() == "") {
        ctx.body = {
            success: false,
            info: 'id为空'
        }
    }
    if (data.templateName.trim() == "") {
        ctx.body = {
            success: false,
            info: '名称为空'
        }
    }
    if (data.content.trim() == "") {
        ctx.body = {
            success: false,
            info: '内容为空'
        }
    }
    if (data.userID.trim() == "") {
        ctx.body = {
            success: false,
            info: '用户id为空'
        }
    }
    if (data.domain.trim() == "") {
        ctx.body = {
            success: false,
            info: 'domain为空'
        }
    }
    let insert = {
        'domain': data.domain,
        'userID': data.userID,
        'templateID': data.templateID.trim(),
        'templateName': data.templateName.trim(),
        'content': data.content.trim(),
        'apiNum': data.apiNum,
        'status': data.status,
        'startDate': data.startDate,
        'createDate': moment().format('YYYY-MM-DD HH:mm:ss'),
    };
    let query = {'templateID': data.templateID};
    try {
        let data = await templateDao.insertOne(query, insert);
        if (data.status != "200") {
            ctx.body = {
                success: false,
                info: data.errMsg
            }
        } else {
            ctx.body = {
                success: true,
                info: data.data
            }
        }
    } catch (e) {
        log4js.error(e);
        ctx.body = {
            success: false,
            info: '新增模板失败！'
        }
    }

}

//模板停用,需要检查检测状态
templateService.modifyStatus = async (ctx) => {
    //接受参数
    let data = {
        status: ctx.request.body.status,
        templateID: ctx.request.body.templateID,
        userID: ctx.request.body.userID,
        domain: ctx.request.body.domain,
    }

    if (data.status == "") {
        ctx.body = {
            success: false,
            info: 'status参数为空'
        }
    }
    if (data.templateID == "") {
        ctx.body = {
            success: false,
            info: 'templateID参数为空'
        }
    }
    if (data.userID == "") {
        ctx.body = {
            success: false,
            info: 'userID参数为空'
        }
    }
    if (data.domain == "") {
        ctx.body = {
            success: false,
            info: 'domain参数为空'
        }
    }

    let updateSet = {
        'status': data.status,
        'startDate': moment().format('YYYY-MM-DD HH:mm:ss')
    };
    let updateQuery = data.templateID.split(',');
    try {
        let data = await templateDao.updateAll(updateQuery, updateSet);
        if (data.status != "200") {
            ctx.body = {
                success: false,
                info: data.errMsg
            }
        } else {
            ctx.body = {
                success: true,
                info: data.data
            }
        }
    } catch (e) {
        log4js.error(e);
        ctx.body = {
            success: false,
            info: '操作失败'
        }
    }
}

//模板删除
templateService.deleTemplate = async (ctx) => {
    let data = {
        templateID: ctx.request.body.templateID,
        userID: ctx.request.body.userID,
        domain: ctx.request.body.domain
    }

    if (data.templateID == "") {
        ctx.body = {
            success: false,
            info: 'templateID参数为空'
        }
    }
    if (data.userID == "") {
        ctx.body = {
            success: false,
            info: 'userID参数为空'
        }
    }
    if (data.domain == "") {
        ctx.body = {
            success: false,
            info: 'domain参数为空'
        }
    }

    let deleteQuery = data.templateID.split(',');
    try {
        let data = await templateDao.DeleteAll(deleteQuery);
        if (data.status != "200") {
            ctx.body = {
                success: false,
                info: data.errMsg
            }
        } else {
            ctx.body = {
                success: true,
                info: data.data
            }
        }
    } catch (e) {
        log4js.error(e);
        ctx.body = {
            success: false,
            info: '数据库操作失败'
        }
    }
}

//模板信息获取
templateService.getTemplate = async (ctx) => {
    let data = {
        templateID: ctx.request.body.templateID,
        userID: ctx.request.body.userID,
        domain: ctx.request.body.domain,
    }

    if (data.templateID == "") {
        ctx.throw(400, 'templateID参数为空');
    }
    if (data.userID == "") {
        ctx.throw(400, 'userID参数为空');
    }
    if (data.domain == "") {
        ctx.throw(400, 'domain参数为空');
    }

    let getQuery = {'templateID': data.templateID};
    try {
        let data = await templateDao.getTem(getQuery);
        if (data.status != "200") {
            ctx.body = {
                success: false,
                info: data.errMsg
            }
        } else {
            ctx.body = {
                success: true,
                info: data.data
            }
        }

    } catch (e) {
        log4js.error(e);
        ctx.body = {
            success: false,
            info: '数据库操作失败'
        }
    }
}

//模板修改
templateService.modifyTemplate = async (ctx) => {
    let data = {
        templateID: ctx.request.body.templateID,
        templateName: ctx.request.body.templateName,
        content: ctx.request.body.content,
        apiNum: ctx.request.body.apiNum,
        status: ctx.request.body.status,
        userID: ctx.request.body.userID,
        domain: ctx.request.body.domain,
        startDate: ctx.request.body.startDate,
        newID: ctx.request.body.newID,
    }
    if (data.templateID.trim() == "") {
        ctx.body = {
            success: false,
            info: 'id为空'
        }
    }
    if (data.templateName.trim() == "") {
        ctx.body = {
            success: false,
            info: '名称为空'
        }
    }
    if (data.content.trim() == "") {
        ctx.body = {
            success: false,
            info: '内容为空'
        }
    }
    if (data.userID.trim() == "") {
        ctx.body = {
            success: false,
            info: '用户id为空'
        }
    }
    if (data.domain.trim() == "") {
        ctx.body = {
            success: false,
            info: 'domain为空'
        }
    }
    let modify = {
        'domain': data.domain,
        'userID': data.userID,
        'templateID': data.newID.trim(),
        'templateName': data.templateName.trim(),
        'content': data.content.trim(),
        'apiNum': data.apiNum,
        'status': data.status,
        'modifyDate': data.startDate,
        'startDate': data.startDate
    };
    let query = {'templateID': data.templateID};
    let newQuery={'templateID': data.newID};
    //先校验模板新的模板id是否唯一
    try {
        let data = await templateDao.modifyTem(newQuery,query, modify);
        if (data.status != "200") {
            ctx.body = {
                success: false,
                info: data.errMsg
            }
        } else {
            ctx.body = {
                success: true,
                info: data.data
            }
        }
    } catch (e) {
        log4js.error(e);
        ctx.body = {
            success: false,
            info: '模板修改失败'
        }
    }
}

exports.templateService = templateService;