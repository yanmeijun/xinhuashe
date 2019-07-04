var backFrom = sessionStorage.getItem("backFrom");
$('#back').on("click", function () {
    if (backFrom == "organizationReport") {
        var url = "/organizationReport?page=organizationReport&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
        window.location.href = url;
    } else {
        var url = "/organizationReport?page=result&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
        window.location.href = url;
    }
})
$('#search').on("click", function () {
    if (!$('#code').val()) {
        maskTip("查询码不能为空");
        return;
    } else if ($('#code').val().length <= 31) {
        maskTip("查询码格式错误,必须为32位字符串");
        return;
    }
    ;
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x,
        localFrom: localFrom,
        local_y: local_y,
        querynumber: $('#code').val()
    };
    $.ajax({
        async: true,
        url: "/organizationReport/reportSearch",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                $('#feedbackTips').show();
            } else {
                maskTip("查询码错误");
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    })
})
$('#code').on("keyup", function () {
    $(this).next().show();
})
$('#delete').on("click", function () {
    $(this).hide();
    $('#code').val("");
})