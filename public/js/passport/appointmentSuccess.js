var V = new Vue({
    el: '#appointmentSuccess',
    data: {
        citySRC: citySRC || "/images/banner.png",
        masktime: '',
        name: '',
        yymm: '',
        time: '',
        SLDWMC: '',
        SLDWDZ: '',
        provinceName: ''
    },
    mounted: function () {
        this.provinceName = window.localStorage.getItem("provinceName");
        this.name = localStorage.getItem("res_ZWXM")
        this.yymm = localStorage.getItem("YYMM")
        this.SLDWMC = localStorage.getItem("res_SLDWMC")
        this.SLDWDZ = localStorage.getItem("res_SLDWDZ")
        this.time = localStorage.getItem("res_WSYYRQ").substr(0, 4) + "年"
            + localStorage.getItem("res_WSYYRQ").substr(4, 6) + "月"
            + localStorage.getItem("res_WSYYRQ").substr(6, 8) + "日"
            + localStorage.getItem("res_WSYYSJ")
    },
    methods: {
        render: function (pageName) {
            window.location.href = '/passport?&page=' + pageName + '&randomKey=' + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        },
        maskFn: function (mgs) {
            V.masktime = mgs;
            setTimeout(function () {
                V.masktime = "";
            }, 1500);
            return;
        }

    }
});