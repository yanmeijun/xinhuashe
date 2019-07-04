$(function () {
    //获取验证码
    var velidate, commitStatus = true;
    $("#veriCodeImg").on("click", function (event) {
        var parameters = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y
        };
        $.ajax({
            async: true,
            url: "/heNanHospital/verifycode",
            type: "post",
            data: JSON.stringify(parameters),
            contentType: 'application/json',
            success: function (res) {
                $("#veriCodeImg").attr('src', res);
            },
            error: function () {
                maskTip("验证码获取失败");
                return;
            }
        })
    });
    $("#veriCodeImg").trigger("click");

    //点击登陆按钮
    $("#loginBtn").on("click", function () {
        var username = $("#username").val();
        var pass = $("#pass").val();
        var validate = $("#veri").val();
        if (username.trim() == "") {
            maskTip("请输入手机号");
            return;
        } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(username))) {
            maskTip("请输入正确的手机号");
            return;
        }
        ;
        if (pass.trim() == "") {
            maskTip("请输入密码");
            return;
        }
        if (validate.trim() == "") {
            maskTip("请输入验证码");
            return;
        }
        var parameters = {
            logname: username.trim(),
            password: pass.trim(),
            validate: validate.trim(),
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y
        };
        $.ajax({
            async: true,
            url: "/heNanHospital/loginInfo",
            type: "post",
            data: JSON.stringify(parameters),
            contentType: 'application/json',
            success: function (res) {
                if (res.retCode == "000000") {
                    sessionStorage.setItem("recodeHe", JSON.stringify(res.responseBody));
                    var url = "/heNanHospital?page=" + comeFrom + "&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
                    window.location.href = url;


                    // if(res.responseBody.lists!=null && res.responseBody.lists.length!=0){
                    //     var url="/heNanHospital?page=registeredRecord&randomKey="+randomKey+"&userID="+userID+
                    //         "&clientID="+clientID+"&cityID="+cityID+"&local_x="+local_x+"&local_y="+local_y+"&comeFrom=registeredRecord";
                    //     window.location.href=url;
                    // }else{
                    //     var url="/heNanHospital?page="+comeFrom+"&randomKey="+randomKey+"&userID="+userID+
                    //         "&clientID="+clientID+"&cityID="+cityID+"&local_x="+local_x+"&local_y="+local_y;
                    //     window.location.href=url;
                    // }

                } else {
                    if (res.responseBody.data) {
                        maskTip(res.responseBody.data);
                        return;
                    } else {
                        maskTip(res.responseBody.errorMsg);
                        return;
                    }
                }
            },
            error: function () {
                alert("fail");
            }
        })
    });
    //点击注册按钮
    $("#toRegister").on("click", function () {
        var url = "/heNanHospital?page=register&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
        window.location.href = url;
    });
})
function back() {
    var url = "/heNanHospital?page=" + comeFrom + "&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
}

