$(function () {
    var RegResources = {
        id: new RegExp("\\$\\{id\\}", "g"),
        categoryName: new RegExp("\\$\\{categoryName\\}", "g"),
        deptName: new RegExp("\\$\\{deptName\\}", "g"),
        renderID: new RegExp("\\$\\{renderID\\}", "g")
    };
    localStorage.setItem('hospitalID', hospitalID);
    localStorage.setItem('hospitalCode', hospitalCode);
    localStorage.setItem('branchId', branchId);
    localStorage.setItem('comeFrom2', comeFrom2);
    getHospDetail();
    function getHospDetail() {
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            hospitalId: hospitalID,
            branchId: branchId,
            hospitalCode: hospitalCode
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/sDHospital/getHospDetail',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == '000000') {
                $("#NAME_title").text(data.responseBody.baseInfo.NAME);
                $("#NAME").text(data.responseBody.baseInfo.NAME);
                $("#LVL").text(data.responseBody.baseInfo.LVL);
                $("#TYPE").text(data.responseBody.baseInfo.TYPE);
                $("#NUMS").text("已成功预约" + data.responseBody.baseInfo.NUMS + "人");
                $("#detail").text(data.responseBody.baseInfo.detail.slice(0, 33) + "...");
                $("#detail_all").text(data.responseBody.baseInfo.detail);
                var temple_div = $("#result_template_div").html(),
                    temple_ul = $("#result_template_ul").html(),
                    temple_p = $("#result_template_p").html(),
                    html_div = "",
                    html_ul = "";
                $.each(data.responseBody.departments, function (index, item) {
                    var html_p = "";
                    html_ul += temple_ul.replace(RegResources.categoryName, item.categoryName)
                        .replace(RegResources.id, index)
                    $.each(item.depList, function (_index, _item) {
                        html_p += temple_p.replace(RegResources.deptName, _item.deptName)
                            .replace(RegResources.renderID, "hospitalId_" + _item.hospitalId + "_deptId_" + _item.deptId + "_branchId_" + _item.branchId)
                    })
                    html_div += '<div id="depart_' + index + '" class="tabConBox" style="display: none">' + html_p + ' </div>'
                })
                $("#result_div").html(html_div);
                $("#result_ul").html(html_ul);
                $("#depart_0").show();
                $("#category_0").addClass("active");
            } else {
            }
        });
    }

    $("img[id='back']").click(function () {
        // if(hospitalID){
        window.location.href = "/sDHospital?page=" + comeFrom2 + "&randomKey="
            + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x
            + "&local_y=" + local_y + "&hospitalID=" + hospitalID + "&localFrom=" + localFrom;
        // }else{
        //     window.location.href = "/sDHospital?page="+comeFrom+"&randomKey="
        //         +randomKey+"&userID="+userID+"&clientID="+clientID+"&cityID="+cityID+"&local_x="+local_x
        //         + "&local_y="+local_y;
        // }
    })
    $("#showAll").click(function () {
        $("#showAll_p").hide();
        $("#hideAll_p").show();
    });
    $("#hideAll").click(function () {
        $("#showAll_p").show();
        $("#hideAll_p").hide();
    });

})
function masktime(mgs) {
    $('#masktime').html(mgs)
    $('#masktime').show();
    setTimeout(function () {
        $('#masktime').hide();
    }, 2000)
    return
};
function renderTo(ID) {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        hospitalId: ID.split("_")[1],
        branchId: ID.split("_")[5],
        deptId: ID.split("_")[3]
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
            window.location.href = "/sDHospital?page=registered&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y +
                "&hospitalID=" + ID.split("_")[1] + "&deptId=" + ID.split("_")[3] + "&branchId=" + ID.split("_")[5] + "&hospitalCode=" + hospitalCode
            
        } else if (data.retCode == '000011') {
            masktime("当前科室无排班信息,请选择其他科室");
        }
    })

}
function switchTab(ID) {
    $("li[id^='category_']").removeClass("active")
    $("div[id^='depart_']").hide()
    $("#depart_" + ID).show();
    $("#category_" + ID).addClass("active");
}