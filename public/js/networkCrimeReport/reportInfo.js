//上传图片
var count = 0;
function imgChange(obj1, obj2) {
    if ($('.' + obj1 + " .uploadPicDefault").length >= 3) {
        /*$('.uploadPicList').css("height","3.3rem");*/
        $('#uploadPicDefault').hide();
        maskTip("最多可同时上传 3 个文件");
        return;
    }
    var file = document.getElementById("file");
    var reader = new FileReader();
    var fileName = file.files[0].name;
    var size = file.files[0].size / 1024 / 1024;
    var type = file.files[0].type;

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
                if (fileList.length > count) {
                    count = fileList.length
                }
                /*console.log(fileList.length)*/
                if (fileList.length > 3) {
                    count = 0;
                    $('.z_photo').empty();
                    maskTip("最多可同时上传 3 个文件");
                    $('#uploadSum').html(count)
                    return;
                } else if (fileList.length == 3) {
                    $('#uploadPicDefault').hide();
                }
                if (count == '3') {
                    $('#uploadPicDefault').hide();
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
            /*if(count>=2){
                //$('.uploadPicList').css("height","3.3rem");
               // $('.'+obj1).css("padding-left","0.5rem");
                $('#uploadPicDefault').hide();

            }*/
            /*if(count>=3){
                $('#uploadPicDefault').hide();
                maskTip("最多可同时上传 3 个文件");
                return;
            }*/
            for (var i = 0; i < fileList.length; i++) {
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
                $('#uploadSum').html(count + 1)
            }

        }
    }
};

function upPicDelete(_this) {
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
//添加应用账号
$('#addAppAccount').click(function(){
    $('#inputCon').val("")
    if($('#networkTrigger').attr("data_id") == "0" || $('#networkTrigger').attr("data_id") == "004006"){
        $('#inputCon').attr("placeholder","")
    }else if($('#networkTrigger').attr("data_id") == "004001"){
        $('#inputCon').attr("placeholder","请输入4到10位数字")
    }else if($('#networkTrigger').attr("data_id") == "004009"){
        $('#inputCon').attr("placeholder","请输入以com/net/cn结尾的正确邮箱")
    }else if($('#networkTrigger').attr("data_id") == "004008"){
        $('#inputCon').attr("placeholder","请填写正确的微信号或手机号，勿填入微信昵称")
    }else if($('#networkTrigger').attr("data_id") == "004007"){
        $('#inputCon').attr("placeholder","请输入正确的APP名称")
    }else if($('#networkTrigger').attr("data_id") == "004010"){
        $('#inputCon').attr("placeholder","请输入您要举报的直播平台名称")
    }else if($('#networkTrigger').attr("data_id") == "004005"){
        $('#inputCon').attr("placeholder","请输入正确的UC账号，为11位数字的手机号")
    }else if($('#networkTrigger').attr("data_id") == "004004"){
        $('#inputCon').attr("placeholder","请输入正确的手机号或邮箱")
    }else if($('#networkTrigger').attr("data_id") == "004003"){
        $('#inputCon').attr("placeholder","请输入正确的YY账号或手机号")
    }else if($('#networkTrigger').attr("data_id") == "004002"){
        $('#inputCon').attr("placeholder","请输入正确的淘宝旺旺号或手机号或邮箱")
    }
    $('body').css({"position":"fixed"})
    $('#inputMask,#inputMaskDialog').show();

})
//添加应用账号成功后关闭蒙层
$('#sure').click(function(){
    $('body').css({"position":"static"})
    if($('.appAccount .account').length>=3){
        maskTip("应用账号最多添加3个");
        $('#inputMask,#inputMaskDialog').hide();
        return;
    }
    var inputCon = $('#inputCon').val();
    if(!$('#inputCon').val()){
        $('#inputMask,#inputMaskDialog').hide();
        return;
    }
    if($('#networkTrigger').attr("data_id") == "004001"){
            var reg=/^\d{4,10}$/;
            if(!reg.test(inputCon)){
                maskTip("请输入正确应用账号");
                return;
            }
    }else if($('#networkTrigger').attr("data_id") == "004009"){
        if(!email(inputCon)){
            maskTip("请输入正确邮箱");
            return;
        }
    }else if($('#networkTrigger').attr("data_id") == "004008" || $('#networkTrigger').attr("data_id") == "004005"){
        if(!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(inputCon))){
            maskTip("请输入应用账号");
            return;
        }
    }else if($('#networkTrigger').attr("data_id") == "004007"){

    }else if($('#networkTrigger').attr("data_id") == "004010"){

    }else if($('#networkTrigger').attr("data_id") == "004004"){
        $('#inputCon').attr("placeholder","请输入正确的手机号或邮箱")
        if(inputCon.indexOf(".")!=-1){
            if(!email(inputCon)){
                maskTip("请输入正确邮箱");
                return;
            }
        }else{
            if(!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(inputCon))){
                maskTip("请输入应用账号");
                return;
            }
        }
    }else if($('#networkTrigger').attr("data_id") == "004003"){
        if(!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(inputCon))){
            maskTip("请输入应用账号");
            return;
        }
    }else if($('#networkTrigger').attr("data_id") == "004002"){
        $('#inputCon').attr("placeholder","请输入正确的淘宝旺旺号或手机号或邮箱")
        if(inputCon.indexOf(".")!=-1){
            if(!email(inputCon)){
                maskTip("请输入正确邮箱");
                return;
            }
        }
    }
    var account = document.createElement("div");
    var accountList = document.createElement("div");
    var accountWords = document.createElement("div");
    var accountDelete = document.createElement("div");
    account.classList.add("clearfix");
    account.classList.add("account");
    accountList.classList.add("accountList");
    accountWords.classList.add("accountWords");
    accountWords.innerHTML=inputCon;
    accountDelete.classList.add("accountDelete");
    accountDelete.setAttribute("onclick", "accountDelete(this)")
    accountList.appendChild(accountWords);
    accountList.appendChild(accountDelete);
    account.appendChild(accountList);
    var appAccount = document.getElementById("appAccount");
    appAccount.appendChild(account);


    $('#inputMask,#inputMaskDialog').hide();

});
function accountDelete(_this){
    //$(_this).parents(".account").empty();
    $(_this).parents(".account").remove()
}
/*
 *日历插件  日期范围限制
 */
