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
            userCenterFlag: false,
            exitFlag: false,
            maskFlag: false,
            noResult: false,
            hosName: "",
            pageNo: 1,
            dataList: [],
            flag: 'hot',   //热门与搜索控制的开关
            isCanScroll: true,
            noget: false
        },
        methods: {
            goPersonCenter: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=regInfo&comeForm=nmgHospital";
            },
            goVisit: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=patientManage&comeForm=nmgHospital";
            },
            goPersonInfo: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=personalInfo&comeForm=nmgHospital";
            },
            godep: function (hosId, hosGrade, hosName) {
                window.localStorage.setItem('hosId', hosId);
                window.localStorage.setItem('hosName', hosName);
                window.localStorage.setItem('hosGrade', hosGrade);
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=selectDepartment&comeForm=nmgHospital";
            },
            mo: function () {
                this.getData();
            },
            search: function () {
                if (this.hosName.trim() == "") {
                    return;
                }
                this.noget = false;
                this.flag = 'search';
                this.pageNo = 1;
                this.dataList = [];
                this.getData();
            },
            getData: function () {
                if (this.noget) {
                    return;
                }
                if (this.flag == 'search') {
                    var data = {
                        randomKey: randomKey,
                        userID: userID,
                        clientID: clientID,
                        cityID: cityID,
                        local_x: local_x ,localFrom:localFrom,
                        local_y: local_y,
                        pageNo: this.pageNo,
                        hosName: this.hosName
                    };
                } else {
                    var data = {
                        randomKey: randomKey,
                        userID: userID,
                        clientID: clientID,
                        cityID: cityID,
                        local_x: local_x ,localFrom:localFrom,
                        local_y: local_y,
                        pageNo: this.pageNo,
                        hosName: this.hosName
                    };
                }

                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/nmgHospital/search',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    v.isCanScroll = true;
                    if (res.data.retCode == "000000") {
                        if ((JSON.stringify(res.data.responseBody.result) == '[]') && (v.pageNo == 1)) {
                            v.noResult = true
                        } else if ((JSON.stringify(res.data.responseBody.result) == '[]') && (v.pageNo != 1)) {
                            v.maskFn('数据已全部加载');
                            v.noget = true;
                            v.noResult = false;
                        } else {
                            var data = res.data.responseBody.result;
                            v.dataList = v.dataList.concat(data);
                            v.noResult = false;
                        }
                    } else {

                    }
                }).catch(function (err) {
                    v.maskFn('网络异常');
                })
            },
            selCity: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=cityList&comeForm=nmgHospital";
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
                                + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=nmgHospital";
                        }
                    } else {
                        window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                            + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=nmgHospital";
                    }
                }).catch(function (err) {
                })
            },
            exitBtn: function (ev) {
                ev.stopPropagation();
                this.exitFlag = true;
                this.maskFlag = true;
                document.getElementsByTagName('body')[0].style.position = 'fixed';
            },
            cancelExit: function () {
                this.exitFlag = false;
                this.maskFlag = false;
                document.getElementsByTagName('body')[0].style.position = 'static';
            },
            exit: function () {
                document.getElementsByTagName('body')[0].style.position = 'static';
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
            handleScroll: function () {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                var bodyHeight = document.body.clientHeight;
                var clientHeight = document.documentElement.clientHeight;//可视区高度
                if (scrollTop + clientHeight + 20 > bodyHeight) {
                    if (v.isCanScroll) {
                        v.isCanScroll = false;
                        if (v.flag == 'hot') {
                            v.pageNo++;
                            v.mo();
                        } else if (v.flag == 'search') {
                            v.pageNo++;
                            v.getData();
                        }

                    }
                }
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
            },
            toggle(e) {
                let flag = document.getElementsByClassName('userAvatarBox')[0].contains(e.target);
                if (!flag) {
                    this.userCenterFlag = false;
                } else {
                    return;
                }
                document.removeEventListener('click', v.toggle)
            }
        },
        created: function () {
        },
        mounted: function () {
            window.addEventListener('scroll', this.handleScroll);
            this.mo();
        }
    }
)

