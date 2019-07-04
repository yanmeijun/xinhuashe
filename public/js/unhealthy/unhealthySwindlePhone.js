var calltimes;
$(function () {
    $("#veriCodeImage").on("click", function (event) {
        $("#veriCodeImage").attr("src", "/images/yanzm.gif");
        var data = {
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
            url: '/unhealthy/verifyCode',
            contentType: 'application/json'
        }).done(function (data) {
            $("#veriCodeImage").attr("src", data);
        });
    });
    $("#veriCodeImage").click();
    var wait = 60;
    //点击验证
    $("#getCode").on("click", function () {

        if ($("#FraudPhone").val() == "") {
            masktime("请输入诈骗电话");
            return
        }

        if ($('#verification').val() == "") {
            masktime("请输入验证码");
            return
        }

        if ($('#ownphone').val() == "") {
            masktime("您的手机不能为空");
            return
        } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test($('#ownphone').val()))) {
            masktime("请输入正确的手机号码")
            return
        }
        ;
        if (wait == 60) {
            var data = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y,
                code: $("#verification").val(),
                jbphone: $("#ownphone").val(),
            };
            $.ajax({
                async: true,
                type: 'post',
                data: JSON.stringify(data),
                url: '/unhealthy/shortMessage',
                contentType: 'application/json'
            }).done(function (body) {
                if (body.retCode == '000000') {
                    $("#mask").show();
                    $("#tips_text").html("短信已发送到您手机上，如果1分钟内没有收到短信验证码，请点击按钮重新获取，此服务免费。");
                    $("#tips").show();
                    time($("#getCodes"));
                } else {
                    $("#mask").show();
                    $("#tips_text").html(body.responseBody.errorMsg);
                    $("#tips").show();
                }
            });
        }

    });
//提示信息
    function time(but) {
        if (wait == 0) {
            $(but).removeAttr("disabled").removeClass("get_code_wait").addClass("get-code");
            $(but).text("获取校验码");
            wait = 60;
        } else {
            $(but).attr("disabled", true).removeClass("get-code").addClass("get_code_wait");
            $(but).text("重新发送(" + wait + ")");
            wait--;
            setTimeout(function () {
                time(but);
            }, 1000);
        }
    }

    //取消提示信息
    $('#iKnow').on("click", function () {
        $("#tips").hide();
        $("#mask").hide();
    })


    //点击举报
    $("#report").on("click", function (event) {
        var phoneZP = $("#FraudPhone").val();//诈骗的号码
        var phone = $('#ownphone').val(); //请输入您的手机号码
        var verification = $('#verification').val(); //验证码
        var phonecode = $('#messageCode').val();//短信验证码
        if (phoneZP == '') {
            masktime("请输入诈骗的号码")
            return
        }

        if (verification == '') {
            masktime("请输入验证码")
            return;
        }

        if (phone == '') {
            masktime("请输入11位数字的手机号码")
            return
        } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(phone))) {
            masktime("请输入正确的号码格式")
            return;
        }
        if (phonecode == "") {
            masktime("短信验证码")
            return;
        }
        if ($('input[name="radio"]:checked').val() == undefined) {
            masktime("请输入诈骗类型")
            return;
        }
        if (calltimes == undefined) {
            masktime("请输入来电时间和来电日期")
            return;
        } else if (calltimes.indexOf("undefined") != -1) {
            masktime("请输入来电日期")
            return;
        } else if (calltimes.indexOf("请选择来电时间") != -1) {
            masktime("请输入来电日期")
            return;
        }
        if ($("#content").val() == '') {
            masktime("请输入来电描述内容")
            return;
        }
        if ($("input[name='type']").attr("main-time") == '') {
            $("input[name='type']").attr("main-time", 0) //通话时长限制
        }
        ;
        $('#dialogMask,#dialog').show();
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            content: $("#content").val(),
            verifycode: $("#verification").val(),
            phone: $('#ownphone').val(),
            phoneZP: $("#FraudPhone").val(),
            phonecode: $("#messageCode").val(),
            badtype: $('input[name="radio"]:checked').val(),
            calltime: calltimes,
            durationtime: $("input[name='type']").attr("main-time")
        }

        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/unhealthy/subMobileInfo',
            contentType: 'application/json'
        }).done(function (data) {

            $('#dialogMask,#dialog').hide();
            if (data.retCode == '000000') {
                $("#tips_text").html(data.responseBody.rtnMsg)
                $("#tips").show();
                $('#mask').show();
            } else {
                $("#tips_text").html(" ");
                $('#mask').hide();
                $("#tips").hide();
                if (data == "Bad request") {
                    $("#tips_text").html("请求异常，请稍后")
                    $("#tips").show();
                    $('#mask').show();
                    return;
                } else {
                    if (data.responseBody.errorMsg) {
                        $("#tips_text").html(data.responseBody.errorMsg)
                        $("#tips").show();
                        $('#mask').show();
                        return;
                    } else {
                        $("#tips_text").html("请求异常，请稍后")
                        $("#tips").show();
                        $('#mask').show();
                        return;
                    }
                }
            }

        })
    });

    //验证方式弹框出现
    $("#ValidateType,#chooseValidate").on("click", function (event) {
        $("#Validatemask").show();
        $("#dialog-car-box").show();
        document.activeElement.blur();
        event.preventDefault();
    })
    //验证方式弹框消失
    $("#Validatemask").on("click", function (event) {
        $("#Validatemask").hide();
        $("#dialog-car-box").hide();
        event.preventDefault();
    });
    //选择验证方式
    $("#velidataUl>li").on("click", function (event) {
        $(this).css("backgroundColor", "#ccc");
        $("input[name='type']").attr("main-time", $(this).children("a").data("index"));
        $("#ValidateType").val($(this).children("a").html());
        $("#Validatemask").hide();
        $("#dialog-car-box").hide();
        $(this).css("backgroundColor", "transparent");
        event.preventDefault();
    });

});


