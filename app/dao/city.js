const table = "city",
    _ = require('underscore'),
    conf = require('../../configfile/system.json'),
    connect = require('../db/mongoDB').connect(conf.db.url, conf.db.options);
let cityDAO = {};

cityDAO.get = (cityID, cb) => {
    console.log("cityDAO.get " + cityID);
    if (_.isEmpty(cityID)) {
        return cb(new Error("获取城市cityID不能为空！"));
    }
    connect((DB) => {
        DB.collection(table).findOne({'cityID': cityID}, (err, cityInfo) => {
            return cb(err, cityInfo);
        })
    })
};
cityDAO.getByCityName = (cityName, cb) => {
    console.log("cityDAO.getByCityName " + cityName);
    if (_.isEmpty(cityName)) {
        return cb(new Error("获取城市cityName不能为空！"));
    }
    connect((DB) => {
        DB.collection(table).findOne({'cityName': new RegExp(cityName)}, (err, cityInfo) => {
            return cb(err, cityInfo);
        })
    })
};
cityDAO.add = (info, cb) => {
    if (_.isEmpty(info.cityID) || _.isEmpty(info.cityName)) {
        return cb(new Error("新增城市cityID不能为空！"));
    }
    connect((DB) => {
        DB.collection(table).insertOne(info, (err) => {
            return cb(err);
        })
    })
};
cityDAO.modify = (cityID, modifyFields, cb) => {
    if (_.isEmpty(cityID)) {
        return cb(new Error("修改城市cityID不能为空！"));
    }
    connect((DB) => {
        DB.collection(table).updateOne({cityID: cityID}, modifyFields, (err) => {
            return cb(err);
        })
    })
}
cityDAO.delete = (cityID, cb) => {
    if (_.isEmpty(cityID)) {
        return cb(new Error("删除城市cityID城市不能为空！"));
    }
    connect((DB) => {
        DB.collection(table).deleteOne({cityID: cityID}, (err) => {
            return cb(err);
        })
    })
}
exports.cityDAO = cityDAO;