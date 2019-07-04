const async = require('async'),
    _ = require('underscore'),
    tools = require('../controllers/tools.js'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    serviceDAO = require('../dao/service').serviceDAO,
    userServiceDAO = require('../dao/userService').userServiceDAO;
let serviceLogic = {};
serviceLogic.getServiceList_old = (params) => {
    const cityID = params.cityID,
        localUrl = config.get("system.localUrl");
    var results1 =
        [
            {
                serviceName: "驾照扣分查询",
                url: localUrl + "deduction",
                logo: localUrl + "images/car-img-2.png ",
                summary: "驾照扣分查询",
                serviceID: "000001"
            },
            {
                serviceName: "车辆违章查询",
                url: localUrl + "infraction",
                logo: localUrl + "images/car-img-1.png ",
                summary: "车辆违章查询",
                serviceID: "AAA0001"
            },
            {
                serviceName: "学历证书查询",
                serviceID: "CAB0001",
                summary: "查询国家承认的高等教育学籍学历信息",
                url: localUrl + "education",
                logo: localUrl + "images/xl-img-1.png"
            }

        ];
    var results2 = {
        serviceName: "北京社保信息查询",
        url: localUrl + "insuranceLogin",
        logo: localUrl + "images/car-img-3.png ",
        summary: "北京社保信息查询",
        serviceID: "BAA0001"
    };
    return new Promise((resolve, reject) => {
        if (cityID.slice(0, 2) == "11" || cityID.slice(0, 2) == 11) {
            results1.push(results2)
        }
        resolve(results1);
    })
}
serviceLogic.getServiceList = (params) => {
    const cityID = params.cityID,
        getNum = params.getNum,
        localUrl = config.get("system.localUrl");
    let results = [];
    return new Promise((resolve, reject) => {
        async.parallel([function (callback) {
            serviceDAO.get({
                city: {$in: [new RegExp(cityID), new RegExp(cityID.substring(0, 2) + "0000")]},
                online: true
            }, (err, serviceInfo) => {
                if (!_.isEmpty(serviceInfo)) {
                    serviceInfo.forEach((item) => {
                        results.push({
                            serviceName: item.serviceName,
                            serviceID: item.serviceID,
                            summary: item.summary,
                            url: localUrl + item.url,
                            logo: localUrl + item.logo,
                            index: item.index
                        });
                    })
                }
                callback(err);
            })
        }, function (callback) {
            serviceDAO.get({city: "all", online: true}, (err, serviceInfo) => {
                if (!_.isEmpty(serviceInfo)) {
                    serviceInfo.forEach((item) => {
                        results.push({
                            serviceName: item.serviceName,
                            serviceID: item.serviceID,
                            summary: item.summary,
                            url: localUrl + item.url,
                            logo: localUrl + item.logo,
                            index: item.index
                        });
                    })
                }
                callback(err)
            })
        }], function (err) {
            if (err) {
                reject(err)
            }
            results.sort(keySort('index'));
            if (getNum == "all") {
                resolve(results);
            } else {
                let indexPage = {
                    serviceName: "更多",
                    serviceID: "more",
                    summary: "频道页",
                    url: localUrl + "indexPage",
                    logo: localUrl + "images/homePage/more2.png"
                }
                resolve([results[0], results[1], results[2], indexPage]);
            }
        })
    })
}
serviceLogic.getServiceList_new = (params) => {
    const cityID = params.cityID,
        getNum = params.getNum,
        localFrom = params.localFrom,
        localUrl = config.get("system.localUrl");
    let results = [];
    return new Promise((resolve, reject) => {
        async.parallel([function (callback) {
            userServiceDAO.get({
                localFrom: localFrom,
                city: {$in: [new RegExp(cityID), new RegExp(cityID.substring(0, 2) + "0000")]},
                online: true
            }, (err, serviceInfo) => {
                if (!_.isEmpty(serviceInfo)) {
                    serviceInfo.forEach((item) => {
                        results.push({
                            localFrom: params.localFrom,
                            serviceName: item.serviceName,
                            serviceID: item.serviceID,
                            // summary: item.summary,
                            url: localUrl + item.url,
                            // logo: localUrl + item.logo,
                            logo: item.logo,
                            hotLogo: item.hotLogo,
                            index: item.index
                        });
                    })
                }
                callback(err);
            })
        }, function (callback) {
            userServiceDAO.get({localFrom: localFrom, city: "all", online: true}, (err, serviceInfo) => {
                if (!_.isEmpty(serviceInfo)) {
                    serviceInfo.forEach((item) => {
                        results.push({
                            localFrom: params.localFrom,
                            serviceName: item.serviceName,
                            serviceID: item.serviceID,
                            // summary: item.summary,
                            url: localUrl + item.url,
                            // logo: localUrl + item.logo,
                            logo: item.logo,
                            hotLogo: item.hotLogo,
                            index: item.index
                        });
                    })
                }
                callback(err)
            })
        }], function (err) {
            if (err) {
                reject(err)
            }
            results.sort(keySort('index'));
            if (getNum == "all") {
                resolve(results);
            } else {
                let indexPage = {
                    localFrom: params.localFrom,
                    serviceName: "更多",
                    serviceID: "more",
                    summary: "频道页",
                    url: localUrl + "indexPage",
                    logo: localUrl + "images/homePage/more2.png",
                    hotLogo: localUrl + "images/homePage/more2.png"
                }
                resolve([results[0], results[1], results[2], indexPage]);
            }
        })
    })
}
const keySort = (key) => {
    return function (a, b) {
        var value1 = parseInt(a[key]);
        var value2 = parseInt(b[key]);
        return value1 - value2;
    }
}
exports.serviceLogic = serviceLogic;