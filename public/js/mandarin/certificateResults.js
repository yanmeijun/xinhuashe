var certificate = localStorage.getItem("certificate");
var v = new Vue({
    el: "#maxapp",
    data: {
        certList: [],//
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

        },
        back: function () {
            window.location.href = "/mandarin?page=certificateSearch&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                + "&cityName=" + cityName + "&citySRC=" + citySRC + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        },
        updownn: function () {
            this.updown = this.updown == false ? this.updown = true : this.updown = false;
            this.Exhibition = this.Exhibition == "" ? this.Exhibition = true : this.Exhibition = "";
        }
    }
})