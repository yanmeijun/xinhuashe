const config = require("../../config"),
    util = require('../../lib/util').util;
let lawfirmEnquiriesService = {};

lawfirmEnquiriesService.postData = (params, next) => {
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
                    "dept_name" : params.dept_name, //事务所名称
                    "districtcode" : params.districtcode, //省级或者城市级地区代号
                    "pagenum": params.pagenum, //当前页数
                    "pagesize" : params.pagesize //每页数量
                };
                break;
            /*省及直辖市查询*/
            case "2":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
            /*城市查询*/
            case "3":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "pkid" : params.pkid
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
                console.error("律师事务所查询：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.lawfirmEnquiriesService = lawfirmEnquiriesService;