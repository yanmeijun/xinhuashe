webpackJsonp([37],{"+8Qq":function(s,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=i("mtWM"),a=i.n(e),c={data:function(){return{procureID:this.$route.query.procureID,status:this.$route.query.status,serviceInfo:{},cancelFlag:!1,categoryList:{A:"交通",B:"社会保障",C:"教育",D:"医疗卫生",E:"民政",H:"出入境",M:"文化体育",G:"旅游",I:"举报",K:"税务",X:"信用",Y:"法规查询",L:"政务",Z:"其他"},userForList:{app:"app",web:"web端",weChat:"微信端",wap:"wap",other:"其他"},submitSuccess:!1}},computed:{},mounted:function(){this.initData()},methods:{initData:function(){var s=this;this.isSearch=!1,this.loading=!0,a()({headers:{"Content-Type":"application/json"},method:"post",url:"/procure/getServiceInfo",async:!0,data:{procureID:this.procureID},contentType:"application/json"}).then(function(t){if(s.loading=!1,"success"==t.data.msg){s.serviceInfo=t.data.results;var i=new RegExp("。","g");document.getElementById("mzDetail").innerHTML=s.serviceInfo.relief.replace(i,"。<br>"),s.serviceInfo.category=s.serviceInfo.serviceID[0]}else alert("数据加载失败")}).catch(function(s){})},cancelN:function(){this.cancelFlag=!1},cancelApply:function(){this.cancelFlag=!0},closeDialog:function(s){this.tips=s},cancelY:function(){var s=this;this.cancelFlag=!1,a()({headers:{"Content-Type":"application/json"},method:"post",url:"/procure/cancelApply",async:!0,data:{procureID:this.procureID},contentType:"application/json"}).then(function(t){200==t.data.code?(s.submitSuccess=!0,setTimeout(function(){s.submitSuccess=!1,s.$router.push({name:"myApplication"})},1500)):alert("撤销失败")}).catch(function(s){})},renderTo:function(){this.$router.push({name:"myApplication"})}}},l={render:function(){var s=this,t=s.$createElement,i=s._self._c||t;return i("div",[i("div",{staticClass:"content"},[i("div",{staticClass:"serviceMainCon"},[i("div",{staticClass:"welcomeTitle clearfix"},[i("span",[s._v("当前位置：")]),s._v(" "),i("span",[s._v("服务管理")]),s._v(" "),i("span",[s._v(">")]),s._v(" "),i("span",{on:{click:s.renderTo}},[s._v("我的申请")])])]),s._v(" "),i("div",{staticClass:"rm-main-box"},[i("div",{staticClass:"deleteCon detailsCon"},[i("div",{staticClass:"deleteListCon"},[s._m(0),s._v(" "),i("div",{staticClass:"publicList"},[i("label",[s._v("申请单编号：")]),s._v(" "),i("span",[s._v(s._s(s.serviceInfo.procureID))])]),s._v(" "),i("div",{staticClass:"publicList clearfix"},[i("label",[s._v("申请时间：")]),s._v(" "),i("span",[s._v(s._s(s.serviceInfo.applyTime))])]),s._v(" "),i("div",{staticClass:"publicList"},[i("label",[s._v("申请状态：")]),s._v(" "),1==s.serviceInfo.status?i("span",{staticClass:"pendReview"},[i("i",{staticClass:"icon-verPic icon-pendReview"}),s._v("待审核\n          \t\t\t\t")]):s._e(),s._v(" "),4==s.serviceInfo.status?i("span",[i("i",{staticClass:"icon-verPic icon-cancel"}),s._v("已撤销\n          \t\t\t\t")]):s._e(),s._v(" "),2==s.serviceInfo.status?i("span",{staticClass:"certifiedStatus"},[i("i",{staticClass:"icon-verPic icon-passed"}),s._v("已通过\n          \t\t\t\t")]):s._e(),s._v(" "),3==s.serviceInfo.status?i("span",{staticClass:"certifiedStatus not"},[i("i",{staticClass:"icon-verPic icon-notPassed"}),s._v("未通过\n                  ")]):s._e()]),s._v(" "),i("div",{staticClass:"publicList",staticStyle:{display:"none"}},[i("label",[s._v("驳回意见：")]),s._v(" "),i("span",[i("textarea",{staticClass:"realName-textarea"},[s._v(s._s(s.serviceInfo.reviewed))])])])]),s._v(" "),i("div",{staticClass:"deleteListCon"},[s._m(1),s._v(" "),i("div",{staticClass:"publicList clearfix"},[i("label",{staticClass:"fl"},[s._v("服务名称：")]),s._v(" "),i("span",{staticClass:"corBlue"},[s._v(s._s(s.serviceInfo.serviceName))])]),s._v(" "),i("div",{staticClass:"publicList"},[i("label",[s._v("服务分类：")]),s._v(" "),i("span",[s._v(s._s(s.categoryList[s.serviceInfo.category]))])]),s._v(" "),i("div",{staticClass:"publicList"},[i("label",[s._v("价格：")]),s._v(" "),i("span",[s._v(s._s(s.serviceInfo.price<=0?"免费":"面议"))])]),s._v(" "),i("div",{staticClass:"publicList"},[i("label",[s._v("服务期限：")]),s._v(" "),i("span",[s._v(s._s(s.serviceInfo.deadline))])]),s._v(" "),i("div",{staticClass:"publicList"},[i("label",[s._v("服务介绍：")]),s._v(" "),i("span",[s._v(s._s(s.serviceInfo.summary))])]),s._v(" "),s._m(2),s._v(" "),i("div",{staticClass:"publicList"},[i("label",[s._v("免责声明：")]),s._v(" "),i("span",{attrs:{id:"mzDetail"}},[s._v(s._s(s.serviceInfo.relief))])]),s._v(" "),i("div",{staticClass:"publicList"},[i("label",[s._v("选择服务范围：")]),s._v(" "),i("span",s._l(s.serviceInfo.region,function(t,e){return i("i",[s._v(s._s(t.name)),e!=s.serviceInfo.region.length-1?i("em",[s._v("、")]):s._e()])}),0)])]),s._v(" "),i("div",{staticClass:"deleteListCon"},[s._m(3),s._v(" "),i("div",{staticClass:"publicList clearfix"},[i("label",{staticClass:"fl"},[s._v("联系人姓名：")]),s._v(" "),i("span",[s._v(s._s(s.serviceInfo.contactName))])]),s._v(" "),i("div",{staticClass:"publicList"},[i("label",[s._v("联系方式：")]),s._v(" "),i("span",[s._v(s._s(s.serviceInfo.contactPhone))])]),s._v(" "),i("div",{staticClass:"publicList"},[i("label",[s._v("单位名称：")]),s._v(" "),i("span",[s._v(s._s(s.serviceInfo.unitName))])]),s._v(" "),i("div",{staticClass:"publicList"},[i("label",[s._v("电子邮箱：")]),s._v(" "),i("span",[s._v(s._s(s.serviceInfo.email))])]),s._v(" "),i("div",{staticClass:"publicList"},[i("label",[s._v("服务接入用途：")]),s._v(" "),i("span",[s._v(s._s(s.serviceInfo.serviceUse))])]),s._v(" "),i("div",{staticClass:"publicList pubListTxt"},[i("label",[s._v("接入用途地址：")]),s._v(" "),i("span",{staticClass:"multilineText"},s._l(s.serviceInfo.useForAddress,function(t){return i("p",[i("b",[s._v(s._s(s.userForList[t.useFor])+"：")]),s._v(s._s(t.address))])}),0)])])]),s._v(" "),1==s.status?i("div",{staticClass:"btnBgBox"},[i("button",{staticClass:"btn-defalut btn-red",on:{click:s.cancelApply}},[s._v("撤消申请")])]):s._e()])]),s._v(" "),s.cancelFlag?i("div",{staticClass:"mask"}):s._e(),s._v(" "),s.cancelFlag?i("div",{staticClass:"dialog-container add-catalog-dialog"},[i("div",{staticClass:"dialog-inner"},[i("header",{staticClass:"dialog-header"},[i("div",{staticClass:"dialog-header-tit fl"},[s._v("提示")]),s._v(" "),i("div",{staticClass:"icon-verPic icon-dialogClose fr",on:{click:s.cancelN}})]),s._v(" "),i("div",{staticClass:"dialog-body"},[i("div",{staticClass:"dialog-conTit"},[s._v("您确定要撤销"),i("span",[s._v(s._s(s.serviceInfo.serviceName))]),s._v("的采购申请吗？")])]),s._v(" "),i("footer",{staticClass:"dialog-footer"},[i("ul",{staticClass:"btn-list clearfix"},[i("li",{staticClass:"btn-item btn-item-acvite",on:{click:s.cancelY}},[s._v("确  认")]),s._v(" "),i("li",{staticClass:"btn-item",on:{click:s.cancelN}},[s._v("取  消")])])])])]):s._e(),s._v(" "),s.submitSuccess?i("div",{staticClass:"submitSuccessBox"},[i("i",{staticClass:"icon-verPic icon-submitSuccess"}),s._v("提交成功")]):s._e()])},staticRenderFns:[function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"publicTitle"},[t("i",{staticClass:"lineBlue"}),this._v("申请单详情")])},function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"publicTitle"},[t("i",{staticClass:"lineBlue"}),this._v("服务信息")])},function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"publicList"},[t("label",[this._v("服务提供方式：")]),this._v(" "),t("span",[t("p",[this._v("公共服务打包输出")]),this._v(" "),t("p",{staticClass:"gray"},[this._v("注：公共服务打包输出：政务数据与服务集成的公共服务可按照事项内容封装并整体提供，包括整套服务页面及服务内容，需求方可以直接进行调用。")])])])},function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"publicTitle"},[t("i",{staticClass:"lineBlue"}),this._v("联系人信息")])}]};var n=i("VU/8")(c,l,!1,function(s){i("nkg7")},"data-v-099baaf9",null);t.default=n.exports},nkg7:function(s,t){}});