const urlParse = require('url'),
    util = require('../../lib/util').util,
    userLoginInfoLogic = require("../logics/userLoginInfo").userLoginInfoLogic;
let userLoginInfoCon = {};

userLoginInfoCon.indexCon = function (req, res, next) {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("用户获取授权请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
//获取授权信息
const getAccredit = (req, res) => {
    const clientID = req.body.clientID,
        serviceID = req.body.serviceID;
    if (util.isEmptyValue("userLoginInfoCon.getAccredit", {clientID, serviceID})) {
        res.send({"err": "getAccredit请求参数不完整，请检查！"});
        return;
    }
    userLoginInfoLogic.getUserInfo(clientID, serviceID)
        .then(results => {
            res.send(results);
        })
        .catch(err => {
            res.send(err);
        })
};
//服务授权
const modifyAccredit = (req, res) => {
    const clientID = req.body.clientID,
        serviceID = req.body.serviceID,
        localFrom = req.body.localFrom;
    if (util.isEmptyValue("userLoginInfoCon.modifyAccredit", {clientID})) {
        res.send({"err": "modifyAccredit请求参数不完整，请检查！"});
        return;
    }
    if (serviceID != "000000") {
        userLoginInfoLogic.modifyAccredit(clientID, serviceID, localFrom)
            .then(results => {
                res.send({msg: 'ok', data: results});
            })
            .catch(err => {
                res.send({msg: 'err', err: err});
            })
    } else {
        userLoginInfoLogic.batchModifyAccredit(clientID, localFrom)
            .then(results => {
                res.send({msg: 'ok', data: results});
            })
            .catch(err => {
                res.send({msg: 'err', err: err});
            })
    }
};
//获取记录的用户信息
const getUserInfo = (req, res) => {
    const clientID = req.body.clientID,
        serviceID = req.body.serviceID;
    if (util.isEmptyValue("userLoginInfoCon.getUserInfo", {clientID, serviceID})) {
        res.send({"err": "getUserInfo请求参数不完整，请检查！"});
        return;
    }
    userLoginInfoLogic.getUserInfo(clientID, serviceID)
        .then(results => {
            res.send(results);
        })
        .catch(err => {
            res.send(err);
        })
};

exports.userLoginInfoCon = userLoginInfoCon;