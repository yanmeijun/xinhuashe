var v = new Vue({
        el: "#max",
        data: {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            masktime: '',
            maskFlag: false,
            citySRC: citySRC,
            provinceName: ''

        },
        methods: {
            fnSize: function () {
                document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.offsetWidth / 10 + 'px';
            },
            render: function (pageName) {
                window.location.href = '/passport?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=" + pageName + "&comeForm=passport";
            },
            getCity: function () {
                document.getElementById("dialogMask").style.display = "block";
                document.getElementById("dialog").style.display = "block";
                var checkdata = {
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
                    url: '/passport/getCity',
                    data: checkdata,
                    contentType: 'application/json'
                }).then(function (res) {
                    document.getElementById("dialogMask").style.display = "none";
                    document.getElementById("dialog").style.display = "none";
                    var haiNan = res.data.responseBody[cityID.substr(0, 2)];
                    v.provinceName = haiNan.name;
                    window.localStorage.setItem("provinceName", v.provinceName);//省名称
                }).catch(function (err) {
                });
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
            this.getCity();
        },
        mounted: function () {
            this.fnSize();
            window.addEventListener('resize', this.fnSize, false);
            /*if (citySRC) {
                this.$refs.cityImg.src = citySRC;
            } else {
                this.$refs.cityImg.src = "/images/banner.png";
            }*/
        }
    }
)

