const config = require("../../config"),
    util = require('../../lib/util').util;
let heNanHighwayTollService = {};
//河南省高速公路通行费查询
heNanHighwayTollService.allHighway = (params) => {
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
                };
                break;
            case "3"://查询接口
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "datas": params.datas
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("河南省高速收费taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("河南省高速收费查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.heNanHighwayTollService = heNanHighwayTollService;