var v = new Vue({
    el: "#max",
    data: {
        shengID: shengID,
        oldCity: oldCity,
        shengName: '',
        cityName: '',
        shiData: [],
        shengData: []

    },
    mounted: function () {
        this.fnSize();
        window.addEventListener('resize', this.fnSize, false);
        this.shengData = regionCode.regionEntitys;
        if (this.shengID.substring(2) == '0000') {
            for (var i = 0; i < this.shengData.length; i++) {
                if (this.shengID == this.shengData[i].code) {
                    this.shengName = this.shengData[i].region;
                }
            }
        }
        //市级城市
        for (var i = 0; i < this.shengData.length; i++) {
            if (shengID == this.shengData[i].code) {
                this.shiData = this.shengData[i].regionEntitys;
                console.log(this.shiData)
            }
        }
    },
    methods: {
        goBack: function (code) {
            window.location.href = '/fw/indexPage?cityID=' + code;
        },
        fnSize: function () {
            document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.offsetWidth / 10 + 'px';
        },
        back: function () {
            window.location.href = '/fw/cityHomePage?cityID=' + this.oldCity + '&page=cityHomePage'
        },
    }
})