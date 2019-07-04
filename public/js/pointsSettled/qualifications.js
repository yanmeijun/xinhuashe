var v = new Vue({
    el: "#qualificat",
    data: {
        selected: false,
        selecte: false
    },
    mounted: function () {
        if (localStorage.getItem("selecte")) {
            this.selecte = localStorage.getItem("selecte");
        } else {
            this.selecte = false;
        }

        if (localStorage.getItem("selected")) {
            this.selected = localStorage.getItem("selected");
        } else {
            this.selected = false;
        }

    },
    methods: {
        back: function (ele) {
            document.getElementById(ele).submit();
        },
        backs: function () {
            this.selected = this.selected == false ? this.selected = true : this.selected = false;
            localStorage.setItem("selected", this.selected);
            this.selecte = false;
            localStorage.removeItem("selecte");
            var url = "/pointsSettled?page=doesNotMeet&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
            window.location.href = url;
        },
        next: function () {
            this.selected = false;
            localStorage.removeItem("selected")
            this.selecte = this.selecte == false ? this.selecte = true : this.selecte = false;
            localStorage.setItem("selecte", this.selecte);
            var url = "/pointsSettled?page=socialSecurityAge&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
            window.location.href = url;
        }
    }
})