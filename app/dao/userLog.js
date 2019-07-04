const table = "userLog",
    _ = require('underscore'),
    moment = require('moment'),
    async = require("async"),
    conf = require('../../configfile/system.json'),
    connect = require('../db/mongoDB').connect(conf.db.url, conf.db.options);
let userLogDAO = {};

userLogDAO.get = (userID, cb) => {
    if (_.isEmpty(userID)) {
        return cb(new Error("获取用户日志信息userID不能为空！"));
    }
    connect((DB) => {
        DB.collection(table).find({'userID': userID}).toArray((err, logInfo) => {
            return cb(err, logInfo)
        })
    })
};
userLogDAO.add = (info) => {
    console.log("新增用户日志信息：userLogDAO.get:" + info.clientID)
    if (_.isEmpty(info.clientID)) {
        return;
    }
    info.time = moment().format('YYYY-MM-DD HH:mm:ss');
    info.shortTime = moment().format('YYYY-MM-DD');
    connect((DB) => {
        DB.collection(table).insertOne(info, (err) => {
            if (err) console.error("新增用户日志信息：%s", err);
            return;
        })
    })
};
userLogDAO.getServiceCount = (conditions, cb) => {
    if (_.isEmpty(conditions)) {
        return cb(null);
    }
    // var info;
    // if(conditions.serviceID){
    //     info = {userID: conditions.userID,serviceID: conditions.serviceID}
    // }else{
    //     info = {userID: conditions.userID}
    // }
    connect((DB) => {
        DB.collection(table).count(conditions, (error, count) => {
            return cb(error, count)
        })
    })
};
userLogDAO.getServiceAllCount = (conditions, cb) => {
    if (_.isEmpty(conditions)) {
        return cb(null);
    }
    var results = [];
    connect((DB) => {
        async.parallel([(callback) => {
            DB.collection(table).count(_.extend(conditions, {serviceID: "AAB0001"}), (error, count) => {
                if (count && count > 0) {
                    results.push({serviceID: "AAB0001", serviceName: "驾照扣分查询", serviceCount: count})
                }
                callback(error)
            })
        }, (callback) => {
            DB.collection(table).count(_.extend(conditions, {serviceID: "AAA0001"}), (error, count) => {
                if (count && count > 0) {
                    results.push({serviceID: "AAA0001", serviceName: "车辆违章查询", serviceCount: count})
                }
                callback(error)
            })
        }, (callback) => {
            DB.collection(table).count(_.extend(conditions, {serviceID: "BAA0001"}), (error, count) => {
                if (count && count > 0) {
                    results.push({serviceID: "BAA0001", serviceName: "北京社保查询", serviceCount: count})
                }
                callback(error)
            })
        }, (callback) => {
            DB.collection(table).count(_.extend(conditions, {serviceID: "CAB0001"}), (error, count) => {
                if (count && count > 0) {
                    results.push({serviceID: "CAB0001", serviceName: "学历证书查询", serviceCount: count})
                }
                callback(error)
            })
        }], (err) => {
            return cb(err, results);
        });
    })
};
exports.userLogDAO = userLogDAO;