$(function () {
    $("#icon-downMenu").on("click", function () {
        $(".mask").fadeIn(100);
        $("#dialog-car-box").fadeIn(100)
    })
    $("#car-num").on("click", function () {
        $(".mask").fadeIn(100);
        $("#dialog-carNum-box").fadeIn(100)
    })
    $(".mask").on("click", function () {
        $(".mask").fadeOut(100);
        $("#dialog-car-box").fadeOut(100)
        $("#dialog-carNum-box").fadeOut(100)
    })
    $("img[id^='tab-tit-']").on("click", function () {
        var id = $(this).attr("id").replace("tab-tit-", "");
        $("#tab-content-" + id).toggle(100)
    })
})
