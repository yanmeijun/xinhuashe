function goPage(pageUrl){
    var urls = "/gdsgGJJ?page=" + pageUrl + "&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = urls;
}
var personal = JSON.parse(sessionStorage.getItem('userInfo'));
$('#company').val(personal.personAccount);
function getPersonInfor(){
    var beginDate=$("#add_time").html();
    var endDate=$("#end_time").html();
    if(!beginDate || !endDate){
        maskTip("请选择时间");
        return;
    }
    $('#dialogMask,#dialog').show();
    var jsonObj = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x,
        localFrom: localFrom,
        local_y: local_y,
        begdate:beginDate,
        enddate:endDate,
        begdaate:endDate
    };
    $.ajax({
        async: true,
        type: "POST",
        url: "/gdsgGJJ/getAccountDetail",
        dataType: "json",
        data: JSON.stringify(jsonObj),
        contentType: "application/json"
    }).done(function (res) {
        $('#dialogMask,#dialog').hide();
        if (res.retCode == "000000") {
            var html="";
            res.responseBody.data.data.forEach(function(item,index){
                html+='<div class="tab-content bjgjj-list">' +
                        '<div class="text-list-div clearfix" style="margin-right: 0;">' +
                        '    <label style="width: 3.7rem;">'+item.person_SGGRMXCX_01_p19_text+'</label>' +
                        '    <span style="width:2.5rem;float: left;text-align: left">'+item.person_SGGRMXCX_01_p23_text+'</span>' +
                        '    <span style="width:calc(100% - 6.2rem);float: left;text-align: center" >' +
                        '        <span class="increase-red"  onclick=goDetail('+JSON.stringify(item)+')>'+item.person_SGGRMXCX_01_p26_text+'</span>' +
                        '         <img src="/images/arrow.png" class="icon-rightArrow"  onclick=goDetail('+JSON.stringify(item)+')>' +
                        '    </span>' +
                        '</div>' +
                      '</div>';
            })
            $('#result').html(html);
            $('#resultShow').show();
        } else {//登陆失败
            maskTip(res.responseBody.data);
        }
    })
};
function goDetail(mgs){
    var html = "";
    html+='<li><span>交易日期：</span><span>'+mgs.person_SGGRMXCX_01_p19_text+'</span></li>' +
        '<li><span>流水号：</span><span>'+mgs.person_SGGRMXCX_01_p20_text+'</span></li>' +
        '<li><span>单位账号：</span><span>'+mgs.person_SGGRMXCX_01_p21_text+'</span></li>' +
        '<li><span>单位名称：</span><span>'+mgs.person_SGGRMXCX_01_p22_text+'</span></li>' +
        '<li><span>业务类型：</span><span>'+mgs.person_SGGRMXCX_01_p23_text+'</span></li>' +
        '<li><span>发生额：</span><span>'+mgs.person_SGGRMXCX_01_p24_text+'</span></li>' +
        '<li><span>发生利息：</span><span>'+mgs.person_SGGRMXCX_01_p25_text+'</span></li>' +
        '<li><span>个人账户余额：</span><span>'+mgs.person_SGGRMXCX_01_p26_text+'</span></li>' +
        '<li><span>摘要：</span><span>'+mgs.person_SGGRMXCX_01_p27_text+'</span></li>' +
        '<li><span>冲正标识：</span><span>'+mgs.person_SGGRMXCX_01_p28_text+'</span></li>';
    $('#list').html(html);
    $('body').css("position","fixed");
    $('#detail,#detailCon').show();
}
$('#close').on('click',function(){
    $('#detail,#detailCon').hide();
    $('body').css("position","static");
})
/*日历插件  日期范围限制*/
laydate.render({
    elem: '#add_time',//指定元素
    done: function(value, date){
        compare();
    }
});
laydate.render({
    elem: '#end_time',//指定元素
    done: function(value, date){
        compare();
    }
});
function compare(){
    var beginDate=$("#add_time").html();
    var endDate=$("#end_time").html();
    var d1 = new Date(beginDate.replace(/\-/g, "\/"));
    var d2 = new Date(endDate.replace(/\-/g, "\/"));
    if(beginDate!=""&&endDate!=""&&d1 >=d2)
    {
        maskTip("开始时间不能大于结束时间！");
        $("#end_time").html(" ");
        return false;
    }
}
userCenter = true
$(".userAvatarBox").on("click", function (event) {
    if (userCenter) {
        userCenter = false;
        $(".userAvatarBox #userCenter").show();//记录
        $('#detail').show();
    } else {
        userCenter = true;
        $(".userAvatarBox #userCenter").hide();
        $('#detail').hide();
    }
});
/*退出*/
$('#quit').on('click',function(){
    var jsonObj = {
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
        type: "POST",
        url: "/gdsgGJJ/logout",
        dataType: "json",
        data: JSON.stringify(jsonObj),
        contentType: "application/json"
    }).done(function (res) {
        console.log(res)
        $('#dialogMask,#dialog').hide();
        if (res.retCode == "000000") {
            var urls = "/gdsgGJJ?page=gdsgGJJ&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
            window.location.href = urls;
        } else {//登陆失败
            maskTip(res.responseBody.errorMsg);
        }
    })
})
