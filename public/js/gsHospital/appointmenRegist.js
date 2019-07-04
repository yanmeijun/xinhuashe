var v = new Vue({
        el: "#max",
        data: {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            hoskey: hoskey,
            deptKey: deptKey,
            deptName: deptName,
            HOS_NAME: HOS_NAME,
            userKey: sessionStorage.getItem("userKey"),
            pesCenterFlag: false,
            doctorKey: doctorKey,
            orderDate: orderDate,
            orderSort: orderSort,
            docImg: '',
            docName: doctorName,
            docType: rankName,
            hosName: HOS_NAME,
            time: '',
            ampm: '',
            weList: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            day: '',
            userName: userName,
            userTel: '',
            userCardCode: '',
            imagId: imagId,
            entrySite: [
                {
                    "data": [

                    ]
                }
            ],
            scheduleKey: '',
            scheduleTxt: '',
            imgSrc: '/images/refreshCode.png',
            capCode: '',
            visitCard: '',
            masktime: '',
            noCardFlag: false,
            exitFlag: false,
            doctorImage: ''

        },
        created: function () {
        },
        mounted: function () {
            this.$refs.imgClick.click();
            this.getBack();
        },
        methods: {
            checkUser() {
                if (!this.userkey) {
                    window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                        + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=gsHospital";
                    return;
                }
                this.pesCenterFlag = !this.pesCenterFlag;

            },
            getBack: function () {
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    doctorKey: this.doctorKey,
                    deptKey: this.deptKey,
                    orderDate: this.orderDate,
                    orderSort: this.orderSort,
                    userKey: this.userKey,
                    ts: Math.random()
                };
                if(!data.userKey){
                    this.maskFn("登录超时，请稍后重新登录");
                    window.location.href = '/gsHconsole.log()ospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                        + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=registered";
                    return;
                }
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/gsHospital/HospitalOrderInfo',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    console.log(res)
                    if (res.data.retCode == "000000") {
                        if (res.data.responseBody.success == "1") {
                            var data = res.data.responseBody.data;
                            v.doctorImage = res.data.responseBody.data.doctorImage;
                            var arr = orderDate.split('-');
                            v.time = arr[0] + '年' + arr[1] + '月' + arr[2] + '日';
                            if (orderSort == 'am') {
                                v.ampm = '上午';
                            } else {
                                v.ampm = '下午';
                            }
                            v.userTel = data.patients[0].phone;
                            v.userCardCode = data.patients[0].idCard;
                            var date = new Date(orderDate);
                            var day = date.getDay();
                            v.day = v.weList[day];
                            sessionStorage.setItem("patientKey", data.patients[0].patientId);  //patientKey
                            var schedules = data.schedules;
                            for (var i = 0; i < schedules.length; i++) {
                                var str = schedules[i].startTime + '-' + schedules[i].endTime;
                                var PKey = schedules[i].PKey;
                                var json = {};
                                json['id'] = PKey;
                                json['name'] = str;
                                v.entrySite[0].data.push(json)
                            }
                        } else {

                        }
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
                        v.scheduleKey = data[0].id;
                        v.scheduleTxt = data[0].name;
                        document.getElementById("schedule").style.color="rgb(71, 71, 71)";
                        document.getElementsByTagName('body')[0].style.position = 'static';
                    }
                });
                $(".mobileSelect").addClass("mobileSelect-show");
                document.getElementsByTagName('body')[0].style.position = 'fixed';
                event.preventDefault();
            },
            getImg: function () {
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
                    url: '/gsHospital/HospitalOrderImg',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    var src = res.data;
                    v.imgSrc = src;
                }).catch(function (err) {
                })
            },
            checkOrder: function () {
                if (this.scheduleTxt.trim() == "") {
                    this.maskFn("请选择就诊时间");
                    return;
                }

                if (this.capCode.trim() == "") {
                    this.maskFn("请输入验证码");
                    return;
                }
                if (this.visitCard.trim() == "") {
                    this.noCardFlag = true;
                    document.getElementsByTagName('body')[0].style.position = 'fixed';
                    return;
                }
                if (!/^\d+$/.test(this.visitCard.trim())) {
                    this.maskFn("请输入正确的就诊卡号！");
                    return;
                }
                if (this.visitCard.trim().length < 8) {
                    this.maskFn("请输入不少于8位数的就诊卡号！");
                    return;
                }
            },
            cancelOrder: function () {
                this.noCardFlag = false;
                document.getElementsByTagName('body')[0].style.position = 'static';
            },
            order: function () {
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    patientKey: sessionStorage.getItem("patientKey"),
                    scheduleKey: this.scheduleKey,
                    capCode: this.capCode,
                    random: Math.random(),
                    doctorKey: this.doctorKey,
                    deptKey: this.deptKey,
                    orderDate: this.orderDate,
                    orderSort: this.orderSort,
                    userKey: this.userKey,
                    visitCard: this.visitCard
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/gsHospital/HospitalOrder',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.responseBody.code == 0) {
                        var data = res.data.responseBody.data;
                        sessionStorage.setItem("orderNum", data.order_number);
                        sessionStorage.setItem("scheduleId", v.scheduleKey);
                        sessionStorage.setItem("successOrder", true);
                        window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                            + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=reservationDetail&comeForm=appointmenRegistration";
                    } else {
                        //都是预约失败
                        sessionStorage.setItem("successOrder", false);
                        window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                            + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=reservationDetail&comeForm=appointmenRegistration";
                    }
                    document.getElementsByTagName('body')[0].style.position = 'static';
                }).catch(function (err) {
                })
            },
            back: function () {
                window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=registered&comeForm";
            },
            checkUser() {
                if (!userKey) {
                    window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                        + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=appointmenRegistration";
                    return;
                } else {
                    this.pesCenterFlag = !this.pesCenterFlag;
                }
            },
            jumpPerson: function () {
                window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=personalCenter&comeForm=appointmenRegistration";
                return;
            },
            exitBtn: function () {
                this.noCardFlag = true;
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
                this.noCardFlag = false;
                this.exitFlag = false;
                document.getElementsByTagName('body')[0].style.position = 'static';
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
            }
        },
    }
)

