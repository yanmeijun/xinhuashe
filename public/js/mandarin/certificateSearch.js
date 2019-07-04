var v = new Vue({
    data: {
        noDate: "false",//查询无数据时的显示
        placeholder: "",
        placeholdtip: "",
        placehold: "",
        masktime: "",
        srcImg: "../../images/code.png",
        errorImg: "",
        dialogMask: false
    },
    mounted: function () {
        window.addEventListener('resize', this.fnSize, false);
        this.veriCodeImage();//获取验证码
        this.dialogMask = "";
        if(localFrom == "xinhuashe_app"){
            this.getInputInfo();
        }
    },
    methods: {
        //获取回填信息
        getInputInfo: function(){
            var parameters = {
                clientID: clientID,
                serviceID: "CAG0001"
            }
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: "/userLoginInfo/getUserInfo",
                data: JSON.stringify(parameters),
                contentType: 'application/json'
            }).then(function (res) {
                v.placeholder = res.data.certID;
                v.placeholdtip = res.data.idCard;
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
        getDate: function () {
            v.noDate = false;
            v.errorImg = "";
            var placeholder = this.placeholder;//证书编号
            var placeholdtip = this.placeholdtip;//身份证号
            var placehold = this.placehold;//验证码
            var re = /[`~!@#$%^&*_+<>{}\/'[\]]/im;//匹配特殊字符
            if (!placeholder) {
                v.maskFn("请输入你的证书编号");
                return;
            } else if (re.test(placeholder)) {
                v.maskFn("证书编号格式错误");
                return;
            } else if (placeholder.indexOf(" ") != -1) {
                v.maskFn("证书编号存在空格");
                return;
            }
            ;
            if (!placeholdtip) {
                v.maskFn("请输入你的身份证号");
                return;
            } else if (re.test(placeholdtip)) {
                v.maskFn("身份证号格式错误");
                return;
            } else if (placeholdtip.indexOf(" ") != -1) {
                v.maskFn("身份证号存在空格");
                return;
            }
            ;
            if (!placehold) {
                v.maskFn("请输入验证码");
                return;
            }
            ;
            v.dialogMask = true;
            var parameters = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y,
                vCode: this.placehold,//验证码
                certID: this.placeholder,//证书编号
                idCard: this.placeholdtip//身份证号
            }
            axios({
                headers: {"Content-Type": "application/json"},
                method: 'post',
                url: '/mandarin/mandarinCertificate',
                data: JSON.stringify(parameters),
                contentType: 'application/json'
            }).then(function (res) {
                v.dialogMask = false;
                if (res.data.retCode == "000000") {
                    var stringify = JSON.stringify(res.data.responseBody)//将对象"序列化"为JSON数据(字符串格式)
                    localStorage.setItem("certificate", stringify);
                    window.location.href = "/mandarin?page=certificateResults&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                        + "&cityName=" + cityName + "&citySRC=" + citySRC + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;

                } else {
                    if (res.data.responseBody.errorCode == "100001" || res.data.responseBody.errorCode == "100007") {
                        v.noDate = true;
                        v.errorImg = res.data.responseBody.errorMsg;
                        return;
                    }
                    ;
                    v.noDate = true;
                    v.errorImg = "没有查询到相关信息";
                    return;
                }
                ;
            }).catch(function (err) {
                console.log(err)
            })
        },
        veriCodeImage: function () {
            //veriCodeImage
            //this.srcImg="/image?randomKey="+randomKey+"&action=mandarin&random=random"+new Date().getTime();
            var parameters = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y
            }
            axios({
                headers: {"Content-Type": "application/json"},
                method: 'post',
                url: '/mandarin/veriCodeImage',
                data: JSON.stringify(parameters),
                contentType: 'application/json'
            }).then(function (res) {
                v.srcImg = res.data;
            }).catch(function (err) {
                console.log(err)
            })
        },
        back: function () {
            var url = "/mandarin?page=mandarin&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
            window.location.href = url;
        },

    }
}).$mount('#app')