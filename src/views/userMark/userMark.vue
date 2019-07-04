<template>
  <div class="content">
    <div class="serviceMainCon">
      <div class="welcomeTitle">
        <span>当前位置：</span>
        <span>我的关注</span>
      </div>
      <!--内容信息 start-->
      <div class="perWhiteBg">
        <div class="perCenList clearfix">
          <div class="perwh20" v-for="(item,index) in markList">
            <div class="appService attention clearfix">
              <!--服务类型(1服务和api都有，2服务，3api)-->
              <div class="pubFocus api" v-if="item.type==1">服务和api</div>
              <div class="pubFocus api" v-if="item.type==2">服务</div>
              <div class="pubFocus api" v-if="item.type==3">api</div>
              <div class="appServiceLogo">
                <img :src="item.logo">
              </div>
              <div class="serviceTit" @click="toServicePage(item.serviceID)">{{item.serviceName}}</div>
              <div class="btnAttention">
                <a href="javascript:;" @click="del(item.serviceID)">
                  <i class="icon-verPic icon-unfollow"></i>取消关注
                </a>
              </div>
            </div>
          </div>

          <div v-if="markNum == 0" class="noRecordList htvh220">
            <div class="noRecordPicBox"><img src="../../assets/img/newPic/noRecord.png"/></div>
            <div class="noRecorWord">您还没有任何记录呢～</div>
          </div>
        </div>
      </div>
      <!--内容信息 end-->
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import {mapActions, mapState, mapGetters} from 'vuex';

  export default {
    name: 'container',
    data() {
      return {
        openID: "",
        markList: [],
        markNum: false
      };
    },
    mounted() {
      this.openID = this.getUserInfo ? JSON.parse(this.getUserInfo).openID : "";
      this.getmark();
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    components: {},
    created() {

    },
    methods: {
      getmark() {
        let data = {
          openID: this.openID
        }
        this.$http({
          method: 'post',
          url: '/userMark/getMarkList',
          data: data
        }).then((res) => {
          let data = res.data;
          if (data.code == '200') {
            this.markNum = data.count
            if (data.info != null && data.info.length >= 1) {
              this.markList = data.info;
              this.markNum = data.count
            } else {
              this.markList = []
              this.markNum = data.count
            }
          }
        }).catch((err) => {
          alert(err)
          console.log(err)
        })
      },
      del(serviceID) {
        //this.markList.splice(ind, 1);
        let data = {
          serviceID: serviceID,
          openID: this.openID
        }
        this.$http({
          method: 'post',
          url: '/userMark/cancelMark',
          data: data
        }).then((res) => {
          let data = res.data;
          this.getmark();
          if (data.code == '200') {
            this.getmark();
          }
        }).catch((err) => {
          alert(err)
          console.log(err)
        })
      },
      toServicePage(id) {
        if (!id) {
          return
        }
        this.$router.push({
          path: '/serviceDetails',
          name: "serviceDetails",
          query: {id: id}
        })
      }
    },
    watch: {
      markNum: {
        handler() {
          this.getmark();//页面初始化获取用户信息
        }
      }

    }
  }
</script>
<style scoped>
  @import "../../assets/css/attention.css";
  @import "../../assets/css/main.css";
</style>
