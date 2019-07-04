var v = new Vue({
        el: "#max",
        data: {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y,
            corporateValue: "",
            masktime: "",
            calcResult: '',
            egFlag: false

        },
        methods: {
            fnSize: function () {
                if (document.documentElement.offsetWidth > 1024) {
                    document.getElementsByTagName('html')[0].style.fontSize = 375 / 10 + 'px';
                    document.getElementsByClassName("max")[0].style.width = "375px";
                    document.getElementsByClassName("max")[0].style.margin = "0 auto";
                    document.getElementsByClassName("data-sources")[0].style.width = "375px";
                    return;
                } else {
                    document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.offsetWidth / 10 + 'px';
                    document.getElementsByClassName("max")[0].style.width = "100%";
                    document.getElementsByClassName("data-sources")[0].style.width = "100%";
                    return;
                }
            },
            maskFn: function (mgs) {
                v.masktime = mgs;
                setTimeout(function () {
                    v.masktime = "";
                }, 1500);
                return;
            },
            calc: function () {
                if (v.corporateValue.trim() === "") {
                    v.maskFn("请输入应纳税所得额");
                    v.calcResult = '';
                    return;
                }
                if (v.corporateValue) {
                    v.calcResult = (parseFloat(v.corporateValue.trim()) * 0.25).toFixed(2);
                }
            },
            checkEg: function (flag) {
                v.egFlag = flag;
            },
            jump: function () {
                window.location.href = "/corporateTax?page=explain&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
            }
        },
        mounted: function () {
            this.fnSize();
            window.addEventListener('resize', this.fnSize, false);
        }
    }
)
