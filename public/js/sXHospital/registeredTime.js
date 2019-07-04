var deptId = sessionStorage.getItem("deptId");//科室id
var depName = sessionStorage.getItem("depName");//科室名称
var hosId = sessionStorage.getItem("hosId");//从接口task="1"的得到医院记录号hosId
var hosName = sessionStorage.getItem("hosName");

var doctorId = sessionStorage.getItem("doctorId");
var regDate = sessionStorage.getItem("regDate");
var doctorName = sessionStorage.getItem("doctorName");
var regLevel = sessionStorage.getItem("regLevel");
var isTime = sessionStorage.getItem("isTime");
var cliFee = sessionStorage.getItem("cliFee");
var regFee = sessionStorage.getItem("regFee");
var avatar = sessionStorage.getItem("avatar");
var jobTitleName = sessionStorage.getItem("jobTitleName");
if (!jobTitleName) {
    jobTitleName = "";
}
$(function () {
    $('#ks_title').html(hosName + "--" + depName);
    //查询动画提示结束
    $('#dialogMask,#dialog').show();
    doctorDetail();//加载医生详情信息
    specific()//点击有号 选择就诊时间
});
var recode = sessionStorage.getItem("recode");//记录返回路由
// 返回按钮
$('#back').on('click', function () {
    if (recode) {
        sessionStorage.removeItem("recode");
        var url = "/shanxiHospital?page=personRegistered&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        window.location.href = url;
        return;
    } else {
        var url = "/shanxiHospital?page=registered&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        window.location.href = url;
        return;

    }
});

