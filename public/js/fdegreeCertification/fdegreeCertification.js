var commonData = {
    randomKey: randomKey,
    userID: userID,
    clientID: clientID,
    cityID: cityID,
    local_x: local_x,
    localFrom: localFrom,
    local_y: local_y
};

$(function () {

    /*表单提交*/
    $("#queryButoon").click(function(){
        formData = commonData;
        /*姓名*/
        formData.txtFullName = $("#queryName").val();
        if(!formData.txtFullName){
            maskTip("查询姓名不能为空");
            return false;
        }
        /*认证证书编号-国籍*/
        formData.txtCountry = $("#txtCountry").val();
        if(!formData.txtCountry){
            maskTip("请输入认证证书编号");
            return false;
        }
        /*认证证书编号-年份*/
        formData.txtYear = $("#txtYear").val();
        if(!formData.txtYear){
            maskTip("请输入认证证书编号");
            return false;
        }
        /*认证证书编号-编号*/
        formData.txtNumber = $("#txtNumber").val();
        if(!formData.txtNumber){
            maskTip("请输入认证证书编号");
            return false;
        }
        /*认证类别*/
        formData.ddlRzlb = $("#AuthType_span").attr("data_id");

        /*验证码*/
        formData.vCCode_validateInputControl = $("#verification_input").val();
        if(!formData.vCCode_validateInputControl){
            maskTip("请输入验证码");
            return false;
        }
        $('#dialogMask,#dialog').show();

        $.ajax({
            async: true,
            url: "/fdegreeCertification/reportText",
            type: 'post',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function (data) {

                /*结束加载动画*/
                $('#dialogMask,#dialog').hide();
                if (data.retCode == "000000" ) {
                    if(data.responseBody.status == "success"){
                        data.responseBody.certName = formData.txtFullName;
                        sessionStorage.setItem("queryResult", JSON.stringify(data.responseBody));
                        var url = "/fdegreeCertification?page=result&randomKey=" + randomKey + "&userID=" + userID +
                            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
                        window.location.href = url;
                    }else{
                        maskTip(data.responseBody.desc);
                    }

                }else{
                    console.log(data);
                }
            },
            error: function (xhr, type) {
                console.log('Ajax error!')
            }
        })
    });


    /*认证类型*/
    $('#AuthType_span,#AuthType_img').on("click", function () {
        var arr = [
            {name: "国外", id: "1"},
            {name: "港澳台", id: "2"},
            {name: "合作办学", id: "3"},

        ];
        var selectBoxId = "#AuthType_span",
            selectBoxTitle = "认证类别";
        selecetbox(arr, selectBoxId, selectBoxTitle);
    });
    /*验证码下载*/
    $("#verificationCode").click(function () {
        $.ajax({
            async: true,
            url: "/fdegreeCertification/getVeryCode",
            type: 'post',
            data: JSON.stringify(commonData),
            contentType: 'application/json',
            success: function (data) {
                $('#verificationCode').attr("src", data);
            }
        });
    });
    $("#verificationCode").click();
});
/*下拉框效果*/
function selecetbox(array, selectBoxId, selectBoxTitle, stylesheetName = ".mobileSelect") {
    /*移除样式*/
    $(stylesheetName).remove();
    /*定义下拉框显示数据-示例*/
    /*var arr = [
        {name: "居民身份证", id: "1031"},
        {name: "护照", id: "1036"},
        {name: "港澳居民来往内地通行证", id: "1037"},
        {name: "台湾居民来往大陆通行证", id: "1039"}
    ];*/
    var mobileSelect1 = new MobileSelect({
        trigger:  selectBoxId,
        title: selectBoxTitle,
        wheels: [
            {data: array}
        ]
    });
    /*追加样式*/
    $(stylesheetName).addClass("mobileSelect-show");
}