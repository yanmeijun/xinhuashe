var v = new Vue({
    el: '#max',
    data: {
        masktime: "",//提示语
        placeholder: "",//请输入姓名
        placehold: "",//请输入准考证号
        placeholdidentity: "",//请输入身份证号
        noDate: "false",
        errorImg: "",
        falgMask: false,
        dialogMask: false
    },
    mounted: function () {
        this.dialogMask = false;
        window.addEventListener('resize', this.fnSize, false);
        if(localFrom == "xinhuashe_app"){
            this.getInputInfo();
        }
    },
    methods: {
        //获取回填信息
        getInputInfo: function(){
            var parameters = {
                clientID: clientID,
                serviceID: "CAF0001"
            }
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: "/userLoginInfo/getUserInfo",
                data: JSON.stringify(parameters),
                contentType: 'application/json'
            }).then(function (res) {
                v.placehold = res.data.stuID;
                v.placeholder = res.data.name;
                v.placeholdidentity = res.data.idCard;
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
            this.noDate = false;
            this.errorImg = "";
            this.falgMask = false;
            var placeholder = this.placeholder//请输入姓名
            var placehold = this.placehold//请输入准考证号
            var placeholdidentity = this.placeholdidentity//请输入身份证号
            var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
                regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
            if (!placeholder && !placehold) {
                this.falgMask = true
                this.maskFn("至少输入你姓名、准考证号、身份证号中的任意两项");
                return;
            }
            ;
            if (!placehold && !placeholdidentity) {
                this.falgMask = true
                this.maskFn("至少输入你姓名、准考证号、身份证号中的任意两项");
                return;
            }
            ;
            if (!placeholder && !placeholdidentity) {
                this.falgMask = true
                this.maskFn("至少输入你姓名、准考证号、身份证号中的任意两项");
                return;
            }
            ;
            if (placehold) {
                if (placehold.indexOf(" ") != -1) {
                    this.falgMask = false;
                    this.maskFn("准考证号中间有空格");
                    return;
                } else if (regEn.test(placehold) || regCn.test(placehold)) {
                    this.falgMask = false;
                    this.maskFn("准考证号格式错误");
                    return;
                }
            }
            if (placeholdidentity) {
                if (placeholdidentity.indexOf(" ") != -1) {
                    this.falgMask = false;
                    this.maskFn("身份证号中间有空格");
                    return;
                } else if (regEn.test(placeholdidentity) || regCn.test(placeholdidentity)) {
                    this.falgMask = false;
                    this.maskFn("身份证号格式错误");
                    return;
                }
            }
            ;
            this.dialogMask = true;
            var parameters = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y,
                stuID: this.placehold,//准考证号
                name: this.placeholder,//姓名
                idCard: this.placeholdidentity//身份证号
            }
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: "/mandarin/mandarinGrades",
                data: JSON.stringify(parameters),
                contentType: 'application/json'
            }).then(function (res) {
                v.dialogMask = false;//000011
                if (res.data.retCode == "000000") {
                    if (res.data.responseBody.datail) {
                        v.noDate = true;
                        v.errorImg = "对不起没有查询到相关信息。";
                        return;
                    }
                    var stringify = JSON.stringify(res.data.responseBody)//将对象"序列化"为JSON数据(字符串格式)
                    localStorage.setItem("certificates", stringify);
                    window.location.href = "/mandarin?page=examinationResults&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                        + "&cityName=" + cityName + "&citySRC=" + citySRC + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                } else {
                    v.noDate = true;
                    // this.errorImg=res.data.responseBody.data;
                    v.errorImg = "没有查询到相关信息";
                    return;
                }
            }).catch(function (err) {
                console.log(err)
            })
        },
        back: function () {
            window.location.href = "/mandarin?page=mandarin&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                + "&cityName=" + cityName + "&citySRC=" + citySRC + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        },
    }
});