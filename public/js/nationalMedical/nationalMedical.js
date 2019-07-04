var v = new Vue({
    data: {
        masktime: "",//提示语
        noDate: false,
        errorImg: "",//无数据
        hospitalName: "",//医疗机构名称
        prov: "",//请输入所在的省份
        VeryCode: "",//验证码
        srcImg: "/images/yanzm.gif",
        dialogMask: false
    },
    mounted: function () {
        this.getVeryCode(this);
    },
    methods: {
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
            var hours = (new Date()).getHours();
            if (hours >= 21 || hours <= 6) {
                var url = "/nationalMedical?page=systemMaintenance&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                window.location.href = url;
                return;
            }
            this.noDate = false;
            this.errorIm = "";
            var reg = /^[\u4e00-\u9fa5]{4,20}$/;
            var provId = document.getElementById("cityTrigger").getAttribute("data_id");
            var name = this.hospitalName,
                VeryCode = this.VeryCode;
            if (provId) {
                this.prov = provId;
            }
            ;
            if (!this.prov) {
                this.maskFn("请输入所在的省份");
                return;
            }
            ;
            if (!name) {
                this.maskFn("请输入医疗机构名称");
                return;
            } else if (!reg.test(this.hospitalName)) {
                this.maskFn("至少输入4到20个字");
                return;
            }
            ;
            if (!VeryCode) {
                this.maskFn("请输入验证码");
                return;
            }
            ;
            this.dialogMask = true;
            this.getDate();
        },
        getDate: function () {
            var parameters = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y,
                Prov: this.prov,//省份
                Unit_Name: this.hospitalName,//医疗机构名称
                Check_Code: this.VeryCode//验证码
            };
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: "/nationalMedical/nationalMedicalSearch",
                data: JSON.stringify(parameters),
                contentType: 'application/json'
            }).then(function (res) {
                v.dialogMask = false;
//                if(res.data.responseBody.data.indexOf("202")!=-1){
//                    v.dialogMask=false;
//                    v.noDate=false;
//                    v.maskFn("网络异常，请稍后");
//                    return;
//                }
                if (res.data.retCode == "000000") {
                    v.dialogMask = false;
                    v.noDate = false;
                    if (res.data.responseBody.list != null && res.data.responseBody.list.length != 0) {
                        if (res.data.responseBody.list == "未查询到符合条件的医疗机构") {
                            v.noDate = true;
                            v.errorImg = res.data.responseBody.list;
                            return;
                        }
                        v.noDate = false;
                        var stringify = JSON.stringify(res.data.responseBody.list)//将对象"序列化"为JSON数据(字符串格式)
                        localStorage.setItem("hosResults", stringify);
                        var url = "/nationalMedical?page=queryResults&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                        window.location.href = url;
                    } else {
                        v.dialogMask = false;
                        v.maskFn("网络异常，请稍后");
                        return;
                    }
                } else if (res.data.retCode == "000016") {
                    v.dialogMask = false;
                    v.maskFn("网络异常，请稍后");
                    return;
                } else {
                    v.getVeryCode(v);
                    v.dialogMask = false;
                    v.noDate = true;
                    v.errorImg = res.data.responseBody.errorMsg;
                    return;
                }
                ;
            }).catch(function (err) {
                console.log(err)
            })
        },
        /*
         *获取验证码
         */
        getVeryCode: function (a) {
            v = a || v;
            var parameters = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y
            };
            v.srcImg = "/images/yanzm.gif";
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: "/nationalMedical/getVeryCode",
                data: JSON.stringify(parameters),
                contentType: 'application/json'
            }).then(function (res) {
                if (res.data.retCode == "000000") {
                    v.srcImg = res.data.responseBody.data
                } else {
                    v.srcImg = "/images/yanzm.gif";
                    return;
                }
            }).catch(function (err) {
                console.log(err)
            })
        },
        city: function () {
            /*
             *选择省份
             */
            var weekdayArr = [
                {"id": "11", "name": "北京市"},
                {"id": "12", "name": "天津市"},
                {"id": "13", "name": "河北省"},
                {"id": "14", "name": "山西省"},
                {"id": "15", "name": "内蒙古自治区"},
                {"id": "21", "name": "辽宁省"},
                {"id": "22", "name": "吉林省"},
                {"id": "23", "name": "黑龙江省"},
                {"id": "31", "name": "上海市"},
                {"id": "32", "name": "江苏省"},
                {"id": "33", "name": "浙江省"},
                {"id": "34", "name": "安徽省"},
                {"id": "35", "name": "福建省"},
                {"id": "36", "name": "江西省"},
                {"id": "37", "name": "山东省"},
                {"id": "41", "name": "河南省"},
                {"id": "42", "name": "湖北省"},
                {"id": "43", "name": "湖南省"},
                {"id": "44", "name": "广东省"},
                {"id": "45", "name": "广西壮族自治区"},
                {"id": "46", "name": "海南省"},
                {"id": "50", "name": "重庆市"},
                {"id": "51", "name": "四川省"},
                {"id": "52", "name": "贵州省"},
                {"id": "53", "name": "云南省"},
                {"id": "54", "name": "西藏自治区"},
                {"id": "61", "name": "陕西省"},
                {"id": "62", "name": "甘肃省"},
                {"id": "63", "name": "青海省"},
                {"id": "64", "name": "宁夏回族自治区"},
                {"id": "65", "name": "新疆维吾尔自治区"}
            ];
            if (document.getElementsByClassName('mobileSelect')[0]) {
                document.getElementsByClassName('mobileSelect')[0].remove();
            }
            var mobileSelect1 = new MobileSelect({
                trigger: '#cityTrigger',
                title: '请选择省份',
                wheels: [
                    {data: weekdayArr}
                ],
                callback: function () {
                    this.prov = document.getElementById("cityTrigger").getAttribute("data_id");
                    document.getElementById("cityTrigger").style.color="#474747";
                    document.getElementsByTagName("html")[0].style.height="100%";
                }
            });
            document.getElementsByTagName("html")[0].style.height="106%";
            document.documentElement.scrollTop = 10;
            document.body.scrollTop = 10;
            document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect", "mobileSelect-show");
        }
    }
}).$mount("#app")