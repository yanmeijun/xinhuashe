const config = require("../../config"),
    urlParse = require('url'),
    request = require('request'),
    util = require('../../lib/util').util,
    NodeCache = require('node-cache'),
    cityDAO = require('../dao/city').cityDAO;
const cache = new NodeCache({
    stdTTL: config.get("system.weChat.stdTTL"),
    checkperiod: config.get("system.weChat.checkperiod")
}); //3600秒后过过期
const AppID = config.get("system.weChat.AppID");
const AppSecret = config.get("system.weChat.AppSecret");
var weChatCon = {};
//api跳转方法
weChatCon.apiCon = (req, res, next) => {
    const pathName = urlParse.parse(req.url).pathname.replace("/", "").split("/")[1];
    console.log("微信频道页请求方法名: " + pathName);
    if (!pathName) return;
    eval(pathName + "(req, res, next)");
};
const getLocation = (req, res) => {
    getJsApiTicket(function (err, jsapiTicket) {
        var url = "http://xhs.test.kaipuyun.cn:83/fw/indexpage?localFrom=ucap_weChat";
        var timestamp = parseInt(new Date().getTime() / 1000) + '';
        var nonceStr = createNonceStr();
        var str = `jsapi_ticket=${jsapiTicket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;
        var signature = util.sha1(str);
        var signPackage = {
            "appId": AppID,
            "nonceStr": nonceStr,
            "timestamp": timestamp,
            "url": url,
            "signature": signature,
            "rawString": str
        };
        res.send(signPackage);
    });

}
const getCityID = (req, res) => {
    const latitude = req.query.latitude, longitude = req.query.longitude;
    let mapUrl = `http://api.map.baidu.com/geocoder?location=${latitude},${longitude}&output=json`
    request(mapUrl, (error, response, body) => {
        body = JSON.parse(body);
        if (body.result.addressComponent.city) {
            cityDAO.getByCityName(body.result.addressComponent.city, function (err, cityInfo) {
                res.send(cityInfo)
            })
        }
    })
}

function createNonceStr() {
    return Math.random().toString(36).substr(2, 15);
}

const getJsApiTicket = (cb) => {
    cache.get('ticket', (err, ticket) => {
        if (ticket) {
            cb(null, ticket);
        } else {
            var accessToken;
            cache.get('access_token', (err, access_token) => {
                if (access_token) {
                    return access_token;
                } else {
                    var tokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + AppID + '&secret=' + AppSecret;
                    request(tokenUrl, (error, response, body) => {
                        if (response.statusCode === 200) {
                            body = JSON.parse(body);
                            cache.set('access_token', body.access_token, (err, success) => {
                            });
                            accessToken = body.access_token;
                            var ticketUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + accessToken + '&type=jsapi';
                            request(ticketUrl, (err, response, content) => {
                                content = JSON.parse(content);
                                if (content.errcode == 0) {
                                    cache.set('ticket', content.ticket, (err, success) => {
                                    });
                                    cb(null, content.ticket);
                                } else {
                                    cb(null);
                                }
                            })
                        } else {
                            cb(null);
                        }
                    })
                }
            })
        }
    })
}

// 获取access_token
function getAccessToken() {
    cache.get('access_token', (err, access_token) => {
        if (access_token) {
            return access_token;
        } else {
            var tokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + AppID + '&secret=' + AppSecret;
            request(tokenUrl, (error, response, body) => {
                if (response.statusCode === 200) {
                    body = JSON.parse(body);
                    cache.set('access_token', body.access_token, (err, success) => {
                    });
                    return body.access_token;
                } else {
                    return null;
                }
            })
        }
    })
}

//获取用户的openID
function getOpenID(req, res){
    cache.get('access_token', (err, access_token) => {
        if (access_token) {
            return access_token;
        } else {
            var tokenUrl = 'https://api.weixin.qq.com/sns/jscode2session?grant_type=authorization_code&appid=' + AppID + '&secret=' + AppSecret + '&js_code=' +req.query.js_code;
            //var tokenUrl = 'https://api.weixin.qq.com/sns/jscode2session?grant_type=authorization_code&appid=wx98e26144822d0b5d&secret=35f021c339627a18bc7775dffb357386&js_code=' +req.query.js_code;
            request(tokenUrl, (error, response, body) => {
                if (response.statusCode === 200) {
                    body = JSON.parse(body);
                    cache.set('session_key', body.session_key, (err, success) => {
                    });
                    //return body;session_key
                    res.send(body)
                } else {
                    //return null;
                    res.send(null)
                }
            })
        }
    })
}

exports.weChatCon = weChatCon;
