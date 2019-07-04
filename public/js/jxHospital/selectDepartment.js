$(function () {
    var RegResources = {
        id: new RegExp("\\$\\{id\\}", "g"),
        categoryName: new RegExp("\\$\\{categoryName\\}", "g"),
        deptName: new RegExp("\\$\\{deptName\\}", "g"),
        deptId: new RegExp("\\$\\{deptId\\}", "g")
    };
    getHospDetail();
    function getHospDetail() {
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            hosId: hosId
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/jxHospital/getHospDetail',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            var hospDetail = JSON.parse(data.hospDetail).data;
            var deptList = JSON.parse(data.deptList).data;
            $("#hosName_title").html('<img id="back" src="/images/icon-return.png" class="icon-return"/>' + hospDetail.hosName);
            $("#hosName_intro").html('<img id="closeIntro" src="/images/icon-return.png" class="icon-return"/>' + hospDetail.hosName);
            $("#hosName").text(hospDetail.hosName);
            $("#hosLevel").text(hospDetail.hosLevel);
            $("#nature").text(hospDetail.nature);
            $("#phone").html('<i class="icon-tel"></i>' + hospDetail.phone);
            $("#address").html('<i class="icon-address"></i>' + hospDetail.address);
            $("#hospIntroContent").html(hospDetail.introduction);
            var temple_ul = $("#result_template_ul").html(),
                html_ul = "";
            $.each(deptList, function (index, item) {
                html_ul += temple_ul.replace(RegResources.deptName, item.deptName)
                    .replace(RegResources.deptId, item.deptId)
            })
            $("#result_ul").html(html_ul);
        });
    }

    $("#search").click(function () {
        var deptName = $("#searchInput").val();
        if (!deptName.trim()) {
            masktime("请输入科室名称");
            return;
        }
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            deptName: deptName,
            hosName: $("#hosName").text(),
            pageIndex: 1
        }
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/jxHospital/deptSearch',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == '000000') {
                var resultData = JSON.parse(JSON.parse(data.responseBody.data)).data;
                if (resultData.length < 1) {
                    $("#result_ul").hide();
                    $("#noResults").show();
                } else {
                    $("#noResults").hide();
                    $("#result_ul").html();
                    var temple_ul = $("#result_template_ul").html(),
                        html_ul = "";
                    $.each(resultData[0].deptList, function (index, item) {
                        html_ul += temple_ul.replace(RegResources.deptName, item.deptName)
                            .replace(RegResources.deptId, item.deptId)
                    })
                    $("#result_ul").html(html_ul).show();
                }
            } else {
                masktime('查询失败')
            }
        });
    })
    $(document).on("touchstart", "img[id='back']", function () {
        window.location.href = "/jxHospital?page=JXHospital&cityID=" + cityID + "&hosId=" + hosId + "&localFrom=" + localFrom;
    })
    $("#showIntro").click(function () {
        $("#selectDepartment").hide();
        $("#hospIntro").show();
    })
    $(document).on("touchstart", "img[id='closeIntro']", function () {
        $("#hospIntro").hide();
        $("#selectDepartment").show();
    })

})
function renderTo(deptId) {
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
                masktime("暂无排班信息")
                return;
            } else {
                window.location.href = "/jxHospital?page=appointmentRegistration&comeFrom2=selectDepartment&cityID=" + cityID + "&deptId=" + deptId + "&localFrom=" + localFrom;
            }
        }

    })
}
function masktime(mgs) {
    $('#masktime').html(mgs);
    $('#masktime').show();
    setTimeout(function () {
        $('#masktime').hide();
    }, 2000)
    return
};