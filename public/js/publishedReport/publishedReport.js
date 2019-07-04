/*
* 非法出版活动举报
*/
/*文件地址*/
var filrUrl = "";
var forms = {
    randomKey: randomKey,
    userID: userID,
    clientID: clientID,
    cityID: cityID,
    local_x: local_x,
    localFrom: localFrom,
    local_y: local_y
}
$(function () {

    /*提交表单*/
    $("#reportText").on("click", function () {
        /*真实姓名*/
        forms.realName = $("#realname").val().trim();
        if (!forms.realName) {
            maskTip("举报人姓名不能为空");
            return false;
        }
        if (!(/[\u4e00-\u9fa5a-zA-Z]{1,}/.test(forms.realName))) {
            maskTip("只允许包含英文或汉字");
            return false;
        }
        /*性别*/
        forms.cardNo = $("input[name='smsradio']:checked").val();
        /*联系电话*/
        forms.phone = $("#mobile").val().trim();
        if (!forms.phone) {
            maskTip("请输入联系电话");
            return false;
        }
        if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(forms.phone))) {
            maskTip("请输入正确的手机号码");
            return false;
        }
        /*电子邮箱*/
        forms.email = $("#emails").val().trim();
        if (!forms.email) {
            maskTip("请输入电子邮箱");
            return false;
        }
        if (!email(forms.email)) {
            maskTip("请输入正确的电子邮箱");
            return false;
        }
        /*举报单位或个人*/
        forms.title = $("#title").val().trim();
        if (!forms.title) {
            maskTip("举报对象不能为空");
            return false;
        }
        if (!(/[\u4e00-\u9fa5a-zA-Z]{1,}/.test(forms.title))) {
            maskTip("只允许包含英文•或汉字。");
            return false;
        }
        /*详细地址*/
        forms.dxdz = $("#address").val();
        /*事实与线索*/
        forms.content = $("#contents").val();
        if (!forms.content) {
            maskTip("请输入举报内容");
            return false;
        }

        /*/!*附件*!/
        forms.fileUrl = "http://cloud3test.oss-cn-hangzhou.aliyuncs.com/publicService/20190104/deduction_hcdsj2c7uu81546582733730.png";*/

        /*验证码*/
        forms.valiCode = $("#verification_input").val().trim();
        var flag = true;
        if (forms.valiCode.length == 4) {
            var data = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x,
                localFrom: localFrom,
                local_y: local_y,
                code: forms.valiCode
            };
            $.ajax({
                async: false,
                url: "/publishedReport/verificationCode_check",
                type: 'post',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (datas) {
                    if (datas.retCode == "000000") {
                        var res  = datas.responseBody.data;
                        var resJson = JSON.parse(res);
                        if (!resJson.success ) {
                            maskTip("验证码错误，请重新输入");
                            flag = false;
                        }
                    }
                }
            });
        }else {
            maskTip("请输入验证码");
            return false;
        }
        if(!flag){
            return false
        }
        $('#dialogMask,#dialog').show();
        /*上传文件*/
        $.ajax({
            url: "/publishedReport/uploadFile",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
        }).done(function (response) {
            console.log(response)
            forms.fileUrl  = response[0];
            /*提交表单*/
            $.ajax({
                async: true,
                url: "/publishedReport/reportContents",
                type: 'post',
                data: JSON.stringify(forms),
                contentType: 'application/json',
                success: function (data) {
                    /*结束加载动画*/
                     $('#dialogMask,#dialog').hide();
                     if(data.retCode == "000000"){
                         window.location.href = "/publishedReport?page=success&randomKey=" + randomKey + "&userID=" + userID +
                             "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
                         return;
                     }else{
                         window.location.href = "/publishedReport?page=success&randomKey=" + randomKey + "&userID=" + userID +
                             "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
                         return;
                     }
                }
            });
        });



    });

    /*验证码下载*/
    $("#verificationCode").click(function () {
        $.ajax({
            async: true,
            url: "/publishedReport/verificationCode",
            type: 'post',
            data: JSON.stringify(forms),
            contentType: 'application/json',
            success: function (data) {
                $('#verificationCode').attr("src", data);
            }
        });
    });
    $("#verificationCode").click();

});

/*表单数据？*/
var formData = new FormData();
/*文件大小*/
var size = 0;
/*上传文件*/
function imgChange(event) {
// $("#file").on("change", function() {
    var inputDOM = document.getElementById("file");
    // 通过DOM取文件数据
    var fil = inputDOM.files;

    if(fil[0].type != "image/jpeg"){
        maskTip("只能上传jpg的图片");
        return false;
    }
    /*if (imagesId) {
        maskTip('只能上传一个附件');
        return;
    }*/
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
        var upPicDelete = document.createElement("div");
        upPicDelete.className = "upPicDelete";
        console.log(upPicDelete)
        upPicDelete.setAttribute("onclick", "upPicDelete(this)");
        var img = document.createElement("img");
        img.setAttribute("src", imgUrl);

        console.log(111111111111111111)
        img.id = "images_first";
        var imgCon = document.createElement("div");
        imgCon.className = "imgCon";
        imgCon.appendChild(upPicDelete);
        imgCon.appendChild(img);
        $(".upload-img").html(imgCon);

        /*var imgAdd = document.getElementsByClassName("uploadPicDefault")[0];

        imgAdd.appendChild(imgCon);*/
        /*if($(".imgCon").length== 0){
            $(".uploadPicDefault").append(imgCon);
        }else{
            $(".imgCon").html(imgCon);
        }
*/

        formData.append('multipartFiles', fil[i]);
    }
}
function upPicDelete(_this) {

    $(_this).parents(".imgCon").remove();
    /*$('.uploadPicList').css("height", "2.3rem");
    $('.z_photo').css("padding-left", "0rem");
    $('#uploadPicDefault').show();
    $('#uploadSum').html(count)
    if (count <= 0) {
        count = 0;
        $('#uploadSum').html(count)
    }*/
}