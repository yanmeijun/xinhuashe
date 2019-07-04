const config = require("../../config"),
    util = require('../../lib/util').util;
let policemenReportService = {};
policemenReportService.postData = (params) => {
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
                    "JBKJXSLY_SFSM1": params.JBKJXSLY_SFSM1,
                    "JBKJXSLY_JBRXM1": params.JBKJXSLY_JBRXM1,
                    "JBKJXSLY_JBRSFZH1": params.JBKJXSLY_JBRSFZH1,
                    "JBKJXSLY_JBRDH1": params.JBKJXSLY_JBRDH1,
                    "JBKJXSLY_LXDQ1": params.JBKJXSLY_LXDQ1,
                    "JBKJXSLY_BJBRDW1": params.JBKJXSLY_BJBRDW1,
                    "JBKJXSLY_BJBRXM1": params.JBKJXSLY_BJBRXM1,
                    "JBKJXSLY_AFDQ1": params.JBKJXSLY_AFDQ1,
                    "JBKJXSLY_SF1": params.JBKJXSLY_SF1,
                    "JBKJXSLY_TSSF1": params.JBKJXSLY_TSSF1,
                    "JBKJXSLY_SALY1": params.JBKJXSLY_SALY1,
                    "JBKJXSLY_ZYSXXZ1": params.JBKJXSLY_ZYSXXZ1,
                    "JBKJXSLY_SYZY": params.JBKJXSLY_SYZY,
                    "number": params.number,
                    "JBKJXSLY_JBRDWZZ1" : params.JBKJXSLY_JBRDWZZ1
                };
                break;
            case "3":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "searchCode":params.searchCode
                };
                break;
            case "4":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            case "5":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;


        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };

        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("检察干警违法违纪举报错误：" + err);
                reject(err)
            } else {
                resolve(body);
            }
        })
    })
};

exports.policemenReportService = policemenReportService;