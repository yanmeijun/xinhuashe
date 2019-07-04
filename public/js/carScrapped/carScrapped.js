$(function () {
    var weekdayArr = [
        {"id": "01", "name": "大型汽车"},
        {"id": "02", "name": "小型汽车"},
        {"id": "51", "name": "大型新能源汽车"},
        {"id": "52", "name": "小型新能源汽车"},
        {"id": "03", "name": "使馆汽车"},
        {"id": "04", "name": "领馆汽车"},
        {"id": "05", "name": "境外汽车"},
        {"id": "06", "name": "外籍汽车"},
        {"id": "07", "name": "普通摩托车"},
        {"id": "08", "name": "轻便摩托车"},
        {"id": "09", "name": "使馆摩托车"},
        {"id": "10", "name": "领馆摩托车"},
        {"id": "11", "name": "境外摩托车"},
        {"id": "12", "name": "外籍摩托车"},
        {"id": "13", "name": "低速车"},
        {"id": "14", "name": "拖拉机"},
        {"id": "15", "name": "挂车"},
        {"id": "16", "name": "教练汽车"},
        {"id": "17", "name": "教练摩托车"},
        {"id": "18", "name": "试验汽车"},
        {"id": "19", "name": "试验摩托车"},
        {"id": "20", "name": "临时入境汽车"},
        {"id": "21", "name": "临时入境摩托车"},
        {"id": "22", "name": "临时行驶车"},
        {"id": "23", "name": "警用汽车"},
        {"id": "24", "name": "警用摩托"},
        {"id": "25", "name": "原农机号牌"},
        {"id": "26", "name": "香港入出境车"},
        {"id": "27", "name": "澳门入出境车"}
    ];
    if(localFrom == "xinhuashe_app"){
        getInputInfo();
    }
    //获取回填信息
    function getInputInfo() {
        var data = {
            clientID: clientID,
            serviceID: "AAA0004"
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/userLoginInfo/getUserInfo',
            contentType: 'application/json'
        }).done(function (data) {
            $('#carTrigger').attr("data_id", data.hpzl);//号牌种类
            $("#peccancy_data1").val(data.hphm2b);//车牌号码
            $('#carLastNum').val(data.fdjh);//发动机号码后六位
            weekdayArr.forEach(function(item){
                if(item.id == data.hpzl){
                    $('#carTrigger').text(item.name);//号牌种类
                }
            })
        });
    }
    $("#veriCodeImage").on("click", function () {
        $("#veriCodeImage").attr("src", "/images/yanzm.gif");
        var parameters = {
            sfCode: sfCode,
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y
        };
        $.ajax({
            async: true,
            type: "post",
            url: "/car/carScrappedVeryCode",
            data: JSON.stringify(parameters),
            dataType: "json",
            contentType: "application/json",
            success: function (data, status, xhr) {
                $("#veriCodeImage").attr("src", "/images/refreshCode.png");
                return;
            },
            error: function (xhr, errorType, error) {
            },
            complete: function (xhr, status) {
                if (status == "success") {
                    // masktime("再次点击刷新验证码");
                    $("#veriCodeImage").attr("src", "/images/refreshCode.png");
                    return;
                } else {
                    $("#veriCodeImage").attr("src", xhr.response);
                }
                if ($("#veriCodeImage").attr('src') == "/images/refreshCode.png") {
                    masktime("再次点击刷新验证码");
                }

            }
        })
    });
    $("#veriCodeImage").click();
    var sfName = {
        id_11: "京",
        id_12: "津",
        id_31: "沪",
        id_50: "渝",
        id_15: "蒙",
        id_65: "新",
        id_54: "藏",
        id_64: "宁",
        id_45: "桂",
        id_23: "黑",
        id_22: "吉",
        id_21: "辽",
        id_14: "晋",
        id_13: "冀",
        id_63: "青",
        id_37: "鲁",
        id_41: "豫",
        id_32: "苏",
        id_34: "皖",
        id_33: "浙",
        id_35: "闽",
        id_36: "赣",
        id_43: "湘",
        id_42: "鄂",
        id_44: "粤",
        id_46: "琼",
        id_62: "甘",
        id_61: "陕",
        id_52: "贵",
        id_53: "云",
        id_51: "川"
    }
    var id = cityID.toString().substr(0, 2);
    $("#car-num").text(sfName["id_" + id])
    /*选择车牌*/
// $("#car-num").on("click", function () {
//     $(".mask").show(100);
//     $("#dialog-carNum-box").show(100)
// })
    $("#peccancy_choice_carNum>li>a").click(function () {
        $("#car-num").html($(this).html())
        $(".mask").hide(100);
        $("#dialog-car-box").hide(100)
        $("#dialog-carNum-box").hide(100);
        $("#peccancy_choice_carNum>li").removeClass('active');
        $(this).parent().addClass("active");
    });

    /*
     *选择车辆类型
     */
    $('#car,#carTrigger').on('click', function () {
        $(".mobileSelect").remove();
        var mobileSelect1 = new MobileSelect({
            trigger: '#carTrigger',
            title: '车辆类型',
            wheels: [
                {data: weekdayArr}
            ],
			callback: function () {
			  $('#carTrigger').css("color","#474747")
			}
        });
        $(".mobileSelect").addClass("mobileSelect-show");
    })

    $("#search").click(function () {
        var carTrigger = $('#carTrigger').attr("data_id");//号牌种类
        var carNumber = $("#peccancy_data1").val();//车牌号码
        var carLastNum = $('#carLastNum').val();//发动机号码后六位
        var veriCode = $('#veriCode').val();//验证码
        if (!carNumber) {
            masktime("号牌号码不能为空");
            return;
        }
        if (!carLastNum) {
            masktime("发动机号码后六位不能为空");
            return;
        }
        if (!veriCode) {
            masktime("验证码不能为空");
            return;
        }
        /*
         *查询动画提示结束
         */
        $('#dialogMask,#dialog').show();

        var parameters = {
            sfCode: sfCode,
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            hpzl: carTrigger.trim(),//号牌种类
            hphm2a: $('#car-num').html().trim(),//车牌号牌
            hphm2b: carNumber.trim(),//车牌号码
            hphm: $('#car-num').html() + carNumber.trim(),//号牌号码
            fdjh: carLastNum.trim(),//发动机号后六位
            captcha: veriCode.trim()//验证码
        };
        $.ajax({
            async: true,
            type: "post",
            url: "/car/findCarScrapped",
            data: JSON.stringify(parameters),
            dataType: "json",
            contentType: "application/json",
            success: function (data, status, xhr) {
                if (data.retCode == "000000") {
                    if (data.responseBody.code == 200) {
                        if (data.responseBody.data.qzbfqz.indexOf("--") != -1) {
                            $('#riqi').html(data.responseBody.data.yqjyqzbfqz);
                            $('#riqiData').show();
                        } else {
                            $('#ri').html(data.responseBody.data.qzbfqz);
                            $('#riData').show();
                        }
                        $('#haveData').show();
                        $('#noData').hide();
                    } else {
                        $('#noDataerror').html(data.responseBody.message);
                        $('#noData').show();
                        $('#haveData').hide();
                    }
                    /*
                     *查询动画提示结束
                     */
                    $('#dialogMask,#dialog').hide();

                } else {
                    /*
                     *查询动画提示结束
                     */
                    $('#dialogMask,#dialog').hide();

                    $('#noData').show();
                    $('#haveData').hide();
                }
            },
            error: function (xhr, errorType, error) {
                console.log(xhr)
            },
            complete: function (xhr, status) {
            }
        })
    })
    function masktime(mgs) {
        $('#masktime').html(mgs)
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    }
})


