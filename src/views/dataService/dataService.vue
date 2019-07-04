<template>
  <div>
    <!---热门分类-->
    <div id="topAnchor" class="container">
      <div class="mainLayerTit">热门分类</div>
      <div class="sortOutBox clearfix">
        <div class="sortList">
          <div class="sortWh">
            <div class="sortTit trafficTitBg">交通<a href="javascript:;" @click="renderTo('A')">更多</a></div>
            <ul>
              <li v-for="item in list.A.slice(0,3)" @click="renderToDetail(item.serviceID)" style="cursor:pointer;">
                <dfn :class="item.logo"></dfn>{{item.serviceName}}
              </li>
              <!--<li>-->
              <!--<img src="../../assets/img/serviceBox/publicIcon.png" />-->
              <!--驾照记分查询-->
              <!--</li>-->
              <!--<li>-->
              <!--<img src="../../assets/img/serviceBox/publicIcon.png" />-->
              <!--备案停车场查询-->
              <!--</li>-->
            </ul>
          </div>
        </div>
        <div class="sortList">
          <div class="sortWh">
            <div class="sortTit socialSecurityTitBg">社会保障<a href="javascript:;" @click="renderTo('B')">更多</a></div>
            <ul>
              <li v-for="item in list.B.slice(0,3)" @click="renderToDetail(item.serviceID)" style="cursor:pointer;">
                <dfn :class="item.logo"></dfn>{{item.serviceName}}
              </li>
            </ul>
          </div>
        </div>
        <div class="sortList">
          <div class="sortWh">
            <div class="sortTit medicalTitBg">医疗卫生<a href="javascript:;" @click="renderTo('D')">更多</a></div>
            <ul>
              <li v-for="item in list.D.slice(0,3)" @click="renderToDetail(item.serviceID)" style="cursor:pointer;">
                <dfn :class="item.logo"></dfn>{{item.serviceName}}
              </li>
            </ul>
          </div>
        </div>
        <div class="sortList">
          <div class="sortWh">
            <div class="sortTit educationTitBg">教育<a href="javascript:;" @click="renderTo('C')">更多</a></div>
            <ul>
              <li v-for="item in list.C.slice(0,3)" @click="renderToDetail(item.serviceID)" style="cursor:pointer;">
                <dfn :class="item.logo"></dfn>{{item.serviceName}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--交通分类-->
    <div class="whiteBG" v-for="item in serviceArr" v-if="item.data.length>0">
      <div class="container">
        <div class="mainLayerTit">{{item.sortName}}<a href="javascript:;" class="btnMore" @click="renderTo(item.id)">查看更多&nbsp;&gt;</a>
        </div>
        <div class="clearfix marBom">
          <div class="publicSortPic fl"><img :src="item.logo"></div>
          <!--<div class="publicSortPic fl"><img src="../../assets/img/serviceBox/trafficPic.jpg"></div>-->
          <div class="publicListBox fl">
            <ul class="clearfix">
              <li v-for="data_item in item.data">
                <div class="pubListDiv">
                  <div class="publicIcon"><dfn :class="data_item.logo"></dfn></div>
                  <div class="publicBigTit">{{data_item.serviceName}}</div>
                  <div class="publicDescription">{{data_item.summary}}</div>
                  <div class="publicBtnDetails"><a href="javascript:;"
                                                   @click="renderToDetail(data_item.serviceID)">查看详情</a></div>
                </div>
              </li>
            </ul>
            <div v-if="item.data.length<5" class="mormService">
              <span class="moreSerIcon"></span>更多服务，敬请期待！
            </div>
          </div>
        </div>
      </div>
    </div>


    <loginMask v-bind:tipSecond="tipSecond" @listenToChildEvent="closeDialog"></loginMask>


    <div class="mask" v-if="isConfirm"></div>
    <div class="dialog-container" v-if="isConfirm">
      <div class="dialog-inner ht286">
        <header class="dialog-header">
          <div class="dialog-header-tit fl">提示</div>
          <div class="icon-verPic icon-dialogClose fr" @click="close()"></div>
        </header>
        <div class="dialog-body">
          <div class="dialog-realNamePic"><img src="../../assets/img/serviceApply/picFailure.png"></div>
          <div class="dialog-realNamePrompt">对不起，该申请暂只支持已通过实名认证的用户使用</div>
          <div class="btnGoCertifi"><a href="javascript:;" @click="goConfirmStatuso">去认证</a></div>
        </div>
      </div>
    </div>


    <!--更多分类-->
    <!--<div class="moreSort">-->
    <!--<img src="img/loading.gif">-->
    <!--</div>-->
    <!--底部-->
    <div class="floatMenu">
      <i class="icon-floatMenu icon-upTop" @click="toTop()"></i>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Header from '@/views/base/header/header';
  import sideBar from '@/views/base/sideBar/sideBar';
  import Footer from '@/views/base/footer/footer';
  import pop from '@/views/base/dialog/pop';
  import loginMask from '@/views/serviceBoxDevPlatform/loginMask';//登录弹框
  import axios from 'axios';
  import {mapActions, mapState, mapGetters} from 'vuex';

  export default {
    name: 'dataService',
    data() {
      let data = {
        serviceArr: [],
        categoryList: [
          {id: 'A', name: '交通', logo: require('../../assets/img/serviceBox/trafficPic.jpg')},
          {id: 'B', name: '社会保障', logo: require('../../assets/img/serviceBox/socialSecurityPic.jpg')},
          {id: 'C', name: '教育', logo: require('../../assets/img/serviceBox/educationPic.jpg')},
          {id: 'D', name: '医疗卫生', logo: require('../../assets/img/serviceBox/medicalHygienePic.jpg')},
          {id: 'E', name: '民政', logo: require('../../assets/img/serviceBox/civilAffairsPic.jpg')},
          {id: 'H', name: '出境入境', logo: require('../../assets/img/serviceBox/passportPic.jpg')},
          {id: 'M', name: '文化体育', logo: require('../../assets/img/serviceBox/cultureSportsPic.jpg')},
          {id: 'G', name: '旅游', logo: require('../../assets/img/serviceBox/tourismPic.jpg')},
          {id: 'I', name: '举报投诉', logo: require('../../assets/img/serviceBox/complaintsPic.jpg')},
          {id: 'K', name: '税务服务', logo: require('../../assets/img/serviceBox/taxPic.jpg')},
          {id: 'X', name: '信用', logo: require('../../assets/img/serviceBox/creditServicePic.jpg')},
          {id: 'Y', name: '法规查询', logo: require('../../assets/img/serviceBox/regulationPic.jpg')},
          {id: 'L', name: '政务服务', logo: require('../../assets/img/serviceBox/govServicePic.jpg')},
          {id: 'Z', name: '其他', logo: require('../../assets/img/serviceBox/otherPic.jpg')},
        ],
        list: {
          "A": [], "B": [], "C": [], "D": [], "E": [], "G": [], "H": [], "I": [], "K": [],
          "L": [], "M": [], "X": [], "Y": [], "Z": []
        },
        openID: "",
        tipSecond: false,
        isConfirm: false,
        confirmStatus: ""
      };

      /* 服务LOGO图片加载优化算法 */
      let ucapBuffers = (window['__ucap__'] || {}).service || [];
      for (let i = 0; i < ucapBuffers.length; i++) {
        let serviceCategory = (String(ucapBuffers[i].id) || '').charAt(0).toUpperCase();
        if (typeof data.list[serviceCategory] === 'undefined') {
          data.list[serviceCategory] = new Array();
        }

        data.list[serviceCategory].push({
          serviceID: ucapBuffers[i].id,
          serviceName: ucapBuffers[i].n,
          summary: ucapBuffers[i].s,
          logo: 'ucap-glyphicon_' + ucapBuffers[i].id
        });
      }
      for(let key in data.list) {
        data.list[key].reverse();
      }

      for (let i = 0; i < data.categoryList.length;i++) {
        data.serviceArr.push({
          id: data.categoryList[i].id,
          sortName: data.categoryList[i].name,
          data: data.list[data.categoryList[i].id].slice(0, 8),
          logo: data.categoryList[i].logo
        })
      }

      return data
    },
    mounted() {
      this.openID = this.getUserInfo ? JSON.parse(this.getUserInfo).openID : "";
    },
    methods: {
      getList() {
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: '/service/getServiceList',
          contentType: 'application/json'
        }).then((res) => {
          if (res.data.code == 200) {
            for (let i = 0; i < res.data.results.dataCount; i++) {
              let item = res.data.results.dataList[i];
              let serviceType = item.serviceID.charAt(0);
              this.list[serviceType].push(item)
            }
            for (let i = 0; i < this.categoryList.length; i++) {
              if (this.list[this.categoryList[i].id]) {
                this.serviceArr.push({
                  sortName: this.categoryList[i].name,
                  id: this.categoryList[i].id,
                  data: this.list[this.categoryList[i].id].slice(0, 8),
                  logo: this.categoryList[i].logo
                })
              }
            }
          } else {
            alert("获取服务列表失败")
          }

        }).catch(function (err) {

        })
      },
      renderTo(id) {
        if (!id) {
          return
        }
        this.$router.push({
          path: '/serviceSort',
          name: "serviceSort",
          query: {id: id}
        })
      },
      renderToDetail(id) {
        if (!id) {
          return
        }
        this.$router.push({
          path: '/serviceDetails',
          name: "serviceDetails",
          query: {id: id}
        })
      },
      goConfirmStatuso() {
        if (this.confirmStatus == "0") {
          this.$router.push({
            path: '/home/personalRealName/realNameMainCon'
          });
        } else {
          this.$router.push({
            path: '/home/personalRealName/realNameDetails'
          });
        }
      },
      close() {
        this.isConfirm = false;
      },
      toTop() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      },
      closeDialog(flag) {
        this.tipSecond = flag;
      },
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    components: {
      loginMask
    },
    created() {
    }
  }
</script>
<style scoped="">
  @import "../../assets/css/public2.css";
  @import "../../assets/css/serviceList.css";

  dfn {
    display: inline-block;
    width: 50px;
    height: 40px;
    margin-left: 15px;
    margin-right: 15px;
    vertical-align: middle;
  }
  .publicIcon dfn {margin-top: 40px}
</style>
