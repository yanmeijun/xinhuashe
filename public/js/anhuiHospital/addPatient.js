/*
 * Created by ymj on 2018/11/12.
 */
$(function () {
    confirmQuit()
})
//返回按钮
$('#back').on("click", function () {
    var url = "/anhuiHospital?page=appointmenRegistration&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
});
//添加就诊人
$('#addPatient').click(function () {
    var name = $('#name').val().trim();
    var card = $('#card').val().trim();
    var age = $('input[name="smsra"]:checked').attr("main-val")//获取病人的id
    var mobile = $("#mobile").val();
    if (name == "") {
        maskTip("请输入真实姓名");
        return false;
    }
    if (card == "") {
        maskTip("校验身份证号");
        return false;
    } else if (!validateIdCard(card)) {
        maskTip("身份证格式错误");
        return;
    }
    if ("" == mobile) {
        maskTip("请填写手机号");
        return false;
    } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(mobile))) {
        maskTip("手机号格式不正确");
        return false;
    }
    $('#dialogMask,#dialog').show();
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        FRIEND_NAME: name,
        FRIEND_AGE: IdCard(card, 3),
        FRIEND_GENDER: age,
        FRIEND_SFCODE: card,
        FRIEND_MOBILE: mobile,
        FRIEND_ADDR: "",
        FRIEND_CARD_NUM: ""
    };
    $.ajax({
        async: true,
        url: "/anhuiHospital/addPatient",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            /**查询动画提示结束**/
            $('#dialogMask,#dialog').hide();
            if (data.retCode == "000000") {
                if (data.responseBody.data) {
                    if (data.responseBody.data.indexOf("login.jsp") != -1) {//跳转到登录页面
                        var url = "/anhuiHospital?page=login&randomKey=" + randomKey + "&userID=" + userID +
                            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                        window.location.href = url;
                    }
                }
                //342401197101162405
                if ("1" == data.responseBody.code) {
                    var url = "/anhuiHospital?page=appointmenRegistration&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                    window.location.href = url;
                }else if("0" == data.responseBody.code){
                    if(data.responseBody.value == "该亲友已存在!"){
                        maskTip("请不要将自己的信息添加为亲友");
                        return;
                    }
                    maskTip(data.responseBody.value);
                    return;
                }
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    });

})
$('#card').on("blur",function(){
    if(validateIdCard($('#card').val())){
        if(IdCard($('#card').val(), "2") == "女"){
            console.log($('input[main-val="2"]'))
            $('input[main-val="2"]').attr("checked",true);
        }else{
            $('input[main-val="1"]').attr("checked",true);
        }
    }
})
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
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=addPatient";
                    window.location.href = url;
                    return false;
                }
            }
            var url = "/anhuiHospital?page=userCenter&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=addPatient";
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