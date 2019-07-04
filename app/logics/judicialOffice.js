const config = require("../../config"),
    util = require('../../lib/util').util;
let judicialOfficeService = {};
//司法所查询
judicialOfficeService.allSearch = (params) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "1":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "2":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "Xzqh":params.Xzqh,"PageIndex":params.PageIndex,"Query":params.Query
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("司法所查询taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("司法所查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.judicialOfficeService = judicialOfficeService;