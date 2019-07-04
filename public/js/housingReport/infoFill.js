var name = sessionStorage.getItem("name");
var phone = sessionStorage.getItem("phone");
var unitname = sessionStorage.getItem("unitname");
var unitphone = sessionStorage.getItem("unitphone");
var  v = new Vue({
    el: "#realName",
    methods: {
    select: function () {
            if (document.getElementsByClassName('mobileSelect')[0]) {
                document.getElementsByClassName('mobileSelect')[0].remove();
            }
            var mobileSelect1 = new MobileSelect({
                trigger: "#area",
                title: "省/市/区",
                wheels: [
                    {data: areaList}
                ],
                callback: ""
            })
            document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect-show");
        },
        selectArea: function () {
            if (document.getElementsByClassName('mobileSelect')[0]) {
                document.getElementsByClassName('mobileSelect')[0].remove();
            }
            var mobileSelect1 = new MobileSelect({
                trigger: "#questionArea",
                title: "问题领域",
                wheels: [
                    {data: questionareaList}
                ],
                callback: ""
            })
            document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect-show");
        }
}
})

//上传图片
var count = 0,imgList={};

function imgChange(obj1, obj2) {
    if ($('.' + obj1 + " .uploadPicDefault").length >= 2) {
        /*$('.uploadPicList').css("height","3.3rem");*/
        $('#uploadPicDefault').hide();
        maskTip("最多可同时上传 2 个文件");
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
                /*if (fileList.length > count) {
                    count = fileList.length
                }*/
                if (fileList.length > 2) {
                    count = 0;
                    $('.z_photo').remove();
                    maskTip("最多可同时上传 2 个文件");
                    $('#uploadSum').html(count)
                    return;
                } else if (fileList.length == 2) {
                    $('#uploadPicDefault').hide();
                }
                if (count == '2') {
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
                $('#uploadSum').html(count + 1)
            }

        }
    }
};

function upPicDelete(_this) {
    count--
    $(_this).parents(".uploadPicDefault").remove();
    //$('.uploadPicList').css("height", "2rem");
    $('.z_photo').css("padding-left", "0rem");
    $('#uploadPicDefault').show();
    $('#uploadSum').html(count)
    if (count <= 0) {
        count = 0;
        $('#uploadSum').html(count)
    }
    if($('.uploadPicDefault').length == 1){$('#uploadSum').html(0)}
}

$(function () {
    $('#reportSubmit').on("click", function () {
        $('#dialogMask,#dialog').show();
        var project = $('#project').val().trim(),
            reportname = $('#name').val().trim(),
            address = $('#address').val().trim(),
            area = $('#address').val(),
            questionArea = $('#questionArea').val(),
            proVinceID = $('#area').attr("data_id", $('#area').attr("data_id")),
            DeptCityID = $('#area').attr("data_id", $('#area').attr("data_id")),
            districtID=$('#area').attr("data_id", $('#area').attr("data_id")),
            DomainID1L1 = $('#questionArea').attr("data_id", $('#questionArea').attr("data_id")),
            DomainID1L2 = $('#questionArea').attr("data_id", $('#questionArea').attr("data_id")),
            title = $('#title').val().trim(),
            content = $('#content').val().trim(),
            __EVENTTARGET = $('#__EVENTTARGET').val(),
            bn_save = $('#bn_save').val(),
            unitreportname = $('#unitname1').val().trim(),
            unitaddress = $('#unitaddress').val().trim()

        if (!project) {
            maskTip("请输入项目名称");
            $('#dialogMask,#dialog').hide();
            return;
        }else if (project.length>100){
            maskTip("项目名称在100字以内！");
            $('#dialogMask,#dialog').hide();
            return;
        }
        var area = document.getElementById("area").getAttribute("data_id")
        if (!area) {
            maskTip("请选择行政区");
            $('#dialogMask,#dialog').hide();
            return;
        }
        var questionArea = document.getElementById("questionArea").getAttribute("data_id")
        if (!questionArea) {
            maskTip("请选择问题领域");
            $('#dialogMask,#dialog').hide();
            return;
        }
        if (!title) {
            maskTip("请输入举报标题");
            $('#dialogMask,#dialog').hide();
            return;
        }else if (title.length>100){
            maskTip("标题长度在100字以内！");
            $('#dialogMask,#dialog').hide();
            return;
        }
        if (!content) {
            maskTip("请输入举报内容");
            $('#dialogMask,#dialog').hide();
            return;
        }else if (content.length<200){
            maskTip("举报内容在200字到2000字之间！");
            $('#dialogMask,#dialog').hide();
            return;
        }
        else if (content.length>2000){
            maskTip("举报内容在200字到2000字之间！");
            $('#dialogMask,#dialog').hide();
            return;
        }


        switch ($("input[name=smsradio]:checked").attr("id")) {
            case "reportPerson" :
                if (!reportname) {
                    maskTip("请输入姓名");
                    $('#dialogMask,#dialog').hide();
                    return;
                }else if (reportname.length>100){
                    maskTip("姓名长度在100字以内！");
                    $('#dialogMask,#dialog').hide();
                    return;
                }
                if (!address) {
                    maskTip("请输入地址");
                    $('#dialogMask,#dialog').hide();
                    return;
                }else if (address.length>100){
                    maskTip("地址长度在100字以内！");
                    $('#dialogMask,#dialog').hide();
                    return;
                }
                break;

            case "reportUnit" :
                if (!unitreportname) {
                    maskTip("请输入单位名称");
                    $('#dialogMask,#dialog').hide();
                    return;
                }else if (unitreportname.length>100){
                    maskTip("单位名称长度在100字以内！");
                    $('#dialogMask,#dialog').hide();
                    return;
                }
                if (!unitaddress) {
                    maskTip("请输入单位地址");
                    $('#dialogMask,#dialog').hide();
                    return;
                }else if (unitaddress.length>100){
                    maskTip("单位地址长度在100字以内！");
                    $('#dialogMask,#dialog').hide();
                    return;
                }
                break;
            default:break;
        }


        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x, localFrom: localFrom,
            local_y: local_y,
            drop_FIsAnonymous: $('#drop_FIsAnonymous').val(),
            selectreport:$('#reportUnit').val(),
            name: name || unitname,
            phone: phone || unitphone,
            project: project,
            reportname: reportname || unitreportname,
            address: address || unitaddress,
            proVinceID: proVinceID,
            DeptCityID: DeptCityID,
            districtID: districtID,
            DomainID1L1: DomainID1L1,
            DomainID1L2: DomainID1L2,
            title: title,
            content: content,
            __EVENTTARGET: __EVENTTARGET,//源站必填项
            bn_save: bn_save
        }
        $.ajax({
            async: true,
            url: "/housingReport/reportSubmit",
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (res) {
                if (res.retCode == "000000") {
                    var url = "/housingReport?page=success&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                    window.location.href = url;//跳转到对应的页面
                    $('#dialogMask,#dialog').hide();
                }
                else if (res.retCode == "000001"){
                    var url = "/housingReport?page=failed&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
                    window.location.href = url;//跳转到对应的页面
                    $('#dialogMask,#dialog').hide();
                }

            },
            error: function (xhr, type) {
                console.log('Ajax error!')
            }
        })


    });
})
$('#back').click(function(){
    window.location.href = "/housingReport?page=housingReport&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    return;
})


