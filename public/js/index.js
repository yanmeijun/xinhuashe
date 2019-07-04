$(function () {
    $("#link1,#image").click(function () {
        $("#image").attr("src", "https://api.internetware.cn/xinhuashe/?iw-apikey=123&iw-cmd=deductionVeriCode&" + new Date().getTime());
        $("#xinxi_div").hide();
        $("#chaxun_div").hide();
    });
    $("#link2,#image1").click(function () {
        $("#image1").attr("src", "https://api.internetware.cn/xinhuashe/?iw-apikey=123&iw-cmd=infractionveriCode&" + new Date().getTime());
        $("#xinxi_div").hide();
        $("#chaxun_div").hide();
    });
    $("#link3,#image2").click(function () {
        $("#image2").attr("src", "https://api.internetware.cn/xinhuashe/?iw-apikey=123&iw-cmd=yanzhengma&" + new Date().getTime());
        $("#xinxi_div").hide();
        $("#chaxun_div").hide();
    });
    $("#submit").click(function () {
        var data = {
            licenseNo: $("#data1").val(),
            fileNo: $("#data2").val(),
            veriCode: $("#data3").val()
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/car/findDeduction',
            contentType: 'application/json'
        }).done(function (data) {
            //console.log(data);
            //alert("提交成功！");
            $("#result").show();
            $("#result").html(data);
        });
    });
    $("#submit1").click(function () {
        var data = {
            carNum: $("#data11").val(),
            engineNum: $("#data12").val(),
            veriCode: $("#data13").val()
        };
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/car/findViolation',
            contentType: 'application/json'
        }).done(function (data) {
            //console.log(data);
            //alert("提交成功！");
            $("#result1").show();
            $("#result1").html(data);
        });
    });
    $("#getCode").click(function () {
        var data = {
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
            if (data == 'ok') {
                $("#login_div").hide();
                $("#chaxun_div").show();
            }
        });
    });
    $("#chaxun").click(function () {
        $.ajax({
            async: true,
            type: 'get',
            url: '/chaxun',
            contentType: 'application/json'
        }).done(function (data) {
            if (data.rtnCode == '000000') {
                $("#dwmc").text(data.data.dwmc);
                $("#tyshxydm_zzjgdm").text(data.data.tyshxydm_zzjgdm);
                $("#shbxdjh").text(data.data.shbxdjh);
                $("#ssqx").text(data.data.ssqx);
                $("#cjxz1").text(data.data.cjxz[0]);
                $("#cjxz2").text(data.data.cjxz[1]);
                $("#cjxz3").text(data.data.cjxz[2]);
                $("#cjxz4").text(data.data.cjxz[3]);
                $("#cjxz5").text(data.data.cjxz[4]);
                $("#xm").text(data.data.xm);
                $("#xb").text(data.data.xb);
                $("#mz").text(data.data.mz);
                $("#wtdfyhmc").text(data.data.wtdfyhmc);
                $("#ddyljg1").text(data.data.ddyljg1);
                $("#ddyljg2").text(data.data.ddyljg2);
                $("#ddyljg3").text(data.data.ddyljg3);
                $("#ddyljg4").text(data.data.ddyljg4);
                $("#ddyljg5").text(data.data.ddyljg5);
                $("#xinxi_div").show();
            } else {
                $("#xinxierr_div").text(data.rtnMsg);
            }

        });
    });
})