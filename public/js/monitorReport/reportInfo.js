var copyright = sessionStorage.getItem("copyright");//获取版权
var selectCityArea = sessionStorage.getItem("selectCityArea");
var reportUrl = sessionStorage.getItem("reportUrl");//代表提交举报地址
var verificationUrl = sessionStorage.getItem("verificationUrl");//代表验证码地址
var regionId = sessionStorage.getItem("regionId");//名称id
var areaCode = sessionStorage.getItem("areaCode");
var areaArr = areaCode.split(",");
var reportCityCode = areaArr[0];//被举报人所属市id
if (areaArr[1]) {
    var submitAreaCode = areaArr[1];//所在id 区县
}
var country = sessionStorage.getItem("countryCode");//所属市/区名称
var countryArr = country.split(",");
var countryArea = countryArr[0];//被举报人所属市
var typeUrl = sessionStorage.getItem("typeUrl");//代表 政治面貌	级别 职务 问题类别 地址
var areaPin = sessionStorage.getItem("areaPin");
var areaPinArr = areaPin.split(",");
var allTypeUrl = ""
if (areaPinArr[1]) {
    if (areaPinArr[0] == "haerbin") {
        allTypeUrl = typeUrl + areaPinArr[1];
    } else {
        allTypeUrl = typeUrl + areaPinArr[0] + "/" + areaPinArr[1];
    }
} else {
    allTypeUrl = typeUrl + areaPinArr[0];
}
$(function () {
    $('#copyright').html(copyright);//版权
    $('#reportArea').val(selectCityArea);
    //$('#verification').click();
    $('#verification').trigger("click");
})
//上下收缩效果
$('.peccancyQuery>h2>img').on("click", function () {
    if ($(this).attr("src") == "/images/icon-downMenu.png") {
        $(this).attr("src", "/images/icon-upMenu.png");
        $(this).parent().parent().find(".pubListBox").hide()
    } else {
        $(this).attr("src", "/images/icon-downMenu.png");
        $(this).parent().parent().find(".pubListBox").show();
    }
});
$('#back').click(function () {
    window.location.href = "/monitorReport?page=reportNotice&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    return;
});
$('#submit').click(function () {
    var name = $('#name').val().trim(),
        card = $('#card').val().trim(),
        mobile = $('#phone').val().trim(),//phone
        address = $('#address').val().trim(),//现居住地
        reportName = $('#reportName').val().trim(),//被举报人
        reportDept = $('#reportDept').val().trim(),//单位
        reportPosition = $('#reportPosition').val().trim(),//职务
        title = $('#title').val().trim(),//标题
        reportQuestionId1 = $('#reportQuestionId1Trigger').attr("data_id"),//问题类别
        reportQuestionId = $('#reportQuestionIdTrigger').attr("data_id"),//问题细类
        reportImg = $('#reportImg').val().trim(),//验证码
        content = $('#content').val().trim();//主要问题
    if (!name) {
        maskTip("举报人姓名不能为空!");
        return;
    } else if (!card) {
        maskTip("请输入身份证号");
        return;
    } else if (!validateIdCard(card)) {
        maskTip("身份证格式错误");
        return;
    }
    if ("" == mobile) {
        maskTip("请填写联系方式");
        return false;
    } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(mobile))) {
        maskTip("联系方式不正确");
        return false;
    }
    if (!address) {
        maskTip("请输入现居住地");
        return;
    }
    if (!reportName) {
        maskTip("请输入被举报人姓名");
        return;
    }
    if (!reportDept) {
        maskTip("请输入被举报人单位");
        return;
    }
    if (!reportPosition) {
        maskTip("请输入被举报人职务");
        return;
    }
    if (!$('#reportLevelTrigger').attr("data_id")) {
        maskTip("请选择被举报人级别");
        return;
    }
    if (!title) {
        maskTip("请输入标题");
        return;
    }
    if (!reportQuestionId1) {
        maskTip("请输入问题类别");
        return;
    }
    if (!reportQuestionId) {
        maskTip("请输入问题细类");
        return;
    }
    if (!reportImg) {
        maskTip("请输入验证码");
        return;
    }
    if (!content) {
        maskTip("请输入主要问题");
        return;
    }
    $('#dialogMask,#dialog').show();
    correctVerification();

})
$('#reportQuestionId1Trigger,#reportQuestionId1').on("click", function () {
    userPoliticalId("/monitorReport/questionCode", '#reportQuestionId1Trigger', "选择问题类别", allTypeUrl + "/js/data/question.js");
});
/*动态加载js*/
var oBody = document.getElementsByTagName('body').item(0);
if (document.getElementById("oScript")) {
    var oScript = document.getElementById("oScript");
    oBody.removeChild(oScript);
}
//广东 广西 福建 浙江 湖南 安徽 湖北 //清海 陕西 河南  辽宁 吉林
if (oldCity == "440000" || oldCity == "450000" || oldCity == "350000" || oldCity == "330000" || oldCity == "430000" || oldCity == "340000" || oldCity == "420000" || oldCity == "630000" || oldCity == "610000" || oldCity == "410000" || oldCity == "210000" || oldCity == "220000" || oldCity == "650000") {
    var oBody = document.getElementsByTagName('body').item(0);
    var oScript = document.createElement("script");
    oScript.id = "oScript"
    oScript.type = "text/javascript";
    oScript.src = "/js/monitorReport/guangdong.js";
    oBody.appendChild(oScript);
} else if (oldCity == "530000" || oldCity == "360000" || oldCity == "520000" || oldCity == "320000" || oldCity == "500000" || oldCity == "510000" || oldCity == "540000" || oldCity == "640000" || oldCity == "140000" || oldCity == "110000" || oldCity == "230000") {
    //云南 江西 贵州  江苏 重庆 四川 西藏 宁夏 山西 北京 黑龙江
    var oBody = document.getElementsByTagName('body').item(0);
    var oScript = document.createElement("script");
    oScript.id = "oScript"
    oScript.type = "text/javascript";
    oScript.src = "/js/monitorReport/yunnan.js";
    oBody.appendChild(oScript);
} else if (oldCity == "150000") {//内蒙古
    var oBody = document.getElementsByTagName('body').item(0);
    var oScript = document.createElement("script");
    oScript.id = "oScript"
    oScript.type = "text/javascript";
    oScript.src = "/js/monitorReport/neimeng.js";
    oBody.appendChild(oScript);
}


