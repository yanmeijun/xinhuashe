;
(function ($) {
    if (localStorage.getItem("resiTotalSum")) {
        $('input[name="smsradio"]').each(function (index, val) {
            if (localStorage.getItem("falgs") == $(val).val()) {
                $(val).select().click();
            }
        });
        if (localStorage.getItem("falgs") == "2") {
            if (localStorage.getItem("resid")) {
                $('#residTrigger').attr("data_id", localStorage.getItem("resiTotalSum"));
                $('#residTrigger').html(localStorage.getItem("resid"));
            }
            ;
        }
        if (localStorage.getItem("falgs") == "3") {
            if (localStorage.getItem("residents")) {
                $('#residentsTrigger').attr("data_id", localStorage.getItem("resiTotalSum"));
                $('#residentsTrigger').html(localStorage.getItem("residents"))
            }
            ;
        }

    }
    ;
})(Zepto)
function search() {
    var resident = $('input[name="smsradio"]:checked').val();//第5个积分
    var resiTotal;
    var falg = 0;
    localStorage.setItem("falgs", falg);
    if (resident == undefined) {
        masktime("请选择职住区域类型");
        return;
    }
    ;
    resiTotal = 0
    if (resident == "3") {
        if (!$('#residentsTrigger').attr("data_id")) {
            masktime("请选择所选中项的年限");
            return;
        } else {
            resiTotal = $('#residentsTrigger').attr("data_id");
            localStorage.setItem("residents", $('#residentsTrigger').html())
            falg = 3;
            localStorage.setItem("falgs", falg);
        }
    }
    ;
    if (resident == "2") {
        if (!$('#residTrigger').attr("data_id")) {
            masktime("请选择所选中项的年限");
            return;
        } else {
            resiTotal = $('#residTrigger').attr("data_id");
            localStorage.setItem("resid", $('#residTrigger').html());
            falg = 2;
            localStorage.setItem("falgs", falg);
        }
    }
    ;
    localStorage.setItem("resiTotalSum", resiTotal);
    var url = "/pointsSettled?page=entrepreneurship&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;

};

$('#resid,#residTrigger').on("click", function () {
    if (!$('input[name="smsradio"]:checked').val()) {
        return;
    }
    ;
    if ($('input[name="smsradio"]:checked').val() == "2") {
        var weekdayArr = [
            {"id": "2", "name": "满1年"},
            {"id": "4", "name": "满2年"},
            {"id": "6", "name": "满3年及以上"}
        ]
        $(".mobileSelect").remove();
        var mobileSelect1 = new MobileSelect({
            trigger: '#residTrigger',
            title: '请选择',
            wheels: [
                {data: weekdayArr}
            ],
			callback: function () {
			  $('#residTrigger').css("color","#474747")
			}
        });
        $(".mobileSelect").addClass("mobileSelect-show");
    }
});
$('#residents,#residentsTrigger').on("click", function () {
    if (!$('input[name="smsradio"]:checked').val()) {
        return;
    }
    ;
    if ($('input[name="smsradio"]:checked').val() == "3") {
        var weekdayArr = [
            {"id": "4", "name": "满1年"},
            {"id": "8", "name": "满2年"},
            {"id": "12", "name": "满3年及以上"}
        ]
        $(".mobileSelect").remove();
        var mobileSelect1 = new MobileSelect({
            trigger: '#residentsTrigger',
            title: '请选择',
            wheels: [
                {data: weekdayArr}
            ],
			callback: function () {
			  $('#residentsTrigger').css("color","#474747")
			}
        });
        $(".mobileSelect").addClass("mobileSelect-show");
    }
});
function back() {
    var url = "/pointsSettled?page=educationBG&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
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