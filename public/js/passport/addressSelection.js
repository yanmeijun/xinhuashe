var v = new Vue({
        el: "#max",
        data: {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            masktime: '',
            cityAll: {},
            provinceName: ''

        },
        methods: {
            fnSize: function () {
                document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.offsetWidth / 10 + 'px';
            },
            back: function () {
                window.location.href = '/passport?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=passport";
            },
            next: function () {
                // var cityid= window.localStorage.getItem('cityid');
                // var dating= window.localStorage.getItem('dating');
                // var date= window.localStorage.getItem('date');
                // var time= window.localStorage.getItem('time');
                var cityid = document.getElementById('city').getAttribute("data_id");
                var dating = document.getElementById('dat').getAttribute("data_id");
                var date = document.getElementById('date').getAttribute("data_id");
                var time = document.getElementById('time').getAttribute("data_id");
                if (!cityid) {
                    v.maskFn("请选择城市");
                    return;
                } else if (!dating) {
                    v.maskFn("请选择办理大厅");
                    return;
                } else if (!date) {
                    v.maskFn("请选择日期");
                    return;
                } else if (!time) {
                    v.maskFn("请选择时间段");
                    return;
                }
                ;
                if (window.localStorage.getItem('num') == "0") {
                    return;
                }
                axios({
                    async: true,
                    url: "/passport/getBasicInfo",
                    method: "post",
                    data: { randomKey: randomKey, sldw: dating},
                    contentType: "application/json"
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        var isktbs = false;
                        var isktfbs = false;
                        var isktsw = false;
                        var ifktswba = false;
                        var ywpzxx = res.data.responseBody[0];
                        if (ywpzxx["HZQZ"] && ywpzxx["HZQZ"] != '0') {
                            isktbs = true;
                        }
                        if (ywpzxx["GAQZ"] && ywpzxx["GAQZ"] != '0') {
                            if (ywpzxx["GAQZ"].indexOf("02") > 0) {
                                ifktswba = true;
                            }
                            isktbs = true;
                        }
                        if (ywpzxx["TWQZ"] && ywpzxx["TWQZ"] != '0') {
                            isktbs = true;
                        }
                        if (ywpzxx["FHZQZ"] && ywpzxx["FHZQZ"] != '0') {
                            isktfbs = true;
                        }
                        if (ywpzxx["FGAQZ"] && ywpzxx["FGAQZ"] != '0') {
                            if (ywpzxx["FGAQZ"].indexOf("02") > 0) {
                                ifktswba = true;
                            }
                            isktfbs = true;
                        }
                        if (ywpzxx["FTWQZ"] && ywpzxx["FTWQZ"] != '0') {
                            isktfbs = true;
                        }
                        if (JSON.parse(ywpzxx['YWPZXX'])["SFHZQZ"] && JSON.parse(ywpzxx['YWPZXX'])["SFHZQZ"] != '0') {
                            isktsw = true;
                        }
                        if (JSON.parse(ywpzxx['YWPZXX'])["SFGAQZ"] && JSON.parse(ywpzxx['YWPZXX'])["SFGAQZ"] != '0') {
                            if (JSON.parse(ywpzxx['YWPZXX'])["SFGAQZ"].indexOf("02") > 0) {
                                ifktswba = true;
                            }
                            isktsw = true;
                        }
                        if (JSON.parse(ywpzxx['YWPZXX'])["SFTWQZ"] && JSON.parse(ywpzxx['YWPZXX'])["SFTWQZ"] != '0') {
                            isktsw = true;
                        }
                        window.localStorage.setItem("isktbs", isktbs);
                        window.localStorage.setItem("isktfbs", isktfbs);
                        window.localStorage.setItem("isktsw", isktsw);
                        window.localStorage.setItem("cityCon", document.getElementById("city").innerText);//办事地点省份名称
                        window.localStorage.setItem("cityID", document.getElementById("city").getAttribute("data_id"));//城市code
                        window.localStorage.setItem("SLDW", dating);//服务大厅代号
                        window.localStorage.setItem("SLDWMC", document.getElementById('dat').textContent);//服务大厅名称
                        window.localStorage.setItem("SLDWDZ", res.data.responseBody[0].SLDWDZ);//服务大厅地址
                        window.localStorage.setItem("WSYYRQ", document.getElementById('date').textContent);//日期
                        window.localStorage.setItem("WSYYSJ", time);//时间
                        window.location.href = '/passport?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                            + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=appointmentNotice&comeForm=addressSelection";

                    } else {
                        v.maskFn("预约失败，请重新预约");
                        return;
                    }
                })
            },
            getCity: function () {
                document.getElementById("dialogMask").style.display = "block";
                document.getElementById("dialog").style.display = "block";
                var checkdata = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    registerCard: this.registerCard,
                    userName: this.userName
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/passport/getCity',
                    data: checkdata,
                    contentType: 'application/json'
                }).then(function (res) {
                    var haiNan = res.data.responseBody[cityID.substr(0, 2)];
                    v.provinceName = haiNan.name;
                    cityAll = haiNan.sonlist;
                    cityArr = [];
                    for (var item in cityAll) {
                        var j = {};
                        j.id = cityAll[item].id;
                        j.name = cityAll[item].name;
                        cityArr.push(j);
                    }
                    document.getElementById("dialogMask").style.display = "none";
                    document.getElementById("dialog").style.display = "none";
                }).catch(function (err) {
                });
            },
            maskFn: function (mgs) {
                if (mgs.length > 16 && mgs.length <= 32) {
                    this.masktime = mgs;
                    this.$nextTick(function () {
                        document.getElementById("masktime1").style.lineHeight = '20px';
                        document.getElementById("masktime1").style.height = '50px';
                        document.getElementById("masktime1").style.padding = '5px';
                    })
                } else if (mgs.length > 32) {
                    this.masktime = mgs;
                    this.$nextTick(function () {
                        document.getElementById("masktime1").style.lineHeight = '20px';
                        document.getElementById("masktime1").style.height = '70px';
                        document.getElementById("masktime1").style.padding = '5px';
                    })
                } else {
                    this.masktime = mgs;
                    this.$nextTick(function () {
                        document.getElementById("masktime1").style.lineHeight = '49px';
                        document.getElementById("masktime1").style.height = '49px';
                        document.getElementById("masktime1").style.padding = '0px';
                    })
                }
                setTimeout(function () {
                    v.masktime = "";
                }, 1500);
                return;
            }

        },
        created: function () {
            this.getCity();
        },
        mounted: function () {
            this.fnSize();
            window.addEventListener('resize', this.fnSize, false);
            /*if (citySRC) {
                this.$refs.cityImg.src = citySRC;
            } else {
                this.$refs.cityImg.src = "/images/banner.png";
            }*/
        }
    }
)

