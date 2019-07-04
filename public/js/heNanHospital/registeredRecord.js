var pageNum = 1, totlePage = 0, falg = true, dataNums = 0;//定义全局变量
var recodeHe = JSON.parse(sessionStorage.getItem("recodeHe"));
$('#recodShu').html(recodeHe.totalNum);
;
(function ($) {
    ajax(null, null);//页面初始化执行
})(Zepto)
/*
 *点击返回按钮
 */
function back() {
    var url = "/heNanHospital?page=" + comeFrom + "&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
};
/*
 *选择就诊
 */
$("#orderType_choose,#orderType").click(function () {
    $("#mask, #orderType_list_div").show()
})
$("#mask").click(function () {
    $("#mask, #orderType_list_div").hide()
})
$("#orderType_list>li").click(function () {
    orderType = $(this).find('a').attr("data-index");
    $("#orderType").html($(this).text());
    $("#orderType").attr("main-index", orderType)
    $("#mask, #orderType_list_div").hide()
});
function cancelAppointment(cancelId) {
    sessionStorage.setItem("cancelId", cancelId);//取消记录号（从接口6中获取）
    var url = "/heNanHospital?page=cancelAppointment&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
    window.location.href = url;
};
function ajax(start, end, num) {
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        p: pageNum,//页码（默认值为1）
        yys: start || "",//预约开始时间
        yye: end || "",//预约结束时间
        state: $("#orderType").attr("main-index") || 0//预约状态（默认值为0）
    };
    $.ajax({
        type: "post",
        url: "/heNanHospital/getDetail",
        async: true,
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (data) {
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                if ($("#orderType").attr("main-index") == "4,5" || $("#orderType").attr("main-index") == "2,3" || $("#orderType").attr("main-index") == "8") {
                    $('#recodeDetail').html("<div class='peccancyQuery userInfor onlyStyle'><h2 class='q-r-tit hospitalTitle colorblue'>暂无数据</h2></div>");
                    $('#recodShu').html(0);
                    /*
                     *查询动画提示结束
                     */
                    $('#circle').hide();//下拉动画
                    $('#dialogMask,#dialog').hide();

                    return;
                }
                ;
                if (data.responseBody.lists.length == num) {//向下滚动时阻止追加
                    $('#circle').hide();//下拉动画
                    return;
                }
                if (data.responseBody.lists != null && data.responseBody.lists.length != 0) {
                    totlePage = data.responseBody.lists.length;
                    dataNums = data.responseBody.lists.length;
                    var html = "";
                    $.each(data.responseBody.lists, function (index, val) {
                        html += "<div class=\"peccancyQuery userInfor onlyStyle\">" +
                            "<h2 class=\"q-r-tit hospitalTitle colorblue\">" + val.status.split(" ")[0] + "</h2>" +
                            "<hr class=\"hrLine\">" +
                            "<div class=\"reservationDetails\">" +
                            "<ul>" +
                            "<li><em></em><label>就诊人：</label><span>" + val.patientName + "</span></li>" +
                            "<li><em></em><label>就诊时间：</label><span>" + val.jzhTime + "</span></li>" +
                            "<li><em></em><label>医生：</label><span>" + val.doctorName + "</span></li>" +
                            "<li><em></em><label>挂号费：</label><span>" + val.ghf + "</span></li>" +
                            "</ul>" +
                            "</div>";
                        if (val.status.split(" ")[0] == "已取消" || val.status.split(" ")[0] == "停诊") {
                            html += "<div class=\"btn-box\"  style=\"display: none\"><input type=\"button\" value=\"取消预约\" /></div>";
                        }
                        else {
                            html += "<div class=\"btn-box\">" +
                                "<input type=\"button\" value=\"取消预约\"  onclick=cancelAppointment('" + val.id + "')>" +
                                "</div>";
                        }
                        html += "</div>";
                    });
                    $('#recodeDetail').append(html);
                    $('#recodShu').html(Number(10 * (pageNum - 1)) + Number(dataNums));
                    falg = true;
                    $('#circle').hide();//下拉动画
                    /*
                     *查询动画提示结束
                     */
                    $('#dialogMask,#dialog').hide();

                } else {
                    /*
                     *查询动画提示结束
                     */
                    $('#dialogMask,#dialog').hide();

                    $('#circle').hide();//下拉动画

                    $('#recodeDetail').html("<div class='peccancyQuery userInfor onlyStyle'><h2 class='q-r-tit hospitalTitle colorblue'>暂无数据</h2></div>");
                    $('#recodShu').html(0);
                }
            }
            ;
            if (data.retCode == "000020") {
                /*
                 *查询动画提示结束
                 */
                $('#dialogMask,#dialog').hide();

                $('#circle').hide();//下拉动画
                maskTip("未登陆或登陆超时");
                var url = "/heNanHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                    "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=registeredRecord";
                window.location.href = url;
                return;
            }
            ;
        },
        error: function () {

        }
    })
};
/*
 *下拉加载
 */
