var v = new Vue({
    el: "#propertyLease",
    data: {
        citySRC: citySRC || "/images/banner.png",
        result: -1,
        inputNum: "",
        noData: false,
        maskTips: "",
        house: true
    },
    methods: {
        radioSwitch: function (flag) {
            if (flag) {
                this.house = true;
            } else {
                this.house = false;
            }
        },
        calculate: function () {
            this.inputNum = this.$refs.inputNum.value;
            if (!this.inputNum) {
                this.noData = true;
                this.maskTips = "请输入收入金额";
                setTimeout(function () {
                    v.noData = false;
                }, 1000);
                return;
            }
            var tax = this.house ? 0.1 : 0.2;
            var inputNum = Number(this.inputNum);
            var taxIncome = inputNum > 4000 ? inputNum * 0.8 : (inputNum - 800);
            this.result = (taxIncome * tax).toFixed(2) > 0 ? (taxIncome * tax).toFixed(2):0;
        },
        goBack: function () {
            window.location.href = "/personalTax?page=personalTax&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        }
    }
});