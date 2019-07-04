$(function () {
    var phoneExg = /^1[3,4,5,7,8]\d{9}$/;
    $("#phoneNum").on("blur", function (event) {
        if (phoneExg.test($(this).val())) {
            // $("#getVel").removeClass(" ccc");
        } else {
            // $("#getVel").addClass("ccc");
        }
        event.preventDefault();
    });
    //点击获取验证码
    $("#getVel").on("click", function (event) {
        // $(this).addClass("ccc");
        var url = "/tourism/getVerifyCode?phone=" + $("#phoneNum").val().trim() + "&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        $("#dialogMask,#dialog").show();
        $.ajax({
            async: false,
            type: "GET",
            url: url,
            dataType: "json",
            contentType: "application/json",
        }).done(function (response) {
            $("#dialogMask,#dialog").hide();
            if (response.retCode != "000000") {
                maskTip("短信发送失败");
            } else {
                if(response.responseBody.status != 1000){
                    maskTip(response.responseBody.message || "短信发送失败");
                    return;
                }
                maskTip("短信验证码正在发送中，请查看手机短信，如果2分钟内没有收到，请核实填写的手机号码。");
                // $(this).addClass("ccc");
                time($("#getVel"));
            }
        }).fail(function (data) {
            console.log('fail');
        }).always(function () {

        });
        event.preventDefault();
    });
    //点击查询
    $("#searchBtn").on("click", function () {
        var phoneExg = /^1[3,4,5,7,8]\d{9}$/;
        var phoneNum = $("#phoneNum").val();
        var verifycode = $("#verifycode").val();
        if (phoneExg.test(phoneNum)) {

        } else {
            maskTip("手机号为必填项");
            return;
        }
        if (verifycode == "") {
            maskTip("验证码为必填项");
            return;
        }
        var url = "/tourism/findInfo?phone=" + phoneNum.trim() + "&verifycode=" + verifycode.trim() + "&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y
        $("#dialogMask,#dialog").show();
        $.ajax({
            async: false,
            type: "GET",
            url: url,
            dataType: "json",
            contentType: "application/json",
        }).done(function (response) {
            $("#dialogMask,#dialog").hide();
            if (response.retCode == "000000") {
                var data = response.responseBody;
                $("#resultNum").html(data.length);
                if (data.length != 0) {
                    $("#resultBox").html("");  //清空结果
                    <!--1循环开始-->
                    for (var i = 0; i < data.length; i++) {
                        var msg = data[i].realProcess;
                        var str = "<div class='peccancyQuery userInfor onlyStyle'><h2 class='q-r-tit'><span></span>旅游诉求自助流水号：" +
                            "<small class=\"success lvyouNum\">" + data[i].orderNo + "</small></h2><hr class=\"hrLine\">" +
                            "<div class=\"tab-content gjj-list\"><div class=\"text-list-div clearfix\"><label>状态：</label>";
                        if (msg[msg.length - 1].stateName == "凭证不足") {
                            str += "<span>已处理</span></div><div class=\"text-list-div no-padding clearfix\"><div class='title slideUp clearfix'><label>详情：</label>" +
                                "<span><img src=\"/images/icon-rightArrow.png\" class=\"icon-downMenu spacTop\"></span></div><div class=\"speedBox slideUp\" style=\"display:none;\">";

                        } else {
                            str += "<span>" + msg[msg.length - 1].stateName + "</span></div><div class=\"text-list-div no-padding clearfix\"><div class='title slideUp clearfix'><label>详情：</label>" +
                                "<span><img src=\"/images/icon-rightArrow.png\" class=\"icon-downMenu spacTop\"></span></div><div class=\"speedBox slideUp\"  style=\"display:none;\">";
                        }
                        <!--j循环开始-->
                        for (var j = 0; j < msg.length; j++) {
                            if (msg[j].stateName == "已提交") {
                                var dataJson = msg[j];
                                var date = dataJson.stateTime.split(" ")[0];
                                var time = dataJson.stateTime.split(" ")[1];
                                str += "<div class=\"speedList\"><i class=\"icon-lvyou icon-submit\"></i>" +
                                    "<p class=\"time\"><span>" + date + "</span><span>" + time + "</span><span>" + dataJson.stateName + "</span></p>";
                                if (dataJson.remark) {
                                    str += "<p class=\"auditPrompt\">" + dataJson.remark + "</p>";
                                }
                                str += "</div>"

                            } else if (msg[j].stateName == "审核中") {
                                var dataJson = msg[j];
                                var date = dataJson.stateTime.split(" ")[0];
                                var time = dataJson.stateTime.split(" ")[1];
                                str += "<div class=\"speedList\"><i class=\"icon-lvyou icon-submit\"></i>" +
                                    "<p class=\"time\"><span>" + date + "</span><span>" + time + "</span><span>" + dataJson.stateName + "</span></p>";
                                if (dataJson.remark) {
                                    str += "<p class=\"auditPrompt\">" + dataJson.remark + "</p>";
                                }
                                str += "</div>"
                            } else if (msg[j].stateName == "凭证不足") {
                                var dataJson = msg[j];
                                var date = dataJson.stateTime.split(" ")[0];
                                var time = dataJson.stateTime.split(" ")[1];
                                str += "<div class=\"speedList\"><i class=\"icon-lvyou icon-submit\"></i>" +
                                    "<p class=\"time\"><span>" + date + "</span><span>" + time + "</span><span>已处理</span></p>";
                                if (dataJson.remark) {
                                    str += "<p class=\"auditPrompt\">" + dataJson.remark + "</p>";
                                }
                                str += "</div>"

                            } else if (msg[j].stateName == "已撤销") {
                                var dataJson = msg[j];
                                var date = dataJson.stateTime.split(" ")[0];
                                var time = dataJson.stateTime.split(" ")[1];
                                str += "<div class=\"speedList\"><i class=\"icon-lvyou icon-cancel\"></i>" +
                                    "<p class=\"time\"><span>" + date + "</span><span>" + time + "</span><span>已撤销</span></p>";
                                if (dataJson.remark) {
                                    str += "<p class=\"auditPrompt\">" + dataJson.remark + "</p>";
                                }
                                str += "</div>"
                            }
                        }
                        <!--j循环结束-->
                        if (msg.length < 3 && msg[msg.length - 1].stateName != "已撤销") {
                            if (msg.length == 1) {
                                str += "<div class=\"speedList\"><i class=\"icon-lvyou icon-default\"></i>" +
                                    "<p class=\"auditPrompt\"><span>待审核</span></p></div>" +
                                    "<div class=\"speedList\"><i class=\"icon-lvyou icon-default\"></i>" +
                                    "<p class=\"auditPrompt\"><span>待处理</span></p></div>";
                            } else if (msg.length == 2) {
                                str += "<div class=\"speedList\"><i class=\"icon-lvyou icon-default\"></i>" +
                                    "<p class=\"auditPrompt\"><span>待处理</span></p></div>";
                            }
                        }
                        str += "</div></div></div></div>";
                        $("#resultBox").append(str);
                    }
                    <!--i循环开始-->
                }
                $("#resultBox").show();
                //信息下拉收起效果
                $(".title").on("click", function (event) {
                    if ($(this).hasClass('slideDown')) {
                        $(this).removeClass('slideDown').addClass('slideUp');
                        $(this).find("img").css({"transform": "rotate(0deg)"});
                        $(this).siblings('.speedBox').removeClass('slideDown').addClass('slideUp');
                        $(this).siblings('.speedBox').slideUp('700')
                    } else if ($(this).hasClass('slideUp')) {
                        $(this).removeClass('slideUp').addClass('slideDown');
                        $(this).find("img").css({"transform": "rotate(90deg)"});
                        $(this).siblings('.speedBox').removeClass('slideUp').addClass('slideDown');
                        $(this).siblings('.speedBox').slideDown('700')
                    }
                    event.preventDefault();
                });
            } else {
                maskTip(response.rtnMsg);
            }

        }).fail(function (data) {
            console.log('fail');
        }).always(function () {

        });
        event.preventDefault();
    });

    //点击返回按钮
    $(".icon-return").on("click", function () {
        window.location.href = "/tourism?randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    })
})