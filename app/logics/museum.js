const config = require("../../config"),
    util = require('../../lib/util').util;
let museumService = {};

//博物馆网上预约服务列表
museumService.dateList = (params) => {
    return new Promise((resolve, reject) => {
        const {randomKey, userID, clientID, cityID, local_x, local_y} = params;
        const url = `${config.get("api.apiInfo.host_199")}/qgjsjdjkscjcxgjbwg/chnmuseumLb?iw-apikey=${config.get("api.apiInfo.apikey_199")}&iw-cmd=chnmuseumLb&APISession=${randomKey}`;
        console.log("博物馆网上预约服务列表查询地址:" + url);
        util.getData(url, {rejectUnauthorized: false}, (err, body) => {
            if (err) {
                console.error("博物馆网上预约服务列表查询报错:" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};
//博物馆网上预约
museumService.register = (params) => {
    return new Promise((resolve, reject) => {
        const {
            randomKey, userID, clientID, cityID, local_x, local_y,
            xm, zjh, Email, code, id
        } = params;
        const url = `${config.get("api.apiInfo.host_199")}/qgjsjdjkscjcxgjbwg/chnmuseumBooking?iw-apikey=${config.get("api.apiInfo.apikey_199")}&iw-cmd=chnmuseumBooking&APISession=${randomKey}`
            + `&xm=${encodeURI(xm)}&zjh=${zjh}&Email=${Email}&code=${code}&id=${id}`;
        console.log("博物馆网上预约地址:" + url);
        util.getData(url, {rejectUnauthorized: false}, (err, body) => {
            if (err) {
                console.error("博物馆网上预约报错:" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};
//博物馆网上预约列表查询
museumService.registerSearch = (params) => {
    return new Promise((resolve, reject) => {
        const {
            randomKey, userID, clientID, cityID, local_x, local_y,
            xm, zjh
        } = params;
        const url = `${config.get("api.apiInfo.host_199")}/qgjsjdjkscjcxgjbwg/chnmuseumBSelect?iw-apikey=${config.get("api.apiInfo.apikey_199")}&iw-cmd=chnmuseumBSelect&APISession=${randomKey}`
            + `&xm=${encodeURI(xm)}&zjh=${zjh}`;
        console.log("博物馆网上预约列表查询地址:" + url);
        util.getData(url, {rejectUnauthorized: false}, (err, body) => {
            if (err) {
                console.error("博物馆网上预约列表查询报错:" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};
exports.museumService = museumService;