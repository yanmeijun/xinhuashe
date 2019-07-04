const table = "User",
    _ = require('underscore'),
    conf = require('../../configfile/system.json'),
    connect = require('../db/mongoDB').connect(conf.db.url, conf.db.options);
let userDAO = {};

userDAO.get = (userID, cb) => {
    console.log("获取用户信息userDAO.get:" + userID)
    if (_.isEmpty(userID) || userID == "0" || userID == 0) {
        return cb(null, null);
    }
    connect((DB) => {
        DB.collection(table).findOne({'userID': userID}, (err, userInfo) => {
            return cb(err, userInfo);
        })
    })
};
userDAO.getByConditions = (conditions, cb) => {
    console.log("查询用户信息userDAO.getByConditions:" + JSON.stringify(conditions))
    if (_.isEmpty(conditions)) {
        return cb(new Error("查询用户不能为空！"));
    }
    connect((DB) => {
        DB.collection(table).findOne(conditions, (err, userInfo) => {
            return cb(err, userInfo);
        })
    })
};
userDAO.add = (info, cb) => {
    console.log("增加用户userDAO.add:" + info.userID);
    if (_.isEmpty(info.userID)) {
        return cb(new Error("增加用户userID不能为空！"));
    }
    connect((DB) => {
        DB.collection(table).insertOne(info, (err) => {
            return cb(err);
        })
    })
};
userDAO.modify = (userID, modifyFields, cb) => {
    if (_.isEmpty(userID)) {
        return cb(new Error("修改用户userID不能为空！"));
    }
    delete modifyFields["userID"];
    connect((DB) => {
        DB.collection(table).updateOne({userID: userID}, modifyFields, (err) => {
            return cb(err);
        })
    })
};

userDAO.addUserInfo = (info) => {
    console.log("查询并修改用户信息userDAO.addUserInfo:userID:" + info.userID + ",clientID:" + info.clientID);
    let conditions;
    if (_.isEmpty(info.userID) || info.userID == "0" || info.userID == 0) {
        // return cb?cb(null):null;
        conditions = {clientID: info.clientID}
    } else {
        conditions = {userID: info.userID}
    }
    connect((DB) => {
        DB.collection(table).findOneAndUpdate(conditions, {$set: info}, {upsert: true}, (err) => {
            if (err) console.error("查询并修改用户信息:%s", err);
            return;
        })
    })
}
userDAO.getTenantsForPaging = (params, cb) => {
    console.log("获取用户信息列表：userDAO.getTenantsForPaging");
    let result = {};
    const pageNumber = params.pos || 1,
        size = parseInt(params.size),
        skipFrom = (pageNumber * size) - size,
        sortField = params.sortField || "createDate",
        sort = (params.sortAsc ? 1 : -1),
        jsonObj = JSON.parse("{\"" + sortField + "\":" + sort + "}");

    connect((DB) => {
        DB.collection(table).find({}).sort(jsonObj).skip(skipFrom).limit(size).toArray((error, results) => {
            if (error) {
                console.log("获取用户信息列表,分页：%s", error)
                return cb(error);
            } else {
                DB.collection(table).count({}, (error, count) => {
                    result = {
                        totalRecords: count,
                        iTotalDisplayRecords: count,
                        iTotalRecords: count,
                        sEcho: params.sEcho,
                        pageCount: Math.ceil(count / size),
                        items: results || []
                    };
                    cb(error, result);
                });
            }
        })
    })
};
exports.userDAO = userDAO;