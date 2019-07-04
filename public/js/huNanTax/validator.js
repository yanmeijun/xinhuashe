/**
 * 表单数据校验工具
 *
 * @author qiang.li@chinacreator.com
 */
var Validator = Validator || {
    defErrorMsg: {
        required: "请输入非空值！",
        notDigits: "请输入全部为数字的数据！",
        notNumeric: "请输入数字类型的数据！",
        notPositive: "请输入非负数！",
        notInteger: "请输入整数！"
    },

    defErrorHandler: function (errorMsg) {
        //if(typeof errorMsg == "string" && errorMsg != "") window.alert(errorMsg);
        if (typeof errorMsg == "string" && errorMsg != "") maskTip(errorMsg)
    },

    /**
     * 根据正则表达式来校验表单数据
     * @param inputCtrl 要校验的表单控件
     * @param reg 正则表达式
     * @param errorMsg 校验不通过时的提示信息
     * @param errorHandler 校验不通过时的回调函数
     * @returns 校验结果
     */
    checkByReg: function (inputCtrl, reg, errorMsg, errorHandler) {
        try {
            //alert($(inputCtrl).val());
            var ctrl = $(inputCtrl);
            if (!reg.test(ctrl.val())) {
                ctrl.focus();
                //if(ctrl.val() != "") ctrl.select();
                // 调用回调函数
                if (typeof errorMsg === "function") {
                    errorHandler = errorMsg;
                    errorHandler(null);
                } else {
                    if (typeof errorHandler !== "function") {
                        errorHandler = Validator.defErrorHandler;
                    }
                    if (typeof errorHandler === "function") {
                        if (errorMsg) errorHandler(errorMsg);
                        else errorHandler(null);
                    }
                }
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    },

    /**
     * 校验表单数据是否非空
     * @param inputCtrl 要校验的表单控件
     * @param errorMsg 校验不通过时的提示信息
     * @param errorHandler 校验不通过时的回调函数
     * @returns 校验结果
     */
    checkReqired: function (inputCtrl, errorMsg, errorHandler) {
        var reg = /^(\s*\S+)+\s*$/;
        errorMsg = errorMsg || Validator.defErrorMsg.required;
        if (!errorHandler) errorHandler = null;
        return Validator.checkByReg(inputCtrl, reg, errorMsg, errorHandler);
    },

    /**
     * 校验表单数据是否全部是数字
     * @param inputCtrl 要校验的表单控件
     * @param errorMsg 校验不通过时的提示信息
     * @param errorHandler 校验不通过时的回调函数
     * @returns 校验结果
     */
    checkDigits: function (inputCtrl, errorMsg, errorHandler) {
        var reg = /^\d+$/;
        errorMsg = errorMsg || Validator.defErrorMsg.notDigits;
        if (!errorHandler) errorHandler = null;
        return Validator.checkByReg(inputCtrl, reg, errorMsg, errorHandler);
    },

    /**
     * 校验表单数据是否数字类型
     * @param inputCtrl 要校验的表单控件
     * @param errorMsg 校验不通过时的提示信息
     * @param errorHandler 校验不通过时的回调函数
     * @returns 校验结果
     */
    checkNumeric: function (inputCtrl, errorMsg, errorHandler) {
        var reg = /^[+-]?\d+(\.\d+)?$/;
        errorMsg = errorMsg || Validator.defErrorMsg.notNumeric;
        if (!errorHandler) errorHandler = null;
        return Validator.checkByReg(inputCtrl, reg, errorMsg, errorHandler);
    },

    /**
     * 校验表单数据是否非负数
     * @param inputCtrl 要校验的表单控件
     * @param errorMsg 校验不通过时的提示信息
     * @param errorHandler 校验不通过时的回调函数
     * @returns 校验结果
     */
    checkPositiveNumer: function (inputCtrl, errorMsg, errorHandler) {
        var reg = /^[+]?\d+(\.\d+)?$/;
        errorMsg = errorMsg || Validator.defErrorMsg.notPositive;
        if (!errorHandler) errorHandler = null;
        return Validator.checkByReg(inputCtrl, reg, errorMsg, errorHandler);
    },

    /**
     * 校验表单数据是否整数
     * @param inputCtrl 要校验的表单控件
     * @param errorMsg 校验不通过时的提示信息
     * @param errorHandler 校验不通过时的回调函数
     * @returns 校验结果
     */
    checkInteger: function (inputCtrl, errorMsg, errorHandler) {
        var reg = /^[+-]?\d+$/;
        errorMsg = errorMsg || Validator.defErrorMsg.notInteger;
        if (!errorHandler) errorHandler = null;
        return Validator.checkByReg(inputCtrl, reg, errorMsg, errorHandler);
    },

    /**
     * 校验表单数据是否浮点数
     * @param inputCtrl 要校验的表单控件
     * @param head 整数位最大个数
     * @param foot 小数位最大个数
     * @param errorMsg 校验不通过时的提示信息
     * @param errorHandler 校验不通过时的回调函数
     * @returns 校验结果
     */
    checkFloat: function (inputCtrl, head, foot, errorMsg, errorHandler) {
        if (typeof head != "number" || head <= 0) head = 10;
        if (typeof foot != "number" || foot < 0) foot = 0;
        var ptnStr = "^[+-]?\\d{0," + head + "}";
        if (foot > 0) ptnStr += "(\\.\\d{1," + foot + "})?";
        ptnStr += "$";
        var reg = new RegExp(ptnStr, "g");
        if (!errorMsg) {
            var warning = "请输入一个数值(最大" + head + "位整数";
            if (foot > 0) warning += "与" + foot + "位小数";
            warning += ")！";
            errorMsg = warning;
        }
        if (!errorHandler) errorHandler = null;
        return Validator.checkByReg(inputCtrl, reg, errorMsg, errorHandler);
    }
};