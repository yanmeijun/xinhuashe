const config = require("../../config"),
    util = require('../../lib/util').util;
let tourismService = {};
tourismService.postData = (params) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        // const url = "http://127.0.0.1:8086/api/publicService";
        let body;
        switch (params.taskId) {
            case "1":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "phone": params.phone
                };
                break;
            default:
                body = params;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("12301旅游投诉taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("12301旅游投诉错误：" + err);
                reject(err)
            }
            resolve(body);
        })

    })
};
exports.tourismService = tourismService;