$('#backhistory').click(function(){
    var urls = "/gdsgGJJ?page=baseInfor&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = urls;
})
var personal = JSON.parse(sessionStorage.getItem('userInfo'));
$('#company').val(personal.personAccount)
function getPersonInfor(){
    $('#dialogMask,#dialog').show();
    var jsonObj = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x,
        localFrom: localFrom,
        local_y: local_y
    };
    $.ajax({
        async: true,
        type: "POST",
        url: "/gdsgGJJ/getpayProve",
        dataType: "json",
        data: JSON.stringify(jsonObj),
        contentType: "application/json"
    }).done(function (res) {
        console.log(res)
        $('#dialogMask,#dialog').hide();
        if (res.retCode == "000000") {
            var html="";
            html+='<div class="text-list-div clearfix">' +
                    '    <label>单位账号：</label>' +
                    '    <span>'+res.responseBody.data["单位账号"]+'</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '    <label>余额：</label>' +
                    '    <span>'+res.responseBody.data["余额"]+'</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '    <label>个人账户余额状态：</label>' +
                    '    <span>'+res.responseBody.data["个人账号状态"]+'</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '    <label>开户日期：</label>' +
                    '    <span>'+res.responseBody.data["开户日期"]+'</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '    <label>缴存基数：</label>' +
                    '    <span>'+res.responseBody.data["缴存基数"]+'</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '    <label>月成汇缴额：</label>' +
                    '    <span>'+res.responseBody.data["月应汇缴额"]+'</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '    <label>单位缴存比例：</label>' +
                    '    <span>'+res.responseBody.data["单位缴存比例"]+'</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '    <label>个人缴存比例：</label>' +
                    '    <span>'+res.responseBody.data["个人缴存比例"]+'</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '    <label>连续缴存开户日期：</label>' +
                    '    <span>'+res.responseBody.data["连续缴存开始日期"]+'</span>' +
                    '</div>' +
                    '<div class="text-list-div clearfix">' +
                    '    <label>连续缴存终止日期：</label>' +
                    '    <span>'+res.responseBody.data["连续缴存终止日期"]+'</span>' +
                    '</div>';
            $('#result').html(html);
            $('#resultShow').show()
        } else {//登陆失败
            maskTip(res.responseBody.data);
        }
    })
};
userCenter = true
$(".userAvatarBox").on("click", function (event) {
    if (userCenter) {
        userCenter = false;
        $(".userAvatarBox #userCenter").show();//记录
        $('body').css("position","fixed");
        $('#detail').show();
    } else {
        userCenter = true;
        $(".userAvatarBox #userCenter").hide();
        $('body').css("position","static");
        $('#detail').hide();
    }
});
/*退出*/
$('#quit').on('click',function(){
    $('body').css("position","static");
    var jsonObj = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x,
        localFrom: localFrom,
        local_y: local_y
    };
    $.ajax({
        async: true,
        type: "POST",
        url: "/gdsgGJJ/logout",
        dataType: "json",
        data: JSON.stringify(jsonObj),
        contentType: "application/json"
    }).done(function (res) {
        console.log(res)
        $('#dialogMask,#dialog').hide();
        if (res.retCode == "000000") {
            var urls = "/gdsgGJJ?page=gdsgGJJ&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
            window.location.href = urls;
        } else {//登陆失败
            maskTip(res.responseBody.errorMsg);
        }
    })
})