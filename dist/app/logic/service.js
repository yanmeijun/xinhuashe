const moment = require('moment'),
    _ = require('underscore'),
    urlParse = require('url'),
    log4js = require('../util/log4j'),
    util = require('../util/util').util,
    serviceDAO = require('../dao/service').serviceDAO,
    cityDAO = require('../dao/city').cityDAO;
let serviceLogic = {};
serviceLogic.getServiceList = async (ctx) => {
    const body = ctx.request.body;
    let query = body.query||{};
        try {
            let results = await serviceDAO.getAllService(query);
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
    // }
}
//模糊查询
serviceLogic.searchByKwd = async(ctx) => {
    let body = ctx.request.body;
    let query = {},
        option = {
            sort: body.sort || {saleNum: 1, markNum: 1},
            skip: (body.page - 1) * body.rows,
            limit: body.rows
        };
    if(body.keyword){//关键字
        query = {$or: [{serviceName: new RegExp(body.keyword)}]}
    }
    if (body.category) {//分类
        query.serviceID = new RegExp('^' + body.category)
    }
    if (body.serviceType) {//类型
        query.serviceType = {$in: [Number(body.serviceType)]}
    }
    if (body.price) {//价格
        query.price = body.price == "0"? 0 : { $gt: Number(body.price) }
    }
    if (body.city) {//范围
        query.city = {$in: ['all',new RegExp(body.city)]}
    }
    try {
        let results = await serviceDAO.getAllService(query, option);
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
};
//获取服务详情
serviceLogic.getServiceDetail = async (ctx) => {
    let body = ctx.request.body;
    if (util.isEmptyValue("serviceLogic.getServiceDetail", {
            serviceID: body.serviceID
        })) {
        ctx.body = {
            msg: "error",
            error: "serviceID不能为空"
        };
    } else {
        let query = {
                serviceID: body.serviceID
            };
        try {
            let serviceInfo = await serviceDAO.getService(query), cityName = "";
            if(serviceInfo.city.indexOf("all") > -1 || serviceInfo.city.indexOf("000000") > -1){
                cityName = "全国";
            }else{
                let cityList = serviceInfo.city.split(",");
                for(var i = 0; i < cityList.length; i++){
                    let cityInfo = await cityDAO.get({cityID: cityList[i]});
                    if(cityInfo[0]){
                        if(i == 0){
                            cityName = cityInfo[0].cityName
                        }else{
                            cityName += "、" + cityInfo[0].cityName;
                        }
                    }
                }
            }
            serviceInfo.cityName = cityName;
            ctx.body = {
                code: 200,
                msg: "success",
                results: {dataList:[serviceInfo]}
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
//获取服务详情
serviceLogic.getHotService = async (ctx) => {
    let body = ctx.request.body;
    if (util.isEmptyValue("serviceLogic.getHotService", {
            hotServiceID: body.hotServiceID
        })) {
        ctx.body = {
            msg: "error",
            error: "hotServiceID不能为空"
        };
    } else {
        let query = {
                serviceID: {$in: body.hotServiceID}
            };
        try {
            let results = await serviceDAO.getAllService(query);
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
exports.serviceLogic = serviceLogic;