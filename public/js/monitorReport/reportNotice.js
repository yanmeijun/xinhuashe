var copyright = sessionStorage.getItem("copyright");
var selectCityArea = sessionStorage.getItem("selectCityArea");
$(function(){
    $('#copyright').html("中共"+selectCityArea+"纪委"+"<br>"+selectCityArea+"监委");
});
$('#report').click(function(){
    if($('#radio').parent().hasClass("active")){
        sessionStorage.setItem("copyright",$('#copyright').html())
        window.location.href = "/monitorReport?page=reportInfo&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        return;
    }else{
        maskTip("请阅读以上条款");
        return;
    }
});
$('#radio').click(function(){
    if($(this).parent().hasClass("active")){
        $(this).parent().removeClass('active');
    }else{
        $(this).parent().addClass('active');
    }
})
$('#back').click(function () {
    window.location.href = "/monitorReport?page=reportPlatform&randomKey=" + randomKey + "&userID=" + userID +
        "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    return;
});