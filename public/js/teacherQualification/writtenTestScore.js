var bsc = localStorage.getItem("bscj");//获取笔试数据
var bscjbzxx = localStorage.getItem("bscjbzxx");//获取笔试数据提示
var mscjbzxx = localStorage.getItem("mscjbzxx");//获取面试数据提示
var mscj = localStorage.getItem("mscj");//获取面试数据
var flag = localStorage.getItem("falg");//判断笔试成绩
var flags = localStorage.getItem("falgs");//判断面试成绩
var v = new Vue({
    data: {
        bsc: [],//笔试部分
        bscjbzxx: "",//获取笔试数据提示
        mscjbzxx: "",//获取面试数据提示
        mscj: [],//获取面试数据
        flag: false,//判断笔试成绩
        flags: false,//判断面试成绩
        citySRC: citySRC || "/images/banner.png"
    },
    mounted: function () {
        this.getData();
        this.bscjbzxx = bscjbzxx;
        this.mscjbzxx = mscjbzxx;
        if (flag) {
            this.flag = true;
        }
        if (flags) {
            this.flags = true;
        }
    },
    methods: {
        back: function () {
            localStorage.removeItem('falg');
            localStorage.removeItem('falgs');
            this.flag = false;
            this.flag = false;
            window.location.href = "/teacherQualification?page=certificateResults&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID
                + "&cityName=" + cityName + "&citySRC=" + citySRC + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y;
        },
        getData: function () {
            this.bsc.push(JSON.parse(bsc))
            this.mscj.push(JSON.parse(mscj))
        }
    }
}).$mount("#max");