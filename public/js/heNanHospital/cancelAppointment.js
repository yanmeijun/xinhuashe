var cancelId = sessionStorage.getItem("cancelId");
function back() {
    var url = "/heNanHospital?page=registeredRecord&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
    window.location.href = url;
};
function sure() {
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        id: cancelId//验证码
    };
    $.ajax({
        type: "post",
        url: "/heNanHospital/regCancel",
        async: true,
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                //$('#masktime').html(data.responseBody.result);
                //$('#masktime').show();
                if (data.responseBody.result.indexOf("取消时间已过") != -1) {
                    $('#tips_text').html(data.responseBody.result)
                    $('#mask,#tips').show();
                    // maskTip(data.responseBody.result);
                    $('#iKnow').on('click', function () {
                        var url = "/heNanHospital?page=registeredRecord&randomKey=" + randomKey + "&userID=" + userID +
                            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                        window.location.href = url;
                    });
                } else {
                    var url = "/heNanHospital?page=registeredRecord&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                    window.location.href = url;
                }
            }
            ;
        },
        error: function () {
        }
    })

};
/*
 *查询预约记录
 */
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
$("#userCenter li").on("click", function (event) {
    event.stopPropagation();
});
//点击挂号记录，判断是否登陆，再跳转页面
$("#record").on("click", function (event) {
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        p: 1,//页码（默认值为1）
        yys: "",//预约开始时间
        yye: "",//预约结束时间
        state: 0//预约状态（默认值为0）
    };
    $.ajax({
        async: true,
        type: 'post',
        url: "/heNanHospital/getDetail",
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (data) {
            if (data.rtnCode == "000000") {
                if (data.data.datail) {
                    var url = "/heNanHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=cancelAppointment";
                    window.location.href = url;
                }
                ;
            }
            ;
            /*
             *登录后跳转页面
             */
            if (data.retCode == "000000") {
                if (!data.responseBody.scdlsj) {
                    var url = "/heNanHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=cancelAppointment";
                    window.location.href = url;
                    return;
                }
                var url = "/heNanHospital?page=registeredRecord&randomKey=" + randomKey + "&userID=" + userID +
                    "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=cancelAppointment";
                window.location.href = url;
            }
        }
    })
});
/*
 *点击退出
 */
$('#quit').on("click", function () {
    maskTip("退出中。。。");
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
        url: "/heNanHospital/addPeople",
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            if (data.retCode == "000000") {
                var url = "/heNanHospital?page=heNanHospital&randomKey=" + randomKey + "&userID=" + userID +
                    "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                window.location.href = url;
            } else {
                maskTip("未登陆或已退出");
                return;
            }
            ;
        },
        error: function () {
            maskTip("请求异常");
            return;
        }
    })
});