new Vue({
    data: {
    },
    mounted: function () {
    },
    methods: {
        next: function () {
            var url = "/pointsSettled?page=contactDetails&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
            window.location.href = url;
        },
        second: function () {
            var url = "/pointsSettled?page=timeNode&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
            window.location.href = url;
        },
        nextPage: function () {
            localStorage.removeItem("LawTota");
            localStorage.removeItem("payment");
            localStorage.removeItem("selects");
            localStorage.removeItem("unitDormitory");
            localStorage.removeItem("selecteds");
            localStorage.removeItem("selectedings");
            localStorage.removeItem("haveProperty");
            localStorage.removeItem("legalLease");
            localStorage.removeItem("read");
            localStorage.removeItem("LawTota");
            localStorage.removeItem("educationSum");
            localStorage.removeItem("falgsEnter");
            localStorage.removeItem("falgsTaxes");
            localStorage.removeItem("payDate");
            localStorage.removeItem("ageTotalSum");
            localStorage.removeItem("honorTotal");
            localStorage.removeItem("LawTota");
            localStorage.removeItem("selecte");
            localStorage.removeItem("selected");
            localStorage.removeItem("resiTotalSum");
            localStorage.removeItem("falgs");
        }
    }
}).$mount("#point")