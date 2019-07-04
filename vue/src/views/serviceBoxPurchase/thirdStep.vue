<template>
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
                <span>{{getprocureInfo.procureID}}</span>
              </p>
              <p>
                <span class="fl">服务名称：</span>
                <span class="fl">
                	<div class="fl serviceName">{{getprocureInfo.serviceName}}</div>
                	<a class="fl" href="javascript:void(0)" @click="orderDetails(getprocureInfo.procureID)">订单详情</a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import {mapGetters, mapState, mapActions} from 'vuex';

  export default {
    name: 'container',
    data() {
      return {
        getprocureInfo: {},
        openID: ""
      }
    },
    mounted() {
      if (this.getUserInfo) {
        this.openID = JSON.parse(this.getUserInfo).openID;
      }
      this.getProcureID();
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    components: {},
    created() {
    },
    methods: {
      getProcureID() {
        this.$http({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/procure/getProcureID",
          async: true,
          data: {
            serviceID: this.$route.query.serviceID,
            openID: this.openID,
            status: 1,
          },
          contentType: 'application/json'
        }).then(res => {
          if (res.data.code == "200") {
            this.getprocureInfo = res.data.basicInfor;
          } else {
            alert("数据加载失败")
          }
        }).catch(err => {
          console.log(err)
        })
      },
      orderDetails(procureID) {
        if (!procureID) {
          return;
        }
        this.$router.push({
          name: "applyDetail",
          query: {procureID: procureID, status: 1}
        })
      }
    },
    watch: {}
  }
</script>
<style scoped>
  @import "../../assets/css/public2.css";
  @import "../../assets/css/serviceDetails.css";
  @import "../../assets/css/serviceApply.css";
</style>
