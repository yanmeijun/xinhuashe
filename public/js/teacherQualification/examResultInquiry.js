var v = new Vue({
    data: {
        citySRC: citySRC,
        masktime: "",
        veriCode: "",//验证码
        idcard: "",//证件号
        name: "",//姓名
        srcImg: "/images/yanzm.gif",
        errorImg: "",//无数据
        noDate: false//查询无数据时的显示
    },
    mounted: function () {
        this.veriCodeImage();
        // if(localFrom == "xinhuashe_app"){
        //     this.getInputInfo();
        // }
    },
    methods: {
        //获取回填信息
        getInputInfo: function(){
            var parameters = {
                clientID: clientID,
                serviceID: "CAI0001"
            }
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: "/userLoginInfo/getUserInfo",
                data: JSON.stringify(parameters),
                contentType: 'application/json'
            }).then(function (res) {
                v.name = res.data.name;
                v.idcard = res.data.zjhm;
            }).catch(function (err) {
                console.log(err)
            })
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
        search: function () {
            var name = this.name;//姓名
            var idcard = this.idcard;//证件号
            var veriCode = this.veriCode;//验证码
            var re = /^[\\u4e00-\\u9fa5]+[·?][\\u4e00-\\u9fa5]+$/;
            var res = /[\\u4e00-\\u9fa5]+/g;
            if (!name) {
                this.maskFn("请输入姓名");
                return;
            }
            if (!idcard) {
                this.maskFn("请输入证件号");
                return;
            } else if (idcard.indexOf(" ") != -1) {
                this.maskFn("证件号中间有空格");
                return;
            } else if (!this.qhcheckString(idcard)) {
                this.maskFn("证件号格式错误");
                return;
            }
            if (!veriCode) {
                this.maskFn("请输入验证码");
                return;
            }
            ;
            this.noDate = false;
            this.errorIm = "";
            this.getDate();
        },
        qhcheckString: function (str) {
            for (var i = 0; i < str.length; i++) {
                var t = true;
                switch (str.charAt(i)) {
                    case '<' :
                        t = false;
                        break;
                    case '>' :
                        t = false;
                        break;
                    case '"' :
                        t = false;
                        break;
                    case '\'' :
                        t = false;
                        break;
                    case '\\' :
                        t = false;
                        break;
                    case '/' :
                        t = false;
                        break;
                    case '%' :
                        t = false;
                        break;
                    case ';' :
                        t = false;
                        break;
                    case '(' :
                        t = false;
                        break;
                    case ')' :
                        t = false;
                        break;
                    case '&' :
                        t = false;
                        break;
                    case '+' :
                        t = false;
                        break;
                }
                if (t == false) {
                    return t;
                }
            }
            return true;
        },
        getDate: function () {
            var parameters = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y,
                username: this.name,//用户名
                zjhm: this.idcard,//证件号码
                verifycode: this.veriCode//验证码
            };
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: "/teacherQualification/scoreSearch",
                data: JSON.stringify(parameters),
                contentType: 'application/json'
            }).then(function (res) {
                if (res.data.retCode == "000000") {
                    v.noDate = false;
                    var stringify = JSON.stringify(res.data.responseBody)//将对象"序列化"为JSON数据(字符串格式)
                    localStorage.setItem("Results", stringify);
                    window.location.href = "/teacherQualification?page=certificateResults&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                        + "&cityName=" + cityName + "&citySRC=" + citySRC + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                } else {
                    if (res.data.responseBody.data) {
                        v.noDate = true;
                        v.errorImg = "证件号或姓名错误，请输入正确信息";
                        return;
                    }
                    v.noDate = true;
                    v.errorImg = res.data.responseBody.errorMsg;
                    return;
                }
            }).catch(function (err) {
                console.log(err)
            })
        },
        veriCodeImage: function () {//获取验证码
            this.srcImg="/images/yanzm.gif";
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
                method: "post",
                url: "/teacherQualification/getVertication",
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then(function (res) {
                v.srcImg = res.data;
            }).catch(function (err) {
                this.maskFn("网络异常")
            });
            //this.srcImg="/image?action=teacherScore&randomKey="+randomKey+"&"+new Date().getTime();
        },
        back: function () {//返回按钮
            var url = "/teacherQualification?page=teacherQualification&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
            window.location.href = url;
        }
    }
}).$mount("#max");