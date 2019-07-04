$(function(){
    /*举报查询按钮*/
    $("#policemen_query").on("click",function(){
        var url = "/policemenReport?page=result&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
        window.location.href = url;
    });
    /*我要举报按钮*/
    $("#policemen_report").on("click",function () {
        var url = "/policemenReport?page=informerInfo&randomKey=" + randomKey + "&userID=" + userID +
            "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
        window.location.href = url;
    });
});

function AutoComplete(options) {
    this.config = {
        targetCls: '.reporteTips',          //
        closeCls: '#reporteTips',          //
        hiddenCls: '.mask',          // 隐藏域
        hiddenTip: ".dialog-publicBox",// 隐藏域
        targetEle: ".report"
    };
    this.init(options);
}

AutoComplete.prototype = {
    constructor: AutoComplete,//构造函数的原型
    init: function (options) {
        this.config = $.extend(this.config, options || {});
        var self = this,
            _config = self.config;
        $(_config.targetCls).each(function (index, item) {
            $(item).on("click", function (e) {
                var target = e.target;
                $(_config.hiddenCls).hide();
                $(_config.hiddenTip).hide();
            });
        });

        $(_config.targetEle).click(function () {
            var targetVal = $(this).val();
            self._goPage(targetVal);
        })
    },
    _goPage: function (targetVal) {
        if (targetVal == "我要举报") {
            var url = "/policemenReport?page=informerInfo&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
            window.location.href = url;
        } else {
            var url = "/policemenReport?page=result&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom + "&local_y=" + local_y;
            window.location.href = url;
        }
    }
};
// 初始化
$(function () {
    var auto = new AutoComplete({});
});