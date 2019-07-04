<template>
  <div class="mar-top">
    <h3>技术相关</h3>
    <h2 >(一)、服务盒子平台提供的API如何调用？</h2>
    <p class="text-indent">用户完成采购申请审核通过后可进行API的调用。</p>
    <h2 >(二)、购买的服务怎么进行上线下的操作？</h2>
    <p class="text-indent">用户已购买的服务，可在服务盒子门户平台管理平台中进行服务的上线下操作。也可联系我们进行上线下线的操作。</p>
    <p>
      <img src="../../assets/img/serviceSupport/teacher.png" alt="">
    </p>
    <h2 >(三)、监控管理的作用</h2>
    <p class="text-indent">监控管理为了方便用户及时了解购买的服务状况，若监测到异常信息，及时进行邮箱预警通知，对有问题的服务及时进行下线的处理操作。</p>
    <p>
      <img src="../../assets/img/serviceSupport/monitor.png" alt="">
    </p>
    <h2 >(四)、用户只购买API接口服务，有相关操作说明吗？</h2>
    <p class="text-indent">平台提供API相关操作文档，可方便开发者快速使用API。</p>
    <h2 >(五)、服务盒子提供的开发者工具指的是什么？</h2>
    <p class="text-indent">为用户提供的开发者工具指的是为开发者提供标准开发工具包与解析器，开发者可快速完成服务分析、服务制作工作。</p>
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
        this.bus.$on('teacherRelated', function (data) {
          //var titleString = document.getElementById('teacherRelated').innerText;
          if (data && data.length > 0) {
            let replaceReg = new RegExp(data, 'g');// 匹配关键字正则
            let replaceString = '<span style="color: red">' + data + '</span>';// 高亮替换v-html值
            //document.getElementById('teacherRelated').innerHTML = titleString.replace(replaceReg, replaceString);// 开始替换
            var h2Tag = document.getElementsByTagName('h2');
            for(var i=0;i<h2Tag.length;i++){
              h2Tag[i].innerHTML = h2Tag[i].innerText.replace(replaceReg, replaceString);
            }
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