//获取政治面貌
function userPoliticalId(url, element, title, configurl) {
    $(".mobileSelect").remove();
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x,
        localFrom: localFrom,
        local_y: local_y,
        configurl: configurl
    };
    $.ajax({
        async: true,
        url: url,
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (res) {
            if (res.retCode == "000000") {
                if (element == '#userPoliticalTrigger') {
                    weekdayArr = res.responseBody.political;
                } else if (element == '#userLevelIdTrigger') {
                    weekdayArr = res.responseBody.level;
                } else if (element == '#reportLevelTrigger') {
                    weekdayArr = res.responseBody.level_jb;
                } else if (element == '#reportQuestionId1Trigger') {
                    weekdayArr = res.responseBody.question;
                    $('#reportQuestionIdTrigger').html("请选择");
                    $('#reportQuestionIdTrigger').attr("data_id", "")
                }
                mobileSelect(element, title, weekdayArr);
            } else {
                maskTip(res.responseBody.data);
                return;
            }
        }
    })
}

$('#userPoliticalTrigger,#userPolitical').on("click", function () {
    userPoliticalId("/monitorReport/politicalCode", '#userPoliticalTrigger', "选择政治面貌", allTypeUrl + "/js/data/political.js");
});
//举报人级别
$('#userLevelIdTrigger,#userLevelId').on("click", function () {
    userPoliticalId("/monitorReport/levelCode", '#userLevelIdTrigger', "选择级别", allTypeUrl + "/js/data/level.js");
});
//被举报人级别 必填
$('#reportLevelTrigger,#reportLevel').on("click", function () {
    $('#reportQuestionId1Trigger').attr("data_id", "");
    $('#reportQuestionId1Trigger').html(" ");
    $('#reportQuestionIdTrigger').attr("data_id", "");
    $('#reportQuestionIdTrigger').html(" ");
    userPoliticalId("/monitorReport/levelCode", '#reportLevelTrigger', "选择级别", allTypeUrl + "/js/data/level.js");
});
$('#verification').click(function () {
    $("#verification").attr("src", "/images/yanzm.gif");
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x,
        localFrom: localFrom,
        local_y: local_y,
        configurl: verificationUrl
    };
    $.ajax({
        async: true,
        url: "/monitorReport/verification",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
            $('#verification').attr("src", data);
        }
    })
})


//上传图片
var count = 0,imgList={};

