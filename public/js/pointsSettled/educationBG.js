;
(function ($) {
    if (localStorage.getItem("educationSum")) {
        $('input[name="smsradio"]').each(function (index, val) {
            if ($(val).val() == localStorage.getItem("educationSum")) {
                $(val).select().click();
            }
            ;
        })
    }
    ;
    if (localStorage.getItem("read")) {
        $('#read').val(localStorage.getItem("read"));
    }
})(Zepto)
function back() {
    var url = "/pointsSettled?page=legalResidence&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
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

function sure() {
    var check = $('input[name="smsradio"]:checked').val();//第4个积分
    var readSum = $('#read').val();
    var r = /^\+?[1-9][0-9]*$/;//正整数
    if (check == undefined) {
        masktime("请选择教育背景");
        return;
    }
    ;
    if (!readSum) {
        masktime("请填写社会保险年限月数");
        return;
    } else if (!r.test(readSum)) {
        masktime("请输入正整数");
        return;
    }
    ;
    localStorage.setItem("educationSum", check);
    localStorage.setItem("read", readSum);
    /*
     *第一个积分
     */
    var paymentTotal = localStorage.getItem("payment");
    var payTotal;
    payTotal = (paymentTotal - readSum) / 12 * 3;
    if (payTotal < 0) {
        payTotal = 0
    } else {
        payTotal = (paymentTotal - readSum) / 12 * 3;
    }
    localStorage.setItem("qualificat", payTotal);
    var url = "/pointsSettled?page=residentialArea&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
};