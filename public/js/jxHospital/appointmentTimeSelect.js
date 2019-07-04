$(function () {
    var RegResources = {
        startTime: new RegExp("\\$\\{startTime\\}", "g"),
        endTime: new RegExp("\\$\\{endTime\\}", "g"),
        bussKey: new RegExp("\\$\\{bussKey\\}", "g")
    };
    // localStorage.setItem('comeFrom2',comeFrom2);
    $("#hospitalName").text(localStorage.getItem('hospitalName'))
    $("#deptName").text(localStorage.getItem('deptName'))
    getScheduleTime();
    function getScheduleTime() {
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            shitCode: shitCode.split("__")[0],
            type: shitCode.split("__")[1]
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/jxHospital/getScheduleTime',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == "000000") {
                var timeList = JSON.parse(JSON.parse(data.responseBody.data)).data;
                var temple_div = $("#results_template_div").html(),
                    html_div = "";
                $.each(timeList, function (index, item) {
                    html_div += temple_div.replace(RegResources.startTime, item.startTime)
                        .replace(RegResources.endTime, item.endTime)
                        .replace(RegResources.bussKey, item.bussKey)
                })
                $("#results_div").html(html_div);
            } else {
                masktime("数据加载失败")
            }
        })
    }

    $(document).on("touchstart", "img[id='back']", function () {
        window.location.href = "/jxHospital?page=appointmentRegistration&cityID=" + cityID + "&deptId=" + deptId + "&localFrom=" + localFrom;
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
function renderTo(bussKey) {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        hospitalCode: deptId.split("-")[0]
    };
    $.ajax({
        async: true,
        type: 'post',
        data: JSON.stringify(data),
        url: '/jxHospital/getPatientList',
        contentType: 'application/json',
        beforeSend: function () {
            $("#dialogMask,#dialog").show();
        }
    }).done(function (data) {
        $("#dialogMask,#dialog").hide();
        if (data.retCode == "000000") {
            localStorage.setItem('bussKey', bussKey);
            window.location.href = "/jxHospital?page=registeredConfirm&comeFrom2=appointmentTimeSelect&&cityID="
                + cityID+ "&localFrom=" + localFrom + "&bussKey=" + bussKey + "&shitCode=" + shitCode + "&deptId=" + deptId ;
        } else {
            window.location.href = "/jxHospital?page=login&comeFrom=appointmentTimeSelect&cityID=" + cityID + "&localFrom=" + localFrom;
        }
    })

}