$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(window).height();
    if (scrollTop + windowHeight >= scrollHeight - 10) {
        if (totlePage < 10) {
            return;
        }
        if (falg) {
            $('#circle').show();
            falg = false;
            pageNum++;
            $('#circle').show();//下拉动画
            var start = $('#start').html();
            var end = $('#end').html();
            if (end == "请选择结束时间" || start == "请选择结束时间") {
                end = "";
                start = "";
            }
            ajax(start, end, 0);
        }
    }
});
function search() {
    pageNum = 1;
    var start = $('#start').html();
    var end = $('#end').html();
    if (start == "请选择起始时间") {
        start = ""
    }
    ;
    if (start) {
        if (end == start) {
            maskTip("结束时间大于起始时间");
            return;
        }
    }
    ;
    if (end == "请选择结束时间") {
        end = ""
    }
    ;
    $('#dialogMask,#dialog').show();

    $('#recodeDetail').html("");
    ajax(start, end);
}

/*
 *日历插件  日期范围限制
 */
var start = {
    elem: '#start',
    format: 'YYYY-MM-DD',
    min: "", //设定最小日期为当前日期 laydate.now()
    max: '2099-06-16', //最大日期
    istime: true,
    istoday: false,
    choose: function (datas) {
        end.min = datas; //开始日选好后，重置结束日的最小日期
        end.start = datas //将结束日的初始值设定为开始日
    }
};

var end = {
    elem: '#end',
    format: 'YYYY-MM-DD',
    min: laydate.now(),
    max: '2099-06-16',
    istime: true,
    istoday: false,
    choose: function (datas) {
        start.max = datas; //结束日选好后，充值开始日的最大日期
    }
};
laydate(start);
laydate(end);
$('#start,#end').click(function () {
    $('#laydate_box').css("left", $(this).offset().left - 70 + "px");
})


/*
 *查询预约记录
 */
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
$("#userCenter li").on("click", function (event) {
    event.stopPropagation();
});
//点击挂号记录，判断是否登陆，再跳转页面
$("#record").on("click", function (event) {
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        p: 1,//页码（默认值为1）
        yys: "",//预约开始时间
        yye: "",//预约结束时间
        state: 0//预约状态（默认值为0）
    };
    $.ajax({
        async: true,
        type: 'post',
        url: "/heNanHospital/getDetail",
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (data) {
            if (data.rtnCode == "000000") {
                if (data.data.datail) {
                    var url = "/heNanHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=registeredRecord";
                    window.location.href = url;
                }
                ;
            }
            ;
            /*
             *登录后跳转页面
             */
            if (data.retCode == "000000") {
                if (!data.responseBody.scdlsj) {
                    var url = "/heNanHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=registeredRecord";
                    window.location.href = url;
                    return;
                }
                var url = "/heNanHospital?page=registeredRecord&randomKey=" + randomKey + "&userID=" + userID +
                    "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=registeredRecord";
                window.location.href = url;
            } else {
                maskTip(data.responseBody.data);
                return;
            }
        }
    })
});
/*
 *点击退出
 */
$('#quit').on("click", function () {
    maskTip("退出中");
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
        url: "/heNanHospital/addPeople",
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                var url = "/heNanHospital?page=heNanHospital&randomKey=" + randomKey + "&userID=" + userID +
                    "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                window.location.href = url;
            } else {
                maskTip("未登陆或已退出");
                return;

            }
            ;
        },
        error: function () {
            maskTip("请求异常");
            return;
        }
    })
})