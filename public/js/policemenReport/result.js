$(function () {
    /*查询*/
    $("#queryString_button").on("click",function () {
        var queryString = $("#queryString_input").val();
        if(!queryString){
            maskTip("请输入查询码！");
            return false;
        }
        if(queryString.length > 17 || queryString.length < 16){
            maskTip("请输入有效的查询码！");
            return false;
        }
        $('#dialogMask,#dialog').show();
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x,
            localFrom: localFrom,
            local_y: local_y,
            searchCode :queryString || "" //验证码
        };

        $.ajax({
            async: true,
            url: "/policemenReport/queryResults",
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (data) {
                /*结束加载动画*/
                $('#dialogMask,#dialog').hide();
                if (data.retCode) {
                    var showmsg = data.responseBody.data || data.responseBody.errorMsg;
                    $(".login-tips .wgTipsWords").html(showmsg);
                    $(".login-tips").show();
                }
            },
            error: function (xhr, type) {
                console.log('Ajax error!')
            }
        });
    });
    /*返回*/
    $("#goback").on("click",function(){
        var url = "/policemenReport?page=policemenReport&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
        window.location.href = url;
    });
});