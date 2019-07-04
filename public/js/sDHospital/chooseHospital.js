$(function () {
    var RegResources = {
        ID: new RegExp("\\$\\{ID\\}", "g"),
        NAME: new RegExp("\\$\\{NAME\\}", "g"),
        PIC: new RegExp("\\$\\{PIC\\}", "g")
    };
    localStorage.setItem('hospitalID', hospitalID);
    getBranchList();
    function getBranchList() {
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            hosId: hospitalID
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/sDHospital/getBranchList',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == '000000') {
                var temple = $("#result_template_div").html(), html = "";
                $.each(data.responseBody, function (index, item) {
                    html += temple.replace(RegResources.NAME, item.NAME)
                        // .replace(RegResources.PIC, item.PIC)
                        .replace(RegResources.ID, "hospitalId_" + item.hospitalId + "_branchId_" + item.branchId)
                        .replace(RegResources.PIC, '<img src=/getIMG?img=' + item.PIC + ' onerror="this.src=\'/images/sDHospital/sdhospital.png\'">')
                })
                $("#result_div").append(html);
            } else {
            }
        });
    }

    $("#back").click(function () {
        window.location.href = "/sDHospital?page=sDHospital&randomKey="
            + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x
            + "&local_y=" + local_y + "&localFrom=" + localFrom;
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
function renderTo(ID) {
    window.location.href = "/sDHospital?page=details&comeFrom2=chooseHospital&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y +
        "&hospitalID=" + ID.split("_")[1] + "&branchId=" + ID.split("_")[3]
}