<template>
  <div class="dialog-container add-catalog-dialog" v-if="isShow">
  <div class="dialog-inner dialog-stopStatus">
    <header class="dialog-header publicHeader">
    	<div class="dialog-header-tit flt">提示</div>
      <div class="icon3 dialog-header-close frt" @click="closeMyself"></div>
    </header>
    <div class="publicTipBox">
      <p>您确定要停用"<span>{{datas.name}}</span>"模板吗？</p>
    </div>
    <footer class="dialog-footer publicFooter">
      <ul class="btn-list">
        <li class="btn-item" @click="closeMyself">取&nbsp;&nbsp;消</li>
        <li class="btn-item btn-item-acvite" @click="stopUseClick">确&nbsp;&nbsp;定</li>
      </ul>
    </footer>
  </div>
  </div>
</template>
<script>
  import {mapActions, mapState,mapGetters} from 'vuex';
  export default {
    props: {
      isShow: {
        'type': Boolean,
        'default': function () {
          return [];
        }
      },
      datas: {
        type: Object,
        default: function () {
          return []
        }
      }
    },
    data() {
      return {
      }
    },
    computed: {
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
    },
    methods: {
      stopUseClick(){
        if(this.datas.length==0){
          alert('请选择数据');
          return;
        }
        let data={
          status:'0',
          templateID:this.datas.id,
          userID:this.userID,
          domain:this.domain,
        }
        this.$http({
          method: 'post',
          url: '/template/modifyStatus',
          data: data
        }).then((res)=>{
          let data=res.data;
          if(!data.success){
            this.$emit('on-fail',data.info);
            this.$emit('on-close');

          }else{
            this.$emit('on-close');
            this.$emit('on-success');
          }
        })
          .catch((err)=>{
            this.$emit('on-fail',"操作失败");
            this.$emit('on-close');
          })
      },
      closeMyself(){
        this.$emit('on-close')
      }
    },
    watch:{

    }
  }
</script>
