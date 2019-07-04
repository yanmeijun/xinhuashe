$(function () {
    if (cityName) {
        $("#sameName_address").text(cityName)
    }

    var RegResources = {
        xmIdReg: new RegExp("\\$\\{xmId\\}", "g"),
        xmReg: new RegExp("\\$\\{xm\\}", "g"),
        khrqReg: new RegExp("\\$\\{khrq\\}", "g"),
        gjjzhReg: new RegExp("\\$\\{gjjzh\\}", "g"),
        mcjcnyReg: new RegExp("\\$\\{mcjcny\\}", "g"),
        ssdwReg: new RegExp("\\$\\{ssdw\\}", "g"),
        yjceReg: new RegExp("\\$\\{yjce\\}", "g"),
        dqzhztReg: new RegExp("\\$\\{dqzhzt\\}", "g"),
        bdsjhReg: new RegExp("\\$\\{bdsjh\\}", "g"),
        smrzztReg: new RegExp("\\$\\{smrzzt\\}", "g"),
        zhyeReg: new RegExp("\\$\\{zhye\\}", "g"),
        timeReg: new RegExp("\\$\\{time\\}", "g")

    };
    var data = JSON.parse(localStorage.getItem('data'));
    var template = $("#results_div_temp").html(), html = "";
    html += template.replace(RegResources.xmReg, data.xm)
        .replace(RegResources.khrqReg, data.khrq)
        .replace(RegResources.gjjzhReg, data.gjjzh)
        .replace(RegResources.mcjcnyReg, data.wjcny)
        .replace(RegResources.ssdwReg, data.ssdw)
        .replace(RegResources.yjceReg, data.yjce)
        .replace(RegResources.dqzhztReg, data.dqzhzt)
        .replace(RegResources.bdsjhReg, data.bdsjh)
        .replace(RegResources.smrzztReg, data.smrzzt)
    $("#results_div_temp").html(html);
    //console.log(data)
    //最后更新时间
    var template4 = $("#time").html(), html4 = "";
    html4 += template4.replace(RegResources.timeReg, data.time)
    $("#time").html(html4);
    //账户余额
    var template2 = $("#moneyNum").html(), html1 = "";
    var zhye1 = data.zhye.replace("元", "")
    html1 += template2.replace(RegResources.zhyeReg, zhye1)
    $("#moneyNum").html(html1);
    //缴存明细
    $("#jnmx").on("click", function () {
        var jsonObj = {
            "randomKey": randomKey,
            "ID": 11,
            "userID": userID,
            "clientID": clientID,
            "cityID": cityID,
            "local_x": local_x,
            "local_y": local_y
        };
        $.ajax({
            async: false,
            type: "POST",
            url: "/shangHaiFund/historyDetails",
            dataType: "json",
            data: JSON.stringify(jsonObj),
            contentType: "application/json"
        }).done(function (response) {
            //console.log(response)
            if (response.retCode == "000000") {
                localStorage.setItem('lists', JSON.stringify(response.responseBody.lists));
                var lists = JSON.parse(localStorage.getItem('lists'));
                var template3 = $("#tabTable").html(), html3 = "";
                for (var i = 0; i < lists.length; i++) {
                    var riqiTimeN = lists[i].riqi.substring(0, 5)
                    var riqiTimeY = lists[i].riqi.substring(5, 10)
                    var nian = riqiTimeN.replace("年", "-");
                    var yue = riqiTimeY.replace("月", "-");
                    var nY = nian + yue;
                    html3 += "<tr>" +
                        "<td class='time'>" + nY + "</td>" +
                        "<td class='text-right'>" + lists[i].money + "</td>" +
                        "<td class='color79'>" + lists[i].business + "</td>" +
                        "</tr>"
                }
                $("#tabTable").html(html3)
            } else {//登陆失败
                alert(response.responseBody.errorMsg);
            }
        })
    })
    $("#userCenter").click(function () {
        var getDisplay = document.getElementById("userCenterList").style.display;
        if (getDisplay == "none") {
            $("#userCenterList").show();
        } else {
            $("#userCenterList").hide();
        }
    });
    $('#back,#quit').on('click', function () {//返回页面
        var url = "/shangHaiFund?page=shangHaiFund&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        window.location.href = url;//跳转到对应的页面
    })

    //选项卡切换$("#gjj-tab li,#gjj-tab li a")
    $("#gjj-tab li a").on("click", function () {
        $(this).parent().addClass('active').siblings().removeClass('active');
        var _index = $(this).parent().index();
        $("#gjj-tabCon .gjj-con").eq(_index).show().siblings().hide();
    })
    //明细显示隐藏
    $("#tab-tit-img").on("click", function () {
        $("#tab-content-box").toggle();
    })
    //banner显示与隐藏
    $("#zhmx").on("click", function () {
        $("#userBanner").show()
        $("#allBanner").hide()
    })
    $("#jnmx").on("click", function () {
        $("#userBanner").hide()
        $("#allBanner").show()
    })
    //余额显示隐藏
    $("#yeHide").on("click", function () {
        $("#moneyNum").hide()
        $("#moneyShow").show()
    })
    $("#yeShow").on("click", function () {
        $("#moneyNum").show()
        $("#moneyShow").hide()
    })
})