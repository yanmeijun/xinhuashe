<template>
  <div class="dialog-container add-catalog-dialog"   v-if="isShow" >
     <div class="dialog-inner" :class="{'publicAddModify':modifyStatus,'dialog-AddServiceTemplate':!modifyStatus}">
        <header class="dialog-header">
            <div class="dialog-header-tit flt">{{modifyStatus?'修改服务模板':'新增服务模板'}}</div>
            <div class="icon3 dialog-header-close frt"  @click="closeMyself"></div>
        </header>
       <div class="dialog-body">
         <form ref="ruleForm">
           <div class="sy-publish-dialog-content serviceTemplate clearfix el-row" v-if="modifyStatus">
             <div class="el-form-item dl">
               <label for="id" class="el-form-item__label" style="width: 100px;">模板ID</label>
               <div class="el-form-item__content" style="margin-left: 100px;">
                 <div class="el-input">
                   <input type="text" v-model="ruleForm.id" autocomplete="off" class="el-input__inner" disabled="disabled">
                 </div>
               </div>
             </div>
             <div class="el-form-item dl">
               <label for="name" class="el-form-item__label" style="width: 100px;">模板名称</label>
               <div class="el-form-item__content" style="margin-left: 100px;">
                 <div class="el-input">
                   <input type="text" v-model="ruleForm.name" autocomplete="off" class="el-input__inner" disabled="disabled">
                 </div>
               </div>
             </div>
           </div>
           <div class="el-form-item editBox" style="height:320px;">
             <div class="editor" style="height:100%">
               <div class="el-textarea" style="height:100%">
                 <textarea v-model="ruleForm.content" class="textarea__inner" :class="{'bc':checkFlag}" style="outline: none;resize: none"></textarea>
                 <span v-if="checkFlag" class="warn">{{checkMsg}}</span>
               </div>
             </div>
           </div>
         </form>
        <footer class="dialog-footer">
           <ul class="btn-list">
               <li class="btn-item"  @click="closeMyself()">取&nbsp;&nbsp;消</li>
               <li class="btn-item" @click="resetForm('ruleForm')">重&nbsp;&nbsp;置</li>
             <li class="btn-item saveMenu">
               <a href="javascript:;" class="save"><span  @click="submitForm('ruleForm')">{{isQY?'保存并启用':'保&nbsp;&nbsp;存'}}</span><span class="line frt" ><i class="icon header-user-icon" @click.stop="useFlagfn"></i></span></a>
               <a href="javascript:;" class="saveEnable"  @click="chooseQY" v-show='useFlag'>{{isQY?'保&nbsp;&nbsp;存':'保存并启用'}}</a>
             </li>
           </ul>
       </footer>
      <!--</el-form>-->
   </div>
    </div>
    <div class="masktime" id="masktime" v-if="masktime">{{masktime}}</div>
  </div>
</template>

