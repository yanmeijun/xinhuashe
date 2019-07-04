$(function(){
    $('#verification').click();
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
        local_y: local_y
    };
    $.ajax({
        async: true,
        url: "/corruptionReport/reporterification",
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
        img: reportImg//验证码
    };
    $.ajax({
        async: true,
        type: "post",
        data: JSON.stringify(parameters),
        url: "/corruptionReport/reportSearch",
        contentType: 'application/json',
        success: function (res) {
            $('#dialogMask,#dialog').hide();
            if (res.retCode == "000000") {
                var data = res.responseBody.data;
                if(res.responseBody.data == "验证码不正确，请重新输入!"){
                    $('#verification').click();
                }
                $('#monitorText').html(data);
                $('#monitor').show();
                return;
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
$('#back').click(function(){
    window.location.href = "/corruptionReport?page=corruptionReport&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    return;
})