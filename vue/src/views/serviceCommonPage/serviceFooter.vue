<template>
  <div>
    <div class="footerBG">
      <div class="container clearfix">
        <div class="footerList">
          <div class="tit">联系与支持</div>
          <ul>
            <li><router-link to="/serviceSupport/commonProblem">常见问题</router-link></li>
            <li><router-link to="/serviceSupport/teacherRelated">技术相关</router-link></li>
            <li><router-link to="/serviceSupport/operationRelated">操作相关</router-link></li>
            <li><router-link to="/serviceSupport/helpCenter">帮助中心</router-link></li>
          </ul>
        </div>
        <div class="footerList">
          <div class="tit">关于我们</div>
          <ul>
            <li><a href="https://www.kaipuyun.cn/kp/gongsi/ucap.shtml#ucap-gy" target="_blank">公司介绍</a></li>
            <li><router-link to="/serviceSupport/disclaimer">免责声明</router-link></li>
            <li><a href="javascript:;">合作伙伴</a></li>
          </ul>
        </div>
        <div class="footerList">
          <div class="tit">快速入口</div>
          <ul>
            <li><a href="https://www.kaipuyun.cn/" target="_blank">开普云官网</a></li>
            <li><a href="https://jg.kaipuyun.cn/" target="_blank">云监测</a></li>
            <li><a href="https://www.kaipuyun.cn/kp/yfx/yfx.shtml" target="_blank">用户体验分析</a></li>
            <li><a href="https://www.kaipuyun.cn/kp/xmtjc/xmt.shtml" target="_blank">新媒体监测</a></li>
          </ul>
        </div>
        <div class="footerList">
          <div class="tit">产品服务</div>
          <ul>
            <li><router-link to="/serviceCommonPage/dataService">数据服务</router-link></li>
            <li><router-link to="/devPlatform">开放平台</router-link></li>
            <li><router-link to="/serviceSupport/commonProblem">服务支持</router-link></li>
          </ul>
        </div>
        <div class="footerOther">
          <div class="hotlineBox"><i class="icon-deltails icon-hotline"></i>服务热线：4000-976-005</div>
          <div class="emailBox"><i class="icon-deltails icon-email"></i>Email：yunying@ucap.com.cn</div>
          <div class="scanCode clearfix">
            <div class="ucap-publicNum fl">
              <div class="picCode"><img src="../../assets/img/serviceBox/ucap-publicNum.png"></div>
              <div class="tit">公共服务云平台</div>
            </div>
            <div class="ucap-weChat fl">
              <div class="picCode"><img src="../../assets/img/serviceBox/ucap-weChat.png"></div>
              <div class="tit">开普云</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="copyrightBG">
      <div class="container">
        © CopyRight 2019 开普云 kaipuyun.cn. All Rights Reserved<span>版权所有 京ICP备14035494号-1</span>
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
      }
    },
    mounted(){
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
    },
    watch:{
    }
  }
</script>
<style scoped="">
  @import "../../assets/css/public2.css";
  @import "../../assets/css/index.css";
</style>
