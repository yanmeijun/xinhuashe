var v = new Vue({
    data: {
        citySRC: "../../images/infringementPiracy/banner.png"
    },
    created: function () {

    },
    mounted: function () {
        this.citySRC = "../../images/infringementPiracy/banner.png"
    },
    methods: {
        report: function () {
            var url = "/infringementPiracy?page=report&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
            window.location.href = url;
        }
    }
}).$mount('#infringementMax')