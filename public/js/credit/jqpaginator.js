//分页函数pagination
$.fn.pagination = function (opts) {
    //设置默认值
    opts = $.extend({
        total: 1,
        current_page: 0,
        callback: function () {
            return false;
        }
    }, opts || {});
    var containers = this;
    //创建上一页、下一页、第一页元素、当前页元素
    var $left = $('<div>').addClass('left');
    var $first = $('<a>').addClass('first');
    var $fIcon = $('<i>').addClass('c-icon');
    $first.append($fIcon);
    var $Pre = $('<a>').addClass('new-prepage');
    var $PIcon = $('<i>').addClass('c-icon');
    $Pre.append($PIcon);
    $left.append($first, $Pre);
    var $right = $('<div>').addClass('right');
    var $Next = $('<a>').addClass('new-nextpage');
    var $NIcon = $('<i>').addClass('c-icon');
    $Next.append($NIcon);
    $right.append($Next);
    var $center = $('<div>').addClass('center');
    containers.append($left, $center, $right);
    showPage(opts.current_page);
    //点击上一页
    $Pre.click(function () {
        opts.current_page = opts.current_page - 1;
        if (opts.current_page < 0) opts.current_page = 0;
        showPage(opts.current_page);
        opts.callback && opts.callback(opts.current_page);
    });
    //点击下一页
    $Next.click(function () {
        opts.current_page += 1;
        if (opts.current_page > opts.total) opts.current_page = opts.total;
        showPage(opts.current_page);
        opts.callback && opts.callback(opts.current_page);
    })
    //点击回到首页
    $first.click(function () {
        opts.current_page = 0;
        showPage(opts.current_page);
        opts.callback && opts.callback(opts.current_page);
    })

    function showPage(now) {
        if (now == 0) {
            $center.html('下一页');
            $Pre.hide();
        } else {
            $center.html('第&nbsp;' + (now + 1) + '&nbsp;页');
            $Pre.show();
        }
        if (now < 2) {
            $first.hide();
        } else {
            $first.show();
        }
        if (now >= opts.total) {
            $Next.hide();
            $center.hide();
        } else {
            $Next.show();
            $center.show();
        }
        var leftA = $left.find('a');
        if ($($left.has('a.first').get(0).querySelector('.first')).css('display') !== 'none') {
            $PIcon.css('marginRight', '62%');
            leftA.css('width', '48%');
        } else {
            $PIcon.css('marginRight', '31%');
            leftA.css('width', '100%');
        }
    }
}