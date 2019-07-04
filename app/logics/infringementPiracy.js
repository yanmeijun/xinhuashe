const config = require("../../config"),
    util = require('../../lib/util').util;
let infringementPiracyService = {};

infringementPiracyService.infringementPiracy = (params, next) => {
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
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "realName": params.realName,
                    "phone": params.phone,
                    "email": params.email,
                    "title": params.title,
                    "content": params.content,
                    "code": params.code,
                    "organization": params.organization,
                    "address": params.address,
                    "postCode": params.postCode,
                    "sssf": params.sssf,
                    "fax": params.fax,
                    "dxdz": params.dxdz,
                    "wzmcjwz": params.wzmcjwz,
                    "wzbaxx": params.wzbaxx,
                    "kaipu_file": params.kaipu_file
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("侵权盗版举报查询taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("侵权盗版举报查询查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })

};

exports.infringementPiracyService = infringementPiracyService;