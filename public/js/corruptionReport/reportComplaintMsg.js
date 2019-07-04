$(function () {
    $('#xinjiang_citySrc').attr("src", citySRC || "/images/monitorReport/banner.png");//城市背景
    //$('#verification').click();
    $('#verification').trigger("click");
})
$('#verification').click(function () {
    verificat("/corruptionReport/verification")
});
function verificat(url){
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x,
        localFrom: localFrom,
        local_y: local_y
    };
    $.ajax({
        async: true,
        url: url,
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        beforeSend: function () {
            //$("#dialogMask,#dialog").show();
        }
    }).done(function (data) {
        console.log(data)
            if(data.retCode == "000000"){
                var data = {
                    randomKey: randomKey,
                    userID: userID,
                    clientID: clientID,
                    cityID: cityID,
                    local_x: local_x,
                    localFrom: localFrom,
                    local_y: local_y
                };
                $.ajax({
                    async: true,
                    url: "/corruptionReport/verification2",
                    type: 'post',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    beforeSend: function () {
                        //$("#dialogMask,#dialog").show();
                    }
                }).done(function (data) {
                    if(data.retCode == "000000"){
                        //$("#dialogMask,#dialog").hide();
                        $("#verification").attr("src", data.responseBody.data);
/*                        if(data.responseBody.data == "success"){
                            var data = {
                                randomKey: randomKey,
                                userID: userID,
                                clientID: clientID,
                                cityID: cityID,
                                local_x: local_x,
                                localFrom: localFrom,
                                local_y: local_y
                            };
                            $.ajax({
                                async: true,
                                url: "/corruptionReport/verification3",
                                type: 'post',
                                data: JSON.stringify(data),
                                contentType: 'application/json',
                                beforeSend: function () {
                                   //$("#dialogMask,#dialog").show();
                                    $("#verification").attr("src","/images/yanzm.gif");
                                }
                            }).done(function (data) {
                                //$("#dialogMask,#dialog").hide();
                                $("#verification").attr("src", data);
                            })
                        }*/
                    }else{
                        maskTip("请求验证码异常");
                        return;
                    }
                })
            }
    })
}
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
    window.location.href = "/corruptionReport?page=corruptionReport&randomKey=" + randomKey + "&userID=" + userID +
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
    /*if (!name) {
        maskTip("举报人姓名不能为空!");
        return;
    } else if (!card) {
        maskTip("请输入身份证号");
        return;
    } else if (!validateIdCard(card)) {
        maskTip("身份证格式错误");
        return;
    }*/
    if(card){
        if (!validateIdCard(card)) {
            maskTip("身份证格式错误");
            return;
        }
    }
    /*if ("" == mobile) {
        maskTip("请填写联系方式");
        return false;
    } else if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(mobile))) {
        maskTip("联系方式不正确");
        return false;
    }*/
    if(mobile){
        if (!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(mobile))) {
            maskTip("联系方式不正确");
            return false;
        }
    }
   /* if (!address) {
        maskTip("请输入现居住地");
        return;
    }*/
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
    if (!$('#reportArea').val()) {
        maskTip("请输入所在地区");
        return;
    }
    if (!$('#reportLevelTrigger').attr("data_id")) {
        maskTip("请选择被举报人职级");
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
    correctVerification()
})
$('#reportQuestionId1Trigger,#reportQuestionId1').on("click", function () {
    userPoliticalId("/corruptionReport/questionCode", '#reportQuestionId1Trigger', "选择问题类别");
});
$('#reportQuestionIdTrigger,#reportQuestionId').on("click", function () {
    if (!$('#reportQuestionId1Trigger').attr("data_id")) {
        return;
    }
    var level_code = $('#reportLevelTrigger').attr("data_id");
    var v = $('#reportQuestionId1Trigger').html();
    var reportLevel = $('#reportLevelTrigger').text();

    if (v == '违反政治纪律行为') {
        weekdayArr = [
            {name: "公开发表危害党的言论", id: "120"},
            {name: "参加反对党和政府的活动或组织", id: "121"},
            {name: "在党内搞团团伙伙", id: "122"},
            {name: "妨碍党和国家方针政策实施", id: "123"},
            {name: "对抗组织审查", id: "124"},
            {name: "组织参加迷信活动", id: "125"},
            {name: "叛逃及涉外活动中损害党和国家利益", id: "126"},
            {name: "无原则一团和气和违反政治规矩", id: "127"}
        ]
    } else if (v == '违反组织纪律行为') {
        if (reportLevel == '农村' || reportLevel == '其他') {
            weekdayArr = [
                {name: "违反民主集中制原则", id: "128"},
                {name: "不按要求请示报告有关事项", id: "129"},
                {name: "违规组织参加老乡会校友会战友会", id: "130"},
                {name: "侵犯党员权利", id: "131"},
                {name: "在投票和选举中搞非组织活动", id: "132"},
                {name: "违反干部选拔任用规定", id: "133"},
                {name: "在人事劳动工作中违规谋利", id: "134"},
                {name: "违规发展党员", id: "135"},
                {name: "违规办理出国证件和在境外脱离组织", id: "136"}
            ]
        } else {
            weekdayArr = [
                {name: "违反民主集中制原则", id: "128"},
                {name: "不按要求请示报告有关事项", id: "129"},
                {name: "违规组织参加老乡会校友会战友会", id: "130"},
                {name: "侵犯党员权利", id: "131"},
                {name: "在投票和选举中搞非组织活动", id: "132"},
                {name: "违反干部选拔任用规定", id: "133"},
                {name: "在人事劳动工作中违规谋利", id: "134"},
                {name: "违规发展党员", id: "135"},
                {name: "违规办理出国证件和在境外脱离组织", id: "136"},
                {name: "违反公务用车管理规定", id: "147"},
                {name: "违反会议活动管理规定", id: "148"},
                {name: "违反办公用房管理规定", id: "149"},
                {name: "权色钱色交易", id: "150"},
                {name: "其他违反廉洁纪律行为", id: "151"}
            ]
        }
    } else if (v == '违反廉洁纪律行为') {
        if (reportLevel == '一般干部' || reportLevel == '农村' || reportLevel == '其他') {
            weekdayArr = [
                {name: "权权交易和纵容特定关系人以权谋私", id: "137"},
                {name: "违规接受礼品礼金宴请服务", id: "138"},
                {name: "违规操办婚丧喜庆事宜", id: "139"},
                {name: "违规从事营利活动", id: "140"},
                {name: "违规占有使用公私财物", id: "142"},
                {name: "违规参与公款宴请消费", id: "143"},
                {name: "违规自定薪酬和发放津贴补贴奖金", id: "144"},
                {name: "公款旅游", id: "145"},
                {name: "违反公务接待管理规定", id: "146"},
                {name: "违反公务用车管理规定", id: "147"},
                {name: "违反会议活动管理规定", id: "148"},
                {name: "违反办公用房管理规定", id: "149"},
                {name: "权色钱色交易", id: "150"},
                {name: "其他违反廉洁纪律行为", id: "151"}
            ]
        } else {
            weekdayArr = [
                {name: "权权交易和纵容特定关系人以权谋私", id: "137"},
                {name: "违规接受礼品礼金宴请服务", id: "138"},
                {name: "违规操办婚丧喜庆事宜", id: "139"},
                {name: "违规从事营利活动", id: "140"},
                {name: "违反工作生活待遇规定", id: "141"},
                {name: "违规占有使用公私财物", id: "142"},
                {name: "违规参与公款宴请消费", id: "143"},
                {name: "违规自定薪酬和发放津贴补贴奖金", id: "144"},
                {name: "公款旅游", id: "145"},
                {name: "违反公务接待管理规定", id: "146"},
                {name: "违反公务用车管理规定", id: "147"},
                {name: "违反会议活动管理规定", id: "148"},
                {name: "违反办公用房管理规定", id: "149"},
                {name: "权色钱色交易", id: "150"},
                {name: "其他违反廉洁纪律行为", id: "151"}
            ]
        }
    } else if (v == '违反群众纪律行为') {
        weekdayArr = [
            {name: "侵害群众利益", id: "152"},
            {name: "漠视群众利益", id: "153"},
            {name: "盲目铺摊子上项目", id: "173"},
            {name: "侵犯群众知情权", id: "154"},
            {name: "其他违反群众纪律行为", id: "155"}
        ]
    } else if (v == '违反工作纪律行为') {
        if (reportLevel == '一般干部' || reportLevel == '农村' || reportLevel == '其他') {
            weekdayArr = [
                {name: "主体责任落实不力", id: "156"},
                {name: "泄露扩散窃取私存党的秘密", id: "159"},
                {name: "违反考试录取工作规定", id: "160"},
                {name: "其他违反工作纪律行为", id: "161"}
            ]
        } else {
            weekdayArr = [
                {name: "主体责任落实不力", id: "156"},
                {name: "违规干预市场经济活动", id: "157"},
                {name: "违规干预执纪执法司法活动", id: "158"},
                {name: "泄露扩散窃取私存党的秘密", id: "159"},
                {name: "违反考试录取工作规定", id: "160"},
                {name: "其他违反工作纪律行为", id: "161"}
            ]
        }
    } else if (v == '违反生活纪律行为') {
        weekdayArr = [
            {name: "生活奢靡", id: "162"},
            {name: "不正当性关系", id: "163"},
            {name: "其他违反生活纪律行为", id: "164"}
        ]
    } else if (v == '贪污贿赂行为') {
        weekdayArr = [
            {name: "贪污", id: "174"},
            {name: "挪用公款", id: "175"},
            {name: "受贿", id: "176"},
            {name: "行贿", id: "177"},
            {name: "巨额财产来源不明", id: "178"},
            {name: "其他贪污贿赂行为", id: "179"},
        ]
    } else if (v == '渎职侵权行为') {
        weekdayArr = [
            {name: "滥用职权", id: "180"},
            {name: "玩忽职守", id: "181"},
            {name: "徇私舞弊", id: "182"},
            {name: "利用职权侵犯公民权利", id: "183"},
            {name: "其他渎职侵权行为", id: "184"}
        ]
    } else if (v == '其他职务违法和职务犯罪行为') {
        weekdayArr = [
            {name: "职务侵占", id: "185"},
            {name: "挪用资金和特定款物", id: "191"},
            {name: "非法同业经营和为亲友非法牟利", id: "187"},
            {name: "国有企事业人员失职和滥用职权", id: "188"},
            {name: "包庇犯罪分子", id: "189"},
            {name: "其他职务违法和职务犯罪行为", id: "190"},
        ]
    } else if (v == '其他违法犯罪行为') {
        weekdayArr = [
            {name: "其他违法犯罪行为", id: "191"}
        ]
    }
    mobileSelect('#reportQuestionIdTrigger', '选择问题细类', weekdayArr)
})


