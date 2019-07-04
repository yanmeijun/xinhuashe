<template>
  <div class="mar-top">
    <h3>免责声明</h3>
    <!--<h2 id="disclaimer">免责声明</h2>-->
    <p>1、若原服务网站停用或维护，该服务将无法正常使用，我们对此概不负责，亦不承担任何法律责任。</p>
    <p>2、任何人因使用本网站而可能遭致的意外及其造成的损失(包括因下载本网站可能连接的第三方网站内容而感染电脑病毒)，我们对此概不负责，亦不负责任何法律责任</p>
    <p>3、本网站禁止制作、复制、发布、传播等具有反动、色情、暴力、淫秽等内容的信息，一经发现，立即删除，若您因此触犯法律，我们对此不承担任何法律责任</p>
    <p>4、本网站会员自行上传或通过网络收集的资源，我们仅提供一个展示，交流的平台，不对其他内容的准确性，真实性，正当性，合法性负责，也不承担任何法律责任</p>
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
          /*this.bus.$on('disclaimer', function (data) {
            var titleString = document.getElementById('disclaimer').innerText;
            if (data && data.length > 0) {
              let replaceReg = new RegExp(data, 'g');// 匹配关键字正则
              let replaceString = '<span style="color: red">' + data + '</span>';// 高亮替换v-html值
              document.getElementById('disclaimer').innerHTML = titleString.replace(replaceReg, replaceString);// 开始替换
            }
          })*/
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
