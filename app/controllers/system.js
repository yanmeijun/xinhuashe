const urlParse = require('url'),
    _ = require('underscore'),
    serviceDAO = require('../dao/service').serviceDAO,
    userDAO = require('../dao/user').userDAO,
    userLogDAO = require('../dao/userLog').userLogDAO,
    config = require("../../config");
let systemCon = {};

systemCon.getCon = (req, res, next) => {
    const con = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1], method = req.method.toUpperCase();
    if (method == "GET") {
        if (con == "login") {
            renderLogin(req, res)
        } else if (con == "getUser") {
            getUser(req, res, next)
        } else if (con == "getUserInfo") {
            getUserInfo(req, res)
        } else if (con == "getUserService") {
            getUserService(req, res)
        } else if (con == "getAllService") {
            getAllService(req, res)
        } else if (con == "getAllUser") {
            getAllUser(req, res)
        }
    } else if (method == "POST") {
        if (con == "login") {
            postLogin(req, res)
        } else if (con == "addService") {
            addService(req, res)
        } else if (con == "deleteService") {
            deleteService(req, res)
        } else if (con == "modifyService") {
            modifyService(req, res)
        } else if (con == "getAllService") {
            getAllService(req, res)
        }
    }

};
const renderLogin = (req, res) => {
    res.render("system/system_login")
};
const getUser = (req, res, next) => {
    console.log("systemUser:");
    if (req.session.superAdmin) {
        const userID = req.query.userID,
            mobile = req.query.mobile,
            clientID = req.query.clientID;
        let conditions;
        if (userID && userID != "0" && userID != 0) {
            conditions = {userID: userID};
        } else {
            if (clientID) {
                conditions = {clientID: clientID};
            } else if (mobile && mobile.length == 13) {
                conditions = {mobile: mobile};
            } else {
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                res.end("没有找到该用户的信息！");
            }
        }
        userDAO.getByConditions(conditions, function (err, userInfo) {
            if (err) {
                return next(err)
            } else if (_.isEmpty(userInfo)) {
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                res.end("没有找到该用户的信息！");
            } else {
                userLogDAO.getServiceCount(conditions, function (err, serviceCount) {
                    res.render("system/system_user", {userInfo: userInfo, serviceCount: serviceCount})
                })
            }
        });
    } else {
        res.render("system/system_login")
    }
};
const postLogin = function (req, res) {
    const userInfo = {
        userName: req.body.userName,
        password: req.body.password
    };
    console.log("systemLogin:");
    if (userInfo.userName == config.get("system.system.userName") && userInfo.password == config.get("system.system.password")) {
        console.log("systemLogin success:" + userInfo.userName);
        req.session.superAdmin = userInfo.userName;
        // res.coockie.superAdmin = userInfo.userName;
        // res.cookie("superAdmin",{"name":"abc"},{maxAge:1000*60*60*24});
        res.render('system/system', {superAdminName: userInfo.userName});
    } else {
        res.render("system/system_login", {error: "用户名或密码错误！"});
    }
};
const getUserInfo = function (req, res) {
    let userID = req.query.userID,
        mobile = req.query.mobile,
        clientID = req.query.clientID,
        serviceID = req.query.serviceID || "",
        type = req.query.type || "",
        conditions, logConditions, results = [];
    // if(userID){
    //     conditions = {userID: userID}
    // }else if(mobile){
    //     conditions = {mobile: mobile}
    // }else{
    //     res.end("查找条件不能为空！");
    // }
    if (userID && userID != "0" && userID != 0) {
        conditions = {userID: userID};
    } else {
        if (clientID) {
            conditions = {clientID: clientID};
        } else if (mobile && mobile.length == 13) {
            conditions = {mobile: mobile};
        } else {
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
            res.end("没有找到该用户的信息！");
        }
    }
    console.log("getUserInfo:" + conditions);
    userDAO.getByConditions(conditions, function (err, user) {
        if (err) {
            console.log(err);
            res.send({err: err})
        } else if (_.isEmpty(user)) {
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
            res.end("没有找到该用户的信息！");
        } else {
            if (serviceID) {
                // logConditions = {userID:user.userID,serviceID:serviceID};
                logConditions = _.extend(conditions, {serviceID: serviceID});
            } else if (type == "clientID") {
                logConditions = _.extend(conditions, {clientID: user.clientID});
            } else {
                logConditions = conditions;
            }
            userLogDAO.getServiceCount(logConditions, function (err, serviceCount) {
                // user.serviceCount = serviceCount;
                results = {
                    user: user,
                    serviceCount: serviceCount
                };
                res.send(results)
            })
        }
    })
};
const getUserService = function (req, res) {
    let userID = req.query.userID,
        mobile = req.query.mobile,
        clientID = req.query.clientID,
        conditions, results = [];
    // if(userID){
    //     conditions = {userID: userID}
    // }else if(mobile){
    //     conditions = {mobile: mobile}
    // }else{
    //     res.end("查找条件不能为空！");
    // }
    if (userID && userID != "0" && userID != 0) {
        conditions = {userID: userID};
    } else {
        if (clientID) {
            conditions = {clientID: clientID};
        } else if (mobile && mobile.length == 13) {
            conditions = {mobile: mobile};
        } else {
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
            res.end("没有找到该用户的信息！");
        }
    }
    console.log("getUserService:" + conditions);
    userDAO.getByConditions(conditions, function (err, user) {
        if (err) {
            console.log(err);
            res.send({err: err})
        } else if (_.isEmpty(user)) {
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
            res.end("没有找到该用户的信息！");
        } else {
            userLogDAO.getServiceAllCount(conditions, function (err, serviceInfo) {
                results = {
                    user: user,
                    serviceInfo: serviceInfo
                }
                res.send(results)
            })
        }
    })
};
const getAllService = function (req, res) {
    const term = req.query.sSearch || "",
        conditions = {
            sortAsc: (req.query.sSortDir_0 === "asc") || false,
            sortField: eval('req.query.mDataProp_' + req.query.iSortCol_0) || "createDate",
            size: req.query.size || 10,
            pos: req.query.pos,
            sEcho: req.query.sEcho,
            sSearch: term.replace(/(^\s*)|(\s*$)/g, "") || "",
            status: req.query.status || "",
            startDate: req.query.startDate || "",
            endDate: req.query.endDate || "",
            flag: req.query.type === "statistics"
        };
    console.log("getAllService:");
    serviceDAO.getTenantsForPaging(conditions, function (err, data) {
        // console.log(data)
        res.send(data)
    });
    // serviceDAO.getAll(function(err, data){
    //     // console.log(data)
    //     res.send(data)
    // });
};
const addService = function (req, res) {
    const info = {
        serviceName: req.body.name,
        logo: req.body.logo,
        serviceID: req.body.ID,
        url: req.body.url,
        summary: req.body.summary,
        city: req.body.city,
        index: req.body.index,
        online: req.body.online
    }
    console.log("addService:");
    serviceDAO.add(info, function (err) {
        console.log(err)
        res.send(err || {msg: "ok"})
    });
};
const deleteService = function (req, res) {
    const serviceID = req.body.id;
    if (_.isEmpty(serviceID)) {
        res.end("serviceID不能为空")
    }
    console.log("deleteService:");
    serviceDAO.delete(serviceID, function (err) {
        console.log(err)
        res.send(err || {msg: "ok"})
    });
};
const modifyService = function (req, res) {
    const serviceID = req.body.ID, info = {
        serviceName: req.body.name,
        logo: req.body.logo,
        url: req.body.url,
        summary: req.body.summary,
        city: req.body.city,
        index: req.body.index,
        online: req.body.online
    }
    if (_.isEmpty(serviceID)) {
        res.end("serviceID不能为空")
    }
    console.log("modifyService:");
    serviceDAO.modify(serviceID, info, function (err) {
        console.log(err)
        res.send(err || {msg: "ok"})
    });
};
const getAllUser = function (req, res) {
    const term = req.query.sSearch || "",
        conditions = {
            sortAsc: (req.query.sSortDir_0 === "asc") || false,
            sortField: eval('req.query.mDataProp_' + req.query.iSortCol_0) || "createDate",
            size: req.query.size || 10,
            pos: req.query.pos,
            sEcho: req.query.sEcho,
            sSearch: term.replace(/(^\s*)|(\s*$)/g, "") || "",
            status: req.query.status || "",
            startDate: req.query.startDate || "",
            endDate: req.query.endDate || "",
            flag: req.query.type === "statistics"
        };
    console.log("getAllUser:");
    userDAO.getTenantsForPaging(conditions, function (err, data) {
        // console.log(data)
        res.send(data)
    });
};
exports.systemCon = systemCon;