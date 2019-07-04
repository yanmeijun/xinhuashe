const userLoginInfoDAO = require('../dao/userLoginInfo').userLoginInfoDAO,
    serviceDAO = require('../dao/service').serviceDAO;
let userLoginInfoLogic = {};
//获取记录的用户信息
userLoginInfoLogic.getUserInfo = (clientID, serviceID) => {
    return new Promise((resolve, reject) => {
        userLoginInfoDAO.get(clientID, serviceID, function (err, data) {
            if (err) {
                console.error("userLoginInfoDAO.get：" + err);
                reject(err);
            }
            resolve(data);
        })
    })
};
//单条服务授权
userLoginInfoLogic.modifyAccredit = (clientID, serviceID, localFrom) => {
    return new Promise((resolve, reject) => {
        const modifyList = [{
            updateOne: {
                filter: {'clientID': clientID, 'serviceID': serviceID},
                update: {$set: {'accredit': true, 'localFrom': localFrom}},
                upsert: true
            }
        }];
        userLoginInfoDAO.batchModify(modifyList, function (err, data) {
            if (err) {
                console.error("userLoginInfoDAO.batchModify：" + err);
                reject(err);
            }
            resolve(data);
        })
    })
};
//批量服务授权
userLoginInfoLogic.batchModifyAccredit = (clientID, localFrom) => {
    return new Promise((resolve, reject) => {
        let modifyList = [{
            updateOne: {
                filter: {'clientID': clientID, 'serviceID': '000000'},//频道页serviceID：000000
                update: {$set: {'accredit': true, 'localFrom': localFrom}},
                upsert: true
            }
        }];
        serviceDAO.get({}, (err, results) => {
            if (err) {
                console.error("serviceDAO.getAll：" + err);
                reject(err);
            }
            results.forEach(item => {
                modifyList.push({
                    updateOne: {
                        filter: {'clientID': clientID, 'serviceID': item.serviceID},
                        update: {$set: {'accredit': true, 'localFrom': localFrom}},
                        upsert: true
                    }
                })
            });
            userLoginInfoDAO.batchModify(modifyList, function (err, data) {
                if (err) {
                    console.error("userLoginInfoLogic.getAccredit错误：" + err);
                    reject(err);
                }
                resolve(data);
            })
        });

    })
};

exports.userLoginInfoLogic = userLoginInfoLogic;