<template>
  <!-- 第一步 -->
  <div class="tabList clearfix">
    <div class="tabCon">
      <div class="ListCon" id="fwxq">
        <div class="tableBox whiteBG serviceApplyTable">
          <table class="table">
            <tr>
              <td>联系人姓名：</td>
              <td>
                <input type="text"
                       placeholder=""
                       value="房贷首付"
                       class="inp-service"
                       @blur="inputBlur('userName')"
                       maxlength="10"
                       v-model="userName">
                <div class="error pla-email-use"
                     v-if="userNameTip"
                     style="left: 380px;"><i class="pla-email"></i>{{userNameTip}}</div>
              </td>
            </tr>
            <tr>
              <td>联系方式：</td>
              <td>
                <input type="text" @blur="inputBlur('userPhone')"
                       maxlength="11"
                       placeholder=""
                       value="18564567866"
                       class="inp-service" v-model="userPhone">
                <div class="error pla-email-use"
                     style="left: 380px;"
                     v-if="userPhoneTip"
                ><i class="pla-email"></i>{{userPhoneTip}}</div>
              </td>
            </tr>
            <tr>
              <td>单位名称：</td>
              <td>
                <input type="text" @blur="inputBlur('companyName')" placeholder="请输入单位名称" class="inp-service" v-model="companyName" maxlength="35">
                <div class="error pla-email-use"
                     style="left: 380px;"
                     v-if="companyNameTip"
                ><i class="pla-email"></i>{{companyNameTip}}</div>
              </td>
            </tr>
            <tr>
              <td>通讯地址：</td>
              <td>
                <input type="text" @blur="inputBlur('companyUrl')" placeholder="请输入通讯地址" class="inp-service" v-model="companyUrl" maxlength="50">
                <div class="error pla-email-use"
                     style="left: 380px;"
                     v-if="companyUrlTip"
                ><i class="pla-email"></i>{{companyUrlTip}}</div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <a href="javascript:;" class="btnApply" @click="submit()">下一步</a>
              </td>
            </tr>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import {mapGetters, mapState,mapActions} from 'vuex';
  export default {
      name:'container',
      data(){
          return {
            userName:"",
            userPhone:"",
            companyName:"",
            companyUrl:"",
            openID:"",
            userNameTip:"",
            userPhoneTip:"",
            companyNameTip:"",
            companyUrlTip:""
          }
      },
      mounted(){
        this.openID = this.getUserInfo ? JSON.parse(this.getUserInfo).openID : "";//得到用户的openID
        this.getUserByOpenID();
      },
      computed:{
        ...mapGetters(['getUserInfo'])
      },
      components: {
      },
      created(){
      },
      methods:{
        ...mapActions(['sendLoginState']),
        inputBlur(name){
          const reg1 = /^[\u4e00-\u9fa5A-Za-z]{0,}$///中文或英文
          const reg2 = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/;//特殊字符
          if(name == "userName"){
            if (!this.userName.trim()) {
              this.userNameTip = "请输入联系人姓名";
              return;
            } else if (this.userName.trim().length < 2 || !reg1.test(this.userName.trim())) {
              this.userNameTip = "请输入2-10个字母或汉字";
              return;
            } else {
              this.userNameTip = "";
            }
          };
          if(name == "userPhone"){
            if (!this.userPhone.trim()) {
              this.userPhoneTip = "请输入联系人电话";
              return;
            } else if (this.userPhone.trim().length != 11||!(/^1[3|4|5|8|7|9][0-9]\d{8}$/.test(this.userPhone.trim()))) {
              this.userPhoneTip = "手机号格式错误";
              return;
            } else {
              this.userPhoneTip = "";
            };
          };
          if (name == "companyName") {
            if (!this.companyName.trim()) {
              this.companyNameTip = "请输入单位名称"
            } else if (reg2.test(this.companyName.trim().charAt(0))) {
              this.companyNameTip = "首字母非特殊字符"
            } else {
              if(this.companyName.trim().length >2){
                this.companyNameTip = "";
              }else{
                this.companyNameTip = "请输入3-35个字符";
                return;
              }
              this.companyNameTip = "";
            }
          }
          if (name == "companyUrl") {
            if (!this.companyUrl.trim()) {
              this.companyUrlTip = "请输入通讯地址"
            } else if (reg2.test(this.companyUrl.trim().charAt(0))) {
              this.companyUrlTip = "首字母非特殊字符"
            } else {
              this.companyUrlTip = "";
            }
          }

        },
        submit(){
           this.inputBlur('userName');
            this.inputBlur('userPhone');
            this.inputBlur('companyName');
            this.inputBlur('companyUrl');
            if(this.userNameTip || this.userPhoneTip || this.companyNameTip || this.companyUrlTip){
              return;
            };
            sessionStorage.setItem("contactName",this.userName);
            sessionStorage.setItem("contactTel",this.userPhone);
            sessionStorage.setItem("company",this.companyName);
            sessionStorage.setItem("address",this.companyUrl);
            this.$router.push({
              name:"applySecondStep"
            });
        },
        getUserByOpenID(){
          this.$http({
            headers: {"Content-Type": "application/json"},
            method: "post",
            url: "/userInformation/getUserByOpenID",
            async: true,
            data: {
              openID: this.openID
            },
            contentType: 'application/json'
          }).then(res=> {
            if (res.data.msg == "success") {
              if(this.$route.params.userName){
                this.userName = this.$route.params.userName;
                this.userPhone = this.$route.params.userPhone;
                this.companyName = this.$route.params.companyName;
                this.companyUrl = this.$route.params.address;
              }else{
                this.userName = res.data.results.name;
                this.userPhone = res.data.results.mobile;
                this.companyName = res.data.results.companyName;
                this.companyUrl = res.data.results.companyUrl;
              }
            } else {
              alert("数据加载失败")
            }
          }).catch(err=> {
            console.log(err)
          })
        },
      },
      watch:{
      }
  }
</script>
<style scoped>
  @import "../../assets/css/public2.css";
  @import "../../assets/css/serviceDetails.css";
  @import "../../assets/css/serviceApply.css";
</style>
