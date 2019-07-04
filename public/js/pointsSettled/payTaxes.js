;
(function ($) {
    if (localStorage.getItem("falgsTaxes")) {
        $('input[name="smsradio"]').each(function (index, val) {
            if ($(val).attr("main-average") == localStorage.getItem("falgsTaxes")) {
                $(val).select().click();
            }
            ;
        })
    }
    ;
    if (localStorage.getItem("payDate")) {
        $('#recordTrigger').attr("data_id", localStorage.getItem("payDate"));
        $('#recordTrigger').html(localStorage.getItem("payDate"))
    }
})(Zepto)
function search() {
    var paytaxes = $('input[name="smsradio"]:checked').val();//第7个积分
    var paytaxe;
    if (paytaxes == undefined) {
        masktime("请选择创新创业类型");
        return;
    }
    ;
    if ($('#recordTrigger').attr("data_id") == "0") {
        paytaxe = $('input[name="smsradio"]:checked').val();
    } else {
        paytaxe = Number($('input[name="smsradio"]:checked').val()) - Number($('#recordTrigger').attr("data_id") * 12)
    }
    ;
    if ($('input[name="smsradio"]:checked').attr("main-average")) {
        localStorage.setItem("falgsTaxes", $('input[name="smsradio"]:checked').attr("main-average"));
    }
    console.log("第7个积分", paytaxe);
    localStorage.setItem("payDate", $('#recordTrigger').attr("data_id"));
    localStorage.setItem("paytaxeTotalSum", paytaxe);
    var url = "/pointsSettled?page=age&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
};
function back() {
    var url = "/pointsSettled?page=entrepreneurship&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
}
$('#record,#recordTrigger').on("click", function () {
    var weekdayArr = [
        {"id": "0", "name": "0"},
        {"id": "1", "name": "1"},
        {"id": "2", "name": "2"},
        {"id": "3", "name": "3"},
        {"id": "4", "name": "4"},
        {"id": "5", "name": "5"},
        {"id": "6", "name": "6"},
        {"id": "7", "name": "7"},
        {"id": "8", "name": "8"},
        {"id": "9", "name": "9"},
        {"id": "10", "name": "10"},
        {"id": "11", "name": "11"},
        {"id": "12", "name": "12"}
    ];
    $(".mobileSelect").remove();
    var mobileSelect1 = new MobileSelect({
        trigger: "#recordTrigger",
        title: '违法记录',
        wheels: [
            {data: weekdayArr}
        ],
		callback: function () {
		  $('#recordTrigger').css("color","#474747")
		}
    });
    $(".mobileSelect").addClass("mobileSelect-show");
})
function masktime(mgs) {
    $('#masktime').html(mgs)
    $('#masktime').show();
    setTimeout(function () {
        $('#masktime').hide();
    }, 2000)
    return
};