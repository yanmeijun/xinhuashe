$('#submit').on("click", function () {
    var search = $('#search').val().trim();
    if (search == null || search.length == 0) {
        maskTip("请填写查询码");
        return false;
    }
    if (search.length < 16 || search.length > 17) {
        maskTip('请输入有效的查询码！');
        return false;
    }
    $('#dialogMask,#dialog').show();
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x,
        localFrom: localFrom,
        local_y: local_y,
        searchCode: search
    };
    $.ajax({
        async: true,
        url: "/dutyCrimeReport/searchResult",
        type: "post",
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (res) {
            $('#dialogMask,#dialog').hide();
            if (res.retCode == "000000") {
                if (res.responseBody.total > 0) {
                    var pojo = res.responseBody.rows[0];
                    // 处理状态  -1：已删除；0：全部；1：待处理；99：已处理；
                    var statusInt = pojo.JBKJXSLY_CLZT;
                    var status = '待处理';
                    if (statusInt == "1") {
                        $('#result').find(".wgTipsWords").html("您的举报正在处理中，请耐心等待。");
                        $('#result').show();
                    } else {
                        $('#result').find(".wgTipsWords").html(pojo.JBKJXSLY_JDDD);
                        $('#result').show();
                    }
                } else {
                    $('#result').find(".wgTipsWords").html("没有查到相关信息！");
                    $('#result').show();
                }
            } else {
                $('#result').find(".wgTipsWords").html(res.responseBody.errorMsg);
                $('#result').show();
            }
            if (res.responseBody.data) {
                if (res.responseBody.data.indexOf("失败") != -1) {
                    $('#result').find(".wgTipsWords").html("没有查到相关信息！");
                    $('#result').show();
                }
            }
        },
        error: function () {
            maskTip("请求失败");
            return;
        }
    })
})
$('#back').on("click", function () {
    window.location.href = "/dutyCrimeReport?page=dutyCrimeReport&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    return;
})