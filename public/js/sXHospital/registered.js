var deptId = sessionStorage.getItem("deptId");//科室id
var depName = sessionStorage.getItem("depName");//科室名称
var hosId = sessionStorage.getItem("hosId");//从接口task="1"的得到医院记录号hosId
var hosName = sessionStorage.getItem("hosName");
//var docCodeId = sessionStorage.getItem("docCodeId");
var baseStartDate;
var baseMaxRegDays = 7;
var regDateLists = [];
var doctorName;
var regDate = [];
var isHaveBus1 = false;
//定义全局变量
var pageNum = 1, totalPage = 0, falg = false, totalNum = 0;
$(function () {
    getHosParam();
    generateRegDate();
    $('#ks_title').html(hosName + "--" + depName);
    //查询动画提示结束
    $('#dialogMask,#dialog').show();
    load("/shanxiHospital/shaanxiOutpatient")//页面初始化加载
    //获取医院企业渠道业务参数
    getBusiness();
});

function getBusiness() {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        hospId: hosId
    };
    $.ajax({
        async: true,
        url: "/shanxiHospital/GetBusiness",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                if (data.responseBody.returnCode == "SUCCESS") {
                    if (data.responseBody.fullData.businessList[0].busStatus == 2) {
                        isHaveBus1 = true;
                    }
                }
            }
        }
    })

};
// 返回按钮
$('#back').on('click', function () {
    var url = "/shanxiHospital?page=details&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
});
function load(apiUrl) {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        deptCode: deptId,
        hosCode: hosId,
        pageIndex: pageNum,
        pageSize: 10
    };
    $.ajax({
        async: true,
        url: apiUrl,
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            //查询动画提示结束
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                if (data.responseBody.returnCode == "SUCCESS") {
                    totalNum = data.responseBody.fullData.count;//总条数
                    totalPage = Math.ceil(Number(totalNum) / 10);
                    var html = "";
                    var result = data.responseBody;
                    $.each(data.responseBody.fullData.doctorList, function (i, val) {
                        var doctorId = val["doctorId"];
                        html += "<div class=\"peccancyQuery userInfor onlyStyle clearfix\">" +
                            "<dl class=\"hosList hNHosList sXHosList\">" +
                            "<dt><a href=\"javascript:;\"><img src='http://tpwz.sx.witdoctor.cn:8089/" + val.avatar + "' class=\"photo\"   onerror=\"this.src='http://tpwz.sx.witdoctor.cn:8089//UpPic/no.jpg'\"  ></a></dt>" +
                            "<dd>" +
                            "<p class=\"nameOffice\"><span>" + val.doctorName + "</span>" + val.jobTitleName + "</p>" +
                            "<p class=\"hospitalName\">" + hosName + "</p>" +
                            "<p class=\"introduce\">擅长：" + val.special + "</p>" +
                            "</dd>" +
                            "</dl>" +
                            "<div class=\"reservationDate sDTableDiv\">" +
                            "<table class=\"reservationList sDTableData\">" +
                            "<thead><tr id='" + val.doctorId + "' class='calendar'>" +
                            "</tr></thead>";
                        html += "<tr id='" + i + val.doctorId + "'>";
                        for (var h = 0; h < 7; h++) {
                            html += "<td rowspan='2'>" +
                                "<span id=" + i + val.doctorId + regDateLists[h] + "></span>" +
                                "<p class=\"regSort\"></p>" +
                                "</td>";
                        }
                        html += "</tr>";
                        generateRegDate(val.doctorId);
                        html += "</table>" +
                            "</div>" +
                            "</div>";
                    });
                    $('#surplus').append(html);
                    $('#noDate').hide();
                    $('#surplus').show();
                    for (var i = 0; i < data.responseBody.fullData.doctorList.length; i++) {
                        if (data.responseBody.fullData.doctorList[i].doctorSchedulingList != null) {
                            var doctorId = data.responseBody.fullData.doctorList[i]["doctorId"];
                            var deptId = data.responseBody.fullData.doctorList[i]["deptId"];
                            for (var k = 0; k < result.fullData.doctorList[i].doctorSchedulingList.length; k++) {
                                doctorName = result.fullData.doctorList[i]["doctorName"];
                                regDateList = result.fullData.doctorList[i].doctorSchedulingList[0]["regDateList"];
                                for (var f = 0; f < regDateList.length; f++) {
                                    regDate = regDateList[f].regDate;
                                    var w = 0;
                                    var regLevel;
                                    var isTime = -1;
                                    var regState;
                                    var isStop = 0;
                                    var isAll = 0;
                                    var cliFee = 0;
                                    var regFee = 0;
                                    for (var m = 0; m < regDateList[f]["regTimeList"].length; m++) {
                                        if (isTime != 0) {
                                            isTime = regDateList[f]["regTimeList"][m]["isTime"];
                                        }
                                        regLevel = regDateList[f]["regTimeList"][m]["regLevel"];
                                        regState = regDateList[f]["regTimeList"][m]["status"];
                                        cliFee = regDateList[f]["regTimeList"][m]["cliFee"];
                                        regFee = regDateList[f]["regTimeList"][m]["regFee"];
                                        if (regState == 0) {
                                            isStop += isStop + 1;
                                            continue;
                                        }
                                        if (regDateList[f]["regTimeList"][m]["over"] > 0) {
                                            w = w + 1;
                                        } else {
                                            isAll += isAll + 1;
                                        }
                                    }
                                    // 判断是否有号： i>0 有号 i=0 已满
                                    if (w > 0) {
                                        //是专家
                                        if (regLevel == '2') {
                                            generateFunction1(i + doctorId, regDate, hosId, deptId, doctorId, regDate, doctorName, regLevel, isTime, cliFee, regFee, data.responseBody.fullData.doctorList[i]["avatar"], data.responseBody.fullData.doctorList[i].jobTitleName);
                                        }
                                        else {
                                            generateFunction2(i + doctorId, regDate, hosId, deptId, doctorId, regDate, doctorName, regLevel, isTime, cliFee, regFee, data.responseBody.fullData.doctorList[i]["avatar"], data.responseBody.fullData.doctorList[i].jobTitleName);
                                        }
                                    }
                                    else {
                                        if (isStop > 0 && isAll == 0) {
                                            $("#" + i + doctorId + regDate).html("停诊");
                                            $("#" + i + doctorId + regDate).css("color", "#da3549");
                                        } else {
                                            if (isAll > 0) {
                                                $("#" + i + doctorId + regDate).html("已满");
                                                $("#" + i + doctorId + regDate).parent().addClass("byAppointment");
                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }
                    falg = true;
                } else {
                    $('#noDate').show();
                    $('#surplus').hide();
                }
            } else {
                $('#noDate').show();
                $('#surplus').hide();
            }
        },
        error: function () {

        }
    })
};
//下拉加载
$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(window).height();
    if (scrollTop + windowHeight >= scrollHeight - 10) {
        if (pageNum >= totalPage) {
            return;
        }
        if (falg) {
            //查询动画提示结束
            $('#dialogMask,#dialog').show();
            falg = false;
            pageNum++;
            regDateLists = [];
            generateRegDate();
            load("/shanxiHospital/shaanxiOutpatient")//页面初始化加载
        }
    }
});

function getHosParam() {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        hosCode: hosId,
    };
    $.ajax({
        async: true,
        url: "/shanxiHospital/caldate",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                var result = data.responseBody;
                var resultValue = result.fullData;
                if (resultValue.preregTimerule == "1") {
                    var dateNow = new Date();
                    var dateTimepoint = dateNow.getFullYear() + "/" + (dateNow.getMonth() + 1) + "/" + dateNow.getDate() + " " + resultValue.preregbTimepoint + ":00";
                    var timepoint = new Date(dateTimepoint);
                    if (timepoint > dateNow) {
                        baseMaxRegDays = resultValue.preregbEdays - resultValue.preregbBdays + 1;
                        baseStartDate = getDate(new Date(dateNow.getTime() + 86400000 * resultValue.preregbBdays));

                    } else {
                        baseMaxRegDays = resultValue.preregeEdays - resultValue.preregeBdays + 1;
                        baseStartDate = getDate(new Date(dateNow.getTime() + 86400000 * resultValue.preregeBdays));
                    }
                } else {
                    if (resultValue.maxResDt != "") {
                        baseMaxRegDays = resultValue.maxResDt;
                    }
                }
            }
        }
    })
};

