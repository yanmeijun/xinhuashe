$(function () {
    var userRelationArr = [
        {id: 0, name: "本人"},
        {id: 1, name: "家人"},
        {id: 2, name: "朋友"},
        {id: 3, name: "亲属"},
        {id: 4, name: "未成年子女"},
        {id: 5, name: "其他"}
    ]
    $("#userRelation").click(function () {
        $(".mobileSelect").remove();
        var mobileSelect1 = new MobileSelect({
            trigger: '#userRelation',
            title: '选择关系',
            wheels: [
                {data: userRelationArr}
            ],
			callback: function () {
			  $('#userRelation').css("color","#474747")
			}
        })
        $(".mobileSelect").addClass("mobileSelect-show");
    });
    var cityArr = [
        {id: 370100, name: "济南市"},
        {id: 370200, name: "青岛市"},
        {id: 370300, name: "淄博市"},
        {id: 370400, name: "枣庄市"},
        {id: 370500, name: "东营市"},
        {id: 370600, name: "烟台市"},
        {id: 370700, name: "潍坊市"},
        {id: 370800, name: "济宁市"},
        {id: 370900, name: "泰安市"},
        {id: 371000, name: "威海市"},
        {id: 371100, name: "日照市"},
        {id: 371200, name: "莱芜市"},
        {id: 371300, name: "临沂市"},
        {id: 371400, name: "德州市"},
        {id: 371500, name: "聊城市"},
        {id: 371600, name: "滨州市"},
        {id: 371700, name: "菏泽市"}
    ]
    $("#citySelect,#cityImg").click(function () {
        $(".mobileSelect").remove();
        $("#liveCantCode").text("区县");
        $("#liveCantCode").attr("data_id", "");
        var mobileSelect1 = new MobileSelect({
            trigger: '#citySelect',
            title: '选择城市',
            wheels: [
                {data: cityArr}
            ],
			callback: function () {
			  $('#citySelect').css("color","#474747")
			}
        });
        $(".mobileSelect").addClass("mobileSelect-show");
    });
    $("#liveCantCode,#countImg").on("click", function () {
        $(".mobileSelect").remove();
        var cityId = $("#citySelect").attr("data_id");
        if (!cityId) {
            masktime("请选择城市！");
            return;
        }
        var data = {
            cityId: cityId,
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/hospital/getCounty',
            contentType: 'application/json'
        }).done(function (data) {
            if (data.retCode == '000000') {
                $(".mobileSelect").remove();
                var weekdayArr = [];
                var list = data.responseBody.list;
                list.forEach(function (item, index) {
                    weekdayArr.push({
                        name: item.name,
                        id: item.countryId
                    })
                });
                var mobileSelect1 = new MobileSelect({
                    trigger: '#liveCantCode',
                    title: '选择区县',
                    wheels: [
                        {data: weekdayArr}
                    ],
					callback: function () {
					  $('#liveCantCode').css("color","#474747")
					}
                })
                $(".mobileSelect").addClass("mobileSelect-show");
            }
        })
    });
    $("#sexBoy picture,#sexGirl picture").on("click", function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).parent().siblings("span").find('picture').removeClass("active");
        } else {
            $(this).addClass("active");
            $(this).parent().siblings("span").find('picture').removeClass("active");
        }
    });
    $("#submit").click(function () {
        if (!$("#name").val()) {
            masktime("请输入真实姓名！");
            return;
        } else if (!$("#userRelation").attr("data_id")) {
            masktime("请输入选择关系！");
            return;
        } else if (!$("#idNum").val()) {
            masktime("请输入证件号码！");
            return;
        } else if (!$(".active").attr("sex")) {
            masktime("请选择性别！");
            return;
        } else if (!$("#mobile").val()) {
            masktime("请输入联系方式！");
            return;
        } else if (!$("#citySelect").attr("data_id")) {
            masktime("请选择城市！");
            return;
        } else if (!$("#liveCantCode").attr("data_id")) {
            masktime("请选择区县！");
            return;
        } else if (!$("#address").val()) {
            masktime("请输入详细地址！");
            return;
        }
        var data = {
            name: $("#name").val(),
            idNum: $("#idNum").val(),
            mobile: $("#mobile").val(),
            address: $("#address").val(),
            userRelation: $("#userRelation").attr("data_id"),
            citySelect: $("#citySelect").attr("data_id"),
            liveCantCode: $("#liveCantCode").attr("data_id"),
            sex: $(".active").attr("sex"),
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/sDHospital/addPatient',
            contentType: 'application/json'
        }).done(function (data) {
            if (data.retCode == '000000') {
                masktime(data.responseBody.msg);
                window.location.href = "/sDHospital?page=appointmenRegistration&randomKey="
                    + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x
                    + "&local_y=" + local_y + "&localFrom=" + localFrom;
                // return;
            } else {
                masktime("添加失败！");
                return;
            }
        })
    });
    $("img[id='back']").click(function () {
        window.location.href = "/sDHospital?page=appointmenRegistration&randomKey="
            + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x
            + "&local_y=" + local_y + "&localFrom=" + localFrom;
    })
    function masktime(mgs) {
        $('#masktime').html(mgs);
        $('#masktime').show();
        setTimeout(function () {
            $('#masktime').hide();
        }, 2000)
        return
    };
})