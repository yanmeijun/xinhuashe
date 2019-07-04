const config = require("../../config"),
    util = require('../../lib/util').util;
let carService = {};

carService.postData = (params, next) => {
    return new Promise((resolve, reject) => {
        const url = config.get("system.apiURL");
        let body;
        if (params.serviceId == "illegal") {//车辆违章请求
            switch (params.taskId) {
                case "1":
                    body = {
                        "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                        "code": params.sfCode
                    };
                    break;
                case "2":
                    body = {
                        "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                        "code": params.sfCode, "hpzl": params.hpzl, "hphm1b": params.hphm1b, "hphm": params.hphm,
                        "fdjh": params.fdjh, "captcha": params.captcha
                    };
                    break;
            }
        } else if (params.serviceId == "koufen") {//驾照扣分请求
            switch (params.taskId) {
                case "1":
                    body = {
                        "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                        "code": params.sfCode
                    };
                    break;
                case "2":
                    body = {
                        "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                        "code": params.sfCode, "jszh": params.jszh, "dabh": params.dabh, "captcha": params.captcha
                    };
                    break;
            }
        } else if (params.serviceId == "yaohao") {//驾照扣分请求
            switch (params.taskId) {
                case "1":
                    body = {
                        "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                        "name": params.id, "city": params.place
                    };
                    break;
                case "2":
                    body = {
                        "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                        "ctl00$ContentPlaceHolder1$ProposalNo": params.id
                    };
                    break;
            }
        } else if (params.serviceId == "baofei") {//车辆报废请求
            switch (params.taskId) {
                case "1":
                    body = {
                        "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                        "code": params.sfCode
                    };
                    break;
                case "2":
                    body = {
                        "sessionId": params.sessionId, "serviceId": params.serviceId,
                        "taskId": params.taskId, "hpzl": params.hpzl, "fdjh": params.fdjh,
                        "hphm2a": params.hphm2a, "hphm2b": params.hphm2b, "hphm": params.hphm,
                        "captcha": params.captcha, "code": params.sfCode
                    };
                    break;
            }
        } else if (params.serviceId == "parking") {//北京停车场查询
            switch (params.taskId) {
                case "1":
                    body = {
                        "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                        "pakingName": params.tcczmc, "pageNo": params.page, "area": params.ssqx
                    };
                    break;
            }
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("请求serviceId：" + params.serviceId + "请求taskId：" + params.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.carService = carService;