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
            userCenterFlag: false,
            password: '',
            username: '',
            maskFlag: false,
            passWordOne: '',
            passWordTwo: '',
            cardid: "",
            realname: "",
            code: "",
            phone: "",
            wait: 60,
            timer: null,
            sex: 1,
            addressDetail: ""

        },
        methods: {
            back: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=" + comeForm;
            },
            selSex: function (ev, flag) {
                this.sex = flag;
                var target = ev.target || ev.srcElement;
                var pics = document.getElementsByTagName('picture');
                for (var i = 0; i < pics.length; i++) {
                    pics[i].className = "";
                }

                target.className = "active";

            },
            getCode: function () {
                if (this.phone.trim() == "") {
                    this.maskFn("请输入手机号");
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
                    local_x: local_x ,
                    localFrom:localFrom,
                    local_y: local_y,
                    phone: this.phone
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/nmgHospital/getCode',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        if (res.data.responseBody.res) {
                            v.maskFn(res.data.responseBody.msg)
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
            goLogin: function () {
                window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=" + comeForm;
            },
            res: function () {
                console.log(this.$refs)
                if (this.phone.trim() == "") {
                    this.maskFn('请输入手机号码');
                    return;
                } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(this.phone.trim()))) {
                    this.maskFn("手机号格式错误，请重新填写");
                    return;
                }
                ;
                if (this.phone.trim() == "") {
                    this.maskFn('请输入手机号码');
                    return;
                }
                if (this.code.trim() == "") {
                    this.maskFn('请输入短信验证码');
                    return;
                }
                if (this.realname.trim() == "") {
                    this.maskFn('请输入姓名');
                    return;
                } else if (!(/^[\u4E00-\u9FA5]{2,10}$/.test(this.realname.trim()))) {
                    this.maskFn("联系人姓名为2-10个中文");
                    return;
                }
                ;
                if (this.cardid.trim() == "") {
                    this.maskFn('请输入身份证号码');
                    return;
                } else if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.cardid.trim()))) {
                    this.maskFn("请填写正确的身份证号码！");
                    return;
                }
                ;
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

                if (this.$refs.province.innerHTML.trim() == "请选择省") {
                    this.maskFn("请选择省");
                    return;
                }
                if (this.$refs.citySele.innerHTML.trim() == "请选择市") {
                    this.maskFn("请选择市");
                    return;
                }
                if (this.$refs.xianSele.innerHTML.trim() == "请选择县") {
                    this.maskFn("请选择县");
                    return;
                }
                if (this.addressDetail.trim() == "") {
                    this.maskFn('请输入详细地址');
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
                    password: this.passWordTwo,
                    sex: this.sex,
                    realname: this.realname,
                    cardid: this.cardid,
                    address: this.$refs.province.innerHTML.trim() + this.$refs.citySele.innerHTML.trim() + this.$refs.xianSele.innerHTML.trim() + this.addressDetail.trim()
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/nmgHospital/resigter',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        if (res.data.responseBody.res) {
                            window.location.href = '/nmgHospital?randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                                + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&page=login&comeForm=" + comeForm;
                        } else {
                            v.maskFn(res.data.responseBody.msg)
                        }
                    } else {
                        v.maskFn('由于网络问题注册失败，请重新注册')
                    }
                }).catch(function (err) {
                    v.maskFn('由于网络问题注册失败，请重新注册')
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

            proSele:function(){
                if (document.getElementsByClassName('mobileSelect')[0]) {
                    document.getElementsByClassName('mobileSelect')[0].remove();
                }
                var weekdayArr = ChineseDistricts["86"];
                var mobileSelect1 = new MobileSelect({
                    trigger: '#province',
                    title: '--省--',
                    wheels: [{data: weekdayArr}],
                    callback:function(indexArr, data){//点击选择按钮触发的回调函数,indexArr(选中的选项索引)、data(选中的数据)
                        if(data[0].name!=='内蒙古自治区'){
                            $("#citySele").text("请选择市")
                            $("#xianSele").text("请选择县")
                        }
                    }
                })
                $(".mobileSelect").addClass("mobileSelect-show");

            },
            city: function () {
                var provinceId = $("#province").attr("data_id");
                if (!provinceId) {
                    return;
                }
                $(".mobileSelect").remove();
                $("#xianSele").text("请选择县");
                var weekdayArr = ChineseDistricts[provinceId];
                console.log(provinceId)
                console.log(ChineseDistricts["150000"])
                var mobileSelect1 = new MobileSelect({
                    trigger: '#citySele',
                    title: '--市--',
                    wheels: [{data: weekdayArr}]
                })
                document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect", "mobileSelect-show");
            },
            county: function () {
                /*
                 *选择景区地区
                 */
                var cityId = $("#citySele").attr("data_id");
                if (!cityId) {
                    return;
                }
                if (document.getElementsByClassName('mobileSelect')[0]) {
                    document.getElementsByClassName('mobileSelect')[0].remove();
                }
                var weekdayArr = ChineseDistricts[cityId];
                console.log(weekdayArr)
                var mobileSelect1 = new MobileSelect({
                    trigger: '#xianSele',
                    title: '--县--',
                    wheels: [{data: weekdayArr}]
                })
                document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect", "mobileSelect-show");
            }
        },
        created: function () {

        },
        mounted: function () {
           
        }
    }
)

