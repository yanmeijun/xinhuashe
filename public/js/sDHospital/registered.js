$(function () {
    var RegResources = {
        id: new RegExp("\\$\\{id\\}", "g"),
        docTitle: new RegExp("\\$\\{docTitle\\}", "g"),
        docName: new RegExp("\\$\\{docName\\}", "g"),
        docIntro: new RegExp("\\$\\{docIntro\\}", "g"),
        docPic: new RegExp("\\$\\{docPic\\}", "g"),
        img_div: new RegExp("\\$\\{img_div\\}", "g")
    };
    var ruleContent = "";
    getDocSchedule();
    function getDocSchedule() {
        var scheduleArr = [], hosCode;
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            hospitalId: hospitalID,
            branchId: branchId,
            deptId: deptId
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/sDHospital/getDocSchedule',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == '000000') {
                hosCode = data.responseBody.hosCode;
                $("#deptName").text(data.responseBody.deptName);
                $("#hosName").text(data.responseBody.hosName);
                for (var item of data.responseBody.ruleContent.split(" ")) {
                    if (item) {
                        ruleContent += "<p>" + item + "</p>";
                    }
                }
                $("#ruleContent").html(ruleContent.slice(0, 100) + '...<a id="show_all" href="javascript:;">&nbsp;更多&gt;</a>');
                var temple = $("#result_template_div").html(), html = "";
                $.each(data.responseBody.docSchedule, function (index, item) {
                    var item_html = "";
                    item_html += temple.replace(RegResources.docName, item.docName)
                        .replace(RegResources.docIntro, item.docIntro)
                        .replace(RegResources.docTitle, item.docTitle)
                        // .replace(RegResources.docPic, item.docPic)
                        // .replace(RegResources.img_err, "http://www.sd12320.gov.cn:80/images/doctor.jpg")
                        .replace(RegResources.img_div, '<img src=' + item.docPic + ' onerror="this.src=\'http://www.sd12320.gov.cn:80/images/doctor.jpg\'" class="photo">')

                    scheduleArr.push({id: index, scheduleAmPmId: item.scheduleAmPmId});
                    //---------------日历头部----start-----------------------------
                    var weekDayUl = "";
                    var am = "";
                    var pm = "";
                    var start = parseInt("1");
                    var end = parseInt("8");
                    var dateStr = "";
                    var weekStr = "";
                    for (var i = start; i < end; i++) {
                        var d = new Date();
                        d.setDate(d.getDate() + i);
                        if (d.getDate() < 10) {
                            if (d.getMonth() < 9) {
                                dateStr = d.getFullYear() + "0" + (d.getMonth() + 1) + "0" + d.getDate();
                                weekStr = getDayName(d.getDay()) + '' + "<br>" + "0" + (d.getMonth() + 1) + '-0' + d.getDate();
                            } else {
                                dateStr = d.getFullYear() + "" + (d.getMonth() + 1) + "0" + d.getDate();
                                weekStr = getDayName(d.getDay()) + '' + "<br>" + (d.getMonth() + 1) + '-0' + d.getDate();
                            }
                        } else {
                            if (d.getMonth() < 9) {
                                dateStr = d.getFullYear() + "0" + (d.getMonth() + 1) + "" + d.getDate();
                                weekStr = getDayName(d.getDay()) + '' + "<br>" + "0" + (d.getMonth() + 1) + '-' + d.getDate();
                            } else {
                                dateStr = d.getFullYear() + "" + (d.getMonth() + 1) + "" + d.getDate();
                                weekStr = getDayName(d.getDay()) + '' + "<br>" + (d.getMonth() + 1) + '-' + d.getDate();
                            }
                        }
                        weekDayUl += "<th value=" + dateStr + ">" + weekStr + "</th>";

                        am += "<td id='" + index + "_AM_" + dateStr + "' onclick='renderTo(this)'></td>";
                        pm += "<td id='" + index + "_PM_" + dateStr + "' onclick='renderTo(this)'></td>";

                    }
                    //---------------日历头部----end-----------------------------
                    var schedule_html = '<tr><td>上午</td>' + am + '</tr><tr><td>下午</td>' + pm + '</tr>';
                    html += '<div class="peccancyQuery userInfor onlyStyle clearfix" id="' + index + '">' + item_html
                        + '<div class="reservationDate sDTableDiv"><table class="reservationList sDTableData"><tr id="weekDayUl_' + index + '"><th>排班</th>' + weekDayUl
                        + '</tr>' + schedule_html + ' </table></div></div>'
                })
                $("#result_div").html(html);
                $.each(scheduleArr, function (_index, _item) {
                    $.each(_item.scheduleAmPmId, function (_index_, _item_) {
                        var data = {
                            randomKey: randomKey,
                            userID: userID,
                            clientID: clientID,
                            cityID: cityID,
                            local_x: local_x ,localFrom:localFrom,
                            local_y: local_y,
                            scheduleAmPmId: _item_,
                            hospitalCode: hosCode
                        };
                        $.ajax({
                            async: true,
                            type: 'post',
                            data: JSON.stringify(data),
                            url: '/sDHospital/getAppNum',
                            contentType: 'application/json',
                            beforeSend: function () {
                                $("#dialogMask,#dialog").show();
                            }
                        }).done(function (data) {
                            // $("#dialogMask,#dialog").hide();
                            if (_index + 1 == scheduleArr.length) {
                                $("#dialogMask,#dialog").hide();
                            }
                            if (data.retCode == '000000') {
                                var info = data.responseBody.schdule;
                                if (info.appNum == info.upLimit) {
                                    var _html = '<span>约满</span>'
                                    $("#" + _item.id + "_" + info.amOrPm + "_" + info.scheduleDate).addClass("expiry");
                                } else {
                                    var _html = '<span>预约</span><p class="remainingNumber">' + info.appNum + "/" + info.upLimit + '</p>'
                                    $("#" + _item.id + "_" + info.amOrPm + "_" + info.scheduleDate).addClass("byAppointment");
                                }
                                $("#" + _item.id + "_" + info.amOrPm + "_" + info.scheduleDate).html(_html);
                                $("#" + _item.id + "_" + info.amOrPm + "_" + info.scheduleDate).attr("scheduleAmPmId", _item_);
                                $("#" + _item.id + "_" + info.amOrPm + "_" + info.scheduleDate).attr("docId", info.docId);
                                $("#" + _item.id + "_" + info.amOrPm + "_" + info.scheduleDate).attr("isPatientCard", info.isPatientCard || "");
                            }
                        })
                    })
                })

            } else if (data.retCode == '000011') {

            }
        });
    }

    $(document).on("touchstart", "a[id='show_all']", function () {
        $("#ruleContent").html(ruleContent + '...<a id="hide_all" href="javascript:;">&nbsp;收起&lt;</a>');
    })
    $(document).on("touchstart", "a[id='hide_all']", function () {
        $("#ruleContent").html(ruleContent.slice(0, 100) + '...<a id="show_all" href="javascript:;">&nbsp;更多&lt;</a>');
    })
    $("img[id='back']").click(function () {
        window.location.href = "/sDHospital?page=details&randomKey="
            + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom
            + "&local_y=" + local_y + "&hospitalID=" + hospitalID + "&hospitalCode=" + hospitalCode + "&branchId=" + branchId;
    })
    function masktime(mgs) {
        $('#masktime').html(mgs)
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    };
})
function renderTo(e) {
    var scheduleAmPmId = $(e).attr("scheduleAmPmId");
    var docId = $(e).attr("docId");
    var isPatientCard = $(e).attr("isPatientCard");
    if (!scheduleAmPmId) {
        return;
    }
    if ($(e).children("span").text() == "约满") {
        return;
    }
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
        data: JSON.stringify(data),
        url: '/sDHospital/getPatientList',
        contentType: 'application/json',
        beforeSend: function () {
            $("#dialogMask,#dialog").show();
        }
    }).done(function (data) {
        $("#dialogMask,#dialog").hide();
        if (data.retCode == '000000') {
            if (data.responseBody.patientList.length == 0) {
                window.location.href = "/sDHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                    "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y +
                    "&comeFrom=registered"
            } else {
                localStorage.setItem('scheduleAmPmId', scheduleAmPmId);
                window.location.href = "/sDHospital?page=appointmenRegistration&randomKey=" + randomKey + "&userID=" + userID +
                    "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y +
                    "&scheduleAmPmId=" + scheduleAmPmId + "&docId=" + docId + "&isPatientCard=" + isPatientCard
            }

        }
    })

}
// 0-6转换成中文名称
function getDayName(day) {
    var day = parseInt(day);
    if (isNaN(day) || day < 0 || day > 6)
        return false;
    var weekday = ["周天", "周一", "周二", "周三", "周四", "周五", "周六"];
    return weekday[day];
}