//获取政治面貌
function userPoliticalId(url, element, title) {
    $(".mobileSelect").remove();
    var data = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x,
        localFrom: localFrom,
        local_y: local_y
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
                    weekdayArr = res.responseBody.level;
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
    userPoliticalId("/corruptionReport/politicalCode", '#userPoliticalTrigger', "选择政治面貌");
});
//举报人职级
$('#userLevelIdTrigger,#userLevelId').on("click", function () {
    userPoliticalId("/corruptionReport/levelCode", '#userLevelIdTrigger', "选择职级");
});
//被举报人职级 必填
$('#reportLevelTrigger,#reportLevel').on("click", function () {
    $('#reportQuestionId1Trigger').attr("data_id", "");
    $('#reportQuestionId1Trigger').html(" ");
    $('#reportQuestionIdTrigger').attr("data_id", "");
    $('#reportQuestionIdTrigger').html(" ");
    userPoliticalId("/corruptionReport/levelCode", '#reportLevelTrigger', "选择职级");
});
//上传图片
var count = 0,imgList={};

function imgChange(obj1, obj2) {
    if ($('.' + obj1 + " .uploadPicDefault").length >= 3) {
        maskTip("最多可同时上传 3 个文件");
        $('#uploadPicDefault').hide();
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
                //document.getElementById("file").setAttribute("type",'text');
                //document.getElementById("file").setAttribute("type",'file');
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
    window.location.href = "/corruptionReport?page=reportComplaintMsg&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    return;
})

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
        img: $('#reportImg').val().trim(),
    };
    $.ajax({
        async: true,
        url: "/corruptionReport/correctVerification",
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (res) {
            $('#dialogMask,#dialog').hide();
            var data = josnToStr(res.responseBody.data);
            if (res.retCode == "000000") {
                var data = josnToStr(res.responseBody.data);
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
                        url: '/corruptionReport/upload',
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
                            fileIds: res || "",
                            /*userName: name || "举报人",//举报人
                            userIdCard: card || "520200200109037974",//
                            userContact: mobile || "18767566541",//举报人联系方式
                            userPolitical: $('#userPoliticalTrigger').text() || "中国共产党党员",//举报人政治面貌
                            userPoliticalId: $('#userPoliticalTrigger').attr("data_id") || "59",//举报人政治面貌id
                            userAddress: address || "居住地址",//举报人居住地址
                            userLevelId: $('#userLevelIdTrigger').attr("data_id") || "66",//举报人级别选项
                            userLevel: $('#userLevelIdTrigger').text() || "正省部级",//举报人级别*/
                            userName: name,//举报人
                            userIdCard: card,//
                            userContact: mobile,//举报人联系方式
                            userPolitical: $('#userPoliticalTrigger').text(),//举报人政治面貌
                            userPoliticalId: $('#userPoliticalTrigger').attr("data_id"),//举报人政治面貌id
                            userAddress: address || "居住地址",//举报人居住地址
                            userLevelId: $('#userLevelIdTrigger').attr("data_id"),//举报人级别选项
                            userLevel: $('#userLevelIdTrigger').text(),//举报人级别
                            reportLevelId: $('#reportLevelTrigger').attr("data_id"),//被举报人级别
                            reportName: reportName,//举报人
                            reportDept: reportDept,//被举报人单位
                            reportPosition: reportPosition,//被举报人职务
                            reportArea: $('#reportArea').val(),//
                            reportProvince: sessionStorage.getItem("reportProvince"),//
                            reportProvinceId: sessionStorage.getItem("reportProvinceId"),
                            reportCity: sessionStorage.getItem("reportCity"),//市
                            reportCityId: sessionStorage.getItem("reportCityId"),
                            reportLevel: $('#reportLevelTrigger').text(),//被举报人级别
                            title: title,//举报标题
                            reportQuestion: $('#reportQuestionIdTrigger').text(),//问题细类
                            reportQuestionId: reportQuestionId,
                            reportQuestionType: $('#reportQuestionIdTrigger').text(),
                            reportQuestionTypeId: reportQuestionId1,
                            content: content,//反映问题
                            reportRand: reportImg,//验证码
                            reportCounty: sessionStorage.getItem("reportCounty") || "",
                            reportCountyId: sessionStorage.getItem("reportCountyId") || ""
                        };
                        $.ajax({
                            async: true,
                            url: "/corruptionReport/anonymousReport",
                            type: 'post',
                            data: JSON.stringify(data),
                            contentType: 'application/json',
                            success: function (data) {
                                $('#dialogMask,#dialog').hide();
                                if (data.retCode == "000000") {
                                    sessionStorage.setItem("success", data.responseBody.result);
                                    window.location.href = "/corruptionReport?page=reportSuccess&randomKey=" + randomKey + "&userID=" + userID +
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

        }
    })
}

var html = "";
area.forEach(function (element, index) {
    html += '<li  main-data="element.id"  onclick=initSelect("' + element.text + '","' + element.id + '","' + index + '")>' + element.text + '</li>';
});
$('#city').html(html)

function initSelect(mgs, id, index) {
    sessionStorage.setItem("reportProvince", mgs);
    sessionStorage.setItem("reportProvinceId", id);
    $('#city').html();
    var html = "";
    if (!area[index].children) {
        $('#reportArea').val(sessionStorage.getItem("reportProvince"))
        document.getElementById("wage").style.position  = "static";
        $('#dialogMasking,#dialogMasks').hide();
    }
    area[index].children.forEach(function (item, i) {
        html += '<li  main-data="item.id"  onclick=countrySelect("' + item.text + '","' + item.id + '","' + index + '")>' + item.text + '</li>';
    })
    $('#city').html(html)
}

function countrySelect(mgs, id, oldindex) {
    sessionStorage.setItem("reportCity", mgs);
    sessionStorage.setItem("reportCityId", id);
    $('#city').html();
    var html = "";
    area[oldindex].children.forEach(function (item, ind) {
        if (item.id == id) {
            if (item.children) {
                item.children.forEach(function (items, inds) {
                    html += '<li  main-data="items.id"  onclick=countrySelects("' + items.text + '","' + items.id + '","' + inds + '")>' + items.text + '</li>';
                })
            } else {
                $('#reportArea').val(sessionStorage.getItem("reportProvince") + "-" + sessionStorage.getItem("reportCity"))
                document.getElementById("wage").style.position  = "static";
                $('#dialogMasking,#dialogMasks').hide();
                
            }
        }
    })
    $('#city').html(html)
}
function countrySelects(mgs, id, inds) {
    sessionStorage.setItem("reportCounty", mgs);
    sessionStorage.setItem("reportCountyId", id);
    $('#dialogMasking,#dialogMasks').hide();
    document.getElementById("wage").style.position  = "static";
    $('#reportArea').val(sessionStorage.getItem("reportProvince") + "-" + sessionStorage.getItem("reportCity") + "-" + sessionStorage.getItem("reportCounty"))
}

$('#close').on("click", function () {
    $('#dialogMasking,#dialogMasks').hide();
    document.getElementById("wage").style.position  = "static";
})
$('#reportArea').click(function () {
    $('#dialogMasking,#dialogMasks').show();
    document.getElementById("wage").style.position  = "fixed";
    $("#reportArea").blur();
    var html = "";
    area.forEach(function (element, index) {
        html += '<li  main-data="element.id"  onclick=initSelect("' + element.text + '","' + element.id + '","' + index + '")>' + element.text + '</li>';
    });
    $('#city').html(html)
})