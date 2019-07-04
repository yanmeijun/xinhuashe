$(function () {
    var cityArr = [
        {id: 360100, name: "南昌市"},
        {id: 360200, name: "景德镇市"},
        {id: 360300, name: "萍乡市"},
        {id: 360400, name: "九江市"},
        {id: 360500, name: "新余市"},
        {id: 360600, name: "鹰潭市"},
        {id: 360700, name: "赣州市"},
        {id: 360800, name: "吉安市"},
        {id: 360900, name: "宜春市"},
        {id: 361000, name: "抚州市"},
        {id: 361100, name: "上饶市"}
    ]
    $("#adult_city,#adult_city_img").click(function () {//成人城市选择
        $(".mobileSelect").remove();
        var mobileSelect1 = new MobileSelect({
            trigger: '#adult_city',
            title: '选择城市',
            wheels: [
                {data: cityArr}
            ],
			callback: function () {
			  $('#adult_city').css("color","#474747")
			}
        })
        $(".mobileSelect").addClass("mobileSelect-show");
    });
    $("#child_city,#child_city_img").click(function () {//儿童城市选择
        $(".mobileSelect").remove();
        var mobileSelect1 = new MobileSelect({
            trigger: '#child_city',
            title: '选择城市',
            wheels: [
                {data: cityArr}
            ],
			callback: function () {
			  $('#child_city').css("color","#474747")
			}
        })
        $(".mobileSelect").addClass("mobileSelect-show");
    });
    var shipArr = [
        {id: 0, name: "本人或户主"},
        {id: 1, name: "配偶"},
        {id: 2, name: "孙子、孙女或外孙子、外孙女"},
        {id: 3, name: "父母"},
        {id: 4, name: "祖父母或外祖父母"},
        {id: 5, name: "兄，弟，姐，妹"},
        {id: 6, name: "子"},
        {id: 7, name: "女"},
        {id: 8, name: "其他"}
    ];
    $("#guardianshipRelationship,#guardianshipRelationship_img").click(function () {//监护关系选择
        $(".mobileSelect").remove();
        var mobileSelect1 = new MobileSelect({
            trigger: '#guardianshipRelationship',
            title: '选择监护关系',
            wheels: [
                {data: shipArr}
            ],
			callback: function () {
			  $('#guardianshipRelationship').css("color","#474747")
			}
        })
        $(".mobileSelect").addClass("mobileSelect-show");
    });
    //------------------日历选择插件start------------------------------
    var selectedDate = {};
    var currYear = (new Date()).getFullYear();
    var opt = {};
    opt.date = {preset: 'date'};
    opt.datetime = {preset: 'datetime'};
    opt.time = {preset: 'time'};
    opt.default = {
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        lang: 'zh',
        showNow: true,
        nowText: "今天",
        startYear: currYear - 20, //开始年份
        endYear: currYear + 10, //结束年份
        onBeforeShow: function (inst) {//展示前的事件
            document.activeElement.blur()
        },
        onSelect: function (valueText, inst) {//选择时事件（点击确定后），valueText 为选择的时间，
            valueText.match(/^\d{4}\-\d{2}\-\d{2}$/);
            if (valueText.match(/^\d{4}\-\d{2}\-\d{2}$/)) {
                selectedDate["date"] = valueText;
            } else {
                selectedDate["time"] = valueText;
            }
            calltimes = selectedDate.date + " " + selectedDate.time;
        }
    };
    $("#child_birthday").mobiscroll($.extend(opt['date'], opt['default']));
    //------------------日历选择插件end------------------------------
    $("#adult,#child").click(function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $(this).children("span").show();
        $(this).siblings().children("span").hide();
        $("#" + this.id + "_div").show();
        $("#" + this.id + "_div").siblings().hide();
    });
    $("#adult_boy,#adult_girl,#child_boy,#child_girl").click(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).parent().siblings().children("picture").addClass("active");
        } else {
            $(this).addClass("active");
            $(this).parent().siblings().children("picture").removeClass("active");
        }
    });
    $("#adult_submit,#child_submit").click(function () {
        var data;
        if (this.id == "adult_submit") {
            if (!$("#adult_name").val().trim()) {
                masktime("请输入真实姓名");
                return;
            }
            if (!$("#adult_idCard").val().trim()) {
                masktime("请输入身份证号码");
                return;
            }
            if (!$("#adult_mobile").val().trim()) {
                masktime("请输入手机号");
                return;
            }
            if (!$("#adult_city").attr("data_id")) {
                masktime("请选择所在城市");
                return;
            }
            data = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y,
                patientName: $("#adult_name").val().trim(),
                idenNo: $("#adult_idCard").val().trim(),
                birthDate: $("#adult_idCard").val().trim().substring(6, 10) + "-" + $("#adult_idCard").val().trim().substring(10, 12)
                    + "-" + $("#adult_idCard").val().trim().substring(12, 14),
                phone: $("#adult_mobile").val().trim(),
                sex: $("#adult_boy").attr("class") ? "1" : "2",
                city: $("#adult_city").attr("data_id"),
                isChildren: "0"
            };
        } else {
            if (!$("#child_name").val().trim()) {
                masktime("请输入真实姓名");
                return;
            }
            if (!$("#child_birthday").val().trim()) {
                masktime("请选择出生日期");
                return;
            }
            if (!$("#child_city").attr("data_id")) {
                masktime("请选择所在城市");
                return;
            }
            // if(!$("#guardianshipRelationship").attr("data_id")){
            //     masktime("请选择监护人关系");
            //     return;
            // }
            // if(!$("#guardianName").val()){
            //     masktime("请输入监护人姓名");
            //     return;
            // }
            if (!$("#guardianIdenNo").val().trim()) {
                masktime("请输入监护人证件号码");
                return;
            }
            if (!$("#guardianPhone").val().trim()) {
                masktime("请输入监护人手机号");
                return;
            }
            data = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x ,localFrom:localFrom,
                local_y: local_y,
                patientName: $("#child_name").val().trim(),
                idenNo: $("#child_idCard").val().trim(),
                birthDate: $("#child_birthday").val().trim(),
                sex: $("#child_boy").attr("class") ? "1" : "2",
                city: $("#child_city").attr("data_id"),
                isChildren: "1",
                guardianIdenNo: $("#guardianIdenNo").val().trim(),
                guardianName: $("#guardianName").val().trim(),
                guardianPhone: $("#guardianPhone").val().trim(),
                guardianshipRelationship: $("#guardianshipRelationship").attr("data_id")
            };
        }
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/jxHospital/addPatient',
            contentType: 'application/json',
            beforeSend: function () {
                $("#dialogMask,#dialog").show();
            }
        }).done(function (data) {
            $("#dialogMask,#dialog").hide();
            if (data.retCode == "000000") {
                if (JSON.parse(JSON.parse(data.responseBody.data)).resultCode == "success") {
                    masktime("添加成功");
                    renderTo();
                } else {
                    masktime("添加失败");
                }
            } else {
                masktime("添加失败");
            }
        })
    });
    $(document).on("touchstart", "img[id='back']", function () {
        window.location.href = "/jxHospital?page=registeredConfirm&cityID=" + cityID + "&localFrom=" + localFrom;
    })
    function masktime(mgs) {
        $('#masktime').html(mgs);
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000);
        return
    };
})
function renderTo() {
    window.location.href = "/jxHospital?page=registeredConfirm&comeFrom2=addPatient&cityID=" + cityID + "&localFrom=" + localFrom;
}
