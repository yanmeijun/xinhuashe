//查询错误，数据回填
// if(type!=''){
//     if(type=="5"){
//         $("#ValidateTypeText").val("联名卡号");
//     }else if(type=="1"){
//         $("#ValidateTypeText").val("身份证");
//     }
//     $("input[name='type']").val(type);
// }
//
// if(idCode!=""){
//     $("#idCode").val(idCode);
// }
// if(errMsg && errMsg!=""){
//     masktime(errMsg);
// }
//
// $(".icon-return").hide();
// $("input[name='randomKey']").val(randomKey);
// $("input[name='userID']").val(userID);
// $("input[name='clientID']").val(clientID);
// $("input[name='citySRC']").val(citySRC);
// $("input[name='cityName']").val(cityName);
// $("input[name='local_x']").val(local_x);
// $("input[name='local_y']").val(local_y);
// var velidate,commitStatus=true;
// // $("#veriCodeImg").on("click", function (event) {
// //     $(this).attr("src","/image?action=bjGJJ&randomKey="+randomKey+"&"+new Date().getTime());
// //     event.preventDefault();
// // });
// // $("#veriCodeImg").click();
// //验证方式弹框出现
// // $("#ValidateType,#chooseValidate .cityID").on("click", function (event) {
// $("#choose").on("click", function (event) {
//     $(".mask").show();
//     $("#dialog-car-box").show();
//     event.preventDefault();
// });
// //验证方式弹框消失
// $(".mask").on("click", function (event) {
//     $(".mask").hide();
//     $("#dialog-car-box").hide();
//     event.preventDefault();
// });
// //选择验证方式
// $("#velidataUl>li").on("click", function (event) {
//     if($(this).find("span").data("index")=="0"){
//         return;
//     }
//     var text = $(this).find("span").text(),
//         data_id = $(this).find("span").attr("data-index")
//     $("#ValidateType").val(data_id);
//     $("#ValidateTypeText").html(text);
//     // $("#ValidateTypeText").attr("data_id", data_id);
//     // $("#velidataUl").hide();
//     $(".mask").hide();
//     $("#dialog-car-box").hide();
//     // $(this).css("backgroundColor","#ccc");
//     // velidate=$(this).children("span").data("index");
//     // $("input[name='type']").val($(this).children("span").data("index"));
//     // $("#ValidateType").val($(this).children("a").html());
//     // $("#ValidateTypeText").html($(this).children("span").html());
//     // if(velidate=="5"){
//     //     $("#ValidateTypeText").html("联名卡号");
//     //     $("#ValidateType").val("5");
//     //     $("#idCode").attr("placeholder","银行卡号16-20位数字");
//     // }else if(velidate=="1"){
//     //     $("#ValidateTypeText").html("身份证");
//     //     $("#ValidateType").val("1");
//     //     $("#idCode").attr("placeholder","16位-20位数字或字母");
//     // }
//     // $(".mask").hide();
//     // $("#dialog-car-box").hide();
//     // $(this).css("backgroundColor","transparent");
//     event.preventDefault();
// });
// //点击查询
$("#Login").on("click", function (event) {
    var idCode = $("#idCode").val(),//证件号码
        password = $("#password").val(),//密码
        type = $("#ValidateType").attr("data_id");//验证方式
    if (!idCode) {
        masktime("请输入证件号码");
        return
    }
    if(type == "1"){
        if (!validateIdCard(idCode)) {
            masktime("请输入正确得证件号码");
            return
        }
    }
    if (!password) {
        masktime("请输入密码");
        return
    }
    $('#dialogMask,#dialog').show();
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,
        localFrom:localFrom,
        local_y: local_y,
        yzfs: type,
        password: password.trim(),
        hm: idCode.trim()
    };
    $.ajax({
        async: true,
        url: "/bjgjj/MPFLogin",
        type: "post",
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (res) {
            $('#dialogMask,#dialog').hide();
            if (res.retCode == "000000") {
                sessionStorage.setItem("loginResult",JSON.stringify(res.responseBody.data));
                var url = "/bjgjj?page=basicInfo&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                window.location.href = url;//跳转到对应的页面
            } else if(res.retCode == "000001"){
                masktime(res.responseBody.errorMsg);
                return;
            } else {
                masktime("请求超时，请稍后");
                return;
            }

        },
        error: function () {
            masktime("请求异常");
            return;
        }
    });

});


<!--请选择验证方式-->
$('#chooseValidate,#ValidateType').on("click", function () {
    $(".mobileSelect").remove();
    var weekdayArr = [
        {name: "联名卡号", id: "5"},
        {name: "身份证", id: "1"}
    ];
    var mobileSelect1 = new MobileSelect({
        trigger: '#ValidateType',
        title: '验证方式',
        wheels: [
            {data: weekdayArr}
        ],
        callback:function(indexArr, data){//点击选择按钮触发的回调函数,indexArr(选中的选项索引)、data(选中的数据)
            document.getElementsByTagName('body')[0].style.position = "static";
        }
    })
    $(".mobileSelect").addClass("mobileSelect-show");
    document.getElementsByTagName('body')[0].style.position = "fixed";
});
//提示语
function masktime(mgs) {
    $("#loadMask,#mainTips").hide();
    $('#masktime').html(mgs)
    $('#masktime').show();
    setTimeout(function () {
        $('#masktime').hide();
    }, 2000)
    return
};
