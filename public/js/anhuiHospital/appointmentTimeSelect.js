var pageNo = 1, totlePage = 0, falg = true;//定义全局变量
var shopId = sessionStorage.getItem("shopId");
var depaId = sessionStorage.getItem("depaId");
var dateTimes;
var pageSize = 10;
var menuIndex = 1;
$(function () {
    confirmQuit();
    /*
     *查询动画提示结束
     */
    $('#dialogMask,#dialog').show();
});
//日期
//--------------------------------
var times = "";
times += '<tr><th>排班</th>';
for (var i = 1; i < 8; i++) {
    var date = new Date();
    date.setDate(date.getDate() + i);
    var week;
    switch (date.getDay()) {
        case 1:
            week = "周一";
            break;
        case 2:
            week = "周二";
            break;
        case 3:
            week = "周三";
            break;
        case 4:
            week = "周四";
            break;
        case 5:
            week = "周五";
            break;
        case 6:
            week = "周六";
            break;
        default:
            week = "周日";
    }
    var dayTime = date.getFullYear() + "-" + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1)) + "-" + (date.getDate() >= 10 ? date.getDate() : "0" + date.getDate());
    if (i == 1) {
        dateTimes = dayTime;
    }
    var day = (date.getMonth() + 1) + "/" + date.getDate();
    var timePos = "";
    if (i == 1) {
        timePos = "sele";
        getSurplus(dayTime, 0);
    } else if (i == 7) {
        timePos = "last-date";
    }
    times += '<th class="date-screen ' + timePos + '" mark="' + dayTime + '">' + week + '<br>' + day + '</th>';
}
times += '</tr>';
//--------------------------------
function getSurplus(dayTimes, pageNo) {
    $('#dialogMask,#dialog').show();
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        pageNo: pageNo,
        pageSize: pageSize,
        shopId: shopId,
        depaId: depaId,
        dayTimes: dayTimes
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/getSurplus",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            /**查询动画提示结束**/
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                if (data.responseBody.CODE == "1") {
                    maskTip(data.responseBody.MSG);
                    return false;
                }
                totlePage = data.responseBody.TOTAL_PAGE;
                //如果是第一页,清除内容
                if (pageNo == 0) {
                    $("#havaData").empty();
                }
                if (data.responseBody.PAGE.length == 0) {
                    $('#noData').show();
                }
                //医生
                var sourceList = data.responseBody.PAGE;
                //存储医生列表
                var sources = "";
                //循环展现医生
                $.each(sourceList, function (i, e) {
                    //显示医院和科室
                    if (i == 0 && menuIndex != "3") {
                        $("#hospital").html(e.HOS_NAME);
                        $("#department").html(e.DEPT_NAME);
                    }
                    //图片是空的时候
                    var img = e.NS_IMAGE;
                    if (img == "") {
                        img = "/images/anhuiHospital/noDoctors.png";
                    }
                    //相差的天数筛选
                    var dayIsExist = false;
                    //拼装擅长
                    var specs = e.NS_SPECIALTY.split(";");
                    var spec = "";
                    for (var a = 0; a < specs.length; a++) {
                        if (specs[a] != "") {
                            spec += '<span>' + specs[a] + '</span>';
                        }
                    }
                    //判断是不是最后一个
                    /*  var dlast="";
                     if((docnum-1) == (pageNo*pageSize+i)){
                     dlast="style=' border-bottom: 0px; '";
                     }*/
                    var sourceInfo = '<div class="peccancyQuery userInfor onlyStyle clearfix">' +
                        '<dl class="hosList hNHosList sXHosList">' +
                        '<dt><a href="javascript:;"><img src="' + img + '" class="photo"></a>' +
                        '</dt><dd><p class="nameOffice"><span>' + e.NS_NAME + '</span></p>' +
                        '<p class="hospitalName">' + e.HOS_NAME + '</p>' +
                        '<p class="introduce">' + e.DEPT_NAME + '</p></dd>' +
                        '</dl>'
                    //循环号源

                    var morAftHead = '<div class="reservationDate sDTableDiv">' +
                        '<table class="reservationList sDTableData">';
                    var timesDate = '<tr><th>排班</th>'
                    var morsource = '</tr><tr>' +
                        '<td>上午</td>';
                    var aftsource = '</tr><tr>' +
                        '<td>下午</td>';
                    //replace
                    var daynum = e.DAYNUM.split(";");

                    var mors = '';
                    var afts = '';
                    var lastday;
                    for (var l = 1; l < 8; l++) {
                        var date = new Date();
                        date.setDate(date.getDate() + l);
                        //日期    根据日期
                        var dayTime = date.getFullYear() + "-" + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1)) + "-" + (date.getDate() >= 10 ? date.getDate() : "0" + date.getDate());
                        if (l == 7) {
                            lastday = dayTime;
                        }
                        var week;
                        switch (date.getDay()) {
                            case 1:
                                week = "周一";
                                break;
                            case 2:
                                week = "周二";
                                break;
                            case 3:
                                week = "周三";
                                break;
                            case 4:
                                week = "周四";
                                break;
                            case 5:
                                week = "周五";
                                break;
                            case 6:
                                week = "周六";
                                break;
                            default:
                                week = "周日";
                        }
                        var day = (date.getMonth() + 1) + "/" + date.getDate();
                        timesDate += '<th  mark="' + dayTime + '">' + week + '<br>' + day + '</th>';
                        mors += '<td class="byAppointment" ident="' + dayTime + '"></td>';
                        afts += '<td class="byAppointment" ident="' + dayTime + '"></td>';
                    }

                    $.each(daynum, function (j, v) {
                        var vals = v.split("##");
                        if (vals[1] == dayTimes) {
                            dayIsExist = true;  //有号源
                        }

                        var lival = "";
                        //判断是不是最后两个
                        var is_last = "";
                        if (vals[1] == lastday) {
                            is_last = " lastli ";
                        }
                        //判断号源不是不是没有了
                        var is_sourceNum = "";
                        if (vals[2] == 0) {
                            is_sourceNum = " source-full ";
                            lival = "约满";
                        }
                        //判断是不是有号号源
                        var is_yesSource = "";
                        var markx = "";

                        if (vals[2] > 0) {

                            markx = ' mark=\'' + vals[2] + '\' onclick=\'click_yy("' + vals[0] + '","' + vals[1] + '","' + vals[3] + '","' + e.HOS_ID + '","' + e.DEPT_ID + '","' + e.NS_NAME + '")\'';
                            lival = '<span>有号</span><br><p>' + vals[2] + '</p>';
                        }
                        //封装数据
                        if (vals[3] == 0) {
                            mors = mors.replace(new RegExp('<td class="byAppointment" ident="' + vals[1] + '"></td>', 'g'), '<td class="byAppointment" ' + markx + '>' + lival + '</td>');
                        } else if (vals[3] == 1) {
                            afts = afts.replace(new RegExp('<td class="byAppointment" ident="' + vals[1] + '"></td>', 'g'), '<td class="byAppointment" ' + markx + '>' + lival + '</td>');
                            var inz = 1;
                        }
                    });
                    mors = mors.replace(new RegExp('<td class="byAppointment" ident="' + lastday + '"></td>', 'g'), '<td class="byAppointment"></td>');
                    afts = afts.replace(new RegExp('<td class="byAppointment" ident="' + lastday + '"></td>', 'g'), '<td class="byAppointment"></td>');

                    morsource += mors;
                    aftsource += afts;
                    //加上底部
                    sourceInfo += morAftHead + timesDate + morsource + aftsource + '</tr></table></div></div>';
                    sources += sourceInfo;
                });

                $("#havaData").append(sources);
                $('#noData').hide();
                falg = true;
                if (sources == "" && pageNo == 0) {
                    $('#noData').show();
                    sources += '<div class="searchEmptyBox noDoctors">' +
                        '<div class="emptyPic"><img src="/images/anhuiHospital/noDoctors.png"></div>' +
                        '<div class="words">抱歉，此科室没有医生坐诊</div></div>';
                }
                /* if(!dayIsExist && pageNo == 0){
                 maskTip("抱歉，当天没有医生坐诊，请预约其他日期");
                 }*/

            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
}
/*
 *下拉加载
 */
