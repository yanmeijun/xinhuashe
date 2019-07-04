imgVCode("/gdsgGJJ/getVerification");
$('#imgVCode').on('click',function(){
    $('#imgVCode').attr("src","/images/yanzm.gif");
    imgVCode("/gdsgGJJ/getVerification");
});
var yzmkey = '';
function imgVCode(url){
    var data = {
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
        url: url,
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (res) {
            if(res.retCode == '000000'){
                $('#imgVCode').attr("src",res.responseBody.fileName);
                yzmkey = res.responseBody.key
            }else{
                $('#imgVCode').attr("src",res);
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    })
};

function rsaKey(){
    var data = {
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
        url: "/gdsgGJJ/rsaKey",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (res) {
            console.log(res)
            if(res.retCode == '000000'){
                var data= res.responseBody;
                var b01001 = new RSAUtils.getKeyPair(data.exponent, "", data.modulus);
                var a01001 = getRandomString(16);
                var a01002 = $('#dlyhm').val().trim();
                var a01003 = $('#dlmm').val().trim();
                var a01004 = $('#yzm').val().trim();
                var a01005 = yzmkey;
                var json = {};
                json.a01002=a01002;
                json.a01003=a01003;
                json.a01004=a01004;
                json.a01005=a01005;
                var gg = JSON.stringify(json);
                var _gg = encrypt(gg,a01001);
                var reversedkey = a01001.split("").reverse().join("");
                var _a01001 = RSAUtils.encryptedString(b01001, reversedkey);
                $('#A01001').val(_a01001);
                $('#gg').val(_gg);
                // $('#xyjmdzd').val("gg");

            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    })
};




function isEmpty(string,error){
    if(!string){
        maskTip(error);
        return false;
    }else{
        return true;
    }
}
$('#submit').click(function () {
    var nameInfomant = $("#nameInfomant").val(),password = $('#password').val(),verifycode = $("#verifycode").val(); //举报人姓名
    if(!isEmpty(verifycode,"请输入验证码") || !isEmpty(password,"请输入密码") || !isEmpty(nameInfomant,"请输入身份证号")){
        return;
    }
    $('#dialogMask,#dialog').show();
    var data = {
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
        url: "/gdsgGJJ/rsaKey",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (res) {
            console.log(res)
            if(res.retCode == '000000'){
                var data= res.responseBody;
                var b01001 = new RSAUtils.getKeyPair(data.exponent, "", data.modulus);
                var a01001 = getRandomString(16);
                var a01002 = nameInfomant.trim();
                var a01003 = password.trim();
                var a01004 = verifycode.trim();
                var a01005 = yzmkey;
                var json = {};
                json.a01002=a01002;
                json.a01003=a01003;
                json.a01004=a01004;
                json.a01005=a01005;
                var gg = JSON.stringify(json);
                var _gg = encrypt(gg,a01001);
                var reversedkey = a01001.split("").reverse().join("");
                var _a01001 = RSAUtils.encryptedString(b01001, reversedkey);

                $.ajax({
                    async: true,
                    url: "/gdsgGJJ/login",
                    type: 'post',
                    data: JSON.stringify({
                        randomKey: randomKey,
                        userID: userID,
                        clientID: clientID,
                        cityID: cityID,
                        local_x: local_x,
                        localFrom: localFrom,
                        local_y: local_y,
                        A01001 : _a01001,
                        gg : _gg,//登陆密码
                    }),
                    contentType: 'application/json',
                    success: function (res) {
                        $('#dialogMask,#dialog').hide();
                        if(res.retCode == "000000"){
                            // 登录成功会自动跳转成功页面
                            if(res.responseBody.message == "succ"){
                                var urls = "/gdsgGJJ?page=baseInfor&randomKey=" + randomKey + "&userID=" + userID +
                                    "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
                                window.location.href = urls;
                            }else{
                                maskTip(res.responseBody.message);
                            }
                        }else{
                            maskTip(error || "您输入的信息有误");
                            return;
                        }
                    },
                    error: function (xhr, type) {
                        console.log('Ajax error!')
                        maskTip(error || "系统繁忙，请稍后再试");
                    }
                })
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    })
});
