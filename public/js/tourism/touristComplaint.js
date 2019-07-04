var commitStatus = true;
var urls = "";
//同意协议、性别按钮切换
$("#agreeSelect").on("click", function () {
    $(this).toggleClass("active");
});
$("#sexBoy picture,#sexGirl picture").on("click", function () {
    if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).parent().siblings("span").find('picture').removeClass("active");
    } else {
        $(this).addClass("active");
        $(this).parent().siblings("span").find('picture').removeClass("active");
    }
})
var phoneExg = /^1[3,4,5,7,8]\d{9}$/;

$("#phoneNum").on("change", function (event) {
    if (phoneExg.test($(this).val())) {
        if (wait == 60) {
            // $("#getVel").removeClass("ccc").removeAttr("disabled")
        }
    } else {
        // $("#getVel").addClass("ccc");
    }
    event.preventDefault();
});
//点击获取验证码
$("#getVel").on("click", function (event) {
    if (wait != 60) {
        return;
    }
    if ($("#phoneNum").val() == "") {
        maskTip("手机号码不能为空");
        return;
    }

    if (!phoneExg.test($("#phoneNum").val())) {
        maskTip("手机号码格式不正确");
        return;
    }

    var url = "/tourism/getVerifyCode?phone=" + $("#phoneNum").val().trim() + "&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    $("#dialogMask,#dialog").show();
    $.ajax({
        async: false,
        type: "GET",
        url: url,
        dataType: "json",
        contentType: "application/json",
    }).done(function (response) {
        $("#dialogMask,#dialog").hide();
        if (response.retCode != "000000") {
            maskTip("短信发送失败");
        } else {
            if(response.responseBody.status != 1000){
                maskTip(response.responseBody.message || "短信发送失败");
                return;
            }
            maskTip("短信验证码正在发送中，请查看手机短信，如果2分钟内没有收到，请核实填写的手机号码。");
            // $(this).addClass("ccc");
            time($("#getVel"));
        }
    }).fail(function (data) {
    }).always(function () {
    });
    event.preventDefault();
});
var formData = new FormData();
var size = 0;
function imgChange(event) {
// $("#file").on("change", function() {
    var inputDOM = document.getElementById("file");
    // 通过DOM取文件数据
    var fil = inputDOM.files;
    // fileCount = fil.length;
    // if (fileCount > 10) {
    //     maskTip('最多可上传10张，您还可以上传' + (4 - oldLen) + '张');
    //     return;
    // }
    for (var i = 0; i < fil.length; i++) {
        size += Math.floor(fil[i].size / 1024);
        if (size > 10 * 1024 * 1024) {
            maskTip('请选择10M以内的图片！');
            return
        }
        // fileCount++;
        var imgUrl = null;
        if (window.createObjectURL != undefined) { // basic
            imgUrl = window.createObjectURL(fil[i]);
        } else if (window.URL != undefined) { // mozilla(firefox)
            imgUrl = window.URL.createObjectURL(fil[i]);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            imgUrl = window.webkitURL.createObjectURL(fil[i]);
        }
        // imgArr.push(imgUrl);
        var img = document.createElement("img");
        img.setAttribute("src", imgUrl);
        var imgCon = document.createElement("div");
        imgCon.className = "imgCon";
        imgCon.appendChild(img);
        var imgAdd = document.getElementsByClassName("z_photo")[0];
        imgAdd.appendChild(imgCon);
        formData.append('multipartFiles', fil[i]);
    }
}

