new Vue({
    el: "#businessTax",
    data: {
    },
    methods: {
        renderTo: function (renderName) {
            window.location.href = "/businessTax?page=" + renderName + "&randomKey=" + randomKey + "&userID=" + userID +
                "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        }
    }
});