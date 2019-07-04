const config = require("../../config"),
    util = require('../../lib/util').util;
let nationalMedicalService = {};

nationalMedicalService.nationalMedical = (params, next) => {
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
                };
                break;
            case "3":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "Prov": params.Prov, "Unit_Name": params.Unit_Name, "Check_Code": params.Check_Code
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("全国医疗机构taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("全国医疗机构查询错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })

};

exports.nationalMedicalService = nationalMedicalService;