
$(function(){
	//点击input输入框，父元素边框颜色变化
	var publicListInput = $('.publicListText input');
	for(var i = 0;i < publicListInput.length; i++){
	    $(publicListInput[i]).bind("click",{'publicListText':i},function ChangContent(e){
	        var num = e.data.publicListText;
	        //判断父元素的边框颜色
	        if($('.publicListText').css("border","1px solid #d5d5d5")){
	        	$(publicListInput[num]).parent('.publicListText').css("border","1px solid #068de7");
	        }else{
	        	$(publicListInput[num]).parent('.publicListText').css("border","1px solid #d5d5d5");
	        }
	        //光标失去焦点
	        $(publicListInput[num]).blur(function(){
		        $(publicListInput[num]).parent('.publicListText').css("border","1px solid #d5d5d5");
			});
			//radio单选不需要边框
			if($('div').hasClass('pubListTextSex')){
				$('.publicListText.pubListTextSex').css("border","none");
			}
			//网络违法多类型选择
			if($('div').hasClass('reportSelect1')){
				$('.publicListText.reportSelect1').css("borderBottom","none");
			}
			//网络违法多类型选择
			if($('div').hasClass('reportSelect2')){
				$('.publicListText.reportSelect2').css("borderTop","none");
			}
	    });
	}
	var searchBoxInput = $('.searchBox .textSearch');
	for(var i = 0;i < searchBoxInput.length; i++){
		$(searchBoxInput[i]).bind("click",{'searchBox':i},function ChangContent(e){
	        var num = e.data.searchBox;
	        //判断父元素的边框颜色
	        if($('.searchBox').css("border","1px solid #d2d2d2")){
	        	$(searchBoxInput[num]).parent('.searchBox').css("border","1px solid #068de7");
	        }else{
	        	$(searchBoxInput[num]).parent('.searchBox').css("border","1px solid #d2d2d2");
	        }
	        //光标失去焦点
	        $(searchBoxInput[num]).blur(function(){
		        $(searchBoxInput[num]).parent('.searchBox').css("border","1px solid #d2d2d2");
			});
		 });
	}
})
