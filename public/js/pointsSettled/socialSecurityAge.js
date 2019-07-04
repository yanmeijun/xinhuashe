var v = new Vue({
    el: "#social",
    data: {
        showTip: false,
        masktime: "",
        number: "",
        maskShow: false,
        tipRule: false
    },
    mounted: function () {
        this.showTip = false;
        this.number = "";
        if (localStorage.getItem("payment")) {
            this.number = localStorage.getItem("payment");
        } else {
            this.number = ""
        }

    },
    methods: {
        back: function () {
            var url = "/pointsSettled?page=qualifications&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
            window.location.href = url;
        },
        /*
         *输入不正确的查询语句提示语
         */
        maskFn: function (mgs) {
            this.masktime = mgs;
            setTimeout(function () {
                v.masktime = "";
            }, 1500);
            return;

        },
        focus: function () {
            this.tipRule = false;
            if (this.number == 0) {
                this.tipRule = false;
                return;
            }
            if (this.number < 6) {
                this.tipRule = true;
                return;
            }
        },
        sure: function () {
            this.maskShow = false;
            this.tipRule = false;
            var sum;
            var r = /^\+?[1-9][0-9]*$/;//正整数
            if (!this.number) {
                this.maskFn("请填写“在京连续缴纳社会保险年限累计月数”");
                this.maskShow = true;
                return;
            } else if (!r.test(this.number)) {
                this.maskShow = false;
                this.maskFn("请输入正整数");
                return;
            }
            if (this.number < 6) {
                sum = 0;//合法稳定就业积分
            } else {
                sum = this.number;//合法稳定就业积分
            }
            localStorage.setItem("totalNum", sum);//
            localStorage.getItem("educationSum");//取得学历(学位)期间在京连续缴纳社会保险年限（累计月数）;
            localStorage.setItem("payment", this.number);//在京连续缴纳社会保险年限（累计月数）

            var url = "/pointsSettled?page=legalResidence&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
            window.location.href = url;
        }

    }
})