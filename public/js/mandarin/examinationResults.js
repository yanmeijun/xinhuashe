var certificate = localStorage.getItem("certificates");
var v = new Vue({
    el: "#maxapp",
    data: {
        certList: [],//
        kaoshi: "",
        updown: "false",
        Exhibition: "true",
        srcImg: "/images/icon-downMenu.png",
    },
    mounted: function () {
        this.getDate();
    },
    methods: {
        getDate: function () {
            this.certList.push(JSON.parse(certificate));
            this.kaoshi = this.certList[0].num;
        },
        back: function () {
            window.location.href = "/mandarin?page=scoreSearch&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                + "&cityName=" + cityName + "&citySRC=" + citySRC + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        },
        updownn: function () {
            return this.Exhibition = this.Exhibition == "" ? this.Exhibition = true : this.Exhibition = "";
        }
    }
})