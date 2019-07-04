$(function () {
    var RegResources = {
        name: new RegExp("\\$\\{name\\}", "g"),
        hosLevel: new RegExp("\\$\\{hosLevel\\}", "g"),
        hospitalId: new RegExp("\\$\\{hospitalId\\}", "g")
    };
    $("#checkStr").val("");
    getHospList();
    function getHospList() {
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x,
            localFrom: localFrom,
            local_y: local_y,
            cityRegId: cityID
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/jxHospital/getHospList',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == '000000') {
                var resultData = JSON.parse(JSON.parse(data.responseBody.data));
                var temple = $("#results_template_div").html(), html = "";
                $.each(resultData.data, function (index, item) {
                    html += temple.replace(RegResources.name, item.name)
                        .replace(RegResources.hosLevel, item.hosLevel)
                        .replace(RegResources.hospitalId, item.hospitalId)
                })
                $("#results_div").html(html);
            } else {
                // $("#noResult").show()
            }
        });
    }

    $("#city").click(function () {
        $("#main_div").hide()
        $("#cityList_div").show()
    });
    $("#cityList>li").click(function () {
        cityID = $(this).attr("value");
        $("#city").text($(this).text())
        $("#main_div").show()
        $("#cityList_div").hide()
        getHospList();
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
function renderTo(hosId) {
    // localStorage.setItem('hosId',hosId);
    window.location.href = "/jxHospital?page=selectDepartment&comeFrom2=jxHospital&cityID="
        + cityID + "&hosId=" + hosId + "&localFrom=" + localFrom
}
