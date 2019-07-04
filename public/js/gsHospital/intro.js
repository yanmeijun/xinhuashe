var v = new Vue({
        el: "#max",
        data: {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            intro: '',
            name: '',
            userKey: userkey,
            pesCenterFlag: false,
        },
        methods: {
            getHosInfo: function () {   //获取医院详情信息
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    hos_key: this.hoskey
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/gsHospital/Hospitalinfo',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        v.name = res.data.responseBody.sysOrg.fullName;
                        v.intro = res.data.responseBody.sysOrg.historyInfo;
                    }
                }).catch(function (err) {
                })
            },
            back: function () {
                window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=selectDepartment";
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
            checkUser() {
                if (!userkey) {
                    window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                        + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=Intro";
                    return;
                } else {
                    this.pesCenterFlag = !this.pesCenterFlag;
                }
            },
            jumpPerson: function () {
                window.location.href = '/gsHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=personalCenter&comeForm=Intro";
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
            }
        },
        created: function () {
            this.getHosInfo();
        },
        mounted: function () {
            
        }
    }
)

