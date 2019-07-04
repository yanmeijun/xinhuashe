const table = "userService",
    _ = require('underscore'),
    conf = require('../../configfile/system.json'),
    connect = require('../db/mongoDB').connect(conf.db.url, conf.db.options);
let userServiceDAO = {};

userServiceDAO.get = (conditions, cb) => {
    // if (_.isEmpty(conditions)) {
    //     return cb(new Error("获取service，服务不能为空！"));
    // }
    connect((DB) => {
        DB.collection(table).find(conditions).toArray((err, array) => {
            cb(err, array);
        })
    })
};

userServiceDAO.add = (info, cb) => {
    if (_.isEmpty(info.serviceID) || _.isEmpty(info.localFrom)) {
        return cb(new Error("新增userService，serviceID、localFrom不能为空！"));
    }
    connect((DB) => {
        DB.collection(table).insertOne(info, (err) => {
            return cb(err);
        })
    })
};
userServiceDAO.modify = (serviceID, localFrom, modifyFields, cb) => {
    if (_.isEmpty(serviceID) || _.isEmpty(localFrom)) {
        return cb(new Error("修改userService,serviceID、localFrom不能为空！"));
    }
    connect((DB) => {
        DB.collection(table).findOneAndUpdate({serviceID, localFrom}, {$set: modifyFields}, {upsert: true}, (err) => {
            return cb(err);
        })
    })

};
userServiceDAO.delete = (serviceID, localFrom, cb) => {
    if (_.isEmpty(serviceID) || _.isEmpty(localFrom)) {
        return cb(new Error("删除userService,serviceID、localFrom不能为空！"));
    }
    connect((DB) => {
        DB.collection(table).deleteOne({serviceID, localFrom}, (err) => {
            return cb(err);
        })
    })
}
exports.userServiceDAO = userServiceDAO;