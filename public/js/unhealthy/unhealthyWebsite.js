//console.log($("input[type=checkbox]:checked").next().html())
$(function () {
    $("#veriCodeImage").on("click", function (event) {
        $("#veriCodeImage").attr("src", "/images/yanzm.gif");
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/unhealthy/verifyCode',
            contentType: 'application/json'
        }).done(function (data) {
            $("#veriCodeImage").attr("src", data);
        });
    });
    $("#veriCodeImage").trigger("click");
});

var typeContent = '';
$('#reportWebsit').on("click", function () {
    var typeContent = $('input[name="radio"]:checked').val();
    var ht = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/;
    //var htt=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
    var reg = /^((http|ftp|https):\/\/)?[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
    //var htts=/^(http|https|ftp)\:\/\/([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|localhost|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(\/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$/
    if ($("#websitUrl").val() == "") {
        masktime("网站地址不能为空");
        return;
    } else if (!reg.test($("#websitUrl").val())) {
        masktime("请输入正确的网站地址例如:http://www.12321.cn");
        $('#masktime').css({"height": "48px", "line-height": "22px"})
        return;
    }

    // else if($("#websitUrl").val().indexOf(".")==-1 || $("#websitUrl").val().indexOf(",")==-1){
    //     masktime("请输入正确的网站地址 例如:http://www.12321.cn");
    //     $('#masktime').css({"height":"48px","line-height":"22px"})
    //     return;
    // }
    // else if(!ht.test($("#websitUrl").val())){
    //     masktime("请输入正确的网站地址 例如:http://www.12321.cn");
    //     $('#masktime').css({"height":"48px","line-height":"22px"})
    //     return;
    // }


    if (typeContent == undefined) {
        $('#masktime').css({"line-height": "45px"});
        masktime("不良类型不能为空");
        return;
    }
    if ($('#verifycode').val() == "") {
        $('#masktime').css({"line-height": "45px"});
        masktime("验证码不能为空");
        return;
    }
    if ($("#reportContent").val() == "") {
        $('#masktime').css({"line-height": "45px"});
        masktime("举报描述不能为空");
        return;
    }
    ;
    $('#dialogMask,#dialog').show();
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        url: $("#websitUrl").val(),
        type: typeContent,
        content: $("#reportContent").val(),
        verifycode: $('#verifycode').val()
    };
    $.ajax({
        async: true,
        type: 'post',
        data: JSON.stringify(data),
        url: '/unhealthy/subWebInfo',
        contentType: 'application/json'
    }).done(function (data) {
        $('#dialogMask,#dialog').hide();
        if (data.retCode == '000000') {
            $("#mask").show();
            $("#tips_text").html(data.responseBody.rtnMsg);
            $("#tips").show();
        } else {
            $("#tips_text").html(" ");
            $('#mask').hide();
            $("#tips").hide();
            if (data == "Bad request") {
                $("#tips_text").html("请求异常，请稍后")
                $("#tips").show();
                $('#mask').show();
                return;
            } else {
                if (data.responseBody.errorMsg) {
                    $("#tips_text").html(data.responseBody.errorMsg)
                    $("#tips").show();
                    $('#mask').show();
                    return;
                } else {
                    $("#tips_text").html("请求异常，请稍后")
                    $("#tips").show();
                    $('#mask').show();
                    return;
                }
            }
        }
    });
})


$('#iKnow').on("click", function () {
    $("#mask").hide();
    $("#tips").hide();
})

/*
 点击返回按钮
 */
$('#back').on("click", function () {
    var url = "/unhealthy?randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
})

// 参数为空时的提示语
function masktime(mgs) {
    $('#masktime').html(mgs);
    $('#masktime').show();
    setTimeout(function () {
        $('#masktime').hide();
    }, 2000)
    return
}