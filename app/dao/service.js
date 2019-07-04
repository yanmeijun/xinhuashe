const table = "service",
    _ = require('underscore'),
    conf = require('../../configfile/system.json'),
    connect = require('../db/mongoDB').connect(conf.db.url, conf.db.options);
let serviceDAO = {};

serviceDAO.get = (conditions, cb) => {
    // if (_.isEmpty(conditions)) {
    //     return cb(new Error("获取service，服务不能为空！"));
    // }
    connect((DB) => {
        DB.collection(table).find(conditions).toArray((err, array) => {
            cb(err, array);
        })
    })
};

serviceDAO.getAll = (cb) => {
    connect((DB) => {
        DB.collection(table).find({}, (err, service) => {
            var result = {
                items: service,
                totalRecords: _.size(service),
                iTotalDisplayRecords: _.size(service),
                iTotalRecords: _.size(service),
                sEcho: "1",
                pageCount: 1
            };
            return cb(err, result);
        })
    })
};
serviceDAO.add = (info, cb) => {
    if (_.isEmpty(info.serviceID) || _.isEmpty(info.serviceName)) {
        return cb(new Error("新增service，serviceID不能为空！"));
    }
    connect((DB) => {
        DB.collection(table).insertOne(info, (err) => {
            return cb(err);
        })
    })
};
serviceDAO.modify = (serviceID, modifyFields, cb) => {
    if (_.isEmpty(serviceID)) {
        return cb(new Error("修改service,serviceID不能为空！"));
    }
    connect((DB) => {
        DB.collection(table).findOneAndUpdate({serviceID: serviceID}, {$set: modifyFields}, {upsert: true}, (err) => {
            return cb(err);
        })
    })

};
serviceDAO.delete = (serviceID, cb) => {
    if (_.isEmpty(serviceID)) {
        return cb(new Error("删除service,serviceID不能为空！"));
    }
    connect((DB) => {
        DB.collection(table).deleteOne({serviceID: serviceID}, (err) => {
            return cb(err);
        })
    })
}
serviceDAO.getTenantsForPaging = (params, cb) => {
    console.log("调用serviceDAO.getTenantsForPaging，service服务列表");
    let result = {}
    const pageNumber = params.pos || 1,
        size = parseInt(params.size),
        skipFrom = (pageNumber * size) - size,
        sortField = params.sortField || "createDate",
        sort = (params.sortAsc ? 1 : -1),
        jsonObj = JSON.parse("{\"" + sortField + "\":" + sort + "}");

    connect((DB) => {
        DB.collection(table).find({}).sort(jsonObj).skip(skipFrom).limit(size).toArray((error, results) => {
            if (error) {
                console.log("获取所有service服务列表，分页：%s", error)
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
exports.serviceDAO = serviceDAO;