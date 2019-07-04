$(function () {
    var RegResources = {
        doctorName: new RegExp("\\$\\{doctorName\\}", "g"),
        doctorTitle: new RegExp("\\$\\{doctorTitle\\}", "g"),
        hospitalName: new RegExp("\\$\\{hospitalName\\}", "g"),
        deptName: new RegExp("\\$\\{deptName\\}", "g"),
        timeTable: new RegExp("\\$\\{timeTable\\}", "g")
    };
    // localStorage.setItem('comeFrom2',comeFrom2);
    getDocList();
    function getDocList() {
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            hospitalId: deptId.split("-")[0],
            deptId: deptId,
            city: cityID,
            pageIndex: '1',
            pageSize: '10'
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/jxHospital/getDocList',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == "000000") {
                var docList = JSON.parse(JSON.parse(data.responseBody.data)).data;
                var temple_div = $("#results_template_div").html(),
                    html_div = "";
                var docIdList = [];
                if (docList.length < 1) {
                    $("#title").html('<img id="back" src="/images/icon-return.png" class="icon-return"/>' + "暂无排班信息")
                    return;
                }
                localStorage.setItem('hospitalName', docList[0].hospitalName);
                localStorage.setItem('deptName', docList[0].deptName);
                $("#title").html('<img id="back" src="/images/icon-return.png" class="icon-return"/>' + docList[0].hospitalName + '--<span class="color0083e0">' + docList[0].deptName + '</span>')
                $.each(docList, function (index, item) {
                    docIdList.push(item.doctorId);
                    //---------------日历头部----start-----------------------------
                    var weekDayUl = "";
                    var start = parseInt("1");
                    var end = parseInt("8");
                    var dateStr = "";
                    var weekStr = "";
                    var am = "";
                    var pm = "";
                    for (var i = start; i < end; i++) {
                        var d = new Date();
                        d.setDate(d.getDate() + i);
                        if (d.getDate() < 10) {
                            if (d.getMonth() < 9) {
                                dateStr = d.getFullYear() + "-0" + (d.getMonth() + 1) + '-0' + d.getDate()
                                weekStr = getDayName(d.getDay()) + '' + "<br>" + "0" + (d.getMonth() + 1) + '-0' + d.getDate();
                            } else {
                                dateStr = d.getFullYear() + "-" + (d.getMonth() + 1) + '-0' + d.getDate()
                                weekStr = getDayName(d.getDay()) + '' + "<br>" + (d.getMonth() + 1) + '-0' + d.getDate();
                            }
                        } else {
                            if (d.getMonth() < 9) {
                                dateStr = d.getFullYear() + "-0" + (d.getMonth() + 1) + '-' + d.getDate()
                                weekStr = getDayName(d.getDay()) + '' + "<br>" + "0" + (d.getMonth() + 1) + '-' + d.getDate();
                            } else {
                                dateStr = d.getFullYear() + "-" + (d.getMonth() + 1) + '-' + d.getDate()
                                weekStr = getDayName(d.getDay()) + '' + "<br>" + (d.getMonth() + 1) + '-' + d.getDate();
                            }
                        }
                        weekDayUl += "<th>" + weekStr + "</th>";
                        am += "<td id=am_" + item.doctorId + "_" + dateStr + "></td>";
                        pm += "<td id=pm_" + item.doctorId + "_" + dateStr + "></td>";
                    }
                    //---------------日历头部----end-----------------------------
                    var timeTable = '<div class="reservationDate sDTableDiv spacTop"><table class="reservationList sDTableData"><tr><th>排班</th>' + weekDayUl
                        + '</tr>' + '<tr><td>上午</td>' + am + '</tr><tr><td>下午</td>' + pm + '</tr>' + ' </table></div>'
                    html_div += temple_div.replace(RegResources.doctorName, item.doctorName)
                        .replace(RegResources.doctorTitle, item.doctorTitle)
                        .replace(RegResources.hospitalName, item.hospitalName)
                        .replace(RegResources.deptName, item.deptName)
                        .replace(RegResources.timeTable, timeTable);
                })
                $("#results_div").append(html_div);
                $.each(docIdList, function (index, _item) {
                    var data1 = {
                        randomKey: randomKey,
                        userID: userID,
                        clientID: clientID,
                        cityID: cityID,
                        local_x: local_x ,localFrom:localFrom,
                        local_y: local_y,
                        hosId: _item.split("-")[0],
                        deptId: _item.split("-")[0] + "-" + _item.split("-")[1],
                        doctorId: _item
                    }
                    $.ajax({
                        async: true,
                        type: 'post',
                        data: JSON.stringify(data1),
                        url: '/jxHospital/getDocSchedule',
                        contentType: 'application/json',
                        beforeSend: function () {
                            $("#dialogMask,#dialog").show();
                        }
                    }).done(function (data2) {
                        $("#dialogMask,#dialog").hide();
                        if (data2.retCode == "000000") {
                            var docSchedule = JSON.parse(JSON.parse(data2.responseBody.data)).data[0].scheduleLst;
                            $.each(docSchedule, function (index, _item_) {
                                var id = (_item_.regDate.indexOf("上") ? "am_" : "pm_") + _item + "_" +
                                    _item_.regDate.split(" ")[0].replace("/", "-").replace("/", "-").replace((_item_.regDate.indexOf("上") ? "上午" : "下午"), "")
                                $("#" + id).attr("class", "byAppointment").html('<span onclick="renderTo(\'' + _item_.shitCode + "__" + _item_.outPatientType + "__" + JSON.parse(JSON.parse(data2.responseBody.data)).data[0].docName + '\')">有号</span>')
                            })
                        }
                    })
                })
            } else {
                masktime("数据加载失败")
            }
        })

    }

    $(document).on("touchstart", "img[id='back']", function () {
        window.location.href = "/jxHospital?page=selectDepartment&cityID=" + cityID + "&deptId=" + deptId + "&localFrom=" + localFrom;
    })
    function masktime(mgs) {
        $('#masktime').html(mgs);
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    };
})
function renderTo(shitCode) {
    localStorage.setItem('shitCode', shitCode);
    window.location.href = "/jxHospital?page=appointmentTimeSelect&comeFrom2=appointmentRegistration&cityID="
        + cityID + "&shitCode=" + shitCode + "&deptId=" + deptId + "&localFrom=" + localFrom;
}
// 0-6转换成中文名称
function getDayName(day) {
    var day = parseInt(day);
    if (isNaN(day) || day < 0 || day > 6)
        return false;
    var weekday = ["周天", "周一", "周二", "周三", "周四", "周五", "周六"];
    return weekday[day];
}