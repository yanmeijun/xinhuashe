const config = require("../../config"),
    util = require('../../lib/util').util;
let housingReportService = {};
housingReportService.postData = (params) => {
    return new Promise((resolve, reject) => {
        if (!params.taskId) {
            reject("taskId为空！")
        }
        const url = config.get("system.apiURL");
        let body;
        switch (params.taskId) {
            case "1":
                body={
                    "sessionId": params.sessionId, "serviceId": params.serviceId, "taskId": params.taskId,"drop_FIsAnonymous":params.drop_FIsAnonymous,"drop_FOwnerTypeId":params.selectreport,"c_F_Name":params.name,"c_F_Tel":params.phone,
                    "c_F_TipoffProject":params.project,"c_F_TipoffDepte":params.reportname,"txt_FTipoffDeptAddr":params.address,
                    "c_F_TipoffDeptProvinceID":params.proVinceID,"c_F_TipoffDeptCityID":params.DeptCityID,"c_F_TipoffDeptDistrictID":params.districtID,
                    "c_F_ProblemDomainID1L1":params.DomainID1L1,"c_F_ProblemDomainID1L2":params.DomainID1L2,
                    "c_F_Title":params.title,"c_F_Content":params.content,"__EVENTTARGET":params.__EVENTTARGET,"bn_save":params.bn_save
                }
                break;
        }
        const options = {
            rejectUnauthorized: false,
            json: true,
            header: {"Content-Type": "application/json; charset=UTF-8"},
            body: body
        };
        console.log("住房城乡建设领域违法违规行为网上举报taskId：" + body.taskId);
        util.postData(url, options, (err, body) => {
            if (err) {
                console.error("住房城乡建设领域违法违规行为网上举报地址错误：" + err);
                reject(err)
            }
            resolve(body);
        })
    })
};

exports.housingReportService = housingReportService;