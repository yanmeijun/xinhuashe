const config = require("../../config"),
    util = require('../../lib/util').util;
let bjGJJService = {};
//验证方式
/*bjGJJService.getVerifyMethod = (params) => {
    return new Promise((resolve, reject) => {
        const {randomKey, userID, clientID, cityID, local_x, local_y} = params;
        const url = config.get("api.apiInfo.host_199") + "/bjsgrzfgjj/verificationMethod?iw-apikey=" + config.get("api.apiInfo.apikey_199") +
            "&iw-cmd=verificationMethod&APISession=" + randomKey;
        console.log("北京个人公积金查询地址:" + url);
        util.getData(url, {rejectUnauthorized: false}, (err, body) => {
            if (err) {
                console.error("北京个人公积金查询报错:" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};
//登录
bjGJJService.getMPFLogin = (params) => {
    return new Promise((resolve, reject) => {
        const {randomKey, userID, clientID, cityID, local_x, local_y, password, hm, yzfs} = params;
        const url = config.get("api.apiInfo.host_199") + "/bjsgrzfgjj/login?iw-apikey=" + config.get("api.apiInfo.apikey_199") +
            "&iw-cmd=login&APISession=" + randomKey + "&password=" + password + "&hm=" + hm + "&yzfs=" + yzfs;
        console.log("北京个人公积金查询地址:" + url);
        util.getData(url, {rejectUnauthorized: false}, (err, body) => {
            if (err) {
                console.error("北京个人公积金查询报错:" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};


//北京市个人公积金查询
bjGJJService.getHousingFund = (params) => {
    return new Promise((resolve, reject) => {
        const {randomKey, userID, clientID, cityID, local_x, local_y} = params;
        const url = config.get("api.apiInfo.host_199") + "/bjsgrzfgjj/beijingIndividualProvidentFund?iw-apikey=" + config.get("api.apiInfo.apikey_199") +
            "&iw-cmd=beijingIndividualProvidentFund&APISession=" + randomKey;
        console.log("北京个人公积金查询地址:" + url);
        util.getData(url, {rejectUnauthorized: false}, (err, body) => {
            if (err) {
                console.error("北京个人公积金查询报错:" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};
//住房公积金账户信息查询
bjGJJService.getfund = (params) => {
    return new Promise((resolve, reject) => {
        const {randomKey, userID, clientID, cityID, local_x, local_y} = params;
        const url = config.get("api.apiInfo.host_199") + "/bjsgrzfgjj/zhufanggongjijinzhanghuxinxi?iw-apikey=" + config.get("api.apiInfo.apikey_199") +
            "&iw-cmd=zhufanggongjijinzhanghuxinxi&APISession=" + randomKey;
        console.log("北京个人公积金查询地址:" + url);
        util.getData(url, {rejectUnauthorized: false}, (err, body) => {
            if (err) {
                console.error("北京个人公积金查询报错:" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};
//住房公积金业务信息查询
bjGJJService.getBusinessFund = (params) => {
    return new Promise((resolve, reject) => {
        const {randomKey, userID, clientID, cityID, local_x, local_y, ksrq, jsrq, page} = params;
        const url = config.get("api.apiInfo.host_199") + "/bjsgrzfgjj/businessInformation?iw-apikey=" + config.get("api.apiInfo.apikey_199") +
            "&iw-cmd=businessInformation&APISession=" + randomKey + "&ksrq=" + encodeURI(ksrq) + "&jsrq=" + encodeURI(jsrq) + "&page=" + page;
        console.log("北京个人公积金查询地址:" + url);
        util.getData(url, {rejectUnauthorized: false}, (err, body) => {
            if (err) {
                console.error("北京个人公积金查询报错:" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};*/
bjGJJService.postData = (params, next) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "1":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "yzfs": params.yzfs, "mm": params.mm,"hm":params.hm
                };
                break;
            case "2":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "3":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "ksrq": params.ksrq,"zzrq": params.zzrq,"list_page_no": params.list_page_no,"gjjywxx_pagesize":params.gjjywxx_pagesize
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("北京公积金查询taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("北京公积金查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })

};
exports.bjGJJService = bjGJJService;