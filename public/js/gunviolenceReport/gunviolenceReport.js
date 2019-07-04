var copyright = sessionStorage.getItem("copyright");
var searchUrl = sessionStorage.getItem("searchUrl");
var region = sessionStorage.getItem("region");
$(function(){
    $('#verification').click();
});
$('#verification').click(function(){
    $('#verification').attr("src","/images/yanzm.gif");
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,
        localFrom:localFrom,
        local_y: local_y,
    };
    $.ajax({
        async: true,
        url: "/gunviolenceReport/verification",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            $('#verification').attr("src",data);
        }
    })
})
/*1FED3I7DF73H28902645*/
$('#submit').on("click", function () {
    var txtname = $('#txtName').val().trim(),
        reportImg = $('#reportImg').val().trim(),
        tel = $('#tel').val().trim(),
        address = $('#address').val().trim(),
        txtcontent = $('#txtContent').val().trim(),
        name = $('#name').val().trim();
    if(!txtname){
        maskTip("请输入真实姓名");
        return;
    }
    if (!tel) {
        maskTip("请输入手机号");
        return;
    } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(tel))) {
        maskTip("请输入正确的手机号");
        return;
    }
    if(!name){
        maskTip("请输入为首分子姓名");
        return;
    }
    if(!address){
        maskTip("请输入主要涉案地");
        return;
    }
    if(!txtcontent){
        maskTip("请输入举报内容");
        return;
    }
    if(!reportImg){
        maskTip("请输入验证码");
        return;
    }
    $('#dialogMask,#dialog').show();
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,
        localFrom:localFrom,
        local_y: local_y,
        txtname: txtname,
        reportImg: reportImg,
        tel: tel,
        address: address,
        txtcontent: txtcontent,
        name: name
    };
    $.ajax({
        async: true,
        type: "post",
        data: JSON.stringify(data),
        url: "/gunviolenceReport/reportsubmit",
        contentType: 'application/json',
        success: function (data) {
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                if(data.responseBody.data.indexOf("已经提交成功") > -1){
                    var url = "/gunviolenceReport?page=success&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                    window.location.href = url;//跳转到对应的页面
                }else{
                    maskTip(data.responseBody.data || "很抱歉，您的本次举报提交失败！");
                    return;
                }

            } else {
                var url = "/gunviolenceReport?page=failed&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                window.location.href = url;//跳转到对应的页面
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
})

$('#back,#back_1').click(function(){
    window.location.href = "/gunviolenceReport?page=gunviolenceReport&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    return;
})
$('#agin').click(function(){
    window.location.href = "/gunviolenceReport?page=gunviolenceReport&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    return;
})