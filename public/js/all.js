window.onload = function () {
    fnSize();
    window.addEventListener('resize', fnSize, false)
    function fnSize() {
        document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.offsetWidth / 10 + 'px';
    }
}
// 参数为空时的提示语
function maskTip(mgs) {
    if (mgs.length > 16 && mgs.length <= 32) {
        document.getElementById("masktime").innerHTML = mgs;
        document.getElementById("masktime").style.display = "block";
        document.getElementById("masktime").style.lineHeight = '20px';
        document.getElementById("masktime").style.height = '50px';
        document.getElementById("masktime").style.padding = '5px';
        document.getElementById("masktime").style.textAlign = "center";
    } else if (mgs.length > 32) {
        document.getElementById("masktime").innerHTML = mgs;
        document.getElementById("masktime").style.display = "block";
        document.getElementById("masktime").style.lineHeight = '20px';
        document.getElementById("masktime").style.height = '72px';
        document.getElementById("masktime").style.padding = '5px';
        document.getElementById("masktime").style.textAlign = "center";
        document.getElementById("masktime").style.textAlign = "left";
    }else {
        document.getElementById("masktime").innerHTML = mgs;
        document.getElementById("masktime").style.display = "block";
        document.getElementById("masktime").style.lineHeight = '49px';
        document.getElementById("masktime").style.height = '49px';
        document.getElementById("masktime").style.padding = '0px';
        document.getElementById("masktime").style.textAlign = "center";
    }
    setTimeout(function () {
        document.getElementById("masktime").style.display = "none";
    }, 2000)
    return
}
/*
 *@author ymj
 *@effect替换成手机号和身份证号成***
 *@params [string] str, frontLen, endLen
 *@call手机：plusXing(MOBILE, 3, 4)  身份证：plusXing(SFCODE, 2, 2)
 * @returns [true 代表正确 false 代表格式错误]
 */
function plusXing(str, frontLen, endLen) {
    if (str != "") {
        var len = str.length - frontLen - endLen;
        var xing = '';
        for (var i = 0; i < len; i++) {
            xing += '*';
        }
        return str.substr(0, frontLen) + xing + str.substr(str.length - endLen);
    } else {
        return "";
    }
}
/*
 *@author ymj
 *@params [string] idCard身份证号
 * @returns [true 代表正确 false 代表格式错误]
*/
function validateIdCard(idCard) {
    //15位和18位身份证号码的正则表达式
    // var regIdCard = /(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[X|x])$)/;
    var regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(idCard)) {
        if (idCard.length == 18) {
            var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
            var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
            for (var i = 0; i < 17; i++) {
                idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
            }
            var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
            var idCardLast = idCard.substring(17);//得到最后一位身份证号码
            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod == 2) {
                if (idCardLast == "X" || idCardLast == "x") {
                    return true;
                    //alert("恭喜通过验证啦！");

                } else {
                    return false;
                    //maskTip("身份证号码错误！");
                }
            } else {
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (idCardLast == idCardY[idCardMod]) {
                    //alert("恭喜通过验证啦！");
                    return true;
                } else {
                    //maskTip("身份证号码错误！");
                    return false;

                }
            }
        } else {
            //maskTip("身份证号码错误！");
            return false;
        }
    } else {
        return false;
    }
}
/*
 * @author ymj
 * @params [string] UUserCard身份证号
 * @params [string] num  "1"出生日期  //"2"获取性别  "3"获取年龄
 */
function IdCard(UUserCard, num) {
    if (num == 1) {
        //获取出生日期
        birth = UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
        return birth;
    }
    if (num == 2) {
        //获取性别
        if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
            //男
            return "男";
        } else {
            //女
            return "女";
        }
    }
    if (num == 3) {
        //获取年龄
        var myDate = new Date();
        var month = myDate.getMonth() + 1;
        var day = myDate.getDate();
        var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
        if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
            age++;
        }
        return age;
    }
}

//时间格式化
//-----------------------------
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
//---------------------
//去除字符串前后空格
//---------------------
function strTrim(str) {
    return str.replace(/(^\s+)|(\s+$)/g, "");
}

/**
 * 取地址栏参数
 *
 * @author ymj
 * @param name 参数名
 * @returns
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}
/**
 * 取地参数
 *
 * @author ymj
 * @param element,title 参数名 [element 目标元素] [title 标题]
 * @returns
 */
function mobileSelect(element,title,weekdayArr){
    $(".mobileSelect").remove();
    var mobileSelect1 = new MobileSelect({
        trigger: element,
        title: title,
        wheels: [
            {data: weekdayArr}
        ],
        callback: function (indexArr, data) {
        }
    });
    $(".mobileSelect").addClass("mobileSelect-show");
}


