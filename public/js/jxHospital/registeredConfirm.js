$(function () {
    var RegResources = {
        cardId: new RegExp("\\$\\{cardId\\}", "g"),
        patientName: new RegExp("\\$\\{patientName\\}", "g"),
        phone: new RegExp("\\$\\{phone\\}", "g"),
        cardNo: new RegExp("\\$\\{cardNo\\}", "g")
    };
    getPatientList();
    function getPatientList() {
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
                getRegisterData();
                var patientList = JSON.parse(JSON.parse(data.responseBody.data)).data;
                var temple_div = $("#results_template_div").html(),
                    html_div = "";
                $.each(patientList, function (index, item) {
                    html_div += temple_div.replace(RegResources.cardId, item.cardId)
                        .replace(RegResources.patientName, item.patientName)
                        .replace(RegResources.phone, item.phone)
                        .replace(RegResources.cardNo, item.cardNo)
                })
                $("#results_div").html(html_div);
            } else {
                masktime("获取就诊人失败")
                // window.location.href = "/jxHospital?page=login&comeFrom=registeredConfirm&cityID="+cityID;
            }
        })
    }

    function getRegisterData() {
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            bussKey: bussKey,
            hospitalName: localStorage.getItem('hospitalName'),
            deptName: localStorage.getItem('deptName'),
            doctorName: shitCode.split("__")[2]
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/jxHospital/getRegisterData',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == "000000") {
                var registerInfo = JSON.parse(JSON.parse(data.responseBody.data)).data;
                $("#docInfo").html('<span>' + (registerInfo.doctorName || shitCode.split("__")[2]) + '</span>' + registerInfo.numbeType)
                $("#hospName").text((registerInfo.hospticalName || localStorage.getItem('hospitalName')) + "--" + (registerInfo.deptName || localStorage.getItem('deptName')))
                $("#regDate").text(registerInfo.regDate)
                $("#sumFee").text(registerInfo.sumFee)
            } else {
                masktime("数据加载失败");
            }
        })
    }

    var cardId;
    $(document).on("click touchstart", "img[id^='check_']", function () {
        var id = $(this).attr("id").replace("check_", "");
        if ($(this).attr("src").indexOf("yh") > -1) {
            cardId = '';
            $(this).attr("src", "/images/icon-checkBox-default.png")
        } else {
            $("img[id^='check_']").attr("src", "/images/icon-checkBox-default.png");
            cardId = id;
            $(this).attr("src", "/images/icon-yh-check.png")
        }
    })
    $("#submit").click(function () {
        if (!cardId) {
            masktime("请选择就诊人");
            return;
        }
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            bussKey: bussKey,
            contactId: cardId
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/jxHospital/registerHosp',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == "000000") {
                if (JSON.parse(JSON.parse(data.responseBody.data)).resultCode == "success") {
                    masktime("预约成功");
                    window.location.href = "/jxHospital/toUserCenter?randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y +
                        "&comeFrom=registeredConfirm";
                } else {
                    masktime(JSON.parse(JSON.parse(data.responseBody.data)).resultMsg || "预约失败");
                }
            } else {
                masktime("预约失败");
            }
        })
    });
    $(document).on("touchstart", "img[id='back']", function () {
        window.location.href = "/jxHospital?page=appointmentTimeSelect&cityID=" + cityID + "&deptId=" + deptId + "&localFrom=" + localFrom;
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
function renderTo() {
    window.location.href = "/jxHospital?page=addPatient&comeFrom2=registeredConfirm&cityID=" + cityID + "&localFrom=" + localFrom;
}
