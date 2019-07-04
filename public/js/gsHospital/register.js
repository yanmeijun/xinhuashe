var v = new Vue({
        el: "#max",
        data: {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            imgSrc: '',
            capCode: '',
            masktime: '',
            authCode: "",
            authType: '0',
            userName: '',
            passWordOne: '',
            passWordTwo: '',
            registerCard: '',
            wait: 0,
            phoneNum: '',
            userkey: userKey,
            pesCenterFlag: false

        },
        methods: {
            reg: function () {
                if (this.authCode.trim() == "") {
                    this.maskFn("请输入手机号码！");
                    return;
                } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(this.authCode.trim()))) {
                    this.maskFn("请填写正确的手机号码！");
                    return;
                }
                ;
                if (this.userName.trim() == "") {
                    this.maskFn("请输入真实姓名！");
                    return;
                } else if ((/^[^\d]$/.test(this.userName.trim()))) {
                    this.maskFn("请输入中文！");
                    return;
                }
                ;
                if (this.registerCard.trim() == "") {
                    this.maskFn("请输入身份证号！");
                    return;
                } else if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.registerCard.trim()))) {
                    this.maskFn("请填写正确的身份证号码！");
                    return;
                }
                ;
                if (this.passWordOne.trim() == "") {
                    this.maskFn("请输入登录密码！");
                    return;
                } else if (this.passWordOne.trim().length < 8) {
                    this.maskFn("请输入至少8位登录密码！");
                    return;
                } else {
                    var regUpper = /[A-Z]/;
                    var regLower = /[a-z]/;
                    var regNum = /[0-9]/;
                    var regTeShu = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？+-]");
                    var complex = 0;
                    if (regLower.test(this.passWordOne.trim())) {
                        ++complex;
                    }
                    if (regUpper.test(this.passWordOne.trim())) {
                        ++complex;
                    }
                    if (regNum.test(this.passWordOne.trim())) {
                        ++complex;
                    }
                    if (regTeShu.test(this.passWordOne.trim())) {
                        ++complex;
                    }
                    if (complex < 3 || this.passWordOne.trim() < 8) {
                        this.maskFn("请输入数字、小写字母、大写字母、特殊字符四类中，至少3类且长度不小于8的密码！");
                        return;
                    }
                }
                if (this.passWordTwo.trim() == "") {
                    this.maskFn("请输入登录密码！");
                    return;
                }
                if (this.passWordOne.trim() !== this.passWordTwo.trim()) {
                    this.maskFn("两次密码不一致！");
                    return;
                }
                if (this.capCode.trim() == "") {
                    this.maskFn("请输入图片验证码！");
                    return;
                }
                if (this.phoneNum.trim() == "") {
                    this.maskFn("请输入手机验证码！");
                    return;
                }
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
                    url: '/gsHospital/userCardCheck',
                    data: checkdata,
                    contentType: 'application/json'
                }).then(function (res) {
                    console.log(res);
                    if (res.data.responseBody.data == 'true') {
                        var data = {
                            randomKey: randomKey,
                            userID: userID,
                            clientID: clientID,
                            cityID: cityID,
                            local_x: local_x ,localFrom:localFrom,
                            local_y: local_y,
                            userName: v.userName,
                            userAccount: v.authCode,
                            passWordOne: v.passWordOne,
                            registerCard: v.registerCard,
                            ts: Math.random()
                        };
                        axios({
                            headers: {"Content-Type": "application/json"},
                            method: 'post',
                            url: '/gsHospital/HospitalReg',
                            data: data,
                            contentType: 'application/json'
                        }).then(function (res) {
                            if (res.data.retCode == "000000") {
                                if (res.data.responseBody.success == '1') {
                                    window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                                        + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=" + comeForm;
                                } else if (res.data.responseBody.success == '0') {
                                    var msg = res.data.responseBody.message;
                                    v.maskFn(msg);
                                    return;
                                }
                            }
                        }).catch(function (err) {
                        })
                    } else {
                        v.maskFn('姓名与身份证号不匹配');
                        return;
                    }
                }).catch(function (err) {
                });

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
                    url: '/gsHospital/HospitalRegImg',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    var src = res.data;
                    v.imgSrc = src;
                }).catch(function (err) {
                })
            },
            checkImg: function () {
                if (this.wait != 0) {
                    return;
                }
                if (this.capCode.trim().length != 4) {
                    this.maskFn("请输入图片验证码！");
                    return;
                }
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    capCode: this.capCode
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/gsHospital/HospitalRegImgCheck',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        var capCode = res.data.responseBody.capCode;
                        if (!capCode) {
                            v.maskFn('图片验证码错误');
                            return;
                        } else {
                            v.getCode();
                        }
                    }
                }).catch(function (err) {
                })
            },
            getCode: function () {
                if (this.authCode.trim() == "") {
                    this.maskFn("请输入手机号码！");
                    return;
                } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(this.authCode.trim()))) {
                    this.maskFn("请填写正确的手机号码！");
                    return;
                }
                ;
                if (this.userName.trim() == "") {
                    this.maskFn("请输入真实姓名！");
                    return;
                } else if ((/^[^\d]$/.test(this.userName.trim()))) {
                    this.maskFn("请输入中文！");
                    return;
                }
                ;
                if (this.registerCard.trim() == "") {
                    this.maskFn("请输入身份证号！");
                    return;
                } else if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.registerCard.trim()))) {
                    this.maskFn("请填写正确的身份证号码！");
                    return;
                }
                ;
                if (this.passWordOne.trim() == "") {
                    this.maskFn("请输入登录密码！");
                    return;
                } else if (this.passWordOne.trim().length < 8) {
                    this.maskFn("请输入至少8位登录密码！");
                    return;
                } else {
                    var regUpper = /[A-Z]/;
                    var regLower = /[a-z]/;
                    var regNum = /[0-9]/;
                    var regTeShu = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？+-]");
                    var complex = 0;
                    if (regLower.test(this.passWordOne.trim())) {
                        ++complex;
                    }
                    if (regUpper.test(this.passWordOne.trim())) {
                        ++complex;
                    }
                    if (regNum.test(this.passWordOne.trim())) {
                        ++complex;
                    }
                    if (regTeShu.test(this.passWordOne.trim())) {
                        ++complex;
                    }
                    if (complex < 3 || this.passWordOne.trim() < 8) {
                        this.maskFn("请输入数字、小写字母、大写字母、特殊字符四类中，至少3类且长度不小于8的密码！");
                        return;
                    }
                }
                if (this.passWordTwo.trim() == "") {
                    this.maskFn("请输入登录密码！");
                    return;
                }
                if (this.passWordOne.trim() !== this.passWordTwo.trim()) {
                    this.maskFn("两次密码不一致！");
                    return;
                }
                if (this.capCode.trim() == "") {
                    this.maskFn("请输入图片验证码！");
                    return;
                }
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    authType: '0',
                    authCode: this.authCode,
                    capCode: this.capCode,
                    ts: Math.random()
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/gsHospital/HospitalRegGetPhone',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        if (res.data.responseBody.success == '1') {
                            var msg = res.data.responseBody.message;
                            v.maskFn(msg);
                            v.wait = 60;
                            v.countDown();
                            return;
                        } else if (res.data.responseBody.success == '0') {
                            var msg = res.data.responseBody.message;
                            v.maskFn(msg);
                            v.wait = 60;
                            v.countDown();
                            return;
                        }
                    }
                }).catch(function (err) {
                })
            },
            countDown: function () {
                clearInterval(i);
                var i = setInterval(function () {
                    if (v.wait <= 0)return;
                    v.wait--;
                }, 1000)
            },
            checkUser() {
                if (!this.userkey) {
                    window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                        + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=gsHospital";
                    return;
                }
                this.pesCenterFlag = !this.pesCenterFlag;

            },
            back: function () {
                window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=" + comeForm;
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
        },
        created: function () {

        },
        mounted: function () {
            this.$refs.imgClick.click();
        }
    }
)

