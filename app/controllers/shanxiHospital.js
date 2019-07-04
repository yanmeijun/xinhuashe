const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    shanxiHospitalService = require("../logics/shanxiHospital").shanxiHospitalService;
const path = "shanxiHospital/";
const serviceID = "DAA0004",templateID = "shaanxiHospital";
let shanxiHospitalCon = {};

shanxiHospitalCon.getCon = (req, res, next) => {
    if (req.method.toUpperCase() === "GET") {
        if (_.isEmpty(req.query.page)) {
            apiCon(req, res, next)
        } else {
            pageCon(req, res, next)
        }
    } else {
        apiCon(req, res, next);
    }
};
//页面跳转方法
const pageCon = (req, res, next) => {
    const renderName = req.query.page;
    console.log("陕西省预约挂号renderName: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })

};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("陕西省预约挂号请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
/*
*陕西省医院默认展示页面
*/
const defaultHospital = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "26",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        pageSize: req.body.pageSize,//当前页显示几条数据
        pageIndex: req.body.pageIndex//当前页码
    };
    if (util.isEmptyValue("shanxiHospitalCon.defaultHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省医院默认展示页面",//服务名称
                    params: {//请求参数
                        pageSize: req.body.pageSize,//当前页显示几条数据
                        pageIndex: req.body.pageIndex//当前页码
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
/*
*陕西省医院详情页面 医院名称或医生姓名查询
*/
const allHospital = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "1",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        hosName: req.body.hosName,//医院名称或医生姓名
        pageSize: req.body.pageSize,//当前页显示几条数据
        pageIndex: req.body.pageIndex//当前页码
    };
    if (util.isEmptyValue("shanxiHospitalCon.allHospital", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                if (results.responseBody.errorCode == "100004") {
                    params.taskId = "2";//如果查询医院没有结果就执行taskId=“2”;请求查询医生接口
                    shanxiHospitalService.allHospital(params)
                        .then((result) => {
                            res.send(result);
                            var logData = {
                                localFrom: req.body.localFrom,//项目用户名称
                                clientID: params.clientID,//用户设备ID
                                serviceID: serviceID,//前台服务ID
                                templateID: params.serviceId,//引擎模板服务ID
                                taskId: params.taskId,//引擎模板服务taskID
                                taskName: "陕西省医院详情页面 医院名称或医生姓名查询",//服务名称
                                params: {//请求参数
                                    hosName: req.body.hosName,//医院名称或医生姓名
                                    pageSize: req.body.pageSize,//当前页显示几条数据
                                    pageIndex: req.body.pageIndex//当前页码
                                },
                                results: JSON.stringify(results)//返回结果
                            };
                            userLogDAO.add(logData);
                        }).catch((err) => {
                        res.send(err);
                    });
                } else {
                    res.send(results);
                }
            }).catch((err) => {
            res.send(err);
        });
    }
};
/*
*医院的预约科室信息和所对应医院详情
*/
const shaanxiDepartment = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "4",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        hosId: req.body.hosId//医院名称或医生姓名的所属id hospCode，hosId
    };
    if (util.isEmptyValue("shanxiHospitalCon.shaanxiDepartment", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省医院的预约科室信息和所对应医院详情",//服务名称
                    params: {//请求参数
                        hosId: req.body.hosId//医院名称或医生姓名的所属id hospCode，hosId
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//科室列表
const ksList = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "27",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        hosCode: req.body.hosCode//医院名称或医生姓名的所属id hospCode，hosId
    };
    if (util.isEmptyValue("shanxiHospitalCon.ksList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.pId = req.body.pId || "";
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省医院的科室列表",//服务名称
                    params: {//请求参数
                        hosCode: req.body.hosCode//医院名称或医生姓名的所属id hospCode，hosId
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}

/*
*科室门诊详情 余量查询
*/

const shaanxiOutpatient = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "6",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        hosCode: req.body.hosCode,//hosId（从接口默认展示医院中获取）
        deptCode: req.body.deptCode,//deptId（从接口科室信息中获取）
        pageIndex: req.body.pageIndex,
        pageSize: req.body.pageSize
    };
    if (util.isEmptyValue("shanxiHospitalCon.shaanxiOutpatient", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省医院的科室门诊详情 余量查询",//服务名称
                    params: {//请求参数
                        hosCode: req.body.hosCode,//hosId（从接口默认展示医院中获取）
                        deptCode: req.body.deptCode,//deptId（从接口科室信息中获取）
                        pageIndex: req.body.pageIndex,
                        pageSize: req.body.pageSize
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}

/*科室门诊详情*/
const departmentDetail = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "5",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        hosCode: req.body.hosCode,//hosId（从接口默认展示医院中获取）
    };
    if (util.isEmptyValue("shanxiHospitalCon.departmentDetail", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省医院的科室门诊详情",//服务名称
                    params: {//请求参数
                        hosCode: req.body.hosCode,//hosId（从接口默认展示医院中获取）
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
/*
*点击有号按钮，选择就诊时间
*/
const specific = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "10",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        doctorId: req.body.doctorId,
        deptCode: req.body.deptCode,
        hosCode: req.body.hosCode,
        regDate: req.body.regDate,
        isTime: req.body.isTime
    };
    if (util.isEmptyValue("shanxiHospitalCon.specific", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省医院的点击有号按钮，选择就诊时间",//服务名称
                    params: {//请求参数
                        doctorId: req.body.doctorId,
                        deptCode: req.body.deptCode,
                        hosCode: req.body.hosCode,
                        regDate: req.body.regDate,
                        isTime: req.body.isTime
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
}
/*
*预约挂号 选择医师及就诊日期，点击有号按钮，选择就诊时间。点击挂号判断用户是否登陆，登陆后进入预约挂号的页面
*/
const doctorSpecialty = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "8",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        DocId: req.body.DocId,//doctorId (从科室门诊详情 余量查询)
        Deptcode: req.body.Deptcode,//deptId（从接口科室信息中获取）
        HosId: req.body.HosId,//hosId（从接口默认展示医院中获取）
        pageIndex: req.body.pageIndex,
        pageSize: req.body.pageSize
    };
    if (util.isEmptyValue("shanxiHospitalCon.doctorSpecialty", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省医院的预约挂号 选择医师及就诊日期，点击有号按钮，选择就诊时间。点击挂号判断用户是否登陆，登陆后进入预约挂号的页面",//服务名称
                    params: {//请求参数
                        DocId: req.body.DocId,//doctorId (从科室门诊详情 余量查询)
                        Deptcode: req.body.Deptcode,//deptId（从接口科室信息中获取）
                        HosId: req.body.HosId,//hosId（从接口默认展示医院中获取）
                        pageIndex: req.body.pageIndex,
                        pageSize: req.body.pageSize
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
/*
*排班科室时间（日历）
*/
const caldate = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "28",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        hosCode: req.body.hosCode//hosId（从接口默认展示医院中获取）
    };
    if (util.isEmptyValue("shanxiHospitalCon.caldate", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省医院的排班科室时间（日历）",//服务名称
                    params: {//请求参数
                        hosCode: req.body.hosCode//hosId（从接口默认展示医院中获取）
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
const calendar = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "7",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        hosCode: req.body.hosCode//hosId（从接口默认展示医院中获取）
    };
    if (util.isEmptyValue("shanxiHospitalCon.calendar", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.startDate = req.body.startDate || "";
        params.maxRegDays = req.body.maxRegDays;
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省医院的排班科室时间（日历）",//服务名称
                    params: {//请求参数
                        hosCode: req.body.hosCode//hosId（从接口默认展示医院中获取）
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};

const GetBusiness = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "29",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        hospId: req.body.hospId,//hosId（从接口默认展示医院中获取）
    };
    if (util.isEmptyValue("shanxiHospitalCon.GetBusiness", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省医院的获取验证码密钥值",//服务名称
                    params: {//请求参数
                        hospId: req.body.hospId,//hosId（从接口默认展示医院中获取）
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const visitTime = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "9",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        doctorId: req.body.doctorId,//doctorId (从科室门诊详情 余量查询)
        deptCode: req.body.deptCode,//deptId（从接口科室信息中获取）
        hosCode: req.body.hosCode,//hosId（从接口默认展示医院中获取）
        pageIndex: req.body.pageIndex,
        pageSize: req.body.pageSize,
        maxRegDays: req.body.maxRegDays
    };
    if (util.isEmptyValue("shanxiHospitalCon.visitTime", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省医院的获取就诊时间",//服务名称
                    params: {//请求参数
                        doctorId: req.body.doctorId,//doctorId (从科室门诊详情 余量查询)
                        deptCode: req.body.deptCode,//deptId（从接口科室信息中获取）
                        hosCode: req.body.hosCode,//hosId（从接口默认展示医院中获取）
                        pageIndex: req.body.pageIndex,
                        pageSize: req.body.pageSize,
                        maxRegDays: req.body.maxRegDays
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};


/*
*挂号页面 所需要的信息
*/
const registerInfo = (req, res, next) => {//医生信息
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "17",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        docCode: req.body.docCode,//doctorId (从科室门诊详情 余量查询)
        deptCode: req.body.deptCode,//deptId（从接口科室信息中获取）
        hosCode: req.body.hosCode//hosId（从接口默认展示医院中获取）
    };
    if (util.isEmptyValue("shanxiHospitalCon.registerInfo", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省医院的挂号页面所需要的信息",//服务名称
                    params: {//请求参数
                        docCode: req.body.docCode,//doctorId (从科室门诊详情 余量查询)
                        deptCode: req.body.deptCode,//deptId（从接口科室信息中获取）
                        hosCode: req.body.hosCode//hosId（从接口默认展示医院中获取）
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};

const getDeptInfo = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "30",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        deptCode: req.body.deptCode,//deptId（从接口科室信息中获取）
        hosCode: req.body.hosCode//hosId（从接口默认展示医院中获取）
    };
    if (util.isEmptyValue("shanxiHospitalCon.getDeptInfo", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省医院的获取门诊信息",//服务名称
                    params: {//请求参数
                        deptCode: req.body.deptCode,//deptId（从接口科室信息中获取）
                        hosCode: req.body.hosCode//hosId（从接口默认展示医院中获取）
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
/*
病人信息
*/
const patientInfo = (req, res, next) => {//病人信息
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "18",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        hospCode: req.body.hospCode,//hosId（从接口默认展示医院中获取）
        deptCode: req.body.deptCode,//deptId（从接口科室信息中获取）
        docCode: req.body.docCode,//doctorId (从科室门诊详情 余量查询)
        regDateDate: req.body.regDateDate, //（从排班科室时间）getRegTime
        isTime: req.body.isTime,//
        regLevel: req.body.regLevel,
        timeFlag: req.body.timeFlag,
        regFee: req.body.regFee,
        cliFee: req.body.cliFee,
        totalFee: req.body.totalFee,
        startTime: req.body.startTime,
        endTime: req.body.endTime
    };
    if (util.isEmptyValue("shanxiHospitalCon.patientInfo", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.muserId = req.body.muserId;
        params.accountId = req.body.accountId;
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省医院的获取病人信息",//服务名称
                    params: {//请求参数
                        hospCode: req.body.hospCode,//hosId（从接口默认展示医院中获取）
                        deptCode: req.body.deptCode,//deptId（从接口科室信息中获取）
                        docCode: req.body.docCode,//doctorId (从科室门诊详情 余量查询)
                        regDateDate: req.body.regDateDate, //（从排班科室时间）getRegTime
                        isTime: req.body.isTime,//
                        regLevel: req.body.regLevel,
                        timeFlag: req.body.timeFlag,
                        regFee: req.body.regFee,
                        cliFee: req.body.cliFee,
                        totalFee: req.body.totalFee,
                        startTime: req.body.startTime,
                        endTime: req.body.endTime
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
/*
*添加就诊人
*/
const addPatient = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "19",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        uName: req.body.uName,
        idType: req.body.idType,
        uSex: req.body.uSex,
        birthday: req.body.birthday,
        idCode: req.body.idCode,
        mobile: req.body.mobile,
        address: req.body.address,
        mUserType: req.body.mUserType,
        accountId: req.body.accountId
    };
    if (util.isEmptyValue("shanxiHospitalCon.addPatient", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.muserId = req.body.muserId;
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省医院添加就诊人",//服务名称
                    params: {//请求参数
                        uName: req.body.uName,
                        idType: req.body.idType,
                        uSex: req.body.uSex,
                        birthday: req.body.birthday,
                        idCode: req.body.idCode,
                        mobile: req.body.mobile,
                        address: req.body.address,
                        mUserType: req.body.mUserType,
                        accountId: req.body.accountId
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}

/*
*确认预约
*/
const confirmAppointment = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "20",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        hosId: req.body.hosId,
        deptId: req.body.deptId,
        doctorId: req.body.doctorId,
        regDate: req.body.regDate,
        timeFlag: req.body.timeFlag,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        payableFee: req.body.payableFee,
        returnFlag: req.body.returnFlag,
        openId: req.body.openId,
        ordType: req.body.ordType,
        birthday: req.body.birthday,
        regType: req.body.regType,
        idCardNo: req.body.idCardNo,
        idCardType: req.body.idCardType,
        patientuName: req.body.patientuName,
        patientType: req.body.patientType,
        sex: req.body.sex,
        mobile: req.body.mobile,
        parentIdCardNo: req.body.parentIdCardNo,
        parentIdCardType: req.body.parentIdCardType,
        parentMobile: req.body.parentMobile,
        parentName: req.body.parentName,
        deptName: req.body.deptName,
        docName: req.body.docName,
        patientmuserId: req.body.patientmuserId,
        regBindCardno: req.body.regBindCardno
    };
    if (util.isEmptyValue("shanxiHospitalCon.confirmAppointment", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.cardNo = req.body.cardNo;
        params.cardType = req.body.cardType;
        params.regLevel = req.body.regLevel;
        params.address = req.body.address;
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省医院确认预约",//服务名称
                    params: {//请求参数
                        hosId: req.body.hosId,
                        deptId: req.body.deptId,
                        doctorId: req.body.doctorId,
                        regDate: req.body.regDate,
                        timeFlag: req.body.timeFlag,
                        startTime: req.body.startTime,
                        endTime: req.body.endTime,
                        payableFee: req.body.payableFee,
                        returnFlag: req.body.returnFlag,
                        openId: req.body.openId,
                        ordType: req.body.ordType,
                        birthday: req.body.birthday,
                        regType: req.body.regType,
                        idCardNo: req.body.idCardNo,
                        idCardType: req.body.idCardType,
                        patientuName: req.body.patientuName,
                        patientType: req.body.patientType,
                        sex: req.body.sex,
                        mobile: req.body.mobile,
                        parentIdCardNo: req.body.parentIdCardNo,
                        parentIdCardType: req.body.parentIdCardType,
                        parentMobile: req.body.parentMobile,
                        parentName: req.body.parentName,
                        deptName: req.body.deptName,
                        docName: req.body.docName,
                        patientmuserId: req.body.patientmuserId,
                        regBindCardno: req.body.regBindCardno,
                        cardNo : req.body.cardNo,
                cardType : req.body.cardType,
                regLevel : req.body.regLevel,
                address : req.body.address
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};

const getCardList = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "32",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        patientbirthday: req.body.patientbirthday,
        patientmobile: req.body.patientmobile,
        patientidCode: req.body.patientidCode,
        patientuSex: req.body.patientuSex,
        patientidType: req.body.patientidType,
        regDateDate: req.body.regDateDate,
        returnFlag: req.body.returnFlag,
        patientuName: req.body.patientuName,
        hosId: req.body.hosId,
        mUserId: req.body.mUserId
    };
    if (util.isEmptyValue("shanxiHospitalCon.getCardList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.corpId = req.body.corpId;
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省医院进行卡(就诊人院诊疗卡)查询接口",//服务名称
                    params: {//请求参数
                        patientbirthday: req.body.patientbirthday,
                        patientmobile: req.body.patientmobile,
                        patientidCode: req.body.patientidCode,
                        patientuSex: req.body.patientuSex,
                        patientidType: req.body.patientidType,
                        regDateDate: req.body.regDateDate,
                        returnFlag: req.body.returnFlag,
                        patientuName: req.body.patientuName,
                        hosId: req.body.hosId,
                        mUserId: req.body.mUserId
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
const getMyProfile = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "31",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("shanxiHospitalCon.getMyProfile", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
}
/*
* 预约成功后查看个人挂号单详情
*/
const lookOrder = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "21",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        orderno: req.body.orderno,
        pageIndex: req.body.pageIndex,
        pageSize: req.body.pageSize
    };
    if (util.isEmptyValue("shanxiHospitalCon.lookOrder", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.beginDate = req.body.beginDate;
        params.endDate = req.body.endDate;
        params.orderStatus = req.body.orderStatus;
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省医院预约成功后查看个人挂号单详情",//服务名称
                    params: {//请求参数
                        orderno: req.body.orderno,
                        pageIndex: req.body.pageIndex,
                        pageSize: req.body.pageSize
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}

/*
*点击个人中心查看订单详情 所有的
*/

const lookAllOrder = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "22",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        pageIndex: req.body.pageIndex,
        pageSize: req.body.pageSize
    };
    if (util.isEmptyValue("shanxiHospitalCon.lookAllOrder", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.beginDate = req.body.beginDate;
        params.endDate = req.body.endDate;
        params.orderStatus = req.body.orderStatus;
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省医院点击个人中心查看订单详情 所有的",//服务名称
                    params: {//请求参数
                        pageIndex: req.body.pageIndex,
                        pageSize: req.body.pageSize
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}

/*
*个人中心—取消预约
*/
const cancelOrder = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "23",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        orderNo: req.body.orderNo
    };
    if (util.isEmptyValue("shanxiHospitalCon.cancelOrder", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省预约个人中心—取消预约",//服务名称
                    params: {//请求参数
                        orderNo: req.body.orderNo
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
/*
*如上一步成功，需要请求下一步接口，成功后需请求短信接口
*/
const cancelCurrentOrder = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "24",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        orderNo: req.body.orderNo,
        regName: req.body.regName,
        hospName: req.body.hospName,
        deptName: req.body.deptName,
        docName: req.body.docName,
        orderTime: req.body.orderTime,
        regMobil: req.body.regMobil
    };
    if (util.isEmptyValue("shanxiHospitalCon.cancelCurrentOrder", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省预约取消预约的短信接口",//服务名称
                    params: {//请求参数
                        orderNo: req.body.orderNo,
                        regName: req.body.regName,
                        hospName: req.body.hospName,
                        deptName: req.body.deptName,
                        docName: req.body.docName,
                        orderTime: req.body.orderTime,
                        regMobil: req.body.regMobil
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}

/*
*获取短信验证码 前台需要把参数转成字符，并进行window.btoa（）加密得到data 传入后台
*/
const messageCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "13",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        data: req.body.data
    };
    if (util.isEmptyValue("shanxiHospitalCon.messageCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省预约获取短信验证码",//服务名称
                    params: {//请求参数
                        data: req.body.data
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}

/*
*登录 密码需前台md5加密
*/

const login = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "12",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        loginId: req.body.loginId,
        password: req.body.password,
        validCode: req.body.validCode,
        isRemember: req.body.isRemember
    };
    if (util.isEmptyValue("shanxiHospitalCon.login", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                if (results.retCode == "000000" && results.responseBody.returnCode == "SUCCESS") {
                    var modifyFields = {
                        userName: req.body.loginId,
                        password: req.body._password,
                        localFrom: req.body.localFrom
                    };
                    userLoginInfoDAO.modify(params.clientID, serviceID, modifyFields, () => {
                    });
                }
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省预约登录",//服务名称
                    params: {//请求参数
                        loginId: req.body.loginId,
                        password: req.body.password,
                        validCode: req.body.validCode,
                        isRemember: req.body.isRemember
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
}

/*
*获取图片验证码
*/
const pictureCode = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "11",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("shanxiHospitalCon.pictureCode", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    //http://47.96.254.45/service/
                    res.send(results.responseBody.data);
                } else {
                    res.send("/images/refreshCode.png");
                }
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省预约获取图片验证码",//服务名称
                    params: {//请求参数
                        data: req.body.data
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}

/*
*注册 前台需要把参数转成字符，并进行window.btoa（）加密得到data 传入后台
* 密码需前台md5加密
*/
const register = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "14",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        telNum: req.body.telNum,
        loginId: req.body.loginId,
        password: req.body.password,
        realName: req.body.realName,
        mobileImgCode: req.body.mobileImgCode

    };
    if (util.isEmptyValue("shanxiHospitalCon.register", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省预约注册",//服务名称
                    params: {//请求参数
                        telNum: req.body.telNum,
                        loginId: req.body.loginId,
                        password: req.body.password,
                        realName: req.body.realName,
                        mobileImgCode: req.body.mobileImgCode
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}

/*
*找回密码 需要先判断短信验证码是否正确
* 密码需前台md5加密
*/
const retrievePassword = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "25",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        memCard: req.body.memCard,
        vCode: req.body.vCode,
        memTel: req.body.memTel
    };
    if (util.isEmptyValue("shanxiHospitalCon.retrievePassword", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省预约找回密码",//服务名称
                    params: {//请求参数
                        memCard: req.body.memCard,
                        vCode: req.body.vCode,
                        memTel: req.body.memTel
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}

/*
* 确认修改密码接口
* 密码需前台md5加密
*/
const confirmModifyPassword = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        serviceId: "shaanxiHospital",
        taskId: "16",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        memTel: req.body.memTel,
        memCard: req.body.memCard,
        newPwd: req.body.newPwd
    };
    if (util.isEmptyValue("shanxiHospitalCon.confirmModifyPassword", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        shanxiHospitalService.allHospital(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: params.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: params.serviceId,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "陕西省预约确认修改密码接口",//服务名称
                    params: {//请求参数
                        memTel: req.body.memTel,
                        memCard: req.body.memCard,
                        newPwd: req.body.newPwd
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}


exports.shanxiHospitalCon = shanxiHospitalCon;