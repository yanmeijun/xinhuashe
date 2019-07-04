const config = require("../../config"),
    util = require('../../lib/util').util;
let touristAttractionService = {};

touristAttractionService.touristAttraction = (params, next) => {
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
                    "searchword": "(doctitle='%" + params.searchword2 + "%') and (AADDRESS='" + params.AADDRESS + "') and (AYEAR='" + params.AYEAR + "')",
                    "searchword2": params.searchword2,
                    "AADDRESS": params.AADDRESS,
                    "AYEAR": params.AYEAR,
                    "page": params.page
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("5A旅游景区查询taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("5A旅游景区查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })

};

exports.touristAttractionService = touristAttractionService;