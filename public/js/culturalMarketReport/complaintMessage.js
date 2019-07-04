var backFrom = sessionStorage.getItem("backFrom"),informidVal;

$(function(){
    informid("/culturalMarketReport/informid","");
    informid("/culturalMarketReport/verifycode","");
    /*提交内容*/
    $('#submit').click(function () {
        var nameInfomant = $("#nameInfomant").val(); //举报人姓名
        if(!nameInfomant){
            maskTip("请填写您的姓名");
            return;
        }
        if (!/^[a-zA-Z\u4e00-\u9fa5]+$/.test(trim(nameInfomant))) {
            maskTip("姓名只能为汉字或字母");
            return;
        }
        var telephone = $("#telephone").val(); //举报人电话
        if(!telephone){
            maskTip("请输入电话");
            return;
        }

        if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(telephone))) {
            maskTip("请输入正确的电话");
            return;
        }
        var company = $("#company").val(); //举报人单位
        var address = $("#address").val(); //举报人地址
        var emails = $("#emails").val(); //举报人邮箱
        if(!emails){
            maskTip("请输入电子邮箱");
            return;
        }
        if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(trim(emails)) ) {
            maskTip("电子邮箱格式错误");
            return;
        }
        var contentReport = $("#contentReport").val(); //举报人内容
        if(!contentReport){
            maskTip("请填写举报内容");
            return;
        }
        var queryCode = $("#queryCode").val(); //举报人查询码
        if( 6 >queryCode.length || queryCode.length>18  ||!/^[A-Za-z0-9]*$/.test(trim(queryCode))){
            maskTip("查询码只能含有字母或数字,长度为6至18位");
            return ;
        }
        var queryCodeAgain = $("#queryCodeAgain").val(); //查询码再次确认
        var verifycode = $('#verifycode').val();
        if(queryCode != queryCodeAgain){
            maskTip("两次查询码不一致");
            return ;
        }
        if(!verifycode){
            maskTip("验证码不能为空");
            return;
        }
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x,
            localFrom: localFrom,
            local_y: local_y,
            nameInfomant : nameInfomant || "",  //举报人姓名
            telephone : telephone || "",    //举报人电话
            department : company || "",    //举报人单位
            address : address || "",    //举报人地址
            email : emails || "",  //举报人邮箱
            contentReport : contentReport || "",    //举报人内容
            queryCode : queryCode || "",    //举报人查询码
            informid : informidVal,
            codeConfirm:queryCodeAgain,
            verifycode:verifycode
        };
        informid("/culturalMarketReport/report",data);
    });
});
function informid(url,params){
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x,
        localFrom: localFrom,
        local_y: local_y
    };
    params = params ? params: data;
    $.ajax({
        async: true,
        url: url,
        type: 'post',
        data: JSON.stringify(params),
        contentType: 'application/json',
        success: function (data) {
            if(data.retCode == "000000"){
                if (url == "/culturalMarketReport/informid") {
                    informidVal = data.responseBody.data;
                    return;
                } else if(url == "/culturalMarketReport/verifycode"){
                    $('#imgVCode').attr("src",data.responseBody.data)
                    return;
                } else {
                    sessionStorage.setItem("searchResult", JSON.stringify(data.responseBody.data));
                    var urls = "/culturalMarketReport?page=result&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
                    window.location.href = urls;
                }
            }else{
                maskTip("提交失败");
                return;
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    })
};
$('#imgVCode').on('click',function(){
    $('#imgVCode').attr("src","/images/yanzm.gif");
    informid("/culturalMarketReport/verifycode","");
})
/*举报内容可用性*/
function reportContentQuery(contentReport){
    if(!contentReport){
        maskTip("请填写举报内容");
        return;
    }
}
/*查询码可用性*/
function reportCodeQuery(queryCode){
    if(6 >queryCode.length || queryCode.length>18 ){
        maskTip("查询码只能含有字母或数字,长度为6至18位");
        return ;
    }
}
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
/*返回按钮*/
$('#backFrom').on("click", function () {
    if (backFrom == "culturalMarketReport") {
        var url = "/culturalMarketReport?page=culturalMarketReport&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
        window.location.href = url;
    }else{
        var url =  "/?randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
        window.location.href = url;
    }
});
/*重置按钮*/
$("#reset").on("click",function(){
    var url = "/culturalMarketReport?page=complaintMessage&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = url;
    return ;
});

function reportCodeQuery(queryCode){
    if(6 >queryCode.length || queryCode.length>18 ){
        maskTip("查询码只能含有字母或数字,长度为6至18位");
        return ;
    }else if(!$("#nameInfomant").val()){
        return;
    }
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x,
        localFrom: localFrom,
        local_y: local_y,
        querycode : queryCode,
        name:$("#nameInfomant").val()
    };
    console.log(data);
    $.ajax({
        async: true,
        url: "/culturalMarketReport/searchCode",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (res) {
            if(res.responseBody.message == "false"){
                maskTip("*此内容已经被使用，请重新输入!");
                return;
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    })
}