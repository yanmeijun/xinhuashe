<template>
  <div id="templateManage" class="templateManage content">
    <div class="bread-crumbs">
      <div class="bread-crumbs-content">
        <span class="cor-0498e4">服务模板管理</span>
        <span class="locationgLine">&frasl;</span>
        <span class="corBlue">服务模板管理列表</span>
      </div>
    </div>
    <router-view @delAll="delAllfn" @openAddTemplate="openAddTemp" @modifyTemplate="modifyTemplate" @startUse='startUse' @on-success="succDialog" @on-fail="failDialog" @stopUse='stopUse' @delTemplate="delTemplate" startUse="startUse" stopUse="stopUse" ref="manage"></router-view>
    <add-template ref="add" :modifyID="modifyID" :isShow="isShowAddDialog" @on-success="startOneSucc" @on-fail="failDialog"  @on-close="closeDialog('isShowAddDialog')"></add-template>
    <start-use :datas='startOne' :isShow="isStartUseDialog" @on-success="startOneSucc" @on-fail="failDialog" @on-close="closeDialog('isStartUseDialog')"></start-use>
    <stop-use :datas='stopOne' :isShow="isStopUseDialog" @on-success="stopOneSucc" @on-fail="failDialog" @on-close="closeDialog('isStopUseDialog')"></stop-use>
    <del-tem :datas='delOne' :isShow="isDelTemDialog" @on-success="stopOneSucc" @on-fail="failDialog"  @on-close="closeDialog('isDelTemDialog')"></del-tem>
    <del-all :datas='delAll' :isShow="isDelAllDialog" @on-success="stopOneSucc" @on-fail="failDialog"  @on-close="closeDialog('isDelAllDialog')"></del-all>
    <div class="mask" v-show="isShowAddDialog || isStartUseDialog || isStopUseDialog || isDelTemDialog ||isDelAllDialog"></div>
    <!--操作失败-->
    <div class="failedBox" v-if="submitErr">
      <i class="icon4 icon-failed"></i>
      {{submitErrText}}
    </div>
    <!--操作成功-->
    <div class="failedBox successBox" v-if="submitOK">
      <i class="icon4 icon-success"></i>
      操作成功
    </div>
  </div>
</template>
<script >
  import manage from '@/views/template/manage';
  import addTemplate from './add'
  import startUse from './startUse'
  import stopUse from './stopUse'
  import delTem from './delTem'
  import delALL from './delALL'
  export default{
    name:'templateIndex',
    data(){
      return {
        user:'',
        pass:'',
        isShowAddDialog: false,
        isStartUseDialog: false,
        isStopUseDialog: false,
        isDelTemDialog: false,
        isDelAllDialog: false,
        startOne:{},
        stopOne:{},
        delOne:{},
        delAll:{},
        modifyID:'',
        submitErr: false,
        submitOK: false,
        submitErrText: "操作失败"
      }
    },
    computed:{
    },
    components: {
      manage,
      'add-template': addTemplate,
      'start-use': startUse,
      'stop-use': stopUse,
      'del-tem': delTem,
      'del-all': delALL
    },
    created(){

    },
    methods:{
      closeDialog (attr) {//关闭弹框
        this[attr] = false
      },
      onSuccessLog (data) { //新增成功之后，触发这个事件
        console.log('data' + data);
      },
      openAddTemp(){
        this.modifyID="";
        this.isShowAddDialog = true;
      },
      modifyTemplate(id){
        this.isShowAddDialog = true;
        this.modifyID=id;
        this.$refs.add.getTemplate(id);
      },
      startUse(data){
        this.startOne=data;
         this.isStartUseDialog = true;
      },
      stopUse(data){
        this.stopOne=data;
        this.isStopUseDialog = true;
      },
      delTemplate(data){
        this.delOne=data;
        this.isDelTemDialog = true;
      },
      delAllfn(data){
        this.delAll=data;
        this.isDelAllDialog = true;
      },
      startOneSucc(){
        this.getData=true;
        this. succDialog();
        this.$refs.manage.getData();
      },
      stopOneSucc(errMsg){
        this.getData=true;
        this. succDialog();
        this.$refs.manage.getData();
      },
      failDialog(errTxt){
        this.submitErrText=errTxt;
        this.submitErr=true;
        setTimeout(() => {
          this.submitErr = false;
        }, 1500);
      },
      succDialog(){
        this.submitOK=true;
        setTimeout(() => {
          this.submitOK = false;
        }, 1500);
      }
    }
  }
</script>
<style>
</style>