$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(window).height();
    if (scrollTop + windowHeight >= scrollHeight - 10) {
        if (pageNo >= totlePage) {
            falg = false;
            return false;
        }
        if (falg) {
            falg = false;
            pageNo++;
            getSurplus(dateTimes, pageNo)
        }
    }
});
$('#back').click(function () {
    var url = "/anhuiHospital?page=selectDepartment&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
})
//预约的点击事件
//-----------------------
function click_yy(sourceId, dateTime, period, sid, did, nsName) {
    sessionStorage.setItem("sourceId", sourceId);
    sessionStorage.setItem("dateTime", dateTime);
    sessionStorage.setItem("period", period);
    sessionStorage.setItem("shopId", sid);
    sessionStorage.setItem("depaId", did);
    sessionStorage.setItem("nsName", nsName);
    sessionStorage.setItem("urlsearch", "?shopId=" + sid + "&nsName=" + encodeURI(encodeURI(nsName)) + "&depaId=" + did + "&sourceId=" + sourceId + "&dateTime=" + dateTime + "&period=" + period + "&menuIndex=" + menuIndex);
    $('#dialogMask,#dialog').show();
    var pageSize = "1000";
    var pageNo = "0";
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        pageSize: pageSize,
        pageNo: pageNo
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/appointment",
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
                            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=appointmentTimeSelect";
                        ;
                        window.location.href = url;
                    }
                } else {
                    sessionStorage.setItem("record", "appointmenRegistration");
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
    //location.href=projectName+"/jsp/appointment/fillPatientInfo.jsp?shopId="+sid+"&nsName="+encodeURI(encodeURI(nsName))+"&depaId="+did+"&sourceId="+sourceId+"&dateTime="+dateTime+"&period="+period+"&menuIndex="+menuIndex;
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
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=appointmentTimeSelect";
                    window.location.href = url;
                    return false;
                }
            }
            var url = "/anhuiHospital?page=userCenter&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=appointmentTimeSelect";
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