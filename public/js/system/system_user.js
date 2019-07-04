$(function () {
    var RegResources = {
        serviceNameReg: new RegExp("\\$\\{serviceName\\}", "g"),
        serviceCountReg: new RegExp("\\$\\{serviceCount\\}", "g")
    };
    $("#jbxx_search").click(function () {
        var userID = $("#jbxxcx_userID").val();
        var mobile = $("#jbxxcx_mobile").val();
        if (!userID && !mobile) {
            return;
        }
        var data = {
            userID: userID,
            mobile: mobile
        };
        $.ajax({
            async: true,
            type: 'get',
            data: data,
            url: '/system/getUserInfo',
            contentType: 'application/json'
        }).done(function (data) {
            if (!data || data.err) {
                alert("没有该用户！")
                return;
            } else {
                $("#jbxx_userID").text(data.user.userID);
                $("#jbxx_userName").text(data.user.userName);
                $("#jbxx_mobile").text(data.user.mobile);
                $("#jbxx_clientID").text(data.user.clientID);
                $("#jbxx_IDCard").text(data.user.IDCard);
                $("#jbxx_licenseNo").text(data.user.licenseNo);
                $("#jbxx_fileNo").text(data.user.fileNo);
                $("#jbxx_carNum").text(data.user.carNum);
                $("#jbxx_engineNum").text(data.user.engineNum);
                $("#jbxx_xlCertNumber").text(data.user.xlCertNumber);
                $("#jbxx_serviceCount").text(data.serviceCount);
            }

        })
    });
    $("#clxx,#clxx_search").click(function () {
        var id = $(this).attr("id");
        if (id == "clxx") {
            var search = window.location.search.replace("?", "");
            var data = {
                userID: search.split("&")[0].split("=")[1],
                mobile: search.split("&")[1].split("=")[1],
                clientID: search.split("&")[2].split("=")[1],
                serviceID: "AAA0001"
            };
        } else {
            var userID = $("#clxxcx_userID").val();
            var mobile = $("#clxxcx_mobile").val();
            if (!userID && !mobile) {
                return;
            }
            var data = {
                userID: userID,
                mobile: mobile,
                serviceID: "AAA0001"
            };
        }
        $.ajax({
            async: true,
            type: 'get',
            data: data,
            url: '/system/getUserInfo',
            contentType: 'application/json'
        }).done(function (data) {
            if (!data || data.err) {
                alert("没有该用户！");
                return;
            }
            $("#clxx_carNum").text(data.user.carNum);
            $("#clxx_engineNum").text(data.user.engineNum);
            $("#clxx_serviceCount").text(data.serviceCount);
        })
    });
    $("#jzxx,#jzxx_search").click(function () {
        var id = $(this).attr("id");
        if (id == "jzxx") {
            var search = window.location.search.replace("?", "");
            var data = {
                userID: search.split("&")[0].split("=")[1],
                mobile: search.split("&")[1].split("=")[1],
                clientID: search.split("&")[2].split("=")[1],
                serviceID: "AAB0001"
            };
        } else {
            var userID = $("#jzxxcx_userID").val();
            var mobile = $("#jzxxcx_mobile").val();
            if (!userID && !mobile) {
                return;
            }
            var data = {
                userID: userID,
                mobile: mobile,
                serviceID: "AAB0001"
            };
        }
        $.ajax({
            async: true,
            type: 'get',
            data: data,
            url: '/system/getUserInfo',
            contentType: 'application/json'
        }).done(function (data) {
            if (!data || data.err) {
                alert("没有该用户！");
                return;
            }
            $("#jzxx_licenseNo").text(data.user.licenseNo);
            $("#jzxx_fileNo").text(data.user.fileNo);
            $("#jzxx_serviceCount").text(data.serviceCount);
        })
    });
    $("#sbxx,#sbxx_search").click(function () {
        var id = $(this).attr("id");
        if (id == "sbxx") {
            var search = window.location.search.replace("?", "");
            var data = {
                userID: search.split("&")[0].split("=")[1],
                mobile: search.split("&")[1].split("=")[1],
                clientID: search.split("&")[2].split("=")[1],
                serviceID: "BAA0001"
            };
        } else {
            var userID = $("#sbxxcx_userID").val();
            var mobile = $("#sbxxcx_mobile").val();
            if (!userID && !mobile) {
                return;
            }
            var data = {
                userID: userID,
                mobile: mobile,
                serviceID: "BAA0001"
            };
        }
        $.ajax({
            async: true,
            type: 'get',
            data: data,
            url: '/system/getUserInfo',
            contentType: 'application/json'
        }).done(function (data) {
            if (!data || data.err) {
                alert("没有该用户！");
                return;
            }
            $("#sbxx_IDCard").text(data.user.IDCard);
            $("#sbxx_serviceCount").text(data.serviceCount);
        })
    });
    $("#clientxx,#clientxx_search").click(function () {
        var id = $(this).attr("id");
        if (id == "clientxx") {
            var search = window.location.search.replace("?", "");
            var data = {
                userID: search.split("&")[0].split("=")[1],
                mobile: search.split("&")[1].split("=")[1],
                clientID: search.split("&")[2].split("=")[1],
                type: "clientID"
            };
        } else {
            var userID = $("#clientxxcx_userID").val();
            var mobile = $("#clientxxcx_mobile").val();
            if (!userID && !mobile) {
                return;
            }
            var data = {
                userID: userID,
                mobile: mobile,
                type: "clientID"
            };
        }
        $.ajax({
            async: true,
            type: 'get',
            data: data,
            url: '/system/getUserInfo',
            contentType: 'application/json'
        }).done(function (data) {
            if (!data || data.err) {
                alert("没有该用户！");
                return;
            }
            $("#clientxx_clientID").text(data.user.clientID);
            $("#clientxx_serviceCount").text(data.serviceCount);
        })
    });
    $("#fwxx,#fwxx_search").click(function () {
        var id = $(this).attr("id");
        if (id == "fwxx") {
            var search = window.location.search.replace("?", "");
            var data = {
                userID: search.split("&")[0].split("=")[1],
                mobile: search.split("&")[1].split("=")[1],
                clientID: search.split("&")[2].split("=")[1]
            };
        } else {
            var userID = $("#fwxxcx_userID").val();
            var mobile = $("#fwxxcx_mobile").val();
            if (!userID && !mobile) {
                return;
            }
            var data = {
                userID: userID,
                mobile: mobile
            };
        }
        $.ajax({
            async: true,
            type: 'get',
            data: data,
            url: '/system/getUserService',
            contentType: 'application/json'
        }).done(function (data) {
            if (!data || data.err) {
                alert("没有该用户！");
                return;
            }
            var html = '', template = $("#fwxx_data_template").html();
            $.each(data.serviceInfo, function (index, item) {
                html += template.replace(RegResources.serviceNameReg, item.serviceName)
                    .replace(RegResources.serviceCountReg, item.serviceCount)
            })
            $("#fwxx_data").html(html)
        })
    });

})