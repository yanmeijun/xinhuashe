fnSize()
window.addEventListener('resize', fnSize, false)
function fnSize() {
    if (document.documentElement.offsetWidth > 1024) {
        document.getElementsByTagName('html')[0].style.fontSize = 375 / 10 + 'px';
        document.getElementsByClassName("max")[0].style.width = "375px";
        document.getElementsByClassName("max")[0].style.margin = "0 auto";
        document.getElementsByClassName("data-sources")[0].style.width = "375px";
        return;
    } else {
        document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.offsetWidth / 10 + 'px';
        document.getElementsByClassName("max")[0].style.width = "100%";
        document.getElementsByClassName("data-sources")[0].style.width = "100%";
        return;
    }

}
var randomKey = randomKey || window.location.search.replace("?randomKey=", "");
$(function () {
    $("#icon-downMenu").on("click", function () {
        $(".mask").fadeIn(100);
        $("#dialog-car-box").fadeIn(100)
    })
    $("#car-num").on("click", function () {
        $(".mask").fadeIn(100);
        $("#dialog-carNum-box").fadeIn(100)
    })
    $(".mask").on("click", function () {
        $(".mask").fadeOut(100);
        $("#dialog-car-box").fadeOut(100)
        $("#dialog-carNum-box").fadeOut(100)
    })
    $("div[id^='tab-content-']").hide();
    $("img[id^='tab-tit-']").on("click", function () {
        var id = $(this).attr("id").replace("tab-tit-", "");
        $("#tab-content-" + id).toggle(100)
    })
    $("#driver_image").attr("src", "https://api.internetware.cn/xinhuashe/?iw-apikey=" + randomKey + "&iw-cmd=deductionVeriCode&" + new Date().getTime());
    $("#peccancy_image").attr("src", "https://api.internetware.cn/xinhuashe/?iw-apikey=" + randomKey + "&iw-cmd=infractionveriCode&" + new Date().getTime());
    $("#shebao_image").attr("src", "https://api.internetware.cn/xinhuashe/?iw-apikey=" + randomKey + "&iw-cmd=yanzhengma&" + new Date().getTime());

    $("#driver_image").on("click", function () {
        $("#driver_image").attr("src", "https://api.internetware.cn/xinhuashe/?iw-apikey=" + randomKey + "&iw-cmd=deductionVeriCode&" + new Date().getTime());
    });
    $("#peccancy_image").on("click", function () {
        $("#peccancy_image").attr("src", "https://api.internetware.cn/xinhuashe/?iw-apikey=" + randomKey + "&iw-cmd=infractionveriCode&" + new Date().getTime());
    });
    $("#shebao_image").on("click", function () {
        $("#shebao_image").attr("src", "https://api.internetware.cn/xinhuashe/?iw-apikey=" + randomKey + "&iw-cmd=yanzhengma&" + new Date().getTime());
    });
    $("#medicine_submit").click(function () {
        var data = {
            keyword: $("#medicine_data1").val()
        };
        $.ajax({
            async: true,
            type: 'get',
            data: data,
            url: '/medicineSearch',
            contentType: 'application/json'
        }).done(function (data) {
            $("#medicine_result").show();
            //console.log(data);
            //console.log(data.data.data);
            if (data.errCode == '000000') {
                var data = data.data;
                var temp = "";
                for (var i = 0; i < data.length; i++) {
                    // temp += "<li onclick='detail("+ data[i].id +")'>"+ data[i].name +"</li>"
                    temp += "<li id='" + data[i].id + "'>" + data[i].name + "</li>"
                }
                console.log(temp);

                $("#medicine_ul").html(temp);
            } else {
                $("#medicine_line1").show();
                $("#medicine_line1").html(data.errMsg)
            }

        });
    });
    $("#medicine_ul").on("click", "li", function () {
        var data = {
            id: $(this).attr("id")
        };
        $.ajax({
            async: true,
            type: 'get',
            data: data,
            url: '/medicineDetail',
            contentType: 'application/json'
        }).done(function (data) {
            if (data.errCode == '000000') {
                var data = data.data;
                alert(data.content)
                // alert("名称：%name\n来源：%source\n内容：%content", data.name, data.source, data.content)
            } else {
                alert(data.errMsg)
            }

        });
    });

    $("#driver_submit").click(function () {
        var data = {
            randomKey: randomKey,
            licenseNo: $("#driver_data1").val(),
            fileNo: $("#driver_data2").val(),
            veriCode: $("#driver_data3").val()
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/car/findDeduction',
            contentType: 'application/json'
        }).done(function (data) {
            $("#driver_result").show();
            //console.log(data);
            //console.log(data.data.datail);
            if (data.rtnCode == '000000') {
                //console.log(data.data.datail.substring(0,13));
                $("#driver_line3").show();
                $("#driver_line1").html(data.data.datail.substring(0, 13))
                $("#driver_line2").html(data.data.datail.substring(13))
            } else {
                $("#driver_line1").html(data.rtnMsg)
                $("#driver_line3").hide();
            }

        });
    });
    // function encrypt(){
    // 	var encrypt = new JSEncrypt();
    // 	encrypt.setPublicKey($("#tra").val());
    // 	var data = {
    // 		carNum: encrypt.encrypt($("#car-num").html()+$("#peccancy_data1").val())
    // 	};
    // 	console.log(data)
    // 	$.ajax({
    // 		async: true,
    // 		type: 'post',
    // 		data: JSON.stringify(data),
    // 		url: '/weizhang',
    // 		contentType: 'application/json'
    // 	}).done(function(data){
    // 	});
    // };
    $("#peccancy_submit").click(function () {
        console.log($("#car-num").html())
        var carNum = $("#car-num").html() + $("#peccancy_data1").val()
        console.log(carNum)
        var data = {
            randomKey: randomKey,
            carNum: carNum,
            engineNum: $("#peccancy_data2").val(),
            veriCode: $("#peccancy_data3").val()
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/car/findViolation',
            contentType: 'application/json'
        }).done(function (data) {
            console.log(data);
            $("#peccancy_result").show();
            if (data.rtnCode == '000000') {
                //console.log(data.data.datail.substring(0,13));
                $("#peccancy_line").html(data.data.datail)
            } else {
                $("#peccancy_line").html(data.rtnMsg)
            }
        });
    });
    $("#peccancy_choice_carNum>li>a").click(function () {
        console.log($(this).html());
        $("#car-num").html($(this).html())
        $(".mask").fadeOut(100);
        $("#dialog-car-box").fadeOut(100)
        $("#dialog-carNum-box").fadeOut(100)
    });
    $("#peccancy_choice_car>li>a").click(function () {
        console.log($(this).html());
        $("#peccancy_car").val($(this).html())
        $(".mask").fadeOut(100);
        $("#dialog-car-box").fadeOut(100)
        $("#dialog-carNum-box").fadeOut(100)
    });
    $("#getCode").click(function () {
        var data = {
            randomKey: randomKey,
            cardno: $("#cardno").val(),
            password: $("#password").val(),
            validcod: $("#validcod").val()
        };
        $.ajax({
            async: true,
            type: 'get',
            data: data,
            url: '/getCode',
            contentType: 'application/json'
        }).done(function (body) {
            if (body.rtnCode == '000000') {
                alert("短信已发送到您手机上");
            } else {
                alert(body.rtnMsg);
            }
        });
    });
    $("#login").click(function () {
        var data = {
            randomKey: randomKey,
            cardno: $("#cardno").val(),
            password: $("#password").val(),
            validcod: $("#validcod").val(),
            i_phone: $("#i_phone").val()
        };
        $.ajax({
            async: true,
            type: 'get',
            data: data,
            url: '/login',
            contentType: 'application/json'
        }).done(function (data) {
            if (data.rtnCode == '000000') {
                window.location.href = "/insuranceList" + window.location.search
            } else {
                alert(data.rtnMsg);
            }

        });
    });
    $("#chaxun").click(function () {
        console.log(window.location.search)
        window.location.href = "/userInfor" + window.location.search
    });
    $(".icon-return").click(function () {
        window.location.href = "/"
    });

})