function imgChange(obj1, obj2) {
    if ($('.' + obj1 + " .uploadPicDefault").length >= 3) {
        /*$('.uploadPicList').css("height","3.3rem");*/
        $('#uploadPicDefault').hide();
        count = 3;
        maskTip("最多可同时上传 3 个文件");
        return;
    }
    var file = document.getElementById("file");
    var reader = new FileReader();
    var fileName = file.files[0].name;
    var size = file.files[0].size / 1024 / 1024;
    var type = file.files[0].type;
    // 通过DOM取文件数据
    var fil = file.files;
    if (size > 10) {
        maskTip('上传文件太大，请上传小于10M的文件');
        return;
    } else {
        if (type.indexOf("image") != -1) {
            reader.onload = function (e) {
                //图片读取完成，上传ajax
                var imgBase64 = reader.result;
                var base64Content = imgBase64.split(",")[1];
            }
            reader.onprogress = function () {
                count++
                if (fileList.length >3) {
                    count = 0;
                    $('.z_photo').remove();
                    maskTip("最多可同时上传 3 个文件");
                    $('#uploadSum').html(count)
                    return;
                }
                /*console.log("加载中" + count)*/
            }
            reader.readAsDataURL(file.files[0]);

            //存放图片的父级元素
            var imgContainer = document.getElementsByClassName(obj1)[0];
            //获取的图片文件
            var fileList = file.files;
            //文本框的父级元素
            var input = document.getElementsByClassName(obj2)[0];
            var imgArr = [];
            //遍历获取到得图片文件
            if($('.' + obj1 + " .uploadPicDefault").html()!=null){
                if($('.' + obj1 + " .uploadPicDefault").length == 1){
                    if(fileList.length == 2){
                        $('#uploadPicDefault').hide();
                    }else if(fileList.length>2){
                        maskTip("最多上传 3 个文件");
                        return;
                    }
                }else if($('.' + obj1 + " .uploadPicDefault").length == 2){
                    if(fileList.length == 1){
                        $('#uploadPicDefault').hide();
                    }else if(fileList.length>1){
                        maskTip("最多上传 3 个文件");
                        return;
                    }
                }else if($('.' + obj1 + " .uploadPicDefault").length ==3){

                    $('#uploadPicDefault').hide();
                    count = $('.' + obj1 + " .uploadPicDefault").length;
                }
            }else{
                if(fileList.length ==3){
                    $('#uploadPicDefault').hide();
                    count = $('.' + obj1 + " .uploadPicDefault").length;
                }
            }
            for (var i = 0; i < fileList.length; i++) {
                imgList[fileName+'?' + new Date().getTime()+i] = fil[i];
                var imgUrl = window.URL.createObjectURL(file.files[i]);
                imgArr.push(imgUrl);
                var img = document.createElement("img");
                img.setAttribute("src", imgArr[i]);
                var imgCon = document.createElement("div");
                var upPicDelete = document.createElement("div");
                var upPicDelete = document.createElement("div");
                var upSuccessPic = document.createElement("div");
                imgCon.className = "uploadPicDefault";
                upSuccessPic.className = "upSuccessPic";
                upPicDelete.className = "upPicDelete";
                upPicDelete.setAttribute("onclick", "upPicDelete(this)")
                upSuccessPic.appendChild(img);
                imgCon.appendChild(upSuccessPic);
                imgCon.appendChild(upPicDelete);
                var imgAdd = document.getElementsByClassName("z_photo")[0];
                imgAdd.appendChild(imgCon);
                $('#uploadSum').html($('.' + obj1 + " .uploadPicDefault").length);
            }

        }
    }
};

function upPicDelete(_this) {
    document.getElementById("file").value = "";
    document.getElementById("file").setAttribute("type",'file');
    count = $('.z_photo .uploadPicDefault').length;
    count--
    $(_this).parents(".uploadPicDefault").remove();
    $('.uploadPicList').css("height", "2.3rem");
    $('.z_photo').css("padding-left", "0rem");
    $('#uploadPicDefault').show();
    $('#uploadSum').html(count)
    if (count <= 0) {
        count = 0;
        $('#uploadSum').html(count)
    }
}

