var v = new Vue({
        el: "#max",
        data: {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,
            localFrom:localFrom,
            local_y: local_y,
            tabFlag: 1,
            propertyValue: "",
            masktime: "",
            calcResult: '',
            egFlag: false

        },
        methods: {
            maskFn: function (mgs) {
                this.masktime = mgs;
                setTimeout(function () {
                    v.masktime = "";
                }, 1500);
                return;
            },
            tab: function (flag) {
                this.tabFlag = flag;
            },
            calc: function () {
                if (this.propertyValue.trim() === "") {
                    this.maskFn("请输入房产原值或税务机关估值");
                    this.calcResult = '';
                    return;
                }
                if (this.tabFlag == 1) {
                    this.calcResult = (parseFloat(this.propertyValue.trim()) * 7 * 12 / 10000).toFixed(2);
                } else if (this.tabFlag == 0) {
                    this.calcResult = (parseFloat(this.propertyValue.trim()) * 12 / 1000).toFixed(2);
                }
            },
            checkEg: function (flag) {
                this.egFlag = flag;
            },
            jump: function () {
                window.location.href = "/propertyTax?page=explain&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
            }
        },
        mounted: function () {
            if (cityName) {
                this.$refs.cityName.getElementsByTagName('span')[0].innerHTML = cityName;
            } else {
                this.$refs.cityName.getElementsByTagName('span')[0].innerHTML = '';
            }
        }
    }
)
