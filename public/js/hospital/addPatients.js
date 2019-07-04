$(function () {
    // $("#image").attr("src", `/image?action=hospital&randomKey=${randomKey}&${new Date().getTime()}`);
    // $("#image").on("click", () =>{
    //     $("#image").attr("src", `/image?action=hospital&randomKey=${randomKey}&${new Date().getTime()}`);
    // });
    //点击验证码
    var sign = "155725374438";
    $("#image").on("click", function (event) {
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,
            localFrom:localFrom,
            local_y: local_y
        };
        $.ajax({
            async: true,
            url: "/hospital/veriCode",
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (res) {
                $("#image").attr("src", res);
            },
            error: function (xhr, type) {
                console.log('Ajax error!')
            }
        });
        event.preventDefault();
    });
    $("#image").click();
    function getSign(){
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,
            localFrom:localFrom,
            local_y: local_y
        };
        $.ajax({
            async: true,
            url: "/hospital/getSign",
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (res) {
                sign = res.responseBody.data.trim().replace('"',"").replace('"',"");
            },
            error: function (xhr, type) {
                console.log('Ajax error!')
            }
        });
    }
    getSign();
    $("#province,#provinceTrigger").on("click", function () {
        $(".mobileSelect").remove();
        // var weekdayArr = [
        //     {id: "110000", name: "北京市"},
        //     {id: "120000", name: "天津市"},
        //     {id: "130000", name: "河北省"},
        //     {id: "140000", name: "山西省"},
        //     {id: "150000", name: "内蒙古自治区"},
        //     {id: "210000", name: "辽宁省"},
        //     {id: "220000", name: "吉林省"},
        //     {id: "230000", name: "黑龙江省"},
        //     {id: "310000", name: "上海市"},
        //     {id: "320000", name: "江苏省"},
        //     {id: "330000", name: "浙江省"},
        //     {id: "340000", name: "安徽省"},
        //     {id: "350000", name: "福建省"},
        //     {id: "360000", name: "江西省"},
        //     {id: "370000", name: "山东省"},
        //     {id: "410000", name: "河南省"},
        //     {id: "420000", name: "湖北省"},
        //     {id: "430000", name: "湖南省"},
        //     {id: "440000", name: "广东省"},
        //     {id: "450000", name: "广西壮族自治区"},
        //     {id: "460000", name: "海南省"},
        //     {id: "500000", name: "重庆市"},
        //     {id: "510000", name: "四川省"},
        //     {id: "520000", name: "贵州省"},
        //     {id: "530000", name: "云南省"},
        //     {id: "540000", name: "西藏自治区"},
        //     {id: "610000", name: "陕西省"},
        //     {id: "620000", name: "甘肃省"},
        //     {id: "630000", name: "青海省"},
        //     {id: "640000", name: "宁夏回族自治区"},
        //     {id: "650000", name: "新疆维吾尔自治区"}
        // ];



        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,
            localFrom:localFrom,
            local_y: local_y,
            sign: hex_md5(sign)
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/hospital/getPov',
            contentType: 'application/json'
        }).done(function (data) {
            if (data.retCode == '000000') {
                var weekdayArr = data.responseBody.data;
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
            }else{
                maskTip("网络异常");
            }
        })


    });
    $("#city,#cityTrigger").on("click", function () {
        $(".mobileSelect").remove();
        var provinceId = $("#provinceTrigger").attr("data_id");
        if (!provinceId) {
            return;
        };
        var c = hex_md5(sign + provinceId);
        var data = {
            provinceId: provinceId,
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,
            localFrom:localFrom,
            local_y: local_y,
            sign:c
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/hospital/getCity',
            contentType: 'application/json'
        }).done(function (data) {
            $("#countyTrigger").text("区县")
            if (data.retCode == '000000') {
                $(".mobileSelect").remove();
                var weekdayArr = [];
                var list = data.responseBody.list;
                list.forEach(function (item, index) {
                    weekdayArr.push({
                        name: item.name,
                        id: item.cityId
                    })
                });
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
    $("#county,#countyTrigger").on("click", function () {
        $(".mobileSelect").remove();
        var cityId = $("#cityTrigger").attr("data_id");
        if (!cityId) {
            return;
        }
        var citySign = hex_md5(sign + cityId);
        var data = {
            cityId: cityId,
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            sign:citySign
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/hospital/getCounty',
            contentType: 'application/json'
        }).done(function (data) {
            if (data.retCode == '000000') {
                $(".mobileSelect").remove();
                var weekdayArr = [];
                var list = data.responseBody.list;
                list.forEach(function (item, index) {
                    weekdayArr.push({
                        name: item.name,
                        id: item.countryId
                    })
                });
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
    });
    $("#getCode").click(function () {
        if (!$("#name").val()) {
            maskTip("请输入姓名");
            return;
        } else if (!$('#sexBoy picture').hasClass('active') && !$('#sexGirl picture').hasClass('active')) {
            maskTip("性别不能为空");
            return;
        } else if (!$("#idNo").val()) {
            maskTip("请输入身份证号码");
            return;
        } else if (!$("#name").val()) {
            maskTip("请输入姓名");
            return;
        } else if (!$("#phone").val()) {
            maskTip("请输入手机号");
            return;
        }
        if (!$("#countyTrigger").attr("data_id") || !$("#cityTrigger").attr("data_id") || !$("#provinceTrigger").attr("data_id")) {
            maskTip("请选择现居住地");
            return;
        }
        if (!$("#verifycode").val()) {
            maskTip("请输入图片验证码");
            return;
        }
        if (wait == 60) {
            var data = {
                sex: sex,//性别(1  男 2 女)
                countyId: $("#countyTrigger").attr("data_id"),//区县ID
                cityId: $("#cityTrigger").attr("data_id"),//城市ID
                provinceId: $("#provinceTrigger").attr("data_id"),//省份ID
                verifycode: $("#verifycode").val(),//图片验证码
                idNo: $("#idNo").val(),//身份证号码
                name: $("#name").val(),//姓名
                phone: $("#phone").val(),//手机号
                idType: 1,//证件类别身份证：1军官证：2护照：3港澳通行证：4台胞证：5
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
                url: '/hospital/addPCode',
                contentType: 'application/json'
            }).done(function (data) {
                if (data.retCode == '000000' && data.responseBody.code == "200") {
                    maskTip("验证码发送成功！");
                    time($("#getCode"));
                } else {
                    maskTip(data.msg ? data.msg : "获取短信验证码失败！")
                }
            })
        }
    });
    $("#addPatient").click(function () {
        if (!$("#name").val()) {
            maskTip("请输入姓名");
            return;
        } else if (!$('#sexBoy picture').hasClass('active') && !$('#sexGirl picture').hasClass('active')) {
            maskTip("性别不能为空");
            return;
        } else if (!$("#idNo").val()) {
            maskTip("请输入身份证号码");
            return;
        } else if (!$("#name").val()) {
            maskTip("请输入姓名");
            return;
        } else if (!$("#phone").val()) {
            maskTip("请输入手机号");
            return;
        }
        if (!$("#countyTrigger").attr("data_id") || !$("#cityTrigger").attr("data_id") || !$("#provinceTrigger").attr("data_id")) {
            maskTip("请选择现居住地");
            return;
        }
        if (!$("#verifycode").val()) {
            maskTip("请输入图片验证码");
            return;
        } else if (!$('#tpyzm').val()) {
            maskTip("请输入验证码");
            return;
        }
        var data = {
            sex: sex,//性别(1  男 2 女)
            countyId: $("#countyTrigger").attr("data_id"),//区县ID
            cityId: $("#cityTrigger").attr("data_id"),//城市ID
            provinceId: $("#provinceTrigger").attr("data_id"),//省份ID
            verifycode: $("#verifycode").val(),//图片验证码
            idNo: $("#idNo").val(),//身份证号码
            name: $("#name").val(),//姓名
            phone: $("#phone").val(),//手机号
            idType: 1,//证件类别身份证：1军官证：2护照：3港澳通行证：4台胞证：5
            tpyzm: $("#tpyzm").val(),
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
            url: '/hospital/addPeople',
            contentType: 'application/json'
        }).done(function (data) {
            if (data.responseBody.code == "200") {
                maskTip("添加就诊人成功！");
                var url = "/hospital?page=informationConfirm&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                window.location.href = url;//跳转到对应的页面
                return;
            } else {
                maskTip(data.responseBody.msg || "添加就诊人失败！");
                return;
            }
        })
    })
    /*
     *返回按钮
     */
    $('#back').on("click", function () {
        var url = "/hospital?page=informationConfirm&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        window.location.href = url;//跳转到对应的页面
    })
    var wait = 60;

    function time(but) {
        if (wait == 0) {
            $(but).removeAttr("disabled").removeClass("getCode_wait").addClass("get-code");
            $(but).text("获取校验码");
            wait = 60;
        } else {
            $(but).attr("disabled", true).removeClass("get-code").addClass("getCode_wait");
            $(but).text("重新发送(" + wait + ")");
            wait--;
            setTimeout(function () {
                time(but);
            }, 1000);
        }
    };
    // 参数为空时的提示语
    function maskTip(mgs) {
        $('#masktime').html(mgs);
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    }
})



