$(function () {
    /*$("#province").on("click", function () {
        $(".mobileSelect").remove();
        var weekdayArr = [
            {id: "110000", name: "北京市"},
            {id: "120000", name: "天津市"},
            {id: "130000", name: "河北省"},
            {id: "140000", name: "山西省"},
            {id: "150000", name: "内蒙古自治区"},
            {id: "210000", name: "辽宁省"},
            {id: "220000", name: "吉林省"},
            {id: "230000", name: "黑龙江省"},
            {id: "310000", name: "上海市"},
            {id: "320000", name: "江苏省"},
            {id: "330000", name: "浙江省"},
            {id: "340000", name: "安徽省"},
            {id: "350000", name: "福建省"},
            {id: "360000", name: "江西省"},
            {id: "370000", name: "山东省"},
            {id: "410000", name: "河南省"},
            {id: "420000", name: "湖北省"},
            {id: "430000", name: "湖南省"},
            {id: "440000", name: "广东省"},
            {id: "450000", name: "广西壮族自治区"},
            {id: "460000", name: "海南省"},
            {id: "500000", name: "重庆市"},
            {id: "510000", name: "四川省"},
            {id: "520000", name: "贵州省"},
            {id: "530000", name: "云南省"},
            {id: "540000", name: "西藏自治区"},
            {id: "610000", name: "陕西省"},
            {id: "620000", name: "甘肃省"},
            {id: "630000", name: "青海省"},
            {id: "640000", name: "宁夏回族自治区"},
            {id: "650000", name: "新疆维吾尔自治区"}
        ];
        var mobileSelect1 = new MobileSelect({
            trigger: '#provinceTrigger',
            title: '选择省份',
            wheels: [
                {data: weekdayArr}
            ],
			callback: function () {
			  $('#provinceTrigger').css("color","#474747")
			}
        })
        $(".mobileSelect").addClass("mobileSelect-show");
    });
    $("#city").on("click", function () {
        $(".mobileSelect").remove();
        var provinceId = $("#provinceTrigger").attr("data_id");
        if (!provinceId) {
            return;
        }
        var data = {
            parentcode: provinceId,
            taskId: "3",
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/administrativeDivisions/getCityOrCounty',
            contentType: 'application/json'
        }).done(function (data) {
            $("#countyTrigger").text("市辖区、县级市、县")
            if (data.retCode == '000000') {
                $(".mobileSelect").remove();
                var list = data.responseBody;
                var weekdayArr = [];
                list.forEach(function (item) {
                    weekdayArr.push({id: item.code, name: item.name})
                })
                var mobileSelect1 = new MobileSelect({
                    trigger: '#cityTrigger',
                    title: '选择城市',
                    wheels: [
                        {data: weekdayArr}
                    ],
					callback: function () {
					  $('#cityTrigger').css("color","#474747")
					}
                })
                $(".mobileSelect").addClass("mobileSelect-show");
            }
        })
    });
    $("#county").on("click", function () {
        $(".mobileSelect").remove();
        var cityId = $("#cityTrigger").attr("data_id");
        if (!cityId) {
            return;
        }
        var data = {
            parentcode: cityId,
            taskId: "4",
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/administrativeDivisions/getCityOrCounty',
            contentType: 'application/json'
        }).done(function (data) {
            if (data.retCode == '000000') {
                $(".mobileSelect").remove();
                var list = data.responseBody;
                var weekdayArr = [];
                list.forEach(function (item) {
                    weekdayArr.push({id: item.code, name: item.name})
                })
                var mobileSelect1 = new MobileSelect({
                    trigger: '#countyTrigger',
                    title: '选择区县',
                    wheels: [
                        {data: weekdayArr}
                    ],
					callback: function () {
					  $('#countyTrigger').css("color","#474747")
					}
                })
                $(".mobileSelect").addClass("mobileSelect-show");
            }
        })
    });*/




    $("#province").on("click", function () {
        $(".mobileSelect").remove();
        var weekdayArr = [
            {id: "北京市(京)", name: "北京市(京)"},
            {id: "天津市(津)", name: "天津市(津)"},
            {id: "河北省(冀)", name: "河北省(冀)"},
            {id: "山西省(晋)", name: "山西省(晋)"},
            {id: "内蒙古自治区(内蒙古)", name: "内蒙古自治区(内蒙古)"},
            {id: "辽宁省(辽)", name: "辽宁省(辽)"},
            {id: "吉林省(吉)", name: "吉林省(吉)"},
            {id: "黑龙江省(黑)", name: "黑龙江省(黑)"},
            {id: "上海市(沪)", name: "上海市(沪)"},
            {id: "江苏省(苏)", name: "江苏省(苏)"},
            {id: "浙江省(浙)", name: "浙江省(浙)"},
            {id: "安徽省(皖)", name: "安徽省(皖)"},
            {id: "福建省(闽)", name: "福建省(闽)"},
            {id: "江西省(赣)", name: "江西省(赣)"},
            {id: "山东省(鲁)", name: "山东省(鲁)"},
            {id: "河南省(豫)", name: "河南省(豫)"},
            {id: "湖北省(鄂)", name: "湖北省(鄂)"},
            {id: "湖南省(湘)", name: "湖南省(湘)"},
            {id: "广东省(粤)", name: "广东省(粤)"},
            {id: "广西壮族自治区(桂)", name: "广西壮族自治区(桂)"},
            {id: "海南省(琼)", name: "海南省(琼)"},
            {id: "重庆市(渝)", name: "重庆市(渝)"},
            {id: "四川省(川、蜀)", name: "四川省(川、蜀)"},
            {id: "贵州省(黔、贵)", name: "贵州省(黔、贵)"},
            {id: "云南省(滇、云)", name: "云南省(滇、云)"},
            {id: "西藏自治区(藏)", name: "西藏自治区(藏)"},
            {id: "陕西省(陕、秦)", name: "陕西省(陕、秦)"},
            {id: "甘肃省(甘、陇)", name: "甘肃省(甘、陇)"},
            {id: "青海省(青)", name: "青海省(青)"},
            {id: "宁夏回族自治区(宁)", name: "宁夏回族自治区(宁)"},
            {id: "新疆维吾尔自治区(新)(宁)", name: "新疆维吾尔自治区(新)(宁)"},
            {id: "香港特别行政区(港)(宁)", name: "香港特别行政区(港)(宁)"},
            {id: "澳门特别行政区(澳)(宁)", name: "澳门特别行政区(澳)(宁)"},
            {id: "台湾省(台)", name: "台湾省(台)"}
        ];
        var mobileSelect1 = new MobileSelect({
            trigger: '#provinceTrigger',
            title: '选择省份',
            wheels: [
                {data: weekdayArr}
            ],
            callback: function () {
                $('#provinceTrigger').css("color","#474747");
                $('#cityTrigger').html("地级市、地区、州、盟");
                $('#cityTrigger,#countyTrigger').css("color","#ababae");
                $('#cityTrigger').attr("data_id","-1");
                $('#countyTrigger').html("市辖区、县级市、县");
                $('#countyTrigger').attr("data_id","-1");
            }
        })
        document.documentElement.scrollTop = 10;
        document.body.scrollTop = 10;
        $(".mobileSelect").addClass("mobileSelect-show");
    });
    $("#city").on("click", function () {
        $(".mobileSelect").remove();
        var provinceId = $("#provinceTrigger").attr("data_id");
        if (!provinceId) {
            return;
        }
        var data = {
            taskId: "2",
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,
            localFrom:localFrom,
            local_y: local_y,
            shengji:$("#provinceTrigger").attr("data_id"),
            diji:""
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/administrativeDivisions/getCityOrCounty',
            contentType: 'application/json'
        }).done(function (data) {
            $("#countyTrigger").text("市辖区、县级市、县")
            if (data.retCode == '000000') {
                $(".mobileSelect").remove();
                var list = data.responseBody;
                var weekdayArr = [];
                list.forEach(function (item) {
                    weekdayArr.push({id: item.diji, name: item.diji})
                })
                var mobileSelect1 = new MobileSelect({
                    trigger: '#cityTrigger',
                    title: '选择城市',
                    wheels: [
                        {data: weekdayArr}
                    ],
                    callback: function () {
                        $('#cityTrigger').css("color","#474747");
                        $('#countyTrigger').html("市辖区、县级市、县");
                        $('#countyTrigger').attr("data_id","-1");
                        $('#countyTrigger').css("color","#ababae")
                    }
                })
                document.documentElement.scrollTop = 10;
                document.body.scrollTop = 10;
                $(".mobileSelect").addClass("mobileSelect-show");
            }
        })
    });
    $("#county").on("click", function () {
        $(".mobileSelect").remove();
        var cityId = $("#cityTrigger").attr("data_id");
        if (!cityId) {
            return;
        }
        var data = {
            taskId: "2",
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,
            localFrom:localFrom,
            local_y: local_y,
            shengji:$("#provinceTrigger").attr("data_id"),
            diji:$("#cityTrigger").attr("data_id")
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/administrativeDivisions/getCityOrCounty',
            contentType: 'application/json'
        }).done(function (data) {
            if (data.retCode == '000000') {
                $(".mobileSelect").remove();
                var list = data.responseBody;
                var weekdayArr = [];
                list.forEach(function (item) {
                    weekdayArr.push({id: item.xianji, name: item.xianji})
                })
                var mobileSelect1 = new MobileSelect({
                    trigger: '#countyTrigger',
                    title: '选择区县',
                    wheels: [
                        {data: weekdayArr}
                    ],
                    callback: function () {
                        $('#countyTrigger').css("color","#474747")
                    }
                })
                document.documentElement.scrollTop = 10;
                document.body.scrollTop = 10;
                $(".mobileSelect").addClass("mobileSelect-show");
            }
        })
    });
})