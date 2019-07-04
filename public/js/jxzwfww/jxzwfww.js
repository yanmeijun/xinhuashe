var v = new Vue({
    el: "#jxzwfww",
    data: {
        masktime: '',
        basicInfo: false,
        permission: false,
        action: false,
        steps: false,
        sets: false,
        stepPic: false,
        requires: false,
        files: false,
        rights: false,
        duty: false,
        ask: false,
        watch: false,
        result: false,
        question: false,
        seeStepPic: false,
        seeFiles: false,
        seeFiles2: false,
        seeFiles3: false,
        seeFiles4: false,
        seeFiles5: false,
        seeFiles6: false,
        seeFiles7: false,
        seeFiles8: false,
        seeResultPic1: false,
        seeResultPic2: false,
    },
    methods: {
        showSwitch: function(key){
            v[key] = !v[key];
            var arr = ["seeStepPic",'seeResultPic1','seeResultPic2',"seeFiles",'seeFiles2',"seeFiles3","seeFiles4","seeFiles5","seeFiles6","seeFiles7","seeFiles8"];
            if(arr.indexOf(key)!=-1){
                if(v[key]){
                    document.getElementById('jxzwfww').style.position = "fixed";
                }else{
                    document.getElementById('jxzwfww').style.position = "static";
                }
            }
        },
        render: function () {
            window.location.href = "/jxzwfww?page=login";
        },
    }
})