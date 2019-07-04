/*车辆违章*/
$(function () {
    if(localFrom == "xinhuashe_app"){
        getInputInfo();
    }
    //获取回填信息
    function getInputInfo() {
        var data = {
            clientID: clientID,
            serviceID: "AAA0001"
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/userLoginInfo/getUserInfo',
            contentType: 'application/json'
        }).done(function (data) {
            data.sfCode?sfCode = data.sfCode:"";
            $("#peccancy_data1").val(data.hphm1b);
            $("#peccancy_data2").val(data.fdjh);
        });
    }
    getVeryCode()
    // $("#peccancy_image").attr("src", "/image?randomKey=" + randomKey + "&action=infraction&" + new Date().getTime());
    $("#peccancy_image").on("click", function () {
        // $("#peccancy_image").attr("src", "/image?randomKey=" + randomKey + "&action=infraction&" + new Date().getTime());
        getVeryCode()
    });
    //获取图片验证码
    function getVeryCode() {
        $("#peccancy_image").attr("src", "/images/yanzm.gif");
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            sfCode: sfCode
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/car/infractionVeryCode',
            contentType: 'application/json'
        }).done(function (data) {
            $("#peccancy_image").attr("src", data);
        });
    }

    $("#icon-downMenu,#peccancy_car").on("click", function () {
        $(".mask").fadeIn(100);
        $("#dialog-car-box").fadeIn(100)
    })
    $(".mask").on("click", function () {
        $(".mask").fadeOut(100);
        $("#dialog-car-box").fadeOut(100)
        $("#dialog-carNum-box").fadeOut(100)
    })
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
    // $("#car-num").on("click", function () {
    //     $(".mask").fadeIn(100);
    //     $("#dialog-carNum-box").fadeIn(100)
    // })
    /*
     *选择车辆类型
     */
    // $('#car,#carTrigger').on('click',function(){
    //     var weekdayArr=[
    //         {"id":"01","name":"大型汽车"},
    //         {"id":"02","name":"小型汽车"},
    //         {"id":"51","name":"大型新能源汽车"},
    //         {"id":"52","name":"小型新能源汽车"},
    //         {"id":"03","name":"使馆汽车"},
    //         {"id":"04","name":"领馆汽车"},
    //         {"id":"05","name":"境外汽车"},
    //         {"id":"06","name":"外籍汽车"},
    //         {"id":"07","name":"普通摩托车"},
    //         {"id":"08","name":"轻便摩托车"},
    //         {"id":"09","name":"使馆摩托车"},
    //         {"id":"10","name":"领馆摩托车"},
    //         {"id":"11","name":"境外摩托车"},
    //         {"id":"12","name":"外籍摩托车"},
    //         {"id":"13","name":"低速车"},
    //         {"id":"14","name":"拖拉机"},
    //         {"id":"15","name":"挂车"},
    //         {"id":"16","name":"教练汽车"},
    //         {"id":"17","name":"教练摩托车"},
    //         {"id":"18","name":"试验汽车"},
    //         {"id":"19","name":"试验摩托车"},
    //         {"id":"20","name":"临时入境汽车"},
    //         {"id":"21","name":"临时入境摩托车"},
    //         {"id":"22","name":"临时行驶车"},
    //         {"id":"23","name":"警用汽车"},
    //         {"id":"24","name":"警用摩托"},
    //         {"id":"25","name":"原农机号牌"},
    //         {"id":"26","name":"香港入出境车"},
    //         {"id":"27","name":"澳门入出境车"}
    //     ];
    //     $(".mobileSelect").remove();
    //     var mobileSelect1 = new MobileSelect({
    //         trigger: '#carTrigger',
    //         title: '车辆类型',
    //         wheels: [{data:weekdayArr}]
    //     });
    //     $(".mobileSelect").addClass("mobileSelect-show");
    // })
    $("#peccancy_submit").click(function () {
        // var carTrigger=$('#carTrigger').attr("data_id");//号牌种类
        var peccancy_data1 = $("#peccancy_data1").val();
        var reg = /[\u4e00-\u9fa5]/g;
        if (reg.test(peccancy_data1)) {
            masktime("请输入正确的车牌号，如：GMG595");
            return;
        } else if (!$("#peccancy_data1").val()) {
            masktime("请输入车牌号！");
            return;
        } else if (!$("#peccancy_data2").val()) {
            masktime("请输入发动机号！");
            return;
        } else if (!$("#peccancy_data3").val()) {
            masktime("请输入验证码！");
            return;
        }
        ;
        $('#dialogMask,#dialog').show();
        var carNum = $("#car-num").html() + peccancy_data1;
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            sfCode: sfCode,
            hpzl: "02",//号牌种类
            hphm1b: peccancy_data1.trim(),//车牌号码，如K2Q259
            hphm: carNum.trim(),//号牌号码，如鲁K2Q259
            fdjh: $("#peccancy_data2").val().trim(),//发动机后六位
            captcha: $("#peccancy_data3").val().trim()//图片验证码
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/car/findInfraction',
            contentType: 'application/json'
        }).done(function (data) {
            $('#dialogMask,#dialog').hide();
            $("#peccancy_result").show();
            if (data.retCode == '000000' && data.responseBody.code == "200") {
                var content = data.responseBody.data.content;
                var detail = '该机动车非现场未处理违法记录共计' + content.zs + '条。其中，牌证发放地违法记录' + content.bd + '条，本省异地违法记录' + content.bs + '条，跨省违法' + content.ws + '条。';
                $("#peccancy_line").html(detail)
            } else {
                $("#peccancy_line").html(data.responseBody.message || "查询失败")
            }
        });
    });
    // $("#peccancy_choice_carNum>li>a").click(function () {
    //     $("#car-num").html($(this).html())
    //     $(".mask").fadeOut(100);
    //     $("#dialog-car-box").fadeOut(100)
    //     $("#dialog-carNum-box").fadeOut(100)
    // });
    // $("#peccancy_choice_car>li").click(function () {
    //     $("#peccancy_car").html($(this).children().eq(0).html())
    //     $(".mask").fadeOut(100);
    //     $("#dialog-car-box").fadeOut(100)
    //     $("#dialog-carNum-box").fadeOut(100)
    // });
    // $(".icon-return").click(function () {
    //     window.location.href = "/"
    // });
    function masktime(mgs) {
        $('#masktime').html(mgs)
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    };
})