laydate.render({
    elem: '#add_time',//指定元素
    type: 'datetime',
    ready: function(date){//控件在打开时触发，回调返回一个参数
        $('#layui-laydate1').css("left","52px");
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
        //console.log(date); //得到初始的日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
    }
});
/*
* 点击一下步非空校验
*/
$('#next').click(function(){
    var addTime = $('#add_time').html();
    if(!addTime){
        maskTip("请选择发生时间");
        return;
    }
    if(!$('#reportTypeTrigger').attr("data_id")){
        maskTip("请选择举报类型");
        return;
    };
    if(flag){
        if(!$('#selectTypeTrigger').attr("data_id")){
            maskTip("请选择举报类型二级菜单");
            return;
        }
    }else{
        /*if(!$('#website').val() && !$('#websiteUrl').val() && $('.appAccount .account').length <=0 && !$('#networkTrigger').attr("data_id")){
            maskTip("违法网站名称、违法网站地址和网络应用服务、违法应用账号，这两组请选一组.");
            return;
        }*/
    }
    var reg=/^\d$/;
    if($('#victim').hasClass("show")){
        sessionStorage.setItem("is_victim",$('input[name="smsradio"]:checked').val());
        sessionStorage.setItem("ext40",$('#ext40').val())
    } else {
        sessionStorage.setItem("is_victim","");
    }
    if($('input[name="smsradio"]:checked').val() == "是"){
        sessionStorage.setItem("ext40",$('#ext40').val())
        if(!reg.test($('#ext40').val())){
            maskTip("请输入正确涉及金额");
            return;
        }else{
            if($('#ext40').val()<0){
                maskTip("请输入正确涉及金额");
                return;
            }
        }
    }
    if(!$('#website').val() && !$('#websiteUrl').val() && $('.appAccount .account').length <=0 && $('#networkTrigger').attr("data_id")=="0"){
        maskTip("违法网站名称、违法网站地址和网络应用服务、违法应用账号，这两组请选一组.");
        return;
    }
    if($('#website').val() || $('#websiteUrl').val()){
        if(!$('#websiteUrl').val()){
            maskTip("请输入网站地址");
            return;
        }
        if(!$('#website').val()){
            maskTip("请输入网站名称");
            return;
        }
        sessionStorage.setItem("website_name",$('#website').val());//网站名称
        sessionStorage.setItem("website_url",$('#websiteUrl').val());//网站地址
    }
    if($('#networkTrigger').attr("data_id")!="0" || $('.appAccount .account').length >0){
        if(!$('#networkTrigger').attr("data_id") !="0"){
            maskTip("请选择网络应用");
            return;
        }
        if($('.appAccount .account').length <=0){
            maskTip("请选择应用账号");
            return;
        }
        sessionStorage.setItem("app_type",$('#networkTrigger').attr("data_id"));//网络应用
        sessionStorage.setItem("app_account",$('.appAccount .account .accountWords')[0].innerHTML);//应用账号
    }
    if(!$('#textCon').val()){
        maskTip("请选择事件描述");
        return;
    }
    sessionStorage.setItem("event_time",addTime);//事件发生时间
    sessionStorage.setItem("t_wfjb_report.ext22",$('#reportTypeTrigger').attr("data_id"));//举报类型
    sessionStorage.setItem("t_wfjb_report.ext21",$('#selectTypeTrigger').attr("data_id"));//举报类型
    sessionStorage.setItem("event_description",$('#textCon').val());//网站地址
    var url = "/networkCrimeReport?page=userInfo&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = url;
});
$('#ext40').focus(function(){
    if($('input[name="smsradio"]:checked').val() == "是"){
        $("#ext40").removeAttr("readonly");
    }else{
        $("#ext40").attr("readonly","readonly");
    }
})
$('#reportType,#reportTypeTrigger').click(function(){
    $('#dialogMask,#dialog').show();
    $(".mobileSelect").remove();
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,
        localFrom:localFrom,
        local_y: local_y
    };
    $.ajax({
        async: true,
        url: "/networkCrimeReport/allType",
        type: "post",
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (res) {
            $('#dialogMask,#dialog').hide();
            if(res.retCode == "000000") {
                var weekdayArr = res.responseBody.reportType;
                $(".mobileSelect").remove();
                var mobileSelect1 = new MobileSelect({
                    trigger: "#reportTypeTrigger",
                    title: "举报类型",
                    wheels: [
                        {data: weekdayArr}
                    ],
                    callback: function (indexArr, data) {
                        $('#selectTypeTrigger').html("请选择");
                        $('#selectTypeTrigger').attr("data_id","");
                        if($('#reportTypeTrigger').attr("data_id") == "142"){
                            $('#victim').show();
                            $('#victim').addClass("show");
                            $('#victim').removeClass("hiden");
                            $('#extHide').show();
                        }else{
                            $('#victim').addClass("hiden");
                            $('#victim').removeClass("show");
                            $('#victim').hide();
                            $('#extHide').hide();
                        }
                        reportType($('#reportTypeTrigger').attr("data_id"));
                    }
                });
                $(".mobileSelect").addClass("mobileSelect-show");
            }
        },
        error: function () {
            maskTip("请求失败");
            return;
        }
    })
})
//举报类型选择
var flag = false;
function reportType(secondValue){
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,
        localFrom:localFrom,
        local_y: local_y,
        secondValue:secondValue
    };
    $.ajax({
        async: true,
        url: "/networkCrimeReport/reportType",
        type: "post",
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (res) {
            if(res.retCode == "000000"){
               if(res.responseBody.length == 0){
                   flag = false;
                   var weekdayArr=[
                       {"name":"请选择","id":"00001"}
                   ];
                   $('#selectTypeTrigger,#selectType').click(function(){
                       mobileSelect("#selectTypeTrigger","举报类型",weekdayArr)
                   })
                    return;
                }
                flag = true;
                var weekdayArr=[];
                res.responseBody.forEach(function(item,i){
                    var arr = {}
                    arr['name']=item.name;
                    arr['id']=item.typeid;
                    weekdayArr.push(arr)
                })
                $('#selectTypeTrigger,#selectType').click(function(){
                    mobileSelect("#selectTypeTrigger","举报类型",weekdayArr)
                })
            }else{
               //$('#selectReport').hide();
            }
        },
        error: function () {
            maskTip("请求失败");
            return;
        }
    })
}
/*
*网络应用
*/
$('#networkTrigger,#network').click(function(){
    $('#dialogMask,#dialog').show();
    $(".mobileSelect").remove();
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x ,
        localFrom:localFrom,
        local_y: local_y
    };
    $.ajax({
        async: true,
        url: "/networkCrimeReport/allType",
        type: "post",
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (res) {
            $('#dialogMask,#dialog').hide();
            if(res.retCode == "000000"){
                var weekdayArr = res.responseBody.account;
                $(".mobileSelect").remove();
                var mobileSelect1 = new MobileSelect({
                    trigger: "#networkTrigger",
                    title: "网络应用",
                    wheels: [
                        {data: weekdayArr}
                    ],
                    callback: function (indexArr, data) {

                    }
                });
                $(".mobileSelect").addClass("mobileSelect-show");
            }else{
                //$('#selectReport').hide();
            }
        },
        error: function () {
            maskTip("请求失败");
            return;
        }
    })
})
/*
*判断网站地址是否正确
*@params
* str_url [string] 网站地址连接
* @return Boolean 正确是true 错误是false
*/
function IsURL(str_url){
    if(!str_url){
        return;
    }
    var strRegex = "^[a-zA-z]:\\/\\/[^s]$";
    var re=new RegExp(strRegex);
    var reg = /^((http|ftp|https):\/\/)?[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
    if (reg.test(str_url)){
        return (true);
    }else{
        maskTip("请输入正确的网站地址")
        return (false);
    }
}
$('#back').click(function(){
    var url = "/networkCrimeReport?page=networkCrimeReport&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = url;
})
