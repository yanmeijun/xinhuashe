const config = require("../../config"),
    util = require('../../lib/util').util;
let fdegreeCertificationService = {};

fdegreeCertificationService.postData = (params, next) => {
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
                    "txtFullName" : params.txtFullName, //姓名
                    "txtCountry" : params.txtCountry, //认证证书编号-国籍
                    "txtYear" : params.txtYear, //认证证书编号-年份
                    "txtNumber" : params.txtNumber, //认证证书编号-编号
                    "ddlRzlb" : params.ddlRzlb, //认证类别
                    "vCCode_validateInputControl" : params.vCCode_validateInputControl //验证码
                };
                break;
            case "2":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
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
                console.error("国（境）外学历学位认证证书查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.fdegreeCertificationService = fdegreeCertificationService;