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
            patientId: '',
            visits: [],
            calcelId: ''


        },
        methods: {
            back: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=" + comeForm;
            },
            goAddPati: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=addPatient&comeForm=" + comeForm;
            },
            delPersonBtn: function (str) {
                var regex = "\\((.+?)\\)";
                var str = str.match(regex)[1];
                this.calcelId = str.replace(/\'/g, '');
                this.delFlag = true;
                this.maskFlag = true;
            },
            cancelDel: function () {
                this.delFlag = false;
                this.maskFlag = false;
            },
            delPatient: function () {
                this.delFlag = false;
                this.maskFlag = false;
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    id: this.calcelId,
                    pid: this.patientId
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/nmgHospital/delPatient',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        if (res.data.responseBody.res) {
                            v.maskFn('删除成功');
                            v.getVisit();
                        } else {
                            v.maskFn(res.data.responseBody.msg)
                        }

                    } else {
                        window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                            + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=patientManage";
                    }

                }).catch(function (err) {
                    v.maskFn('获取数据异常');
                })
            },
            getPatientId: function () {
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    appoint_id: this.appoint_id
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/nmgHospital/getPatientId',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        if (res.data.responseBody.patientId) {
                            v.patientId = res.data.responseBody.patientId;
                            window.localStorage.setItem('patientId', v.patientId);
                            v.getVisit();
                        } else {
                            window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                                + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=patientManage";
                        }

                    } else {
                        window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                            + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=patientManage";
                    }

                }).catch(function (err) {
                    v.maskFn('获取数据异常');
                })
            },
            getVisit: function () {
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    id: this.patientId
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/nmgHospital/getVisit',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        v.visits = res.data.responseBody.result;
                    } else {
                        window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                            + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=patientManage";
                    }

                }).catch(function (err) {
                    v.maskFn('获取数据异常');
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
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=patientManage&comeForm=patientManage";
            },
            goPersonInfo: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=personalInfo&comeForm=patientManage";
            },
            exitBtn: function (ev) {
                ev.stopPropagation();
                this.exitFlag = true;
                this.maskFlag = true;
            },
            goPersonCenter: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=regInfo&comeForm=patientManage";
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
            this.getPatientId();
        }
    }
)

