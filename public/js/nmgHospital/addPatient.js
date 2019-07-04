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
            maskFlag: false,
            delFlag: false,
            masktime: '',
            realname: "",
            sex: 1,
            phone: '',
            cardid: "",
            pid: pid,
            addressDetail: ""

        },
        methods: {
            back: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=patientManage&comeForm=" + comeForm;
            },
            selSex: function (ev, flag) {
                this.sex = flag;
                var target = ev.target || ev.srcElement;
                var pics = document.getElementsByTagName('picture');
                for (var i = 0; i < pics.length; i++) {
                    pics[i].className = "";
                }
                target.className = "active";
            },
            addPatient: function () {
                if (this.realname.trim() == "") {
                    this.maskFn('请输入姓名');
                    return;
                } else if (!(/^[\u4E00-\u9FA5]{2,10}$/.test(this.realname.trim()))) {
                    this.maskFn("联系人姓名为2-10个中文");
                    return;
                }
                ;
                if (this.phone.trim() == "") {
                    this.maskFn('请输入手机号码');
                    return;
                } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(this.phone.trim()))) {
                    this.maskFn("手机号格式错误，请重新填写");
                    return;
                }
                ;
                if (this.phone.trim() == "") {
                    this.maskFn('请输入手机号码');
                    return;
                }
                if (this.cardid.trim() == "") {
                    this.maskFn('请输入身份证号码');
                    return;
                } else if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.cardid.trim()))) {
                    this.maskFn("请填写正确的身份证号码！");
                    return;
                }
                ;
                if (this.$refs.province.innerHTML.trim() == "请选择省") {
                    this.maskFn("请选择省");
                    return;
                }
                if (this.$refs.citySele.innerHTML.trim() == "请选择市") {
                    this.maskFn("请选择市");
                    return;
                }
                if (this.$refs.xianSele.innerHTML.trim() == "请选择县") {
                    this.maskFn("请选择县");
                    return;
                }
                if (this.addressDetail.trim() == "") {
                    this.maskFn('请输入详细地址');
                    return;
                }
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    realname: this.realname,
                    sex: this.sex,
                    phone: this.phone,
                    cardid: this.cardid,
                    address: this.$refs.province.innerHTML.trim() + this.$refs.citySele.innerHTML.trim() + this.$refs.xianSele.innerHTML.trim() + this.addressDetail.trim(),
                    pid: this.pid

                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/nmgHospital/addPatient',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        if (res.data.responseBody.res) {
                            window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                                + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=appointmenRegistration";
                        } else {
                            v.maskFn(res.data.responseBody.msg)
                        }
                    } else {
                        v.maskFn('添加就诊人失败')
                    }
                }).catch(function (err) {
                    v.maskFn('添加就诊人失败')
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
                                + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=patientManage";
                        }
                    } else {
                        window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                            + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=patientManage";
                    }
                }).catch(function (err) {
                })
            },
            goVisit: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=patientManage&comeForm=addPatient";
            },
            goPersonInfo: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=personalInfo&comeForm=addPatient";
            },
            exitBtn: function (ev) {
                ev.stopPropagation();
                this.exitFlag = true;
                this.maskFlag = true;
            },
            goPersonCenter: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=regInfo&comeForm=addPatient";
            },
            cancelExit: function () {
                this.exitFlag = false;
                this.maskFlag = false;
            },
            exit: function () {
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
                            + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=nmgHospital";
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
        },
        created: function () {
        },
        mounted: function () {
           
        }
    }
)

