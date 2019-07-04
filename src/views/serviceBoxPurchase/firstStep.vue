<template>
  <div class="tabList clearfix">
    <div class="tabCon">
      <div class="ListCon" id="fwxq">
        <div class="tableBox whiteBG serviceApplyTable">
          <table class="table">
            <tr>
              <td>服务名称：</td>
              <td style="color: #0081e9;">{{this.basicInfor.serviceName}}</td>
            </tr>
            <tr>
              <td>服务类型：</td>
              <td v-if="this.basicInfor.serviceType == 1">服务和API</td>
              <td v-if="this.basicInfor.serviceType == 2">服务</td>
              <td v-if="this.basicInfor.serviceType == 3">api</td>
            </tr>
            <tr>
              <td>价格：</td>
              <td>{{this.basicInfor.price <= 0 ? "免费" : "面议"}}</td>
            </tr>
            <tr>
              <td>服务期限：</td>
              <td>{{this.basicInfor.deadline}}</td>
            </tr>
            <tr>
              <td style="vertical-align: top;">服务提供方式：</td>
              <td>公共服务打包输出<span>（注：公共服务打包输出：政务数据与服务集成的公共服务可按照事项内容封装并整体提供，包括整套服务页面及服务内容，需求方可以直接进行调用。）</span></td>
            </tr>
            <tr>
              <td>免责声明：</td>
              <td>{{this.basicInfor.relief}}</td>
            </tr>
            <tr>
              <td>服务范围：</td>
              <td>
                <div class="select-box service_select" @click="toggleServiceRange" @mouseover="show" @mouseout="hide">
											<span class="defaul_option">
                        <span>请选择服务范围</span>
                        <!--<div class="selectCity"
                             v-for="(item,index) in chooseMenuArr"
                             v-else
                             style="margin-right: 7px;" :id="index"><em>{{item.name}}</em><i @click="close(index)"></i></div>-->
											</span>
                  <i class="icon4 icon-downMenu"></i>
                  <div class="selectCon" id="selectBocCon" v-show="isOpen">
                    <el-tree
                      :data="menuArr"
                      show-checkbox
                      node-key="id"
                      ref="tree"
                      highlight-current
                      @check="checkNode"
                      :filter-node-method="filterNode"
                      :props="defaultProps">
                    </el-tree>
                  </div>
                </div>
                <div class="error pla-email-use" style="margin-right: 193px;" v-if="service"><i class="pla-email"></i>请选择服务范围
                </div>
              </td>
            </tr>
            <tr v-if="this.chooseMenuArr.length>0">
              <td style="vertical-align: top;">已选择：</td>
              <td>
                <div class="select-box" style="height: auto;width: 604px;">
                  <span class="defaul_option">
                    <div class="selectCity"
                         v-for="(item,index) in chooseMenuArr"
                         style="margin-right: 7px;" :id="index"><em>{{item.name}}</em><i
                      @click="close(index)"></i></div>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <a href="javascript:;" class="btnApply" @click="nextStep">下一步</a>
              </td>
            </tr>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import {mapGetters, mapState, mapActions} from 'vuex';
  import {regionCode} from '@/config/regionCode';
  var  codeArr = [];
  export default {
      name:'container',
      data(){
          return {
            regionCode: regionCode,
           /* defaultProps: {
              children: 'regionEntitys',
              label: 'region'
            },*/
            isOpen:false,
            menuArr:[
              {
                "id":"all","name":"全国",
                children:[
                  {"name":"北京市","id":"110000"},
                  {"name":"天津市","id":"120000"},
                  {"name":"上海市","id":"310000"},
                  {"name":"重庆市","id":"500000"},
                  {"name":"河北省","id":"130000"},
                  {"name":"山西省","id":"140000"},
                  {"name":"辽宁省","id":"210000"},
                  {"name":"吉林省","id":"220000"},
                  {"name":"黑龙江省","id":"230000"},
                  {"name":"江苏省","id":"320000"},
                  {"name":"浙江省","id":"330000"},
                  {"name":"安徽省","id":"340000"},
                  {"name":"福建省","id":"350000"},
                  {"name":"江西省","id":"360000"},
                  {"name":"山东省","id":"370000"},
                  {"name":"河南省","id":"410000"},
                  {"name":"湖北省","id":"420000"},
                  {"name":"湖南省","id":"430000"},
                  {"name":"广东省","id":"440000"},
                  {"name":"海南省","id":"460000"},
                  {"name":"四川省","id":"510000"},
                  {"name":"贵州省","id":"520000"},
                  {"name":"云南省","id":"530000"},
                  {"name":"陕西省","id":"610000"},
                  {"name":"甘肃省","id":"620000"},
                  {"name":"青海省","id":"630000"},
                  {"name":"台湾省","id":"710000"},
                  {"name":"内蒙古自治区","id":"150000"},
                  {"name":"广西壮族自治区","id":"450000"},
                  {"name":"西藏自治区","id":"540000"},
                  {"name":"宁夏回族自治区","id":"640000"},
                  {"name":"新疆自治区","id":"650000"},
                  {"name":"香港特别行政区","id":"810000"},
                  {"name":"澳门特别行政","id":"820000"}
/*                  {"name":"贵阳市","id":"520100"},
                  {"name":"杭州市","id":"330100"},
                  {"name":"深圳市","id":"440300"},
                  {"name":"广州市","id":"440100"},
                  {"name":"长沙市","id":"430100"},
                  {"name":"株洲市","id":"430200"},
                  {"name":"湘潭市","id":"430300"},
                  {"name":"衡阳市","id":"430400"},
                  {"name":"邵阳市","id":"430500"},
                  {"name":"岳阳市","id":"430600"},
                  {"name":"常德市","id":"430700"},
                  {"name":"张家界市","id":"430800"},
                  {"name":"益阳市","id":"430900"},
                  {"name":"郴州市","id":"431000"},
                  {"name":"永州市","id":"431100"},
                  {"name":"怀化市","id":"431200"},
                  {"name":"娄底市","id":"431300"},
                  {"name":"湘西土家族苗族自治州","id":"433100"},
                  {"name":"驻马店市","id":"419000"},
                  {"name":"周口市","id":"411700"},
                  {"name":"信阳市","id":"411600"},
                  {"name":"商丘市","id":"411500"},
                  {"name":"南阳市","id":"411400"},
                  {"name":"三门峡市","id":"411300"},
                  {"name":"漯河市","id":"411200"},
                  {"name":"许昌市","id":"411100"},
                  {"name":"濮阳市","id":"411000"},
                  {"name":"焦作市","id":"410900"},
                  {"name":"新乡市","id":"410800"},
                  {"name":"鹤壁市","id":"410700"},
                  {"name":"安阳市","id":"410600"},
                  {"name":"平顶山市","id":"410500"},
                  {"name":"洛阳市","id":"410400"},
                  {"name":"开封市","id":"410300"},
                  {"name":"郑州市","id":"410200"},
                  {"name":"菏泽市","id":"410100"},*/
                  ]
              }
            ],
            defaultProps: {
              children: 'children',
              label: 'name'
            },
            chooseMenuArr:[],
            basicInfor:{},
            service:false
          }
      },
      mounted(){
        window.addEventListener('click', this.handleSelect);
        this.getBasicInfor();
        //数据回填 （从上一步返回）
        this.chooseMenuArr = this.$route.query.chooseMenuArr?JSON.parse(this.$route.query.chooseMenuArr):[];
      },
      computed:{
      },
      components: {
        ...mapGetters(['getUserInfo'])
      },
      created(){

      },
      methods:{
        getBasicInfor(){
          this.$http({
            headers: {"Content-Type": "application/json"},
            method: "post",
            url: "/procure/getService",
            async: true,
            data: {
              serviceID: this.$route.query.serviceID
            },
            contentType: 'application/json'
          }).then(res=> {
            this.basicInfor = res.data.basicInfor;
            sessionStorage.setItem("serviceType",res.data.basicInfor.serviceType);
            if(res.data.code == "200"){
              var info = res.data.basicInfor;
              var infoCity=[];
              if(info.city == 'all'){
                infoCity=this.menuArr;
              }else{
                const cityArr = info.city.split(',');
                infoCity=[];
                cityArr.forEach(cityID =>{
                  /*if(cityID == '110100'){return;}*/
                  if(cityID == '110100'){
                    infoCity.push({"name":"北京市","id":"110000"});
                  }else if(cityID == '120100'){
                    infoCity.push({"name":"天津市","id":"120100"});
                  }else if(cityID == '310100'){
                    infoCity.push({"name":"上海市","id":"310100"});
                  }else if(cityID == '500100'){
                    infoCity.push({"name":"重庆市","id":"500100"});
                  }else if(cityID.substr(2,6) == '0000'){
                    this.regionCode[0].regionEntitys.forEach(provInfo =>{
                      if(provInfo.code == cityID){
                        infoCity.push({"name":provInfo.region,"id":cityID});
                      }
                    })
                  }else{
                    if(cityID.substr(4,6) == '00'){
                      this.regionCode[0].regionEntitys.forEach((provInfo,index) =>{
                        if(provInfo.region == infoCity[infoCity.length-1].name){
                          provInfo.regionEntitys.forEach(cityInfo =>{
                            if(Number(cityInfo.code) == Number(cityID)){
                              infoCity[infoCity.length-1].children.push({"name":cityInfo.region,"id":cityID})
                            }
                          });
                          return;
                        }
                        if(Number(provInfo.code) == Number(cityID.substr(0,3)+"000")){
                          infoCity.push({"name":provInfo.region,"id":cityID,"children":[]});
                          provInfo.regionEntitys.forEach(cityInfo =>{
                            if(Number(cityInfo.code) == Number(cityID)){
                              infoCity[infoCity.length-1].children.push({"name":cityInfo.region,"id":cityID})
                            }
                          });
                        }
                      })
                    }
                  }
                });
              }
            };
            var secondInfo = []
            infoCity.forEach(item=>{
              if(item.children){
                item.children.forEach(items=>{
                  secondInfo.push({"name":items.name,"id":items.id});
                })
              }else{
                secondInfo.push({"name":item.name,"id":item.id});
              }
            })
            if(secondInfo.length <34){
              this.menuArr = secondInfo;
            }
          }).catch(err=> {
            console.log(err)
          })
        },
        toggleServiceRange(e){
          e = e || event;
          e.cancelBubble = true;
          this.$refs.tree.setCheckedKeys([]);
          this.isOpen = this.isOpen ? this.isOpen = false : this.isOpen = true
        },
        /*点击其他触发下拉框消失*/
        handleSelect() {
          this.isOpen = false;
        },
        filterNode(value, data) {
          if (!value) return true;
          return data.name.indexOf(value) !== -1;
        },
        checkNode() {
          this.chooseMenuArr = [];
          if(this.$refs.tree.getCheckedNodes().length < 1){
            return;
          }
          if(this.$refs.tree.getCheckedNodes().length == 35){
            this.chooseMenuArr = [{"id":"all","name":"全国"}];
          }else{
            this.chooseMenuArr = this.$refs.tree.getCheckedNodes();
            for(let j in this.chooseMenuArr){
              if(this.chooseMenuArr[j].children){
                this.chooseMenuArr.splice(Number(j)+Number(1),this.chooseMenuArr[j].children.length);
              }
            }
            codeArr = [];
            this.$refs.tree.getCheckedKeys().forEach((item=>{
              codeArr.push(item);
            }))
          };
        },
        close(ele){
          /*document.getElementById(ele).remove();*/
          this.chooseMenuArr.splice(ele, 1);
          //更新树插件的选中状态
          codeArr = [];
          for(var i in this.chooseMenuArr){
            if(this.chooseMenuArr[i].id == "all"){
              return
            }else{
              codeArr.push(this.chooseMenuArr[i].id)
            }
          }
          this.$refs.tree.setCheckedKeys(codeArr);
        },
        nextStep(){
          if(this.chooseMenuArr.length<=0){
            this.service = true;
             return;
          }
          sessionStorage.setItem("chooseMenuArr",JSON.stringify(this.chooseMenuArr));
          this.$router.push({
            name:"secondStep",
            query: {serviceID: this.$route.query.serviceID,serviceName:this.basicInfor.serviceName,templateID:this.basicInfor.templateID},
            params:this.chooseMenuArr
          });
          this.bus.$emit("step","secondStep");
        },
        hide(){
          this.isOpen = false;
        },
        show(){
          this.isOpen = true;
        }
      },
      watch:{
      }
  }
</script>
<style scoped>
  @import "../../assets/css/public2.css";
  @import "../../assets/css/serviceDetails.css";
  @import "../../assets/css/serviceApply.css";
</style>
