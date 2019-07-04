const config = require("../../config"),
    util = require('../../lib/util').util;
let buildEntCertificateService = {};

buildEntCertificateService.buildEntCertificate = (params, next) => {
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
                    "filter_LIKE_QYMC": params.filter_LIKE_QYMC, "filter_LIKE_YYZZZCH": params.filter_LIKE_YYZZZCH,
                    "filter_LIKE_ZSBH": params.filter_LIKE_ZSBH, "filter_LIKE_XXDZ": params.filter_LIKE_XXDZ,
                    "currentPage": params.currentPage
                };
                break;
            case "2":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "ZSBH": params.ZSBH
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("建设工程企业资质证书查询taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("建设工程企业资质证书查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })

};

exports.buildEntCertificateService = buildEntCertificateService;