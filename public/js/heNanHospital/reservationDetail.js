$(function () {
    var reservation = JSON.parse(sessionStorage.getItem("reservation"));
    var reserArr = [];
    reserArr.push(reservation)
    var html = ""
    $.each(reserArr, function (index, val) {
        html += "<div class=\"reserve-title successMsg-remind\">" +
            "<span >恭喜您，预约成功!</span>" +
            "</div>" +
            "<div class=\"reservationDetails\">" +
            "<ul>" +
            "<li><em></em><label>就诊人：</label><span>" + val.patientName + "</span></li>" +
            "<li><em></em><label>预约医生：</label><span>" + val.doctorName + "</span></li>" +
            "<li><em></em><label>就诊时间：</label><span>" + val.time + "</span></li>" +
            "<li><em></em><label>门诊类型：</label><span>" + val.ghf + "</span></li>" +
            "<li><em></em><label>取号时间：</label><span>" + val.quhaoTime + "</span></li>" +
            "<li><em></em><label>取号地点：</label><span>" + val.address + "</span></li>" +
            "</ul>" +
            "</div>"
    });
    $('#successReservat').html(html);

});

function back() {
    var url = "/heNanHospital?page=appointmenRegistration&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
};
function agin() {
    var url = "/heNanHospital?page=heNanHospital&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
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
//                let recodeHe=JSON.parse(sessionStorage.getItem("recodeHe"));
//                console.log(recodeHe.time.split(":")[2])
//                console.log(recodeHe.time.slice(5))
//                console.log(new Date().getTime())
//				console.log(new Date("2018-05-17 15:36").getTime())
//				console.log(new Date().getTime()-new Date("2018-05-17 15:36").getTime())
//                /*
//                *登录后跳转页面
//                */
//                if(new Date().getTime()-new Date(recodeHe.time.slice(5)).getTime()<=10){
//                    var url="/heNanHospital?page=registeredRecord&randomKey="+randomKey+"&userID="+userID+
//                        "&clientID="+clientID+"&cityID="+cityID+"&local_x="+local_x+"&local_y="+local_y+"&comeFrom=reservationDetail";
//                    window.location.href=url;
//                    return;
//                }
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
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=reservationDetail";
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
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=reservationDetail";
                    window.location.href = url;
                    return;
                }
                var url = "/heNanHospital?page=registeredRecord&randomKey=" + randomKey + "&userID=" + userID +
                    "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=reservationDetail";
                window.location.href = url;
            }
        }
    })
});
/*
 *点击退出
 */
$('#quit').on("click", function () {
    maskTip("退出中");
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
            console.log(data)
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
})