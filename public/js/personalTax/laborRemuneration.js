var v = new Vue({
    el: "#laborRemuneration",
    data: {
        citySRC: citySRC || "/images/banner.png",
        result: -1,
        inputNum: "",
        noData: false,
        maskTips: "",
        ifShowTab: false
    },
    methods: {
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
            var inputNum = Number(this.inputNum);
            var taxIncome = inputNum > 4000 ? inputNum * 0.8 : (inputNum - 800);
            if(taxIncome <= 0) {
                this.result = 0;
            }else if (taxIncome <= 20000) {
                this.result = (taxIncome * 0.2).toFixed(2);
            } else if (20000 < taxIncome && taxIncome <= 50000) {
                this.result = (taxIncome * 0.3 - 2000).toFixed(2);
            } else if (50000 < taxIncome) {
                this.result = (taxIncome * 0.4 - 7000).toFixed(2);
            }
        },
        showTable: function (flag) {
            if (flag) {
                this.ifShowTab = true;
            } else {
                this.ifShowTab = false;
            }
        },
        goBack: function () {
            window.location.href = "/personalTax?page=personalTax&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        }
    }
});