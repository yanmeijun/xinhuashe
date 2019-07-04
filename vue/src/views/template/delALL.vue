<template>
  <div class="dialog-container add-catalog-dialog" v-if="isShow">
    <div class="dialog-inner dialog-delete">
      <header class="dialog-header publicHeader">
      	<div class="dialog-header-tit flt">删除</div>
        <div class="icon3 dialog-header-close frt" @click="closeMyself"></div>
      </header>
      <div class="publicTipBox">
        <p>您确定要删除所选择的服务模板吗？</p>
      </div>
      <footer class="dialog-footer publicFooter">
        <ul class="btn-list">
          <li class="btn-item" @click="closeMyself">取&nbsp;&nbsp;消</li>
          <li class="btn-item btn-item-acvite" @click="delTemClick">确&nbsp;&nbsp;定</li>
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
          return {}
        }
      },
    },
    data() {
      return {
        userID:this.userID,
        domain:this.domain
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
      delTemClick(){
        if(this.datas.length==0){
          alert('请选择数据');
          return;
        }
        this.$http({
          method: 'post',
          url: '/template/deleTemplate',
          data: this.datas
        }).then((res)=>{
          let data=res.data;
          if(!data.success){
            this.$emit('on-fail',data.info);
            this.$emit('on-close');

          }else{
            this.$emit('on-close');
            this.$emit('on-success');
            this.getData();
          }
        }).catch((err)=>{
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
