$(function () {
    $("input[name=price_type]").click(function(){
        showCont()
    })
    function showCont(){
        switch($("input[name=price_type]:checked").attr("id")){
            case "price_one" :
                $("#content_one").show()
                $("#content_two").hide()
                break;
            case "price_two":
                $("#content_one").hide()
                $("#content_two").show()
                break;
            default:break;
        }
    }

    $("input[name=smsradio]").click(function(){
        selectType()
    })
    function selectType(){
        switch($("input[name=smsradio]:checked").attr("id")){
            case "reportPerson" :
                $("#personname").show()
                $("#personaddress").show()
                $("#nameunit").hide()
                $("#addressunit").hide()
                break;
            case "reportUnit":
                $("#personname").hide()
                $("#personaddress").hide()
                $("#nameunit").show()
                $("#addressunit").show()
                break;
            default:break;
        }
    }

});



$('#next').on("click", function () {
    var name = $('#name').val().trim(),
        phone = $('#phone').val().trim(),
        unitname = $('#unitname').val().trim(),
        unitphone = $('#unitphone').val().trim();
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("phone", phone);
    sessionStorage.setItem("unitname", unitname);
    sessionStorage.setItem("unitphone", unitphone);
    switch ($("input[name=price_type]:checked").attr("id")) {
        case "price_one" :
            if (!name) {
                maskTip("请输入姓名");
                return;
            }else if (name.length>100){
                maskTip("长度在100字之内！");
                $('#dialogMask,#dialog').hide();
                return;
            }
            if (!phone) {
                maskTip("请输入手机号");
                return;
            } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(phone))) {
                maskTip("请输入正确的手机号");
                return;
            }
            break;
        case "price_two":
            if (!unitname) {
                maskTip("请输入单位名称");
                return;
            }else if (unitname.length>100){
                maskTip("长度在100字之内！");
                $('#dialogMask,#dialog').hide();
                return;
            }
            if (!unitphone) {
                maskTip("请输入手机号");
                return;
            } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(unitphone))) {
                maskTip("请输入正确的手机号");
                return;
            }
            break;
        default:
            break;
    }
    var url = "/housingReport?page=infoFill&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = url;
})

$('#back').click(function(){
    window.location.href = "/housingReport?page=housingReport&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    return;
})

$('#agin').click(function(){
    window.location.href = "/housingReport?page=housingReport&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    return;
})