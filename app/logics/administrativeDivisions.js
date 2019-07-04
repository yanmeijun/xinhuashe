const config = require("../../config"),
    util = require('../../lib/util').util;
let administrativeDivisionsService = {};

administrativeDivisionsService.administrativeDivisions = (params, next) => {
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
                    "shengji": params.shengji, "diji": params.diji, "xianji": params.xianji
                };
                break;
            case "2":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "shengji": params.shengji, "diji": params.diji
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("全国行政区划信息查询taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("全国行政区划信息查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })

};

exports.administrativeDivisionsService = administrativeDivisionsService;