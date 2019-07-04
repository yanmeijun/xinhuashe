const config = require("../../config"),
    util = require('../../lib/util').util;
let remoteHospService = {};

remoteHospService.remoteHosp = (params, next) => {
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
                    aab301: params.aab301
                };
                break;
            case "2":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "provinceDesc": params.provinceDesc, "townDesc": params.townDesc, "aab299": params.aab299,
                    "pageNo": params.pageNo, "akb021": params.akb021
                };
                break;
            case "3":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId,
                    "taskId": params.taskId, "provinceDesc": params.provinceDesc,
                    "townDesc": params.townDesc, "countyDesc": params.countyDesc,
                    "yab003": params.yab003, "pageNo": params.pageNo
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("异地定点医院taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("异地定点医院查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })

};

exports.remoteHospService = remoteHospService;