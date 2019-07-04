var maVue = new Vue({
    data: {
        errorImg: "",//无数据
        noDate: false,//查询无数据时的显示
        masktime: "",
        ayear: "",
        aaddress: "",
        searchword: "",
        dialogMask: ""//查询动画
    },

    mounted: function () {
    },
    methods: {
        /*
         *输入不正确的查询语句提示语
         */
        maskFn: function (mgs) {
            maVue.masktime = mgs;
            setTimeout(function () {
                maVue.masktime = "";
            }, 1500);
            return;

        },
        search: function () {
            var re = /^[\\u4e00-\\u9fa5]+[·?][\\u4e00-\\u9fa5]+$/;
            var res = /[\\u4e00-\\u9fa5]+/g;
            maVue.noDate = false;
            maVue.errorIm = "";
            maVue.aaddress = "";
            maVue.ayear = "";
            if (document.getElementById("cityTrigger").getAttribute("data_id")) {
                maVue.aaddress = document.getElementById("cityTrigger").getAttribute("data_id")
            }
            ;
            if (document.getElementById("cityTrigger").getAttribute("data_id") == "地区") {
                maVue.aaddress = "";
            }
            ;
            if (document.getElementById("annualTrigger").getAttribute("data_id")) {
                maVue.ayear = document.getElementById("annualTrigger").getAttribute("data_id");
            }
            ;
            if (document.getElementById("annualTrigger").getAttribute("data_id") == "评定年度") {
                maVue.ayear = ""
            }
            ;
            maVue.dialogMask = true;
            maVue.getDate();
        },
        getDate: function () {
            var parameters = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y,
                searchword2: this.searchword,//用户名
                AADDRESS: this.aaddress,//选择的地区名称
                AYEAR: this.ayear,//验证码
                page: 1
            };
            axios({
                headers: {"Content-Type": "application/json"},
                method: "post",
                url: "/touristAttraction5A/touristAttractionSearch",
                data: JSON.stringify(parameters),
                contentType: 'application/json'
            }).then(function (res) {
                if (res.data.retCode == "000000") {
                    maVue.noDate = false;
                    if (res.data.responseBody.data.length == 2) {
                        maVue.maskFn("请求异常，请稍后");
                        return;
                    }
                    ;
                    maVue.dialogMask = "";//查询动画
                    var stringify = JSON.stringify(res.data.responseBody.data)//将对象"序列化"为JSON数据(字符串格式)
                    localStorage.setItem("Results", stringify);
                    var url = "/touristAttraction5A?page=queryResults&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                    window.location.href = url;
                } else {
                    maVue.dialogMask = "";//查询动画
                    maVue.noDate = true;
                    //this.errorImg=res.data.rtnMsg;
                    return;
                }
                ;
            }).catch(function (err) {
                console.log(err)
            })
        },
        city: function () {
            /*
             *选择景区地区
             */
            var weekdayArr = [
                {"id": "地区", "name": "地区"},
                {"id": "北京", "name": "北京"},
                {"id": "天津", "name": "天津"},
                {"id": "河北", "name": "河北"},
                {"id": "山西", "name": "山西"},
                {"id": "内蒙古", "name": "内蒙古"},
                {"id": "辽宁", "name": "辽宁"},
                {"id": "吉林", "name": "吉林"},
                {"id": "黑龙江", "name": "黑龙江"},
                {"id": "上海", "name": "上海"},
                {"id": "江苏", "name": "江苏"},
                {"id": "浙江", "name": "浙江"},
                {"id": "安徽", "name": "安徽"},
                {"id": "福建", "name": "福建"},
                {"id": "江西", "name": "江西"},
                {"id": "山东", "name": "山东"},
                {"id": "河南", "name": "河南"},
                {"id": "湖北", "name": "湖北"},
                {"id": "湖南", "name": "湖南"},
                {"id": "广东", "name": "广东"},
                {"id": "广西", "name": "广西"},
                {"id": "海南", "name": "海南"},
                {"id": "重庆", "name": "重庆"},
                {"id": "四川", "name": "四川"},
                {"id": "贵州", "name": "贵州"},
                {"id": "云南", "name": "云南"},
                {"id": "西藏", "name": "西藏"},
                {"id": "陕西", "name": "陕西"},
                {"id": "甘肃", "name": "甘肃"},
                {"id": "青海", "name": "青海"},
                {"id": "宁夏", "name": "宁夏"},
                {"id": "新疆", "name": "新疆"}
            ];
            if (document.getElementsByClassName('mobileSelect')[0]) {
                document.getElementsByClassName('mobileSelect')[0].remove();
            }
            var mobileSelect1 = new MobileSelect({
                trigger: '#cityTrigger',
                title: '请选择地区',
                wheels: [
                    {data: weekdayArr}
                ],
                callback: function () {
                    this.aaddress = document.getElementById("cityTrigger").getAttribute("data_id");
                    document.getElementById("cityTrigger").style.color="#474747";
                }
            });
            document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect", "mobileSelect-show");
        },
        annual: function () {
            /*
             *选择景区地区
             */
            var weekdayArr = [
                {"id": "评定年度", "name": "评定年度"},
                {"id": "2017", "name": "2017"},
                {"id": "2016", "name": "2016"},
                {"id": "2015", "name": "2015"},
                {"id": "2014", "name": "2014"},
                {"id": "2013", "name": "2013"},
                {"id": "2012", "name": "2012"},
                {"id": "2011", "name": "2011"},
                {"id": "2010", "name": "2010"},
                {"id": "2007", "name": "2007"}
            ];
            if (document.getElementsByClassName('mobileSelect')[0]) {
                document.getElementsByClassName('mobileSelect')[0].remove();
            }
            var mobileSelect1 = new MobileSelect({
                trigger: '#annualTrigger',
                title: '请选择评价年度',
                wheels: [
                    {data: weekdayArr}
                ],
                callback: function () {
                    this.ayear = document.getElementById("annualTrigger").getAttribute("data_id");
                   document.getElementById("annualTrigger").style.color="#474747";
                }
            });
            document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect", "mobileSelect-show");
        }
    }
}).$mount("#max")
