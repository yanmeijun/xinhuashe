$('#backhistory').click(function(){
    var urls = "/gdsgGJJ?page=baseInfor&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = urls;
})
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
        url: "/gdsgGJJ/getPersonInfor",
        dataType: "json",
        data: JSON.stringify(jsonObj),
        contentType: "application/json"
    }).done(function (res) {
        console.log(res)
        $('#dialogMask,#dialog').hide();
        if (res.retCode == "000000") {
            var html="";
            html+='<div class="text-list-div clearfix">' +
            '<label>姓名：</label>' +
            '<span>'+res.responseBody.data["姓名"]+'</span>' +
            '</div>' +
            '<div class="text-list-div clearfix">' +
            '    <label>个人账号：</label>' +
            '    <span>'+res.responseBody.data["个人账号"]+'</span>' +
            '</div>' +
            '<div class="text-list-div clearfix">' +
            '    <label>个人账户余额：</label>' +
            '    <span>'+res.responseBody.data["个人账户余额"]+'</span>' +
            '</div>' +
            '<div class="text-list-div clearfix">' +
            '    <label>缴至年月：</label>' +
            '    <span>'+res.responseBody.data["缴到年月"]+'</span>' +
            '</div>' +
            '<div class="text-list-div clearfix">' +
            '    <label>个人缴存基数：</label>' +
            '    <span>'+res.responseBody.data["个人缴存基数"]+'</span>' +
            '</div>' +
            '<div class="text-list-div clearfix">' +
            '    <label>月汇缴存额：</label>' +
            '    <span>'+res.responseBody.data["月汇缴总额"]+'</span>' +
            '</div>' +
            '' +
            '<div class="text-list-div clearfix">' +
            '    <label>单位月缴存额：</label>' +
            '    <span>'+res.responseBody.data["单位月缴存额"]+'</span>' +
            '</div>' +
            '<div class="text-list-div clearfix">' +
            '    <label>个人月缴存额：</label>' +
            '    <span>'+res.responseBody.data["个人月缴存额"]+'</span>' +
            '</div>' +
            '<div class="text-list-div clearfix">' +
            '    <label>个人缴存比例：</label>' +
            '    <span>'+res.responseBody.data["个人缴存比例"]+'</span>' +
            '</div>' +
            '<div class="text-list-div clearfix">' +
            '    <label>单位缴存比例：</label>' +
            '    <span>'+res.responseBody.data["单位缴存比例"]+'</span>' +
            '</div>' +
            '<div class="text-list-div clearfix">' +
            '    <label>账户状态：</label>' +
            '    <span>'+res.responseBody.data["账户状态"]+'</span>' +
            '</div>' +
            '<div class="text-list-div clearfix">' +
            '    <label>冻结状态：</label>' +
            '    <span>'+res.responseBody.data["冻结状态"]+'</span>' +
            '</div>' +
            '<div class="text-list-div clearfix">' +
            '    <label>证件类型：</label>' +
            '    <span>'+res.responseBody.data["证件类型"]+'</span>' +
            '</div>' +
            '<div class="text-list-div clearfix">' +
            '    <label>证件号码：</label>' +
            '    <span>'+res.responseBody.data["证件号码"]+'</span>' +
            '</div>' +
            '<div class="text-list-div clearfix">' +
            '    <label>贷款标志：</label>' +
            '    <span>'+res.responseBody.data["贷款标识"]+'</span>' +
            '</div>' +
            '<div class="text-list-div clearfix">' +
            '    <label>手机号码：</label>' +
            '    <span>'+res.responseBody.data["手机号码"]+'</span>' +
            '</div>' +
            '<div class="text-list-div clearfix">' +
            '    <label>家庭住址：</label>' +
            '    <span>'+res.responseBody.data["家庭住址"]+'</span>' +
            '</div>' +
            '<div class="text-list-div clearfix">' +
            '    <label>邮政编码：</label>' +
            '    <span>'+res.responseBody.data["邮政编码"]+'</span>' +
            '</div>' +
            '<div class="text-list-div clearfix">' +
            '    <label>单位账号：</label>' +
            '    <span>'+res.responseBody.data["单位账号"]+'</span>' +
            '</div>' +
            '<div class="text-list-div clearfix">' +
            '    <label>单位名称：</label>' +
            '    <span>'+res.responseBody.data["单位名称"]+'</span>' +
            '</div>';
            $('#result').html(html);
        } else {//登陆失败
            alert(res.responseBody.data);
        }
    })
};
getPersonInfor();
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