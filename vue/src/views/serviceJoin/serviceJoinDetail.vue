<template>
  <div>
    <div class="content">
      <div class="bread-crumbs">
        <div class="bread-crumbs-content">
          <span class="cor-0498e4">服务接入管理</span>
          <span class="locationgLine">&frasl;</span>
          <span class="cor-0498e4 cor-pointer" @click="renderTo()">服务接入审核</span>
          <span class="locationgLine">&frasl;</span>
          <span class="corBlue">详情</span>
        </div>
      </div>
      <div class="rm-main-box">
        <!--内容信息 start-->
        <div class="deleteCon">
          <div class="deleteListCon">
            <div class="publicTitle"><i class="lineBlue"></i>申请单信息</div>
            <div class="publicList">
              <label>申请单编号：</label>
              <span>{{idNumber}}</span>
            </div>
            <div class="publicList">
              <label>申请时间：</label>
              <span>{{serviceInfo.createDate}}</span>
            </div>
            <div class="publicList">
              <label>申请单状态：</label>
              <span v-if="reviewState==1" class="pendReview"><i class="icon3 icon-pendReview"></i>待审核</span>
              <span v-if="reviewState==2"><i class="icon3 icon-cancel"></i>已撤销</span>
              <span v-if="reviewState==3" class="certifiedStatus"><i class="icon3 icon-passed"></i>已通过</span>
              <span v-if="reviewState==4" class="certifiedStatus not"><i class="icon3 icon-notPassed"></i>未通过</span>
            </div>
            <!--未通过时（显示）驳回的意见 -->
            <div v-if="reviewState==4" class="publicList">
              <label>驳回意见：</label>
                        <span>
                          <textarea class="realName-textarea" disabled>{{serviceInfo.reviewSuggest}}</textarea>
                        </span>
            </div>
          </div>
          <div class="deleteListCon">
            <div class="publicTitle"><i class="lineBlue"></i>联系人信息</div>
            <div class="publicList">
              <label>联系人姓名：</label>
              <span>{{serviceInfo.contactName}}</span>
            </div>
            <div class="publicList">
              <label>联系人电话：</label>
              <span>{{serviceInfo.contactTel}}</span>
            </div>
          </div>
          <div class="deleteListCon">
            <div class="publicTitle"><i class="lineBlue"></i>服务接入信息</div>
            <div class="publicList">
              <label>服务名称：</label>
              <span>{{serviceInfo.serviceName}}</span>
            </div>
            <div class="publicList clearfix">
              <label class="fl">接入方式及链接地址：</label>
            				<span class="fl">
            					<p v-for="(item ,index) in serviceInfo.serviceUrl"><em>{{item.split('_')[0]}}：</em><b class="description" style="width: 456px;">{{item.split('_')[1]}}</b></p>
            				</span>
            </div>
            <div class="publicList">
              <label>服务类型：</label>
              <span>{{serviceInfo.serviceType==1?'业务查询':(serviceInfo.serviceType==2?'业务办理':'业务预约')}}</span>
            </div>
            <div ref="region" class="publicList clearfix" style="display: none">
              <label class="fl">服务范围：</label>
              <span class="fl" v-if="isAll">
                <el-tree
                  :data="regionCode"
                  node-key="code"
                  ref="tree"
                  highlight-current
                  :filter-node-method="filterNode"
                  :props="defaultProps">
                </el-tree>
              </span>
              <span v-else>全国</span>
            </div>
          </div>
          <div class="deleteListCon">
            <div class="publicTitle"><i class="lineBlue"></i>服务其他补充信息</div>
            <div class="publicList">
              <label>服务LOGO：</label>
              <!--<span  class="uploaLlogoImg"><img :src="serviceInfo.logo?'http://localhost:3001'+serviceInfo.logo:''"></span>-->
              <span  class="uploadLogoImg"><img :src="serviceInfo.logo?serviceInfo.logo:''"></span>
            </div>
            <div class="publicList">
              <label>服务用户手册：</label>
              <span @click="download(serviceInfo.guide)"><b class="description linkHover">{{serviceInfo.guide?serviceInfo.guide.substr(serviceInfo.guide.lastIndexOf('/')+1,serviceInfo.guide.length):''}}</b></span>
            </div>
            <div class="publicList">
              <label>服务源的测试报告：</label>
              <span @click="download(serviceInfo.testReport)"><b class="description linkHover">{{serviceInfo.testReport?serviceInfo.testReport.substr(serviceInfo.testReport.lastIndexOf('/')+1,serviceInfo.testReport.length):''}}</b></span>
            </div>
            <div class="publicList">
              <label>服务使用过程中是否需要支付：</label>
              <span>{{serviceInfo.isPay==true?'是':'否'}}</span>
            </div>
            <div class="publicList">
              <label>是否需要登录：</label>
              <span>{{serviceInfo.isLogin==true?'是':'否'}}</span>
            </div>
            <div class="publicList">
              <label>服务接入方式：</label>
              <span>{{serviceInfo.joinType==1?'服务内嵌方式':(serviceInfo.joinType==2?'服务封装方式':'服务采集方式')}}</span>
            </div>
            <div class="publicList">
              <label>服务接入事项描述：</label>
              <span><b class="description">{{serviceInfo.describe}}</b></span>
            </div>
          </div>
          <div class="deleteListCon">
            <div class="publicTitle"><i class="lineBlue"></i>服务主管部门</div>
            <div class="publicList">
              <label>单位名称：</label>
              <span>{{serviceInfo.company}}</span>
            </div>
            <div class="publicList">
              <label>通讯地址：</label>
              <span>{{serviceInfo.address}}</span>
            </div>
          </div>
        </div>
        <!--内容信息 end-->
        <!--按钮 start-->
        <div v-if="reviewState==1" class="btnBgBox">
          <button class="btn-defalut btn-blue" @click="changeApply(true)">审核通过</button>
          <button class="btn-defalut btn-white" @click="cancelApply()">驳回</button>
        </div>
        <!--按钮 end-->
        <div v-if="isReviewSuggest" class="mask"></div>
        <div v-if="isReviewSuggest" class="dialog-container add-catalog-dialog">
          <div class="dialog-inner">
            <header class="dialog-header">
              <div class="dialog-header-tit flt">驳回意见</div>
              <div class="icon3 dialog-header-close frt" @click="closeReviewSuggest()"></div>
            </header>
            <div class="dialog-body">
              <div class="textareaDivBox">
                <textarea v-model="reviewSuggest" placeholder="请输入您的驳回意见" maxlength="200" @blur="inputBlur()"></textarea>
              </div>
              <div class="error-tips-box other describeTips">&nbsp;&nbsp;{{reviewSuggestTips}}</div>

            </div>
            <footer class="dialog-footer">
              <ul class="btn-list">
                <li class="btn-item btn-item-acvite" @click="changeApply()">提  交</li>
                <li class="btn-item" @click="closeReviewSuggest()">取  消</li>
              </ul>
            </footer></div>
        </div>
      </div>
    </div>
    <MaskTip v-bind:tips = "tips"
             v-bind:tipsContent = "tipsContent"
             v-bind:ifSuccess = "ifSuccess"
             v-bind:loading = "loading">
    </MaskTip>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios';
  import {regionCode} from '@/config/regionCode';
  import {mapGetters} from 'vuex';
  import  MaskTip from '@/views/module/mask';
  export default {
    data() {
      return {
        regionCode: regionCode,
        defaultProps: {
          children: 'regionEntitys',
          label: 'region'
        },
        idNumber: this.$route.query.idNumber,
        reviewState: this.$route.query.reviewState,
        serviceInfo: '',
        isAll: true,
        tipsContent: '',
        ifSuccess: true,
        tips: false,
        loading: false,
        isReviewSuggest: false,
        reviewSuggest: '',
        reviewSuggestTips: ''
      };
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    components:{
      MaskTip
    },
    mounted(){
      this.initData();
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        let results = false;
        value.forEach((item)=> {
          results = (results || data.code.indexOf(item) !== -1)
        });
        return results;
      },
      initData(){//初始化数据
        this.isSearch = false;
       this.loading = true;
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/serviceJoin/getByID",
          async: true,
          data: {
            idNumber: this.idNumber
          },
          contentType: 'application/json'
        }).then(res=> {
          this.loading = false;
          if (res.data.msg == "success") {
            this.serviceInfo = res.data.results.dataList[0];
            this.reviewState = this.serviceInfo.reviewState;
            if (this.serviceInfo.region.indexOf("000000") > -1) {
              this.isAll = false;
            } else {
              this.$refs.tree.filter(this.serviceInfo.region);
              this.serviceInfo.region.forEach((item)=> {
                if (item.indexOf("0000") > 0) {
                  this.$refs.tree.store.nodesMap[item].expanded = false;
                }
              })
            }
            this.$refs.region.style.display = "block"
          } else {
            alert("数据加载失败")
          }
        }).catch(err=> {
          console.log(err)
        })
      },
      download(filePath){
        if (!filePath) {
          return;
        }
        window.location.href = filePath
      },
      cancelApply(){
        this.isReviewSuggest = true;
      },
      closeReviewSuggest(){
        this.reviewSuggest = '';
        this.reviewSuggestTips = '';
        this.isReviewSuggest = false;
      },
      inputBlur(){
        if (!this.reviewSuggest.trim()) {
          this.reviewSuggestTips = "请输入驳回意见"
        } else {
          this.reviewSuggestTips = "";
        }
      },
      changeApply(isPass){
        let modifyField, tipsContent;
        if(isPass){
          modifyField = {reviewState: 3, reviewSuggest: ""};
          tipsContent = "已通过";
        }else{
          this.inputBlur();
          if(this.reviewSuggestTips){
            return;
          }
          modifyField = {reviewState: 4, reviewSuggest: this.reviewSuggest};
          tipsContent = "已驳回";
        }
        this.loading = true;
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/serviceJoin/modifyService",
          async: true,
          data: {
            query: {idNumber: this.idNumber},
            modifyField: modifyField
          },
          contentType: 'application/json'
        }).then(res=> {
          this.loading = false;
          if (res.data.code == 200) {
            this.closeReviewSuggest();
            this.tips = true;
            this.tipsContent = tipsContent;
            this.ifSuccess = true;
            setTimeout(() => {
              this.tips = false;
              this.$router.push({
                path: '/serviceJoin',
                name: "serviceJoin"
              })
//              this.reviewState = modifyField.reviewState;
            }, 1500);
          } else {
            this.tips = true;
            this.tipsContent = "提交失败";
            this.ifSuccess = false;
            setTimeout(() => {
              this.tips = false;
            }, 1500);
          }
        }).catch(err=> {
          console.log(err)
        })
      },
      renderTo(){
        this.$router.push({
          path: '/home/serviceJoin'
        })
      }
    }
  };
</script>
<style>
  .uploadLogoImg img{
    max-width: 200px;
    max-height:150px;
  }
  .publicList span .el-tree{
  	margin-top: 13px;
  }
  .el-tree-node__content > .el-icon-caret-right {
    width: 10px
  }
  .publicList span p{
    color: #57677e;
    font-size: 14px;
    line-height: 52px;
  }
  .description{
  	line-height: 25px;
    display: inline-block;
    margin-top: 13px;
  }
  .linkHover:hover{
  	text-decoration: underline;
  	cursor: pointer;
  	color: #00c3f5;
  }
</style>
