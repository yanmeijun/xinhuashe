;
(function ($) {
    if (localStorage.getItem("LawTota")) {
        $('#LawTrigger').attr("data_id", localStorage.getItem("LawTota"));
        $('#LawTrigger').html(localStorage.getItem("LawTota"))
    }
    ;
})(Zepto)
function sure() {
    var lawRecond;
    if ($('#LawTrigger').attr("data_id")) {
        lawRecond = 0 - Number($('#LawTrigger').attr("data_id") * 30)
    }
    ;
    console.log("第10个积分", lawRecond);
    localStorage.setItem("LawTotalSum", lawRecond);
    localStorage.setItem("LawTota", $('#LawTrigger').attr("data_id"));

    var url = "/pointsSettled?page=analogIntegratorResults&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
    // if(sum>0){
    //     var url="/pointsSettled?page=analogIntegratorResults&randomKey="+randomKey+"&userID="+userID.trim()+"&clientID="+clientID.trim()+"&cityID="+cityID.trim()+"&local_x="+local_x+"&local_y="+local_y;
    //     window.location.href=url;
    // }else{
    //     var url="/pointsSettled?page=doesNotMeet&randomKey="+randomKey+"&userID="+userID.trim()+"&clientID="+clientID.trim()+"&cityID="+cityID.trim()+"&local_x="+local_x+"&local_y="+local_y;
    //     window.location.href=url;
    // }

};
function back() {
    var url = "/pointsSettled?page=honor&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
    window.location.href = url;
}
$('#Law,#LawTrigger').on('click', function () {
    var weekdayArr = [
        {"id": "0", "name": "0"},
        {"id": "1", "name": "1"},
        {"id": "2", "name": "2"},
        {"id": "3", "name": "3"},
        {"id": "4", "name": "4"},
        {"id": "5", "name": "5"},
        {"id": "6", "name": "6"},
        {"id": "7", "name": "7"},
        {"id": "8", "name": "8"},
        {"id": "9", "name": "9"},
        {"id": "10", "name": "10"}
    ];
    $(".mobileSelect").remove();
    var mobileSelect1 = new MobileSelect({
        trigger: "#LawTrigger",
        title: '守法记录',
        wheels: [
            {data: weekdayArr}
        ],
        callback: function () {
            $("#LawTrigger").css("color","rgb(71, 71, 71)");
        }
    });
    $(".mobileSelect").addClass("mobileSelect-show");
})