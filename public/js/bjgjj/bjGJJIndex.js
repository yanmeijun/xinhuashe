$(function () {
    if (accountStatus == 200 || accountStatus == "200") {
        $("#accountStatus").text("正常")
    } else if (accountStatus == 201 || accountStatus == "201") {
        $("#accountStatus").text("销户")
    } else if (accountStatus == 202 || accountStatus == "202") {
        $("#accountStatus").text("封存")
    }

    var commitStatus = true;
    $(".address").hide();
    // $(".icon-return").hide();
    $("#personalAccInfo").show();
    //点击注册页面返回按钮,考虑到登陆页面的返回按钮
    $(".icon-return").on("click", function () {
        window.location.href = "/bjGJJ?page=login&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
    })
    //信息下拉收起效果
    $(".q-r-tit").on("click", function (event) {
        if ($(this).hasClass('slideDown')) {
            $(this).removeClass('slideDown').addClass('slideUp');
            $(this).find("img").css({"transform": "rotate(180deg)"});
            $(this).parent().find('.tab-content').removeClass('slideDown').addClass('slideUp');
            $(this).parent().find('.tab-content').slideUp('700')
        } else if ($(this).hasClass('slideUp')) {
            $(this).removeClass('slideUp').addClass('slideDown');
            $(this).find("img").css({"transform": "rotate(0deg)"});
            $(this).parent().find('.tab-content').removeClass('slideUp').addClass('slideDown');
            $(this).parent().find('.tab-content').slideDown('700')
        }
        event.preventDefault();
    });
    $(".icon-downMenu").each(function () {
        if ($(this).hasClass('slideUp')) {
            $(this).css({"transform": "rotate(180deg)"})
        } else if ($(this).hasClass('slideDown')) {
            $(this).css({"transform": "rotate(0deg)"})
        }
    })
    //tab切换
    $(".gjj-tab li").on("click", function (event) {
        var index = $(this).data('index');
        $(this).find('span').show();
        $(this).addClass('active').siblings().removeClass('active');
        $(this).siblings().find('span').hide();
        //点击详细账单请求后台
        if ($(this).hasClass("detailAcc")) {
            var url = "/grgjjmxzInfo?randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
            if (commitStatus) {
                commitStatus = false;
                $.ajax({
                    async: false,
                    type: "GET",
                    url: url,
                    dataType: "json",
                    contentType: "application/json"
                }).done(function (response) {
                    commitStatus = true;
                    if (response.rtnMsg == 'success') {
                        $("#gjj-list").html("");
                        var data = response.data.billList;
                        for (var i = 0; i < data.length; i++) {
                            var time = data[i].accountDate.substring(0, 4) + '.' + data[i].accountDate.substring(4, 6) + '.' + data[i].accountDate.substring(6);
                            var businessDateTime = data[i].businessDate.substring(0, 4) + '.' + data[i].businessDate.substring(4, 6);
                            var str = "<div class='text-list-div detailDiv clearfix' data-businesstype='" + data[i].businessType + "'" +
                                "data-reduceamount='" + data[i].reduceAmount + "' data-balance='" + data[i].balance + "' data-accountdate='" + time + "'" +
                                "data-amount='" + data[i].amount + "' data-businessdate='" + businessDateTime + "'>" +
                                "<label>" + time + "</label>" +
                                "<img src='/images/icon-rightArrow.png' class='icon-rightArrow'>";
                            if (data[i].reduceAmount != '0') {
                                str += "<span class=''>-" + data[i].reduceAmount + "</span>" +
                                    "</div>";
                            }
                            if (data[i].amount != '0') {
                                str += "<span class='increase-red'>+" + data[i].amount + "</span>" +
                                    "</div>";
                            }
                            $("#gjj-list").append(str);
                        }
                        //点击明细账单弹出详细内容
                        $(".detailDiv").on("click", function (event) {
                            $("#detailBox").find("ul").html("");
                            var businessType = $(this).data("businesstype");
                            var reduceAmount = $(this).data("reduceamount");
                            var balance = $(this).data("balance");
                            var accountDate = $(this).data("accountdate");
                            var amount = $(this).data("amount");
                            var businessDate = $(this).data("businessdate");
                            var str = "<li><a href='javascript:;'>账单明细</a></li><li><span>到账日期：</span><span>" + accountDate + "</span></li>" +
                                "<li><span>汇补缴年月：</span><span>" + businessDate + "</span></li><li><span>业务类型：</span><span>" + businessType + "</span></li>" +
                                "<li><span>增加额：</span><span>" + amount + "元</span></li><li><span>减少额：</span><span>" + reduceAmount + "元</span></li>" +
                                " <li><span>余额：</span><span>" + balance + "元</span></li>";
                            $("#detailBox").find("ul").append(str);
                            $("#detailBox").show();
                            $(".mask").show();
                            $('body').css({"position":"fixed"})
                            event.preventDefault();
                        });
                    }
                }).fail(function (data) {
                    commitStatus = true;
                }).always(function () {

                });
            }
        }
        $('.gjj-tab-con').eq(index).show().siblings(".gjj-tab-con").hide();
        event.preventDefault();
    });
    //点击遮罩层隐藏弹框
    $(".mask").on("click", function (event) {
        $('body').css("position","static");
        $("#detailBox").hide();
        $(".mask").hide();
        event.preventDefault();
    });
    $(".icon-return").click(function () {
        window.location.href = "/bjGJJ?randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y
    })
})