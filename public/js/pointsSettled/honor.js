;
(function ($) {
    if (localStorage.getItem("honorTotal")) {
        $('input[name="smsradio"]').each(function (index, val) {
            if ($(val).attr("main-honor") == localStorage.getItem("honorTotal")) {
                $(val).select().click();
            }
            ;
        })
    }
    ;
})(Zepto)
function sure() {
    var honor = $('input[name="smsradio"]:checked').val();//第9个积分
    if (honor == undefined) {
        masktime("请选择荣誉表彰类型");
        return;
    };
    localStorage.setItem("honorTotalSum", honor);
    localStorage.setItem("honorTotal", $('input[name="smsradio"]:checked').attr("main-honor"));
    var url = "/pointsSettled?page=lawAbidingRecord&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
};
function back() {
    var url = "/pointsSettled?page=age&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
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