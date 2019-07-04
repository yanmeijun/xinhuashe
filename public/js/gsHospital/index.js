var v = new Vue({
        el: "#max",
        data: {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            hos_name: "",  //搜搜医院内容
            allHospitalPage: 1,   //热门医院请求页数
            hosList: [],   //热门医院list
            hosTotal: 0,   //热门医院总页数
            flag: 'hot',   //热门与搜索控制的开关
            isCanScroll: true,   //是否可下拉的开关，他要控制两种情况
            searchPage: 1,
            searchTotal: 0,
            searchList: [],
            masktime: '',
            noResult: false,
            userKey: userkey,
            pesCenterFlag: false,
            maskFlag: false,
            exitFlag: false
        },
        methods: {
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
            search: function () {
                if (!this.hos_name)return;
                this.flag = 'search';
                this.searchPage = 1;
                this.searchTotal = 0;
                this.searchList = [];
                this.getSearchData();
            },
            getSearchData: function () {
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    pagenum: this.searchPage,
                    t: this.hos_name
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/gsHospital/searchHospital',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        if (res.data.responseBody.data.listhos) {
                            var data = res.data.responseBody.data.listhos.filter(function (item) {
                                return item.DOM == '1'
                            });
                        } else {
                            v.noResult = true;
                            return;
                        }
                        if (Object.prototype.toString.call(data) == "[object Array]" && data) {
                            v.searchList = v.searchList.concat(data);
                            v.searchTotal = res.data.responseBody.data.DATE_NUM;
                            v.isCanScroll = true;
                            v.noResult = false;
                        } else {
                            v.noResult = true;
                        }
                    }
                }).catch(function (err) {
                })
            },
            getHotData: function () {
                if (!this.hos_name) {
                    var data = {
                        randomKey: randomKey,
                        userID: userID,
                        clientID: clientID,
                        cityID: cityID,
                        local_x: local_x ,localFrom:localFrom,
                        local_y: local_y,
                        pagenum: this.allHospitalPage,
                        hos_type: ''
                    };
                    axios({
                        headers: {"Content-Type": "application/json"},
                        method: 'post',
                        url: '/gsHospital/allHospital',
                        data: data,
                        contentType: 'application/json'
                    }).then(function (res) {
                        if (res.data.retCode == "000000") {
                            var data = res.data.responseBody.data.DATE_LIST;
                            if (data) {
                                v.hosList = v.hosList.concat(data);
                                v.hosTotal = res.data.responseBody.data.DATE_NUM;
                                v.isCanScroll = true;
                            }
                        }
                    }).catch(function (err) {
                    })
                }
            },
            jumpHtml(hos_key, HOS_NAME) {
                sessionStorage.setItem("hos_key", hos_key);
                sessionStorage.setItem("HOS_NAME", HOS_NAME);
                window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=selectDepartment&comeForm=gsHospital";
            },
            handleScroll: function () {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                var bodyHeight = document.body.clientHeight;
                var clientHeight = document.documentElement.clientHeight;//可视区高度
                if (scrollTop + clientHeight + 20 > bodyHeight) {
                    if (v.isCanScroll) {
                        v.isCanScroll = false;
                        if (v.flag == 'hot') {
                            v.allHospitalPage++;
                            if (v.allHospitalPage > v.hosTotal) {
                                // v.maskFn('已全部加载完毕');
                                return;
                            }
                            v.getHotData();
                        } else if (v.flag == 'search') {
                            v.searchPage++;
                            if (v.searchPage > v.searchTotal) {
                                // v.maskFn('已全部加载完毕');
                                return;
                            }
                            v.getSearchData();
                        }

                    }
                }
            },
            checkUser() {
                if (!userkey) {
                    window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                        + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=gsHospital";
                    return;
                } else {
                    this.pesCenterFlag = !this.pesCenterFlag;
                }
            },
            jumpPerson: function () {
                window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=personalCenter&comeForm=gsHospital";
                return;
            },
            exitBtn: function () {
                this.maskFlag = true;
                this.exitFlag = true;
                document.getElementsByTagName('body')[0].style.position = 'fixed';
            },
            exit: function () {
                document.getElementsByTagName('body')[0].style.position = 'static';
                sessionStorage.setItem("userKey", "");
                window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=gsHospital";
                return;
            },
            cancelExit: function () {
                this.maskFlag = false;
                this.exitFlag = false;
                document.getElementsByTagName('body')[0].style.position = 'static';
            }
        },
        created: function () {
            //先获取医院列表,在搜索医院为空的情况下
            this.getHotData();
        },
        mounted: function () {
            window.addEventListener('scroll', this.handleScroll);
        }
    }
)

