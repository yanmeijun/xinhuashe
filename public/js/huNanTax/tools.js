/**
 * 工具类
 *
 * @author li.zhu@chinacreator.com
 */
var Tools = {
    // javascript获取上下文
    contextPath: function () {
        var contextPathTemp = location.protocol + "//" + location.host;
        var pathname = location.pathname;
        if (pathname) {
            var index = pathname.indexOf("/", 1);
            if (index > 0) {
                contextPathTemp += pathname.substring(0, index + 1);
            }
        }

        return contextPathTemp;
    },

    // 替换非法字符
    replaceHtmlTag: function (str) {
        var tempStr = str;
        tempStr = tempStr.replace(/[<>\\'()&*\\/=]/g, '').replace(/or/g, '').replace(/select/g, '').replace(/delete/g, '').replace(/from/g, '').replace(/update/g, '');
        tempStr = tempStr.replace(/OR/g, '').replace(/SELECT/g, '').replace(/DELETE/g, '').replace(/FROM/g, '').replace(/UPDATE/g, '');
        return tempStr;
    },

    /**
     * 字母和数字组合验证
     */
    isLetterDigit: function (str) {
        var rep = /^[A-Za-z0-9]*([A-Za-z]+\d+)|(\d+[A-Za-z]+)[A-Za-z0-9]*$/;
        if (!rep.exec(str)) return false;
        return true;
    },
    /**
     * divId :气泡所在层的ID
     * sourceId：确定气泡位置的元素ID
     * dlId：文字所放的元素的ID
     * message: 气泡的文字
     */
    showMessage: function (divId, sourceId, dlId, message) {
        $('#' + divId).show();
        var ementleft = $('#' + sourceId).offset().left;
        var ementtop = $('#' + sourceId).offset().top;
        $("#" + dlId).empty();
        $("#" + dlId).css('width', '100%');
        $("#" + dlId).append(message);
        $('#' + divId).css('z-index', '99');
        if ($('#' + dlId).width() >= 108) {
            $('#' + dlId).css('width', '120px');
        }
        var dlImageWidth = $('#offImage').offset().left - $("#" + divId).offset().left;
        var sourceWidth = $('#' + sourceId).width();
        var widthCha = sourceWidth - dlImageWidth;
        $('#' + divId).css("left", ementleft + widthCha);
        $('#' + divId).css("top", ementtop - $('.login_qp').height() + 4);
        $('#' + sourceId).focus();
    },
    /**
     * 判断是否为undefined，或者null，或者空字符串，或者字符串'non'
     */
    isNull: function (value) {
        return (!value) || value == 'non';
    },

    /**
     * 获取字符串的字节长度
     */
    getStrByteLength: function (str) {
        var w = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            //单字节加1
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                w++;
            }
            else {
                w += 2;
            }
        }
        return w;
    },

    /**
     * 检测字符串不能超过多少个字节。汉字为双字节。
     *　str：源字符串
     *　maxlength：允许的最大数　
     */
    strLengthCheck: function (str, maxlength) {
        var w = Tools.getStrByteLength(str);

        if (w > maxlength) {
            return false;
        }
        return true;
    },
    /**
     * 隐藏气泡
     */
    hiddenMessage: function (divId) {
        $('#' + divId).hide();
    },

    /**
     * 验证移动手机号码
     */
    validateMobile: function (mobile) {
        var reg = /^((13[4-9])|(15[7-9])|(15[0-2])|(18[7-8]))[0-9]{8}$/;
        if (!reg.test(mobile)) {
            $.messager.defaults = {ok: "确定", cancel: "取消"};
            $.messager.alert('', "手机号码不符合移动手机号码格式要求，请重新输入！", 'error');
            return false;
        } else {
            return true;
        }
    },

    /**
     * 字符串比较,用于格式相同的日期比较
     * @param datestr1 日期字符串1
     * @param datestr2 日期字符串2
     * @return 如果datestr1 > datestr2,则返回true,否则返回false
     */
    timesStringCompare: function (datestr1, datestr2) {
        if (datestr1 == null || datestr1 == "" || datestr2 == null || datestr2 == "") {
            return false;
        }
        if (datestr1 > datestr2) {
            return true;
        }
    },

    /**
     * 获取指定格式的日期字符串
     * @param date 日期（Date）
     * @param str  格式
     */
    dateFormat: function (date, str) {
        str = str.replace(/yyyy/g, date.getFullYear());
        str = str.replace(/yy/g, date.getFullYear().toString().slice(2));
        var m = date.getMonth() + 1;
        if (m < 10) {
            m = '0' + m;
        }
        str = str.replace(/mm/g, m);
        var d = date.getDate();
        if (d < 10) {
            d = '0' + d;
        }
        str = str.replace(/dd/g, d);
        str = str.replace(/wk/g, date.getDay());
        var h = date.getHours();
        if (h < 10) {
            h = '0' + h;
        }
        str = str.replace(/hh/g, h);
        var mi = date.getMinutes();
        if (mi < 10) {
            mi = '0' + mi;
        }
        str = str.replace(/mi/g, mi);
        var sec = date.getSeconds();
        if (sec < 10) {
            sec = '0' + sec;
        }
        str = str.replace(/ss/g, sec);
        str = str.replace(/ms/g, date.getMilliseconds());
        return str;
    },
    //判断是否为日期时间字符串，支持的格式：如2011-9-8、2011-9-8 12、2011-9-8 12:33、2011-9-8 12:33:45等
    isDateStr: function (str) {
        var reg = /^((((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9]))|(((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9]))|(((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9]))|(([2468][048]00)([-\/\._])(0?2)([-\/\._])(29))|(([3579][26]00)([-\/\._])(0?2)([-\/\._])(29))|(([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29))|(([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29))|(([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29))|(([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29))|(([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29))|(([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)))( ((0?[0-9])|(1[0-9])|(2[0-3]))(:((0?[0-9])|([1-5][0-9]))(:((0?[0-9])|([1-5][0-9])))?)?)?$/;
        return reg.test(str);
        //return true;
    },

    uniencode: function (text) {
        text = escape(text.toString()).replace(/\+/g, "%2B");
        var matches = text.match(/(%([0-9A-F]{2}))/gi);
        if (matches) {
            for (var matchid = 0; matchid < matches.length; matchid++) {
                var code = matches[matchid].substring(1, 3);
                text = text.replace(matches[matchid], '%u00' + code);
            }
        }
        text = text.replace(/%u/g, "\\u");
        return text;
    },

    /**
     * 表单属性验证，注意当未找到指定属性时会返回true
     * attrId      属性ID
     * cnName      属性中文名
     * minLength   最小长度，0表示可为空
     * maxLength   最大长度，0表示不验证最大长度
     * reg         格式正则表达式，false表示不使用正则表达式验证
     * regDisc     正则表达式的说明
     * maxFalseInfo 超过最大长度时的补充提示信息
     *
     * 示例：
     * checkField('name','姓名',1,32) 姓名必填且不超过32个字符
     * checkField('postCode','邮编',1,0,/^\d{6}$/,'6位数字') 邮编必填且为6位数字
     */
    checkField: function (attrId, cnname, minLength, maxLength, reg, regDisc, maxFalseInfo) {
        if ($('#' + attrId).attr('id')) {
            var value = $('#' + attrId).val();
            if (minLength && value == '') {
                alert('请输入' + cnname);
                return false;
            }
            if (minLength && value != '' && Tools.getStrByteLength(value) < minLength) {
                alert(cnname + '不能少于' + minLength + '个字符（1个汉字为2个字符）');
                return false;
            }
            if (value != '' && maxLength && !Tools.strLengthCheck(value, maxLength)) {
                alert(cnname + '不能超过' + maxLength + '个字符（1个汉字为2个字符）' + (maxFalseInfo ? ('，' + maxFalseInfo) : ''));
                return false;
            }
            if (value != '' && reg) {
                if (!reg.test(value)) {
                    alert(cnname + (regDisc ? ('格式为' + regDisc) : '格式不正确') + '，请重新输入');
                    return false;
                }
            }
        }
        return true;
    },
    /**
     * 表单复选框属性验证，注意当未找到指定属性时会返回true
     */
    checkCheckboxField: function (attrName, cnName, notNull) {
        if (!$(':checkbox[name="' + attrName + '"]').length) {
            return true;
        }
        var infoType = $(':checkbox[name="' + attrName + '"][checked]');
        if (!infoType.length && notNull) {
            alert('请选择' + cnName);
            return false;
        }
        return true;
    },
    /**
     * 表单单选属性验证，注意当未找到指定属性时会返回true
     */
    checkRadioField: function (attrName, cnName, notNull) {
        if (!$(':radio[name="' + attrName + '"]').length) {
            return true;
        }
        var infoType = $(':radio[name="' + attrName + '"][checked]');
        if (!infoType.length && notNull) {
            alert('请选择' + cnName);
            return false;
        }
        return true;
    },

    /**
     * 四舍五入
     * param: num 目标数值
     * param: f 保留小数位数
     * return: 四舍五入后的数值
     */
    round: function (num, f) {
        if (typeof num == 'number') {
            if (num == 0) return 0;
            if (typeof f == 'number') {
                if (f == 0) return Math.round(num);
                if (f > 0) {
                    var p = Math.pow(10, Math.round(f));
                    return Math.round(num * p) / p;
                }
            }
            return num;
        }
        return null;
    },

    /**
     * 解析日期字符串
     * param: dateStr 目标日期字符串
     * return: 日期对象
     */
    parseDate: function (dateStr) {
        var date = new Date();
        if (typeof dateStr == "string") {
            var time = Date.parse(dateStr);
            if (isNaN(time)) {
                var ptn_date = /^\d{4}-\d{1,2}-\d{1,2}$/;
                var ptn_num = /^\d{6,8}$/;
                var year, month, day;
                if (ptn_date.test(dateStr)) {
                    var part = dateStr.split("-");
                    year = Number(part[0]);
                    month = Number(part[1]);
                    day = Number(part[2]);
                } else if (ptn_num.test(dateStr)) {
                    year = Number(dateStr.substr(0, 4));
                    month = Number(dateStr.substr(4, 2));
                    day = (dateStr.length > 6) ? Number(dateStr.substring(6)) : 1;
                }
                if (typeof year == "number") {
                    date.setFullYear(year);
                    date.setMonth(month - 1);
                    date.setDate(day);
                    date.setHours(0);
                    date.setMinutes(0);
                    date.setSeconds(0);
                    date.setMilliseconds(0);
                }
            } else {
                date.setTime(time);
            }
        }
        return date;
    },

    /**
     * 计算两个日期之间相差的天数(date2-date1)
     * param: date1 起始日期(日期对象或字符串)
     * param: date2 终止日期(日期对象或字符串)
     * return: 相差的天数
     */
    dateDiff: function (date1, date2) {
        var minutes = 1000 * 60;
        var hours = minutes * 60;
        var days = hours * 24;
        var time1 = (date1 instanceof Date) ? date1.getTime() : Tools.parseDate(date1).getTime();
        var time2 = (date2 instanceof Date) ? date2.getTime() : Tools.parseDate(date2).getTime();
        return Math.round((time2 - time1) / days);
    }
}