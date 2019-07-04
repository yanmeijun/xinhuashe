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
            weList: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            docId: docId,
            dateStr: dateStr,
            ampm: ampm,
            data: {},
            nyr: '',
            person: [],
            RPatientId: '',
            timestampName: '',
            RShiftId: '',
            visitPhone: '',
            orderFlag: true
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
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=regInfo&comeForm=appointmenRegistration";
            },
            goVisit: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=patientManage&comeForm=appointmenRegistration";
            },
            goPersonInfo: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=personalInfo&comeForm=appointmenRegistration";
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
                                + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=appointmenRegistration";
                        }
                    } else {
                        window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                            + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=appointmenRegistration";
                    }
                }).catch(function (err) {
                })
            },
            checkPerson: function (ev, index) {
                for (var i = 0; i < this.person.length; i++) {
                    var jsonA = this.person[i];
                    jsonA.checked = 0;

                    Vue.set(this.person, i, jsonA);
                }
                var jsonB = this.person[index];
                jsonB.checked = 1;
                Vue.set(this.person, index, jsonB);
                this.RPatientId = this.person[index].id;
                this.visitPhone = this.person[index].visitPhone;
            },
            back: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=department";
            },
            order: function () {
                if (this.$refs.timestampName.innerHTML.trim() == '请选择就诊时间') {
                    this.maskFn('请选择就诊时间');
                    return;
                }
                var regex = "\\((.+?)\\)";
                var str = this.$refs.timestampName.getAttribute('data_id').match(regex)[1];
                var arr = str.split(',');
                var RShiftId = arr[0].replace(/\'/g, '');
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    RShiftId: RShiftId,
                    RDepartmentId: this.deptId,
                    weekName: new Date(v.dateStr).getDay(),
                    RPatientId: this.RPatientId,
                    hospitalId: this.RHospitalId,
                    doctorId: this.docId,
                    outDate: this.dateStr,
                    timestampName: this.$refs.timestampName.innerHTML,
                    ampm: this.ampm
                };
                if (this.orderFlag) {
                    this.orderFlag = false;
                    axios({
                        headers: {"Content-Type": "application/json"},
                        method: 'post',
                        url: '/nmgHospital/order',
                        data: data,
                        contentType: 'application/json'
                    }).then(function (res) {
                        v.orderFlag = true;
                        console.log(res);
                        if (res.data.retCode == "000000") {
                            if (res.data.responseBody.res) {
                                window.localStorage.setItem('visitPhone', v.visitPhone);
                                var url = res.data.responseBody.url;
                                var appointId = url.split('?')[1].split('=')[1];
                                window.localStorage.setItem('appointId', appointId);
                                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=appointmentDetails&comeForm=appointmenRegistration";
                            } else {
                                //预约失败
                                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=appointmentFailed&comeForm=appointmenRegistration";
                            }
                        } else {
                            v.maskFn('获取数据异常');
                        }
                    }).catch(function (err) {
                        v.orderFlag = true;
                        v.maskFn('获取数据异常');
                    })
                }

            },
            getDocInfo: function () {
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    hosId: this.RHospitalId,
                    docId: this.docId,
                    dateStr: this.dateStr,
                    ampm: this.ampm,
                    RDepartmentId: this.deptId
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/nmgHospital/getDocInfo',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    console.log(res);
                    if (res.data.retCode == "000000") {
                        v.data = res.data.responseBody
                        var str = v.data.date;
                        var time = new Date(str);
                        v.nyr = time.getFullYear() + '年' + v.toDou(time.getMonth() + 1) + '月' + v.toDou(time.getDate()) + '日';
                        v.person = res.data.responseBody.visit;
                        for (var i = 0; i < v.person.length; i++) {
                            v.person[i].checked = 0;
                        }
                        v.person[0].checked = 1;
                        v.visitPhone = v.person[0].visitPhone;
                        v.RPatientId = v.person[0].id;
                        v.time = res.data.responseBody.time;
                        timeArr = [];
                        for (var j = 0; j < v.time.length; j++) {
                            var s = {};
                            s.id = v.time[j].href;
                            s.name = v.time[j].time;
                            timeArr.push(s);
                        }
                        console.log(timeArr)

                    } else {
                        v.maskFn('获取数据异常');
                    }
                }).catch(function (err) {
                    v.maskFn('获取数据异常');
                })
            },
            toDou: function (n) {
                return n < 10 ? '0' + n : '' + n;
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
            this.getDocInfo();
        }
    }
)