<script>
  import {mapActions, mapState,mapGetters} from 'vuex';
  export default {
    props: {
       isShow: {
         'type': Boolean,
         'default': false
       },
      modifyID: {
        'type': String,
        'default': ""
      }
     },
    data() {
      let validateID = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('模板ID不能为空'));
          }else{
            let reg = /^[0-9a-zA-Z]+$/;
            if(!reg.test(value)){
              return callback(new Error('请输入字母或数字'));
            }else{
              callback();
            }
          }
        };
        let validateName = (rule, value, callback) => {
          let reg=/^[^A-Za-z_\u4E00-\u9FA5]/;
        if (!value) {
          return callback(new Error('模板名称不能为空'));
        }else if(reg.test(value)) {
          callback(new Error('请输入：字符类型（首字母非数字，特殊字符）！'))
        } else if(value.trim().length>=80){
          callback(new Error('请输入少于80个字符的模板名称！'))
        }else{
          callback();
        }
      };
        let validateContent = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('模板内容不能为空'));
        }else{
          callback();
        }
      };
      return {
        submitFlag:true,
        getData:'',
        modifyStatus:false,
        templateData:{},
        userID:'001',
        domain:'1',
        checkErr:false,
        isQY:false,
        useFlag:false,
        ruleForm: {
          id:'',
          name: '',
          content:'',
          status:'0',
          task:'0',
          newID:'',
        },
        checkFlag:false,
        checkMsg:'',
        masktime:''
        }

    },
    computed:{
      ...mapGetters(['getUserInfo']),
    },
    components:{

    },
    created(){
      let getUserInfo;
      if(this.getUserInfo){
        if(typeof this.getUserInfo == 'string'){
          getUserInfo = JSON.parse(this.getUserInfo);
        }else{
          getUserInfo = this.getUserInfo;
        }
      }
      this.userID=getUserInfo.userID;
      this.domain=getUserInfo.domain;
      //如果是新增页面，模板名称及模板id隐藏
    },
    methods: {
      useFlagfn(){
        this.useFlag=!this.useFlag;
      },
      chooseQY(){
        this.useFlag=!this.useFlag;
        this.isQY=! this.isQY;
      },
      toDou(n){
        return n<10?'0'+n:''+n;
      },
      timeToString(d){
          let date = d;
          let Y = date.getFullYear() + '-';
          let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          let D = this.toDou(date.getDate()) + ' ';
          let h = this.toDou(date.getHours()) + ':';
          let m = this.toDou(date.getMinutes()) + ':';
          let s = this.toDou(date.getSeconds());
          return Y+M+D+h+m+s;
      },
      getTask(str){ //提取task数据
         let parser=new DOMParser();
         let xmlDoc=parser.parseFromString(str,"text/xml");
         let tasks = xmlDoc.getElementsByTagName('task');
         let service = xmlDoc.getElementsByTagName('service').item(0);

        if(xmlDoc.length==0 || tasks.length==0){
          this.maskFn('请输入xml格式代码并包含task！');
          return false;
        }
         let serviceID=service.getAttribute('id');
         let serviceName=service.getAttribute('name');

         this.ruleForm.task=tasks.length;
         this.ruleForm.id=serviceID;
         this.ruleForm.name=serviceName;
         return true;
      },
      maskFn:function(mgs){
        this.masktime=mgs;
        setTimeout(()=>{
          this.masktime="";
        }, 1500);
        return;
      },
      checkForm(){
        if (!this.ruleForm.id) {
          return {err:true,msg:'service id不能为空'};
        }else{
          let reg = /^[0-9a-zA-Z]+$/;
          if(!reg.test(!this.ruleForm.id)){
            return {err:true,msg:'service id 请输入字母或数字'};
          }
        }
        let reg=/^[^A-Za-z_\u4E00-\u9FA5]/;
        if (!this.ruleForm.name) {
          return {err:true,msg:'service name 不能为空'};
        }else if(reg.test(this.ruleForm.name)) {
          return {err:true,msg:'service name 请输入：字符类型（首字母非数字，特殊字符）！'};
        } else if(this.ruleForm.name.trim().length>=80){
          return {err:true,msg:'service name 请输入少于80个字符的模板名称！'};
        }

        if (!this.ruleForm.content) {
          return {err:true,msg:'模板内容不能为空'};
        }
        return {err:false,msg:''};
      },
      save(formName){//新增模板，点击保存
          this.ruleForm.status='0';
          if(this.getTask(this.ruleForm.content)){
            if(this.checkForm().err){
              //表单校验有错误
              this.checkFlag=true;
              this.checkMsg=this.checkForm().msg;
            }else{
              this.checkFlag=false;
              this.checkMsg="";
              if(this.modifyStatus){
                this.modify()
              }else{
                this.sendAddInfo();
              }
            }
          }
      },
    saveAndUse(formName){   //新增模板点击保存并启用
        this.ruleForm.status='1';
      if(this.getTask(this.ruleForm.content)){
        if(this.checkForm().err){
          //表单校验有错误
          this.checkFlag=true;
          this.checkMsg=this.checkForm().msg;
        }else{
          this.checkFlag=false;
          this.checkMsg="";
          if(this.modifyStatus){
            this.modify()
          }else{
            this.sendAddInfo();
          }
        }
      }

    },
    sendAddInfo(){
         let data={
            userID:this.userID,
            domain:this.domain,
            templateID:this.ruleForm.id.trim(),
            templateName:this.ruleForm.name.trim(),
            content:this.ruleForm.content,
            startDate:this.timeToString(new Date()),
            status:this.ruleForm.status,
            apiNum:this.ruleForm.task
          };
          this.$http({
            method: 'post',
            url: '/template/addTemplate',
            data: data
          }).then((res)=>{
            let data=res.data;
            this.ruleForm.content="";
            this.ruleForm.id="";
            this.ruleForm.name="";
            this.$refs['ruleForm'].reset();
            if(!data.success){
              this.checkFlag=false;
              this.checkMsg='';
              this.$emit('on-fail',data.info);
              this.$emit('on-close');
            }else{
              this.checkFlag=false;
              this.checkMsg='';
              this.$emit('on-close');
              this.$emit('on-success');
            }
            this.useFlag=false;
            this.isQY=false;
          }).catch((err)=>{
            this.$refs['ruleForm'].reset();
            this.ruleForm.content="";
            this.ruleForm.id="";
            this.ruleForm.name="";
            this.checkFlag=false;
            this.checkMsg='';
            this.$emit('on-fail',err.data.info);
            this.$emit('on-close');
            this.useFlag=false;
            this.isQY=false;
            })
      },
      submitForm(formName) {
            if(this.isQY){
              this.saveAndUse();
            }else{
              this.save();
            }
      },
      resetForm(formName) {
        if(this.modifyStatus){
          this.getTemplate(this.ruleForm.id);
        }else{
          this.$refs['ruleForm'].reset();
          this.ruleForm.content="";
          this.ruleForm.id="";
          this.ruleForm.name="";
        }
      },
      //修改模板请求
      modify(){
        let data={
          userID:this.userID,
          domain:this.domain,
          templateID:this.modifyID,
          templateName:this.ruleForm.name.replace(/[^A-Za-z_\u4E00-\u9FA5]/g,''),
          content:this.ruleForm.content,
          startDate:this.timeToString(new Date()),
          status:this.ruleForm.status,
          apiNum:this.ruleForm.task,
          newID:this.ruleForm.id
        }
        this.$http({
          method: 'post',
          url: '/template/modifyTemplate',
          data: data
        }).then((res)=>{
          let data=res.data;
          if(!data.success){
            this.checkFlag=false;
            this.checkMsg='';
            this.$emit('on-fail',data.info);
            this.$emit('on-close');
            this.$refs['ruleForm'].reset();
            this.ruleForm.content="";
            this.ruleForm.id="";
            this.ruleForm.name="";
          }else{
            this.checkFlag=false;
            this.checkMsg='';
            this.$emit('on-close');
            this.$emit('on-success');
          }
          this.useFlag=false;
          this.isQY=false;
          this.modifyID="";
        }) .catch((err)=>{
          this.checkFlag=false;
          this.checkMsg='';
          this.$emit('on-fail','');
          this.$emit('on-close');
          this.useFlag=false;
          this.isQY=false;
          this.$refs['ruleForm'].reset();
          this.ruleForm.content="";
          this.ruleForm.id="";
          this.ruleForm.name="";
          this.modifyID="";
        })
      },
      closeMyself(formName){
        this.useFlag=false;
        this.isQY=false;
        this.$refs['ruleForm'].reset();
        this.ruleForm.content="";
        this.ruleForm.id="";
        this.ruleForm.name="";
        this.checkFlag=false;
        this.checkMsg='';
         this.$emit('on-close')
      },
      getTemplate(id){
        //请求数据
        let data={
          userID:this.userID,
          domain:this.domain,
          templateID:id
        }
        this.$http({
          method: 'post',
          url: '/template/getTemplate',
          data: data
        }).then((res)=>{
          let data=res.data;
          if(!data.success){
            this.checkFlag=false;
            this.checkMsg='';
            this.$emit('on-fail',data.info);
            this.$emit('on-close');

          }else{
            this.ruleForm={id:data.info[0].templateID,name:data.info[0].templateName,content:data.info[0].content,status:data.info[0].status,task:data.info[0].task};
          }
        }).catch((err)=>{
          this.checkFlag=false;
          this.checkMsg='';
          this.$emit('on-fail',"获取模板信息失败");
          this.$emit('on-close');
        })

      }
    },
     watch:{
       ruleForm:{
　　　　　handler(curVal,oldVal){
            if(curVal.content.trim()===''){
              this.checkErr=true;
            }else{
              this.checkErr=false;
            }
　　　　　},
　　　　　deep:true
       },
       modifyID:{
         handler(curVal,oldVal){
           if(curVal===''){
             this.modifyStatus=false;
           }else{
             this.modifyStatus=true;
           }
         },
         deep:true
       }
     }
  }
</script>
<style>
  .editor .el-textarea__inner{
    height:320px;
  }
  .bc{
    border-color:red!important;
  }
  .warn{
    line-height: 1.5em;
    color: red;
    font-size: 12px;
  }
  .textarea__inner{
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    color: #606266;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    height: 100%;
  }
  .h{
    height:600px!important;
  }
  /*提示语*/
  .masktime{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 231px;
    height: 49px;
    background: #000;
    color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 50px;
    border-radius: 4px;
    margin: auto;
  }
</style>