//点击协议内容
$("#agreeBtn").on("click", function (event) {
    $("#complainBox").hide();
    $("#agreeText").show();
});
//协议内容返回
$("#agreeBack").on("click", function (event) {
    $("#complainBox").show();
    $("#agreeText").hide();
});
//提交
$("#complainSubmit").on("click", function (event) {
    if ($("#agreeSelect").hasClass("active")) {
        var name = $("#name").val();
        var complaints = $("#complaints").val();
        var phone = $("#phoneNum").val();
        var sex = $("picture.active").siblings('i').html();
        var respondent = $("#respondent").val();
        var verifycode = $("#verifycode").val();
        if (name == "") {
            maskTip("姓名不能为空");
            return;
        }
        if (!sex || sex == "") {
            maskTip("性别不能为空");
            return;
        }
        if (phone == "") {
            maskTip("手机号码不能为空");
            return;
        }
        if (verifycode == "") {
            maskTip("验证码不能为空");
            return;
        }
        if (respondent == "") {
            maskTip("被投诉方不能为空");
            return;
        }
        if (complaints == "") {
            maskTip("投诉理由不能为空");
            return;
        }
        // if (commitStatus) {
            var files = document.getElementById("file").files;
            commitStatus = false;
            if (files.length < 1) {
                maskTip("您未提交相应凭证，信息不完整，为了信息的有效性，希望您能够提交相应凭证。");
                return;
            }
            var data1 = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x,
                local_y: local_y,
                localFrom: localFrom,
                phone:phone,
                captcha:verifycode
            }
        $("#dialogMask,#dialog").show();
            $.ajax({
                async: true,
                type: 'post',
                data: JSON.stringify(data1),
                url: '/tourism/checkVerifyCode',
                contentType: 'application/json'
            }).done(function (res) {
                if(res.retCode == "000000" && res.responseBody.status == 1000){
                    $.ajax({
                        url: "/tourism/uploadFile",
                        type: "POST",
                        data: formData,
                        processData: false,
                        contentType: false,
                    }).done(function (response) {
                        var data = {
                            randomKey: randomKey,
                            userID: userID,
                            clientID: clientID,
                            cityID: cityID,
                            local_x: local_x,
                            local_y: local_y,
                            localFrom: localFrom,
                            ossList: response.ossList
                        }
                        $.ajax({
                            async: true,
                            type: 'post',
                            data: JSON.stringify(data),
                            url: '/tourism/getFileList',
                            contentType: 'application/json'
                        }).done(function (fileData) {
                            var len = urls.length - 1;
                            var jsonObj = {};
                            jsonObj["name"] = name;
                            jsonObj["complaints"] = complaints;
                            jsonObj["phone"] = phone;
                            jsonObj["sex"] = sex;
                            if (urls == "") {
                                jsonObj["urls"] = "";
                            } else {
                                jsonObj["urls"] = urls.substring(0, len);
                            }
                            jsonObj["respondent"] = respondent;
                            jsonObj["verifycode"] = verifycode;
                            jsonObj["randomKey"] = randomKey;
                            jsonObj["clientID"] = clientID;
                            jsonObj["userID"] = userID;
                            jsonObj["cityID"] = cityID;
                            jsonObj["local_x"] = local_x;
                            jsonObj["local_y"] = local_y;
                            jsonObj["files"] = fileData.fileList;
                            jsonObj["attachment"] = fileData.filePath;
                            jsonObj["deleteFolder"] = response.deleteFolder;
                            $.ajax({
                                async: false,
                                type: "POST",
                                url: "/tourism/submitInfo ",
                                dataType: "json",
                                data: JSON.stringify(jsonObj),
                                contentType: "application/json",
                            }).done(function (response) {
                                $("#dialogMask,#dialog").hide();
                                if (response.retCode == '000000') {
                                    commitStatus = true;
                                    maskTip("您的投诉已经提交成功，您可以在投诉查询中查看进度。");
                                } else {
                                    maskTip("您的投诉提交失败。");
                                }

                            }).fail(function (data) {
                                maskTip("您的投诉提交失败。");
                            }).always(function (data) {

                            });
                        })
                    })
                }else{
                    $("#dialogMask,#dialog").hide();
                    maskTip(res.responseBody.message || "验证码错误");
                    return;
                }
            })
        // }
    } else {
        maskTip("请查看协议内容");
        return;
    }

});
//点击返回按钮
$("#back_icon").on("click", function () {
    window.location.href = "/tourism?randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
});

var wait = 60;
function time(but) {
    if (wait == 0) {
        // $(but).removeAttr("disabled").removeClass("ccc");
        $(but).text("获取校验码");
        wait = 60;
    } else {
        // $(but).attr("disabled", true).addClass("ccc");
        $(but).text("重新发送(" + wait + ")");
        wait--;
        setTimeout(function () {
            time(but);
        }, 1000);
    }
}