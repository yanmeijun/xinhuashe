const _ = require('underscore'),
    util = require('../app/util/util').util,
    userCon = require("../app/controller/user").userCon,
    userInformationCon = require("../app/controller/userInformation").userInformationCon,
    originCon = require("../app/controller/origin").originCon,
    tmpMonitorCon = require("../app/controller/tmpMonitor").tmpMonitorCon,
    templateCon = require("../app/controller/template").templateCon,
    serviceJoinCon = require("../app/controller/serviceJoin").serviceJoinCon,
    procureCon = require("../app/controller/procure").procureCon,
    exportExcelCon = require("../app/controller/exportExcel").exportExcelCon,
    userServiceCon = require("../app/controller/userService").userServiceCon,
    serviceCon = require("../app/controller/service").serviceCon,
    serviceCategoryCon = require("../app/controller/serviceCategory").serviceCategoryCon;
/*
   * 路由设置
   * method：请求方式
   * url：请求地址(
   * fn:请求对应处理函数
   */

exports = module.exports = (app) => {
    var rules = [
            /****************************** 登录页面开始 start ******************************/
            {
                method: "post",
                url: "/user/*",
                fn: userCon.getCon
            },
            /****************************** 登录页面结束 end ******************************/
            /****************************** 用户列表开始 start ******************************/
            {
              method: "post",
              url: "/userInformation/*",
              fn: userInformationCon.getCon
            },
            /****************************** 用户列表结束 end ******************************/
            /*******************************服务模板管理start******************************/
            {
                method: "post",
                url: "/template/*",
                fn: templateCon.getCon
            },
            /*******************************服务模板管理end*******************************/
            /************* 源站监控 start ***********************/
            {
                method: "post",
                url: "/origin/*",
                fn: originCon.getCon
            },
            /************* 源站监控 end ***********************/
            /************* 服务模板监控 start *************/
            {
                method: "post",
                url: "/tmpMonitor/*",
                fn: tmpMonitorCon.getCon
            },
            /************* 服务模板监控 end *************/
            /************* 服务接入 start ***********************/
            {
                method: "post;get",
                url: "/serviceJoin/*",
                fn: serviceJoinCon.getCon
            },
            /************* 服务接入 end ***********************/
            /************* 服务采购 start ***********************/
            {
                method: "post;get",
                url: "/procure/*",
                fn: procureCon.getCon
            },
            /************* 服务采购 end ***********************/
            /************* 导出excel start ***********************/
            {
                method: "post;get",
                url: "/exportExcel/*",
                fn: exportExcelCon.getCon
            },
            /************* 导出excel end ***********************/
            /************* 服务userService表管理 start ***********************/
            {
                method: "post;get",
                url: "/userService/*",
                fn: userServiceCon.getCon
            },
            /************* 服务userService表管理 end ***********************/
            /************* 服务service表管理 start ***********************/
            {
                method: "post;get",
                url: "/service/*",
                fn: serviceCon.getCon
            },
            /************* 服务service表管理 end ***********************/
            /************* 服务类别管理 start ***********************/
            {
                method: "post;get",
                url: "/serviceCategory/*",
                fn: serviceCategoryCon.getCon
            },
            /************* 服务类别管理 end ***********************/
        ],
        methods,
        url,
        processFn;

    _.each(rules, (rule) => {
        methods = rule.method.split(";");
        url = rule.url;
        processFn = rule.fn;
        _.each(methods, (method) => {
            if (method === 'get' && processFn) {
                app.get(url, processFn);
            } else if (method === 'post' && processFn) {
                app.post(url, processFn);
            } else if (method === 'put' && processFn) {
                app.put(url, processFn);
            } else if (method === 'delete' && processFn) {
                app.delete(url, processFn);
            }
        })
    });
};