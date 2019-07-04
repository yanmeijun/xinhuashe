$(function(){
    if(document.getElementsByClassName("view")){
        if(document.documentElement.offsetWidth>1024){
            var Width = Math.ceil(document.documentElement.offsetWidth*(0.45));
            document.getElementsByTagName('html')[0].style.fontSize = Width/10 +'px';
            document.getElementsByClassName("view")[0].style.width=Width+"px";
            document.getElementsByClassName("view")[0].style.overflow = "visible";
            document.getElementsByClassName("view")[0].style.margin ="0 auto";
            document.getElementsByClassName("view")[0].style.background = "#fff";
            document.getElementsByClassName("view")[0].style.height = document.documentElement.clientHeight+"px";
        }else{
            document.getElementsByTagName('html')[0].style.fontSize = document.documentElement.offsetWidth/10 +'px';
            document.getElementsByClassName("view")[0].style.width="100%";
            document.getElementsByClassName("view")[0].style.background = "none";
            document.getElementsByClassName("view")[0].style.height = document.documentElement.clientHeight+"100%";
        }
    }
    $('#all_cityCodeList').hide();
    // callBack=function(){
        stationCommonList();
        var stationNoAll=$('#stationNoAll li');

        stationNoAll.on('click', function() {

            fnTapStation();
            var emptyNull=$('.j-emptyNull');
            if(emptyNull){emptyNull.remove()}
            $('#station_search_key').val('');
            stationNoAll.removeClass('active');
            $(this).addClass('active');

            if($(this).index() == 2){
                stationAllList();
            }
            else if($(this).index() == 1){
                stationHotList();
            }
            else if($(this).index() == 0){
                stationCommonList();
            }
            fnTapStation();
        });

        // 初始化常用车站
        function stationCommonList(){
            ;(function(){
                var _html = '',arr =[];
                var citylist = getfrecitylist();
                if(citylist){
                    arr = citylist.substring(1).split('@');
                }
                if (arr.length > 0) {
                    for(var k in arr){
                        var obj = arr[k].split('|');
                        if(arr[k]=='')continue;
                        _html += '<li class="j-stationData" data-text="'+obj[1]+'" data-code="'+obj[2]+'">'+obj[1]+'</li>';
                    }
                } else {
                    _html += '<div class="empty-box">'
                              +'<div class="empty-pic"><img src="images/empty.png" alt=""></div>'
                              +'<div class="empty-txt">最近还没有查询过车站，快去 <br>车站列表看看吧！</div>'
                            +'</div>';
                }
                $('#all_citybox').html(_html);
                $('#all_cityCodeList').hide();
            })();
        }

        // 初始化热门车站
        function stationHotList(){
            // 热门车站
            ;(function(){
                var _html = '',arr =[];
                arr = favorite_names.substring(1).split('@');
                arr = arr.sort();
                if(arr.length>0){
                    var ch = '';
                    for(var k in arr){
                        var obj = arr[k].split('|');
                        _html += '<li class="j-stationData" data-text="'+obj[1]+'" data-code="'+obj[2]+'">'+obj[1]+'</li>';
                    }
                }else{
                    _html += '<li class="">暂无数据</li>';
                }
                $('#all_cityCodeList').hide();
                $('#all_citybox').html(_html);
            })();
        }

        // 初始化所有车站
        function stationAllList(){
            $('#all_cityCodeList li').removeClass('active');
            $('#all_cityCodeList li').eq(0).addClass('active');
            // 车站列表
            ;(function(){
                var _html = '',arr =[];
                arr = station_names.substring(1).split('@');
                arr = arr.sort();
                if(arr.length>0){
                    var ch = '';
                    for(var k in arr){
                        var obj = arr[k].split('|');
                        if(obj[0].substring(0,1).toUpperCase()!=ch){
                            ch = obj[0].substring(0,1).toUpperCase();
                            _html += '<li class="station-tit" id="anchor_'+ch+'" data-text="'+ch+'">'+ch+'</li>';
                        }
                        _html += '<li class="j-stationData" data-text="'+obj[1]+'" data-code="'+obj[2]+'">'+obj[1]+'</li>';
                    }
                }else{
                    _html += '<li class="">暂无数据</li>';
                }
                $('#all_cityCodeList').show();
                $('#all_citybox').html(_html);
            })();

            ;(function(){
                // 首字母锚点
                var all_cityCodeList=$('#all_cityCodeList li a');

                all_cityCodeList.on('click', function() {
                    $('#all_cityCodeList li').removeClass('active');
                    $(this).parent().addClass('active');
                });
                // 滑动时右侧小导航联动改变
                var all_citybox=$('#all_citybox');
                all_citybox.on('touchmove', function(event) {
                    var arrData=[];
                    var arrLi=$('#all_citybox .station-tit');
                    for(var i=0;i<arrLi.length;i++){
                        arrData.push(arrLi.eq(i).position().top);
                    }
                    for(var i=0;i<arrData.length;i++){
                        if(arrData[i] <= 0 && arrData[i+1] > 0){
                            $('#all_cityCodeList li').removeClass('active');
                            var aTxt=arrLi.eq(i).html();
                            for (var j = 0; j < $('#all_cityCodeList li').length; j++) {
                                if($('#all_cityCodeList li a').eq(j).html() == aTxt){
                                   $('#all_cityCodeList li').eq(j).addClass('active'); 
                                }
                            };
                        }
                    }
                });
            })();
        }
        
        // 搜索车站
        ;(function(){
            var station_search_key=$('#station_search_key');
            station_search_key.on('input', function() {
                var keyword=$(this).val();
                searchWord(keyword);
                fnTapStation();
            });
        })();

        // 搜索车站
        function searchWord(keyword){
            var arr = station_names.substring(1).split('@');
            var str = '';
            for(var k in arr){
                if(arr[k].indexOf(keyword.toLowerCase())>-1){
                    var obj = arr[k].split('|');
                    str = str+'<li class="j-stationData" data-text="'+obj[1]+'" data-code="'+obj[2]+'">'+obj[1]+'</li>';
                }
            }
            var all_cityCodeList=$('#all_cityCodeList');
            if(all_cityCodeList){all_cityCodeList.hide()}
            $('#all_citybox').html(str);
        }

        // 点击选择的车站名字
        fnTapStation();
        function fnTapStation(){
            $('.j-stationData').on('click', function() {
                var herfJump = win.sessionStorage.getItem('stationJump');
                if(herfJump == "queryTicket"){
                    if(win.sessionStorage.getItem('stationType') == "depart"){
                        // 出发地      
                        var text=$(this).attr('data-text');
                        var code=$(this).attr('data-code');
                        win.sessionStorage.setItem('departCode',code);
                        win.sessionStorage.setItem('departName',text);
                    }else{
                        // 目的地
                        var text=$(this).attr('data-text');
                        var code=$(this).attr('data-code');
                        win.sessionStorage.setItem('destinationName',text);
                        win.sessionStorage.setItem('destinationCode',code);
                    }
                    //history.back(-1);
                    window.location.href = "/trainYupiao?randomKey="+randomKey+"&userID="+userID+"&citySRC="+citySRC+
                        "&clientID="+clientID+"&cityID="+cityID+"&local_x="+local_x+"&local_y="+local_y + "&localFrom=" + localFrom;
                }else if(herfJump == "saleTimeQuery"){
                    // 车站起售时间查询
                    var text=$(this).attr('data-text');
                    var code=$(this).attr('data-code');
                    win.sessionStorage.setItem('saleTimeQueryName',text);
                    win.sessionStorage.setItem('saleTimeQueryCode',code);
                    window.location.href = "/trainSellTime?randomKey="+randomKey+"&userID="+userID+"&citySRC="+citySRC+
                        "&clientID="+clientID+"&cityID="+cityID+"&local_x="+local_x+"&local_y="+local_y + "&localFrom=" + localFrom;
                   // history.back(-1);location.reload();
                }
                

                // 最近常用车站名的数据存储
                var freCityList = win.localStorage.getItem('freCityList');
                if(freCityList!=null){
                    freCityList = JSON.parse(freCityList);
                    var flag = 0;
                    for(var k =0; k<freCityList.length;k++){
                        if(freCityList[k].code==code){
                            freCityList[k].num = parseInt(freCityList[k].num)+1;
                            flag=1;
                            win.localStorage.setItem('freCityList',JSON.stringify(freCityList));
                        }
                    }
                    if(flag==0){
                        var temp ={
                            'code':code,
                            'num':1,
                            'text':text
                        };
                        freCityList.push(temp);
                    }
                }else{
                    freCityList = new Array();
                    var temp ={
                        'code':code,
                        'num':1,
                        'text':text
                    };
                    freCityList[0] =temp;
                }
                win.localStorage.setItem('freCityList',JSON.stringify(freCityList));
            });
        }

        //获取城市列表
        function getfrecitylist(){
            var freCityList = win.localStorage.getItem('freCityList');
            var str = '';
            if(freCityList){
                var resultArr = JSON.parse(freCityList);
                if(resultArr.length>0){
                    resultArr = resultArr.sort(sortfunctioncity).slice(0,6);
                    for(var k in resultArr){
                        str = str+'@'+resultArr[k].num+'|'+resultArr[k].text+'|'+resultArr[k].code;
                    }
                }
            }
            return str;
        }

        function sortfunctioncity(x,y){
            return parseInt(y.num)-parseInt(x.num);
        }
    // };
});


