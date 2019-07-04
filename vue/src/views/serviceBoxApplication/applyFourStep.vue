<template>
  <!-- 第四步 -->
  <div class="tabList clearfix">
    <div class="tabCon">
      <div class="ListCon" id="fwxq">
        <div class="tableBox whiteBG serviceApplyTable">
          <div class="applySuccess clearfix">
            <img src="../../assets/img/serviceApply/applySuccess.png" class="fl">
            <div class="fl applySuccess-detail">
              <h4>提交申请成功！</h4>
              <p>
                <span>订单编号：</span>
                <span>{{idNumber}}</span>
              </p>
              <p>
                <span>服务名称：</span>
                <span>{{serviceName}}<a href="javascript:void(0)" @click="orderDetails()">订单详情</a></span>
              </p>
            </div>
          </div>
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
            idNumber:"",
            serviceName:""
          }
      },
      mounted(){
        this.idNumber = sessionStorage.getItem("idNumber");
        this.serviceName = sessionStorage.getItem("serviceName");
      },
      computed:{
      },
      components: {
      },
      created(){
      },
      methods:{
        orderDetails(){
          this.$router.push({
            path: '/serviceJoinDetail',
            name: "serviceJoinDetail",
            query: {idNumber: this.idNumber, reviewState: 1}
          })
        }

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
