<template>
  <nav class="nav">
    <div class="nav-fix-wdh">
      <ul class="nav-list">
        <!--<li v-for="(item, index) in getMuen" class="nav-item"-->
        <!--:class="{'active':isActive===item.id,'open':isOpen===item.id && item.childrens && item.childrens.length}" @click="selectMenu(item)">-->
        <li v-for="(item, index) in getMuen" class="nav-item"
            :class="{'active':isActive===item.id,'open':item.isOpen===item.id && item.childrens && item.childrens.length}"
            @click="selectMenu(item)">
          <div class="nav-link-box">
            <i class="icon icon-serviceAccess"
               :class="{'icon-personalCenter':item.id ==='2','icon-serviceAccess':item.id =='3','icon-accessRequest':item.id =='5','icon-myAttention':item.id =='4'}"></i>

            <span class="nav-link" :title="item.name" style="cursor: default"
                  v-if="item.childrens && item.childrens.length">{{item.name}}</span>
            <router-link :to="{ path:item.hrefName}" style="cursor: default" :title="item.name" v-else class="nav-link">
              {{item.name}}
            </router-link>


            <!--<i class="icon nav-arrow-icon" v-if="item.childrens && item.childrens.length"></i>-->

            <i class="icon nav-arrow-icon" v-if="item.childrens && item.childrens.length"></i>
          </div>
          <div class="nav-sub-list" @click.stop>
            <router-link
              v-for="(items, ind) in item.childrens"
              :to="{ path:items.hrefName}"
              :key="ind"
              active-class="active"
              v-on:userDefinedEvent="goToDetail"
              class="nav-sub-link">
              <i class="icon icon-defalutMenu" v-if="item.childrens && item.childrens.length"></i>
              {{items.name}}
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
  import axios from 'axios';
  import {mapGetters} from 'vuex';
  import bus from '@/config/eventBus';

  export default {
    data() {
      return {
        isActive: '2',
        isOpen: '2',
        openID: "",
        getMuen: [
          {
            "id": "2",
            "name": "个人中心",
            "stopClick": false,
            "isOpen": "2",
            "hrefName": "javascript:void(0)",
            childrens: [
              {"name": "个人信息", "id": "6", "hrefName": "/home/personalCenter", "isActive": true},
              {"name": "实名认证", "id": "7", "hrefName": "/home/personalRealName/realNameDetails", "isActive": false}
            ]
          },
          {
            "id": "3",
            "name": "服务管理",
            "stopClick": false,
            "isOpen": "3",
            "hrefName": "",
            childrens: [
              {"name": "我的申请", "id": "1", "hrefName": "/home/serviceManage/myApplication", "isActive": true},
              {"name": "监控管理", "id": "2", "hrefName": "/home/serviceManage/monitorManage", "isActive": false},
              {"name": "上线管理", "id": "3", "hrefName": "/home/serviceManage/onlineManage", "isActive": false}
            ]
          },
          {
            "id": "5",
            "name": "服务接入",
            "stopClick": true,
            "isOpen": "5",
            "hrefName": "/home/serviceJoin",
            childrens: [
              /*{"name":"申请记录查询","id":"3","hrefName":"/home/serviceJoin","isActive":true}*/
            ]
          },
          {
            "id": "4",
            "name": "我的关注",
            "stopClick": true,
            "isOpen": "4",
            "hrefName": "/home/userMark",
            childrens: [
//              {"name":"我的关注","id":"3","hrefName":"/home/userMark","isActive":true}
            ]
          }
          /*          {
                      "id":"1",
                      "name":"服务采购",
                      "stopClick":true,
                      "isOpen":"1",
                      childrens:[
                        {"name":"申请记录查询","id":"3","hrefName":"/home/serviceProcure/applicRecord","isActive":true},
                        {"name":"服务采购申请","id":"4","hrefName":"/home/serviceProcure/serviceList","isActive":false},
                      ]
                    }*/
        ]

      }
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    components: function () {
    },
    mounted: function () {
      let getUserInfo;
      if (this.getUserInfo) {
        getUserInfo = JSON.parse(this.getUserInfo).userName;
        this.openID = JSON.parse(this.getUserInfo).openID;
      }
      this.confirmUser();
      var self = this;
      bus.$on("userDefinedEvent", function () {
      });
    },
    methods: {
      selectMenu(mgs) {
        if (mgs.stopClick) {
          return;
        }
        this.isActive = mgs.id;
        mgs.isOpen = (mgs.isOpen === mgs.id ? '' : mgs.id);
      },
      goToDetail() {
        this.confirmUser();
      },
      /*
         *判断用户是否进行了是否实名认证
         */
      confirmUser() {
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/userInformation/getUserByOpenID",
          async: true,
          data: {openID: this.openID},
          contentType: 'application/json'
        }).then(res => {
          if (res.data.code == "200") {
            if (res.data.results.confirmStatus == '3') {

              this.getMuen[0].href = "/home/serviceJoin";
              this.getMuen[1].href = "/home/serviceProcure";
              this.getMuen[0].childrens = [
                {"name": "个人信息", "id": "6", "hrefName": "/home/personalCenter", "isActive": true},
                {"name": "实名认证", "id": "7", "hrefName": "/home/personalRealName/realNameDetails", "isActive": false}
              ];
              this.getMuen[1].childrens = [
                {"name": "我的申请", "id": "1", "hrefName": "/home/serviceManage/myApplication", "isActive": true},
                {"name": "监控管理", "id": "2", "hrefName": "/home/serviceManage/monitorManage", "isActive": false},
                {"name": "上线管理", "id": "3", "hrefName": "/home/serviceManage/onlineManage", "isActive": false}
              ];
              this.getMuen[1].stopClick = false;
              this.getMuen[2].stopClick = false;
              this.getMuen[3].stopClick = false;
            } else if (res.data.results.confirmStatus == '0') {
              /*this.getMuen[0].childrens[1].hrefName = "/home/personalCenter";*/
              this.getMuen[0].childrens = [
                {"name": "个人信息", "id": "6", "hrefName": "/home/personalCenter", "isActive": true},
                {"name": "实名认证", "id": "7", "hrefName": "/home/personalRealName/realNameMainCon", "isActive": false}
              ]
              this.getMuen[1].childrens = [];
              this.getMuen[1].stopClick = true;
              this.getMuen[2].hrefName = "";
              this.getMuen[3].hrefName = "";
            } else if (res.data.results.confirmStatus == '2') {
              this.getMuen[0].childrens = [
                {"name": "个人信息", "id": "6", "hrefName": "/home/personalCenter", "isActive": true},
                {"name": "实名认证", "id": "7", "hrefName": "/home/personalRealName/realNameDetails", "isActive": false}
              ]
              this.getMuen[1].childrens = [];
              this.getMuen[1].stopClick = true;
              this.getMuen[2].hrefName = "";
              this.getMuen[3].hrefName = "";
            }
            else {
              this.getMuen[0].childrens[1].hrefName = "/home/personalRealName/realNameDetails";
              this.getMuen[1].childrens = [];
              this.getMuen[1].stopClick = true;
              this.getMuen[2].hrefName = "";
              this.getMuen[3].hrefName = "";
            }
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    watch: {
      isActive: {
        handler() {
          this.confirmUser();
        }
      }
    }
  };


</script>
