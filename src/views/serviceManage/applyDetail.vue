<template>
  <div>
    <div class="content">
      <div class="serviceMainCon">
        <div class="welcomeTitle clearfix">
          <span>当前位置：</span>
          <span>服务管理</span>
          <span>&gt;</span>
          <span @click="renderTo">我的申请</span>
        </div>
      </div>
      <div class="rm-main-box">
        <!--内容信息 start-->
        <div class="deleteCon detailsCon">
          <div class="deleteListCon">
            <div class="publicTitle"><i class="lineBlue"></i>申请单详情</div>
            <div class="publicList">
              <label>申请单编号：</label>
              <span>{{serviceInfo.procureID}}</span>
            </div>
            <div class="publicList clearfix">
              <label>申请时间：</label>
              <span>{{serviceInfo.applyTime}}</span>
            </div>
            <div class="publicList">
              <label>申请状态：</label>
            				<span v-if="serviceInfo.status==1" class="pendReview">
            					<i class="icon-verPic icon-pendReview"></i>待审核
            				</span>
            				<span v-if="serviceInfo.status==4">
            					<i class="icon-verPic icon-cancel"></i>已撤销
            				</span>
            				<span class="certifiedStatus" v-if="serviceInfo.status==2">
            					<i class="icon-verPic icon-passed"></i>已通过
            				</span>
                    <span class="certifiedStatus not" v-if="serviceInfo.status==3">
                      <i class="icon-verPic icon-notPassed"></i>未通过
                    </span>
            </div>
            <!--未通过时（显示）驳回的意见 -->
            <div class="publicList" style="display: none;">
              <label>驳回意见：</label>
                    		<span>
                    			<textarea class="realName-textarea">{{serviceInfo.reviewed}}</textarea>
                    		</span>
            </div>
          </div>
          <div class="deleteListCon">
            <div class="publicTitle"><i class="lineBlue"></i>服务信息</div>
            <div class="publicList clearfix">
              <label class="fl">服务名称：</label>
              <span class="corBlue">{{serviceInfo.serviceName}}</span>
            </div>
            <div class="publicList">
              <label>服务分类：</label>
              <span>{{categoryList[serviceInfo.category]}}</span>
            </div>
            <div class="publicList">
              <label>价格：</label>
              <span>{{serviceInfo.price <= 0 ? "免费" : "面议"}}</span>
            </div>
            <div class="publicList">
              <label>服务期限：</label>
              <span>{{serviceInfo.deadline}}</span>
            </div>
            <div class="publicList">
              <label>服务介绍：</label>
              <span>{{serviceInfo.summary}}</span>
            </div>
            <div class="publicList">
              <label>服务提供方式：</label>
            				<span>
            					<p>公共服务打包输出</p>
            					<p class="gray">注：公共服务打包输出：政务数据与服务集成的公共服务可按照事项内容封装并整体提供，包括整套服务页面及服务内容，需求方可以直接进行调用。</p>
            				</span>
            </div>
            <div class="publicList">
              <label>免责声明：</label>
              <span id="mzDetail">{{serviceInfo.relief}}</span>
            </div>
            <div class="publicList">
              <label>选择服务范围：</label>
              <span><i v-for="(city,index) in serviceInfo.region">{{city.name}}<em v-if="index!=serviceInfo.region.length-1">、</em></i></span>
            </div>
          </div>
          <div class="deleteListCon">
            <div class="publicTitle"><i class="lineBlue"></i>联系人信息</div>
            <div class="publicList clearfix">
              <label class="fl">联系人姓名：</label>
              <span>{{serviceInfo.contactName}}</span>
            </div>
            <div class="publicList">
              <label>联系方式：</label>
              <span>{{serviceInfo.contactPhone}}</span>
            </div>
            <div class="publicList">
              <label>单位名称：</label>
              <span>{{serviceInfo.unitName}}</span>
            </div>
            <div class="publicList">
              <label>电子邮箱：</label>
              <span>{{serviceInfo.email}}</span>
            </div>
            <div class="publicList">
              <label>服务接入用途：</label>
              <span>{{serviceInfo.serviceUse}}</span>
            </div>
            <div class="publicList pubListTxt">
              <label>接入用途地址：</label>
                <span class="multilineText">
                  <p v-for="item in serviceInfo.useForAddress"><b>{{userForList[item.useFor]}}：</b>{{item.address}}</p>
                </span>
            </div>
          </div>
        </div>
        <!--内容信息 end-->
        <!--按钮 start-->
        <div v-if="status==1" class="btnBgBox">
          <button class="btn-defalut btn-red" @click="cancelApply">撤消申请</button>
        </div>
        <!--按钮 end-->
      </div>
    </div>
    <!--遮罩层-->
    <div v-if="cancelFlag" class="mask"></div>
    <!--撤销申请提示-采购-->
    <div v-if="cancelFlag" class="dialog-container add-catalog-dialog">
      <div class="dialog-inner">
        <header class="dialog-header">
          <div class="dialog-header-tit fl">提示</div>
          <div class="icon-verPic icon-dialogClose fr" @click="cancelN"></div>
        </header>
        <div class="dialog-body">
          <div class="dialog-conTit">您确定要撤销<span>{{serviceInfo.serviceName}}</span>的采购申请吗？</div>
        </div>
        <footer class="dialog-footer">
          <ul class="btn-list clearfix">
            <li class="btn-item btn-item-acvite" @click="cancelY">确&nbsp;&nbsp;认</li>
            <li class="btn-item" @click="cancelN">取&nbsp;&nbsp;消</li>
          </ul>
        </footer>
      </div>
    </div>
    <div class="submitSuccessBox" v-if="submitSuccess"><i class="icon-verPic icon-submitSuccess"></i>提交成功</div>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from "axios";
  export default {
    data() {
      return {
        procureID: this.$route.query.procureID,
        status: this.$route.query.status,
        serviceInfo: {},
        cancelFlag:false,
        categoryList: {
          'A': '交通',
          'B': '社会保障',
          'C': '教育',
          'D': '医疗卫生',
          'E': '民政',
          'H': '出入境',
          'M': '文化体育',
          'G': '旅游',
          'I': '举报',
          'K': '税务',
          'X': '信用',
          'Y': '法规查询',
          'L': '政务',
          'Z': '其他'
        },
        userForList:{
          "app": "app",
          "web": "web端",
          "weChat": "微信端",
          "wap": "wap",
          "other": "其他",
        },
        submitSuccess: false
      };
    },
    computed: {},
    mounted(){
      this.initData();
    },
    methods: {
      initData(){//初始化数据
        this.isSearch = false;
        this.loading = true;
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/procure/getServiceInfo",
          async: true,
          data: {
            procureID: this.procureID
          },
          contentType: 'application/json'
        }).then(res=> {
          this.loading = false;
          if (res.data.msg == "success") {
            this.serviceInfo = res.data.results;
            const reg = new RegExp('。', "g")
            document.getElementById('mzDetail').innerHTML = this.serviceInfo.relief.replace(reg, "。<br>")
            this.serviceInfo.category = this.serviceInfo.serviceID[0];
          } else {
            alert("数据加载失败")
          }
        }).catch(err=> {
          console.log(err)
        })
      },
      cancelN(){
        this.cancelFlag = false;
      },
      cancelApply(){
        this.cancelFlag = true;
      },
      closeDialog(flag){
        this.tips = flag;
      },
      cancelY(){
        this.cancelFlag = false;
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/procure/cancelApply",
          async: true,
          data: {
            procureID: this.procureID
          },
          contentType: 'application/json'
        }).then(res=> {
          if (res.data.code == 200) {
            this.submitSuccess = true;
            setTimeout(() => {
              this.submitSuccess = false;
              this.$router.push({
                name: "myApplication"
              })
            }, 1500);
          } else {
            alert("撤销失败")
          }
        }).catch(err=> {
          console.log(err)
        })
      },
      renderTo(){
        this.$router.push({
          name: "myApplication"
        })
      }
    }

  };
</script>
<style scoped>
  @import "../../assets/css/base.css";
  @import "../../assets/css/public.css";
  @import "../../assets/css/main.css";
  @import "../../assets/css/dialog.css";
</style>
