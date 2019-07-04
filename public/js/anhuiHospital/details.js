var shopId = sessionStorage.getItem("shopId");//医院得id
$(function () {
    confirmQuit()
    /*
     *查询动画提示结束
     */
    $('#dialogMask,#dialog').show();
    getDetail();//页面初始化加载
});
function getDetail() {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        shopId: shopId
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/getDetail",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            /**查询动画提示结束**/
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                var html = "";
                html += '<h1 class="p-q-tit"><img src="/images/icon-return.png" class="icon-return" onclick="back()"/>' + data.responseBody.NAME + '</h1>' +
                    '<hr class="hrLine">' +
                    '<div class="peccancyQuery userInfor onlyStyle clearfix">' +
                    '<dl class="hosList anhuiSelectList"><dt>' +
                    '<a href="javascript:;"><img src="' + data.responseBody.IMAGE + '" onclick="goDetail()"></a>' +
                    '</dt><dd class="department"><p class="title" onclick="goDetail()">' +
                    '<span class="marTit">' + data.responseBody.NAME + '</span><span class="level3">' + data.responseBody.LEVEL + '</span>' +
                    '</p><p class="address clearfix"><i class="icon-address"></i>' +
                    '<span>' + data.responseBody.ADDRESS + '</span></p>' +
                    '<p class="tel"><i class="icon-tel"></i>' + data.responseBody.TEL + '</p></dd></dl>' +
                    '<div class="intro">';
                if (data.responseBody.SUMMARY) {
                    html += '<i class="icon-intr"></i><p>' + data.responseBody.SUMMARY + '</p>';
                }
                html += '<p>' + data.responseBody.SHOP_PROFESSIONAL_FILED + '</p>' +
                    '</div>' +
                    '</div>';
                $('#peccancyQuery').html(html);
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
}
function back() {
    var url = "/anhuiHospital?page=selectDepartment&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
}
/**查询预约记录*/
var userCenter = true;   //个人中心开关
$(".userAvatarBox").on("click", function (event) {
    if (userCenter) {
        userCenter = false;
        $(".userAvatarBox #userCenter").show();//记录
    } else {
        userCenter = true;
        $(".userAvatarBox #userCenter").hide();
    }

});
$('#quit').click(function () {
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
        url: "/anhuiHospital/signOTut",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            maskTip("退出成功");
            var url = "/anhuiHospital?page=anhuiHospital&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
            window.location.href = url;
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });
})
$('#personCon').click(function () {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        pageNo: "0",
        pageSize: 10,
        keyword: "",
        stime: "",
        etime: ""
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/personCenter",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.responseBody.data) {
                if (data.responseBody.data.indexOf("login.jsp") != -1) {//跳转到登录页面
                    var url = "/anhuiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=details";
                    window.location.href = url;
                    return false;
                }
            }
            var url = "/anhuiHospital?page=userCenter&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=details";
            window.location.href = url;
            return false;
        }
    })
})
function confirmQuit() {
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        pageNo: 0,
        pageSize: 10,
        keyword: "",
        stime: "",
        etime: ""
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/personCenter",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.responseBody.data) {
                if (data.responseBody.data.indexOf("login.jsp") != -1) {//跳转到登录页面
                    $('#quit').css("display", "none");
                    return;
                }
            }
            ;
            $('#quit').css("display", "block");
        }
    })
}