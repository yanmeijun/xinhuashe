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
            phone: "",
            wait: 60,
            timer: null,
            passWordTwo: "",
            passWordOne: "",
            code: "",
            subFlag: true
        },
        methods: {
            back: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=" + comeForm;
            },
            getCode: function () {
                if (this.phone.trim() == "") {
                    this.maskFn("请输入要找回的手机号");
                    return;
                } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(this.phone.trim()))) {
                    this.maskFn("请输入正确的手机号码");
                    return;
                }
                ;
                clearInterval(v.timer);
                v.timer = setInterval(function () {
                    v.wait -= 1;
                    if (v.wait <= 0) {
                        clearInterval(v.timer);
                        v.wait = 60;
                    }
                }, 1000);
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    phone: this.phone
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/nmgHospital/getCodeForget',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        if (res.data.responseBody.res) {
                            v.maskFn(res.data.responseBody.msg);
                        } else {
                            v.maskFn(res.data.responseBody.msg)
                        }
                    } else {
                        v.maskFn('获取验证码失败')
                    }
                }).catch(function (err) {
                    v.maskFn('操作失败')
                })
            },
            sub: function () {
                if (this.phone.trim() == "") {
                    this.maskFn('请输入要找回的手机号');
                    return;
                } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(this.phone.trim()))) {
                    this.maskFn("手机号格式错误，请重新填写");
                    return;
                }
                ;
                if (this.code.trim() == "") {
                    this.maskFn('请输入短信验证码');
                    return;
                }
                if (this.passWordOne.trim() == "") {
                    this.maskFn('请输入密码');
                    return;
                } else if (!(/^[a-zA-Z0-9]{6,15}$/).test(this.passWordOne.trim())) {
                    this.maskFn('密码长度只能在6-16位字符之间');
                    return;
                }
                if (this.passWordTwo.trim() == "") {
                    this.maskFn('请确认密码');
                    return;
                } else if (!(/^[a-zA-Z0-9]{6,15}$/).test(this.passWordTwo.trim())) {
                    this.maskFn('密码长度只能在6-16位字符之间');
                    return;
                }
                if (this.passWordOne.trim() !== this.passWordTwo.trim()) {
                    this.maskFn('两次密码输入不一致');
                    return;
                }
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    phone: this.phone,
                    code: this.code,
                    pass: this.passWordTwo

                };
                if (this.subFlag) {
                    this.subFlag = false;
                    axios({
                        headers: {"Content-Type": "application/json"},
                        method: 'post',
                        url: '/nmgHospital/ForgetPass',
                        data: data,
                        contentType: 'application/json'
                    }).then(function (res) {
                        v.subFlag = true;
                        if (res.data.retCode == "000000") {
                            if (res.data.responseBody.res) {
                                v.maskFn('找回密码成功');
                                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=" + comeForm;
                            } else {
                                v.maskFn('用户名或密码错误!')
                            }
                        } else {
                            v.maskFn('登录异常')
                        }
                    }).catch(function (err) {
                        v.maskFn('登录异常');
                        v.subFlag = true;
                    })
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
            }
        },
        created: function () {
        },
        mounted: function () {
            
        }
    }
)

