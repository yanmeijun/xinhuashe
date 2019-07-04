const config = require("../../config"),
    util = require('../../lib/util').util;
let organizationReportService = {};
organizationReportService.postData = (params) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "1"://
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "peoplename": params.peoplename,
                    "gendercode": params.gendercode,
                    "peopleunit": params.peopleunit,
                    "dutycode": params.dutycode,
                    "peopleidnumber": params.peopleidnumber,
                    "peoplepostalcode": params.peoplepostalcode,
                    "peopleaddress": params.peopleaddress,
                    "reginname": params.reginname,
                    "regincode": params.regincode,
                    "phone": params.phone,
                    "mobilephone": params.mobilephone,
                    "email": params.email,
                    "unit": params.unit,
                    "unitlevelcode": params.unitlevelcode,
                    "unitreginname": params.unitreginname,
                    "unitregincode": params.unitregincode,
                    "problem": params.problem
                };
                break;
            case "2"://
                body = {
                    "sessionId": params.sessionId,
                    "serviceId": params.serviceId,
                    "taskId": params.taskId,
                    "gendercode": params.gendercode,
                    "peopleunit": params.peopleunit,
                    "dutycode": params.dutycode,
                    "peopleidnumber": params.peopleidnumber,
                    "peoplepostalcode": params.peoplepostalcode,
                    "peopleaddress": params.peopleaddress,
                    "reginname": params.reginname,
                    "regincode": params.regincode,
                    "phone": params.phone,
                    "mobilephone": params.mobilephone,
                    "email": params.email,
                    "reportedgendercode": params.reportedgendercode,
                    "reportedpoliticalcode": params.reportedpoliticalcode,
                    "reporteddutylevelcode": params.reporteddutylevelcode,
                    "reportedname": params.reportedname,
                    "reportedunit": params.reportedunit,
                    "reportedutycode": params.reportedutycode,
                    "reportedreginname": params.reportedreginname,
                    "reportedregincode": params.reportedregincode,
                    "problem": params.problem
                };
                break;
            case "3":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "querynumber": params.querynumber
                };
                break;
            case "4":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                };
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("中组部举报taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("中组部举报错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.organizationReportService = organizationReportService;