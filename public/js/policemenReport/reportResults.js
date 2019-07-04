/*查询结果*/
var policemenReport = JSON.parse(sessionStorage.getItem("policemenReport"));

$(function () {

    if(policemenReport.searchCode){
        $(".quertString").val(policemenReport.searchCode);
    }else{
        $(".appFailedBox span").html(policemenReport.status);
    }
    /*查询结果*/
    $('#quertString').html(policemenReport.searchCode);
    /*返回上一级*/
    $("#goback,#reReport").click(function(){
        var url = "/policemenReport?page=bInformerInfo&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
        window.location.href = url;
        return;
    });
    /*返回首页*/
    $("#goindex").click(function(){
        var url = "/policemenReport?page=policemenReport&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
        window.location.href = url;
        return;
    });

});