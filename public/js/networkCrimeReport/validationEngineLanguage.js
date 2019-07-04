(function($) {
    $.fn.validationEngineLanguage = function() {};
    $.validationEngineLanguage = {
        newLang: function() {
            $.validationEngineLanguage.allRules = 	{"required":{
                "regex":"none",
                "alertText":"* 非空选项.",
                "alertTextCheckboxMultiple":"* 请选择一个单选框.",
                "alertTextCheckboxe":"* 请选择一个复选框."},
                "length":{
                    "regex":"none",
                    "alertText":"* 长度必须在",
                    "alertText2":" 至 ",
                    "alertText3": "之间."},
                "min": {
                    "regex": "none",
                    "alertText": "* 最小值是 "
                },
                "max": {
                    "regex": "none",
                    "alertText": "* 最大值是 "
                },
                "maxCheckbox":{
                    "regex":"none",
                    "alertText":"* 最多选择 ",
                    "alertText2":" 项."},
                "minCheckbox":{
                    "regex":"none",
                    "alertText":"* 至少选择 ",
                    "alertText2":" 项."},
                "confirm":{
                    "regex":"none",
                    "alertText":"* 两次输入不一致,请重新输入."},
                "telephone":{
                    "regex":"/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/",
                    "alertText":"* 请输入有效的电话号码,如:010-29292929."},
                "mobilephone":{
                    "regex":"/(^0?[1][3578][0-9]{9}$)/",
                    "alertText":"* 请输入有效的手机号码."},
                "email":{
                    "regex":"/^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4}$/",
                    "alertText":"* 请输入有效的邮件地址."},
                "date":{
                    "regex":"/^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$/",
                    "alertText":"* 请输入有效的日期,如:2008-08-08."},
                "ip":{
                    "regex":"/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/",
                    "alertText":"* 请输入有效的IP."},
                "chinese":{
                    "regex":"/^[\u4e00-\u9fa5]+$/",
                    "alertText":"* 请输入中文."},
                "url":{
                    "regex":"/^[a-zA-z]:\\/\\/[^s]$/",
                    "alertText":"* 请输入有效的网址."},
                "zipcode":{
                    "regex":"/^[1-9]\d{5}$/",
                    "alertText":"* 请输入有效的邮政编码."},
                "qq":{
                    "regex":"/^[1-9]\d{4,9}$/",
                    "alertText":"* 请输入有效的QQ号码."},
                "onlyNumber":{
                    "regex":"/^[0-9]+$/",
                    "alertText":"* 请输入数字."},
                "onlyLetter":{
                    "regex":"/^[a-zA-Z]+$/",
                    "alertText":"* 请输入英文字母."},
                "noSpecialCaracters":{
                    "regex":"/^[0-9a-zA-Z]+$/",
                    "alertText":"* 请输入英文字母或数字."},
                "ajaxUser":{
                    "file":"../../registerUser.do?actionMethod=validatorUserName",
                    "alertTextOk":"* 帐号可以使用.",
                    "alertTextLoad":"* 检查中, 请稍后...",
                    "alertText":"* 帐号已被使用，请修改重试."},
                "ajaxName":{
                    "file":"validateUser.php",
                    "alertText":"* This name is already taken",
                    "alertTextOk":"* This name is available",
                    "alertTextLoad":"* Loading, please wait"},
                "custom1":{
                    "nname":"customFunc1",
                    "alertText":"* 必须输入123"},
                "validatorCode":{
                    "nname":"customValidatorCodeFunc",
                    "alertText":"* 请输入4位验证码."},
                "validatorPhone":{
                    "nname":"customPhoneFunc",
                    "alertText":"* 请输入有效的电话号码,如:010-29292929,或手机号码."},
                "validatorUploadFile":{
                    "nname":"customValidatorUploadFileFunc",
                    "alertText":"* 上传文件格式不正确，或文件大小超出限制."},
                "validatorAppAccount":{
                    "nname":"customValidatorAppAccountFunc",
                    "alertText":"* 请填写违法应用账号."},
                "validatorWebURL":{
                    "nname":"customValidatorWebURLFunc",
                    "alertText":"* 请填写违法网站地址."},
                "validatorWebName":{
                    "nname":"customValidatorWebNameFunc",
                    "alertText":"* 请填写违法网站名称."},
                "validatorAppType":{
                    "nname":"customValidatorAppTypeFunc",
                    "alertText":"* 请选择违法应用服务."},
                "datetimeValidator":{
                    "nname":"datetimeValidatorFunc",
                    "alertText":"* 事件发生时间填写错误，已超过当前时间."},
                "validatorEmail":{
                    "nname":"validatorEmailFunc",
                    "alertText":"* 请输入有效的邮件地址."},
                "validatorIdCard":{
                    "nname":"validatorIdCardFunc",
                    "alertText":"* 请根据证件类型输入有效的证件编号."}
            }
        }
    }
})(jQuery);
$(document).ready(function() {
    $.validationEngineLanguage.newLang()
});