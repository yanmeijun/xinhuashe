const _ = require('underscore'),
    util = require('../app/util/util').util,
    serviceJoinCon = require("../app/controller/serviceJoin").serviceJoinCon,
    procureCon = require("../app/controller/procure").procureCon,
    userInformationCon = require("../app/controller/userInformation").userInformationCon,
    codeCon = require("../app/controller/code").codeCon,
    serviceCon = require("../app/controller/service").serviceCon,
    tmpMonitorCon = require("../app/controller/tmpMonitor").tmpMonitorCon,
    userServiceCon = require("../app/controller/userService").userServiceCon,
    userMarkCon = require("../app/controller/userMark").userMarkCon;
/*
   * 路由设置
   * method：请求方式
   * url：请求地址(
   * fn:请求对应处理函数
   */

exports = module.exports = (app) => {
    var rules = [
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

            /*------------ 统一政务服务接入审核前台登录开始 start -------------*/
            {
                method: "post;get",
                url: "/userInformation/*",
                fn: userInformationCon.getCon
            },
            /*------------ 统一政务服务接入审核前台登录  end ---------------*/
            /*------------ 短信验证码 start -------------*/
            {
                method: "post",
                url: "/code/*",
                fn: codeCon.getCon
            },
            /*------------ 短信验证码 end ---------------*/
            /*------------ 服务列表管理 start -------------*/
            {
                method: "post",
                url: "/service/*",
                fn: serviceCon.getCon
            },
            /*------------ 服务列表管理 end ---------------*/
            /*------------ 监控管理 start -------------*/
            {
                method: "post",
                url: "/tmpMonitor/*",
                fn: tmpMonitorCon.getCon
            },
            /*------------ 监控管理 end ---------------*/
            /*------------ 服务上下线管理 start -------------*/
            {
                method: "post",
                url: "/userService/*",
                fn: userServiceCon.getCon
            },
            /*------------ 服务上下线管理 end ---------------*/
            /*------------ 我的关注 start -------------*/
            {
                method: "post",
                url: "/userMark/*",
                fn: userMarkCon.getCon
            },
            /*------------ 我的关注 end ---------------*/
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