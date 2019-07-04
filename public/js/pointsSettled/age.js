;
(function ($) {
    if (localStorage.getItem("ageTotalSum")) {
        $('input[name="smsradio"]').each(function (index, val) {
            if ($(val).val() == localStorage.getItem("ageTotalSum")) {
                $(val).select().click();
            }
            ;
        })
    }
    ;
})(Zepto)
function searchSure() {
    var age = $('input[name="smsradio"]:checked').val();//第8个积分
    if (age == undefined) {
        masktime("请选择申报年龄");
        return;
    }
    ;
    localStorage.setItem("ageTotalSum", age);
    var url = "/pointsSettled?page=honor&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
};

function back() {
    var url = "/pointsSettled?page=payTaxes&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
};
function masktime(mgs) {
    $('#masktime').html(mgs)
    $('#masktime').show();
    setTimeout(function () {
        $('#masktime').hide();
    }, 2000)
    return
};