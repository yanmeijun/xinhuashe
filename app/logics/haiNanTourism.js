const config = require("../../config"),
    util = require('../../lib/util').util;
let haiNanTourismService = {};

//海南省景区查询
haiNanTourismService.haiNanTourismSearchAll = (params, next) => {
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
                    "timestamp": params.timestamp,
                    "page": params.page,
                    "pagesize": params.pagesize,
                    "Theme": params.Theme,
                    "crowd": params.crowd,
                    "ScenicLevel": params.ScenicLevel,
                    "Price_down": params.Price_down,
                    "Price_up": params.Price_up,
                    "organID": params.organID,
                    "RelatedWords": params.RelatedWords
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("海南省景区查询taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("海南省景区查询接口错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.haiNanTourismService = haiNanTourismService;