Date.add0 = function(num, length) {
    length = typeof length !== "undefined" && typeof length == "number" ? length : 2;
    num = num.toString();
    while (num.length < length) {
        num = '0' + num;
    }
    return num;
};
Date.prototype.kxString=function(sep){
    sep = typeof sep !== "undefined" ? sep : '-';
    return this.getFullYear() + sep + Date.add0(this.getMonth()+1,2) + sep + Date.add0(this.getDate(),2);
};
Date.prototype.kxTime=function(){
    return new Date(this.getFullYear(),this.getMonth(),this.getDate()).getTime();
};
Date.prototype.kxDate=function(){
    return new Date(this.getFullYear(),this.getMonth(),this.getDate());
};
function popLoading(){
    $('.zepto-pop-loading').show();
}
function cancelLoading(){
    $('.zepto-pop-loading').hide();
}
function toast(msg){
    $("#toast .toast-txt").html(msg);
    $(".mask-transparent").fadeIn();
    $("#toast").addClass("show-in");

    setTimeout(function(){
        $(".mask-transparent").fadeOut();
        $("#toast").removeClass("show-in");
    },3000);
}

KYFW = window.KYFW||{};
(function(KYFW){
    KYFW.calendar_showNum=3;
    // 搜索余票类型
    KYFW.ticktype_student = 'student'; // 学生
    KYFW.ticktype_student_val = '0X00'; // 学生
    KYFW.ticktype_general = 'general'; // 普通
    KYFW.ticktype_general_val = 'ADULT'; // 普通

    // 车次类型分类
    KYFW.traintype_qb = 'QB'; // 全部
    KYFW.traintypes={
        'GDC': 'G,D,C',
        //'D': 'D',
        'Z' : 'Z',
        'T' : 'T',
        'K' : 'K',
        'QT' : ''
    };
    KYFW.traintype_gdc = 'GDC';// GDC字头
    //KYFW.traintype_d = 'D';// D字头
    KYFW.traintype_z = 'Z'; // Z字头
    KYFW.traintype_t = 'T'; // T字头
    KYFW.traintype_k = 'K'; // K字头
    KYFW.traintype_qt = 'QT';
    // 获取车次类型（参数：code 车次编号，如：k101）
    KYFW.getTrainType=function(code){
        var c1 = code.substr(0,1).toUpperCase();
        if (c1=='G' || c1=='D' || c1=='C') {
            return KYFW.traintype_gdc;
        }
        //else if(c1=='D' ){
        //    return KYFW.traintype_d;
        //}
        else if (c1=='Z') {
            return KYFW.traintype_z;
        } else if (c1=='T') {
            return KYFW.traintype_t;
        } else if (c1=='K') {
            return KYFW.traintype_k;
        } else {
            return KYFW.traintype_qt;
        }
    };

    // 一天时间段分类
    KYFW.DAY_RANGE_TYPE_AM = 1; // 上午
    KYFW.DAY_RANGE_TYPE_PM = 2; // 下午
    KYFW.DAY_RANGE_TYPE_NT = 4; // 晚上
    KYFW.DAY_RANGE_TYPES = {
        '1' : ['00:00', '12:00', '上午'],
        '2' : ['12:00', '18:00', '下午'],
        '4' : ['18:00', '24:00', '晚上']
    };
    // 获取一天时间段类型
    KYFW.GetDayRangeType = function(time) {
        if (time >= KYFW.DAY_RANGE_TYPES['1'][0] && time <KYFW.DAY_RANGE_TYPES['1'][1]) {
            return KYFW.DAY_RANGE_TYPE_AM;
        } else if (time >= KYFW.DAY_RANGE_TYPES['2'][0] && time <KYFW.DAY_RANGE_TYPES['2'][1]) {
            return KYFW.DAY_RANGE_TYPE_PM;
        } else {
            return KYFW.DAY_RANGE_TYPE_NT;
        }
    };
    // 12306 app 下载地址
    KYFW.AppLink="http://dynamic.12306.cn/otn/appDownload/init";
    // 获取请求参数
    KYFW.GetRequest = function() {
        var url = location.search,
            theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    };

    // 热门车站
    KYFW.favorite_names = '';
    // 所有车站
    KYFW.station_names = '';

    // 默认搜索信息
    KYFW.search_info = {
        from : '北京',
        fromCode : 'BJP',
        to : '上海',
        toCode : 'SHH',
        tickType : KYFW.ticktype_general,
        date : new Date().kxString()
    };

    KYFW.depart_nm="";
    KYFW.arrive_nm="";
    KYFW.depart_cd="";
    KYFW.arrive_cd="";
    KYFW.depart_dt='';

    KYFW.qishoushijian_city='';

})(KYFW);
