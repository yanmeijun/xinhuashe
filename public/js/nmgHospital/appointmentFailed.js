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
            masktime: ''
        },
        methods: {
            back: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=appointmenRegistration";
            },
            exitBtn: function (ev) {
                ev.stopPropagation();
                this.exitFlag = true;
                this.maskFlag = true;
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
            goPersonCenter: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=regInfo&comeForm=appointmentFailed";
            },
            goVisit: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=patientManage&comeForm=appointmentFailed";
            },
            goPersonInfo: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=personalInfo&comeForm=appointmentFailed";
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
                                + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=nmgHospital";
                        }
                    } else {
                        window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                            + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=nmgHospital";
                    }
                }).catch(function (err) {
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
            
        }
    }
)