function getDate(date) {
    if (!date) {
        return null
    }
    var d = new Date(date);
    return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
}

//加载排班上面日期
function generateRegDate(docId) {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        hosCode: hosId,
        startDate: baseStartDate,
        maxRegDays: baseMaxRegDays
    };
    $.ajax({
        async: true,
        url: "/shanxiHospital/calendar",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            var html = "";
            var htmls = ""
            var result = data.responseBody;
            for (var i = 0; i < result.length; i++) {
                var date = result[i]["day"].split("-")[1] + "-" + result[i]["day"].split("-")[2];
                html += "<th  id=" + result[i]["day"] + ">" + result[i]["week"] + "<br>" + date + "</th>";
                regDateLists.push(result[i]["day"])
            }
            ;
            $("#" + docId).append(html);
        }
    })
};
//专家有号事件
function generateFunction1(doctorIdindex, regDate, baseHosCode, baseDeptCode, doctorId, regDate, doctorName, regLevel, isTime, cliFee, regFee, avatar, jobTitleName) {
    var doctorIdTrim = doctorIdindex.replace(/^\s+|\s+$/g, "");
    $("#" + doctorIdTrim + regDate).empty();
    $("#" + doctorIdTrim + regDate).attr("class", "zjh").append("<span>有号</span> <p class=\"regSort\">专家号</p>").bind("click", function () {
        regDetailInfo(baseHosCode, baseDeptCode, doctorId, regDate, doctorName, regLevel, isTime, cliFee, regFee, avatar, jobTitleName)
    });
    $("#" + doctorIdTrim + regDate).css("color", "#4588f9");
}
//有号事件
function generateFunction2(doctorIdindex, regDate, baseHosCode, baseDeptCode, doctorId, regDate, doctorName, regLevel, isTime, cliFee, regFee, avatar, jobTitleName) {
    var doctorIdTrim = doctorIdindex.replace(/^\s+|\s+$/g, "");
    $("#" + doctorIdTrim + regDate).empty();
    $("#" + doctorIdTrim + regDate).attr("class", "youSou").append("有号").bind("click", function () {
        regDetailInfo(baseHosCode, baseDeptCode, doctorId, regDate, doctorName, regLevel, isTime, cliFee, regFee, avatar, jobTitleName)
    });
    $("#" + doctorIdTrim + regDate).css("color", "#4588f9");
};

