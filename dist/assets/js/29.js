webpackJsonp([29],{Fxcp:function(e,t){},emH4:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("Dd8w"),i=a.n(s),r=a("NYxO"),n={name:"container",data:function(){return{userName:"",userPhone:"",companyName:"",companyUrl:"",openID:"",userNameTip:"",userPhoneTip:"",companyNameTip:"",companyUrlTip:""}},mounted:function(){this.openID=this.getUserInfo?JSON.parse(this.getUserInfo).openID:"",this.getUserByOpenID()},computed:i()({},Object(r.c)(["getUserInfo"])),components:{},created:function(){},methods:i()({},Object(r.b)(["sendLoginState"]),{inputBlur:function(e){var t=/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/;if("userName"==e){if(!this.userName.trim())return void(this.userNameTip="请输入联系人姓名");if(this.userName.trim().length<2||!/^[\u4e00-\u9fa5A-Za-z]{0,}$/.test(this.userName.trim()))return void(this.userNameTip="请输入2-10个字母或汉字");this.userNameTip=""}if("userPhone"==e){if(!this.userPhone.trim())return void(this.userPhoneTip="请输入联系人电话");if(11!=this.userPhone.trim().length||!/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(this.userPhone.trim()))return void(this.userPhoneTip="手机号格式错误");this.userPhoneTip=""}if("companyName"==e)if(this.companyName.trim())if(t.test(this.companyName.trim().charAt(0)))this.companyNameTip="首字母非特殊字符";else{if(!(this.companyName.trim().length>2))return void(this.companyNameTip="请输入3-35个字符");this.companyNameTip="",this.companyNameTip=""}else this.companyNameTip="请输入单位名称";"companyUrl"==e&&(this.companyUrl.trim()?t.test(this.companyUrl.trim().charAt(0))?this.companyUrlTip="首字母非特殊字符":this.companyUrlTip="":this.companyUrlTip="请输入通讯地址")},submit:function(){this.inputBlur("userName"),this.inputBlur("userPhone"),this.inputBlur("companyName"),this.inputBlur("companyUrl"),this.userNameTip||this.userPhoneTip||this.companyNameTip||this.companyUrlTip||(sessionStorage.setItem("contactName",this.userName),sessionStorage.setItem("contactTel",this.userPhone),sessionStorage.setItem("company",this.companyName),sessionStorage.setItem("address",this.companyUrl),this.$router.push({name:"applySecondStep"}))},getUserByOpenID:function(){var e=this;this.$http({headers:{"Content-Type":"application/json"},method:"post",url:"/userInformation/getUserByOpenID",async:!0,data:{openID:this.openID},contentType:"application/json"}).then(function(t){"success"==t.data.msg?e.$route.params.userName?(e.userName=e.$route.params.userName,e.userPhone=e.$route.params.userPhone,e.companyName=e.$route.params.companyName,e.companyUrl=e.$route.params.address):(e.userName=t.data.results.name,e.userPhone=t.data.results.mobile,e.companyName=t.data.results.companyName,e.companyUrl=t.data.results.companyUrl):alert("数据加载失败")}).catch(function(e){})}}),watch:{}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"tabList clearfix"},[a("div",{staticClass:"tabCon"},[a("div",{staticClass:"ListCon",attrs:{id:"fwxq"}},[a("div",{staticClass:"tableBox whiteBG serviceApplyTable"},[a("table",{staticClass:"table"},[a("tr",[a("td",[e._v("联系人姓名：")]),e._v(" "),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.userName,expression:"userName"}],staticClass:"inp-service",attrs:{type:"text",placeholder:"",value:"房贷首付",maxlength:"10"},domProps:{value:e.userName},on:{blur:function(t){return e.inputBlur("userName")},input:function(t){t.target.composing||(e.userName=t.target.value)}}}),e._v(" "),e.userNameTip?a("div",{staticClass:"error pla-email-use",staticStyle:{left:"380px"}},[a("i",{staticClass:"pla-email"}),e._v(e._s(e.userNameTip))]):e._e()])]),e._v(" "),a("tr",[a("td",[e._v("联系方式：")]),e._v(" "),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.userPhone,expression:"userPhone"}],staticClass:"inp-service",attrs:{type:"text",maxlength:"11",placeholder:"",value:"18564567866"},domProps:{value:e.userPhone},on:{blur:function(t){return e.inputBlur("userPhone")},input:function(t){t.target.composing||(e.userPhone=t.target.value)}}}),e._v(" "),e.userPhoneTip?a("div",{staticClass:"error pla-email-use",staticStyle:{left:"380px"}},[a("i",{staticClass:"pla-email"}),e._v(e._s(e.userPhoneTip))]):e._e()])]),e._v(" "),a("tr",[a("td",[e._v("单位名称：")]),e._v(" "),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.companyName,expression:"companyName"}],staticClass:"inp-service",attrs:{type:"text",placeholder:"请输入单位名称",maxlength:"35"},domProps:{value:e.companyName},on:{blur:function(t){return e.inputBlur("companyName")},input:function(t){t.target.composing||(e.companyName=t.target.value)}}}),e._v(" "),e.companyNameTip?a("div",{staticClass:"error pla-email-use",staticStyle:{left:"380px"}},[a("i",{staticClass:"pla-email"}),e._v(e._s(e.companyNameTip))]):e._e()])]),e._v(" "),a("tr",[a("td",[e._v("通讯地址：")]),e._v(" "),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.companyUrl,expression:"companyUrl"}],staticClass:"inp-service",attrs:{type:"text",placeholder:"请输入通讯地址",maxlength:"50"},domProps:{value:e.companyUrl},on:{blur:function(t){return e.inputBlur("companyUrl")},input:function(t){t.target.composing||(e.companyUrl=t.target.value)}}}),e._v(" "),e.companyUrlTip?a("div",{staticClass:"error pla-email-use",staticStyle:{left:"380px"}},[a("i",{staticClass:"pla-email"}),e._v(e._s(e.companyUrlTip))]):e._e()])]),e._v(" "),a("tr",[a("td"),e._v(" "),a("td",[a("a",{staticClass:"btnApply",attrs:{href:"javascript:;"},on:{click:function(t){return e.submit()}}},[e._v("下一步")])])])])])])])])},staticRenderFns:[]};var p=a("VU/8")(n,o,!1,function(e){a("Fxcp")},"data-v-71a1aba4",null);t.default=p.exports}});