/*公共数据*/
var CommonData = {
    randomKey: randomKey,
    userID: userID,
    clientID: clientID,
    cityID: cityID,
    local_x: local_x,
    localFrom: localFrom,
    local_y: local_y

};
/*省及直辖市容器*/
var selectArr = [];
/*城市变量容器*/
var cityDatas = cityDatas_2 = [{"id" :"0" ,"name" :"请选择"},{"pkid":"110101","code":"110101","name":"东城区"},{"pkid":"110102","code":"110102","name":"西城区"},{"pkid":"110105","code":"110105","name":"朝阳区"},{"pkid":"110106","code":"110106","name":"丰台区"},{"pkid":"110107","code":"110107","name":"石景山区"},{"pkid":"110108","code":"110108","name":"海淀区"},{"pkid":"110109","code":"110109","name":"门头沟区"},{"pkid":"110111","code":"110111","name":"房山区"},{"pkid":"110112","code":"110112","name":"通州区"},{"pkid":"110113","code":"110113","name":"顺义区"},{"pkid":"110114","code":"110114","name":"昌平区"},{"pkid":"110115","code":"110115","name":"大兴区"},{"pkid":"110116","code":"110116","name":"怀柔区"},{"pkid":"110117","code":"110117","name":"平谷区"},{"pkid":"110228","code":"110228","name":"密云区"},{"pkid":"110229","code":"110229","name":"延庆区"}].map(function(item){
    return {
        name: item.name,
        id: item.pkid
    }
});

var falg = true,pageNum = totlePage = 0;

$(function(){
    /*默认城市*/
    $("#city_span").html(cityName);
    /*城市选择*/
    $("#city_span,#city_img").on("click",function () {
        $.ajax({
            async:false,
            url: "/lawfirmEnquiries/quueryProvince",
            type: 'post',
            data: JSON.stringify(CommonData),
            contentType: 'application/json'
        }).done(function(res){
            if(res.retCode == "000000"){
                selectArr = res.responseBody.map(function(item) {
                    return {
                        name: item.name,
                        id: item.pkid
                    }
                });
            }else{
                console.log(res);
                maskTip("ajax error!");
            }
            });
        $(".mobileSelect").remove();
        var mobileSelect1 = new MobileSelect({
            trigger:  "#city_span",
            title: "所在城市",
            wheels: [
                {data: selectArr},
                {data:cityDatas}
            ],
            transitionEnd:function(indexArr,data,index){
                   if(index != 1){
                       queryObj = CommonData;
                       queryObj.pkid = data[0].id;
                       $.ajax({
                           async:false,
                           url: "/lawfirmEnquiries/quueryCity",
                           type: 'post',
                           data: JSON.stringify(queryObj),
                           contentType: 'application/json'
                       }).done(function(cityData){
                           cityDatas = cityData.responseBody.map(function(item) {
                               return {
                                   name: item.name,
                                   id: item.pkid
                               }

                           });
                       });
                       cityDatas.unshift({"id" :"0" ,"name" :"请选择"});
                       mobileSelect1.updateWheel(1,cityDatas);

                   }
            },
            callback:function(indexArr, data){
                var querystring = $("#textSearch").val() || "";
                if(data[1].id !="0" && data[1].id){
                    queryLawfirm(querystring,data[1].id);
                }else{
                    queryLawfirm(querystring,data[0].id);

                }
            }
        });
        mobileSelect1.updateWheel(1,cityDatas_2);
        /*追加样式*/
        $(".mobileSelect").addClass("mobileSelect-show");
    });
    $("#searchButton").on("click",function(){
        var querystring = $("#textSearch").val() || "";
        var cityCode = $("#city_span").attr("data_id").split(" ");
        if(cityCode[1]){
            queryLawfirm(querystring,cityCode[1]);
        }else{
            queryLawfirm(querystring,cityCode[0]);
        }

    });
    /*进入页面后，默认加载北京市的数据*/
    queryLawfirm("",11);

});
/**
 * 查询律师事务所
 *
 * @access public
 * @param string    dept_name       律师事务所名称
 * @param int       districtcode    城市代码
 * @param int       pagenum         当前页面，默认为1
 * @param int       pagesize        每页显示条数，默认为5
 */