//排班点击事件
function regDetailInfo(hosCode, deptCode, doctorId, regDate, doctorName, regLevel, isTime, cliFee, regFee, avatar, jobTitleName) {
    if (isHaveBus1) {
        maskTip("医院未开通挂号业务！");
        return;
    }
    //if (isTime == 1) {
    //    getSchedulingTime(hosCode, deptCode, doctorId, regDate, doctorName, regLevel, isTime);
    //}
    //else {
    //    getDayScheduling(hosCode, deptCode, doctorId, regDate, doctorName, regLevel, isTime);
    //}
    //getDocAndReg(hosCode, deptCode, doctorId, regDate, doctorName, regLevel, isTime, cliFee, regFee)
    sessionStorage.setItem("doctorId", doctorId);
    sessionStorage.setItem("regDate", regDate);
    sessionStorage.setItem("doctorName", doctorName);
    sessionStorage.setItem("regLevel", regLevel);
    sessionStorage.setItem("isTime", isTime);
    sessionStorage.setItem("cliFee", cliFee);
    sessionStorage.setItem("regFee", regFee);
    sessionStorage.setItem("avatar", avatar);
    sessionStorage.setItem("jobTitleName", jobTitleName);
    var url = "/shanxiHospital?page=registeredTime&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=registered";
    window.location.href = url;
};

/*点击个人中心查看订单详情*/
$('#personalCenter').on("click", function () {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        docCode: "6580",
        deptCode: "2783",
        hospCode: "61010009",
        regDateDate: "2018-10-16",
        isTime: "1",
        regLevel: "1",
        timeFlag: "2",
        regFee: "0",
        cliFee: "0",
        totalFee: "0",
        startTime: "14:30",
        endTime: "15:00",
        accountId: "",
        muserId: ""
    };
    $.ajax({
        async: true,
        url: "/shanxiHospital/patientInfo",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                if (data.responseBody.returnCode == 'SUCCESS') {
                    var url = "/shanxiHospital?page=personalCenter&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=registered";
                    window.location.href = url;
                    return;
                } else if (data.responseBody.data == "/User/Login") {
                    var url = "/shanxiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=registered";
                    window.location.href = url;
                    return;
                }
            }
        },
        error: function () {

        }
    });
});