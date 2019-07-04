var result = localStorage.getItem("Results");
var v = new Vue({
    el: "#app",
    data: {
        cerResult: [],
        cerbscj: [],
        cermscj: [],
        kshgzm: [],
        bscjbzxx: "",//笔试测试部分提示
        mscjbzxx: "",
        citySRC: citySRC || "/images/banner.png"
    },
    mounted: function () {
        this.pushdate();
        this.cerResult.push(JSON.parse(result))
    },
    methods: {
        pushdate: function () {
            var data = JSON.parse(result);
            this.cerbscj = data.bscj;
            this.cermscj = data.mscj;//面试成绩
            this.kshgzm = data.kshgzm;//考试合格成绩
            this.bscjbzxx = data.bscjbzxx;//笔试测试部分提示
            this.mscjbzxx = data.mscjbzxx;//面试部分提示
        },
        cerPage: function (ind) {
            localStorage.setItem("bscj", JSON.stringify(this.cerbscj[ind]));
            localStorage.setItem("bscjbzxx", this.bscjbzxx);
            localStorage.setItem("falg", "title");
            window.location.href = "/teacherQualification?page=writtenTestScore&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                + "&cityName=" + cityName + "&citySRC=" + citySRC + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        },
        mscPage: function (ind) {
            localStorage.setItem("falgs", "title");
            localStorage.setItem("mscj", JSON.stringify(this.cermscj[ind]));
            localStorage.setItem("mscjbzxx", this.mscjbzxx);
            window.location.href = "/teacherQualification?page=writtenTestScore&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                + "&cityName=" + cityName + "&citySRC=" + citySRC + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        },
        back: function () {
            window.location.href = "/teacherQualification?page=examResultInquiry&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                + "&cityName=" + cityName + "&citySRC=" + citySRC + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        }
    }
})