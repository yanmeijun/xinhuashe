var pageNum = 0, totlePage = 0, falg = true;//定义全局变量
var recodeHe = sessionStorage.getItem("orderId");
var key = "";
$(function () {
    $('#dialogMask,#dialog').show();
    ajax(null, null, null);//页面初始化执行


    //来电时间和来电日期
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
        startYear: currYear - 40, //开始年份
        endYear: currYear, //结束年份
        onBeforeShow: function (inst) {//展示前的事件
            document.activeElement.blur();
        },
        onSelect: function (valueText, inst) {//选择时事件（点击确定后），valueText 为选择的时间，

        }
    };
    $("#appDates").click(function () {
        $("#appDate").mobiscroll("show");
    });
    $("#appDate").mobiscroll($.extend(opt['date'], opt['default']));
    var optDateTime = $.extend(opt['datetime'], opt['default']);

    $("#dateTimeTrigger").click(function () {
        $("#dateTime").mobiscroll("show");
    });
    $("#dateTime").mobiscroll($.extend(opt['date'], opt['default']));
});


function ajax(keyword, start, end) {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        pageNo: pageNum,
        pageSize: 10,
        keyword: keyword || "",
        stime: start || "",
        etime: end || ""
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/personCenter",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            /**查询动画提示结束**/
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                totlePage = data.responseBody.TOTAL_PAGE;
                //pageNum = parseInt(data.responseBody.PAGE_NO,10);
                if (data.responseBody.data) {
                    if (data.responseBody.data.indexOf("login.jsp") != -1) {//跳转到登录页面
                        var url = "/anhuiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                        window.location.href = url;
                        return false;
                    }
                }
                if ("0" == data.responseBody.code) {
                    maskTip(data.responseBody.msg);
                    return;
                } else {
                    var con = "";
                    var items = data.responseBody.PAGE;
                    var date = "";
                    var IN_STIME = "";
                    var status = "";
                    var flow = "";
                    var key = "wdyy";
                    if (0 == items.length) {
                        $('#noData').show();
                        $(".con").hide();
                    } else {
                        //$.each(items,function(i,n){
                        for (var i = 0; i < items.length; i++) {
                            var shopName = items[i].HOS_NAME == null ? " " : items[i].HOS_NAME;
                            var orderNum = items[i].ORDER_NUM == null ? "" : items[i].ORDER_NUM;
                            var docImg = items[i].DOCTOR_IMG == "" ? "/images/anhuiHospital/noDoctors.png" : items[i].DOCTOR_IMG;
                            var hosId = items[i].HOS_ID;
                            var orderId = items[i].ORDER_ID;
                            var orderCtime = items[i].ORDER_CTIME.substring(0, 10);
                            var doctorName = items[i].DOCTOR_NAME == "" ? items[i].PRODUCT_NAME : items[i].DOCTOR_NAME;
                            var price = items[i].PRODUCT_PRICE;
                            var takeNODay = "";
                            if (null != items[i].IN_STIME && "" != items[i].IN_STIME) {
                                date = items[i].IN_STIME.substring(0, 10);
                                IN_STIME = items[i].IN_STIME.substring(11, 16);
                                takeNODay = day_transformation(items[i].IN_STIME, items[i].HOS_ID);
                            }
                            if (null != items[i].IN_ETIME && "" != items[i].IN_ETIME) {
                                IN_ETIME = "-" + items[i].IN_ETIME.substring(11, 16);
                            }
                            if ("1" == items[i].ORDER_STATUS && "3" == items[i].ORDER_FLOW) {
                                status = "待就诊";
                                flow = "<input type='button' value='取消预约' onclick=\"cancelOrder('" + orderId + "','" + hosId + "')\">";
                            } else if ("0" == items[i].ORDER_STATUS) {
                                status = "已取消";
                                flow = "";
                            } else if ("1" == items[i].ORDER_STATUS && "4" == items[i].ORDER_FLOW) {
                                status = "已完成";
                                flow = "<input type='button' value='评价' onclick=\"appraise('" + orderId + "','" + key + "')\">";
                            } else if (items[i].ORDER_FLOW == "9" && items[i].ORDER_FLOW == 9) {
                                status = "待评价";
                                flow = "";
                                //flow = "<input type='button' value='评价' onclick=\"appraise('"+orderId+"','"+key+"')\">";
                            } else if ("5" == items[i].ORDER_FLOW) {
                                status = "已评价";
                                flow = "";
                            } else if ("2" == items[i].ORDER_STATUS) {
                                status = "停诊";
                                flow = "";
                            } else if ("1" == items[i].ORDER_STATUS && "7" == items[i].ORDER_FLOW) {
                                status = "未就诊";
                                flow = "";
                            } else if ("1" == items[i].ORDER_STATUS && "2" == items[i].ORDER_FLOW) {
                                status = "待支付";
                                flow = "<input type='button' value='取消预约' onclick=\"cancelOrder('" + orderId + "','" + hosId + "')\">";
                                if ("990000099_01" == hosId) {
                                    flow = "";
                                    //flow = "<input type='button' value='支付' onclick=\"payOrder('"+orderId+"','"+price+"',this)\">";
                                }
                            } else if ("1" == items[i].ORDER_STATUS && "8" == items[i].ORDER_FLOW) {
                                if ("990000099_01" == hosId) {
                                    status = "已支付待就诊";
                                    flow = "";
                                    // flow = "<input type='button' value='取消预约' onclick=\"cancelOrderForPay('"+orderId+"','"+hosId+"',this)\">"
                                }
                            }
                            con += "<div class=\"peccancyQuery userInfor onlyStyle\">" +
                                "<h2 class='q-r-tit anhuiUserCenter clearfix'>" +
                                "<b>订单号：" + orderNum + "</b>" +
                                "<a href='javascript:;'>" + status + "</a>" +
                                "</h2>" +
                                "<hr class=\"hrLine\"><div class=\"tab-content inforConfirm color666\">" +
                                "<div class=\"text-list-div clearfix\">" +
                                "<label>就诊日期：</label><span>" + date + "&nbsp;&nbsp;" + IN_STIME + IN_ETIME + "</span>" +
                                "</div><div class='text-list-div clearfix'>" +
                                "<label>取号时间：</label><span>" + date + "&nbsp;&nbsp;" + takeNODay + "</span>" +
                                "</div><div class='text-list-div clearfix'>" +
                                "<label>医生：</label>" +
                                "<span>" + doctorName + "--<b class='smallWord'>" + items[i].DEPT_NAME + "</b></span>" +
                                "</div><div class='text-list-div clearfix'>" +
                                "<label>就诊医院：</label><span>" + shopName + "--" + items[i].DEPT_NAME + "</span>" +
                                "</div>" +
                                "<div class='text-list-div clearfix'>" +
                                "<label>就诊人：</label>" +
                                "<span>" + items[i].RECEIVE_NAME + "</span>" +
                                "</div><div class='text-list-div clearfix'>" +
                                "<label>参考费用：</label>" +
                                "<span>￥" + items[i].PRODUCT_PRICE + "元</span>" +
                                "</div>" +
                                "</div><div class='btn-box'>";
                            if (flow != "") {
                                con += flow;
                            }
                            con += "</div>" +
                                "</div>";
                        }
                        ;
                        $(".con").empty();
                        $(".con").append(con);
                        $(".con").show();
                        $('#noData').hide();
                        pageNum++;
                    }
                }

                falg = true;

            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
}
/**下拉加载*/
$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(window).height();
    if (scrollTop + windowHeight >= scrollHeight - 10) {
        if (pageNum >= totlePage) {
            return;
        }
        if (falg) {
            falg = false;
            var start = $('#appDate').val();
            var end = $('#dateTime').val();
            if (start == "请选择" || start == "请选择") {
                end = "";
                start = "";
            }
            ajax("", start, end);
        }
    }
});
$('#search').click(function () {
    pageNum = 0;
    var start = $('#appDate').val();
    var end = $('#dateTime').val();
    if (start == "请选择" || start == "请选择") {
        end = "";
        start = "";
    }
    ajax("", start, end);
})
function day_transformation(days, shop_id) {
    //芜湖医院id
    var hosArr = 'H0001,H000201,H000202,H0003,H0004,H0005,H0006,H0007,H0008';
    days = days.replace(/-/g, "/");
    var date = new Date(days);
    var hour = date.getHours();
    var minute = date.getMinutes();
    days = (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute);

    if ("485005650_01" == shop_id || "485005650_02" == shop_id) {
        if ("07:00" == days) {
            days = "08:00";
        } else if ("13:00" == days) {
            days = "15:00";
        }
    } else if ("485000307" == shop_id || "485000307_1" == shop_id || "485000307_2" == shop_id) {
        if ("07:00" == days) {
            days = "08:00";
        } else if ("14:00" == days) {
            days = "14:30";
        }
    } else if (hosArr.indexOf(shop_id) >= 0) {
        if (hour <= 12) {
            days = "11:30";
        } else {
            days = "17:00";
        }
    }
    return days;
}
function cancelOrder(orderId, hosId) {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        orderId: orderId,
        hosId: hosId
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/cancel",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            /**查询动画提示结束**/
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                if (data.responseBody.data) {
                    if (data.responseBody.data.indexOf("login.jsp") != -1) {//跳转到登录页面
                        var url = "/anhuiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                        ;
                        window.location.href = url;
                    }
                }
                if ("1" == data.responseBody.code) {

                    var url = "/anhuiHospital?page=userCenter&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                    ;
                    window.location.href = url;
                } else {
                    maskTip("已过时，取消失败");
                }

            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
}
$('#back').click(function () {
    var url = "/anhuiHospital?page=" + comeFrom + "&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
});
/**查询预约记录*/
var userCenter = true;   //个人中心开关
$(".userAvatarBox").on("click", function (event) {
    if (userCenter) {
        userCenter = false;
        $(".userAvatarBox #userCenter").show();//记录
    } else {
        userCenter = true;
        $(".userAvatarBox #userCenter").hide();
    }

});
$('#quit').click(function () {
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
        url: "/anhuiHospital/signOTut",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            maskTip("退出成功");
            var url = "/anhuiHospital?page=anhuiHospital&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
            window.location.href = url;
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
})
$('#personCon').click(function () {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        pageNo: "0",
        pageSize: 10,
        keyword: "",
        stime: "",
        etime: ""
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/personCenter",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.responseBody.data) {
                if (data.responseBody.data.indexOf("login.jsp") != -1) {//跳转到登录页面
                    var url = "/anhuiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                    ;
                    window.location.href = url;
                    return false;
                }
            }
            var url = "/anhuiHospital?page=userCenter&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
            window.location.href = url;
            return false;
        }
    })
})