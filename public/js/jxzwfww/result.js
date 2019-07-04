var v = new Vue({
    el: "#result",
    data: {
        sbh: sessionStorage.getItem('sbh'),
        user: sessionStorage.getItem('user'),
        company: sessionStorage.getItem('company'),
        materialArrStr: sessionStorage.getItem('materialArrStr'),
        arr: []
    },
    mounted: function(){
        this.arr = this.materialArrStr.split(" ").slice(1)
    },
    methods: {
        render: function (name) {
            window.location.href = "/jxzwfww?page=" + name;
        }
    }
})