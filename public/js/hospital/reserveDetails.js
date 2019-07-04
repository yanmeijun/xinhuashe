//console.log( localStorage.getItem('RegisterYuyue'))


/*
 *返回按钮
 */
$('#back').on("click", function () {
    var url = "/hospital?page=informationConfirm&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;//跳转到对应的页面
})
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
    /*  var url="/hospital?page=registerList&randomKey="+randomKey+"&userID="+userID.trim()+"&clientID="+clientID.trim()+"&cityID="+cityID.trim()+"&local_x="+local_x+"&local_y="+local_y
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
                window.location.href = "/hospital?page=login&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=hospital";
            } else {//登陆过跳转个人中心
                window.location.href = "/hospital?page=reservationDetail&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=hospital";
            }
        }).fail(function (data) {
            commitStatus = true;
        }).always(function () {

        });
    }
})
//点击首页的个人中心-end