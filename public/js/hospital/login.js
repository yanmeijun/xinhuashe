$(function () {
    //点击验证码
    $("#veriCodeImg").on("click", function (event) {
        const data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y
        };
        $.ajax({
            async: true,
            url: "/hospital/veriCode",
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (res) {
                $("#veriCodeImg").attr("src", res);

            },
            error: function (xhr, type) {
                console.log('Ajax error!')
            }
        })
        //$(this).attr("src","/image?action=hospital&randomKey="+ randomKey+"&"+new Date().getTime());
        event.preventDefault();
    });
    $("#veriCodeImg").click();
    var commitStatus = true;
    var veliNum = 0;
    if (veliNum > 2) {
        $("#velidateox").show();
    }

    $("#login").on("click", function () {
        var phoneExg = /^1[3,4,5,7,8]\d{9}$/;
        var username = $("#username").val();
        var password = $("#password").val();
        if (username == "") {
            maskTip("用户名不能为空");
            return;
        } else if (username.length != 11) {
            maskTip("手机号码格式不正确");
            return;
        }
        if (password == "") {
            maskTip("密码不能为空");
            return;
        }
        // if (veliNum >= 1) {
        //     var verifycode = $("#verifycode").val();
        //     if (verifycode == "") {
        //         maskTip("验证码不能为空");
        //         return;
        //     }
        // }
        var jsonObj = {};
        jsonObj["username"] = username;
        jsonObj["password"] = hex_sha1(password);
        jsonObj["randomKey"] = randomKey;
        jsonObj["userID"] = userID;
        jsonObj["clientID"] = clientID;
        jsonObj["cityID"] = cityID;
        jsonObj["local_x"] = local_x;
        jsonObj["local_y"] = local_y;
        jsonObj["localFrom"] = localFrom;
        if (veliNum >= 1) {
            jsonObj["verifycode"] = $("#verifycode").val().trim();
        }
        if (commitStatus) {
            commitStatus = false;
            $.ajax({
                async: false,
                type: "POST",
                url: "/hospital/login",
                dataType: "json",
                data: JSON.stringify(jsonObj),
                contentType: "application/json",
            }).done(function (response) {
                commitStatus = true;
                if (response.retCode == "000000") {//登陆成功，跳转进入的页面
                    /*if (response.responseBody.code == "200") {
                        window.location.href = "/hospital?page=" + comeFrom + "&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                    } else {
                        veliNum++;
                        maskTip(response.responseBody.msg);
                        if (veliNum >= 1) {
                            $("#velidateox").show();
                        }
                        return;
                    }*/
                   window.location.href = "/hospital?page=" + comeFrom + "&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                } else if (response == "") {//登陆失败
                    maskTip("登陆失败");
                    veliNum++;
                } else {
                    maskTip(response.responseBody.errorMsg);
                    veliNum++;
                }
            }).fail(function (data) {
                commitStatus = true;
                maskTip(response.responseBody.msg);
                veliNum++;
            }).always(function () {
                /*if (veliNum > 1) {
                    $("#velidateox").show();
                }*/
            });
        }
        event.preventDefault();
    })
    if (localFrom == "xinhuashe_app" && USERNAME && PASSWORD) {
        $("#loadMask").show();
        $("#mainTips").show();
        $("#login").click();
    }
    $("#resigter").on("click", function () {
        window.location.href = "/hospital?page=register&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y + "&comeFrom=" + comeFrom;
        event.preventDefault();
    })
    $("#back").on("click", function () {
        window.location.href = "/hospital?page=" + comeFrom + "&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    })
// 参数为空时的提示语
    function maskTip(mgs) {
        $("#loadMask").hide();
        $("#mainTips").hide();
        $('#masktime').html(mgs);
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    }
})