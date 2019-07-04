var v = new Vue({
    /* 给Vue实例初始	*/
    data: {
        errormgs: "",//查询时错误信息
        isShow: "false",
        placeholder: '',//申请编码
        cityID: "", //判断是非否为贵州
        Correctcode: "",//查询时正确申请码
        Correctmgs: "",//正确信息
        cityName: "",
        GzCorrectcode: [],
        select: false,
        selectes: true,
        GzShow: "false",
        cityName: "",
        citymessage: "",
        masktime: "", //请选择地区
        masktimeFalse: "false",
        dialogMask: false,
        gzNo:true
    },
    mounted: function () {
        this.getcitySRC();//加载时执行
        this.dialogMask = false;
        this.cityName = cityName;

        this.gzNo = true;
        if (this.cityName == '北京市') {
            this.citymessage = "北京市小客车指标调控管理系统";
        } else if (this.cityName == '天津市') {
            this.citymessage = "天津市小客车调控管理信息系统";
        } else if (this.cityName == '杭州市') {
            this.citymessage = "杭州市小客车总量调控管理信息系统";
        } else if (this.cityName == '深圳市') {
            this.citymessage = "深圳市小客车总量调控管理信息系统";
        } else if (this.cityName == '贵阳市') {
            this.gzNo = false;
            this.citymessage = "贵阳市小客车专段号牌管理信息系统";
        } else if (this.cityName == '广州市') {
            this.citymessage = "广州市中小客车指标调控管理信息系统";
        }
        ;
    },
    methods: {
        getcitySRC: function () {
            var that = this;
            that.cityName = cityName;
            that.cityID = cityID;
        },
        selected: function () {
            // e.target 是你当前点击的元素
            // e.currentTarget 是你绑定事件的元素
            return this.select = this.select == true ? this.select = false : this.select = true;
        },
        selecte: function () {
            return this.selectes = this.selectes == true ? this.selectes = false : this.selectes = true;
        },
        focus: function () {
            this.placeholder = "";
        },
        /*
         *输入不正确的查询语句提示语
         */
        maskFn: function (mgs) {
            this.masktime = mgs;
            setTimeout(function () {
                v.masktime = "";
            }, 1500);
            return;

        },
        //点击查询时执行
        getQuery: function () {
            this.GzCorrectcode = [];//情况数据
            this.Correctmgs = "";
            this.errormgs = "";
            this.Correctcode = "";
            this.GzShow = false;
            var placeval = this.placeholder.trim();
            var placename = this.cityName.substr(0, this.cityName.length - 1);//截取地区的最后一个字节
            if (!placeval) {
                this.maskFn("请输入申请编号");
                return;
            }
            var re = /[`~!@#$%^&*_+<>{}\/'[\]]/im;
            if (re.test(placeval)) {
                this.maskFn("存在特殊字符,请输入数字");
                return;
            }
            if (placeval.match(/[\u4e00-\u9fa5]+/g)) {
                this.maskFn("请输入数字");
                this.GzShow = false;
            } else {
                if (this.cityID == '520100') {//贵阳
                    v.dialogMask = true;
                    var data = {
                        randomKey: randomKey,
                        userID: userID,
                        clientID: clientID,
                        cityID: cityID,
                        local_x: local_x ,localFrom:localFrom,
                        local_y: local_y,
                        id: placeval,
                        isGZ: true,
                        place: placename
                    };
                    axios({
                        headers: {"Content-Type": "application/json"},
                        method: 'post',
                        url: '/car/findShakeNum',
                        data: JSON.stringify(data),
                        async: true,
                        contentType: 'application/json'
                    }).then(function (res) {
                        v.dialogMask = false;
                        if (res.data.retCode == '000000' && res.data.responseBody.data) {
                            if (v.select == false && v.selectes == false) {
                                v.masktime = "请选择查询地区"
                                v.masktimeFalse = true
                                setTimeout(function () {
                                    v.masktimeFalse = false;
                                }, 1500);
                                v.GzShow = false;
                                return
                            } else {
                                if (v.selectes) {
                                    v.dialogMask = "";
                                    if (res.data.responseBody.data[0].area == "贵阳") {
                                        v.GzCorrectcode.push(res.data.responseBody.data[0]);     //数据追加到贵州容器内
                                        v.GzShow = true; //贵州区域显示
                                        v.errormgs = '';
                                        return
                                    } else {
                                        v.errormgs = "没有查询到符合条件的记录！";
                                        v.GzShow = false;
                                    }
                                } else if (this.select) {
                                    v.dialogMask = "";
                                    if (res.data.responseBody.data[0].area == "孟关") {
                                        v.GzCorrectcode.push(res.data.responseBody.data[0]);     //数据追加到贵州容器内
                                        v.GzShow = true; //贵州区域显示
                                        v.errormgs = '';
                                        return
                                    } else {
                                        v.errormgs = "没有查询到符合条件的记录！";
                                        v.GzShow = false;
                                        return
                                    }
                                } else {
                                    v.dialogMask = "";
                                    v.errormgs = "没有查询到符合条件的记录！";
                                    v.GzShow = false;
                                }

                                if (this.select && this.selectes) {
                                    v.dialogMask = false;
                                    v.GzCorrectcode.push(res.data.responseBody.data[0]);     //数据追加到贵州容器内
                                    v.GzShow = true; //贵州区域显示
                                    v.errormgs = '';
                                }
                            }
                        } else {
                            v.errormgs = res.data.responseBody.result;
                            v.GzShow = false;
                            v.dialogMask = false;
                        }
                        ;
                    }).catch(function (err) {
                        console.log(err)
                    })
                } else {
                    if (placeval.length != 13) {
                        this.maskFn("请输入正确的申请编号！");
                        return;
                    }
                    v.dialogMask = true;
                    var data = {
                        randomKey: randomKey,
                        userID: userID,
                        clientID: clientID,
                        cityID: cityID,
                        local_x: local_x ,localFrom:localFrom,
                        local_y: local_y,
                        id: placeval,
                        isGZ: false,
                        place: placename
                    };
                    axios({
                        headers: {"Content-Type": "application/json"},
                        method: 'post',
                        url: '/car/findShakeNum',
                        data: JSON.stringify(data),
                        async: true,
                        contentType: 'application/json'
                    }).then(function (res) {
                        v.dialogMask = false;
                        if (res.status == 200) {
                            if (res.data.retCode == '000000') {
                                v.Correctcode = "000000";
                                v.Correctmgs = res.data.responseBody.data;
                            } else {
                                v.errormgs = res.data.rtnMsg;
                            }
                            ;
                        }
                        ;
                    }).catch(function (err) {
                        console.log(err)
                    })
                }

            }
        }

    }

}).$mount('#max')