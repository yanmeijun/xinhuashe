const table = "userLoginInfo",
    _ = require('underscore'),
    conf = require('../../configfile/system.json'),
    connect = require('../db/mongoDB').connect(conf.db.url, conf.db.options);
let userLoginInfoDAO = {};

userLoginInfoDAO.get = (clientID, serviceID, cb) => {
    console.log("userLoginInfoDAO.get " + clientID);
    if (_.isEmpty(clientID) || _.isEmpty(serviceID)) {
        return cb(new Error("userLoginInfoDAO.get：clientID、serviceID不能为空！"));
    }
    connect((DB) => {
        DB.collection(table).findOne({'clientID': clientID, 'serviceID': serviceID}, (err, cityInfo) => {
            return cb(err, cityInfo);
        })
    })
};
//单条修改
userLoginInfoDAO.modify = (clientID, serviceID, modifyFields, cb) => {
    if (_.isEmpty(clientID) || _.isEmpty(serviceID)) {
        return cb(new Error("userLoginInfoDAO.modify：clientID、serviceID不能为空！"));
    }
    connect((DB) => {
        DB.collection(table).updateOne({
            'clientID': clientID,
            'serviceID': serviceID
        }, {$set: modifyFields}, {upsert: true}, (err) => {
            return cb(err);
        })
    })
};
//批量修改
userLoginInfoDAO.batchModify = (modifyList, cb) => {
    if (_.isEmpty(modifyList)) {
        return cb(new Error("userLoginInfoDAO.batchModify：modifyList不能为空！"));
    }
    connect((DB) => {
        DB.collection(table).bulkWrite(modifyList, (err) => {
            return cb(err);
        })
    })
};

exports.userLoginInfoDAO = userLoginInfoDAO;