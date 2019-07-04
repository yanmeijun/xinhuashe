var v = new Vue({
        el: "#max",
        data: {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            userKey: userKey,
            pesCenterFlag: false,
            patientKey: patientKey,
            orderNum: orderNum,
            scheduleId: scheduleId,
            successOrder: successOrder,
            name: '',
            orderN: '',
            tel: '',
            hosName: '',
            deptName: '',
            docName: '',
            docType: '',
            hosAdd: '',
            getOrderAdd: '',
            orderTime: '',
            startTime: '',
            startEnd: '',
            pass: '',
            orderDate: '',
            orderStart: '',
            orderEnd: '',
            maskFlag: false,
            exitFlag: false


        },
        methods: {
            checkUser() {
                if (!userKey) {
                    window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                        + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=reservationDetail";
                    return;
                } else {
                    this.pesCenterFlag = !this.pesCenterFlag;
                }
            },
            jumpPerson: function () {
                window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=personalCenter&comeForm=reservationDetail";
                return;
            },
            exitBtn: function () {
                this.maskFlag = true;
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
                this.maskFlag = false;
                this.exitFlag = false;
                document.getElementsByTagName('body')[0].style.position = 'static';
            },
            back: function () {
                window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=appointmenRegistration&comeForm=reservationDetail";
            },
            goIndex: function () {
                window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=gsHospital";
            },
            getPersonCenter: function () {
                window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=personalCenter&comeForm=reservationDetail";
            },
            getData: function () {
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    orderNum: this.orderNum,
                    patientId: this.patientKey,
                    scheduleId: this.scheduleId,

                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/gsHospital/HospitalGetOrderInfo',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == '000000') {
                        if (res.data.responseBody.success == '1') {//成功了，
                            var data = res.data.responseBody.data;
                            v.name = data.P3;
                            v.orderN = data.P1;
                            v.tel = data.P2;
                            v.hosName = data.P4;
                            v.deptName = data.P6;
                            v.docName = data.P5;
                            v.docType = data.P14;
                            v.hosAdd = data.P15;
                            v.getOrderAdd = data.P8;
                            v.orderTime = data.P7;
                            v.startTime = data.P18;
                            v.startEnd = data.P19;
                            v.pass = data.P16;
                            v.orderDate = data.P9;
                            v.orderStart = data.P10;
                            v.orderEnd = data.P11;


                        } else {
                            v.maskFn(res.data.responseBody.message);

                            return;
                        }
                    } else {
                        v.maskFn('登录失败');
                        return;
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
            },
            toDou: function (n) {
                return n < 10 ? '0' + n : '' + n;
            }
        },
        created: function () {
            if (this.successOrder == 'true') {
                this.getData();
            } else {

            }

        },
        mounted: function () {
           
        }
    }
)

