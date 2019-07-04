var copyright = sessionStorage.getItem("copyright");
var verificationUrl = sessionStorage.getItem("verificationUrl");
var searchUrl = sessionStorage.getItem("searchUrl");
var region = sessionStorage.getItem("region");
$(function(){
    $('#copyright').html(copyright);
    $('#verification').click();
    $('#provinceTrigger').html(region);


    $('#province').hide();//新增
    if(oldCity == "650000" || oldCity == "660000"){
        weekdayArr =[
            {name: "新疆维吾尔自治区纪委监委", id: "650000"},
            {name: "新疆生产建设兵团纪委监委", id: "660000"}
        ]
        $('#provinceTrigger').attr("disabled",false);
        $('#province').show();
        return;
    }else if(oldCity == "110000"){
        weekdayArr =[
            {name: "中央纪委国家监委", id: "120000"},
            {name: "北京市纪委监委", id: "110000"}
        ]
        $('#provinceTrigger').attr("disabled",false);
        $('#province').show();
        return;
    }else{
        $('#provinceTrigger').attr("disabled",true);
        $('#province').hide();
        return;
    }
});
$('#verification').click(function(){
    $("#verification").attr("src", "/images/yanzm.gif");
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,
        localFrom:localFrom,
        local_y: local_y,
        configurl:verificationUrl
    };
    $.ajax({
        async: true,
        url: "/monitorReport/verification",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            $('#verification').attr("src",data);
        }
    })
})
/*1FED3I7DF73H28902645*/
$('#search').click(function(){
    var reportRand = $('#reportRand').val().trim(),
        reportImg = $('#reportImg').val().trim();
    if(!reportRand){
        maskTip("请输入查询码");
        return;
    }
    if(!reportImg){
        maskTip("请输入验证码");
        return;
    }
    $('#dialogMask,#dialog').show();
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,
        localFrom:localFrom,
        local_y: local_y,
        reportRand: reportRand,//查询码
        img: reportImg,//验证码
        reportImg:reportImg,
        configurl:searchUrl
    };
    $.ajax({
        async: true,
        type: "post",
        data: JSON.stringify(parameters),
        url: "/monitorReport/reportSearch",
        contentType: 'application/json',
        success: function (res) {
            $('#dialogMask,#dialog').hide();
            if (res.retCode == "000000") {
                var data = res.responseBody.result
                var s;
                if(data == 'no') {
                    maskTip('验证码不能为空!');
                    $('#verification').click();
                    return false;
                } else if(data == 'nosame') {
                    maskTip('验证码不正确，请重新输入!');
                    $('#verification').click();
                    return false;
                } else if(data == 'reportRanderror') {
                    maskTip('查询码错误，请重新输入进行查询!');
                    $('#verification').click();
                    return false;
                } else if(data == 'maxError7') {
                    maskTip('今日查询失败次数已超过最大限制，请7天后再查!');
                    $('#verification').click();
                    return false;
                }  else {
                    if(data == 'default') {
                        s = "您反映问题的电子邮件本网站已收到。";
                    } else {
                        s = data;
                    }
                    $('#monitorText').html=s;
                    $('#monitor').show();
                    return;
                }
            }else{
                $('#monitor').hide();
                maskTip("查询码错误，请重新输入进行查询");
                return;
            }
        },
        error: function (err) {
            console.log(err)
        }
    })


})

/*function province(){
    $(".mobileSelect").remove();
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,
        localFrom:localFrom,
        local_y: local_y,
        aab301: ""
    };
    $.ajax({
        async: true,
        type: "post",
        data: JSON.stringify(parameters),
        url: "/remoteHosp/getRegionCode",
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                if (data.responseBody.success) {
                    var weekdayArr = [];
                    weekdayArr = data.responseBody.fieldData.codelist
                    mobileSelect('#provinceTrigger', '选择省份',weekdayArr)
                }
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
}*/
$('#provinceTrigger,#province').click(function(){
    mobileSelect('#provinceTrigger', '选择省份',weekdayArr)
})
$('#back').click(function(){
    window.location.href = "/monitorReport?page=monitorReport&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    return;
})