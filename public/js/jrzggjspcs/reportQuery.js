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
        url: "/jrzggjspcs/verification",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            $('#verification').attr("src",data);
        }
    })
})
/*1FED3I7DF73H28902645*/
$('#search').on("click", function () {
    var reportRand = $('#reportRand').val().trim(),
        reportImg = $('#reportImg').val().trim(),
        tel = $('#tel').val().trim(),
        cardID = $('#cardID').val().trim();
    if(!reportRand){
        maskTip("请输入预约号");
        return;
    }
    if(!reportImg){
        maskTip("请输入验证码");
        return;
    }
    if (!tel) {
        maskTip("请输入手机号");
        return;
    } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(tel))) {
        maskTip("请输入正确的手机号");
        return;
    }
    if (!cardID) {
        maskTip("请输入身份证号");
        return;
    } else if (!validateIdCard(cardID)) {
        maskTip("身份证号码错误！");
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
        reportRand: $('#reportRand').val().trim(),//预约码
        reportImg:$('#reportImg').val().trim(),//验证码
        tel:$('#tel').val().trim(), //电话
        cardID:$('#cardID').val().trim(), //身份证号
    };
    $.ajax({
        async: true,
        type: "post",
        data: JSON.stringify(data),
        url: "/jrzggjspcs/reportSearch",
        contentType: 'application/json',
        success: function (data) {
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                resultHtml = "<div class='networdReportList clearfix'><label>证件号码：</label><span>" + data.responseBody.id + "</span></div>" +
                    "<div class='networdReportList clearfix'><label>预约号：</label><span>" + data.responseBody.yynumber + "</span></div>" +
                    "<div class='networdReportList clearfix'><label>办理事项：</label><span>"+ data.responseBody.itemName+"</span></div>" +
                    "<div class='networdReportList clearfix'><label>办事地点：</label><span>"+ data.responseBody.itemplace+"</span></div>" +
                    "<div class='networdReportList clearfix'><label>预约日期：</label><span>"+ data.responseBody.yydate+"</span></div>" +
                    "<div class='networdReportList clearfix'><label>预约时间段：</label><span>"+ data.responseBody.yytime+"</span></div>";
                $("#detail").html(resultHtml);
                $(".userInfor").show();
                var data = res.responseBody.result
            }else if (data.responseBody.errorCode == "100005") {
                $('#dialogMask,#dialog').hide();
                $(".userInfor").hide();
                maskTip("验证码错误，请重新填写！");
                return;
            }
            else if (data.retCode == "000001") {
                $('#dialogMask,#dialog').hide();
                $(".userInfor").hide();
                maskTip("未查询到结果！");
                return;
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
})

$('#back').click(function(){
    window.location.href = "/hfzggjspcs?page=hfzggjspcs&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    return;
})