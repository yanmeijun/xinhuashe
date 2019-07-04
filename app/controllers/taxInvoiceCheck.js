const urlParse = require('url'),
    _ = require('underscore'),
    util = require('../../lib/util').util,
    cityDAO = require('../dao/city').cityDAO,
    taxInvoiceCheckService = require("../logics/taxInvoiceCheck").taxInvoiceCheckService;
const path = "taxInvoiceCheck/";
let taxInvoiceCheckCon = {};

taxInvoiceCheckCon.getCon = (req, res, next) => {
    if (req.method.toUpperCase() === "GET") {
        if (_.isEmpty(req.query.page)) {
            apiCon(req, res, next)
        } else {
            pageCon(req, res, next)
        }
    } else {
        apiCon(req, res, next);
    }
};
//页面跳转方法
const pageCon = (req, res, next) => {
    const renderName = req.query.page;
    console.log("国家税务总局全国增值税发票查验renderName: " + renderName);
    cityDAO.get(req.query.cityID, (err, cityInfo) => {
        res.render(path + renderName, _.extend(req.query, {cityInfo: cityInfo}));
    })
};
//api跳转方法
const apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("国家税务总局全国增值税发票查验请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
//国家税务总局全国增值税发票查验
const taxInvoiceCheckVerification = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "1",
        serviceId: "invoice",
        fpdm: req.body.fpdm,//发票代码
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("taxInvoiceCheckCon.taxInvoiceCheckVerification", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        taxInvoiceCheckService.taxInvoiceCheck(params)
            .then((results) => {
                // if(results.retCode == "000000"){
                //     //http://47.96.254.45/service/
                //     res.send(results.responseBody.data);
                // }else{
                //     res.send("/images/refreshCode.png");
                // }
                res.send(results);
            }).catch((err) => {
            res.send(err);
        });
    }
};
//国家税务总局全国增值税发票查验
const taxInvoiceCheckSearch = (req, res, next) => {
    const params = {
        sessionId: req.body.randomKey,//用户randomKey,用来识别用户的唯一性
        taskId: "2",
        serviceId: "invoice",
        fphm: req.body.fphm,//发票代码
        kprq: req.body.kprq,//开票日期
        fpje: req.body.fpje,//开票金额/校验码（待完善）
        yzm: req.body.yzm,//验证码
        userID: req.body.userID,//用户userID
        clientID: req.body.clientID,//用户设备id
        cityID: req.body.cityID,//城市代号
        local_x: req.body.local_x,//城市经度
        local_y: req.body.local_y//城市纬度
    };
    if (util.isEmptyValue("taxInvoiceCheckCon.taxInvoiceCheckSearch", params)) {
        res.send({"rtnCode": "000000", "rtnMsg": "success", "data": {"datail": "请求参数不完整，请检查！"}});
    } else {
        taxInvoiceCheckService.taxInvoiceCheck(params)
            .then((results) => {
                if (results.retCode == "000000") {
                    let taxResult;
                    let key2 = results.responseBody.key2.split("≡");
                    let key3 = results.responseBody.key3.split("█");
                    let key4 = results.responseBody.key4.split(" ");
                    let key5 = results.responseBody.key5;
                    switch (results.responseBody.key1) {
                        case "001":
                            taxResult = {
                                "verification": "发票查验明细",
                                "taxfp": [
                                    {
                                        "fptime": key2[1],
                                        "fpcs": key2[0],
                                        "xsfmc": key2[2],
                                        "nsrsbh": key2[3],
                                        "nsrdzdh": key2[4],
                                        "narzh": key2[5],
                                        "gmfmc": key2[6],
                                        "gmfnsrsbh": key2[7],
                                        "gmfdzdh": key2[8],
                                        "gmfkhzh": key2[9],
                                        "jym": key2[10],
                                        "hjje": key2[11],
                                        "hjse": key2[12],
                                        "jshj": key2[13],
                                        "mimaq": key2[14],
                                        "jqbm": key2[15],
                                        "nsr": key2[16],
                                        "heje": key2[17],
                                        "dkc": key2[18],
                                        "dkc2": key2[19]
                                    }
                                ],
                                "dwxx": [
                                    {
                                        "dwfwmc": key3[0],
                                        "dwguxh": key3[1],
                                        "dwdwei": key3[2],
                                        "dwsl": key3[3],
                                        "dwdj": key3[4],
                                        "dwje": key3[5],
                                        "dwsuil": key3[6],
                                        "dwsuil2": key3[7],
                                        "dwdkc": key3[8]
                                    }
                                ],
                                "beiz": [
                                    {
                                        "gcmc": key4[0],
                                        "gcdz": key4[1]
                                    }
                                ],
                                "key5": key5,
                                "ret": "001"
                            };
                            break;
                        case "002":
                            taxResult = {
                                "verification": "超过该张发票当日查验次数(请于次日再次查验)!",
                                "ret": "002"
                            };
                            break;
                        case "006":
                            taxResult = {
                                "verification": "结果不一致",
                                "ret": "006"
                            };
                            break;
                        case "007":
                            taxResult = {
                                "verification": "验证码失效",
                                "ret": "007"
                            };
                            break;
                        case "008":
                            taxResult = {
                                "verification": "验证码错误",
                                "ret": "008"
                            };
                            break;
                        case "009":
                            taxResult = {
                                "verification": "查无此票",
                                "ret": "009"
                            };
                            break;
                    };
                    res.send(taxResult);
                } else {
                    res.send(results);
                }
            }).catch((err) => {
            res.send(err);
        });
    }
};
exports.taxInvoiceCheckCon = taxInvoiceCheckCon;