var v = new Vue({
        el: "#max",
        data: {
            masktime: '',
            maskFlag: false,
            hukouSelect: false,
            hukouSelectType: false,
            personType: false,
            zwzf: "",
            keyPingYing: [],
            defaultPing: true,
            zwzfName: "",
            keyNamePingYing: [],
            defaultNamePing: false,
            card: "",
            masktime: "",
            birthdate: "",
            brithArr: [],
            brithDz: "请选择",
            phone: "",
            hukouArr: [],
            hukouArr2: [],
            hukouDz: "请选择",
            hukouType: "请选择省",
            hukouDz2: "请选择",
            hukouType2: "请选择",
            mainProvince: "",
            /*city:true,*/
            city: false,
            country: false,
            single: "",
            single2: "",
            selectes: false,//男1
            select: false,//女2
            cityColor: false,
            countryColor: false,
            urgentPhone: "",
            urgentContacts: "",
            SLDWDZ: '',
            time: '',
            xing: '',
            ming: '',
            brithDzId: '',
            hukouTypeID2: "",
            provinceName: '',
            provinceColor: true,
            provColor: false,
            hukouArr3: [],
            mainCity: "",
            province: true,
            provinceShow: true,
            countryShow: true,
            cityShow: false,
            isShow: true
        },
        methods: {
            fnSize: function () {
                document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.offsetWidth / 10 + 'px';
            },
            back: function () {
                window.location.href = '/passport?&page=appointmentNotice&randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
            },
            close: function () {
                v.hukouSelect = false;
                v.hukouSelectType = false;
            },
            next: function () {
                if (v.zwzf == "") {
                    v.maskFn("请输入中文姓");
                    return;
                }
                if (v.zwzfName == "") {
                    v.maskFn("请输入中文名");
                    return;
                }
                if (v.card == "") {
                    v.maskFn("请输入身份证");
                    return;
                } else if (!v.validateIdCard(v.card)) {
                    v.maskFn("身份证格式错误");
                    return;
                }

                if (document.getElementById("nationTrigger").getAttribute("data_id") == null) {
                    v.maskFn("请选择民族");
                    return;
                }
                if (v.brithDz == "" || v.brithDz == "请选择") {
                    v.maskFn("请选择出生地");
                    return;
                }
                if (v.phone == "") {
                    v.maskFn("请输入联系电话");
                    return;
                }
                if (v.hukouDz == "" || v.hukouDz == "请选择") {
                    v.maskFn("请选择户籍所在地");
                    return;
                }
                if (v.urgentContacts == "") {
                    v.maskFn("请输入紧急联系人");
                    return;
                }
                if (v.urgentPhone == "") {
                    v.maskFn("紧急联系人电话");
                    return;
                }
                window.localStorage.setItem("CRJ_SFZHLXDH", v.card + v.phone);//身份证+手机号
                window.localStorage.setItem("CRJ_CXTJ", v.card.substr(v.card.length - 4));//后四位
                window.localStorage.setItem("ZWXM", v.zwzfName);//中文名
                window.localStorage.setItem("LXDH", v.phone);//联系电话
                window.localStorage.setItem("CFYZSJ", v.card);//身份证
                window.localStorage.setItem("SQRLX", document.getElementById("huJiTrigger").getAttribute("data_id") == "11" ? "" : '31');//人员类别第二个下拉框

                window.localStorage.setItem("ZWX", v.zwzf);//中文姓
                window.localStorage.setItem("ZWM", v.zwzfName);//中文名
                window.localStorage.setItem("ZWXM", v.zwzf + v.zwzfName);//中文姓名
                window.localStorage.setItem("YWX", v.xing);//拼音姓
                window.localStorage.setItem("YWM", v.ming);//拼音名
                window.localStorage.setItem("YWXM", v.xing + v.ming);//拼音姓名
                window.localStorage.setItem("SFZH", v.card);//身份证号
                window.localStorage.setItem("XB", v.selectes ? '1' : '2');//性别（男1，女2）
                window.localStorage.setItem("XB_sv", v.selectes ? '男' : '女');//性别汉字（男1，女2）
                window.localStorage.setItem("MZ", document.getElementById("nationTrigger").getAttribute("data_id"));//民族
                window.localStorage.setItem("MZ_sv", document.getElementById("nationTrigger").textContent);//民族汉字
                window.localStorage.setItem("CSRQ", document.getElementById("appDate").textContent);//出生日期
                window.localStorage.setItem("CSD", v.brithDzId);//出生地
                window.localStorage.setItem("CSD_sv", v.brithDz);//出生地汉字
                window.localStorage.setItem("LXDH", v.phone);//联系电话
                window.localStorage.setItem("HKSZDDZ", v.hukouDz);//户口所在地地址
                window.localStorage.setItem("HKSZD", v.hukouTypeID2);//户口所在地行政区号
                console.log(v.hukouTypeID2)
                window.localStorage.setItem("urgentContacts", v.urgentContacts);//紧急联系人
                window.localStorage.setItem("urgentPhone", v.urgentPhone);//紧急联系人电话

                window.location.href = '/passport?&page=certificationType&randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                    + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
            },
            selected: function () {
                // e.target 是你当前点击的元素
                // e.currentTarget 是你绑定事件的元素
                this.selectes = false
                return this.select = this.select == true ? this.select = false : this.select = true;

            },
            selecte: function () {
                this.select = false
                return this.selectes = this.selectes == true ? this.selectes = false : this.selectes = true;

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
            huJiSelect: function () {
                var isktbs = window.localStorage.getItem("isktbs"),
                    isktfbs = window.localStorage.getItem("isktfbs"),
                    isktsw = window.localStorage.getItem("isktsw")
                var weekdayArr = [];
                if (isktbs == 'true' || isktbs == true) {
                    weekdayArr.push({"id": "11", "name": "本地户籍居民"})
                }
                if (isktfbs == 'true' || isktfbs == true) {
                    weekdayArr.push({"id": "snfbd", "name": "省内非本地户籍居民"})
                }
                if (isktsw == 'true' || isktsw == true) {
                    weekdayArr.push({"id": "sw", "name": "省外户籍居民"})
                }
                if (document.getElementsByClassName('mobileSelect')[0]) {
                    document.getElementsByClassName('mobileSelect')[0].remove();
                }
                var mobileSelect1 = new MobileSelect({
                    trigger: '#huJiTrigger',
                    title: '请选择户籍',
                    wheels: [
                        {data: weekdayArr}
                    ],
                    callback: function () {
                        if (document.getElementById("huJiTrigger").getAttribute("data_id") == "11") {
                            v.personType = false;
                        } else {
                            v.personType = true;
                        }
                    }
                });
                document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect", "mobileSelect-show");
            },
            loseFocus: function (a) {
                v = a || v;
                v.keyPingYing = [];
                v.xing = '';
                if (v.zwzf == "") {
                    return;
                }
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    zwzf: v.zwzf
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/passport/getNamePinyin',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    v.defaultPing = false;
                    if (res.data.retCode == "000000") {
                        var zwzfNum = v.zwzf.length;
                        for (var i = 0; i < zwzfNum; i++) {
                            var j = {};
                            if (res.data.responseBody[v.zwzf.charAt(i)]) {
                                j.ping = res.data.responseBody[v.zwzf.charAt(i)];
                            } else {
                                j.ping = "?";
                            }
                            v.keyPingYing.push(j);
                            v.xing += j.ping + ' '
                        }
                    } else {
                        v.keyPingYing = [
                            {"ping": "?"}
                        ];
                    }
                }).catch(function (err) {

                });
            },
            nameBlur: function () {
                v.keyNamePingYing = [];
                v.ming = '';
                if (v.zwzfName == "") {
                    return
                }
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    zwzf: v.zwzfName
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/passport/getNamePinyin',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    v.defaultNamePing = false;
                    if (res.data.retCode == "000000") {
                        var zwzfNameNum = v.zwzfName.length;
                        for (var i = 0; i < zwzfNameNum; i++) {
                            var j = {};
                            if (res.data.responseBody[v.zwzfName.charAt(i)]) {
                                j.ping = res.data.responseBody[v.zwzfName.charAt(i)];
                            } else {
                                j.ping = "?";
                            }
                            v.keyNamePingYing.push(j);
                            v.ming += j.ping + ' '
                        }
                    } else {
                        v.keyNamePingYing = [
                            {"ping": "?"}
                        ];
                    }
                }).catch(function (err) {

                });
            },
            cardBlur: function () {
                if (v.card == "") {
                    return
                } else {
                    if (!v.validateIdCard(v.card)) {
                        v.maskFn("身份证格式错误");
                    } else {
                        v.birthdate = v.IdCard(v.card, 1)
                        if (v.IdCard(v.card, 2) == "男") {
                            v.selectes = true;
                            v.select = false;
                        } else {
                            v.select = true;
                            v.selectes = false;
                        }
                    }
                }
            },
            validateIdCard: function (idCard) {
                //15位和18位身份证号码的正则表达式
                // var regIdCard = /(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[X|x])$)/;
                var regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                //如果通过该验证，说明身份证格式正确，但准确性还需计算
                if (regIdCard.test(idCard)) {
                    if (idCard.length == 18) {
                        var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
                        var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
                        var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
                        for (var i = 0; i < 17; i++) {
                            idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
                        }
                        var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
                        var idCardLast = idCard.substring(17);//得到最后一位身份证号码
                        //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
                        if (idCardMod == 2) {
                            if (idCardLast == "X" || idCardLast == "x") {
                                return true;
                                //alert("恭喜通过验证啦！");

                            } else {
                                return false;
                                //maskTip("身份证号码错误！");
                            }
                        } else {
                            //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                            if (idCardLast == idCardY[idCardMod]) {
                                //alert("恭喜通过验证啦！");
                                return true;
                            } else {
                                //maskTip("身份证号码错误！");
                                return false;

                            }
                        }
                    } else {
                        //maskTip("身份证号码错误！");
                        return false;
                    }
                } else {
                    return false;
                }
            },
            IdCard: function (UUserCard, num) {
                if (num == 1) {
                    //获取出生日期
                    birth = UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
                    return birth;
                }
                if (num == 2) {
                    //获取性别
                    if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
                        //男
                        return "男";
                    } else {
                        //女
                        return "女";
                    }
                }
                if (num == 3) {
                    //获取年龄
                    var myDate = new Date();
                    var month = myDate.getMonth() + 1;
                    var day = myDate.getDate();
                    var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
                    if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
                        age++;
                    }
                    return age;
                }
            },
            nationSelect: function () {
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
                    url: '/passport/namefamily',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        //创建文档对象
                        var parser = new DOMParser();
                        var xmlDoc = parser.parseFromString(res.data.responseBody.data, "text/xml");//提取数据
                        var countrys = xmlDoc.getElementsByTagName('row');
                        var weekdayArr = [];
                        for (var i = 0; i < countrys.length; i++) {
                            var list = {};
                            list["name"] = countrys[i].getAttribute("DIC_TEXT");
                            list["id"] = countrys[i].getAttribute("DIC_CODE");
                            weekdayArr.push(list);
                        }
                        if (document.getElementsByClassName('mobileSelect')[0]) {
                            document.getElementsByClassName('mobileSelect')[0].remove();
                        }
                        var mobileSelect1 = new MobileSelect({
                            trigger: '#nationTrigger',
                            title: '请选择民族',
                            wheels: [
                                {data: weekdayArr}
                            ],
                            callback: function () {

                            }
                        });
                        document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect", "mobileSelect-show");
                    } else {

                    }
                }).catch(function (err) {

                });
            },
            close: function () {
                v.hukouSelect = false;
            },
            brithSelect: function () {
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
                    url: '/passport/brithAddress',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        //创建文档对象
                        var parser = new DOMParser();
                        var xmlDoc = parser.parseFromString(res.data.responseBody.data, "text/xml");//提取数据
                        var countrys = xmlDoc.getElementsByTagName('row');
                        for (var i = 0; i < countrys.length; i++) {
                            var list = {};
                            list["name"] = countrys[i].getAttribute("DIC_TEXT");
                            list["id"] = countrys[i].getAttribute("DIC_CODE");
                            v.brithArr.push(list);
                        }
                        v.hukouSelect = true;
                    } else {

                    }
                }).catch(function (err) {

                });
            },
            brithHujiSelect: function () {//市
                // v.personType
                v.hukouArr = [];
                v.hukouArr2 = [];
                v.hukouArr3 = [];
                v.provinceName = window.localStorage.getItem("provinceName");
                v.hukouType = window.localStorage.getItem("cityCon");
                v.hukouType2 = "请选择";
                v.isShow = true;
                v.mainCity = "";
                v.mainProvince = "";
                if (v.personType) {
                    if (document.getElementById("huJiTrigger").getAttribute("data_id") == "snfbd") {
                        v.isShow = true;
                        v.provinceShow = false;
                        v.countryShow = false;
                        v.province = false;
                        v.country = false;
                        v.city = true;
                        v.cityShow = true;
                        v.citySelect1();
                        return;
                    }
                    v.provinceShow = true;
                    v.countryShow = false;
                    v.province = true;
                    v.country = false;
                    v.city = false;
                    v.cityShow = false;
                    v.$options.methods.provinceSelect();
                } else {
                    v.provinceShow = false;
                    v.province = false;
                    v.country = true;
                    v.city = false;
                    v.countryShow = true;
                    v.cityShow = false;
                    v.countrySelect();
                }
            },
            /*获取省列表*/
            provinceSelect: function () {
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
                    url: '/passport/brithHuji',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        //创建文档对象
                        var parser = new DOMParser();
                        var xmlDoc = parser.parseFromString(res.data.responseBody.data, "text/xml");//提取数据
                        var countrys = xmlDoc.getElementsByTagName('row');
                        for (var i = 0; i < countrys.length; i++) {
                            var list = {};
                            list["name"] = countrys[i].getAttribute("DIC_TEXT");
                            list["id"] = countrys[i].getAttribute("DIC_CODE");
                            list["isChecked"] = false;
                            v.hukouArr3.push(list);
                        }
                        /*                        if(v.single == ""){
                         v.hukouArr3[0].isChecked = true;
                         }else{
                         v.hukouArr3[v.single].isChecked = true;
                         }*/
                        v.hukouSelectType = true;
                    } else {
                        v.maskFn("请求异常，请稍后");
                    }
                }).catch(function (err) {

                });
            },
            /*获取市列表*/
            citySelect1: function () {
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    province: v.mainCity || cityID.substr(0, 2)
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/passport/cityChoice',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        //创建文档对象
                        var parser = new DOMParser();
                        var xmlDoc = parser.parseFromString(res.data.responseBody.data, "text/xml");//提取数据
                        var countrys = xmlDoc.getElementsByTagName('row');
                        for (var i = 0; i < countrys.length; i++) {
                            var list = {};
                            list["name"] = countrys[i].getAttribute("DIC_TEXT");
                            list["id"] = countrys[i].getAttribute("DIC_CODE");
                            list["isChecked"] = false;
                            v.hukouArr.push(list);
                        }
                        if (v.mainCity == "11" || v.mainCity == "12") {
                            v.isShow = false;
                        } else {
                            v.isShow = true;
                        }
                        /*                        if(v.single == ""){
                         v.hukouArr[0].isChecked = true;
                         }else{
                         v.hukouArr[v.single].isChecked = true;
                         }*/
                        v.hukouSelectType = true;
                    } else {
                        v.maskFn("请求异常，请稍后");
                    }
                }).catch(function (err) {

                });
            },
            /*获取县列表*/
            countrySelect: function () {
                v.hukouArr2 = [];
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    city: v.mainProvince || window.localStorage.getItem("cityID")
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/passport/countyChoice',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        //创建文档对象
                        var parser = new DOMParser();
                        var xmlDoc = parser.parseFromString(res.data.responseBody.data, "text/xml");//提取数据
                        var countrys = xmlDoc.getElementsByTagName('row');
                        for (var i = 0; i < countrys.length; i++) {
                            var list = {};
                            list["name"] = countrys[i].getAttribute("DIC_TEXT");
                            list["id"] = countrys[i].getAttribute("DIC_CODE");
                            list["isChecked"] = false;
                            v.hukouArr2.push(list);
                        }
                        v.hukouSelectType = true;
                    } else {
                        v.maskFn("请求异常，请稍后");
                    }
                }).catch(function (err) {

                });
            },
            hukouActiveSelect3: function (index, ele) {//户口所在地 优化
                v.single = index;
                var hukouLi = document.getElementsByName("hukou");
                if (ele == "province") {
                    for (var i = 0; i < v.hukouArr3.length; i++) {
                        v.hukouArr3[i].isChecked = false;
                    }
                    v.hukouArr3[index] = Object.assign({}, v.hukouArr3[index], {isChecked: 'true'});
                    this.$set(v.hukouArr3, index, v.hukouArr3[index]);
                    v.provinceName = hukouLi[index].innerText;
                    v.mainCity = hukouLi[index].getAttribute("main-data");
                    var countryList = document.getElementsByClassName("cancelTitle");
                    countryList[1].classList.add('colorBlue');
                    countryList[0].classList.remove('colorBlue');
                    v.province = false;
                    v.country = false;
                    v.city = true;
                    v.citySelect1();
                } else if (ele == "city") {
                    v.hukouType = hukouLi[index].innerText;
                    v.mainProvince = hukouLi[index].getAttribute("main-data");
                    var countryList = document.getElementsByClassName("cancelTitle");
                    if (countryList[2]) {
                        countryList[2].classList.add('colorBlue');
                        countryList[1].classList.remove('colorBlue');
                    } else {
                        countryList[1].classList.add('colorBlue');
                    }
                    v.province = false;
                    v.country = true;
                    v.city = false;
                    for (var i = 0; i < v.hukouArr.length; i++) {
                        v.hukouArr[i].isChecked = false;
                    }
                    v.hukouArr[index] = Object.assign({}, v.hukouArr[index], {isChecked: 'true'});
                    this.$set(v.hukouArr, index, v.hukouArr[index]);

                    if (v.mainCity == "11" || v.mainCity == "12") {
                        v.province = false;
                        v.country = false;
                        v.city = true;
                        v.citySelect1();
                        return;
                    }
                    v.countrySelect();
                } else if (ele == "country") {
                    for (var i = 0; i < v.hukouArr2.length; i++) {
                        v.hukouArr2[i].isChecked = false;
                    }
                    v.hukouType2 = hukouLi[index].innerText;
                    v.hukouTypeID2 = hukouLi[index].getAttribute("data_id");
                    v.hukouArr2[index] = Object.assign({}, v.hukouArr2[index], {isChecked: 'true'});
                    this.$set(v.hukouArr2, index, v.hukouArr2[index]);
                }

            },
            /*            hukouActiveSelect2:function(index){
             v.single2 = index
             var hukouLi =document.getElementsByName("hukou");
             for (let i = 0; i < v.hukouArr2.length; i++) {
             v.hukouArr2[i].isChecked= false;
             }
             v.hukouArr2[index] = Object.assign({}, v.hukouArr2[index], {isChecked:'true'});
             this.$set(v.hukouArr2,index,v.hukouArr2[index]);
             //v.hukouDz = hukouLi[index].innerText;

             v.hukouType2 = hukouLi[index].innerText;
             v.hukouTypeID2 = hukouLi[index].getAttribute("data_id");

             },*/
            hukouSelectClose: function () {
                if (v.hukouType2 == "请选择" || v.mainCity == "11" || v.mainCity == "12") {
                    v.hukouDz = v.provinceName + v.hukouType;
                } else {
                    v.hukouDz = v.provinceName + v.hukouType + v.hukouType2;
                }

                v.hukouSelectType = false;
            },
            activeSelect: function (index) {
                var hukouLi = document.getElementsByName("box");
                for (var i = 0; i < hukouLi.length; i++) {
                    hukouLi[i].classList.remove("active");
                }
                v.brithDz = hukouLi[index].innerText;
                v.brithDzId = hukouLi[index].getAttribute("data_id");
                v.hukouSelect = false;
                hukouLi[index].classList.add("active");
            },
            phoneBlur: function () {//联系电话
                if (v.phone == "") {
                    return
                }
            },
            colorBlue: function (index) {
                v.hukouArr = [];
                v.hukouArr2 = [];
                v.hukouArr3 = [];
                v.cityShow = false;
                if (v.personType) {
                    var guoWY = document.getElementsByClassName("cancelTitle");
                    for (var j = 0; j < guoWY.length; j++) {
                        guoWY[j].classList.remove("colorBlue");
                    }
                    guoWY[index].classList.add('colorBlue');
                    if (document.getElementById("huJiTrigger").getAttribute("data_id") == "snfbd") {
                        guoWY[0].classList.remove('colorBlue');
                        v.provinceShow = false;
                        v.cityShow = true;
                        if (index == 1) {
                            v.province = false;
                            v.country = false;
                            v.city = true;
                            v.citySelect1();
                        } else if (index == 2) {
                            v.province = false;
                            v.country = true;
                            v.city = false;
                            v.countrySelect();
                        } else if (index == 0) {
                            guoWY[1].classList.add('colorBlue');
                            v.cityShow = true;
                            v.province = false;
                            v.country = false;
                            v.city = true;
                            v.provinceShow = false;
                            v.citySelect1();
                            return;
                        }
                        return;
                    }
                    ;
                    if (index == 0) {
                        v.provinceSelect();
                        v.province = true;
                        v.country = false;
                        v.city = false;
                    } else if (index == 1) {
                        v.province = false;
                        v.country = false;
                        v.city = true;
                        v.citySelect1();
                    } else if (index == 2) {
                        v.province = false;
                        v.country = true;
                        v.city = false;
                        v.countrySelect();
                    }
                } else {
                    v.countrySelect();
                }
            },
            country: function () {
                v.hukouArr2 = [];
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x ,localFrom:localFrom,
                    local_y: local_y,
                    city: v.mainProvince
                };
                axios({
                    headers: {"Content-Type": "application/json"},
                    method: 'post',
                    url: '/passport/countyChoice',
                    data: data,
                    contentType: 'application/json'
                }).then(function (res) {
                    if (res.data.retCode == "000000") {
                        //创建文档对象
                        var parser = new DOMParser();
                        var xmlDoc = parser.parseFromString(res.data.responseBody.data, "text/xml");//提取数据
                        var countrys = xmlDoc.getElementsByTagName('row');
                        for (var i = 0; i < countrys.length; i++) {
                            var list = {};
                            list["name"] = countrys[i].getAttribute("DIC_TEXT");
                            list["id"] = countrys[i].getAttribute("DIC_CODE");
                            list["isChecked"] = false;
                            v.hukouArr2.push(list);
                        }
                        v.hukouSelectType = true;
                    } else {
                        v.maskFn("请求异常，请稍后");
                    }
                }).catch(function (err) {

                });
            },
            /*市选择*/
            citySelect: function () {
                if (v.mainProvince == "") {
                    return
                }
                ;
                v.$options.methods.country();
            },
            birthdateSelect: function () {
                var selectedDate = {};
                var currYear = (new Date()).getFullYear();
                var opt = {};
                opt.date = {preset: 'date'};
                opt.datetime = {preset: 'datetime'};
                opt.time = {preset: 'time'};
                opt.default = {
                    theme: 'android-ics light', //皮肤样式
                    display: 'modal', //显示方式
                    mode: 'scroller', //日期选择模式
                    dateFormat: 'yyyy-mm-dd',
                    lang: 'zh',
                    showNow: true,
                    nowText: "今天",
                    startYear: currYear - 50, //开始年份
                    endYear: currYear, //结束年份
                    onBeforeShow: function (inst) {//展示前的事件
                        document.activeElement.blur()
                    },
                    onSelect: function (valueText, inst) {//选择时事件（点击确定后），valueText 为选择的时间，
                        v.birthdate = valueText;
                    }
                };

                $("#appDates").click(function () {
                    $("#appDate").mobiscroll("show");
                });
                $("#appDate").mobiscroll($.extend(opt['date'], opt['default']));
                var optDateTime = $.extend(opt['datetime'], opt['default']);
                var optTime = $.extend(opt['time'], opt['default']);
            },
            NamePingYing(namePingYing, id) {
                var weekdayArr = [
                    {"id": "0", "name": namePingYing},
                    {"id": "1", "name": "?"}
                ]
                if (document.getElementsByClassName('mobileSelect')[0]) {
                    document.getElementsByClassName('mobileSelect')[0].remove();
                }
                var mobileSelect1 = new MobileSelect({
                    trigger: '#' + id,
                    title: '请选择',
                    wheels: [
                        {data: weekdayArr}
                    ],
                    callback: function () {

                    }
                });
                document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect", "mobileSelect-show");
            }


        },
        created: function () {
        },
        computed: function () {
//            isCheckAll () {
//                if (this.contentList.length) {
//                    return this.getCheckedSum && this.getCheckedSum === this.contentList.length;
//                } else {
//                    return false
//                }
//            }
        },
        mounted: function () {
            this.provinceName = window.localStorage.getItem("provinceName");
            var cityID = window.localStorage.getItem("cityID");
            var cityCon = window.localStorage.getItem("cityCon");
            this.SLDWDZ = window.localStorage.getItem("SLDWDZ");
            this.time = window.localStorage.getItem("WSYYRQ") + " " + window.localStorage.getItem("WSYYSJ");
            this.mainProvince = cityID;
            this.hukouType = cityCon;
            this.defaultPing = true;
            this.defaultNamePing = true;
            this.masktime = "";
            this.hukouArr = [];
            this.hukouArr2 = [];
            this.hukouArr3 = [];
            this.brithDz = "请选择"
            this.fnSize();
            window.addEventListener('resize', this.fnSize, false);
            /*if (citySRC) {
                this.$refs.cityImg.src = citySRC;
            } else {
                this.$refs.cityImg.src = "/images/passport/hN-banner.png";
            }*/
            this.zwzf = window.localStorage.getItem("ZWX");
            this.zwzfName = window.localStorage.getItem("ZWM");
            this.card = window.localStorage.getItem("SFZH");
            this.phone = window.localStorage.getItem("LXDH");
            this.urgentContacts = window.localStorage.getItem("urgentContacts");
            this.urgentPhone = window.localStorage.getItem("urgentPhone");
            this.brithDz = window.localStorage.getItem("CSD_sv");
            this.brithDzId = window.localStorage.getItem("CSD");
            this.hukouDz = window.localStorage.getItem("HKSZDDZ");
            this.hukouTypeID2 = window.localStorage.getItem("HKSZD");
            document.getElementById("nationTrigger").setAttribute("data_id", window.localStorage.getItem("MZ"));
            document.getElementById("nationTrigger").textContent = window.localStorage.getItem("MZ_sv");
            this.zwzf ? this.loseFocus(this) : "";
            this.zwzfName ? this.nameBlur() : "";
            this.card ? this.cardBlur() : "";
        }
    }
)