function queryLawfirm(dept_name,districtcode,pagenum,pagesize){
    $('#dialogMask,#dialog').show();
    /*结果容器*/
    var result = {};
    var cityData = CommonData;
    /*城市名称*/
    cityData.dept_name = dept_name;
    /*城市代码，默认为北京*/
    cityData.districtcode = districtcode;
    /*当前页码*/
    cityData.pagenum = pagenum || "1";
    /*每页显示条数*/
    cityData.pagesize = pagesize || "5";

    $.ajax({
        async:false,
        url: "/lawfirmEnquiries/queryString",
        type: 'post',
        data: JSON.stringify(cityData),
        contentType: 'application/json',
        success:function(res){
            $('#dialogMask,#dialog').hide();
            if(res.retCode =="000000"){
                if(res.responseBody.length > 0){
                    var string = '';
                    for(var index of res.responseBody){
                        /*string+=`<div class="peccancyQuery userInfor onlyStyle">
                                    <h2 class="q-r-tit"><span></span>${index.name}</h2>
                                    <div class="addListBox">
                                        <div class="addressList clearfix">
                                            <img src="/images/lawfirmEnquiries/cityPosi-gray.png" class="cityPosi-gray">
                                            <span>${index.address}</span>
                                        </div>
                                        <div class="addressList bodNo clearfix">
                                            <img src="/images/lawfirmEnquiries/tel.png" class="tel">
                                        <span>${index.phone != "-1" ? index.phone : "暂未收录"}</span>
                                        </div>
                                     </div>
                                   </div>`;*/
                        var phone = index.phone != "-1" ? index.phone : "暂未收录"
                        string+='<div class="peccancyQuery userInfor onlyStyle">' +
                            '<h2 class="q-r-tit"><span></span>'+index.name+'</h2>' +
                            '<div class="addListBox">' +
                            '<div class="addressList clearfix">' +
                            '<img src="/images/lawfirmEnquiries/cityPosi-gray.png" class="cityPosi-gray">' +
                            '<span>'+index.address+'</span>' +
                            '</div>' +
                            '<div class="addressList bodNo clearfix">' +
                            '<img src="/images/lawfirmEnquiries/tel.png" class="tel">' +
                            '<span>'+phone+'</span>' +
                            '</div>' +
                            '</div>' +
                            '</div>'
                    }
                    if(pagenum>1){
                        $("#contents").append(string);
                    }else{
                        $("#contents").html(string);
                    }
                    $("#contents").show();
                    $("#noDataBox").hide();
                    /*最后一个div元素追加id，方便后面拖动时查询数据*/
                    $("#contents .onlyStyle:last-child").attr("id","peccancyQueryDivTouch");

                }else{
                    if(pagenum>1){
                        maskTip("没有数据了");
                        return false
                    }
                    $("#contents").hide();
                    $("#noDataBox").show();
                }
            }else{
                console.log(res);
                maskTip("数据请求错误");
            }
        },
        error:function(e){
            $('#dialogMask,#dialog').hide();
            maskTip("ajax_error");
        }
    });
}
/*向上滑动*/
$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(window).height();
    var searchText = $('#textSearch').val();//律师事务所名称
    var districtcode = "";
    if (scrollTop + windowHeight >= scrollHeight - 10) {
        pageNum+=1;
        if (searchText.indexOf(" ") != -1) {
            //去除字符算中的空格
            searchText = searchText.replace(/\s/g, "");
        }
        /*查询名称*/
        var dept_name = searchText || "";
        /*地区id*/
        var area = $("#city_span").attr("data_id").split(" ");
        if(area[1]){
            districtcode =area[1];
        }else{
            districtcode = area[0];
        }
        queryLawfirm(dept_name,districtcode,pageNum);
    }
});