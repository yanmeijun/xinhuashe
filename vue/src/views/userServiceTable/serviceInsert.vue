<template>
  <div class="templateManage content">
    <!--位置信息 start-->
    <div class="bread-crumbs">
      <div class="bread-crumbs-content">
        <span class="cor-0498e4" @click="back">返回服务列表页面</span>
      </div>
    </div>
    <!--位置信息 end-->
    <div class="rm-main-box">
      <div class="deleteListCon">
        <div class="publicTitle">
          <i class="lineBlue"></i>服务列表
        </div>
        <div class="publicList">
          <label>服务名称：</label>
          <input type="text" placeholder="请输入服务名称" v-model="serviceInfo.serviceName">
          <div class="error-tips-box" v-if="errInfo.serviceName">不能为空</div>
        </div>
        <div class="publicList" v-if="!serviceID">
          <label>服务编号：</label>
          <input type="text" placeholder="请输入服务编号" v-model="serviceInfo.serviceID">
          <div class="error-tips-box" v-if="errInfo.serviceID">不能为空</div>
        </div>
        <div class="publicList">
          <label>templateID：</label>
          <input type="text" placeholder="请输入templateID" v-model="serviceInfo.templateID">
          <div class="error-tips-box" v-if="errInfo.serviceID">不能为空</div>
        </div>
        <div class="publicList">
          <label style="float: left;">服务范围：</label>
          <div id="treeChecked" style="float: left;display: none">
            <el-tree
              :data="regionCode"
              node-key="code"
              ref="checkedTree"
              highlight-current
              :filter-node-method="filterNode"
              :props="defaultProps"
              style="display: inline-block;width: 250px;">
            </el-tree>
            <a href="javascript:void(0)" @click="editCity"
               style="cursor: pointer;
               color: #333;
               border: 1px solid rgb(153, 153, 153);
               background-color: rgb(237, 237, 237);
               vertical-align: top;"> &nbsp;&nbsp;修改&nbsp;&nbsp;</a>
          </div>
          <div id="treeEdit" style="float: left;display: block">
            <el-tree
              :data="regionCode"
              show-checkbox
              node-key="code"
              ref="tree"
              highlight-current
              :default-checked-keys="region"
              :props="defaultProps">
            </el-tree>
          </div>
          <div class="error-tips-box" v-if="errInfo.city" style="position: relative">不能为空</div>
        </div>
        <div class="publicList">
          <label>服务简介：</label>
          <input type="text" placeholder="请输入服务简介" v-model="serviceInfo.summary">
          <div class="error-tips-box" v-if="errInfo.summary">不能为空</div>
        </div>
        <div class="publicList">
          <label>服务logo：</label>
          <img v-if="imgURL" :src="imgURL" alt="" style="max-width: 100px;max-height: 100px;">
          <input type="file" style="border: 0px !important;"
                 accept="image/*;capture=camera" @change="imgChange($event)">
          <div class="error-tips-box" v-if="errInfo.logo">不能为空</div>
        </div>
        <div class="publicList">
          <label>服务热门logo：</label>
          <img v-if="imgURL_hot" :src="imgURL_hot" alt="" style="max-width: 100px;max-height: 100px;">
          <input type="file" style="border: 0px !important;"
                 accept="image/*;capture=camera" @change="imgChange_hot($event)">
          <div class="error-tips-box" v-if="errInfo.HotLogo">不能为空</div>
        </div>
        <div class="publicList">
          <label>index：</label>
          <input type="text" placeholder="请输入index" v-model="serviceInfo.index">
          <div class="error-tips-box" v-if="errInfo.index">不能为空</div>
        </div>
        <div class="publicList">
          <label>url：</label>
          <input type="text" placeholder="请输入url" v-model="serviceInfo.url">
          <div class="error-tips-box" v-if="errInfo.url">不能为空</div>
        </div>
        <div class="publicList">
          <label>localFrom：</label>
          <div @click="statusList($event)" class="select-box result_select" style="display: inline-block;width: 512px;">
            <span class="defaul_option">{{serviceInfo.localFrom}}</span>
            <i class="icon4 icon-downMenu" style="margin-top: -21px;"></i>
            <ul v-if="statusListShow"
                @click="chooseStatus($event)"
                style="width: 520px;"
                @click.stop>
              <!--<li>xinhuashe_app</li>-->
              <li>ucap_web</li>
              <li>ucap_weChat</li>
              <!--<li>sichuan_app</li>-->
            </ul>
          </div>
          <div class="error-tips-box" v-if="errInfo.localFrom">不能为空</div>
        </div>

        <div class="publicList">
          <label>online：</label>
          <input type="radio" name="online" v-model="serviceInfo.online" value="true" style="width: 20px !important;
                position: relative;
                margin-top: 10px;
                opacity: 1;">
          <label>是</label>
          <input type="radio" name="online" v-model="serviceInfo.online" value="false" style="width: 20px !important;
                position: relative;
                margin-top: 10px;
                opacity: 1;">
          <label>否</label>
          <div class="error-tips-box" v-if="errInfo.online">不能为空</div>
        </div>
      </div>
      <div class="btnBgBox">
        <button class="btn-defalut btn-blue" @click="confirm()">提交</button>
      </div>
    </div>
    <MaskTip v-bind:tips = "tips"
             v-bind:tipsContent = "tipsContent"
             v-bind:ifSuccess = "ifSuccess"
             v-bind:loading="loading"></MaskTip>
  </div>
