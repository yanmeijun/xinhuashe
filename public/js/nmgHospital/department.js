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
            masktime: '',
            RHospitalId: RHospitalId,
            RRegionId: RRegionId,
            hosName: hosName,
            hosGrade: hosGrade,
            deptId: deptId,
            deptName: deptName,
            dataList: [],
            weekList: [],
            dateList: [],
            weList: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            dialogMask:false

        },
        methods: {
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
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=regInfo&comeForm=department";
            },
            goVisit: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=patientManage&comeForm=department";
            },
            goPersonInfo: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=personalInfo&comeForm=department";
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
                                + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=selectDepartment";
                        }
                    } else {
                        window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                            + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=selectDepartment";
                    }
                }).catch(function (err) {
                })
            },
            checkLogin: function (href) {
                var regex = "\\((.+?)\\)";
                var str = href.match(regex)[1];
                var arr = str.split(',');
                window.localStorage.setItem('docId', arr[1].replace(/\"/g, ""));
                window.localStorage.setItem('dateStr', arr[2].replace(/\"/g, ""));
                window.localStorage.setItem('ampm', arr[3].replace(/\"/g, ""));
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    RDepartmentId: deptId,
                    RHospitalId: RHospitalId,
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/nmgHospital/checkLogin',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        if (res.data.responseBody.res) {
                            window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                                + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=appointmenRegistration&comeForm=department";
                        } else {
                            window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                                + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=department";
                        }

                    } else {
                        v.maskFn('获取数据异常');
                    }
                }).catch(function (err) {
                    v.maskFn('获取数据异常');
                })
            },
            back: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=selectDepartment";
            },
            getData: function () {
                this.dialogMask = true;
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    RDepartmentId: deptId,
                    RHospitalId: RHospitalId
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/nmgHospital/orderInfo',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    v.dialogMask = false;
                    if (res.data.retCode == "000000") {
                        v.depName = res.data.responseBody.depName;
                        v.dataList = res.data.responseBody.result;
                    } else {
                        v.maskFn('获取数据异常');
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
            toDou: function (n) {
                return n < 10 ? '0' + n : '' + n;
            },
            showDate: function (startDate, num, flag) {
                if (flag == 1) {
                    var date = startDate;
                    var time = date.getTime() + 24 * 3600 * 1000;
                    var dateStrList = [], dateList = [];
                    var sevenDays = [];
                    for (var i = 0; i < 7; i++) {
                        var date = new Date(time + i * 24 * 3600 * 1000);
                        var weekTime = date.getDay();
                        dateList.push(this.toDou(date.getMonth() + 1) + '-' + date.getDate())
                        sevenDays.push(weekTime);
                    }
                    return {sevenDays, dateList};

                }
            }
        },
        created: function () {
        },
        mounted: function () {
            var startDate = new Date();
            this.weekList = this.showDate(startDate, 7, 1).sevenDays;
            this.dateList = this.showDate(startDate, 7, 1).dateList;
            this.getData();
        }
    }
)

