function goPage(pageUrl){
    var urls = "/gdsgGJJ?page=" + pageUrl + "&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = urls;
};
var RegResources = {
    xmReg: new RegExp("\\$\\{xm\\}", "g"),
    cardReg: new RegExp("\\$\\{card\\}", "g"),
    phoneReg: new RegExp("\\$\\{phone\\}", "g"),
    personAccountReg: new RegExp("\\$\\{personAccount\\}", "g"),
    companyAccountReg: new RegExp("\\$\\{companyAccount\\}", "g"),
    companyNameReg: new RegExp("\\$\\{companyName\\}", "g"),
};



function succ(){
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
        url: "/gdsgGJJ/succ",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (res) {
            if(res.retCode == '000000'){
                var data= res.responseBody.data;
                sessionStorage.setItem("userInfo",JSON.stringify(res.responseBody.data))
                var template = $("#results_div_temp").html(), html = "";
                html += template.replace(RegResources.xmReg, data.xm)
                    .replace(RegResources.cardReg, data.card)
                    .replace(RegResources.phoneReg, data.phone)
                    .replace(RegResources.personAccountReg, data.personAccount)
                    .replace(RegResources.companyAccountReg, data.companyAccount)
                    .replace(RegResources.companyNameReg, data.companyName)
                $("#results_div_temp").html(html);
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
        }
    })
};
succ()




/*
var data = JSON.parse(sessionStorage.getItem('userInfo'));
var template = $("#results_div_temp").html(), html = "";
html += template.replace(RegResources.xmReg, data.xm)
    .replace(RegResources.cardReg, data.card)
    .replace(RegResources.phoneReg, data.phone)
    .replace(RegResources.personAccountReg, data.personAccount)
    .replace(RegResources.companyAccountReg, data.companyAccount)
    .replace(RegResources.companyNameReg, data.companyName)
$("#results_div_temp").html(html);
*/

userCenter = true
$(".userAvatarBox").on("click", function (event) {
    if (userCenter) {
        userCenter = false;
        $(".userAvatarBox #userCenter").show();//记录
        $('body').css("position","fixed");
        $('#detail').show();
    } else {
        userCenter = true;
        $(".userAvatarBox #userCenter").hide();
        $('body').css("position","static");
        $('#detail').hide();
    }
});
/*退出*/
$('#quit').on('click',function(){
    $('body').css("position","static");
    var jsonObj = {
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
        type: "POST",
        url: "/gdsgGJJ/logout",
        dataType: "json",
        data: JSON.stringify(jsonObj),
        contentType: "application/json"
    }).done(function (res) {
        $('#dialogMask,#dialog').hide();
        if (res.retCode == "000000") {
            var urls = "/gdsgGJJ?page=gdsgGJJ&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
            window.location.href = urls;
        } else {//登陆失败
            maskTip(res.responseBody.errorMsg);
        }
    })
})