</template>
<style scoped>
  .publicList input {
    width: 512px !important;
    height: 32px !important;
    line-height: 32px !important;
    border: 1px solid #d5dde6 !important;
    border-radius: 2px !important;
    background: #fff !important;
    box-sizing: content-box;
    padding: 0 0 0 10px !important;
  }

</style>
<style>
  .el-tree-node__content > .el-checkbox {
    width: 10px
  }
</style>
<script type="text/ecmascript-6">
  import axios from 'axios';
  import MaskTip from '@/views/module/mask';
  import {shengShiCode} from '@/config/shengShiCode';
  export default{
    data(){
      return {
        serviceID: this.$route.query.serviceID,
        localFrom: this.$route.query.localFrom,
        serviceInfo: {},
        errInfo: {},
        tipsContent: '',
        ifSuccess: true,
        tips: false,
        loading: false,
        statusListShow: false,
        item: ['serviceName', 'serviceID', 'logo', 'url', 'summary', 'localFrom'],
        formData: new FormData(),
        formData_hot: new FormData(),
        logoKey: 'logoKey' + Math.random().toString(36).substr(2),
        hotLogoKey: 'hotLogoKey' + Math.random().toString(36).substr(2),
        regionCode: shengShiCode,//全国各地区行政编码
        defaultProps: {
          children: 'regionEntitys',
          label: 'region'
        },
        region: [],
        imgURL: '',
        imgURL_hot: '',
      }
    },
    components: {
      MaskTip
    },
    methods: {
      imgChange(e){
        let file = e.target.files[0];
        this.formData = new FormData();
        this.formData.append('file', file, file.name);
        axios.post("/userService/upload/" + this.logoKey, this.formData, {
          headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => {
          if (res.data.code == 200) {
            this.serviceInfo.logo = res.data.filePath;
            if (window.createObjectURL != undefined) { // basic
              this.imgURL = window.createObjectURL(file);
            } else if (window.URL != undefined) { // mozilla(firefox)
              this.imgURL = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // webkit or chrome
              this.imgURL = window.webkitURL.createObjectURL(file);
            }
          }
        })
      },
      imgChange_hot(e){
        let file = e.target.files[0];
        this.formData_hot = new FormData();
        this.formData_hot.append('file', file, file.name);
        axios.post("/userService/upload/" + this.hotLogoKey, this.formData_hot, {
          headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => {
          if (res.data.code == 200) {
            this.serviceInfo.hotLogo = res.data.filePath;
            if (window.createObjectURL != undefined) { // basic
              this.imgURL_hot = window.createObjectURL(file);
            } else if (window.URL != undefined) { // mozilla(firefox)
              this.imgURL_hot = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // webkit or chrome
              this.imgURL_hot = window.webkitURL.createObjectURL(file);
            }
          }
        })
      },
      editCity(){
        document.getElementById("treeChecked").style.display = "none"
        document.getElementById("treeEdit").style.display = "block"
      },
      filterNode(value, data) {
        if (!value) return true;
        let results = false;
        value.forEach((item)=> {
          results = (results || data.code.indexOf(item) !== -1)
        });
        return results;
      },
      getServiceInfo(){
        this.loading = true;
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/userService/getServiceList",
          async: true,
          data: {query: {serviceID: this.serviceID, localFrom: this.localFrom}},
          contentType: 'application/json'
        }).then(res=> {
          this.loading = false;
          if (res.data.code == 200) {
            this.serviceInfo = res.data.results.dataList[0];
            this.imgURL = this.serviceInfo.logo;
            this.imgURL_hot = this.serviceInfo.hotLogo;
            if(this.serviceInfo.city == 'all'){
              this.region = ['000000']
            }else{
              this.region = this.serviceInfo.city.split(',')
              this.$refs.checkedTree.filter(this.region);
              this.$refs.checkedTree.store.nodesMap['000000'].expanded = false;
            }

          } else {
            alert("数据加载失败")
          }
        }).catch(err=> {
          console.log(err)
        })
      },
      statusList(e) { //查询时，运行状态选择点击事件
        e = e || event;
        e.cancelBubble = true;
        this.statusListShow = this.statusListShow ? this.statusListShow = false : this.statusListShow = true
      },
      chooseStatus(e) { //查询时，运行状态选择点击事件
        this.serviceInfo.localFrom = e.target.innerHTML;
        this.statusListShow = false;
      },
      /*点击其他触发下拉框消失*/
      handleSelect() {
        this.statusListShow = false;
      },
      back(){
        this.$router.push({
          path: '/userServiceTable',
          name: "userServiceTable"
        })
      },
      confirm(){
        this.errInfo = {};
        let err = 0;
        for (let i = 0; i < this.item.length; i++) {
          if (!this.serviceInfo[this.item[i]]) {
            this.errInfo[this.item[i]] = true;
            err++;
          }
        }
//        this.region = this.$refs.tree.getCheckedKeys().length > 0 ? this.$refs.tree.getCheckedKeys() : this.region;
        if(this.$refs.tree.getCheckedKeys().length > 0){
          this.region=[];
          if(this.$refs.tree.getCheckedKeys().join(",").indexOf("000000") > -1){
            this.region = ["000000"]
          }else{
            let checkedKeys = this.$refs.tree.getCheckedKeys();
            for(let i in checkedKeys){
              if(checkedKeys[i].indexOf("0000") > -1){
                this.region.push(checkedKeys[i]);
                checkedKeys.splice(i, 1);
              }
            }
            for(let i in checkedKeys){
              let item = checkedKeys[i].substr(0, 2) + "0000";
              if(this.region.join(",").indexOf(item) < 0){
                this.region.push(checkedKeys[i]);
              }
            }
          }
        }
        if (this.region.length < 1) {
          this.errInfo.city = true;
          return;
        }
        if (err > 0) {
          return;
        }
        let data = {}, url;
        this.serviceInfo.online == "true" ? this.serviceInfo.online = true : "";
        this.serviceInfo.online == "false" ? this.serviceInfo.online = false : "";
//        this.serviceInfo.city = this.region.length == 3509 ? "all" : this.region.join(",");
        if(this.region.length == 3509 || this.region[0] == "000000"){
          this.serviceInfo.city = "all";
        }else{
          this.serviceInfo.city = this.region.join(",");
        }
        /*新增字段*/
        this.serviceInfo.openID = "ucap";
        this.serviceInfo.serviceType = 2;
        this.serviceInfo.useFor = this.serviceInfo.localFrom.split("_")[1];
        this.serviceInfo.useForAddress = "";

        if (this.serviceID) {
          data = {
            serviceID: this.serviceID,
            localFrom: this.localFrom,
            modifyFields: this.serviceInfo
          };
          url = "/userService/modifyService";
        } else {
          data = this.serviceInfo;
          url = "/userService/addService";
        }
        this.loading = true;
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: url,
          async: true,
          data: data,
          contentType: 'application/json'
        }).then(res=> {
          this.loading = false;
          if (res.data.code == 200) {
//            alert("提交成功！")
            this.tips = true;
            this.tipsContent = "提交成功！";
            this.ifSuccess = true;
            setTimeout(() => {
              this.tips = false;
              this.$router.push({
                path: '/userServiceTable',
                name: "userServiceTable"
              })
            }, 1500);
          }else if(res.data.code == 500 && res.data.msg == 'exist'){
            alert("该服务已存在！")
          } else {
            alert("提交失败，请重试")
          }
        }).catch(err=> {
          console.log(err)
        })
      }
    },
    mounted(){
      window.addEventListener('click', this.handleSelect);
      if (this.serviceID) {
        this.getServiceInfo();
        document.getElementById("treeChecked").style.display = "block"
        document.getElementById("treeEdit").style.display = "none"
      }
    }
  }
</script>
