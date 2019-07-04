var BgPayment = localStorage.getItem("payment");
var v = new Vue({
    data: {
        select: false,
        selected: false,
        selecteding: false,
        showTip: false,
        masktime: "",
        maskShow: false,
        haveProperty: "",//自有产权
        legalLease: "",//合法租赁
        unitDormitory: "",//单位宿舍
        isReadOnly: true,
        isRead: true,
        isReadOn: true

    },
    mounted: function () {
        this.haveProperty = "";
        this.legalLease = "";
        this.unitDormitory = "";
        this.selecteding = false;
        if (localStorage.getItem("selects")) {
            this.select = localStorage.getItem("selects");
        } else {
            this.select = false;
        }
        ;
        if (localStorage.getItem("selecteds")) {
            this.selected = localStorage.getItem("selecteds");
        } else {
            this.selected = false;
        }
        ;
        if (localStorage.getItem("selectedings")) {
            this.selecteding = localStorage.getItem("selectedings");
        }
        if (localStorage.getItem("haveProperty")) {
            this.haveProperty = localStorage.getItem("haveProperty");
        }
        ;
        if (localStorage.getItem("legalLease")) {
            this.legalLease = localStorage.getItem("legalLease");
        }
        ;
        if (localStorage.getItem("unitDormitory")) {
            this.unitDormitory = localStorage.getItem("unitDormitory");
        }
        ;

    },
    methods: {
        back: function () {
            var url = "/pointsSettled?page=socialSecurityAge&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
            window.location.href = url;
        },
        selects: function () {
            this.select = this.select == false ? this.select = true : this.select = false;
            this.isReadOnly = this.isReadOnly == true ? this.isReadOnly = false : this.isReadOnly = true;
            if (this.select) {
                localStorage.setItem("selects", this.select);
            } else {
                localStorage.removeItem("selects");
            }

        },
        selecteds: function () {
            this.selected = this.selected == false ? this.selected = true : this.selected = false;
            this.isRead = this.isRead == true ? this.isRead = false : this.isRead = true;
            if (this.selected) {
                localStorage.setItem("selecteds", this.selected);
            } else {
                localStorage.removeItem("selecteds");
            }

        },
        selectedings: function () {
            this.selecteding = this.selecteding == false ? this.selecteding = true : this.selecteding = false;
            this.isReadOn = this.isReadOn == true ? this.isReadOn = false : this.isReadOn = true;
            if (this.selecteding) {
                localStorage.setItem("selectedings", this.selecteding);
            } else {
                localStorage.removeItem("selectedings");
            }
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
        search: function () {
            var pay;
            this.maskShow = false;
            var r = /^\+?[1-9][0-9]*$/;//正整数
            if (!this.select && !this.selected && !this.selecteding) {
                this.maskFn("请至少选择一项");
                return;
            }
            ;
            if (this.select) {
                if (!this.haveProperty) {
                    this.maskFn("请填入选择项中月数");
                    return;
                } else if (!r.test(this.haveProperty)) {
                    this.maskShow = false;
                    this.maskFn("请输入正整数");
                    return;
                }
                ;
                if (Number(this.haveProperty) > Number(BgPayment)) {//第二个值 大于第一个 按照第一个值算
                    pay = (BgPayment / 12 * 1).toFixed(2);
                } else {
                    pay = (this.haveProperty / 12 * 1).toFixed(2);
                }
                ;
                localStorage.setItem("haveProperty", this.haveProperty);
            } else {
                localStorage.removeItem("haveProperty");
            }
            ;
            if (this.selected) {
                if (!this.legalLease) {
                    this.maskFn("请填入选择项中月数");
                    return;
                } else if (!r.test(this.legalLease)) {
                    this.maskShow = false;
                    this.maskFn("请输入正整数");
                    return;
                }
                ;
                if (Number(this.legalLease) > Number(BgPayment)) {
                    pay = (BgPayment / 12 * 0.5).toFixed(2);
                } else {
                    pay = (this.legalLease / 12 * 0.5).toFixed(2);
                }
                ;
                localStorage.setItem("legalLease", this.legalLease);
            } else {
                localStorage.removeItem("legalLease");
            }
            ;
            if (this.selecteding) {
                if (!this.unitDormitory) {
                    this.maskFn("请填入选择项中月数");
                    return;
                } else if (!r.test(this.unitDormitory)) {
                    this.maskShow = false;
                    this.maskFn("请输入正整数");
                    return;
                }
                ;
                if (Number(this.unitDormitory) > Number(BgPayment)) {
                    pay = Number(BgPayment / 12 * 0.5).toFixed(2);
                } else {
                    pay = Number(Number(this.unitDormitory) / 12 * 0.5).toFixed(2);
                }
                ;
                localStorage.setItem("unitDormitory", this.unitDormitory);
            } else {
                localStorage.removeItem("unitDormitory");
            }
            ;
            if ((this.select && this.selected)) {//第二个值是 相加小于第一个值的话，就是各自算各自的，在相加之和为第2项的结果
                var haveSum = Number(this.haveProperty) + Number(this.legalLease);//第二个值
                if (Number(BgPayment) > haveSum) {
                    pay = Number((this.haveProperty / 12 * 1).toFixed(2)) + Number((this.legalLease / 12 * 0.5).toFixed(2));
                } else {
                    pay = Number(Number((this.haveProperty / 12 * 1)) + Number(((Number(BgPayment) - Number(this.haveProperty)) / 12 * 0.5))).toFixed(2);
                }
            }
            ;

            console.log(pay)
            if (this.selected && this.selecteding) {
                var haveSum = Number(this.legalLease) + Number(this.unitDormitory);//第二个值
                console.log(haveSum)
                if (Number(BgPayment) >= haveSum) {
                    pay = Number(Number((this.legalLease / 12 * 0.5)) + Number((this.unitDormitory / 12 * 0.5))).toFixed(2);
                } else {
                    pay = Number(Number((this.legalLease / 12 * 0.5)) + Number(((Number(BgPayment) - Number(this.legalLease)) / 12 * 0.5))).toFixed(2);
                }
                ;
            }
            ;

            if (this.select && this.selecteding) {
                var haveSum = Number(this.haveProperty) + Number(this.unitDormitory);//第二个值
                if (Number(BgPayment) >= haveSum) {
                    pay = Number(Number((this.haveProperty / 12 * 1)) + Number((this.unitDormitory / 12 * 0.5))).toFixed(2);
                } else {
                    pay = Number(Number((this.haveProperty / 12 * 1)) + Number(((Number(BgPayment) - Number(this.haveProperty)) / 12 * 0.5))).toFixed(2);
                }
                ;
            }
            ;

            if (this.select && this.selected && this.selecteding) {
                var haveSum = Number(this.haveProperty) + Number(this.legalLease);//第二个值
                if (Number(BgPayment) > haveSum) {
                    pay = Number((this.haveProperty / 12 * 1).toFixed(2)) + Number((this.legalLease / 12 * 0.5).toFixed(2));
                } else {
                    pay = Number(Number((this.haveProperty / 12 * 1)) + Number(((Number(BgPayment) - Number(this.haveProperty)) / 12 * 0.5))).toFixed(2);
                }
            }

            console.log("第3个得分", pay);
            localStorage.setItem("payLega", pay);
            /*
             *第二个得分pay
             */
            var url = "/pointsSettled?page=educationBG&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
            window.location.href = url;
        }

    },

}).$mount('#legalResudebce')