const config = require("../../config"),
    util = require('../../lib/util').util;
let publishedReportService = {};
publishedReportService.postData = (params) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            /*验证码下载*/
            case "1":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                };
                break;
            /*校验验证码*/
            case "2":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "code": params.code
                };
                break

            /*查询结果*/
            case "3":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "realName": params.realName, //真实姓名
                    "cardNo": params.cardNo, //性别
                    "phone": params.phone, //联系电话
                    "email": params.email, //邮箱
                    "title": params.title, //单位或者个人
                    "dxdz": params.dxdz, //举报对象-详细地址
                    "content": params.content, //事实与线索
                    "fileUrl": params.fileUrl, //上传文件的oss地址
                    "valiCode": params.valiCode, //验证码
                    "organization": params.organization, //化名
                    "postCode": params.postCode, //邮编
                    "address": params.address, //地址
                    "fax": params.fax //举报对象-联系电话
                };
                break
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("非法出版活动举报taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("非法出版活动举报错误：" + err);
                reject(err)
            }else{
                resolve(body);
            }
        })
    })
};

exports.publishedReportService = publishedReportService;