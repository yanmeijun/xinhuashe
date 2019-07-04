var v = new Vue({
        el: "#max",
        data: {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            userAccount: USERNAME || "",
            passWord: PASSWORD || '',
            capCode: '',
            imgSrc: '/images/refreshCode.png',
            masktime: '',
            maskFlag: false,
            exitFlag: false,
            userKey: userKey,
            pesCenterFlag: false

        },
        methods: {
            checkUser() {
                if (!this.userKey) {
                    return;
                }
                this.pesCenterFlag = !this.pesCenterFlag;
            },
            jumpPerson: function () {
                window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=personalCenter&comeForm=login";
                return;
            },
            exitBtn: function () {
                this.maskFlag = true;
                this.exitFlag = true;
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
                    url: '/gsHospital/HospitalLoginImg',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    var src = res.data;
                    v.imgSrc = src;
                }).catch(function (err) {
                })
            },
            login: function () {
                if (this.userAccount.trim() == "") {
                    this.maskFn("请输入手机号");
                    return;
                } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(this.userAccount.trim()))) {
                    this.maskFn("请输入正确的手机号");
                    return;
                }
                ;
                if (this.passWord.trim() == "") {
                    this.maskFn("请输入密码");
                    return;
                }
                if (this.capCode.trim() == "") {
                    this.maskFn("请输入验证码");
                    return;
                }
                var base = new Base64();
                var userAccount = base.encode(this.userAccount);
                var pwd = hex_md5(this.passWord);
                // var password = hex_md5(pwd + this.capCode);
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    userAccount: userAccount,
                    _userAccount: this.userAccount,
                    passWord: pwd,
                    _passWord: this.passWord,
                    capCode: this.capCode
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/gsHospital/HospitalLogin',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == '000000') {
                        if (res.data.responseBody.success == '1') {//成功了，存储用户信息
                            sessionStorage.setItem("userKey", res.data.responseBody.data.pkey);
                            sessionStorage.setItem("userName", res.data.responseBody.data.userName);
                            window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                                + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=" + comeForm;
                        } else if (res.data.responseBody.success == '3') {
                            //账号需要实名认证
                            window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                                + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=realNameCertification&comeForm=" + comeForm + "&userAccount=" + userAccount;
                        } else {
                            if (res.data.responseBody.message == "获取信息失败") {
                                v.maskFn("该账号不存在！");
                                v.$refs.imgClick.click();
                                return;
                            }
                            v.maskFn(res.data.responseBody.message);
                            v.$refs.imgClick.click();
                            return;
                        }
                    } else {
                        v.maskFn('登录失败');
                        v.$refs.imgClick.click();
                        return;
                    }
                }).catch(function (err) {
                })
            },
            forgetPass: function () {
                var url = "/gsHospital?page=forgetPwd&randomKey=" + randomKey + "&userID=" + userID +
                    "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeForm=" + comeForm;
                window.location.href = url;
            },
            goRes: function () {
                var url = "/gsHospital?randomKey=" + randomKey + "&userID=" + userID +
                    "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeForm=" + comeForm + "&page=register";
                window.location.href = url;
            },
            back: function () {
                window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=" + comeForm;
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

