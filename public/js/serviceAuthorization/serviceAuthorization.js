$(function () {
    $("#agreeBack_1,#cancel").click(function () {
        // window.history.back(-1);
        $("#index_form").submit();
    })
    $("#agreeBack_2").click(function () {
        $("#second").hide()
        $("#first").show()
    })
    $("#detail").click(function () {
        $("#first").hide()
        $("#second").show()
    })
    $("#submit").click(function () {
        var data = {
            clientID: clientID,
            serviceID: serviceID,
            localFrom: localFrom
        }
        $.ajax({
            async: true,
            type: 'post',
            data: JSON.stringify(data),
            url: '/userLoginInfo/modifyAccredit',
            contentType: 'application/json'
        }).done(function (data) {
            if (data.msg == 'ok') {
                $("#form").submit();
            }
        })
    })
})