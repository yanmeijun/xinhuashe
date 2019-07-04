var hospitalDetail = localStorage.getItem('hospitalId');//获取页面传来的id
Zepto(function ($) {
    $('#dialogMask,#dialog').show();
    hosDetail()//加载时执行函数
});
function hosDetail() {//医院详情
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        id: hospitalDetail
    };
    $.ajax({
        async: true,
        url: "/hospital/getDetail",
        type: "post",
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                var departments = data.responseBody;
                var departmentsj = data.responseBody.yygz;
                // var REG_BODY=/<body[^>]*>([\s\S]*)<\/body>/;//正则匹配body中的内容
                // var result=departments.yywz.trim();//获取到匹配到的网站 //getIMG?img=
                var fhsjTime = departments.fhsj.split("： ")[1] //放号时间
                var hosDetails = "";
                hosDetails += '<div class="peccancyQuery userInfor onlyStyle">' +
                    '<dl class="hosList">' +
                    '<dt><a href="javascript:;"><img src="' + departments.yytp + '"></a></dt>' +
                    '<dd class="title">' + departments.yymc + '</dd>' +
                    '<dd class="time"><span>' + departments.yydj + '</span><span>每天' + fhsjTime + '放号</span></dd>';
                if (departments.yydh.indexOf("医院总机查号台") != -1) {
                    hosDetails += '<dd class="tel">' + departments.yydh + '</dd>';

                } else {
                    hosDetails += '<dd class="tel">医院总机查号台: ' + departments.yydh + '</dd>';
                }
                hosDetails += '<dd class="getAddress">' +
                    '<i class="icon-address"></i>' +
                    departments.yydz +
                    '</dd>' +
                    '</dl>' +
                    '</div>' +
                    '<div class="contactInfor">' +
                    '<p>联系地址：</p>' +
                    '<p>' + departments.yydz + '</p>' +
                    '<p>医院网站：</p>' +
                    '<p><a href=' + departments.yywz + ' target="_blank">' + departments.yywz + '</a></p>' +
                    '<p>联系电话：</p>' +
                    '<p>' + departments.yydh + '</p>' +
                    '<p>交通指南：</p>' +
                    '<p>' + departments.yylx + '</p>' +
                    '</div>' +
                    '</div>';
                $('#hosDetail').html(hosDetails);
                $('#dialogMask,#dialog').hide();
            } else {
                $('#dialogMask,#dialog').hide();
                alert("暂无数据")
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    })
}
hosDetail()

$('#back').on('click', function () {
    var url = "/hospital?page=department&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;//跳转到对应的页面
})

$(function () {
    var commitStatus = true;
    //点击首页的个人中心-start
    $("#userAvatarBox").on("click", function () {
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            orderType: -1,
            page: 1,
            startDate: "2018-05-18",
            endDate: "2018-08-17"
        }
        /*var url="/hospital/registerList?randomKey="+randomKey+"&userID="+userID.trim()+"&clientID="+clientID.trim()+"&cityID="+cityID.trim()+"&local_x="+local_x+"&local_y="+local_y
         +'&orderType=2&page=1&startDate=2018-01-01&endDate=2018-12-31';*/
        if (commitStatus) {
            commitStatus = false;
            $.ajax({
                async: false,
                type: "post",
                url: "/hospital/registerList",
                data: JSON.stringify(data),
                dataType: "json",
                contentType: "application/json",
            }).done(function (response) {
                commitStatus = true;
                if (response.retCode == "000001") {//没有登陆，跳转登陆页面
                    window.location.href = "/hospital?page=login&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=department";
                } else {//登陆过跳转个人中心
                    window.location.href = "/hospital?page=reservationDetail&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=department";
                }
            }).fail(function (data) {
                commitStatus = true;
            }).always(function () {

            });
        }
    })
    //点击首页的个人中心-end
})