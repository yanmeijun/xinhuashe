<template>
  <div>
    <serviceHead></serviceHead>
    <!--搜索-->
    <div class="searchBgPic serviceSupport_searchBgPic">
      <div class="container">
        <div class="searchLayer clearfix" style="width: 600px">

          <div class="searchBox">
            <div class="clearfix">
              <!-- <i class="icon-deltails icon-search"></i> -->
              <input type="text" class="searchText"
                     placeholder="请输入问题关键词"
                     style="padding-left: 10px;"
                     v-model.trim="searchKey"
                     autocomplete="off" autocapitalize="off" autocorrect="off"
              />
              <input type="button" value="搜索" class="searchBtn" @click="searchEvent"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--服务详情、服务示例、免责声明-->
    <div class="container">
      <!-- 第一步 -->
      <div class="tabList clearfix">
        <div class="tabCon">
          <div class="ListCon">
            <div class="whiteBG serviceSup clearfix">
              <div class="fl left-Con">
                <h4 class="pad-right">服务支持</h4>
                <ul class="level" id="menu">
                  <li>
                    <router-link to="/serviceSupport/commonProblem">常见问题</router-link>
                    <!--<a href=""><span>常见问题</span></a>-->
                  </li>
                  <li>
                    <router-link to="/serviceSupport/teacherRelated">技术相关</router-link>
                    <!--<a href=""><span>技术相关</span></a>-->
                  </li>
                  <li>
                    <router-link to="/serviceSupport/operationRelated">操作相关</router-link>
                    <!--<a href=""><span>操作相关</span></a>-->
                  </li>
                  <li>
                    <router-link to="/serviceSupport/helpCenter">帮助中心</router-link>
                    <!--<a href=""><span>帮助中心</span></a>-->
                  </li>
                  <li>
                    <router-link to="/serviceSupport/disclaimer">免责声明</router-link>
                    <!--<a href=""><span>免责声明</span></a>-->
                  </li>
                </ul>
              </div>
              <div class="fr right-Con">
                <router-view></router-view>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <serviceFooter></serviceFooter>
  </div>
</template>
<style scoped>
  @import "../../assets/css/public2.css";
  @import "../../assets/css/serviceSupport.css";
</style>
<script type="text/ecmascript-6">
  import serviceHead from '@/views/serviceCommonPage/serviceHead';
  import serviceFooter from '@/views/serviceCommonPage/serviceFooter';

  export default {
    data() {
      return {
        searchKey: ""
      }
    },
    components: {
      serviceHead,
      serviceFooter
    },
    mounted() {
      const childNodes = document.querySelectorAll('#menu li');
      for (let i = 0; i < childNodes.length; i++) {
        childNodes[i].className = ""
        childNodes[i].onclick = function () {
          for (let j = 0; j < childNodes.length; j++) {
            childNodes[j].className = "";
          }
          this.className = "active";
        }
      }
      const supportList = ["/serviceSupport/commonProblem", "/serviceSupport/teacherRelated", "/serviceSupport/operationRelated", "/serviceSupport/helpCenter","/serviceSupport/disclaimer"];
      for (let index in supportList) {
        childNodes[index].className = this.$route.path == supportList[index] ? "active" : "";
      }
    },
    methods: {
      searchEvent() {
        if (this.$route.path == "/serviceSupport/commonProblem") {
          this.bus.$emit("commonProblem", this.searchKey);
        } else if (this.$route.path == "/serviceSupport/disclaimer") {
          this.bus.$emit("disclaimer", this.searchKey);
        } else if (this.$route.path == "/serviceSupport/helpCenter") {
          this.bus.$emit("helpCenter", this.searchKey);
        } else if (this.$route.path == "/serviceSupport/operationRelated") {
          this.bus.$emit("operationRelated", this.searchKey);
        } else if (this.$route.path == "/serviceSupport/teacherRelated") {
          this.bus.$emit("teacherRelated", this.searchKey);
        }
      }
    }
  }
</script>
