var doctorId = sessionStorage.getItem("doctorId");
var doctorName = encodeURI(encodeURI(sessionStorage.getItem("doctorName")));
var hosId, deptId;
$(function () {
    confirmQuit()
    /*
     *查询动画提示结束
     */
    $('#dialogMask,#dialog').show();
    getOnlyDoctor("", "");//页面初始化加载
});
function getOnlyDoctor(deptId, hosId) {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        doctorId: doctorId,
        doctorName: doctorName,
        deptId: deptId,
        hosId: hosId
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/getOnlyDoctor",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            /**查询动画提示结束**/
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                var urlsearch = data.responseBody.data;
                hosId = urlsearch.split("?")[1].split("&")[1].replace("hosId=", "");
                deptId = urlsearch.split("?")[1].split("&")[2].replace("deptId=", "");
                getTime(deptId, hosId);
                getDoctorDetail(deptId, hosId);
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
}

function getTime(dept, hos) {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        doctorId: doctorId,
        doctorName: doctorName,
        deptId: dept,
        hosId: hos
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/getTime",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                if ("ERROR_0" == data.responseBody.code) {
                    maskTip(data.responseBody.data.msg);
                    return false;
                }
                if ("ERROR_1" == data.responseBody.code) {
                    maskTip("请求数据失败");
                    return false;
                }
                var items = data.responseBody.PAGE;
                items.sort(createComparisonFunc("S_DATE"));
                var sourceDateInfo = "<tr><th>排班</th>";
                var sourceInfo_M = "<tr><td>上午</td>"//上午号源
                var sourceInfo_A = "<tr><td>下午</td>"//下午号源
                $.each(items, function (i, n) {
                    if (i % 2 == 0) {
                        sourceDateInfo += "<th>" + items[i].S_WEEK + "<br>" + items[i].S_DATE.substring(5) + "</th>";
                    }
                    if ("0" == items[i].PRODUCT_PERIOD) {
                        if ("" == items[i].PRODUCT_ID || null == items[i].PRODUCT_ID || "null" == items[i].PRODUCT_ID) {
                            sourceInfo_M += "<td class=\"byAppointment\"></td>";
                        } else {
                            if (0 >= items[i].SURPLUS) {
                                sourceInfo_M += "<td class=\"expiry\">约满</td>";
                            } else {
                                sourceInfo_M += "<td class=\"byAppointment\">" +
                                    "<span onclick=\"click_order('" + n.PRODUCT_ID + "','" + n.S_DATE + "','" + n.PRODUCT_PERIOD + "','" + hos + "','" + dept + "')\">有号</span>" +
                                    "<p class=\"numBlue\">" + items[i].SURPLUS + "</p>" +
                                    "</td>";
                            }
                        }
                    } else if ("1" == items[i].PRODUCT_PERIOD) {
                        if ("" == items[i].PRODUCT_ID || null == items[i].PRODUCT_ID || "null" == items[i].PRODUCT_ID) {
                            sourceInfo_A += "<td class=\"byAppointment\"></td>";
                        } else {
                            if (0 >= items[i].SURPLUS) {
                                sourceInfo_A += "<td class=\"expiry\">约满</td>";
                            } else {
                                sourceInfo_A += "<td class=\"byAppointment\">" +
                                    "<span onclick=\"click_order('" + n.PRODUCT_ID + "','" + n.S_DATE + "','" + n.PRODUCT_PERIOD + "','" + hos + "','" + dept + "')\">有号</span>" +
                                    "<p class=\"numBlue\">" + items[i].SURPLUS + "</p>" +
                                    "</td>";
                            }
                        }
                    } else {
                        if (i % 2 == 0) {
                            sourceInfo_M += "<li class=\"over\"></li>";
                            sourceInfo_A += "<li class=\"over\"></li>";
                        }
                    }
                });
                sourceDateInfo += "</tr>";
                sourceInfo_M += "</tr>";
                sourceInfo_A += "</tr>";
                $("#sourceInfo").empty();
                $("#sourceInfo").append(sourceDateInfo).append(sourceInfo_M).append(sourceInfo_A);
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
}
//根据给定属性排序
function createComparisonFunc(propertyName) {
    return function (object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];

        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    };
}
function getDoctorDetail(dept, hos) {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        doctorId: doctorId,
        deptId: dept,
        hosId: hos
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/getDoctorDetail",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                if ("ERROR_0" == data.responseBody.code) {
                    maskTip(data.responseBody.data.msg);
                    return false;
                }
                if ("ERROR_1" == data.responseBody.code) {
                    maskTip("请求数据失败");
                    return false;
                }
                var html = '';
                html += '<dl class="hosList hNHosList sXHosList">' +
                    '<dt><a href="javascript:;">';
                if ("" == data.responseBody.DOCTOR_IMG || null == data.responseBody.DOCTOR_IMG || "null" == data.responseBody.DOCTOR_IMG) {
                    imgAddr = "/images/anhuiHospital/noDoctors.png";
                    html += '<img src="/images/anhuiHospital/noDoctors.png" class="photo"></a>';
                } else {
                    html += '<img src="' + data.responseBody.DOCTOR_IMG + '" class="photo"></a>';
                }
                html += '</dt>' +
                    '<dd><p class="nameOffice"><span>' + data.responseBody.DOCTOR_NAME + '</span>' + data.responseBody.DOCTOR_TITLE + '</p>' +
                    '<p class="hospitalName">' + data.responseBody.HOS_NAME + '</p>' +
                    '<p class="introduce">' + data.responseBody.DOCTOR_DOMAIN + '</p>' +
                    '</dd></dl>';
                $('#getDoctorDetail').html(html);
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
}
$('#back').on("click", function () {
    var url = "/anhuiHospital?page=anhuiHospital&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
})
function click_order(sourceId, dateTime, period, sid, did) {
    //shopId="+sid+"&depaId="+did+"&sourceId="+sourceId+"&dateTime="+dateTime+"&period="+period+"&menuIndex=2;
    sessionStorage.setItem("shopId", sid);
    sessionStorage.setItem("depaId", did);
    sessionStorage.setItem("sourceId", sourceId);
    sessionStorage.setItem("dateTime", dateTime);
    sessionStorage.setItem("period", period);
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        depaId: did,
        sourceId: sourceId,
        dateTime: dateTime,
        period: period,
        shopId: sid
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/appointmentTime",
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
                            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=openDoctorPage";
                        window.location.href = url;
                    }
                } else {
                    sessionStorage.setItem("record", "openDoctorPage");
                    var url = "/anhuiHospital?page=appointmenRegistration&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                    window.location.href = url;
                }
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
}


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
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=openDoctorPage";
                    window.location.href = url;
                    return false;
                }
            }
            var url = "/anhuiHospital?page=userCenter&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=openDoctorPage";
            window.location.href = url;
            return false;
        }
    })
})


function confirmQuit() {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        pageNo: 0,
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
                    $('#quit').css("display", "none");
                    return;
                }
            }
            ;
            $('#quit').css("display", "block");
        }
    })
}