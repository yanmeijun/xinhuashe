const config = require("../../config"),
    util = require('../../lib/util').util;
let taxInvoiceCheckService = {};

taxInvoiceCheckService.taxInvoiceCheck = (params, next) => {
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
                    "fpdm": params.fpdm
                };
                break;
            case "2":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "fphm": params.fphm, "kprq": params.kprq, "fpje": params.fpje, "yzm": params.yzm
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("国家税务总局全国增值税发票查验taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("国家税务总局全国增值税发票查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })

};

exports.taxInvoiceCheckService = taxInvoiceCheckService;