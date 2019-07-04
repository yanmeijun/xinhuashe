var v = new Vue({
    el: "#max",
    data: {
        cityID: cityID,
        cityName: '',
        shengData: []

    },
    mounted: function () {
        this.fnSize();
        window.addEventListener('resize', this.fnSize, false);
        this.shengData = regionCode.regionEntitys;
        //判断城市是省级还是市级，再寻找城市名
        if (this.cityID.substring(2) == '0000') {
            for (var i = 0; i < this.shengData.length; i++) {
                if (this.cityID == this.shengData[i].code) {
                    this.cityName = this.shengData[i].region;
                }
            }
        } else {
            //市级城市名
            var shengCode = this.cityID.substring(0, 2) + '0000';
            for (var i = 0; i < this.shengData.length; i++) {
                if (shengCode == this.shengData[i].code) {
                    var shiData = this.shengData[i].regionEntitys;
                    for (var j = 0; j < shiData.length; j++) {
                        if (this.cityID == shiData[j].code) {
                            this.cityName = shiData[j].region;
                        }
                    }
                }
            }
        }
    },
    methods: {
        goCity: function (code) {
            window.location.href = '/fw/cityList?cityID=' + code + '&page=cityList' + '&oldCity=' + this.cityID;
        },
        goBack: function (code) {
            window.location.href = '/fw/indexPage?cityID=' + code;
        },
        fnSize: function () {
            document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.offsetWidth / 10 + 'px';
        },
        back: function () {
            window.location.href = '/fw/indexPage?cityID=' + this.cityID;
        },
    }
})