/*
 *仅允许输入汉字
 **/
function isZH_CN(type,val){
    var reg = /^[\u4e00-\u9FA5]+$/;
    if(!val.match(reg)){
        maskTip('仅允许填写汉字！');
        if(myTrim(type) == 'reportName'){
            if(document.getElementById('reportName').value.length<=0){
                return;
            }else{
                document.getElementById('reportName').value = document.getElementById('reportName').value.replace(/[^\u4E00-\u9FA5]/g,'');
                document.getElementById('reportName').focus();
            }
        }
        if(myTrim(type) == 'reportDept'){
            if(document.getElementById('reportDept').value.length<=0){
                return;
            }
            document.getElementById('reportDept').value = document.getElementById('reportName').value.replace(/[^\u4E00-\u9FA5]/g,'');
            document.getElementById('reportDept').focus();
        }
        if(myTrim(type) == 'reportPosition'){
            if(document.getElementById('reportPosition').value.length<=0){
                return;
            }
            document.getElementById('reportPosition').value = document.getElementById('reportName').value.replace(/[^\u4E00-\u9FA5]/g,'');
            document.getElementById('reportPosition').focus();
        }
        if(myTrim(type) == 'name'){
            if(document.getElementById('name').value.length<=0){
                return;
            }
            document.getElementById('name').value = document.getElementById('name').value.replace(/[^\u4E00-\u9FA5]/g,'');
            document.getElementById('name').focus();
        }
    }
}

function myTrim(str){
    str = str.replace(/^ +/,''); //将开头的N个空格替换成''（空）；
    str = str.replace(/ +$/,''); //将末尾的N个空格替换为''（空）；
    return str;
}
//纪检委判断验证码用到
function josnToStr(s) {
    var index = s.substr(10,1);
    var result = s;
    if(index=="1"){
        result = s.substr(4,1) + s.substr(13,1);
    } else if(index=="2"){
        result = s.substr(27,1) + s.substr(22,1) + s.substr(17,1) + s.substr(13,1) + s.substr(7,1) + s.substr(4,1);
    } else if(index=="3"){
        result = s.substr(30,1) + s.substr(27,1) + s.substr(22,1) + s.substr(17,1) + s.substr(13,1) + s.substr(7,1) + s.substr(4,1);
    } else if(index=="4"){
        result = s.substr(20,s.length-32+1);
    }
    return result;
}
/**
 * 邮箱格式
 * @author ymj
 * @param email_url 参数名 [email_url string]
 * @returns
 */
function email(email_url){
    //邮箱格式
    let regs=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
    if(!regs.test(email_url) || !reg.test(email_url)){
        return false;
    }else{
        return true;
    }
}
//解决H5页面弹出软键盘，遮挡文本框问题
function init() {
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
            var clientHeight = $(window).height()// 初始化屏幕高度
            var isFocus = false// 是否有input标签被选中，false没有， true有
            var focusDom = null// 当前选中的input标签
            $(document).on('focus', 'input', function (e){// 监听输入框是否选中
                focusDom = $(this)
                $(window).on('touchmove', function() {// 当前页面滚动，收起手机软键盘
                    isFocus = false
                    focusDom.blur()
                })
                if( isFocus ){// 若已有input标签被选中，跳过以下处理
                    return
                }

                let bottomHeight = $(window).height() - $(this).height() - $(this).offset().top // 当前选中元素距离屏幕底部距离
                // console.log(bottomHeight)
                if( bottomHeight < 50 ){
                    var top = $('body').scrollTop()
                    setTimeout(()=>{
                        $('body').css('height', ($(this).height() + $(this).offset().top+300) + 'px');
                        $('body').scrollTop(top + 300)// 滚动高度增加300像素，（假设手机软键盘高度为300）
                        isFocus = true
                    }, 300)
                }else{
                    setTimeout(()=>{// 待软键盘收起动画结束后执行
                        isFocus = true
                    }, 300)
                }

            })
            $(document).on('blur', 'input', function (){// 收起手机软键盘后，取消监听
                focusDom = null
                isFocus = false
                $('body').css('height', '100%');
                $(window).off('touchmove')
            })
            $(window).resize(function() {// 监听手机软键盘弹起以及收起

                if( clientHeight == $(window).height() ){// 手机软键盘收起,使所有input失焦
                    isFocus = false
                    focusDom.blur()
                }

            })
    }
}
init();

