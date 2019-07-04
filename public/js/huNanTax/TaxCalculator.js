// 数字转换
// param: num 要转换的字符串或其它类型变量
function toTaxNumber(num) {
    if (num != null) {
        num = Number(num);
        if (!isNaN(num) && num >= 0) return num;
        return 0;
    }
    return null;
}
// 累进级次
// param: step 累进级距
// param: rate 税率
// param: deductNum 速算扣除数
// return: 累进级次对象
function Scale(step, rate, deductNum) {
    if (step != null) {
        this.step = toTaxNumber(step);
    } else this.step = null;
    if (rate != null) {
        this.rate = toTaxNumber(rate);
    } else this.rate = null;
    if (deductNum != null) {
        this.deductNum = toTaxNumber(deductNum);
    } else this.deductNum = null;
    return this;
}
// 税种税目
// param: name 税种税目名称
// param: type 征收率类型
// param: rate 税率
// param: base 计税金额
// param: scales 累进级次数组
// param: deductBase 扣除标准
// param: afterTax 税后所得
// param: precision 税额保留小数位数
// return: 税种税目对象
function Tax(name, type, rate, base, scales, deductBase, afterTax, precision) {
    this.name = name || "税种税目1";
    this.type = type || 1;
    this.scales = scales;
    if (rate != null) {
        this.rate = toTaxNumber(rate);
    } else this.rate = null;
    if (base != null) {
        this.taxBase = toTaxNumber(base);
    } else this.taxBase = null;
    if (deductBase != null) {
        this.deductBase = toTaxNumber(deductBase);
    } else this.deductBase = 0;
    if (afterTax != null) {
        this.afterTax = toTaxNumber(afterTax);
    } else this.afterTax = null;
    if (precision != null) {
        this.precision = toTaxNumber(precision);
    } else this.precision = null;
    return this;
}
// 税费计算器
var TaxCalculator = TaxCalculator || {
    // 滞纳金计算
    // param: taxMoney 滞纳税额
    // param: startDate 起始日期
    // param: endDate 终止日期
    // return: 滞纳金(四舍五入)
    calculateOverdueFine: function (taxMoney, startDate, endDate) {
        if (taxMoney && startDate && endDate && typeof taxMoney == "number") {
            var midDate = "2001-5-1";
            var rate1 = 0.002, rate2 = 0.0005;
            var day1 = Tools.dateDiff(startDate, midDate);
            var day2 = Tools.dateDiff(midDate, endDate);
            var day3 = Tools.dateDiff(startDate, endDate);
            var fine = 0;
            if (day3 > 0) {
                if (day1 <= 0) {
                    fine = taxMoney * rate2 * day3;
                } else if (day2 <= 0) {
                    fine = taxMoney * rate1 * day3;
                } else {
                    fine = taxMoney * rate1 * day1;
                    fine += taxMoney * rate2 * day2;
                }
            }
            return Tools.round(fine, 2);
        }
        return 0;
    },
    // 税额计算
    // param: base 计税依据
    // param: rate 税率
    // param: deductNum 速算扣除数
    // param: precision 税额保留小数位数
    // return: 应纳税额(四舍五入)
    calculateInScale: function (base, rate, deductNum, precision) {
        if (typeof base == 'number' && typeof rate == 'number') {
            if (base > 0 && rate > 0) {
                var taxMoney = base * rate;
                if (typeof deductNum == 'number' && deductNum > 0) {
                    taxMoney -= deductNum;
                }
                if (precision == null) return taxMoney;
                else return Tools.round(taxMoney, toTaxNumber(precision));
            }
        }
        return 0;
    },
    // 税额计算
    // param: tax 税种税目
    // return: 应纳税额
    calculate: function (tax) {
        if (tax && tax.type) {
            if (typeof tax.precision != 'number') {
                tax.precision = 2;// 默认保留两位小数
            }
            if (tax.type == 1 || tax.type == 4) {//比例税率\定额税率
                if (typeof tax.taxBase == 'number' && typeof tax.rate == 'number') {
                    tax.taxMoney = TaxCalculator.calculateInScale(tax.taxBase, tax.rate, null, tax.precision);
                    return tax.taxMoney;
                }
            } else if (tax.type == 2 || tax.type == 3) {//超额累进税率\超率累进税率
                if (tax.scales && tax.scales instanceof Array) {//累进级次
                    var scale, base;
                    if (typeof tax.taxBase == 'number' && !tax.afterTax) {//正算
                        base = tax.taxBase;
                        if (typeof tax.deductBase == 'number' && tax.deductBase > 0) {
                            base -= tax.deductBase;
                        }
                        if (base <= 0) {
                            scale = null;
                        } else {
                            for (var i = 0; i < tax.scales.length; i++) {//查找对应累进级次
                                scale = tax.scales[i];
                                if (typeof scale.step == 'number' && typeof scale.rate == 'number' && typeof scale.deductNum == 'number') {
                                    if (scale.step > base) {
                                        break;
                                    }
                                }
                            }
                        }
                        tax.scale = scale;
                        if (scale) {//找到了对应累进级次
                            tax.taxMoney = TaxCalculator.calculateInScale(base, scale.rate, scale.deductNum, tax.precision);
                            tax.afterTax = Tools.round(tax.taxBase - tax.taxMoney, 2);
                        } else {
                            tax.taxMoney = 0;
                            tax.afterTax = tax.taxBase;
                        }
                        return tax.taxMoney;
                    } else if (typeof tax.afterTax == 'number' && !tax.taxBase) {//反算
                        if (tax.afterTax > tax.deductBase) {
                            var taxMoney;
                            for (var i = 0; i < tax.scales.length; i++) {//查找对应累进级次
                                scale = tax.scales[i];
                                if (typeof scale.step == 'number' && typeof scale.rate == 'number' && typeof scale.deductNum == 'number') {
                                    taxMoney = TaxCalculator.calculateInScale(scale.step, scale.rate, scale.deductNum, tax.precision);
                                    if ((scale.step + tax.deductBase - taxMoney) > tax.afterTax) {
                                        break;
                                    }
                                }
                            }
                        }
                        tax.scale = scale;
                        if (scale) {//找到了对应累进级次
                            if (typeof tax.deductBase == 'number' && tax.deductBase > 0) {
                                base = (tax.afterTax - tax.deductBase - scale.deductNum) / (1 - scale.rate) + tax.deductBase;
                            } else {
                                base = (tax.afterTax - scale.deductNum) / (1 - scale.rate);
                            }
                            tax.taxBase = Tools.round(base, 2);
                            tax.taxMoney = Tools.round(tax.taxBase - tax.afterTax, tax.precision);
                        } else {
                            tax.taxMoney = 0;
                            tax.taxBase = tax.afterTax;
                        }
                        return tax.taxMoney;
                    }
                }
            }
        }
        return 0;
    }
};