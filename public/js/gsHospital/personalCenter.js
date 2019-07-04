var v = new Vue({
        el: "#max",
        data: {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            userKey: userKey,
            pesCenterFlag: false,
            hosName: '',
            startTime: '',
            endTime: '',
            state: '',
            stateTxt: '',
            entrySite: [
                {
                    "data": [
                        {'id': 0, 'name': '全部'},
                        {'id': 2, 'name': '已取消'},
                        {'id': 1, 'name': '待就诊'},
                        {'id': 3, 'name': '违约'},
                    ]
                }
            ],
            dataList: [],
            totalNum: 0,
            isCanScroll: true,
            pagenums: 1,
            masktime: '',
            noResult: false,
            maskFlag: false,
            cancelFlag: false,
            exitFlag: false


        },
        methods: {
            back: function () {
                // if(comeForm=='reservationDetail'){
                //     window.location.href='/gsHospital?randomKey='+randomKey+"&userID="+userID+"&clientID="+clientID+"&cityID="+cityID
                //         +"&local_x="+local_x+"&local_y="+local_y+"&page=gsHospital";
                // }
                window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=" + comeForm;
            },
            checkUser() {
                if (!userKey) {
                    window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                        + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=personalCenter";
                    return;
                } else {
                    this.pesCenterFlag = !this.pesCenterFlag;
                }
            },
            jumpPerson: function () {
                window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=personalCenter&comeForm=personalCenter";
                return;
            },
            exitBtn: function () {
                this.maskFlag = true;
                this.exitFlag = true;
                document.getElementsByTagName('body')[0].style.position = 'fixed';
            },
            exit: function () {
                sessionStorage.setItem("userKey", "");
                window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=gsHospital";
                return;
            },
            cancelExit: function () {
                this.maskFlag = false;
                this.exitFlag = false;
                document.getElementsByTagName('body')[0].style.position = 'static';
            },
            noCancel: function () {
                this.maskFlag = false;
                this.cancelFlag = false;
                document.getElementsByTagName('body')[0].style.position = 'static';
            },
            cancelBtn: function (orderNumber, createTime, patinetCard) {
                document.getElementsByTagName('body')[0].style.position = 'fixed';
                this.maskFlag = true;
                this.cancelFlag = true;
                this.$nextTick(function () {
                    v.$refs.cancel.orderNumber = orderNumber;
                    v.$refs.cancel.createTime = createTime;
                    v.$refs.cancel.patinetCard = patinetCard;
                })

            },
            cancel: function () {
                document.getElementsByTagName('body')[0].style.position = 'static';
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    userKey: this.userKey,
                    createTime: this.$refs.cancel.createTime,
                    orderNumber: this.$refs.cancel.orderNumber,
                    patinetCard: this.$refs.cancel.patinetCard

                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/gsHospital/HospitalCancleOrder',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == '000000') {
                        if (res.data.responseBody.data == '成功' || res.data.responseBody.data == '取消成功') {
                            v.maskFn('取消成功');
                            v.maskFlag = false;
                            v.cancelFlag = false;
                            v.search();
                        } else {
                            v.maskFn('取消失败');
                            v.maskFlag = false;
                            v.cancelFlag = false;
                        }
                    } else {
                        v.maskFn('取消失败');
                        v.maskFlag = false;
                        v.cancelFlag = false;
                        return;
                    }

                }).catch(function (err) {
                    v.maskFn('取消失败');
                    v.maskFlag = false;
                    v.cancelFlag = false;
                    return;
                })
            },
            search: function () {
                this.dataList = [];
                this.totalNum = 0;
                this.pagenums = 1;
                this.noResult = false;
                this.getData();
            },
            getData: function () {
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    userKey: this.userKey,
                    hosName: this.hosName,
                    startTime: this.$refs.startEl.value,
                    endTime: this.$refs.endEl.value,
                    pagenums: '' + this.pagenums,
                    s: Math.random()
                };
                if (this.$refs.startEl.innerHTML == "请选择起始时间") {
                    data.startTime = '';
                }
                if (this.$refs.endEl.innerHTML == "请选择结束时间") {
                    data.endTime = '';
                }
                if (this.state == '0') {
                    data.state = '';
                } else {
                    data.state = this.state;
                }
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/gsHospital/HospitalPersonal',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == '000000') {
                        if (res.data.responseBody.success == '1') {//成功了，
                            v.dataList = v.dataList.concat(res.data.responseBody.data.DATE_LIST);
                            v.totalNum = res.data.responseBody.data.DATE_NUM;
                            if (v.totalNum == 0) {
                                v.isCanScroll = true;
                                v.noResult = true;
                            } else {
                                v.isCanScroll = true;
                                v.noResult = false;
                            }

                        } else {
                            v.isCanScroll = true;
                            v.noResult = true;

                            return;
                        }
                    } else {
                        v.maskFn('获取数据失败');
                        return;
                    }

                }).catch(function (err) {
                })
            },
            mobile: function () {
                $(".mobileSelect").remove();
                var mobileSelect1 = new MobileSelect({
                    trigger: '#start',
                    title: '请选择就诊时间',
                    wheels: v.entrySite,
                    callback: function (indexArr, data) {
                        v.state = data[0].id;
                        v.stateTxt = data[0].name;
                        document.getElementsByTagName('body')[0].style.position = 'static';
                    }
                });
                $(".mobileSelect").addClass("mobileSelect-show");
                document.getElementsByTagName('body')[0].style.position = 'fixed';
                event.preventDefault();
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
            toDou: function (n) {
                return n < 10 ? '0' + n : '' + n;
            },
            handleScroll: function () {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                var bodyHeight = document.body.clientHeight;
                var clientHeight = document.documentElement.clientHeight;//可视区高度
                if (scrollTop + clientHeight + 20 > bodyHeight) {
                    if (v.isCanScroll) {
                        v.isCanScroll = false;
                        v.pagenums++;
                        if (v.pagenums > v.totalNum) {
                            return;
                        }
                        v.getData();

                    }
                }
            },
        },
        created: function () {

        },
        mounted: function () {
            this.getData();
            window.addEventListener('scroll', this.handleScroll);
        }
    }
)

