var DeptcodeId = sessionStorage.getItem("deptId");//科室id
var depName = sessionStorage.getItem("depName");//科室名称
var hosId = sessionStorage.getItem("hosId");//从接口task="1"的得到医院记录号hosId
var hosName = sessionStorage.getItem("hosName");
var docCodeId = sessionStorage.getItem("docCodeId");
var baseStartDate;
var baseMaxRegDays = 7;
var regDateLists = [];
var doctorName;
var regDate = [];
var isHaveBus1 = false;
var avatarImg;
var jobTitleName;
//定义全局变量
var pageNum = 1, totalPage = 0, falg = false, totalNum = 0;
$(function () {
    //getHosParam();
    //generateRegDate();
    $('#ks_title').html(hosName + "--" + depName);
    //查询动画提示结束
    $('#dialogMask,#dialog').show();
    load("/shanxiHospital/doctorSpecialty")//页面初始化加载
    //获取医院企业渠道业务参数
    getBusiness();
    getScheduling();
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
    var url = "/shanxiHospital?page=shanxiHospital&randomKey=" + randomKey + "&userID=" + userID +
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
        Deptcode: DeptcodeId,//deptId（从接口科室信息中获取）
        HosId: hosId,//hosId（从接口默认展示医院中获取）
        DocId: docCodeId,//doctorId (从科室门诊详情 余量查询)
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
                    $.each(data.responseBody.fullData.DoctorListInfoList, function (i, val) {
                        var doctorId = val["doctorId"];
                        avatarImg = val.docImg;
                        jobTitleName = val.docJob
                        html += "<dl class=\"hosList hNHosList sXHosList\">" +
                            "<dt><a href=\"javascript:;\"><img src='http://tpwz.sx.witdoctor.cn:8089/" + val.docImg + "' class=\"photo\"></a></dt>" +
                            "<dd>" +
                            "<p class=\"nameOffice\"><span>" + val.docName + "</span>" + val.docJob + "</p>" +
                            "<p class=\"hospitalName\">" + hosName + "</p>" +
                            "<p class=\"introduce\">擅长：" + val.specialty + "</p>" +
                            "</dd>" +
                            "</dl>";
                    });
                    $('#surplus').append(html);
                    $('#noDate').hide();
                    $('#surplus').show();
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
            load("/shanxiHospital/doctorSpecialty");//页面初始化加载
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

//获取医生不分时排班信息
function getScheduling() {
    $("#SchedulingData").empty();
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        doctorId: docCodeId,//doctorId (从科室门诊详情 余量查询)
        deptCode: DeptcodeId,//deptId（从接口科室信息中获取）
        hosCode: hosId,//hosId（从接口默认展示医院中获取）
        pageIndex: 1,
        pageSize: 100,
        maxRegDays: baseMaxRegDays
    };
    $.ajax({
        async: true,
        url: "/shanxiHospital/visitTime",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                var result = data.responseBody
                if (result.returnCode == 'SUCCESS') {
                    var show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
                    var dateHtml = "";
                    var Html = "";
                    for (var i = 0; i < baseMaxRegDays; i++) {
                        var time = new Date();
                        if (baseStartDate != null) {
                            time = new Date(baseStartDate.getTime() + 86400000 * i);
                        } else {
                            time = new Date(time.getTime() + 86400000 * (i + 1));
                        }
                        var year = time.getFullYear();
                        var month = time.getMonth();
                        month = month + 1;
                        if (month < 10) {
                            month = '0' + month;
                        }
                        var day = time.getDay();
                        var date = time.getDate();
                        if (date < 10) {
                            date = '0' + date;
                        }
                        var times = year + '-' + month + '-' + date;
                        var weaksIno = show_day[day];
                        dateHtml += "<th> " + weaksIno + "<br>" + month + '-' + date + "</th>";

                        var regDateData = "";
                        var chargeDate = 0;
                        var dataNum = 0;
                        var docName = result.fullData.doctorSchedulingList[0].doctorName;
                        for (var j = 0; j < result.fullData.doctorSchedulingList[0].dateCount; j++) {
                            regDateData = result.fullData.doctorSchedulingList[0].regDateList[j]["regDate"];
                            if (times == regDateData) {
                                chargeDate = 1;
                                dataNum = j;
                                break;
                            } else {
                                chargeDate = 0;
                            }
                        }
                        if (times == regDateData && chargeDate == 1) {
                            var haveNum = 0;//0 没有号源  1 有号   2  已满
                            var regLevel = 0;//  1 普通   2 专家   3 急诊
                            var isTime = -1;//默认给个-1  1 表示分时 0 表示不分时
                            var timeFlag = 2;
                            var isStop = 0;
                            var cliFee = 0;
                            var regFee = 0;
                            for (var k = 0; k < result.fullData.doctorSchedulingList[0].regDateList[dataNum]["regTimeList"].length; k++) {

                                if (isTime != 0) {
                                    isTime = result.fullData.doctorSchedulingList[0].regDateList[dataNum].regTimeList[k]["isTime"];//是否分时
                                }
                                var regOver = result.fullData.doctorSchedulingList[0].regDateList[dataNum].regTimeList[k]["over"];//剩余号源数
                                var total = result.fullData.doctorSchedulingList[0].regDateList[dataNum].regTimeList[k]["total"];//总号源数
                                regLevel = result.fullData.doctorSchedulingList[0].regDateList[dataNum].regTimeList[k]["regLevel"];//挂号级别
                                //   var timeFlag = result.fullData.doctorSchedulingList[0].regDateList[j].regTimeList[k]["timeFlag"];//午别
                                var schedu_state = result.fullData.doctorSchedulingList[0].regDateList[dataNum].regTimeList[k]["status"];//放号状态
                                cliFee = result.fullData.doctorSchedulingList[0].regDateList[dataNum].regTimeList[k]["cliFee"];
                                regFee = result.fullData.doctorSchedulingList[0].regDateList[dataNum].regTimeList[k]["regFee"];
                                if (regOver > 0 && total > 0) {//总号源数必须大于0
                                    if (schedu_state == 0) {
                                        isStop += isStop + 1;
                                        continue;
                                    }
                                    if (haveNum != 1) {
                                        haveNum = 1;//有号
                                    }

                                } else {
                                    if (haveNum != 1) {
                                        haveNum = 2;//已满
                                    }
                                }
                            }
                            //循环每天的号源情况
                            if (haveNum == 1) {//有号
                                if (regLevel == 2) {
                                    Html += "<td class='youSou'  onclick='regDetailInfo(" + "\"" + hosId + "\"" + "," + "\"" + DeptcodeId + "\"" + "," + "\"" + docCodeId + "\"" + ",\"" + regDateData + "\",\"" + docName + "\"," + isTime + "," + regLevel + "," + cliFee + "," + regFee + ",\"" + avatarImg + "\",\"" + jobTitleName + "\")' ><span>" + "有号" + "</span><p>" + "专家号" + "</p> </td>";
                                    continue;
                                } else {
                                    Html += "<td class='youSou' style='color:#4588f9' onclick='regDetailInfo(" + "\"" + hosId + "\"" + "," + "\"" + DeptcodeId + "\"" + "," + "\"" + docCodeId + "\"" + ",\"" + regDateData + "\",\"" + docName + "\"," + isTime + "," + regLevel + "," + cliFee + "," + regFee + ",\"" + avatarImg + "\",\"" + jobTitleName + "\")' >" + "有号" + "</td>";
                                    continue;
                                }

                            } else {
                                if (isStop > 0 && haveNum != 2) {
                                    Html += "<td class='noSou'>" + "停诊" + "</td>";
                                    continue;
                                } else {
                                    Html += "<td class='byAppointment'><span>" + "已满" + "</span></td>";
                                    continue;
                                }
                                if (haveNum == 0) {
                                    Html += "<td>  </td>";
                                    continue;
                                }
                            }
                        } else {
                            Html += "<td>  </td>";
                            continue;
                        }
                    }

                    $("#SchedulingDate").html(dateHtml);
                    $("#ScheduDate").html(Html);

                }
                else {
                    //直接拼接头部的日期信息栏目
                    var show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
                    var dateHtml = "";
                    for (var i = 0; i < baseMaxRegDays; i++) {
                        var time = new Date();
                        if (baseStartDate != null) {
                            time = new Date(baseStartDate.getTime() + 86400000 * i);
                        } else {
                            time = new Date(time.getTime() + 86400000 * i);
                        }
                        var year = time.getFullYear();
                        var month = time.getMonth();
                        month = month + 1;
                        if (month < 10) {
                            month = '0' + month;
                        }
                        var day = time.getDay();
                        var date = time.getDate();
                        if (date < 10) {
                            date = '0' + date;
                        }
                        var times = year + '-' + month + '-' + date;

                        var weaksIno = show_day[day];
                        dateHtml += "<th> " + weaksIno + "<br>" + month + '-' + date + "</th>";


                    }
                    $("#SchedulingDate").append(dateHtml);

                    if (result.returnCode == 'SYS_NODATA') {
                        ;
                    } else if (result.returnCode == "11010104") {
                        maskTip(result.returnMsg);
                    } else {
                        //alert("再刷新一次!");
                        maskTip("再刷新一次!");
                        return;

                    }
                }
            }
        },
        error: function () {

        }
    });
};
//排班点击事件
function regDetailInfo(hosCode, deptCode, doctorId, regDate, doctorName, regLevel, isTime, cliFee, regFee, avatar, jobTitleName) {
    if (isHaveBus1) {
        maskTip("医院未开通挂号业务！");
        return;
    }
    sessionStorage.setItem("recode", "recode");//记录返回路由
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
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=personRegistered";
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
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=personRegistered";
                    window.location.href = url;
                    return;
                } else if (data.responseBody.data == "/User/Login") {
                    var url = "/shanxiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=personRegistered";
                    window.location.href = url;
                    return;
                }
            }
        },
        error: function () {

        }
    });
});


//registered