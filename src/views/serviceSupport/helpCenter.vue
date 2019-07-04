<template>
  <div class="mar-top">
    <h3>帮助中心</h3>
    <p>单位名称：北京开普云信息科技有限公司</p>
    <p>公司地址：北京市海淀区知春路量子银座601</p>
    <p>服务热线：4000-976-005</p>
    <p>Email： yunying@ucap.com.cn</p>
    <!--  <h2 id="helpCenter">公共服务云平台是什么？</h2>
      <p>公共服务管理平台提供服务采购申请管理模块用于审核服务采购申请详细信息，审核前需要系统用户永远服务采购管理模块的权限</p>
      <h2 style="margin-top: 9px;" id="helpCenter2">开发平台是什么意思？</h2>
      <p>公共服务管理平台提供服务采购申请管理模块用于审核服务采购申请详细信息，审核前需要系统用户永远服务采购管理模块的权限</p>-->
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
        this.bus.$on('helpCenter', function (data) {
          var titleString = document.getElementById('helpCenter').innerText;
          var titleString2 = document.getElementById('helpCenter2').innerText;
          if (data && data.length > 0) {
            let replaceReg = new RegExp(data, 'g');// 匹配关键字正则
            let replaceString = '<span style="color: red">' + data + '</span>';// 高亮替换v-html值
            document.getElementById('helpCenter').innerHTML = titleString.replace(replaceReg, replaceString);// 开始替换
            document.getElementById('helpCenter2').innerHTML = titleString2.replace(replaceReg, replaceString);// 开始替换
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
</style>
