<template>
  <div>
    <serviceHead></serviceHead>
    <div class="searchBgPic">
      <div class="container">
        <div class="searchLayer clearfix">
          <div class="searchBox">
            <div class="clearfix">
              <i class="icon-deltails icon-search"></i>
              <input type="text" placeholder="搜索您所需要的服务" class="searchText" v-model="keyword"/>
              <input type="button" value="搜索" class="searchBtn" @click="getServiceList"/>
            </div>
            <div class="hotSearchName">
              <ul>
                <li v-for="item in hotMenu"><a href="javascript:;"
                                               @click="goServiceDetails(item.serviceID)">{{item.serviceName}}</a></li>
                <!-- <li><a href="javascript:;">机动车违章查询</a></li>
                 <li><a href="javascript:;">北京市预约挂号服务</a></li>
                 <li><a href="javascript:;">驾照扣分查询</a></li>
                 <li><a href="javascript:;">全国医疗机构查询</a></li>-->
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--当前位置-->
    <div class="container">
      <div class="currentLocation">
        <span>当前位置：</span>
        <span @click="toServicePage()">数据服务</span>
        <span class="symbol">&gt;</span>
        <span>服务分类</span>
      </div>
    </div>
    <div class="whiteBG container clearfix">
      <div class="sortSelectList clearfix">
        <label class="tit">分类</label>
        <span class="selectSort">
					<a v-for="item in categoryList" href="javascript:;" :class="{'active':searchCategory==item.id}"
             :value="item.id" @click="categoryChoose(item.id)">{{item.name}}</a>
				</span>
      </div>
      <div class="sortSelectList clearfix">
        <label class="tit">类型</label>
        <span class="selectSort">
					<a v-for="item in typeList" href="javascript:;" :class="{'active':searchType==item.id}" :value="item.id"
             @click="typeChoose(item.id)">{{item.name}}</a>
				</span>
      </div>
      <div class="sortSelectList clearfix">
        <label class="tit">价格</label>
        <span class="selectSort">
					<a v-for="item in priceList" href="javascript:;" :class="{'active':searchPrice==item.id}" :value="item.id"
             @click="priceChoose(item.id)">{{item.name}}</a>
				</span>
      </div>
      <div class="sortSelectList clearfix">
        <label class="tit">服务范围</label>
        <span class="selectSort">
					<a v-for="item in regionList" href="javascript:;" :class="{'active':searchRegion==item.id}" :value="item.id"
             @click="regionChoose(item.id)">{{item.name}}</a>
				</span>
        <!--<a href="javascript:;" class="btnMultipleChoice"><b>+</b>多选</a>-->
      </div>
    </div>
    <!--分类-->
    <div class="container serviceSortBox">
      <div class="mainLayerTit clearfix">
        <a v-for="item in sortList" href="javascript:;" :class="{'active':searchSort==item.id}" :value="item.id"
           @click="sortChoose(item.id)">{{item.name}}</a>
      </div>
      <div class="clearfix marBom">
        <div class="publicListBox ListBgWhite" v-if="serviceList.length>0">
          <ul class="clearfix">
            <li v-for="item in serviceList">
              <div class="pubListDiv">
                <div class="publicIcon"><img :src="item.logo"></div>
                <div class="publicBigTit">{{item.serviceName}}</div>
                <div class="publicDescription">{{item.summary}}</div>
                <div class="publicBtnDetails"><a href="javascript:;" @click="renderToDetail(item.serviceID)">查看详情</a>
                </div>
              </div>
            </li>

          </ul>
        </div>
        <!--无结果-->
        <div v-else class="noServiceBox">
          <div><img src="../../assets/img/serviceBox/noService.png"></div>
          <div class="noSerWord">没有相关服务</div>
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


    <div class="floatMenu">
      <i class="icon-floatMenu icon-upTop" @click="toTop()"></i>
    </div>
    <!--底部-->
    <serviceFooter></serviceFooter>
  </div>