function doctorDetail() {
    var html = "";
    html += "<dt><a href=\"javascript:;\"><img src='http://tpwz.sx.witdoctor.cn:8089/" + avatar + "' class=\"photo\" onerror=\"this.src='http://tpwz.sx.witdoctor.cn:8089//UpPic/no.jpg'\" ></a></dt>" +
        "<dd>";
    //判断是否是专家号
    if (regLevel == '2') {
        html += "<p class=\"nameOffice\"><span>" + doctorName + "</span>专家号</p>";
    } else {
        if (jobTitleName == undefined) {
            html += "<p class=\"nameOffice\"><span>" + doctorName + "</span></p>";
        } else {
            html += "<p class=\"nameOffice\"><span>" + doctorName + "</span>" + jobTitleName + "</p>";
        }

    }
    html += "<p class=\"hospitalName\">" + hosName + "</p>" +
        "<p class=\"introduce\">挂号日期：" + regDate + "</p>" +
        "</dd>";
    $('#source').html(html);
};
function getDateTime() {
    //获取系统当前时间，用于判断当前号源是否过期
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth();
    var date = time.getDate();
    var day = time.getDay();
    var hour = time.getHours();
    var minutes = time.getMinutes();
    var second = time.getSeconds();
    month = month + 1;
    month < 10 ? month = '0' + month : month;
    hour < 10 ? hour = '0' + hour : hour;
    minutes < 10 ? minutes = '0' + minutes : minutes;
    second < 10 ? second = '0' + second : second;
    var now_time = year + "-" + month + "-" + date + ' ' + hour + ':' + minutes + ':' + second;
    return now_time;
}
//点击有号按钮，选择就诊时间
function specific() {
    $("#SurpNumber").empty();
    var curTime = getDateTime();
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        doctorId: doctorId,
        deptCode: deptId,
        hosCode: hosId,
        regDate: regDate,
        isTime: isTime
    };
    $.ajax({
        async: true,
        url: "/shanxiHospital/specific",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                if (data.responseBody.returnCode == "SUCCESS") {
                    var result = data.responseBody;
                    var html = "";
                    html += "<tr>" +
                        "<th class=\"text-left\">时间</th>" +
                        "<th class=\"text-left\">剩余号源</th>" +
                        "<th>挂号费</th>\n" +
                        "<th></th>" +
                        "</tr>"
                    for (var i = 0; i < result.fullData.regTimeList.length; i++) {
                        var regDateTime = regDate + " " + result.fullData.regTimeList[i]["startTime"];
                        var totalFee = parseInt(cliFee + regFee);
                        if (new Date(regDateTime) < new Date(curTime) || result.fullData.regTimeList[i]["over"] == 0 || result.fullData.regTimeList[i]["status"] != 1) {
                            if (result.fullData.regTimeList[i]["status"] == 0) {
                                html += "<tr class=\"noNumber\">";
                            } else {
                                html += "<tr>";
                            }
                            html += "<td class=\"time\">" + result.fullData.regTimeList[i]["startTime"] + "-" + result.fullData.regTimeList[i]["endTime"] + "</td>" +
                                "<td class=\"residualSource\">剩余号源：<span> " + result.fullData.regTimeList[i]["over"] + "</span>/" + result.fullData.regTimeList[i]["total"] + "</td>" +
                                "<td class=\"regFee\">￥" + totalFee / 1000 + "</td>" +
                                "<td>";

                            if (result.fullData.regTimeList[i]["over"] == 0 || result.fullData.regTimeList[i]["status"] == 2 || result.fullData.regTimeList[i]["status"] == 3 || result.fullData.regTimeList[i]["status"] == 4) {
                                html += "</td>" +
                                    "</tr>";
                            } else if (result.fullData.regTimeList[i]["status"] == 0) {
                                html += "<a href=\"javascript:;\" class=\"btn-guahao\">停诊</a></td></tr>";
                            } else {
                                html += "<a href=\"javascript:;\" class=\"btn-guahao\">挂号</a></td></tr>";
                            }
                        }
                        else {
                            html += "<tr>" +
                                "<td class=\"time\">" + result.fullData.regTimeList[i]["startTime"] + "-" + result.fullData.regTimeList[i]["endTime"] + "</td>" +
                                "<td class=\"residualSource\">剩余号源：<span> " + result.fullData.regTimeList[i]["over"] + "</span>/" + result.fullData.regTimeList[i]["total"] + "</td>" +
                                "<td class=\"regFee\">￥" + totalFee / 1000 + "</td>" +
                                "<td>" +
                                "<a href=\"javascript:;\" class=\"btn-guahao\" onclick=regConfirm('" + hosId + "','" + deptId + "','" + doctorId + "','" + regDate + "','" + isTime + "','" + regLevel + "','" + result.fullData.regTimeList[i]["timeFlag"] + "','" + regFee + "','" + cliFee + "','" + totalFee + "','" + result.fullData.regTimeList[i]["startTime"] + "','" + result.fullData.regTimeList[i]["endTime"] + "')>挂号</a>" +
                                "</td>" +
                                "</tr>";
                        }
                    }
                } else {
                    $('#noDate').html("暂无数据，请刷新重试！");
                    $('#noSearchHospital').show();
                    $('#youSearchHospital').hide();
                }
                $("#SurpNumber").append(html);
                $('#noSearchHospital').hide();
                $('#youSearchHospital').show();
            }
        },
        error: function () {
            $('#dialogMask,#dialog').hide();
        }
    })
};

function regConfirm(hospCode, deptCode, docCode, regDateDate, isTime, regLevel, timeFlag, regFee, cliFee, totalFee, startTime, endTime) {
    sessionStorage.setItem("startTime", startTime);
    sessionStorage.setItem("endTime", endTime);
    sessionStorage.setItem("totalFee", totalFee);
    sessionStorage.setItem("timeFlag", timeFlag);
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        docCode: docCode,
        deptCode: deptCode,
        hospCode: hospCode,
        regDateDate: regDateDate,
        isTime: isTime,
        regLevel: regLevel,
        timeFlag: timeFlag,
        regFee: regFee,
        cliFee: cliFee,
        totalFee: totalFee,
        startTime: startTime,
        endTime: endTime,
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
                if (data.responseBody.data == "/User/Login") {
                    var url = "/shanxiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=registeredTime";
                    window.location.href = url;
                } else {
                    var url = "/shanxiHospital?page=registeredConfirm&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=registeredTime";
                    window.location.href = url;
                }
            }
        },
        error: function () {

        }
    })
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
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=registeredTime";
                    window.location.href = url;
                    return;
                } else if (data.responseBody.data == "/User/Login") {
                    var url = "/shanxiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=registeredTime";
                    window.location.href = url;
                    return;
                }
            }
        },
        error: function () {

        }
    });
});



