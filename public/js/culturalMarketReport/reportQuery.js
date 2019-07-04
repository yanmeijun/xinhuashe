var backFrom = sessionStorage.getItem("backFrom");
$('#backFrom').on("click", function () {
    if (backFrom == "culturalMarketReport") {
        var url = "/culturalMarketReport?page=culturalMarketReport&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
        window.location.href = url;
        return;
    } else {
        var url = "/?randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
        window.location.href = url;
        return;
    }
});
$('#queryButton').on("click", function () {
    var queryName = $("#queryName").val();
    if (!/^[a-zA-Z\u4e00-\u9fa5]+$/.test(trim(queryName)) || !queryName) {
        maskTip("姓名只能为汉字或字母");
        return;
    }
    var queryCode = $('#queryCode').val();
    if (!/^[A-Za-z0-9]*$/.test(trim(queryCode)) || !queryCode) {
        maskTip("查询码只能含有字母或数字");
        return;
    }
    var verifycode = $('#verifycode').val();
    if(!verifycode){
        maskTip("验证码不能为空");
        return;
    }
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x,
        localFrom: localFrom,
        local_y: local_y,
        querycode: queryCode,
        name: queryName,
        verifycode:verifycode
    };
    informid("/culturalMarketReport/reportSearch",data);
});

function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
$('#imgVCode').on('click',function(){
    $('#imgVCode').attr("src","/images/yanzm.gif");
    informid("/culturalMarketReport/verifycode","");
})
function informid(url,params){
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x,
        localFrom: localFrom,
        local_y: local_y
    };
    params = params ? params: data;
    $.ajax({
        async: true,
        url: url,
        type: 'post',
        data: JSON.stringify(params),
        contentType: 'application/json',
        success: function (data) {
            if(data.retCode == "000000"){
                if(url == "/culturalMarketReport/verifycode"){
                    $('#imgVCode').attr("src",data.responseBody.data)
                    return;
                } else {
                    /*if(data.responseBody[0].result == "没有相关的记录，请确认您的查询码或姓名是否填写正确！"){
                        $('#reportQueryBox').hide();
                        maskTip("没有相关的记录，请确认您的查询码是否正确！");
                    }*/
                    var str = "<div class=\"networdReportList clearfix\">";
                    $.each([JSON.parse(data.responseBody.data)],function(i,v){
                        str += "<div class=\"networdReportList clearfix\">" +
                            "<label>标题：</label>" +
                            "<span id=\"content_title\">"+v.content+"</span>" +
                            "</div>" +
                            "<div class=\"networdReportList clearfix\">" +
                            "<label>时间：</label>" +
                            "<span id=\"content_time\">"+v.time+"</span>" +
                            "</div>" +
                            "<div class=\"networdReportList clearfix\">" +
                            "<label>状态：</label>" +
                            "<span id=\"content_status\">"+v.state+"</span>" +
                            "</div>"
                    });
                    $("#reportListBox").html(str);
                    $('#reportQueryBox').show();
                }
            }else{
                maskTip("提交失败");
                return;
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    })
};
informid("/culturalMarketReport/verifycode","");