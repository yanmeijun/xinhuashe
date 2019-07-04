var v = new Vue({
        el: "#max",
        data: {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            userAccount: userAccount,
            capCode: capCode,
            imgSrc: '',
            masktime: '',
            authCode: '',
            pwdRandom: '',
            newPwd: '',
            passTwo: '',
            success: false,
            maskFlag: false,
            userKey: userKey,
            pesCenterFlag: false,
            wait: 0
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
            getAccount: function () {
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    userAccount: userAccount,
                    capCode: capCode,
                    ts: Math.random()
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/gsHospital/HospitalfindPassAccountInfo',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        v.authCode = res.data.responseBody.data.authCode;

                    }
                }).catch(function (err) {
                })
            },
            getCode: function () {
                if (this.wait != 0) {
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
                    capCode: capCode,
                    ts: Math.random()
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/gsHospital/HospitalfindPassGetPhone',
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
            submit: function () {
                if (this.pwdRandom.trim() == "") {
                    v.maskFn('请输入动态密码');
                    return;
                }
                if (this.pwdRandom.trim().length != 6) {
                    v.maskFn('请输入正确的动态密码');
                    return;
                }
                if (this.newPwd.trim() == "") {
                    this.maskFn("请输入新密码！");
                    return;
                } else {
                    var regUpper = /[A-Z]/;
                    var regLower = /[a-z]/;
                    var regNum = /[0-9]/;
                    var regTeShu = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？+-]");
                    var complex = 0;
                    if (regLower.test(this.newPwd.trim())) {
                        ++complex;
                    }
                    if (regUpper.test(this.newPwd.trim())) {
                        ++complex;
                    }
                    if (regNum.test(this.newPwd.trim())) {
                        ++complex;
                    }
                    if (regTeShu.test(this.newPwd.trim())) {
                        ++complex;
                    }
                    if (complex < 3 || this.newPwd.trim() < 8) {
                        this.maskFn("请输入数字、小写字母、大写字母、特殊字符四类中，至少3类且长度不小于8的密码！");
                        return;
                    }
                }
                if (this.passTwo.trim() == "") {
                    v.maskFn('请再次输入新密码');
                    return;
                }
                if (this.passTwo.trim() !== this.newPwd.trim()) {
                    v.maskFn('两次密码输入不一致！');
                    return;
                }
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    pwdRandom: this.pwdRandom,
                    authCode: this.authCode,
                    newPwd: this.newPwd
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/gsHospital/HospitalfindPass',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        if (res.data.responseBody.success == '1') {
                            v.maskFlag = true;
                            v.success = true;
                        } else if (res.data.responseBody.success == '0') {
                            var msg = res.data.responseBody.message;
                            v.maskFn(msg);
                            return;
                        }
                    }
                }).catch(function (err) {
                })
            },
            jumpLogin: function () {
                window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=gsHospital";
            },
            back: function () {
                window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=forgetPwd&comeForm=" + comeForm;
            },
        },
        created: function () {
            this.getAccount();
        },
        mounted: function () {
            
        }
    }
)

