var v = new Vue({
    el: "#calculate",
    data: {
        citySRC: citySRC || "/images/banner.png",
        result: -1,
        inputNum: "",
        noData: false,
        maskTips: ""
    },
    methods: {
        calculate: function (name) {
            this.inputNum = this.$refs.inputNum.value;
            if (!this.inputNum) {
                this.noData = true;
                this.maskTips = "请输入收入金额";
                setTimeout(function () {
                    v.noData = false;
                }, 1000);
                return;
            }
            this.result = (Number(this.inputNum) * 0.2).toFixed(2);
        },
        goBack: function () {
            window.location.href = "/personalTax?page=personalTax&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        }
    }
});