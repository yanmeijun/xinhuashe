var v = new Vue({
        el: "#max",
        data: {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            userCenterFlag: false,
            exitFlag: false,
            cancelFlag: false,
            maskFlag: false,
            masktime: '',
            datalist: [],
            historyList: [],
            selectTab: 0,
            sh: [],
            wh: [],
            appoint_id: ''
        },
        methods: {
            back: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=" + comeForm;
            },
            exitBtn: function (ev) {
                ev.stopPropagation();
                this.exitFlag = true;
                this.maskFlag = true;
                document.getElementsByTagName('body')[0].style.position = "fixed";
            },
            cancelExit: function () {
                this.exitFlag = false;
                this.maskFlag = false;
                document.getElementsByTagName('body')[0].style.position = "static";
            },
            exit: function () {
                document.getElementsByTagName('body')[0].style.position = "static";
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/nmgHospital/exit',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        v.userCenterFlag = false;
                        v.exitFlag = false;
                        v.maskFlag = false;
                        window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                            + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=regInfo";
                    } else {
                        v.exitFlag = false;
                        v.maskFlag = false;
                        v.maskFn('退出异常');
                    }
                }).catch(function (err) {
                    v.exitFlag = false;
                    v.maskFlag = false;
                    v.maskFn('退出异常');
                });
            },
            goVisit: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=patientManage&comeForm=regInfo";
            },
            goPersonInfo: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=personalInfo&comeForm=regInfo";
            },
            toggle(e) {
                let flag = document.getElementsByClassName('userAvatarBox')[0].contains(e.target);
                if (!flag) {
                    this.userCenterFlag = false;
                } else {
                    return;
                }
                document.removeEventListener('click', v.toggle)
            },
            toUserCenter: function () {
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/nmgHospital/toUserCenter',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        if (res.data.responseBody.patientId) {
                            v.userCenterFlag = true;
                            document.addEventListener('click', v.toggle);
                        } else {
                            window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                                + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=regInfo";
                        }
                    } else {
                        window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                            + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=regInfo";
                    }
                }).catch(function (err) {
                })
            },
            cancelOrderbtn: function (str) {
                var regex = "\\((.+?)\\)";
                var str = str.match(regex)[1];
                this.appoint_id = str.replace(/\'/g, '');
                this.cancelFlag = true;
                this.maskFlag = true;
                document.getElementsByTagName('body')[0].style.position = "fixed";
            },
            cancelOrder: function () {
                this.cancelFlag = false;
                this.maskFlag = false;
                document.getElementsByTagName('body')[0].style.position = "static";
            },
            cOrder: function () {
                v.cancelFlag = false;
                v.maskFlag = false;
                document.getElementsByTagName('body')[0].style.position = "static";
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    appoint_id: this.appoint_id
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/nmgHospital/cancelOrder',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        if (res.data.responseBody.res) {
                            v.maskFn("取消预约成功");
                            v.getOrderData();
                            v.historyOrder();
                        } else {
                            v.maskFn(res.data.responseBody.msg);
                        }
                    } else {
                        v.maskFn('获取数据异常');
                    }

                }).catch(function (err) {
                    v.maskFn('获取数据异常');
                })
            },
            whChange: function (index) {
                Vue.set(v.wh, index, !this.wh[index])
            },
            change: function (index) {
                Vue.set(v.sh, index, !this.sh[index])
            },
            tab: function (sel) {
                this.selectTab = sel;
            },
            historyOrder: function () {
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/nmgHospital/historyOrder',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    console.log(res);
                    if (res.data.retCode == "000000") {
                        v.historyList = res.data.responseBody.result;
                        console.log(v.historyList);
                        for (var i = 0; i < v.historyList.length; i++) {
                            v.sh[i] = false;
                        }
                        v.sh[0] = true;
                    } else {
                        v.maskFn('获取数据异常');
                    }
                }).catch(function (err) {
                    v.maskFn('获取数据异常');
                })
            },
            getOrderData: function () {
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/nmgHospital/waitForOrder',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        v.datalist = res.data.responseBody.result;
                        for (var i = 0; i < v.datalist.length; i++) {
                            v.wh[i] = false;
                        }
                        v.wh[0] = true;
                        console.log(v.sh);
                    } else {
                        v.maskFn('获取数据异常');
                    }
                }).catch(function (err) {
                    v.maskFn('获取数据异常');
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
                    v.masktime = "";
                }, 1500);
                return;
            }
        },
        created: function () {
        },
        mounted: function () {
            this.getOrderData();
            this.historyOrder();
        }
    }
)

