if(localFrom == "xinhuashe_app"){
    getInputInfo();
}
//获取回填信息
function getInputInfo() {
    var data = {
        clientID: clientID,
        serviceID: "CAF0003"
    };
    $.ajax({
        async: true,
        type: 'post',
        data: JSON.stringify(data),
        url: '/userLoginInfo/getUserInfo',
        contentType: 'application/json'
    }).done(function (data) {
        $('#CertificateNumber').val(data.zsbh);//证书编号
        $('#ticketNumber').val(data.zkzh);//准考证号
        $('#name').val(data.name);//姓名
        $('#Certificates').val(data.sfzh);//身份证证件号码
    });
}
var arrParam;
$("#veriCodeImage").on("click", function (event) {
    arrParam = randomKey.split("_")[0] + "_" + Math.random() * 3;
    var parameters = {
        randomKey: arrParam,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y
    };
    $.ajax({
        async: true,
        url: "/ncre/verify",
        type: "post",
        data: JSON.stringify(parameters),
        contentType: "application/json",
        success: function (res) {
            $("#veriCodeImage").attr("src", res);
        },
        error: function (err) {
            console.log(err)
        }
    });
});
$("#veriCodeImage").click();
//dateList();//页面加载是执行
$('#exam,#examTrigger').on('click', function () {
    $(".mobileSelect").remove();
    dateList()
})
$('#subject,#subjectTrigger').on('click', function () {
    $(".mobileSelect").remove();
    subjectList();
})
function dateList() {
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y
    };
    $.ajax({
        async: true,
        url: "/ncre/dateList",
        type: "post",
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (res) {
            if (res.retCode == "000000") {
                var weekdayArr = res.responseBody.list;
                $(".mobileSelect").remove();
                var mobileSelect1 = new MobileSelect({
                    trigger: '#examTrigger',
                    title: '考试时间',
                    wheels: [
                        {data: weekdayArr}
                    ],
                    callback: function (indexArr, data) {
                    }
                });
                $(".mobileSelect").addClass("mobileSelect-show");
            } else {
                $("#masktime").removeClass("masktimes");
                masktime("请求异常，请稍后！");
                return;
            }

        }
    })
}
function subjectList() {
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        examid: $('#examTrigger').attr("data_id")
    };
    $.ajax({
        async: true,
        url: "/ncre/subjectList",
        type: "post",
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (res) {
            if (res.retCode == "000000") {
                var list = res.responseBody.bkjbList;
                if (list != null && list.length != 0) {
                    var weekdayArr = [];
                    $.each(list, function (index, val) {
                        var arr = {};
                        arr["id"] = val.value
                        arr["name"] = val.text;
                        weekdayArr.push(arr);
                    });
                    $(".mobileSelect").remove();
                    var mobileSelect1 = new MobileSelect({
                        trigger: '#subjectTrigger',
                        title: '考试科目',
                        wheels: [
                            {data: weekdayArr}
                        ]
                    });
                    $(".mobileSelect").addClass("mobileSelect-show");
                }
            } else {

            }
        },
        error: function () {
            console.log("err")
        }
    })
}
function search() {
    var veriCode = $('#veriCode').val();//验证码
    var CertificateNumber = $('#CertificateNumber').val();//证书编号
    var ticketNumber = $('#ticketNumber').val();//准考证号
    var name = $('#name').val();//姓名
    var Certificates = $('#Certificates').val();//身份证证件号码
    var Subject = $('#subjectTrigger').attr("data_id");//考试科目(接口subjectList返回的value)
    var examTrigger = $('#examTrigger').attr("data_id");//考试时间(接口dateList返回的value)
    if (!examTrigger) {
        masktime("请输入考试时间");
        return;
    }
    if (!Subject) {
        masktime("请输入考试科目");
        return;
    }
    if (!Certificates && !name && !Certificates && !CertificateNumber) {
        $("#masktime").addClass("masktimes");
        masktime("身份证、姓名、准考证号和证书编号至少输入两项");
        return;
    }
    if (Certificates) {
        if (Certificates.indexOf(" ") != -1) {
            $("#masktime").removeClass("masktimes");
            masktime("身份证号中间不能有空格");
            return;
        }
        if (!qhcheckString(Certificates)) {
            $("#masktime").removeClass("masktimes");
            masktime("证件号格式错误");
            return;
        }
        if (!ticketNumber && !name && !CertificateNumber) {
            $("#masktime").addClass("masktimes");
            masktime("身份证、姓名、准考证号和证书编号至少输入两项");
            return;
        }
    }
    if (name) {
        if (!qhcheckString(name)) {
            $("#masktime").removeClass("masktimes");
            masktime("姓名格式错误");
            return;
        }
        if (!ticketNumber && !Certificates && !CertificateNumber) {
            $("#masktime").addClass("masktimes");
            masktime("身份证、姓名、准考证号和证书编号至少输入两项");
            return;
        }
    }
    if (ticketNumber) {
        if (ticketNumber.indexOf(" ") != -1) {
            $("#masktime").removeClass("masktimes");
            masktime("准考证号中间不能有空格");
            return;
        }
        if (!qhcheckString(ticketNumber)) {
            $("#masktime").removeClass("masktimes");
            masktime("准考证号格式错误");
            return;
        }
        if (!Certificates && !name && !CertificateNumber) {
            $("#masktime").addClass("masktimes");
            masktime("身份证、姓名、准考证号和证书编号至少输入两项");
            return;
        }
    }
    if (CertificateNumber) {
        if (CertificateNumber.indexOf(" ") != -1) {
            $("#masktime").removeClass("masktimes");
            masktime("证书编号中间不能有空格");
            return;
        }
        if (!qhcheckString(CertificateNumber)) {
            $("#masktime").removeClass("masktimes");
            masktime("证书编号格式错误");
            return;
        }
        if (!ticketNumber && !name && !Certificates) {
            $("#masktime").addClass("masktimes");
            masktime("身份证、姓名、准考证号和证书编号至少输入两项");
            return;
        }
    }
    if (!veriCode) {
        $("#masktime").removeClass("masktimes");
        masktime("请输入验证码");
        return;
    }
    /*
     *查询动画提示结束
     */
    $('#dialogMask,#dialog').show();
    var parameters = {
        randomKey: arrParam,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,localFrom:localFrom,
        local_y: local_y,
        name: name,//姓名
        zsbh: CertificateNumber,//证书编号
        sfzh: Certificates,//身份证证件号码
        zkzh: ticketNumber,//准考证号
        verify: veriCode,//验证码
        ksnf: examTrigger,//考试时间(接口dateList返回的value)
        bkjb: Subject//考试科目(接口subjectList返回的value)
        // ksxm: arrParam.ksxm,//参数一(接口dateList返回的ksxm)
        // pram: arrParam.pram,//参数二(接口dateList返回的pram)
    };
    $.ajax({
        async: true,
        url: "/ncre/certificate",
        type: "post",
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (res) {
            /*
             *查询动画提示结束
             */
            $('#dialogMask,#dialog').hide();
            if (res.retCode == "000000") {
                localStorage.setItem("moredata", JSON.stringify(res.responseBody))
                var url = "/ncre?page=qualificationResults&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                window.location.href = url;
            } else {
                if (res.responseBody.errorCode == "100001") {
                    $("#masktime").removeClass("masktimes");
                    masktime(res.responseBody.errorMsg);
                    return;
                } else {
                    localStorage.setItem("nodata", res.responseBody.errorMsg);
                    var url = "/ncre?page=queryNoRresults&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                    window.location.href = url;
                }

            }
        },
        error: function (err) {
            console.log(err)
        }
    })
}

qhcheckString = function (str) {
    for (var i = 0; i < str.length; i++) {
        var t = true;
        switch (str.charAt(i)) {
            case '<' :
                t = false;
                break;
            case '>' :
                t = false;
                break;
            case '"' :
                t = false;
                break;
            case '\'' :
                t = false;
                break;
            case '\\' :
                t = false;
                break;
            case '/' :
                t = false;
                break;
            case '%' :
                t = false;
                break;
            case ';' :
                t = false;
                break;
            case '(' :
                t = false;
                break;
            case ')' :
                t = false;
                break;
            case '&' :
                t = false;
                break;
            case '+' :
                t = false;
                break;
        }
        if (t == false) {
            return t;
        }
    }
    return true;
};


// 参数为空时的提示语
function masktime(mgs) {
    $('#masktime').html(mgs);
    $('#masktime').show();
    setTimeout(function () {
        $('#masktime').hide();
    }, 2000)
    return
}