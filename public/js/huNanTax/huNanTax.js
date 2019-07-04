$(function () {
    // 点击税前后税后
    var nodes = document.getElementById("personType").children;
    for (k in nodes) {
        nodes[k].index = k;
        nodes[k].onclick = function (e) {
            for (j in nodes) {
                nodes[j].className = "";
            }
            ;
            if (this.index == 0) {
                $('#preMoney').html("税前薪资");
                $('#LastPreMoney').html("税后薪资");
                $('#taxOrNot').val("0");
                $('#salary').attr("placeholder", "请输入税前薪资");
            } else {
                $('#taxOrNot').val("1")
                $('#LastPreMoney').html("税前薪资");
                $('#preMoney').html("税后薪资");
                $('#salary').attr("placeholder", "请输入税后薪资")

            }
            $('#huNanResult').hide();//计算结果
            e.target.parentNode.classList.add("active");
            var leftDis = this.offsetLeft + this.offsetWidth / 2 - document.getElementsByClassName("under-line")[0].offsetWidth + 7;
            document.getElementsByClassName("under-line")[0].style.left = leftDis + "px";
            document.getElementsByClassName("under-line")[0].classList.add("underTransition");

        };
    }
    // 初始化薪资所得的累进级次
    var DEFAULT_DEDUCT_BASE = "3500";// modified by qiang.li on 2011-09-01
    var SCALES = new Array();
    var i = 0;
    SCALES[i++] = new Scale(1500, 0.03, 0);
    SCALES[i++] = new Scale(4500, 0.1, 105);
    SCALES[i++] = new Scale(9000, 0.2, 555);
    SCALES[i++] = new Scale(35000, 0.25, 1005);
    SCALES[i++] = new Scale(55000, 0.3, 2755);
    SCALES[i++] = new Scale(80000, 0.35, 5505);
    SCALES[i++] = new Scale(Number.MAX_VALUE, 0.45, 13505);
    // 清空计算结果
    var clearResult = function () {
        $(":text[readOnly=true]").val("");
    };
    $("#calculate").click(function () {
        // 校验输入值
        var salary = $("#salary");
        var deductBase = $("#deductBase");
        var taxOrNot = $("#taxOrNot").val();
        var label = (taxOrNot == '0') ? "税前薪资" : "税后薪资";
        if (!Validator.checkReqired(deductBase, "请输入扣除标准！")) return;
        if (!Validator.checkFloat(deductBase, 13, 2, "请正确输入扣除标准！")) return;
        if (!Validator.checkPositiveNumer(deductBase, "扣除标准不能小于零！")) return;
        if (!Validator.checkReqired(salary, "请输入" + label + "！")) return;
        if (!Validator.checkFloat(salary, 13, 2, "请正确输入" + label + "！")) return;
        if (!Validator.checkPositiveNumer(salary, label + "不能小于零！")) return;
        $('#huNanResult').show();//计算结果
        // 计算薪资所得的税费
        var tax;
        if (taxOrNot == '0') {
            tax = new Tax("工资、薪金所得", 2, null, salary.val(), SCALES, deductBase.val());
        } else {
            tax = new Tax("工资、薪金所得", 2, null, null, SCALES, deductBase.val(), salary.val());
        }
        TaxCalculator.calculate(tax);
        $("#taxMoney").val(tax.taxMoney ? tax.taxMoney : "0");
        if (taxOrNot == '0') {
            $("#result").val(tax.afterTax ? tax.afterTax : tax.taxBase);
        } else {
            $("#result").val(tax.taxBase ? tax.taxBase : tax.afterTax);
        }
        if (tax.scale) {
            $("#rate").html(tax.scale.rate ? tax.scale.rate : "0");
            $("#deductNum").html(tax.scale.deductNum ? tax.scale.deductNum : "0");
        } else {
            $("#rate").html("");
            $("#deductNum").html("");
        }
    });
});