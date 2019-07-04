var categoryId = sessionStorage.getItem("categoryId");//记录号（从接口2中获取）
if (categoryId.indexOf("=") != -1) {
    categoryId = categoryId.replace("=", "");
}
$(function () {
    $('#dialogMask,#dialog').show();

    surplus();//页面加载执行
});
function surplus() {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        id: categoryId//记录号（从接口2中获取）
    };
    $.ajax({
        async: true,
        type: 'post',
        url: "/heNanHospital/surplus",
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            /*
             *查询动画提示结束
             */
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                $('#kshName').html(data.responseBody.kshName);
                $('#ksRule').html(data.responseBody.yyueRule);
                if (data.responseBody.lists.length == 0) {
                    console.log(11)
                    $('#surplus').html("暂无预约科室");
                    $('#surplus').css({"font-size": ".28rem", "text-align": "center", "line-height": "1.6rem"});
                    return;
                }
                var html = "";
                var htmlTime = '';
                var DoctorSurplus = data.responseBody.lists;
                //console.log(DoctorSurplus[i].am[0].time.replace("星期", "周"))
                var ind = 0;
                for (var i = 0; i < DoctorSurplus.length; i++) {
                    ind++;
                    if (i % 2 == 0) {
                        // html+=`<div class="peccancyQuery userInfor onlyStyle clearfix">
                        // 			<dl class="hosList hNHosList">`;
                        html += "<div class=\"peccancyQuery userInfor onlyStyle clearfix\"><dl class=\"hosList hNHosList\">";
                        if (DoctorSurplus[i].img.indexOf("jpg") != -1) {
                            html += "<dt><a href=\"javascript:;\"><img src=" + DoctorSurplus[i].img + " class='photo'></a></dt>";
                        } else {
                            html += "<dt><a href=\"javascript:;\"><img src='/images/heNanHospital/nopho.jpg' class='photo'></a></dt>";
                        }
                        html += "<dd>" +
                            "<p class=\"nameOffice\"><span>" + DoctorSurplus[i].zhjname + "</span>" + DoctorSurplus[i].zhjzcch + "</p>" +
                            "<p class=\"introduce\">擅长：" + DoctorSurplus[i].zhjscsm + "</p>" +
                            "</dd>" +
                            "</dl>" +
                            "<div class=\"reservationDate heNanTableBox\">" +
                            "<table class=\"reservationList\">" +
                            "<tr>" +
                            "<th >排班</th>" +
                            "<th>" + DoctorSurplus[i].am[0].time.replace("星期", "周").split(" ")[0] + '<br>' + DoctorSurplus[i].am[0].time.replace("星期", "周").split(" ")[1] + "</th>" +
                            "<th>" + DoctorSurplus[i].am[1].time.replace("星期", "周").split(" ")[0] + '<br>' + DoctorSurplus[i].am[1].time.replace("星期", "周").split(" ")[1] + "</th>" +
                            "<th>" + DoctorSurplus[i].am[2].time.replace("星期", "周").split(" ")[0] + '<br>' + DoctorSurplus[i].am[2].time.replace("星期", "周").split(" ")[1] + "</th>" +
                            "<th>" + DoctorSurplus[i].am[3].time.replace("星期", "周").split(" ")[0] + '<br>' + DoctorSurplus[i].am[3].time.replace("星期", "周").split(" ")[1] + "</th>" +
                            "<th>" + DoctorSurplus[i].am[4].time.replace("星期", "周").split(" ")[0] + '<br>' + DoctorSurplus[i].am[4].time.replace("星期", "周").split(" ")[1] + "</th>" +
                            "<th>" + DoctorSurplus[i].am[5].time.replace("星期", "周").split(" ")[0] + '<br>' + DoctorSurplus[i].am[5].time.replace("星期", "周").split(" ")[1] + "</th>" +
                            "<th>" + DoctorSurplus[i].am[6].time.replace("星期", "周").split(" ")[0] + '<br>' + DoctorSurplus[i].am[6].time.replace("星期", "周").split(" ")[1] + "</th>" +
                            "</tr>" +
                            "<tr>" +
                            "<td>上午</td>";
                        for (var j = 0; j < 7; j++) {
                            if (DoctorSurplus[i].am[j].shyhy == "-1") {
                                html += "<td class='byAppointment'><span></span></td>";
                            } else if (DoctorSurplus[i].am[j].shyhy == "0") {
                                var addClass = "byAppointment"
                                addClass = addClass == "stopY" ? "stopY" : "stopZ"
                                html += "<td class=" + addClass + "><span class='expiry2'>已满</span></td>";
                            } else if (DoctorSurplus[i].am[j].id == "1") {
                                html += "<td class='byAppointment' onclick=appointment('" + DoctorSurplus[i].am[j].eid + "','" + DoctorSurplus[i].am[j].sl + "','" + DoctorSurplus[i].zhjscsm.trim() + "')><span class='expiry2'>预约</span></td>";
                                //html+="<td class='stopZ' onclick=\"appointment('"+DoctorSurplus[i].am[j].eid+"','"+DoctorSurplus[i].am[j].sl+"','"+DoctorSurplus[i].zhjscsm.trim()+"')\"><span>预约</span></td>";
                            }
                            ;
                        }
                        ;
                        html += "</tr><tr><td >下午</td>";
                        for (var m = 0; m < 7; m++) {
                            if (DoctorSurplus[i + 1].pm[m].shyhy == "-1") {
                                html += "<td class=''><span></span></td>";
                            } else if (DoctorSurplus[i + 1].pm[m].shyhy == "0") {
                                html += "<td class='stopZ'><span class='expiry2'>已满</span></td>";
                            } else if (DoctorSurplus[i + 1].pm[m].id == "1") {
                                html += "<td class='byAppointment' onclick=appointment('" + DoctorSurplus[i + 1].pm[m].eid + "','" + DoctorSurplus[i + 1].pm[m].sl + "','" + DoctorSurplus[i].zhjscsm.trim() + "')><span class='expiry2'>预约</span></td>";
                            }
                            ;
                        }
                        ;
                        html += "</tr></table></div></div>";
                    }
                }
                $('#surplus').html(html);
                $('#surplus').append(htmlTime);
                /*
                 *查询动画提示结束
                 */
                $('#dialogMask,#dialog').hide();


            }
        },
        error: function () {

        }
    });
}
function back() {
    var url = "/heNanHospital?page=department&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
};


