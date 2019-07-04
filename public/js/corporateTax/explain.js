var v = new Vue({
        el: "#max",
        data: {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,localFrom:localFrom,
            local_y: local_y


        },
        methods: {
            fnSize: function () {
                if (document.documentElement.offsetWidth > 1024) {
                    document.getElementsByTagName('html')[0].style.fontSize = 375 / 10 + 'px';
                    document.getElementsByClassName("max")[0].style.width = "375px";
                    document.getElementsByClassName("max")[0].style.margin = "0 auto";
                    return;
                } else {
                    document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.offsetWidth / 10 + 'px';
                    document.getElementsByClassName("max")[0].style.width = "100%";
                    return;
                }
            },
            back: function () {
                window.location.href = "/corporateTax?page=corporateTax&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
            }
        },
        mounted: function () {
            this.fnSize();
            window.addEventListener('resize', this.fnSize, false);
        }
    }
)
