var v = new Vue({
    el: "#indexPage",
    data: {
        defaultCityID: "110000",
        defaultCityName: "北京市",
        defaultCitySRC: "/images/cityLogo/11.jpg",
        cityID: cityID,
        cityName: cityName,
        citySRC: citySRC || "/images/banner.png",
        hotService: [],//热门服务
        traffic: [],//交通类
        socialSecurity: [],//社会保障类
        medical: [],//医疗类
        education: [],//教育类
        tourism: [],//旅游类
        lawRule: [],//法规类
        cultural: [],//文化体育类
        complaint: [],//举报投诉
        civil: [],//民政类
        tax: [],//税务类
        credit: [],//信用类
        other: [],//其他服务
        government: [],//政务服务
        passport: [],//出境入境
        localFrom :localFrom
    },
    mounted: function () {
        //this.getAllService()
        if (this.cityID) {
            this.getAllService()
        } else {
            this.getLocation()
        }
    },
    methods: {
        goCityHomePage: function () {
            window.location.href = '/fw/cityHomePage?cityID=' + this.cityID + '&page=cityHomePage';
        },
        getCityID: function (latitude, longitude) {
            axios({
                headers: {"Content-Type": "application/json"},
                method: "get",
                url: '/weChat/getCityID?latitude=' + latitude + "&longitude=" + longitude,
                contentType: 'application/json'
            }).then(function (res) {
                v.cityID = res.data.cityID;
                v.citySRC = res.data.citySRC;
                v.cityName = res.data.cityName;
                v.getAllService()
            })
        },
        getLocation: function () {
            axios({
                headers: {"Content-Type": "application/json"},
                method: "get",
                url: '/weChat/getLocation',
                contentType: 'application/json'
            }).then(function (res) {
                if (res.data.rawString.indexOf("undefined") > -1) {
                    v.getAllService()
                } else {
                    wx.config({
                        debug: false,
                        appId: res.data.appId,
                        timestamp: res.data.timestamp,
                        nonceStr: res.data.nonceStr,
                        signature: res.data.signature,
                        jsApiList: [
                            // 所有要调用的 API 都要加到这个列表中
                            'getLocation'
                        ]
                    });
                    wx.ready(function () {
                        wx.checkJsApi({
                            jsApiList: [
                                'getLocation'
                            ],
                            success: function (res) {
                                if (res.checkResult.getLocation == false) {
                                    alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                                    v.getAllService()
                                }
                                if (res.checkResult.getLocation == "no") {
                                    v.getAllService()
                                }
                            },
                            fail: function (res) {
                                v.getAllService()
                            }
                        });
                        wx.error(function (res) {
                            v.getAllService()
                        });
                        wx.getLocation({
                            success: function (res) {
                                v.getCityID(res.latitude, res.longitude);
                            },
                            cancel: function (res) {
                                // alert('用户拒绝授权获取地理位置');
                                v.getAllService()
                            },
                            fail: function (res) {
                                v.getAllService()
                            }
                        });
                    });
                }
            })
        },
        getAllService: function () {
            if (!this.cityID) {
                v.cityID = v.defaultCityID;
                v.citySRC = v.defaultCitySRC;
                v.cityName = v.defaultCityName;
            }
            axios({
                headers: {"Content-Type": "application/json"},
                method: "get",
                url: '/getAllService?cityID=' + (this.cityID || this.defaultCityID) + "&localFrom=" + localFrom,
                contentType: 'application/json'
            }).then(function (res) {
                res.data.slice(0, 4).forEach(function (item) {
                    // item.src = "/images/homePage/hotService/" + item.logo.split("/")[6];
                    item.src = item.hotLogo;
                    v.hotService.push(item);
                })
                res.data.forEach(function (item) {
                    // item.logo = "/images" + item.logo.split("images")[1];
                    item.url = "/" + item.url.split("/")[3];
                    var serviceType = item.serviceID.charAt(0);
                    switch (serviceType) {
                        case "A":
                            v.traffic.push(item);
                            break;
                        case "B":
                            v.socialSecurity.push(item);
                            break;
                        case "C":
                            v.education.push(item);
                            break;
                        case "D":
                            v.medical.push(item);
                            break;
                        case "E":
                            v.civil.push(item);
                            break;
                        case "G":
                            v.tourism.push(item);
                            break;
                        case "H":
                            v.passport.push(item);
                            break;
                        case "I":
                            v.complaint.push(item);
                            break;
                        case "K":
                            v.tax.push(item);
                            break;
                        case "L":
                            v.government.push(item);
                            break;
                        case "M":
                            v.cultural.push(item);
                            break;
                        case "X":
                            v.credit.push(item);
                            break;
                        case "Y":
                            v.lawRule.push(item);
                            break;
                        case "Z":
                            v.other.push(item);
                            break;
                        default:
                            v.other.push(item);
                            break;
                    }
                })
            }).catch(function (err) {

            })
        },
        doSubmit: function (formID) {
            // v.$refs[formID].submit();
            document.getElementById(formID).submit()
        }
    }
})