</template>
<script type="text/ecmascript-6">
  import serviceHead from '@/views/serviceCommonPage/serviceHead';
  import serviceFooter from '@/views/serviceCommonPage/serviceFooter';
  import loginMask from '@/views/serviceBoxDevPlatform/loginMask';//登录弹框
  import {mapActions, mapState, mapGetters} from 'vuex';
  import axios from 'axios';

  export default {
    name: 'serviceSort',
    data() {
      return {
        hotMenu: [
          {"serviceName": "北京社保信息查询", "serviceID": "BAA0001"},
          {"serviceName": "机动车违章查询", "serviceID": "AAA0001"},
          {"serviceName": "北京市预约挂号服务", "serviceID": "DAA0001"},
          {"serviceName": "驾照扣分查询", "serviceID": "AAB0001"},
          {"serviceName": "全国医疗机构查询", "serviceID": "DAB0003"},
        ],
        keyword: this.$route.query.keyword,
        serviceList: [],
        categoryList: [{id: '', name: '全部'},
          {id: 'A', name: '交通'},
          {id: 'B', name: '社会保障'},
          {id: 'C', name: '教育'},
          {id: 'D', name: '医疗卫生'},
          {id: 'E', name: '民政'},
          {id: 'H', name: '出境入境'},
          //{id: 'M', name: '文化体育'},
          {id: 'G', name: '旅游'},
          {id: 'I', name: '举报投诉'},
          {id: 'K', name: '税务服务'},
          {id: 'X', name: '信用'},
          {id: 'Y', name: '法规查询'},
          {id: 'L', name: '政务服务'},
          {id: 'Z', name: '其他'}
        ],
        typeList: [{id: '', name: '全部'},
          {id: '2', name: '服务'},
          {id: '3', name: 'API'}],
        priceList: [{id: '', name: '全部'},
          {id: '0', name: '免费'},
          {id: '1', name: '付费'}],
        regionList: [{id: '', name: '全部'},
          {id: '110000', name: '北京'},
          {id: '120000', name: '天津'},
          {id: '130000', name: '河北'},
          {id: '140000', name: '山西'},
          {id: '150000', name: '内蒙古'},
          {id: '210000', name: '辽宁'},
          {id: '220000', name: '吉林'},
          {id: '230000', name: '黑龙江'},
          {id: '310000', name: '上海'},
          {id: '320000', name: '江苏'},
          {id: '330000', name: '浙江'},
          {id: '340000', name: '安徽'},
          {id: '350000', name: '福建'},
          {id: '360000', name: '江西'},
          {id: '370000', name: '山东'},
          {id: '410000', name: '河南'},
          {id: '420000', name: '湖北'},
          {id: '430000', name: '湖南'},
          {id: '440000', name: '广东'},
          {id: '450000', name: '广西'},
          {id: '460000', name: '海南'},
          {id: '500000', name: '重庆'},
          {id: '510000', name: '四川'},
          {id: '520000', name: '贵州'},
          {id: '530000', name: '云南'},
          {id: '540000', name: '西藏'},
          {id: '610000', name: '陕西'},
          {id: '620000', name: '甘肃'},
          {id: '630000', name: '青海'},
          {id: '640000', name: '宁夏'},
          {id: '650000', name: '新疆'},
          {id: '710000', name: '台湾'},
          {id: '810000', name: '香港'},
          {id: '820000', name: '澳门'}
        ],
        searchCategory: this.searchCategory || this.$route.query.id || "",
        searchType: '',
        searchPrice: '',
        searchRegion: '',
        searchSort: '1',
        sortList: [{id: '1', name: '综合'},
          {id: '2', name: '销量'},
          {id: '3', name: '最新'}],
        sort: {saleNum: 1, markNum: 1},
        openID: "",
        tipSecond: false,
        isConfirm: false,
        confirmStatus: ""
      };
    },
    mounted() {
      this.getServiceList();
      this.openID = this.getUserInfo ? JSON.parse(this.getUserInfo).openID : "";
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    components: {
      serviceHead,
      serviceFooter,
      loginMask
    },
    created() {
    },
    methods: {
      getServiceList() {
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: '/service/searchByKwd',
          data: {
            keyword: this.keyword,
            category: this.searchCategory,
            serviceType: this.searchType,
            price: this.searchPrice,
            city: this.searchRegion,
            sort: this.sort
          },
          contentType: 'application/json'
        }).then((res) => {
          if (res.data.code == 200) {
            this.serviceList = res.data.results.dataList
          }
        }).catch(function (err) {

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
        /*this.$http({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/userInformation/isLogin",
          async: true,
          data: {},
          contentType: 'application/json'
        }).then(res => {
          if (res.data.code == "402") {
            this.tipSecond = true;
            sessionStorage.setItem("serviceDetailID", id);
          } else {
            this.$http({
              headers: {"Content-Type": "application/json"},
              method: "post",
              url: "/userInformation/getUserByOpenID",
              async: true,
              data: {
                openID: this.openID,
              },
              contentType: 'application/json'
            }).then(res => {
              if (res.data.code == "200") {
                this.confirmStatus = res.data.results.confirmStatus;
                if (this.confirmStatus == "3") {
                  this.$router.push({
                    path: '/serviceDetails',
                    name: "serviceDetails",
                    query: {id: id}
                  })
                } else {
                  this.isConfirm = true;
                }
              }
            }).catch(err => {
              console.log(err)
            });
          }
        }).catch(err => {
          console.log(err)
        });*/
      },
      closeDialog(flag) {
        this.tipSecond = flag;
      },
      goConfirmStatuso() {
        /*this.$router.push({
          path: '/home/personalRealName/realNameMainCon'
        });*/
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
      toServicePage() {
        this.$router.push({
          path: '/dataService',
          name: "dataService"
        })
      },
      categoryChoose(id) {
        this.searchCategory = id;
        this.getServiceList();
      },
      typeChoose(id) {
        this.searchType = id;
        this.getServiceList();
      },
      priceChoose(id) {
        this.searchPrice = id;
        this.getServiceList();
      },
      regionChoose(id) {
        this.searchRegion = id;
        this.getServiceList();
      },
      sortChoose(id) {
        this.searchSort = id;
        if (id == '1') {
          this.sort = {saleNum: 1, markNum: 1}
        } else if (id == '2') {
          this.sort = {saleNum: 1}
        } else if (id == '3') {
          this.sort = {createDate: -1}
        }
        this.getServiceList();
      },
      goServiceDetails(id) {
        if (!id) {
          return
        }
        this.$emit("listenToChildEvent", false);
        this.$router.push({
          path: '/serviceDetails',
          name: "serviceDetails",
          query: {id: id}
        })
      },
      toTop() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      }
    }
  }
</script>
<style>
  @import "../../assets/css/public2.css";
  @import "../../assets/css/serviceList.css";
</style>
