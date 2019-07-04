<template><div>
  <div class="content">
    <!--位置信息 start-->
    <div class="bread-crumbs">
      <div class="bread-crumbs-content">
        <span class="cor-0498e4">系统管理</span>
        <span class="locationgLine">&frasl;</span>
        <span class="cor-0498e4 cor-pointer" @click="renderTo('systemManage')">后台用户管理</span>
        <span class="locationgLine">&frasl;</span>
        <span class="corBlue">编辑用户</span>
      </div>
    </div>
    <!--位置信息 end-->
    <div class="rm-main-box">
      <!--内容信息 start-->
      <div class="deleteCon systemUser">
        <div class="deleteListCon">
          <div class="publicTitle"><i class="lineBlue"></i>用户信息</div>
          <div class="publicList">
            <label>用户名：</label>
            <span>{{userInfo.userName}}</span>
            <!--<input type="text" placeholder="请输入用户名" :value="userInfo.userName" disabled/>-->
          </div>
          <!--<div class="publicList">-->
            <!--<label>设置密码：</label>-->
            <!--<input type="password" placeholder="请输入密码" v-model="rules.password.value" @blur="inputBlur('password')" />-->
            <!--<div class="error-tips-box other">{{rules.password.errorTip}}</div>-->
          <!--</div>-->
          <!--<div class="publicList">-->
            <!--<label>确认密码：</label>-->
            <!--<input type="password" placeholder="请输入确认密码" v-model="rules.confirmPass.value" @blur="inputBlur('confirmPass')" />-->
            <!--<div class="error-tips-box other">{{rules.confirmPass.errorTip}}</div>-->
          <!--</div>-->
          <div class="publicList">
            <label>姓名：</label>
            <input type="text" placeholder="请输入姓名" v-model="rules.name.value" @blur="inputBlur('name')" />
            <div class="error-tips-box other">{{rules.name.errorTip}}</div>
          </div>
          <div class="publicList">
            <label>手机号码：</label>
            <input type="text" placeholder="请输入手机号码" v-model="rules.mobile.value" @blur="inputBlur('mobile')" />
            <div class="error-tips-box other">{{rules.mobile.errorTip}}</div>
          </div>
          <div class="publicList">
            <label>电子邮箱：</label>
            <input type="text" placeholder="请输入电子邮箱" v-model="rules.email.value" @blur="inputBlur('email')" />
            <div class="error-tips-box other">{{rules.email.errorTip}}</div>
          </div>
        </div>
        <div class="deleteListCon">
          <div class="publicTitle"><i class="lineBlue"></i>权限设置</div>
          <div class="publicList sp-liclist">
            <label class="flt">权限设置：</label>
            <div class="flt clearfix">
              <div class="permissionSettings flt">
                <div class="perTit">
                  <input type="text" placeholder="关键字" v-model="filterText">
                  <i class="icon3 icon-search"></i>
                </div>
                <div class="permissionBox">
                  <div class="permissionMenu">
                    <el-tree
                      :data="menuArr"
                      show-checkbox
                      node-key="id"
                      ref="tree1"
                      highlight-current
                      :filter-node-method="filterNode"
                      :props="defaultProps">
                    </el-tree>
                  </div>
                </div>
              </div>
              <div class="btn-permission flt">
                <a href="javascript:;" @click="getCheckedNodes()">添加&nbsp;&nbsp;&gt;</a>
                <a href="javascript:;" @click="getDeleteNodes()">&lt;&nbsp;&nbsp;删除</a>
              </div>
              <div class="permissionSettings flt">
                <div class="perTit">已选择{{chooseMenuArr.length}}个服务权限</div>
                <div class="permissionBox selectedService">
                  <div ref="chooseMenu" class="permissionMenu">
                    <el-tree
                      :data="chooseMenuArr"
                      show-checkbox
                      node-key="id"
                      ref="tree2"
                      highlight-current
                      :filter-node-method="filterNode2"
                      :props="defaultProps">
                    </el-tree>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--内容信息 end-->
      <!--按钮 start-->
      <div class="btnBgBox">
        <button class="btn-defalut btn-blue" @click="submit()">保存</button>
        <button class="btn-defalut btn-white" @click="renderTo('systemManage')">取消</button>
      </div>
      <!--按钮 end-->
    </div>
    <MaskTip v-bind:tips = "tips"
             v-bind:tipsContent = "tipsContent"
             v-bind:ifSuccess = "ifSuccess"
             v-bind:loading = "loading">
    </MaskTip>
  </div>
</div></template>
<style>
  .permissionBox span{
    width: 14px !important;
  }
  .permissionBox label{
    width: 13px !important;
  }
  .el-tree__empty-text{
    display: none !important;
  }
