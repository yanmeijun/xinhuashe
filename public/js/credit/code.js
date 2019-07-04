var v = new Vue({
        el: "#max",
        data: {
            randomKey: randomKey,
            userID: userID,
            clientID: clientID,
            cityID: cityID,
            local_x: local_x ,
            localFrom:localFrom,
            local_y: local_y,
            keyword: "",
            pageNum: 1,
            list: [],
            totalNum: 0,
            searchBarFixed: true,
            isCanScroll: true,
            noResult: false,
            hasResult: false,
            masktime: "",
            totalPage: '',
            dialogMask: false,
            noResultCon: "很抱歉，没有找到你要搜索的数据"
        },
        methods: {
            back: function () {
                window.location.href = "credit?page=credit&randomKey=" + randomKey + "&userID=" + userID + "&clientID=" + clientID + "&cityID=" + cityID + "&local_x=" + local_x + "&localFrom=" + localFrom +  "&local_y=" + local_y
            },
            getData: function () {
                v.dialogMask = true;
                if (v.searchBarFixed) {
                    v.searchBarFixed = false;
                    var data = {
                        randomKey: randomKey,
                        userID: userID,
                        clientID: clientID,
                        cityID: cityID,
                        local_x: local_x ,localFrom:localFrom,
                        local_y: local_y,
                        keyword: this.keyword.trim(),
                        pageNum: this.pageNum,
                        list: []
                    };
                    axios({
                        headers: {"Content-Type": "application/json"},
                        method: 'post',
                        url: '/credit/getCreditLists',
                        data: data,
                        contentType: 'application/json'
                    }).then(function (res) {
                        v.dialogMask = false;
                        v.noResultCon = res.data.responseBody.errorMsg;
                        v.noResult = true;
                        if (res.data.retCode == "000000") {
                            if (res.data.responseBody.results) {
                                v.list = v.list.concat(res.data.responseBody.results);
                                v.noResult = false;
                                v.hasResult = true;
                            } else {
                                v.noResult = true;
                                v.hasResult = false;
                            }
                            v.totalNum = res.data.responseBody.totleNumber || 1;
                            //v.totalPage = Math.ceil(Number(res.data.responseBody.totleNumber) / res.data.responseBody.pageSize);
                        } else {
                            v.noResult = true;
                            v.hasResult = false;

                        }
                        v.searchBarFixed = true;
                        v.isCanScroll = true;
                    }).catch(function (err) {
                        v.searchBarFixed = true;
                        v.isCanScroll = true;
                    })
                }
            },
            maskFn: function (mgs) {
                this.masktime = mgs;
                setTimeout(function () {
                    v.masktime = "";
                }, 1500);
                return;
            },
            search: function () {
                if (this.keyword.trim() == "") {
                    this.maskFn("请输入关键字");
                    return;
                }
                var han = /^[\u4e00-\u9fa5]+$/;
                if (han.test(this.keyword.trim())) {
                    this.maskFn("请输入18查询码数字")
                    return;
                };
                if(this.keyword.trim().length<18 || this.keyword.trim().length>18){
                    this.maskFn("请输入18查询码");
                    return;
                }

                v.pageNum = 1;
                v.list = [];
                v.searchBarFixed = true;
                v.isCanScroll = true;
                v.getData();
            },
            handleScroll: function () {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                var bodyHeight = document.body.clientHeight;
                var clientHeight = document.documentElement.clientHeight;//可视区高度
                if (scrollTop + clientHeight + 20 > bodyHeight) {
                    if (v.isCanScroll) {
                        v.isCanScroll = false;
                        v.pageNum++;
                        if (v.pageNum > v.totalPage) {
                            // this.maskFn("已全部加载完毕");
                            return;
                        }
                        v.getData();
                    }
                }
            },
        },
        watch: {
            dialogMask(curVal, oldVal) {
                setTimeout(function () {
                    if (v.hasResult) {
                        return;
                    } else if (v.noResultCon == "很抱歉，没有找到你要搜索的数据" && v.noResult) {
                        return;
                    } else {
                        v.dialogMask = false;
                        v.noResult = true;
                        v.hasResult = false;
                        v.noResultCon = v.noResultCon;
                    }
                    /*                    if(curVal){
                     v.dialogMask=false;
                     v.noResult=true;
                     v.hasResult=false;
                     v.noResultCon = "网络异常，请稍后查询";
                     }*/
                }, 5000);
                /* console.log(curVal,oldVal);*/
            }
        },
        mounted: function () {
            this.dialogMask = false;
            window.addEventListener('resize', this.fnSize, false);
            window.addEventListener('scroll', this.handleScroll);

        }
    }
)

//回到顶部
// var oBackTop=document.getElementById('backtop');
// function backTop(){
//     var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
//     if (scrollT >0) {
//         oBackTop.style.display='block';
//     }else{
//         oBackTop.style.display='none';
//     }
// }
// backTop();
// window.onscroll=function() {
//     backTop();
// }
// //点击返回顶部按钮
// oBackTop.onclick=function(){
//     document.body.scrollTop=0;
//     document.documentElement.scrollTop=0;
// }