$('#reset').click(function () {
    window.location.href = "/monitorReport?page=reportInfo&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    return;
})
var correctReportImg = sessionStorage.getItem("correctReportImg");//代表判断验证码是否正确地址
function correctVerification() {
    var content = $('#content').val().trim();//主要问题
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x,
        localFrom: localFrom,
        local_y: local_y,
        configurl: correctReportImg,
        reportImg: $('#reportImg').val(),
        submitAreaCode: submitAreaCode || reportCityCode,
        img: $('#reportImg').val().trim(),
        reportContent: content
    };
    $.ajax({
        async: true,
        url: "/monitorReport/correctVerification",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (res) {
            $('#dialogMask,#dialog').hide();
            if (res.retCode == "000000") {
                var data;
                if (oldCity == "500000" || oldCity == "540000" || oldCity == "230000") {
                    data = res.responseBody.data;
                } else {
                    data = josnToStr(res.responseBody.data);
                }
                ;
                if (data == 'no') {
                    maskTip('请输入验证码!');
                    $('#verification').click();
                    return false;
                } else if (data == 'nosame') {
                    maskTip('验证码错误，请重新输入!');
                    $('#verification').click();
                    return false;
                } else if (data == 'errorstr') {
                    maskTip('举报主要问题内容输入非法字符!');
                    $('#content').val("");
                } else if (data == 'success') {
                    // maskTip('正在提交举报信，请稍候...');
                    var formData = new FormData();
                    for (var key in imgList) {
                        var name = key.split('?')[0];
                        formData.append('multipartFiles',imgList[key], name);
                    }
                    $.ajax({
                        url: '/monitorReport/upload',
                        type: 'POST',
                        cache: false,
                        data: formData,
                        processData: false,
                        contentType: false
                    }).done(function(res) {
                        var name = $('#name').val().trim(),
                            card = $('#card').val().trim(),
                            mobile = $('#phone').val().trim(),//phone
                            address = $('#address').val().trim(),//现居住地
                            reportName = $('#reportName').val().trim(),//被举报人
                            reportDept = $('#reportDept').val().trim(),//单位
                            reportPosition = $('#reportPosition').val().trim(),//职务
                            title = $('#title').val().trim(),//标题
                            reportQuestionId1 = $('#reportQuestionId1Trigger').attr("data_id"),//问题类别
                            reportQuestionId = $('#reportQuestionIdTrigger').attr("data_id"),//问题细类
                            reportImg = $('#reportImg').val().trim(),//验证码
                            content = $('#content').val().trim();//主要问题
                        var data = {
                            randomKey: randomKey,
                            userID: userID,
                            clientID: clientID,
                            cityID: cityID,
                            local_x: local_x,
                            localFrom: localFrom,
                            local_y: local_y,
                            reportProvince: cityName,//
                            reportProvinceId: regionId,
                            reportCity: countryArea,//市
                            reportCityId: reportCityCode || "",
                            reportCounty: selectCityArea,//县区
                            reportCountyId: submitAreaCode,
                            reportArea: selectCityArea,//被举报人所在地
                            reportPolitical: $('#userPoliticalTrigger').text(),//被举报人政治面貌
                            reportLevel: $('#reportLevelTrigger').text(),//被举报人级别
                            reportSpecial: "",//被举报人特殊身份
                            reportState: "1",
                            reportProvinceCode: regionId,//被举报人所属省id
                            reportCityCode: reportCityCode || "",//被举报人所属市id
                            reportCountyCode: submitAreaCode,//被举报人所属县id
                            reportType: "1",
                            fileIds: res || "",
                            submitAreaCode: submitAreaCode,//提交举报人所在id 区县
                            userName: name,//举报人
                            userIdCard: card,//
                            userContact: mobile,//举报人联系方式
                            userPoliticalCode: $('#userPoliticalTrigger').attr("data_id"),//	举报人信息政治面貌
                            userPolitical: $('#userPoliticalTrigger').text(),//举报人政治面貌
                            userPoliticalId: $('#userPoliticalTrigger').attr("data_id"),//举报人政治面貌id
                            userAddress: address,//举报人居住地址
                            userLevelCode: $('#userLevelIdTrigger').attr("data_id"),//举报人级别选项
                            userLevelId: $('#userLevelIdTrigger').attr("data_id"),//举报人级别选项
                            reportName: reportName,//举报人
                            userLevel: $('#userLevelIdTrigger').text(),//举报人级别
                            reportDept: reportDept,//被举报人单位
                            reportPosition: reportPosition,//被举报人职务
                            reportLevelCode: $('#reportLevelTrigger').attr("data_id"),//被举报人职务级别 必填
                            reportTitle: title,//举报标题
                            reportQuestionId1: reportQuestionId1,//举报类别
                            reportQuestionCode: reportQuestionId,//举报细类
                            reportContent: content,//反映问题
                            content: content,//反映问题
                            reportLevelId: $('#reportLevelTrigger').attr("data_id"),//被举报人级别
                            title: title,//举报标题
                            reportQuestionId: $('#reportQuestionIdTrigger').attr("data_id"),
                            reportQuestion: $('#reportQuestionIdTrigger').text(),//举报细类
                            uploadify: "",
                            reportImg: reportImg,//验证码
                            reportRand: reportImg,//验证码
                            configurl: reportUrl
                        };
                        $.ajax({
                            async: true,
                            url: "/monitorReport/signatureReport",
                            type: 'post',
                            data: JSON.stringify(data),
                            contentType: 'application/json',
                            success: function (data) {
                                $('#dialogMask,#dialog').hide();
                                if (data.retCode == "000000") {
                                    sessionStorage.setItem("success", data.responseBody.result);
                                    window.location.href = "/monitorReport?page=reportSuccess&randomKey=" + randomKey + "&userID=" + userID +
                                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
                                    return;
                                } else {
                                    maskTip(data.responseBody.errorMsg);
                                    return;
                                }
                            }
                        })
                    }).fail(function(res) {

                    });
                } else {
                    maskTip('相同IP每天只允许提交' + data + '条举报信息！');
                    return false;
                }
            } else {
                maskTip("请求异常");
            }
        },
        error: function (xhr, type) {
            console.log('Ajax error!')
            maskTip("Ajax error!");
        }
    })
}