</style>
<script type="text/ecmascript-6">
  import axios from 'axios';
  import {mapActions, mapState, mapGetters} from 'vuex';
  import  MaskTip from '@/views/module/mask';
  import {menu} from '@/config/menu';
  export default {
    data () {
      return {
        domain: '',
        userID: this.$route.query.userID,
        userInfo: {},
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        chooseMenuArr: [],
        menuArr:menu,
        menuTip: "",
        rules: {
          name:
          {required: true, value: '', errorTip: ''},
          mobile:
          {required: false, value: '',errorTip: ''},
          email:
          {required: false, value: '', errorTip: ''}
        },
        tipsContent: '',
        ifSuccess: true,
        tips: false,
        loading: false,
      }
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    components:{
      MaskTip
    },
    mounted () {
      this.getUser();
    },
    watch: {
      filterText(val) {
        this.$refs.tree1.filter(val);
      }
    },
    methods: {
      getUser(){
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/user/getUserList",
          async: true,
          data: {
            query: {userID: this.userID}
          },
          contentType: 'application/json'
        }).then(res=> {
          if (res.data.code == 200) {
            this.userInfo = res.data.results.dataList[0];
            this.rules.name.value = this.userInfo.name || '';
            this.rules.mobile.value = this.userInfo.mobile || '';
            this.rules.email.value = this.userInfo.email || '';
            this.chooseMenuArr = this.userInfo.permission || [];
          } else {
            alert("数据加载失败")
          }
        }).catch(err=> {
          console.log(err)
        })
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      filterNode2(value, data) {
        if (!value) return true;
        let results = false;
        value.forEach((item)=> {
          results = (results || data.id == item)
        });
        return results;
      },
      getCheckedNodes() {
        if(this.$refs.tree1.getCheckedNodes().length < 1){
          return;
        }
        let chooseMenuArr = [];
        let checkArr = this.$refs.tree1.getCheckedNodes();
        for(let i = 0; i < checkArr.length; i++){
          if(checkArr[i].level == 1){
            chooseMenuArr.push(checkArr[i])
          }
        }
        for(let i = 0; i < checkArr.length; i++){
          if(checkArr[i].level == 2){
            let parentID = checkArr[i].id.split("_")[0];
            let parent;
            for(let j = 0; j < chooseMenuArr.length; j++){
              if(chooseMenuArr[j].id == parentID){
                parent = chooseMenuArr[j];
              }
            }
            if(!parent){
              let _parent = this.menuArr[this.menuArr.findIndex(d => d.id === parentID)];
              parent = {
                id: _parent.id,
                name: _parent.name,
                level: _parent.level,
                children: [],
              }
              parent.children.push(checkArr[i])
              chooseMenuArr.push(parent)
            }
          }
        }
        this.chooseMenuArr = chooseMenuArr;
      },
      getDeleteNodes(){
        if(this.$refs.tree2.getCheckedNodes().length < 1){
          return;
        }
        let checkArr = this.$refs.tree2.getCheckedNodes();
        for(let i = 0; i < checkArr.length; i++){
          if(checkArr[i].level == 1){
            this.chooseMenuArr.splice(this.chooseMenuArr.findIndex(d => d.id === checkArr[i].id), 1)
          }
        }
        for(let i = 0; i < checkArr.length; i++){
          if(checkArr[i].level == 2){
            let parentID = checkArr[i].id.split("_")[0];
            let parent = this.chooseMenuArr[this.chooseMenuArr.findIndex(d => d.id === parentID)]
            if(parent){
              if(parent.children.length > 1){
                let childID = parent.children.findIndex(d => d.id === checkArr[i].id)
                this.chooseMenuArr[this.chooseMenuArr.findIndex(d => d.id === parentID)].children.splice(childID, 1)
              }else{
                this.chooseMenuArr.splice(parentID, 1)
              }
            }
          }
        }
      },
      inputBlur(inputName){
        if(inputName == "name"){
          if(!this.rules.name.value.trim()){
            this.rules.name.errorTip = "姓名不能为空";
            return;
          }
          if(this.rules.name.value.trim().length < 2 || this.rules.name.value.trim().length > 10){
            this.rules.name.errorTip = "请输入2-10个字符";
          }else{
            this.rules.name.errorTip = "";
          }
        }
        if(inputName == "mobile"){
          if(!this.rules.mobile.value.trim()){
            this.rules.mobile.errorTip = "";
            return;
          }
          const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
          if(!reg.test(this.rules.mobile.value.trim())){
            this.rules.mobile.errorTip = "请输入正确的手机号";
          }else{
            this.rules.mobile.errorTip = "";
          }
        }
        if(inputName == "email"){
          if(!this.rules.email.value.trim()){
            this.rules.email.errorTip = "";
            return;
          }
          const reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
          if(!reg.test(this.rules.email.value.trim())){
            this.rules.email.errorTip = "请输入正确的电子邮箱";
          }else{
            this.rules.email.errorTip = "";
          }
        }
      },
      up(x,y){
        return x.id-y.id
      },
      submit(){
        this.inputBlur("name");
        this.inputBlur("mobile");
        this.inputBlur("email");
        if (this.rules.name.errorTip || this.rules.mobile.errorTip || this.rules.email.errorTip) {
          return;
        }
        if(this.chooseMenuArr.length < 1){
          this.tips = true;
          this.tipsContent = "请对用户进行权限设置";
          this.ifSuccess = false;
          setTimeout(() => {
            this.tips = false;
          }, 3000);
          return;
        }
        const data = {
          name: this.rules.name.value,
          mobile: this.rules.mobile.value,
          email: this.rules.email.value,
          permission: this.chooseMenuArr.sort(this.up)
        };
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/user/modifyUser",
          async: true,
          data: {query:{userID: this.userID},
          modify: data},
          contentType: 'application/json'
        }).then(res=> {
          if (res.data.code == 200) {
            this.tips = true;
            this.tipsContent = "修改用户成功";
            this.ifSuccess = true;
            setTimeout(() => {
              this.tips = false;
              this.$router.push({
                path: '/systemManage',
                name: "systemManage"
              })
            }, 3000)
          } else {
            this.tips = true;
            this.tipsContent = "修改用户失败";
            this.ifSuccess = false;
            setTimeout(() => {
              this.tips = false;
            }, 3000);
          }
        }).catch(err=> {
          console.log(err)
        })
      },
      renderTo(pageName){
        this.$router.push({
          path: '/' + pageName,
          name: pageName,
        })
      }
    }
  };
</script>
