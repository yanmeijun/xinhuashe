var V = new Vue({
    el: "#haiNanInsuranceCalculator",
    data: {
        result: -1,
        inputNum: "",
        masktime: "",
        cityList: [
            {id: "C", name: "海口市"},
            {id: "1", name: "三亚市"},
            {id: "2", name: "文昌市"},
            {id: "3", name: "琼海市"},
            {id: "4", name: "五指山"},
            {id: "5", name: "儋州市"},
            {id: "6", name: "定安县"},
            {id: "7", name: "澄迈县"},
            {id: "8", name: "东方市"},
            {id: "9", name: "万宁市"},
            {id: "a", name: "屯昌县"},
            {id: "b", name: "临高县"},
            {id: "c", name: "白沙黎族自治县"},
            {id: "d", name: "保亭黎族苗族自治县"},
            {id: "e", name: "昌江黎族自治县"},
            {id: "f", name: "乐东黎族自治县"},
            {id: "g", name: "陵水黎族自治县"},
            {id: "h", name: "琼中黎族苗族自治县"},
            {id: "i", name: "洋浦经济开发区"},
            {id: "j", name: "农垦系统"},
        ],
        percentList: [
            {id: ".005", name: "0.2%"},
            {id: ".005", name: "0.3%"},
            {id: ".005", name: "0.4%"},
            {id: ".005", name: "0.5%"},
            {id: ".005", name: "0.7%"},
            {id: ".005", name: "0.8%"},
            {id: ".005", name: "0.9%"},
            {id: ".010", name: "1.0%"},
            {id: ".012", name: "1.2%"},
            {id: ".015", name: "1.5%"},
        ],
        percentResult: "0.2%",
        ylj: "",
        sbj: "",
        ybj: "",
        ylj1: "",
        sbj1: "",
        ybj1: "",
        gsj: "",
        syj: "",
    },
    methods: {
        citySelect: function () {
            if (document.getElementsByClassName('mobileSelect')[0]) {
                document.getElementsByClassName('mobileSelect')[0].remove();
            }
            var mobileSelect1 = new MobileSelect({
                trigger: '#city',
                title: '选择状态',
                wheels: [
                    {data: V.cityList}
                ],
                callback: function () {
					document.getElementById("city").style.color="#474747";
                }
            })
            document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect-show");
        },
        percentSelect: function () {
            if (document.getElementsByClassName('mobileSelect')[0]) {
                document.getElementsByClassName('mobileSelect')[0].remove();
            }
            var mobileSelect1 = new MobileSelect({
                trigger: '#percent',
                title: '选择状态',
                wheels: [
                    {data: V.percentList}
                ],
                callback: function () {
                	document.getElementById("percent").style.color="#474747";
                    V.percentResult = document.getElementById("percent").textContent;
                }
            })
            document.getElementsByClassName("mobileSelect")[0].classList.add("mobileSelect-show");
        },
        calculate: function (name) {
            if (!V.inputNum) {
                V.masktime = "请输入社保基数";
                setTimeout(function () {
                    V.masktime = '';
                }, 1000);
                return;
            }
            // this.result = (Number(this.inputNum)*0.2).toFixed(2);
            //==>>个人比例
            V.ylj = (Number(this.inputNum) * .08).toFixed(2);//养老
            V.sbj = (Number(this.inputNum) * .005).toFixed(2);//失业
            V.ybj = (Number(this.inputNum) * .02).toFixed(2);//医疗
            //==<<<个人比例
            //==>>公司比例
            V.ylj1 = (Number(this.inputNum) * .20).toFixed(2);//养老
            V.sbj1 = (Number(this.inputNum) * .01).toFixed(2);//失业
            V.ybj1 = (Number(this.inputNum) * .08).toFixed(2);//医疗
            V.gsj = (Number(this.inputNum) * Number(document.getElementById("percent").getAttribute("data_id"))).toFixed(2);
            V.syj = (Number(this.inputNum) * .005).toFixed(2);//生育
            //==<<<公司比例
        }
    }
});