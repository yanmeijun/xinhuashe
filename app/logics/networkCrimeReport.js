const config = require("../../config"),
    util = require('../../lib/util').util;
let networkCrimeReportService = {};
networkCrimeReportService.postData = (params) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "1"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "t_wfjb_report.report_type": params["t_wfjb_report.report_type"],
                    "t_wfjb_report.event_time": params["t_wfjb_report.event_time"],
                    "t_wfjb_report.ext22": params["t_wfjb_report.ext22"],
                    "t_wfjb_report.ext21": params["t_wfjb_report.ext21"],
                    "t_wfjb_report.website_name": params["t_wfjb_report.website_name"],
                    "t_wfjb_report.website_url": params["t_wfjb_report.website_url"],
                    "t_wfjb_report.app_type": params["t_wfjb_report.app_type"],
                    "t_wfjb_report.app_account": params["t_wfjb_report.app_account"],
                    "t_wfjb_report.event_description": params["t_wfjb_report.event_description"],
                    "t_wfjb_report.anonymity_user_sex": params["t_wfjb_report.anonymity_user_sex"],
                    "uploadForm.file": params["uploadForm.file"],
                    "t_wfjb_report.anonymity_user_name": params["t_wfjb_report.anonymity_user_name"],
                    "t_wfjb_report.anonymity_credentials_type": params["t_wfjb_report.anonymity_credentials_type"],
                    "t_wfjb_report.anonymity_credentials_no": params["t_wfjb_report.anonymity_user_name"],
                    "t_wfjb_report.anonymity_phone": params["t_wfjb_report.anonymity_user_name"],
                    "t_wfjb_report.anonymity_email": params["t_wfjb_report.anonymity_user_name"]
                };
                break;
            case "2"://
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "t_wfjb_report.report_type": params["t_wfjb_report.report_type"],
                    "t_wfjb_report.event_time": params["t_wfjb_report.event_time"],
                    "t_wfjb_report.ext22": params["t_wfjb_report.ext22"],
                    "t_wfjb_report.ext21": params["t_wfjb_report.ext21"],
                    "t_wfjb_report.is_victim": params["t_wfjb_report.is_victim"],
                    "t_wfjb_report.website_name": params["t_wfjb_report.website_name"],
                    "t_wfjb_report.website_url": params["t_wfjb_report.website_url"],
                    "t_wfjb_report.app_type": params["t_wfjb_report.app_type"],
                    "t_wfjb_report.app_account": params["t_wfjb_report.app_account"],
                    "t_wfjb_report.ext40": params["t_wfjb_report.ext40"],
                    "t_wfjb_report.event_description": params["t_wfjb_report.event_description"],
                    "t_wfjb_report.anonymity_user_sex": params["t_wfjb_report.anonymity_user_sex"],
                    "t_wfjb_report.anonymity_credentials_type": params["t_wfjb_report.anonymity_credentials_type"],
                    "uploadForm.file": params["uploadForm.file"],
                    "t_wfjb_report.anonymity_credentials_no": params["t_wfjb_report.anonymity_credentials_no"],
                    "t_wfjb_report.anonymity_phone": params["t_wfjb_report.anonymity_phone"],
                    "t_wfjb_report.anonymity_email": params["t_wfjb_report.anonymity_email"],
                    "t_wfjb_report.anonymity_user_name": params["t_wfjb_report.anonymity_user_name"],
                    "t_wfjb_report.ext31": params["t_wfjb_report.ext31"],
                    "secondRegion_num": params["secondRegion_num"],
                    "region_num1": params["region_num1"],
                    "t_wfjb_report.region_num": params["t_wfjb_report.region_num"]
                };
                break;
            case "3":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "report_no": params.report_no, "search_code": params.search_code
                }
                break;
            case "4":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "secondValue": params.secondValue
                }
                break;
            case "5":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,
                    "secondValue": params.secondValue
                }
                break;
            case "6":
                body = {
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId
                }
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("网络违法犯罪举报taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("网络违法犯罪举报错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.networkCrimeReportService = networkCrimeReportService;