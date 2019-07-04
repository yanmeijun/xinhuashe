const urlParse = require('url'),
    _ = require('underscore'),
    config = require("../../config"),
    util = require('../../lib/util').util,
    userLogDAO = require('../dao/userLog').userLogDAO,
    userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    cityDAO = require('../dao/city').cityDAO,
    anhuiHospitalService = require("../logics/anhuiHospital").anhuiHospitalService;
const path = "anhuiHospital/";
const serviceID = "DAA0009", templateID = "anhuiHospital";
let anhuiHospitalCon = {};

anhuiHospitalCon.getCon = (req, res, next) => {
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
    console.log("安徽挂号renderName: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("安徽挂号请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
//获取热门医院列表
const getHospList = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "3",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        pageNo: req.body.pageNo,
        pageSize: req.body.pageSize,
        lname: req.body.lname,
        tname: req.body.tname,
        cid: req.body.cid,
        odType: req.body.odType,
        clevel: req.body.clevel
    };
    if (util.isEmptyValue("anhuiHospitalCon.getHospList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        anhuiHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "获取热门医院列表",//服务名称
                    params: {//请求参数
                        pageNo: req.body.pageNo,//请求得页数
                        pageSize: req.body.pageSize,//显示得条数
                        lname: req.body.lname,//医院的级别
                        tname: req.body.tname,//医院的分类
                        cid: req.body.cid,//城市id
                        odType: req.body.odType,
                        clevel: req.body.clevel
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//按医生和医院名字搜索
const getSearchList = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "4",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        currentPage: req.body.currentPage
    };
    if (util.isEmptyValue("anhuiHospitalCon.getSearchList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.cateId = req.body.cateId;
        params.keyWord = req.body.keyWord;
        anhuiHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "按医生和医院名字搜索",//服务名称
                    params: {//请求参数
                        currentPage: req.body.currentPage,//页数
                        cateId: req.body.cateId,//医院的分类 列如：医院（ah04） 医生（ah03） 资讯（ah） 综合默认为空
                        keyWord: req.body.keyWord//搜索关键字
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//医院详情
const getDetail = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "5",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        shopId: req.body.shopId
    };
    if (util.isEmptyValue("anhuiHospitalCon.getDetail", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        anhuiHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "医院详情",//服务名称
                    params: {//请求参数
                        shopId: req.body.shopId//医院的articleId 从上个接口获取
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//医院科室查询
const getDepartment = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "7",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        shopId: req.body.shopId
    };
    if (util.isEmptyValue("anhuiHospitalCon.getDepartment", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        anhuiHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "医院科室查询",//服务名称
                    params: {//请求参数
                        shopId: req.body.shopId//医院的articleId 从上个接口获取
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//剩余号量接口
const getSurplus = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "6",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        pageNo: req.body.pageNo,
        pageSize: req.body.pageSize,
        shopId: req.body.shopId,
        depaId: req.body.depaId,
        dayTimes: req.body.dayTimes
    };
    if (util.isEmptyValue("anhuiHospitalCon.getSearchList", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        anhuiHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "剩余号量接口",//服务名称
                    params: {//请求参数
                        pageNo: req.body.pageNo,//页数
                        pageSize: req.body.pageSize,//
                        shopId: req.body.shopId,//医院id
                        depaId: req.body.depaId,//科室id
                        dayTimes: req.body.dayTimes//就诊时间
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
// 医生详情
const getDoctorDetail = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "8",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        doctorId: req.body.doctorId
    };
    if (util.isEmptyValue("anhuiHospitalCon.getDoctorDetail", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.hosId = req.body.hosId;
        params.deptId = req.body.deptId;
        anhuiHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "医生详情",//服务名称
                    params: {//请求参数
                        doctorId: req.body.doctorId,//医生id
                        hosId: req.body.hosId,//医院id
                        deptId: req.body.deptId//科室id
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
const getOnlyDoctor = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "22",
        serviceId: "anhuiHospital",
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        doctorId: req.body.doctorId,
        doctorName: req.body.doctorName
    };
    if (util.isEmptyValue("anhuiHospitalCon.getOnlyDoctor", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.hosId = req.body.hosId;
        params.deptId = req.body.deptId;
        anhuiHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "医生详情",//服务名称
                    params: {//请求参数
                        doctorId: req.body.doctorId,//医生id
                        doctorName: req.body.doctorName,//医生名字
                        hosId: req.body.hosId,//医院id
                        deptId: req.body.deptId//科室id
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//医生详情中的日期
const getTime = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "9",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        doctorId: req.body.doctorId,
        doctorName: req.body.doctorName
    };
    if (util.isEmptyValue("anhuiHospitalCon.getTime", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.hosId = req.body.hosId;
        params.deptId = req.body.deptId;
        anhuiHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "医生详情中的日期",//服务名称
                    params: {//请求参数
                        doctorId: req.body.doctorId,//医生id
                        doctorName: req.body.doctorName,//医生名字
                        hosId: req.body.hosId,//医院id
                        deptId: req.body.deptId//科室id
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//预约挂号
const appointment = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "10",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        pageSize: req.body.pageSize,
        pageNo: req.body.pageNo
    };
    if (util.isEmptyValue("anhuiHospitalCon.appointment", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        anhuiHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "预约挂号",//服务名称
                    params: {//请求参数
                        pageSize: req.body.pageSize,
                        pageNo: req.body.pageNo
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//预约挂号医生信息和时间
const appointmentTime = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "11",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        depaId: req.body.depaId,
        sourceId: req.body.sourceId,
        dateTime: req.body.dateTime,
        period: req.body.period,
        shopId: req.body.shopId
    };
    if (util.isEmptyValue("anhuiHospitalCon.getDoctorDetail", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        anhuiHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "预约挂号医生信息和时间",//服务名称
                    params: {//请求参数
                        depaId: req.body.depaId,
                        sourceId: req.body.sourceId,
                        dateTime: req.body.dateTime,
                        period: req.body.period,
                        shopId: req.body.shopId
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
const appointmentTimeDate = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "12",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        depaId: req.body.depaId,
        nsId: req.body.nsId,
        dayTimes: req.body.dayTimes,
        shopId: req.body.shopId
    };
    if (util.isEmptyValue("anhuiHospitalCon.getDoctorDetail", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        anhuiHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "预约挂号医生信息和时间",//服务名称
                    params: {//请求参数
                        depaId: req.body.depaId,
                        nsId: req.body.nsId,
                        dayTimes: req.body.dayTimes,
                        shopId: req.body.shopId
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//预约成功
const orderSuccess = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "13",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        nsId: req.body.nsId,
        nsName: req.body.nsName,
        nsPrice: req.body.nsPrice,
        depaId: req.body.depaId,
        depaName: req.body.depaName,
        hosId: req.body.hosId,
        nsTime: req.body.nsTime,
        nsPeriod: req.body.nsPeriod,
        urlsearch: req.body.urlsearch,
        name: req.body.name,
        sfcode: req.body.sfcode,
        mobile: req.body.mobile
    };
    if (util.isEmptyValue("anhuiHospitalCon.getDoctorDetail", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.lockNo = req.body.lockNo || "";
        params.age = req.body.age;
        params.nsDoctorseq = req.body.nsDoctorseq;
        params.address = req.body.address;
        params.friendBirthday = req.body.friendBirthday;
        params.patientCard = req.body.patientCard;
        params.num = req.body.num;
        params.tzbNum = req.body.tzbNum;
        params.jhName = req.body.jhName;
        params.jhSfcode = req.body.jhSfcode;
        params.jhMobile = req.body.jhMobile;
        params.gender = req.body.gender;
        anhuiHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "预约挂号医生信息和时间",//服务名称
                    params: {//请求参数
                        nsId: req.body.nsId,
                        nsName: req.body.nsName,
                        nsPrice: req.body.nsPrice,
                        depaId: req.body.depaId,
                        depaName: req.body.depaName,
                        hosId: req.body.hosId,
                        nsTime: req.body.nsTime,
                        nsPeriod: req.body.nsPeriod,
                        urlsearch: req.body.urlsearch,
                        name: req.body.name,
                        sfcode: req.body.sfcode,
                        mobile: req.body.mobile,
                        lockNo: req.body.lockNo || "",
                        age: req.body.age,
                        nsDoctorseq: req.body.nsDoctorseq,
                        address: req.body.address,
                        friendBirthday: req.body.friendBirthday,
                        patientCard: req.body.patientCard,
                        num: req.body.num,
                        tzbNum: req.body.tzbNum,
                        jhName: req.body.jhName,
                        jhSfcode: req.body.jhSfcode,
                        jhMobile: req.body.jhMobile,
                        gender: req.body.gender
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//个人订单详情
const orderDetail = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "14",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        orderId: req.body.orderId
    };
    if (util.isEmptyValue("anhuiHospitalCon.getDoctorDetail", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        anhuiHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "个人订单详情",//服务名称
                    params: {//请求参数
                        orderId: req.body.orderId
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//就诊人管理
const addPatient = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "18",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        FRIEND_NAME: req.body.FRIEND_NAME,
        FRIEND_GENDER: req.body.FRIEND_GENDER,
        FRIEND_AGE: req.body.FRIEND_AGE,
        FRIEND_SFCODE: req.body.FRIEND_SFCODE,
        FRIEND_MOBILE: req.body.FRIEND_MOBILE
    };
    if (util.isEmptyValue("anhuiHospitalCon.addPatient", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.FRIEND_ADDR = req.body.FRIEND_ADDR;
        params.FRIEND_CARD_NUM = req.body.FRIEND_CARD_NUM;
        anhuiHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "就诊人管理",//服务名称
                    params: {//请求参数
                        FRIEND_NAME: req.body.FRIEND_NAME,
                        FRIEND_GENDER: req.body.FRIEND_GENDER,
                        FRIEND_AGE: req.body.FRIEND_AGE,
                        FRIEND_SFCODE: req.body.FRIEND_SFCODE,
                        FRIEND_MOBILE: req.body.FRIEND_MOBILE,
                        FRIEND_ADDR: req.body.FRIEND_ADDR,
                        FRIEND_CARD_NUM: req.body.FRIEND_CARD_NUM
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//个人中心—我的挂号订单信息
const personCenter = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "15",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        pageNo: req.body.pageNo,
        pageSize: req.body.pageSize
    };
    if (util.isEmptyValue("anhuiHospitalCon.personCenter", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.keyword = req.body.keyword;
        params.stime = req.body.stime;
        params.etime = req.body.etime;
        anhuiHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "个人中心我的挂号订单信息",//服务名称
                    params: {//请求参数
                        pageSize: req.body.pageSize,
                        keyword: req.body.keyword,
                        stime: req.body.stime,
                        etime: req.body.etime
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//取消预约
const cancel = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "16",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        orderId: req.body.orderId,
        hosId: req.body.hosId
    };
    if (util.isEmptyValue("anhuiHospitalCon.personCenter", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        anhuiHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "取消预约",//服务名称
                    params: {//请求参数
                        orderId: req.body.orderId,
                        hosId: req.body.hosId
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//登录
const login = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "2",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        mobile: req.body.mobile,//用户名
        password: req.body.password,//密码
        challenge: req.body.challenge,
        validate: req.body.validate,
        seccode: req.body.seccode
    };
    if (util.isEmptyValue("anhuiHospitalCon.personCenter", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        anhuiHospitalService.postData(params)
            .then((results) => {
                if (results.retCode == "000000" && results.responseBody.code == "1") {
                    var modifyFields = {
                        userName: req.body.mobile,
                        password: req.body.password,
                        localFrom: req.body.localFrom
                    };
                    userLoginInfoDAO.modify(params.clientID, serviceID, modifyFields, () => {
                    });
                }
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "登录",//服务名称
                    params: {//请求参数
                        mobile: req.body.mobile,//用户名
                        password: req.body.password,//密码
                        challenge: req.body.challenge,//图片验证码
                        validate: req.body.validate,//图片验证码
                        seccode: req.body.seccode//图片验证码
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//获取登录验证码
const verification = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "1",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("anhuiHospitalCon.getLoginMessage", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        anhuiHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "获取登录验证码",//服务名称
                    params: {//请求参数
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//找回密码
const getPassword = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "21",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        mobile: req.body.mobile,
        vcode: req.body.vcode,
        password: req.body.password
    };
    if (util.isEmptyValue("anhuiHospitalCon.getLoginMessage", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        anhuiHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "找回密码",//服务名称
                    params: {//请求参数
                        mobile: new Buffer.from(req.body.mobile).toString('base64'),
                        vcode: req.body.vcode,//短信验证码
                        password: new Buffer.from(req.body.password).toString('base64')
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//获取短信验证码
const getMessage = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "19",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        mobile: req.body.mobile,
        randomCode: req.body.randomCode,
        challenge: req.body.challenge,
        validate: req.body.validate,
        seccode: req.body.seccode,
        type: req.body.type//忘记密码的短信验证码参数为2    注册的短信验证码参数为1
    };
    if (util.isEmptyValue("anhuiHospitalCon.getLoginMessage", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        anhuiHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "获取短信验证码",//服务名称
                    params: {//请求参数
                        mobile: mobile,//用户名
                        randomCode: req.body.randomCode,
                        challenge: req.body.challenge,
                        validate: req.body.validate,
                        seccode: req.body.seccode,
                        type: req.body.type
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//注册
const register = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "20",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y,//城市纬度
        mobile: req.body.mobile,//用户名
        vcode: req.body.vcode,
        password: req.body.password,//密码
        name: req.body.name,
        sfcode: req.body.sfcode//身份证
    };
    if (util.isEmptyValue("anhuiHospitalCon.getLoginMessage", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        params.province = req.body.province;
        anhuiHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "注册",//服务名称
                    params: {//请求参数
                        mobile: req.body.mobile,
                        vcode: req.body.vcode,
                        password: req.body.password,
                        name: req.body.name,
                        province: req.body.province,
                        sfcode: req.body.sfcode//身份证
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
//退出登录
const signOTut = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,
        taskId: "17",
        serviceId: templateID,
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("anhuiHospitalCon.getLoginMessage", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"detail": "请求参数不完整，请检查！"}});
    } else {
        anhuiHospitalService.postData(params)
            .then((results) => {
                res.send(results);
                var logData = {
                    localFrom: req.body.localFrom,//项目用户名称
                    clientID: req.body.clientID,//用户设备ID
                    serviceID: serviceID,//前台服务ID
                    templateID: templateID,//引擎模板服务ID
                    taskId: params.taskId,//引擎模板服务taskID
                    taskName: "退出登录",//服务名称
                    params: {//请求参数
                    },
                    results: JSON.stringify(results)//返回结果
                };
                userLogDAO.add(logData);
            }).catch((err) => {
            res.send(err);
        });
    }
}
exports.anhuiHospitalCon = anhuiHospitalCon;