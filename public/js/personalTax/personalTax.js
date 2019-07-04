var v = new Vue({
    el: "#personalTax",
    data: {
        citySRC: citySRC || "/images/banner.png"
    },
    methods: {
        renderTo: function (renderName) {
            window.location.href = "/personalTax?page=" + renderName + "&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        }
    }
});