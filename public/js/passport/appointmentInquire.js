document.getElementById("citySRC").setAttribute("src", citySRC || "/images/banner.png");
var V = new Vue({
    el: '#max',
    data: {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        masktime: '',
        card: "",
        password: "",
        noData: false,
        haveData: false,
        sqxxId: "",
        cancel: false,
        userInfor: []
    },
    mounted: function () {
        this.getCookie();
    },
    methods: {
        getCookie: function () {
            var parameters = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y,
                sldw: "460105460000",
                showp: window.screen.width + "x" + window.screen.height,//屏幕大小
                cnzz_eid: cnzz_eid,
                umuuid: umuuid,
                rnd: rnd
            };
            axios({
                headers: {"Content-Type": "application/json"},
                method: 'post',
                url: '/passport/setSearchCookie',
                data: parameters,
                contentType: 'application/json'
            }).then(function (res) {

            })
        },
        maskFn: function (mgs) {
            if (mgs.length > 16 && mgs.length <= 32) {
                this.masktime = mgs;
                this.$nextTick(function () {
                    this.$refs.masktime.style.lineHeight = '20px';
                    this.$refs.masktime.style.height = '50px';
                    this.$refs.masktime.style.padding = '5px';
                })
            } else if (mgs.length > 32) {
                this.masktime = mgs;
                this.$nextTick(function () {
                    this.$refs.masktime.style.lineHeight = '20px';
                    this.$refs.masktime.style.height = '70px';
                    this.$refs.masktime.style.padding = '5px';
                })
            } else {
                this.masktime = mgs;
                this.$nextTick(function () {
                    this.$refs.masktime.style.lineHeight = '49px';
                    this.$refs.masktime.style.height = '49px';
                    this.$refs.masktime.style.padding = '0px';
                })
            }
            setTimeout(function () {
                V.masktime = "";
            }, 1500);
            return;
        },
        back: function () {
            window.location.href = '/passport?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=passport";
        },
        search: function () {
            if (V.card == "") {
                V.maskFn("请输入身份证后四位");
                return;
            }
            if (V.password == "") {
                V.maskFn("请输入密码");
                return;
            }
            document.getElementById("dialog").style.display = "block";
            V.getData();
        },
        getData: function () {
            var checkdata = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y,
                csrq: V.card,
                yymm: V.password
            };
            axios({
                headers: {"Content-Type": "application/json"},
                method: 'post',
                url: '/passport/searchOrder',
                data: checkdata,
                contentType: 'application/json'
            }).then(function (res) {
                //V.sqxxId="62040B9FA7BD42ADA94D0B5B44B732A7";
                document.getElementById("dialog").style.display = "none";
                if (res.data.retCode == "000000") {
                    //创建文档对象
                    var parser = new DOMParser();
                    var xmlDoc = parser.parseFromString(res.data.responseBody.data, "text/xml");//提取数据
                    if (xmlDoc.getElementsByTagName('FUNCERROR').length != 0) {
                        var countrys = xmlDoc.getElementsByTagName('FUNCERROR').innerHTML;
                        V.getCookie();
                        V.getData();
                        V.haveData = false;
                        V.noData = true;
                        return;
                    } else {
                        var userInfor = JSON.parse(res.data.responseBody.data);
                        V.userInfor = userInfor.SLJG;
                        if (V.userInfor.length == 0) {
                            V.noData = true;
                            V.haveData = false;
                            return;
                        }
                        V.sqxxId = userInfor.SLJG[0].SQXXID;
                        V.noData = false;
                        V.haveData = true;
                    }
                } else {
                    V.maskFn("网络异常，请稍后");
                }
            }).catch(function (err) {
            });
        },
        cancelYY: function () {
            V.cancel = true;
        },
        cancelsq: function () {
            V.cancel = false;
        },
        sure: function () {
            V.cancel = false;
            var checkdata = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y,
                sqxxId: V.sqxxId
            };
            axios({
                headers: {"Content-Type": "application/json"},
                method: 'post',
                url: '/passport/cancelOrder',
                data: checkdata,
                contentType: 'application/json'
            }).then(function (res) {
                if (res.data.retCode == "000000") {
                    if (JSON.parse(res.data.responseBody.data).RETURNCODE == '1') {
                        V.maskFn("取消成功");
                        V.noData = false;
                        V.haveData = false;
                    }
                }

            }).catch(function (err) {
            });
        }
    }
});