$(function () {
    ajaxData("美洲", "");
});
$.fn.jqTab = function (options) {
    var defaultOptions = {
        class: "active",
        mask: "#dialogMask",
        diaMask: "#dialog",
    }
    var self = $.extend(defaultOptions, options);
    return this.each(function () {
        var $el = $(this)
        $el.click(function () {
            var $ele = $(this)
            $ele.addClass(self.class).siblings().removeClass(self.class);
            var textSearch = $('#textSearch').val();
            ajaxData($ele.text(), textSearch)
        });
    })
};
$('.gjj-tab li').jqTab({});

function ajaxData(title, textSearch) {
    $('#dialogMask,#dialog').show();
    var parameters = {
        randomKey: randomKey,
        userID: userID,
        clientID: clientID,
        cityID: cityID,
        local_x: local_x,
        localFrom: localFrom,
        local_y: local_y,
        configTitle: title
    };
    $.ajax({
        async: true,
        url: "/emergencyPhone/telSearch",
        type: "post",
        data: JSON.stringify(parameters),
        contentType: 'application/json',
        success: function (res) {
            $('#dialogMask,#dialog').hide()
            if (res.retCode == "000000") {
                var data = res.responseBody.groupCenter;
                var html = "";
                if (!textSearch.trim()) {
                    data.forEach(function (item, i) {
                        html += "<li onclick='goDetail(" + JSON.stringify(item) + ")' >" + item.embassy.trim() + "</li>";
                    })
                } else {
                    data.forEach(function (item, i) {
                        if (item.embassy.indexOf(textSearch) != -1 && textSearch != '') {
                            html += "<li onclick='goDetail(" + JSON.stringify(item) + ")' >" + item.embassy.trim() + "</li>";
                        }
                    })
                }
                if (html) {
                    $("#resultsList").html(html);
                } else {
                    data.forEach(function (item, i) {
                        html += "<li onclick='goDetail(" + JSON.stringify(item) + ")' >" + item.embassy.trim() + "</li>";
                    })
                    maskTip("暂无数据");
                    $("#resultsList").html(html);
                }
            }
        },
        error: function () {
            maskTip("请求失败");
            return;
        }
    })
};

function goDetail(resultList) {
    sessionStorage.setItem("resultList", JSON.stringify(resultList));
    var url = "/emergencyPhone?page=result&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
    window.location.href = url;//跳转到对应的页面
}

$('#btnSearch').on("click", function () {
    var textSearch = $('#textSearch').val();
    title = $('.gjj-tab li.active').text()
    ajaxData(title, textSearch)
})