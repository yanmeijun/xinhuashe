var hosResult = JSON.parse(localStorage.getItem("hosResults"));
var v = new Vue({
    data: {
        list: [],
        updown: "false",
        Exhibition: "true",
        srcImg: "/images/icon-downMenu.png"
    },
    mounted: function () {
        this.list = hosResult;
        var arr = document.getElementsByClassName("Exhibition");
    },
    methods: {
        back: function () {
            localStorage.removeItem("hosResults");
            var url = "/nationalMedical?page=nationalMedical&randomKey=" + randomKey + "&userID=" + userID.trim() + "&clientID=" + clientID.trim() + "&cityID=" + cityID.trim() + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
            window.location.href = url;
        },
        updownn: function (ind) {
            //return this.Exhibition=this.Exhibition=="" ? this.Exhibition=true :  this.Exhibition="";
            var arr = document.getElementsByClassName("Exhibition");
            var updowm = document.getElementsByClassName("updowm");
            for (k in arr.length) {
                arr[k].style.display = "block";
            }
            ;
            if (arr[ind].classList.contains('test') == true) {
                arr[ind].style.display = "none";
                updowm[ind].setAttribute("src", "/images/credit/icon-upMenu.png");
                //updowm[ind].setAttribute("src","/images/icon-downMenu.png");
                arr[ind].classList.remove("test");
            } else {
                //updowm[ind].setAttribute("src","/images/credit/icon-upMenu.png");
                updowm[ind].setAttribute("src", "/images/icon-downMenu.png");
                arr[ind].style.display = "block";
                arr[ind].classList.add("test");
            }


        }
    }
}).$mount("#maxApp");