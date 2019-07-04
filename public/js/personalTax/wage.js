var v = new Vue({
    el: "#wage",
    data: {
        citySRC: citySRC || "/images/banner.png",
        result: -1,
        inputNum: "",
        noData: false,
        maskTips: "",
        domestic: true,
        ifShowTab: false
    },
    methods: {
        radioSwitch: function (flag) {
            if (flag) {
                this.domestic = true;
            } else {
                this.domestic = false;
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
            var minusData = this.domestic ? 3500 : 4800;
            var inputNum = Number(this.inputNum);
            var taxIncome = inputNum - minusData;
            if(taxIncome <= 0) {
                this.result = 0;
            }else if (taxIncome <= 1500) {
                this.result = (taxIncome * 0.03).toFixed(2);
            } else if (1500 < taxIncome && taxIncome <= 4500) {
                this.result = (taxIncome * 0.1 - 105).toFixed(2);
            } else if (4500 < taxIncome && taxIncome <= 9000) {
                this.result = (taxIncome * 0.2 - 555).toFixed(2);
            } else if (9000 < taxIncome && taxIncome <= 35000) {
                this.result = (taxIncome * 0.25 - 1005).toFixed(2);
            } else if (35000 < taxIncome && taxIncome <= 55000) {
                this.result = (taxIncome * 0.3 - 2755).toFixed(2);
            } else if (55000 < taxIncome && taxIncome <= 80000) {
                this.result = (taxIncome * 0.35 - 5505).toFixed(2);
            } else if (80000 < taxIncome) {
                this.result = (taxIncome * 0.45 - 13505).toFixed(2);
            }
        },
        showTable: function (flag) {
            if (flag) {
                this.ifShowTab = true;
                document.getElementById("wage").style.position  = "fixed";
            } else {
                this.ifShowTab = false;
                document.getElementById("wage").style.position  = "static";
            }
        },
        goBack: function () {
            window.location.href = "/personalTax?page=personalTax&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        }
    }
});