const config = require("../../config"),
    util = require('../../lib/util').util;
let exportTaxService = {};

//出口退税率查询
exportTaxService.exportTaxSearchAll = (params, next) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "1":
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "cPage": params.cPage,
                    "articleField02": params.articleField02,
                    "articleField01": params.articleField01,
                    "scount" : params.scount
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("出口退税率查询taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("出口退税率查询接口错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.exportTaxService = exportTaxService;