function appointment(eidmgs, slmgs, mess) {
    if (eidmgs.indexOf("=") != -1) {
        eidmgs = eidmgs.replace("=", "");
    }
    ;
    if (slmgs.indexOf("=") != -1) {
        slmgs = slmgs.replace("=", "");
    }
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        eid: eidmgs || "",//记录号（从接口3中获取）
        sl: slmgs || ""//记录号（从接口3中获取）
    };
    $.ajax({
        async: true,
        type: 'post',
        url: "/heNanHospital/register",
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.rtnCode == "000000") {
                if (data.data.datail) {
                    var url = "/heNanHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=departmentRegister";
                    window.location.href = url;
                }
                ;
            }
            ;
            /*
             *登录后跳转页面
             */
            if (data.retCode == "000000") {
                console.log(data.responseBody)
                sessionStorage.setItem("appointmen", JSON.stringify(data.responseBody));
                sessionStorage.setItem("beGood", mess);
                sessionStorage.setItem("eidRecord", eidmgs);//记录号（从接口3中获取）
                sessionStorage.setItem("slRecord", slmgs)//记录号（从接口3中获取）
                var url = "/heNanHospital?page=appointmenRegistration&randomKey=" + randomKey + "&userID=" + userID +
                    "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=departmentRegister";
                window.location.href = url;
            } else {
                maskTip(data.responseBody.data);
                return;
            }
        },
        error: function () {
            console.log("error")
        }
    })
}
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
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=departmentRegister";
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
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=departmentRegister";
                    window.location.href = url;
                    return;
                }
                var url = "/heNanHospital?page=registeredRecord&randomKey=" + randomKey + "&userID=" + userID +
                    "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=departmentRegister";
                window.location.href = url;
            }
        }
    })
});
/*
 *点击退出
 */
$('#quit').on("click", function () {
    maskTip("退出中。。。");
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