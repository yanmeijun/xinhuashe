;
(function ($) {
    if (localStorage.getItem("falgsEnter")) {
        $('input[name="smsradio"]').each(function (index, val) {
            if ($(val).val() == localStorage.getItem("falgsEnter")) {
                $(val).select().click();
            }
            ;
            if (localStorage.getItem("falgsEnter") == "1") {
                $('#scienceTrigger').attr("data_id", localStorage.getItem("entrenTotalSum"));
                $('#scienceTrigger').html(localStorage.getItem("science"))
            }
            ;
            if (localStorage.getItem("falgsEnter") == "2") {
                $('#CountryTrigger').attr("data_id", localStorage.getItem("entrenTotalSum"));
                $('#CountryTrigger').html(localStorage.getItem("Country"))
            }
            ;
            if (localStorage.getItem("falgsEnter") == "3") {
                $('#OverYearTrigger').attr("data_id", localStorage.getItem("entrenTotalSum"));
                $('#OverYearTrigger').html(localStorage.getItem("OverYear"))
            }
            ;
            if (localStorage.getItem("falgsEnter") == "4") {
                $('#TwoYearsTrigger').attr("data_id", localStorage.getItem("entrenTotalSum"));
                $('#TwoYearsTrigger').html(localStorage.getItem("TwoYears"))
            }
            if (localStorage.getItem("falgsEnter") == "5") {
                $('#AuthentTrigger').attr("data_id", localStorage.getItem("entrenTotalSum"));
                $('#AuthentTrigger').html(localStorage.getItem("Authent"))
            }
            if (localStorage.getItem("falgsEnter") == "6") {
                $('#technologyTrigger').attr("data_id", localStorage.getItem("entrenTotalSum"));
                $('#technologyTrigger').html(localStorage.getItem("technology"));
            }
        })
    }
    ;
})(Zepto)
function sure() {
    var entrepren = $('input[name="smsradio"]:checked').val();//第6个积分
    var entren;
    var falgsEnter = 0;
    localStorage.setItem("falgsEnter", falgsEnter);
    if (entrepren == undefined) {
        masktime("请选择创新创业类型");
        return;
    }
    ;
    entren = 0
    if (entrepren == 1) {
        if (!$('#scienceTrigger').attr("data_id")) {
            masktime("请选择所选中项的年限");
            return;
        } else {
            entren = $('#scienceTrigger').attr("data_id");
            falgsEnter = 1;
            localStorage.setItem("science", $('#scienceTrigger').html());
            localStorage.setItem("falgsEnter", falgsEnter);
        }
    }
    ;
    if (entrepren == 2) {
        if (!$('#CountryTrigger').attr("data_id")) {
            masktime("请选择所选中项的年限");
            return;
        } else {
            entren = $('#CountryTrigger').attr("data_id");
            falgsEnter = 2;
            localStorage.setItem("Country", $('#CountryTrigger').html());
            localStorage.setItem("falgsEnter", falgsEnter);
        }
    }
    ;
    if (entrepren == 3) {
        if (!$('#OverYearTrigger').attr("data_id")) {
            masktime("请选择所选中项的年限");
            return;
        } else {
            entren = $('#OverYearTrigger').attr("data_id");
            falgsEnter = 3;
            localStorage.setItem("OverYear", $('#OverYearTrigger').html());
            localStorage.setItem("falgsEnter", falgsEnter);
        }
    }
    ;
    if (entrepren == 4) {
        if (!$('#TwoYearsTrigger').attr("data_id")) {
            masktime("请选择所选中项的年限");
            return;
        } else {
            entren = $('#TwoYearsTrigger').attr("data_id");
            falgsEnter = 4;
            localStorage.setItem("TwoYears", $('#TwoYearsTrigger').html());
            localStorage.setItem("falgsEnter", falgsEnter);
        }
    }
    ;
    if (entrepren == 5) {
        if (!$('#AuthentTrigger').attr("data_id")) {
            masktime("请选择所选中项的年限");
            return;
        } else {
            entren = $('#AuthentTrigger').attr("data_id");
            falgsEnter = 5;
            localStorage.setItem("Authent", $('#AuthentTrigger').html());
            localStorage.setItem("falgsEnter", falgsEnter);
        }
    }
    ;
    if (entrepren == 6) {
        if (!$('#technologyTrigger').attr("data_id")) {
            masktime("请选择所选中项的年限");
            return;
        } else {
            entren = $('#technologyTrigger').attr("data_id");
            falgsEnter = 6;
            localStorage.setItem("technology", $('#technologyTrigger').html());
            localStorage.setItem("falgsEnter", falgsEnter);
        }
    }
    ;

    console.log("第6个积分", entren);
    localStorage.setItem("entrenTotalSum", entren);
    var url = "/pointsSettled?page=payTaxes&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
};
function back() {
    var url = "/pointsSettled?page=residentialArea&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
}
function masktime(mgs) {
    $('#masktime').html(mgs)
    $('#masktime').show();
    setTimeout(function () {
        $('#masktime').hide();
    }, 2000)
    return
};
$('#science,#scienceTrigger').on("click", function () {
    if (!$('input[name="smsradio"]:checked').val()) {
        return;
    }
    ;
    if ($('input[name="smsradio"]:checked').val() === "1") {
        $('#CountryTrigger,#OverYearTrigger,#TwoYearsTrigger,#AuthentTrigger,#technologyTrigger').html("请选择");
        var weekdayArr = [
            {"id": "2", "name": "积2分"},
            {"id": "4", "name": "积4分"},
            {"id": "5", "name": "积5分"},
            {"id": "6", "name": "积6分"},
            {"id": "8", "name": "积8分"},
            {"id": "9", "name": "积9分"},
            {"id": "10", "name": "积10分"},
            {"id": "11", "name": "积11分"},
            {"id": "12", "name": "积12分"}
        ];
        auto('#scienceTrigger', weekdayArr);
        $('#AuthentTrigger').html("请选择");
        return;
    }
    ;

});
$('#Country,#CountryTrigger').on("click", function () {
    if (!$('input[name="smsradio"]:checked').val()) {
        return;
    }
    ;
    if ($('input[name="smsradio"]:checked').val() === "2") {
        $('#scienceTrigger,#OverYearTrigger,#TwoYearsTrigger,#AuthentTrigger,#technologyTrigger').html("请选择");
        var weekdayArr = [
            {"id": "2", "name": "积2分"},
            {"id": "3", "name": "积3分"},
            {"id": "4", "name": "积4分"},
            {"id": "6", "name": "积6分"},
            {"id": "9", "name": "积9分"},
            {"id": "12", "name": "积12分"}
        ];
        auto('#CountryTrigger', weekdayArr);
        return;
    }
    ;
});
$('#OverYear,#OverYearTrigger').on("click", function () {
    if (!$('input[name="smsradio"]:checked').val()) {
        return;
    }
    ;
    if ($('input[name="smsradio"]:checked').val() === "3") {
        $('#scienceTrigger,#CountryTrigger,#TwoYearsTrigger,#AuthentTrigger,#technologyTrigger').html("请选择");
        var weekdayArr = [
            {"id": "2", "name": "满1年"},
            {"id": "4", "name": "满2年"},
            {"id": "6", "name": "满3年"}
        ];
        auto('#OverYearTrigger', weekdayArr);
        return;
    }
    ;
});
$('#TwoYears,#TwoYearsTrigger').on("click", function () {
    if (!$('input[name="smsradio"]:checked').val()) {
        return;
    }
    ;
    if ($('input[name="smsradio"]:checked').val() === "4") {
        $('#scienceTrigger,#CountryTrigger,#OverYearTrigger,#AuthentTrigger,#technologyTrigger').html("请选择");
        var weekdayArr = [
            {"id": "2", "name": "满1年"},
            {"id": "4", "name": "满2年"},
            {"id": "6", "name": "满3年"}
        ];
        auto('#TwoYearsTrigger', weekdayArr);
        return;
    }
    ;
});
$('#Authent,#AuthentTrigger').on("click", function () {
    if (!$('input[name="smsradio"]:checked').val()) {
        return;
    }
    ;
    if ($('input[name="smsradio"]:checked').val() === "5") {
        $('#scienceTrigger,#CountryTrigger,#OverYearTrigger,#TwoYearsTrigger,#technologyTrigger').html("请选择");
        var weekdayArr = [
            {"id": "2", "name": "满1年"},
            {"id": "4", "name": "满2年"},
            {"id": "6", "name": "满3年"}
        ];
        auto('#AuthentTrigger', weekdayArr)
    }
    ;
});
$('#technology,#technologyTrigger').on("click", function () {
    if (!$('input[name="smsradio"]:checked').val()) {
        return;
    }
    ;
    if ($('input[name="smsradio"]:checked').val() === "6") {
        $('#scienceTrigger,#CountryTrigger,#OverYearTrigger,#TwoYearsTrigger,#AuthentTrigger').html("请选择");
        var weekdayArr = [
            {"id": "1", "name": "满1年"},
            {"id": "2", "name": "满2年"},
            {"id": "3", "name": "满3年"}
        ];
        auto('#technologyTrigger', weekdayArr);
        return;
    }
})
function auto(elem, weekdayArr) {
    $(".mobileSelect").remove();
    var mobileSelect1 = new MobileSelect({
        trigger: elem,
        title: '请选择',
        wheels: [
            {data: weekdayArr}
        ],
        callback: function () {
              $(elem).css("color","rgb(71, 71, 71)");
        }
    });
    $(".mobileSelect").addClass("mobileSelect-show");
}
$('input[name="smsradio"]').on("click", function () {
    var valInd = $(this).val();
    $('#cond,#cond2,#cond3,#cond4,#cond5,#cond6').hide();
    console.log(valInd)
    if (valInd == "1") {
        $('#cond').show();
    } else if (valInd == "2") {
        $('#cond2').show();
    } else if (valInd == "3") {
        $('#cond3').show();
    } else if (valInd == "4") {
        $('#cond4').show();
    } else if (valInd == "5") {
        $('#cond5').show();
    } else if (valInd == "6") {
        $('#cond6').show();
    }

})