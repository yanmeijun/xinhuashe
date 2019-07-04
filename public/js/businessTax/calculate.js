var v = new Vue({
    el: "#calculate",
    data: {
        result: -1,
        inputNum: "",
        noData: false,
        maskTips: ""
    },
    methods: {
        calculate: function (rate) {
            v.inputNum = v.$refs.inputNum.value;
            if (!v.inputNum) {
                v.noData = true;
                v.maskTips = "请输入计算金额";
                setTimeout(function () {
                    v.noData = false;
                }, 1000);
                return;
            }
            v.result = (Number(v.inputNum) * Number(rate)).toFixed(2);
        },
        goBack: function () {
            window.location.href = "/businessTax?page=businessTax&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        }
    }
});