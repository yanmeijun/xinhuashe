/*驾照扣分*/
$(function () {
    if(localFrom == "xinhuashe_app"){
        getInputInfo();
    }
    //获取回填信息
    function getInputInfo() {
        var data = {
            clientID: clientID,
            serviceID: "AAB0001"
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/userLoginInfo/getUserInfo',
            contentType: 'application/json'
        }).done(function (data) {
            data.sfCode?sfCode = data.sfCode:"";
            $("#driver_data1").val(data.jszh);
            $("#driver_data2").val(data.dabh);
        });
    }
    getVeryCode();
    // $("#driver_image").attr("src", "/image?action=deduction&randomKey="+randomKey+"&"+ new Date().getTime());
    $("#driver_image").on("click", function () {
        getVeryCode();
    });
    // if (citySRC) {
    //     $("#citySRC").attr("src", citySRC)
    // } else {
    //     $("#citySRC").attr("src", "/images/banner.png")
    // }
    //获取图片验证码
    function getVeryCode() {
        $("#driver_image").attr("src", "/images/yanzm.gif");
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            sfCode: sfCode
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/car/deductionVeryCode',
            contentType: 'application/json'
        }).done(function (data) {
            $("#driver_image").attr("src", data);
        });
    }

    // if(licenseNo){
    //     $("#driver_data1").val(licenseNo)
    // }
    // if(fileNo){
    //     $("#driver_data2").val(fileNo)
    // }
    $("#driver_submit").click(function () {
        if (!$("#driver_data1").val()) {
            masktime("请输入驾驶证号码！");
            return;
        } else if (!$("#driver_data2").val()) {
            masktime("请输入档案编号！");
            return;
        } else if (!$("#driver_data3").val()) {
            masktime("请输入验证码！");
            return;
        }
        $('#dialogMask,#dialog').show();
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            sfCode: sfCode,
            licenseNo: $("#driver_data1").val().trim(),
            fileNo: $("#driver_data2").val().trim(),
            veriCode: $("#driver_data3").val().trim()
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/car/findDeduction',
            contentType: 'application/json'
        }).done(function (data) {
            $('#dialogMask,#dialog').hide();
            $("#driver_result").show();
            if (data.retCode == '000000' && data.responseBody.code == "200") {
                var detail = '您的驾驶证累计记分为' + data.responseBody.data.ljjf + '分。'
                $("#driver_line3").show();
                $("#driver_line1").html(detail)
                // $("#driver_line2").html(data.data.datail.substring(13))
            } else {
                $("#driver_line1").html(data.responseBody.message || "查询失败")
                $("#driver_line3").hide();
            }

        });
    });
    // $(".icon-return").click(function(){
    //     window.location.href = "/"
    // });
    function masktime(mgs) {
        $('#masktime').html(mgs)
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    };
})
