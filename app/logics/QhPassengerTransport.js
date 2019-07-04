const config = require("../../config"),
    util = require('../../lib/util').util;
let QhPassengerTransportService = {};
//青海省客运班线信息查询
QhPassengerTransportService.allPassenger = (params) => {
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
                    "currentpage": params.currentpage, "pagesize": params.pagesize, "startstation": params.startstation,
                    "endstation": params.endstation, "model": params.model
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("青海省客运班线信息taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("青海省客运班线信息查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.QhPassengerTransportService = QhPassengerTransportService;