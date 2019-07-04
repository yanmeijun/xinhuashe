<template>
  <nav class="nav">
    <div class="nav-fix-wdh">


      <ul class="nav-list">
        <li v-for="(item, index) in permission" class="nav-item"
        :class="{'active':isActive===item.id,'open':isOpen===item.id && item.children && item.children.length}" @click="selectMenu(item)">
        <div class="nav-link-box" >
          <i class="icon" :class="{'icon-workbench':item.id ==='0','icon-accessManage':item.id =='1'
                                ,'icon-purchaseManage':item.id =='2','icon-publicService':item.id =='3'
                                ,'icon-userManage':item.id =='4','icon-sysManage':item.id =='5'
                                ,'icon-monitorManage':item.id =='6','icon-temManage':item.id =='7' || item.id =='8'}">
          </i>
        <router-link class="nav-link" :title="item.name"    :to="{ path:item.href}" >{{item.name}}</router-link>
        <i class="icon icon-arrow" :class="{'active':isOpen===item.id}" v-if="item.children && item.children.length"></i>
        </div>
        <div class="nav-sub-list" v-show="isActive === item.id && isOpen === item.id" @click.stop>
        <router-link
        v-for="(items, ind) in item.children"
        :to="{ path:items.hrefName}"
        :key="ind"
        active-class="active"
         class="nav-sub-link">
          <i class="icon icon-defalutMenu" v-if="item.children && item.children.length"></i>
        {{items.name}}
        </router-link>
        </div>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script type="text/ecmascript-6">
  import {menu} from "@/config/menu"
  import {mapGetters, mapState,mapActions} from 'vuex';
  export default {
    data () {
      return {
        isActive:'',
        isOpen:'',
        permission: [],
        getMenu: menu
      }
    },
    computed:{
      ...mapGetters(['getUserInfo'])
  },
    mounted () {
      this.isActive = sessionStorage.getItem('isSelect') ||'1'
      this.isOpen = sessionStorage.getItem('isSelect') ||'1'
      let permission;
      if(this.getUserInfo){
        if(typeof this.getUserInfo == 'string'){
          permission = JSON.parse(this.getUserInfo).permission;
        }else{
          permission = this.getUserInfo.permission;
        }
      }
      this.permission = permission || this.getMenu;
    },
    methods: {
      selectMenu(mgs){
        this.isActive = mgs.id;
        this.isOpen = (this.isOpen === mgs.id ? '':mgs.id);
        sessionStorage.setItem('isSelect', this.isActive)
      }
    }
  };
</script>
