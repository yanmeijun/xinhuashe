webpackJsonp([38],{g5It:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i("Dd8w"),a=i.n(s),r=i("hbJQ"),o=i("U4tZ"),c=i("jZyA"),n=i("NYxO"),l={name:"container",data:function(){return{hotMenu:[{serviceName:"北京社保信息查询",serviceID:"BAA0001"},{serviceName:"机动车违章查询",serviceID:"AAA0001"},{serviceName:"北京市预约挂号服务",serviceID:"DAA0001"},{serviceName:"驾照扣分查询",serviceID:"AAB0001"},{serviceName:"全国医疗机构查询",serviceID:"DAB0003"}],keyword:"",tipSecond:!1,openID:"",isConfirm:!1,confirmStatus:""}},mounted:function(){this.$route.path.indexOf("serviceBoxPurchase")>0||this.$route.path.indexOf("serviceBoxApplication")>0?document.getElementById("searchLayer").style.display="none":document.getElementById("searchLayer").style.display="block",this.openID=this.getUserInfo?JSON.parse(this.getUserInfo).openID:""},computed:a()({},Object(n.c)(["getUserInfo"])),components:{serviceHead:r.a,serviceFooter:o.a,loginMask:c.a},created:function(){},methods:{goServiceDetails:function(e){e&&this.$router.push({path:"/serviceDetails",name:"serviceDetails",query:{id:e}})},search:function(){this.keyword?this.$router.push({path:"/serviceSort",name:"serviceSort",query:{keyword:this.keyword}}):alert("请输入搜索关键字")},closeDialog:function(e){this.tipSecond=e},goConfirmStatuso:function(){"0"==this.confirmStatus?this.$router.push({path:"/home/personalRealName/realNameMainCon"}):this.$router.push({path:"/home/personalRealName/realNameDetails"})},close:function(){this.isConfirm=!1}},watch:{$route:function(e,t){this.$route.path.indexOf("serviceBoxPurchase")>0||this.$route.path.indexOf("serviceBoxApplication")>0?document.getElementById("searchLayer").style.display="none":document.getElementById("searchLayer").style.display="block"}}},d={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{},[i("serviceHead"),e._v(" "),i("div",{staticClass:"searchBgPic",attrs:{id:"searchLayer"}},[i("div",{staticClass:"container"},[i("div",{staticClass:"searchLayer clearfix"},[i("div",{staticClass:"searchBox"},[i("div",{staticClass:"clearfix"},[i("i",{staticClass:"icon-deltails icon-search"}),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.keyword,expression:"keyword"}],staticClass:"searchText",attrs:{type:"text",placeholder:"搜索您所需要的服务"},domProps:{value:e.keyword},on:{input:function(t){t.target.composing||(e.keyword=t.target.value)}}}),e._v(" "),i("input",{staticClass:"searchBtn",attrs:{type:"button",value:"搜索"},on:{click:function(t){return e.search()}}})]),e._v(" "),i("div",{staticClass:"hotSearchName"},[i("ul",e._l(e.hotMenu,function(t){return i("li",[i("a",{attrs:{href:"javascript:;"},on:{click:function(i){return e.goServiceDetails(t.serviceID)}}},[e._v(e._s(t.serviceName))])])}),0)])])])])]),e._v(" "),i("loginMask",{attrs:{tipSecond:e.tipSecond},on:{listenToChildEvent:e.closeDialog}}),e._v(" "),e.isConfirm?i("div",{staticClass:"mask"}):e._e(),e._v(" "),e.isConfirm?i("div",{staticClass:"dialog-container"},[i("div",{staticClass:"dialog-inner ht286"},[i("header",{staticClass:"dialog-header"},[i("div",{staticClass:"dialog-header-tit fl"},[e._v("提示")]),e._v(" "),i("div",{staticClass:"icon-verPic icon-dialogClose fr",on:{click:function(t){return e.close()}}})]),e._v(" "),i("div",{staticClass:"dialog-body"},[e._m(0),e._v(" "),i("div",{staticClass:"dialog-realNamePrompt"},[e._v("对不起，该申请暂只支持已通过实名认证的用户使用")]),e._v(" "),i("div",{staticClass:"btnGoCertifi"},[i("a",{attrs:{href:"javascript:;"},on:{click:e.goConfirmStatuso}},[e._v("去认证")])])])])]):e._e(),e._v(" "),i("router-view"),e._v(" "),i("serviceFooter")],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"dialog-realNamePic"},[t("img",{attrs:{src:i("8oYK")}})])}]};var v=i("VU/8")(l,d,!1,function(e){i("w4ke")},"data-v-000483f5",null);t.default=v.exports},w4ke:function(e,t){}});