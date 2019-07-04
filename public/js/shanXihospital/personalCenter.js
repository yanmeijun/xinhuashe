var pageNum = 1, totlePage = 0, falg = true, dataNums = 0;//定义全局变量
var recodeHe = JSON.parse(sessionStorage.getItem("recodeHe"));
var citySelectName = sessionStorage.getItem("cityName");
$(function () {
    if (citySelectName) {
        $('#cityName').html(citySelectName);
    } else {
        $('#cityName').html(cityName);
    }
    $('#dialogMask,#dialog').show();
    ajax("/sXHospital/record");
})
/*
 *点击返回按钮
 */
function back() {
    if (comeFrom == "appointmenSelect") {
        var url = "/sXHospital?page=" + comeFrom + "&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
        window.location.href = url;
    } else {
        var url = "/sXHospital?page=" + comeFrom + "&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        window.location.href = url;
    }
};
var orderType = "0";
$("#orderType_choose,#orderType").click(function () {
    $("#mask, #orderType_list_div").show();
    $('body').css({"position":"fixed"})
})
$("#mask").click(function () {
    $("#mask, #orderType_list_div").hide();
    $('body').css({"position":"static"})
})
$("#orderType_list>li").click(function () {
    orderType = $(this).find('a').attr("data-index");
    $("#orderType").html($(this).text());
    $("#orderType").attr("main-index", orderType);
    $("#mask, #orderType_list_div").hide();
    $('body').css({"position":"static"})
});
function ajax(url) {
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y
    };
    $.ajax({
        type: "post",
        url: url,
        async: true,
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (data) {
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                if (data.responseBody.lists != null && data.responseBody.lists.length != 0) {
                    totlePage = data.responseBody.lists.length;
                    dataNums = data.responseBody.lists.length;
                    var html = "";
                    $.each(data.responseBody.lists, function (index, val) {
                        html += "<div class=\"peccancyQuery userInfor onlyStyle\">" +
                            "<h2 class=\"q-r-tit hospitalTitle colorblue\">预约号：" + val.yyh + "<em class=\"alreadyReserved colorBlue\">" + val.ddzt + "</em></h2>" +
                            "<hr class=\"hrLine\">" +
                            "<div class=\"reservationDetails\">" +
                            "<ul>" +
                            "<li><em></em><label>就诊日期：</label><span>" + val.jzrq + "</span></li>" +
                            "<li><em></em><label>医生：</label><span>" + val.doctorName + "</span></li>" +
                            "<li><em></em><label>就诊医院：</label><span>" + val.hospital + "</span></li>" +
                            "<li><em></em><label>就诊人：</label><span>" + val.jzr + "</span></li>" +
                            "<li><em></em><label>参考费用：</label><span>" + val.ckfy + "</span></li>" +
                            "</ul>" +
                            "</div>";
                        if (val.cz.split(" ")[0] == "不能取消" || val.cz == "") {
                            html += "<div class=\"btn-box\"  style=\"display: none\"><input type=\"button\" value=\"取消预约\" /></div>";
                        }
                        else {
                            html += "<div class=\"btn-box\">" +
                                "<input type=\"button\" value=\"取消预约\"  onclick=cancelAppointment('" + val.qxyyOrderid + "')>" +
                                "</div>";
                        }
                        html += "</div>";
                    });
                    $('#recodeDetail').html(html);
                    $('#recodShu').html(data.responseBody.lists.length);
                    falg = true;
                } else {
                    $('#recodeDetail').html("<div class='peccancyQuery userInfor onlyStyle'><h2 class='q-r-tit hospitalTitle colorblue'>暂无数据</h2></div>");
                    $('#recodShu').html(0);
                }
            } else {
                if (data.responseBody.errorCode == "110003") {
                    var url = "/sXHospital?page=login&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=personalCenter";
                    window.location.href = url;//跳转到对应的页面
                    return;
                } else {
                    maskTip(data.responseBody.errorMsg);
                }
            }
        },
        error: function () {

        }
    })
};
/*
 *下拉加载
 */
//$(window).scroll(function(){
//    var scrollTop = $(this).scrollTop();
//    var scrollHeight = $(document).height();
//    var windowHeight = $(window).height();
//    if (scrollTop+windowHeight>=scrollHeight-10){
//        if (totlePage <10) {
//            return;
//        }
//        if(falg){
//            falg=false;
//            pageNum++;
//            $('#dialogMask,#dialog').show();
//            if(orderType=="0"){
//                ajax("/sXHospital/record","");
//            }else if(orderType=="1"){
//                ajax("/sXHospital/historyRecord","");
//            }else{
//                ajax("/sXHospital/waitComment","");
//            }
//        }
//    }
//});

$('#search').on("click", function () {
    $('#dialogMask,#dialog').show();
    $('#recodeDetail').html();
    if (orderType == "0") {
        ajax("/sXHospital/record");
    } else if (orderType == "1") {
        ajax("/sXHospital/historyRecord");
    } else {
        ajax("/sXHospital/waitComment");
    }
});

function cancelAppointment(cancelId) {
    //sessionStorage.setItem("cancelId",cancelId);//取消记录号（从接口6中获取）
    $('#cancelMask,#cancel').show();
    $('body').css({"position":"fixed"})
    $('#cancelMask,#cancel,#exit').on("click", function () {
        $('#cancelMask,#cancel').hide();
        $('body').css({"position":"static"})
    })
    $('#sure').on("click", function () {
        $('#dialogMask,#dialog').show();
        var parameters = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            orderid: cancelId
        };
        $.ajax({
            type: "post",
            url: "/sXHospital/cancel",
            async: true,
            data: JSON.stringify(parameters),
            contentType: 'application/json',
            success: function (data) {
                $('#dialogMask,#dialog').hide();
                if (data.retCode == "000000") {
                    ajax("/sXHospital/record", "");
                } else {
                    alert("网络异常，请稍后");
                }
            },
            error: function () {

            }
        })
    })
};