$(function () {
    var selectedDate = {};
    var currYear = (new Date()).getFullYear();
    var opt = {};
    opt.date = {preset: 'date'};
    opt.datetime = {preset: 'datetime'};
    opt.time = {preset: 'time'};
    opt.default = {
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        lang: 'zh',
        showNow: true,
        nowText: "今天",
        startYear: currYear - 10, //开始年份
        endYear: currYear, //结束年份
        onBeforeShow: function (inst) {//展示前的事件
            $("#appDate").readonly = true;//只读属性
            $("#appTime").readonly = true;//只读属性
            $('.dwbg').css("top","127px !important")
            document.activeElement.blur()
        },
        onSelect: function (valueText, inst) {//选择时事件（点击确定后），valueText 为选择的时间，
            valueText.match(/^\d{4}\-\d{2}\-\d{2}$/);
            //console.log(valueText.match(/^\d{4}\-\d{2}\-\d{2}$/))
            if (valueText.match(/^\d{4}\-\d{2}\-\d{2}$/)) {
                var curr = (new Date()).getFullYear();
                var currMonth = (new Date()).getMonth();
                var currDay = (new Date()).getDate();
                var n = valueText.split("-")[0];//所选的年份
                var yu = valueText.split("-")[1];//所选月份
                var rii = valueText.split("-")[2];//所选月份
                var pattern2 = /^0.*/g;//首字母为0
                if (yu.match(pattern2)) {//首字母为0
                    yu = valueText.split("-")[1].replace("0", "");
                } else {
                    yu = valueText.split("-")[1];
                }
                if (rii.match(pattern2)) {//首字母为0
                    rii = valueText.split("-")[2].replace("0", "");
                } else {
                    rii = valueText.split("-")[2];
                }
                if (n >= curr) {
                    var hh = valueText.split(":")[0];//所选的年份
                    var mm = valueText.split(":")[1];//所选的年份
                    var h = (new Date()).getHours();
                    var m = (new Date()).getMinutes();
                    if (yu > currMonth + 1) {//所选的日期大于今天的日期
                        alert("请选择正确的来电时间 ");
                        valueText = "请选择来电时间";
                        $("#appDate").val(valueText)
                    }
                    var hs = $("#appTime").val().split(":")[0]
                    var ms = $("#appTime").val().split(":")[1];
                    if(yu == currMonth + 1){
                        if (rii > currDay) {
                            alert("请选择正确的来电日期 ");
                            valueText = "请选择来电日期";
                            $("#appDate").val(valueText)
                        }
                        if (hs >= h) {
                            if (ms >m) {//限定时间
                                alert("请选择正确的来电时间,不能超过当前时间 ");
                                valueText = "请选择来电时间";
                                $("#appTime").val(valueText)
                            }
                        }

                    }
                }

                selectedDate["date"] = valueText;
            } else {
                var currMonth = (new Date()).getMonth();
                var yu = $("#appDate").val().split("-")[1];
                var curr = (new Date()).getFullYear();
                var hh = valueText.split(":")[0];//所选的年份
                var mm = valueText.split(":")[1];//所选的年份
                var h = (new Date()).getHours();
                var m = (new Date()).getMinutes();
                var pattern2 = /^0.*/g;//首字母为0
                if (hh.match(pattern2)) {//首字母为0
                    hh = valueText.split(":")[0].replace("0", "");
                } else {
                    hh = valueText.split(":")[0];
                }
                if(yu == currMonth + 1){
                    if (hh >= h) {
                        if (mm >m) {//限定时间
                            alert("请选择正确的来电时间,不能超过当前时间 ");
                            valueText = "请选择来电时间";
                            $("#appTime").val(valueText)
                        }
                    }
                }
                selectedDate["time"] = valueText;
            }
            calltimes = selectedDate.date + " " + selectedDate.time;
        }
    };
    $("#appDates").click(function () {
        $("#appDate").mobiscroll("show");
    });
    $("#appDate").mobiscroll($.extend(opt['date'], opt['default']));
    var optDateTime = $.extend(opt['datetime'], opt['default']);
    var optTime = $.extend(opt['time'], opt['default']);
    $("#appTimes").click(function () {
        $("#appTime").mobiscroll("show");
    });
    $("#appTime").mobiscroll(optTime).time(optTime);
    ;

});

/*
 点击返回按钮
 */
$('#back').on("click", function () {
    var url = "/unhealthy?randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
})


function masktime(mgs) {
    $('#masktime').html(mgs)
    $('#masktime').show();
    setTimeout(function () {
        $('#masktime').hide();
    }, 2000)
    return
}