const table = "sfCode",
    _ = require('underscore'),
    util = require('../../lib/util').util,
    config = require("../../config"),
    conf = require('../../configfile/system.json'),
    connect = require('../db/mongoDB').connect(conf.db.url, conf.db.options);
let sfCodeDAO = {};

sfCodeDAO.sfCodeUpdate = (callback) => {
    // const url = config.get("api.apiInfo.url") + "/shengfendaima?iw-apikey=" + config.get("api.apiInfo.apikey") + "&iw-cmd=shengfendaima";
    const url = `${config.get("api.apiInfo.host_199")}/sbgajtaqzhfwglpt/shengfendaima?iw-apikey=${config.get("api.apiInfo.apikey_199")}&iw-cmd=shengfendaima&APISession=1234`;
    console.log("sfCodeDAO.sfCodeUpdate:" + url);
    util.getData(url, {rejectUnauthorized: false}, (err, body) => {
        if (body.rtnCode == '000000') {
            const sfList = body.data["SFDMList"];
            connect((DB) => {
                DB.collection(table).removeMany({}, (err) => {
                    if (err) {
                        return callback(err)
                    }
                    let dataList = []
                    _.each(sfList, (item) => {
                        dataList.push({"sfName": item.sfName, "sfCode": item.sfCode});
                    })
                    DB.collection(table).insertMany(dataList, (err, msg) => {
                        callback(err);
                    })
                })
            })
        } else {
            callback(null)
        }
    })
};
sfCodeDAO.findRegExp = (sfName, cb) => {
    var name = new RegExp(sfName);
    connect((DB) => {
        DB.collection(table).findOne({sfName: name}, (err, sf) => {
            return cb(err, sf)
        })
    })
};
exports.sfCodeDAO = sfCodeDAO;
