<template>
  <div class="mar-top">
    <h3>操作相关</h3>
    <h2 id="operationRelated">(一)、如何申请采购服务？</h2>
    <p class="text-indent">用户登录服务盒子平台选择要采购的服务，进入服务详情页面，点击“立即申请”按钮，进入服务采购申请界面。（实名认证审核通过的用户可进行服务采购的申请操作）。</p>
    <p>
      <img src="../../assets/img/serviceSupport/operation.png" alt="">
    </p>
    <p class="text-indent">进入申请流程页面，填写服务采购信息完成后进行提交采购申请，后台管理人员审批通过后，即可使用服务。</p>
    <p>
      <img src="../../assets/img/serviceSupport/process.png" alt="">
    </p>
    <h2 id="">(二)、如何进行实名认证？</h2>
    <p class="text-indent">用户登录服务盒子平台选择要采购的服务，进入服务详情页面，点击“立即申请”按钮，进入服务采购申请界面。（实名认证审核通过的用户可进行服务采购的申请操作）。</p>
    <p>
      <img src="../../assets/img/serviceSupport/operation2.png" alt="">
    </p>
    <p>信息填写完成提交审核，可在“实名认证”表单中查看审核状态。</p>
    <p><img src="../../assets/img/serviceSupport/operation3.png" alt=""></p>
    <h2 >(三)、开放平台如何申请</h2>
    <p class="text-indent">用户登录服务盒子平台，点击“开放平台”菜单，进入开发平台页面，点击页面中“服务接入申请”按钮，进入服务接入申请界面。</p>
    <p class="text-indent">申请条件：注册用户，且实名认证通过。</p>
    <p>
      <img src="../../assets/img/serviceSupport/operation4.png" alt="">
    </p>
    <p class="text-indent">完成申请步骤后，提交审核。</p>
    <p><img src="../../assets/img/serviceSupport/operation5.png" alt=""></p>
    <p class="text-indent">审核通过后，则可以将服务部署实施工作</p>
  </div>
</template>
<script>
  import {mapGetters, mapState,mapActions} from 'vuex';
  export default {
      name:'container',
      data(){
          return {
          }
      },
      mounted(){
        this.updateCity();
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
        updateCity(){
          this.bus.$on('operationRelated', function (data) {
            var titleString = document.getElementById('operationRelated').innerText;
            if (data && data.length > 0) {
              let replaceReg = new RegExp(data, 'g');// 匹配关键字正则
              let replaceString = '<span style="color: red">' + data + '</span>';// 高亮替换v-html值
              document.getElementById('operationRelated').innerHTML = titleString.replace(replaceReg, replaceString);// 开始替换
            }
          })
        }
      },
      watch:{
      }
  }
</script>
<style scoped>
  @import "../../assets/css/public2.css";
  @import "../../assets/css/serviceSupport.css";
  p.text-indent{
    text-indent: 40px;
  }
  p img{
    width: 800px;
    margin-top:10px;
  }
</style>
