var configurl = "http://ngo.mps.gov.cn/ngo/veriCode.do";
$(function () {

    /*证件类型*/
    $('#certificatesType_span,#certificatesType_img').on("click", function () {
        var arr = [
            {name: "请选择", id: "0"},
            {name: "居民身份证", id: "1031"},
            {name: "护照", id: "1036"},
            {name: "港澳居民来往内地通行证", id: "1037"},
            {name: "台湾居民来往大陆通行证", id: "1039"}
        ];
        var selectBoxId = "#certificatesType_span",
            selectBoxTitle = "证件类型";
        selecetbox(arr, selectBoxId, selectBoxTitle);
    });
    /*举报类型*/
    $('#accusationType_span,#accusationType_img').on("click", function () {
        var arr = [
            {name: "违法组织举报", id: "1"},
            {name: "违法活动举报", id: "2"},
            {name: "违法人员举报", id: "3"},
            {name: "违法地点举报", id: "4"},
            {name: "违法网站举报", id: "5"}
        ];
        var selectBoxId = "#accusationType_span",
            selectBoxTitle = "举报类型";
        selecetbox(arr, selectBoxId, selectBoxTitle);
    });
    /*举报地区*/
    $('#accusationArea_span,#accusationArea_img').on("click", function () {
        var arr = [
            {name:"北京",id:"110000"},{name:"天津",id:"120000"},{name:"河北",id:"130000"},{name:"山西",id:"140000"},
            {name:"内蒙古",id:"150000"},{name:"辽宁",id:"210000"},{name:"吉林",id:"220000"},{name:"黑龙江",id:"230000"},
            {name:"上海",id:"310000"},{name:"江苏",id:"320000"}, {name:"浙江",id:"330000"}, {name:"安徽",id:"340000"},
            {name:"福建",id:"350000"}, {name:"江西",id:"360000"}, {name:"山东",id:"370000"}, {name:"河南",id:"410000"},
            {name:"湖北",id:"420000"}, {name:"湖南",id:"430000"}, {name:"广东",id:"440000"}, {name:"广西",id:"450000"},
            {name:"海南",id:"460000"}, {name:"重庆",id:"500000"}, {name:"四川",id:"510000"}, {name:"贵州",id:"520000"},
            {name:"云南",id:"530000"}, {name:"西藏",id:"540000"}, {name:"陕西",id:"610000"}, {name:"甘肃",id:"620000"},
            {name:"青海",id:"630000"}, {name:"宁夏",id:"640000"}, {name:"新疆",id:"650000"}, {name:"新疆兵团",id:"660000"}
        ];
        var selectBoxId = "#accusationArea_span",
            selectBoxTitle = "举报地区";
        selecetbox(arr, selectBoxId, selectBoxTitle);
    });

    /*验证代码正确性*/
    /*$("#verificationCode_input").on("keyup",function(){
        var queryCode = this.value;
        if(queryCode.length ==4){
            var data = {
                randomKey: randomKey,
                userID: userID,
                clientID: clientID,
                cityID: cityID,
                local_x: local_x,
                localFrom: localFrom,
                local_y: local_y,
                queryCode : queryCode
            };

            $.ajax({
                async: true,
                url: "/overseasNgoReport/verificationCodeT",
                type: 'post',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (data) {
                    console.log(data);

                },
                error: function (xhr, type) {
                    console.log('Ajax error!')
                }
            })
        }
    });*/
    $("#overseas_submit").on("click",function(){
        /*举报人姓名*/
        var accusationName = $("#accusationName").val();
        if(!accusationName || !(/[\u4e00-\u9fa5]{2,20}/.test(accusationName))){
            maskTip("请输入2~20个文字");
            return false;
        }
        /*证件类型*/
        var certificatesType = $("#certificatesType_span").attr("data_id");
        if(!parseInt(certificatesType)){
            maskTip("请选择证件类型");
            return false;
        }
        /*证件号码*/
        var certificatesNumber = $("#certificatesNumber").val();

        if(!certificatesNumber){
            maskTip("请根据证件类型填写有效的证件号码");
            return false;
        }
        if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(certificatesNumber)){
            maskTip("证件号码错误");
            return false;
        }
        /*联系方式*/
        var telephone = $("#telephone").val();
        if(!telephone){
            maskTip("请输入联系方式");
            return false;
        }
        if(!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(telephone)) && !(/0\d{2,3}-\d{7,8}/.test(telephone))){
            maskTip("请输入国内手机号或带区号座机");
            return false;
        }

        /*举报时间*/
        var reportDate = $("#accusationTime_input").val();
        if(!reportDate){
            maskTip("请输入事件发生时间");
            return false;
        }
        /*违法地区*/
        var accusationArea = $("#accusationArea_span").attr("data_id");
        if(!parseInt(accusationArea)){
            maskTip("请选择违法地区");
            return false;
        }
        /*违法地址*/
        var accusationAddress = $("#accusationAddress_input").val();
        if(!accusationAddress){
            maskTip("请输入违法地址");
            return false;
        }
        if(!(/[\u4e00-\u9fa5a-zA-Z0-9]{10,250}/.test(accusationAddress))){
            maskTip("违法地址请输入10~250个文字");
            return false;
        }
        /*主要问题*/
        var accusationQustion = $("#accusationQustion_text").val();
        if(accusationQustion.length == 0){
            maskTip("请输入举报原因");
            return false;
        }
        if(!(/[\u4e00-\u9fa5]{10,300}/.test(accusationQustion))){
            maskTip("主要问题请输入10~300个文字");
            return false;
        }

        /*举报类型*/
        var accusationType = $("#accusationType_span").attr("data_id");
        /*验证码*/
        var verificationCode = $("#verificationCode_input").val();
        if(!verificationCode){
            maskTip("请输入验证码");
            return false;
        }
        /*加载查询动画*/
        $('#dialogMask,#dialog').show();
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x,
            localFrom: localFrom,
            local_y: local_y,
            reportType : accusationType || "" , //举报类型
            reportDate : reportDate || "2018-12-02" , // 举报时间
            reportRegion : accusationArea || "" , //违法地区
            reportAddress : accusationAddress || "" , //违法地址
            reportReason : accusationQustion || "" , //举报原因|主要问题
            type : 2 , //举报类型   默认实名举报
            reportName : accusationName || "" , //举报人姓名
            idcardType : certificatesType || "" , //证件类型
            reportId : certificatesNumber || "" , //证件号码
            reportPhone : telephone || "" , //联系方式
            validCode :verificationCode || "" //验证码
        };

        $.ajax({
            async: true,
            url: "/overseasNgoReport/report",
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (data) {
                /*结束加载动画*/
                $('#dialogMask,#dialog').hide();
                if (data.retCode == "000000") {
                    //sessionStorage.setItem("searchResult", JSON.stringify(data.responseBody));

                    if(data.responseBody.result == "举报成功！"){
                        var url = "/overseasNgoReport?page=reportSuccess&randomKey=" + randomKey + "&userID=" + userID +
                            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
                        window.location.href = url;
                    }
                    if(data.responseBody.result == "提交失败，请检查验证码是否错误！"){
                        maskTip("提交失败，请检查验证码是否错误！");
                        return false;
                    }
                } else {
                    var url = "/overseasNgoReport?page=reportFailed&randomKey=" + randomKey + "&userID=" + userID +
                        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
                    window.location.href = url;
                }
            },
            error: function (xhr, type) {
                console.log('Ajax error!')
            }
        })
    });
    /*获取验证码*/
    $("#verificationCode").click(function(){
        $("#verificationCode").attr("src", "/images/yanzm.gif");
        var data = {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x,
            localFrom: localFrom,
            local_y: local_y,

        };
        //console.log(data);
        $.ajax({
            async: true,
            url: "/overseasNgoReport/verificationCode",
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (data) {
                //console.log(data);
                $('#verificationCode').attr("src",data);

            },
            error: function (xhr, type) {
                console.log('Ajax error!')
            }
        })
    });
    $("#verificationCode").click();
});
laydate.render({
    elem: '#accusationTime_input', //指定元素
    max :new Date().toLocaleDateString(),
    theme : "element",
    ready: function(date){//控件在打开时触发，回调返回一个参数
        $('#layui-laydate1').css("left","75px");
    }
});



function gohref(type){
    if(type == "1"){
        var url = "/overseasNgoReport?page=overseasNgoReport&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
        window.location.href = url;
    }
    if(type == "2"){
        var url = "/overseasNgoReport?page=overseasNgoReport&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
        window.location.href = url;
    }
}

/*下拉框效果*/
function selecetbox(array, selectBoxId, selectBoxTitle, stylesheetName = ".mobileSelect") {
    /*移除样式*/
    $(stylesheetName).remove();
    /*定义下拉框显示数据-示例*/
    /*var arr = [
        {name: "居民身份证", id: "1031"},
        {name: "护照", id: "1036"},
        {name: "港澳居民来往内地通行证", id: "1037"},
        {name: "台湾居民来往大陆通行证", id: "1039"}
    ];*/
    var mobileSelect1 = new MobileSelect({
        trigger:  selectBoxId,
        title: selectBoxTitle,
        wheels: [
            {data: array}
        ]
    });
    /*追加样式*/
    $(stylesheetName).addClass("mobileSelect-show");
}