<template>
  <div class="content">
    <!--位置信息 start-->
    <div class="bread-crumbs">
      <div class="bread-crumbs-content">
        <span class="cor-0498e4">服务采购管理</span>
        <span class="locationgLine">&frasl;</span>
        <span class="corBlue">服务采购审核</span>
      </div>
    </div>
    <!--位置信息 end-->
    <div class="rm-main-box">
      <div class="tabListTit clearfix">
        <ul @click="chooseStatus($event)">
          <li value='' :class="{active:chooseStatusType==0}">全部</li>
          <li value="1" :class="{active:chooseStatusType==1}">待审核</li>
          <li value="2" :class="{active:chooseStatusType==2}">审核通过</li>
          <li value="3" :class="{active:chooseStatusType==3}">审核未通过</li>
          <li value="4" :class="{active:chooseStatusType==4}">已撤销</li>
        </ul>
      </div>
      <div class="">
        <!--搜索条件 start-->
        <div class="rl-main-aside clearfix">
          <a href="javascript:void(0);" title="全部导出" class="rl-operate-btn active flt" @click="exp"><i class="icon2 icon-exportAll" ></i>全部导出</a>
          <a href="javascript:;" title="查询" class="rl-operate-btn active frt btnSearch" @click="search()">查询</a>
          <div class="frt">
            <label class="downMenuTit flt">关键字：</label>
            <div class="resource-sort-search-box frt">
              <input ref="keyword" class="inner-search-inp wdh226" type="search" v-model="key" placeholder="请输入服务名称/申请人姓名关键字">
            </div>
          </div>
          <div class="downMenu fr clearfix" @click="togglecityJson" >
            <label class="downMenuTit fl">服务范围：</label>
            <div class="select-box result_select wh140 fr">
              <span class="defaul_option">{{currCity.name}}</span>
              <i class="icon2 icon-downMenu-symbol fr"></i>
              <!--<transition name="slide">-->
                <!--<div class="cityCon" >-->
                  <ul v-show="cityJson.isOpen">
                  	<!--<input type="search" class="search-serviceArea">产品要添加的搜索框-->
                    <li value="1" v-for="city in cityJson.list" :city="city.id" @click.stop="selectedSort(city)">{{city.name}}</li>
                  </ul>
                <!--</div>-->
              <!--</transition>-->
            </div>
          </div>
          <div class="downMenu fr clearfix" @click="toggleServiceType">
            <label class="downMenuTit fl">服务分类：</label>
            <div class="select-box result_select fr">
              <span class="defaul_option">{{serviceType.name}}</span>
              <i class="icon2 icon-downMenu-symbol fr"></i>
              <!--<div class="cityCon" >-->
                <!--<transition name="slide">-->
                  <ul v-show="serviceTypeJson.isOpen">
                    <li value="1" v-for="service in serviceTypeJson.list" :service="service.id" @click.stop="selectedService(service)">{{service.name}}</li>
                  </ul>
                <!--</transition>-->
              <!--</div>-->
            </div>
          </div>
        </div>
        <!--搜索条件 end-->
        <div class="rm-main-content">
          <table class="mainTable fwcgTable">
            <thead>
            <tr>
              <th class="percent17">申请单编号</th>
              <th>服务名称</th>
              <th class="percent10">服务范围</th>
              <th class="percent10">服务分类</th>
              <th>单位名称</th>
              <th class="percent11">申请人姓名</th>
              <th class="percent12">申请日期</th>
              <th class="percent10">审核状态</th>
              <th class="percent8 center">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="procure in serviceListArr">
              <td class="num">{{procure.procureID}}</td>
              <td><span class="clampHide">{{procure.serviceName}}</span></td>
              <td class="percentageWh11"><span class="clampHide">{{procure.city}}</span></td>
              <td v-if="procure.serviceID">{{fenlei[procure.serviceID[0]]}}</td>
              <td><span class="clampHide">{{procure.unitName}}</span></td>
              <td>{{procure.contactName}}</td>
              <td>{{procure.applyTime.split(' ')[0]}}</td>
              <td class="" v-if="procure.status==1"><span class="status" >待审核</span></td>
              <td class="" v-else-if="procure.status==2"><span class="status" >已通过</span></td>
              <td class="" v-else-if="procure.status==3"><span class="status abnormal" >未通过</span></td>
              <td class=""  v-else="procure.status==4"><span class="status abnormal" >已撤销</span></td>
              <td v-if="procure.status==4 || procure.status==3 || procure.status==2">
                <div class="rm-main-icon-box" @click="jump(procure.procureID,procure.serviceID)">
                  <a class="rm-icon-btn" href="javascript:;" title="查看">
                    <i class="icon2 icon-view"></i>
                  </a>
                </div>
              </td>
              <td class="wh66" v-else="procure.status==1">
                <div class="rm-main-icon-box" @click="jump(procure.procureID,procure.serviceID)">
                  <a class="rm-icon-btn" href="javascript:;" title="审核">
                    <i class="icon2 icon-verify"></i>
                  </a>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
          <!--加载中 start-->
          <div class="loading" v-show="loadingFlag">
            <div><img src="../../assets/img/loader.gif" width="45" height="43"></div>
            <!--<div class="loadWord">加载中，请稍候...</div>-->
          </div>
          <!--加载中 end-->
          <!--还没有申请记录 start-->
          <div class="noRecordList" v-show="noResult">
            <div class="noRecordPicBox"><img src="../../assets/img/noRecordPic.png"/></div>
            <div class="noRecorWord">{{initFlag?'亲，没有申请记录哦～':'暂无查询数据'}}</div>
          </div>
          <div class="page-box clearfix" v-show="!noResult">
            <div class="flt">
              <div class="page-go-box flt">
                <span class="page-txt flt">{{"共"+serviceListCount+"条记录，每页显示"}}</span>
                <span class="perPageShow flt" ref="rows" @click="showRowsList()" @click.stop>
                                	{{rows}}
                                	<i class="icon4 icon-downMenu"></i>
                                <ul v-if="rowsListShow" @click="chooseRows($event)" @click.stop>
                                  <li>10</li>
                                  <li>15</li>
                                  <li>20</li>
                                </ul>
                                </span>
                <span class="page-txt flt">条</span>
              </div>
            </div>
            <div class="page-main frt">
              <div class="flt">
                <el-pagination
                  @size-change="rowsChange"
                  @current-change="rowsChange"
                  :current-page.sync="page"
                  :page-size="rows"
                  layout="prev, pager, next, jumper"
                  :total="serviceListCount">
                </el-pagination>
              </div>
              <div class="page-go-box flt">
                <a class="page-btn" href="javascript:;">确定</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MaskTip v-bind:loading = "loading"></MaskTip>

  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex';
  import MaskTip from '@/views/module/mask';
  import {baseUrl} from '@/config/env';
  export default{
    name:'templateIndex',
    data(){
      return {
        chooseStatusType: "",//查询时审核状态（1：待审核，2：已撤销，3：审核已通过，4：审核未通过）
        key:'',  //搜索关键字
        rows: 10,//每页显示几条
        page: 1,//当前页数
        rowsListShow: false,//每页显示几条点击事件用的flag参数
        cityJson: {    // 服务范围选择
          isOpen: false,
          list: [
            {id:'',name:'全部'},
            {id:'all',name:'全国'},
            {id:'110000',name:'北京市'},
            {id:'120000',name:'天津市'},
            {id:'310000',name:'上海市'},
            {id:'500000',name:'重庆市'},
            {id:'130000',name:'河北省'},
            {id:'140000',name:'山西省'},
            {id:'210000',name:'辽宁省'},
            {id:'220000',name:'吉林省'},
            {id:'230000',name:'黑龙江省'},
            {id:'320000',name:'江苏省'},
            {id:'330000',name:'浙江省'},
            {id:'340000',name:'安徽省'},
            {id:'350000',name:'福建省'},
            {id:'360000',name:'江西省'},
            {id:'370000',name:'山东省'},
            {id:'410000',name:'河南省'},
            {id:'420000',name:'湖北省'},
            {id:'430000',name:'湖南省'},
            {id:'440000',name:'广东省'},
            {id:'460000',name:'海南省'},
            {id:'510000',name:'四川省'},
            {id:'520000',name:'贵州省'},
            {id:'530000',name:'云南省'},
            {id:'610000',name:'陕西省'},
            {id:'620000',name:'甘肃省'},
            {id:'630000',name:'青海省'},
            {id:'710000',name:'台湾省'},
            {id:'150000',name:'内蒙古自治区'},
            {id:'450000',name:'广西壮族自治区'},
            {id:'540000',name:'西藏自治区'},
            {id:'640000',name:'宁夏回族自治区'},
            {id:'650000',name:'新疆自治区'},
            {id:'810000',name:'香港特别行政区'},
            {id:'820000',name:'澳门特别行政区'}
          ]
        },
        currCity:{id:'', name:'全部'},   // 当前选中城市
        serviceTypeJson: {    // 服务范围选择
          isOpen: false,
          list: [
            {id:'',name:'全部'},
            {id:'A',name:'交通'},
            {id:'B',name:'社会保障'},
            {id:'C',name:'教育'},
            {id:'D',name:'医疗'},
            {id:'E',name:'民政'},
            {id:'F',name:'证件办理'},
            {id:'G',name:'旅游'},
            {id:'L',name:'政务服务'},
            {id:'M',name:'文化体育'},
            {id:'I',name:'投诉举报'},
            {id:'K',name:'税务'},
            {id:'X',name:'信用服务'},
            {id:'Y',name:'法规查询'},
            {id:'Z',name:'其他'}
          ]
        },
        serviceType:{id:'', name:'全部'},   // 当前选中城市
        serviceListCount: 0,//列表数据总条数
        serviceListArr: [],//首页初始化获取数据列表
        city:{
          "all": "全国",
          "110000": "北京市",
          "110100": "北京市",
          "120000": "天津市",
          "120100": "天津市",
          "130000": "河北省",
          "130100": "石家庄市",
          "130200": "唐山市",
          "130300": "秦皇岛市",
          "130400": "邯郸市",
          "130500": "邢台市",
          "130600": "保定市",
          "130700": "张家口市",
          "130800": "承德市",
          "130900": "沧州市",
          "131000": "廊坊市",
          "131100": "衡水市",
          "139000": "省直辖县级行政区划",
          "140000": "山西省",
          "140100": "太原市",
          "140200": "大同市",
          "140300": "阳泉市",
          "140400": "长治市",
          "140500": "晋城市",
          "140600": "朔州市",
          "140700": "晋中市",
          "140800": "运城市",
          "140900": "忻州市",
          "141000": "临汾市",
          "141100": "吕梁市",
          "150000": "内蒙古自治区",
          "150100": "呼和浩特市",
          "150200": "包头市",
          "150300": "乌海市",
          "150400": "赤峰市",
          "150500": "通辽市",
          "150600": "鄂尔多斯市",
          "150700": "呼伦贝尔市",
          "150800": "巴彦淖尔市",
          "150900": "乌兰察布市",
          "152200": "兴安盟",
          "152500": "锡林郭勒盟",
          "152900": "阿拉善盟",
          "210000": "辽宁省",
          "210100": "沈阳市",
          "210200": "大连市",
          "210300": "鞍山市",
          "210400": "抚顺市",
          "210500": "本溪市",
          "210600": "丹东市",
          "210700": "锦州市",
          "210800": "营口市",
          "210900": "阜新市",
          "211000": "辽阳市",
          "211100": "盘锦市",
          "211200": "铁岭市",
          "211300": "朝阳市",
          "211400": "葫芦岛市",
          "220000": "吉林省",
          "220100": "长春市",
          "220200": "吉林市",
          "220300": "四平市",
          "220400": "辽源市",
          "220500": "通化市",
          "220600": "白山市",
          "220700": "松原市",
          "220800": "白城市",
          "222400": "延边朝鲜族自治州",
          "230000": "黑龙江省",
          "230100": "哈尔滨市",
          "230200": "齐齐哈尔市",
          "230300": "鸡西市",
          "230400": "鹤岗市",
          "230500": "双鸭山市",
          "230600": "大庆市",
          "230700": "伊春市",
          "230800": "佳木斯市",
          "230900": "七台河市",
          "231000": "牡丹江市",
          "231100": "黑河市",
          "231200": "绥化市",
          "232700": "大兴安岭地区",
          "310000": "上海市",
          "310100": "上海市",
          "320000": "江苏省",
          "320100": "南京市",
          "320200": "无锡市",
          "320300": "徐州市",
          "320400": "常州市",
          "320500": "苏州市",
          "320600": "南通市",
          "320700": "连云港市",
          "320800": "淮安市",
          "320900": "盐城市",
          "321000": "扬州市",
          "321100": "镇江市",
          "321200": "泰州市",
          "321300": "宿迁市",
          "330000": "浙江省",
          "330100": "杭州市",
          "330200": "宁波市",
          "330300": "温州市",
          "330400": "嘉兴市",
          "330500": "湖州市",
          "330600": "绍兴市",
          "330700": "金华市",
          "330800": "衢州市",
          "330900": "舟山市",
          "331000": "台州市",
          "331100": "丽水市",
          "340000": "安徽省",
          "340100": "合肥市",
          "340200": "芜湖市",
          "340300": "蚌埠市",
          "340400": "淮南市",
          "340500": "马鞍山市",
          "340600": "淮北市",
          "340700": "铜陵市",
          "340800": "安庆市",
          "341000": "黄山市",
          "341100": "滁州市",
          "341200": "阜阳市",
          "341300": "宿州市",
          "341500": "六安市",
          "341600": "亳州市",
          "341700": "池州市",
          "341800": "宣城市",
          "350000": "福建省",
          "350100": "福州市",
          "350200": "厦门市",
          "350300": "莆田市",
          "350400": "三明市",
          "350500": "泉州市",
          "350600": "漳州市",
          "350700": "南平市",
          "350800": "龙岩市",
          "350900": "宁德市",
          "360000": "江西省",
          "360100": "南昌市",
          "360200": "景德镇市",
          "360300": "萍乡市",
          "360400": "九江市",
          "360500": "新余市",
          "360600": "鹰潭市",
          "360700": "赣州市",
          "360800": "吉安市",
          "360900": "宜春市",
          "361000": "抚州市",
          "361100": "上饶市",
          "370000": "山东省",
          "370100": "济南市",
          "370200": "青岛市",
          "370300": "淄博市",
          "370400": "枣庄市",
          "370500": "东营市",
          "370600": "烟台市",
          "370700": "潍坊市",
          "370800": "济宁市",
          "370900": "泰安市",
          "371000": "威海市",
          "371100": "日照市",
          "371200": "莱芜市",
          "371300": "临沂市",
          "371400": "德州市",
          "371500": "聊城市",
          "371600": "滨州市",
          "371700": "菏泽市",
          "410000": "河南省",
          "410100": "郑州市",
          "410200": "开封市",
          "410300": "洛阳市",
          "410400": "平顶山市",
          "410500": "安阳市",
          "410600": "鹤壁市",
          "410700": "新乡市",
          "410800": "焦作市",
          "410900": "濮阳市",
          "411000": "许昌市",
          "411100": "漯河市",
          "411200": "三门峡市",
          "411300": "南阳市",
          "411400": "商丘市",
          "411500": "信阳市",
          "411600": "周口市",
          "411700": "驻马店市",
          "419000": "省直辖县级行政区划",
          "420000": "湖北省",
          "420100": "武汉市",
          "420200": "黄石市",
          "420300": "十堰市",
          "420500": "宜昌市",
          "420600": "襄阳市",
          "420700": "鄂州市",
          "420800": "荆门市",
          "420900": "孝感市",
          "421000": "荆州市",
          "421100": "黄冈市",
          "421200": "咸宁市",
          "421300": "随州市",
          "422800": "恩施土家族苗族自治州",
          "429000": "省直辖县级行政区划",
          "430000": "湖南省",
          "430100": "长沙市",
          "430200": "株洲市",
          "430300": "湘潭市",
          "430400": "衡阳市",
          "430500": "邵阳市",
          "430600": "岳阳市",
          "430700": "常德市",
          "430800": "张家界市",
          "430900": "益阳市",
          "431000": "郴州市",
          "431100": "永州市",
          "431200": "怀化市",
          "431300": "娄底市",
          "433100": "湘西土家族苗族自治州",
          "440000": "广东省",
          "440100": "广州市",
          "440200": "韶关市",
          "440300": "深圳市",
          "440400": "珠海市",
          "440500": "汕头市",
          "440600": "佛山市",
          "440700": "江门市",
          "440800": "湛江市",
          "440900": "茂名市",
          "441200": "肇庆市",
          "441300": "惠州市",
          "441400": "梅州市",
          "441500": "汕尾市",
          "441600": "河源市",
          "441700": "阳江市",
          "441800": "清远市",
          "441900": "东莞市",
          "442000": "中山市",
          "445100": "潮州市",
          "445200": "揭阳市",
          "445300": "云浮市",
          "450000": "广西壮族自治区",
          "450100": "南宁市",
          "450200": "柳州市",
          "450300": "桂林市",
          "450400": "梧州市",
          "450500": "北海市",
          "450600": "防城港市",
          "450700": "钦州市",
          "450800": "贵港市",
          "450900": "玉林市",
          "451000": "百色市",
          "451100": "贺州市",
          "451200": "河池市",
          "451300": "来宾市",
          "451400": "崇左市",
          "460000": "海南省",
          "460100": "海口市",
          "460200": "三亚市",
          "460300": "三沙市",
          "460400": "儋州市",
          "469000": "椰岛市民云",
          "500000": "重庆市",
          "500100": "重庆市",
          "500200": "县",
          "510000": "四川省",
          "510100": "成都市",
          "510300": "自贡市",
          "510400": "攀枝花市",
          "510500": "泸州市",
          "510600": "德阳市",
          "510700": "绵阳市",
          "510800": "广元市",
          "510900": "遂宁市",
          "511000": "内江市",
          "511100": "乐山市",
          "511300": "南充市",
          "511400": "眉山市",
          "511500": "宜宾市",
          "511600": "广安市",
          "511700": "达州市",
          "511800": "雅安市",
          "511900": "巴中市",
          "512000": "资阳市",
          "513200": "阿坝藏族羌族自治州",
          "513300": "甘孜藏族自治州",
          "513400": "凉山彝族自治州",
          "520000": "贵州省",
          "520100": "贵阳市",
          "520200": "六盘水市",
          "520300": "遵义市",
          "520400": "安顺市",
          "520500": "毕节市",
          "520600": "铜仁市",
          "522300": "黔西南布依族苗族自治州",
          "522600": "黔东南苗族侗族自治州",
          "522700": "黔南布依族苗族自治州",
          "530000": "云南省",
          "530100": "昆明市",
          "530300": "曲靖市",
          "530400": "玉溪市",
          "530500": "保山市",
          "530600": "昭通市",
          "530700": "丽江市",
          "530800": "普洱市",
          "530900": "临沧市",
          "532300": "楚雄彝族自治州",
          "532500": "红河哈尼族彝族自治州",
          "532600": "文山壮族苗族自治州",
          "532800": "西双版纳傣族自治州",
          "532900": "大理白族自治州",
          "533100": "德宏傣族景颇族自治州",
          "533300": "怒江傈僳族自治州",
          "533400": "迪庆藏族自治州",
          "540000": "西藏自治区",
          "540100": "拉萨市",
          "540200": "日喀则市",
          "540300": "昌都市",
          "540400": "林芝市",
          "540500": "山南市",
          "542400": "那曲地区",
          "542500": "阿里地区",
          "610000": "陕西省",
          "610100": "西安市",
          "610200": "铜川市",
          "610300": "宝鸡市",
          "610400": "咸阳市",
          "610500": "渭南市",
          "610600": "延安市",
          "610700": "汉中市",
          "610800": "榆林市",
          "610900": "安康市",
          "611000": "商洛市",
          "620000": "甘肃省",
          "620100": "兰州市",
          "620200": "嘉峪关市",
          "620300": "金昌市",
          "620400": "白银市",
          "620500": "天水市",
          "620600": "武威市",
          "620700": "张掖市",
          "620800": "平凉市",
          "620900": "酒泉市",
          "621000": "庆阳市",
          "621100": "定西市",
          "621200": "陇南市",
          "622900": "临夏回族自治州",
          "623000": "甘南藏族自治州",
          "630000": "青海省",
          "630100": "西宁市",
          "632100": "海东市",
          "632200": "海北藏族自治州",
          "632300": "黄南藏族自治州",
          "632500": "海南藏族自治州",
          "632600": "果洛藏族自治州",
          "632700": "玉树藏族自治州",
          "632800": "海西蒙古族藏族自治州",
          "640000": "宁夏回族自治区",
          "640100": "银川市",
          "640200": "石嘴山市",
          "640300": "吴忠市",
          "640400": "固原市",
          "640500": "中卫市",
          "650000": "新疆维吾尔自治区",
          "650100": "乌鲁木齐市",
          "650200": "克拉玛依市",
          "650400": "吐鲁番市",
          "650500": "哈密市",
          "652300": "昌吉回族自治州",
          "652700": "博尔塔拉蒙古自治州",
          "652800": "巴音郭楞蒙古自治州",
          "652900": "阿克苏地区",
          "653000": "克孜勒苏柯尔克孜自治州",
          "653100": "喀什地区",
          "653200": "和田地区",
          "654000": "伊犁哈萨克自治州",
          "654200": "塔城地区",
          "654300": "阿勒泰地区",
          "659000": "自治区直辖县级行政区划",
          "710000": "台湾省",
          "810000": "香港特别行政区",
          "820000": "澳门特别行政区"
        },
        fenlei:{
          'A': '交通',
          'B': '社会保障',
          'C': '教育',
          'D': '医疗卫生',
          'E': '民政',
          'H': '出入境',
          'M': '文化体育',
          'G': '旅游',
          'I': '举报',
          'K': '税务',
          'X': '信用',
          'Y': '法规查询',
          'L': '政务',
          'Z': '其他'
        },
        noResult:false,
        loadingFlag:false,
        loading:false,
        initFlag:true
      }
    },
    computed:{
      ...mapGetters(['getUserInfo'])
    },
    components: {
      MaskTip
    },
    methods:{
      exp(){
        window.location.href=baseUrl+"/exportExcel/exportExcel?status="+Number(this.chooseStatusType);
      },
      getOpenID() {//初始化数据
        if (this.getUserInfo) {
          if (typeof this.getUserInfo == 'string') {
            this.openID = JSON.parse(this.getUserInfo).openID;
          } else {
            this.openID = this.getUserInfo.openID;
          }
        }
      },
      chooseStatus(e){//查询时，运行状态选择点击事件
        this.chooseStatusType = e.target.value;
        this.currCity.name = '全部';
        this.currCity.id = '';
        this.serviceType.name = '全部';
        this.serviceType.id = '';
        this.page = 1;
        this.rows = 10;
        this.$refs.keyword.value = "";
        this.loading = true;
        this.initFlag=false;
        this.getData();
      },
      showRowsList(){//每页显示几条选择点击事件
        this.rowsListShow ? this.rowsListShow = false : this.rowsListShow = true;
        document.addEventListener('click', this.toggle1)
      },
      toggle1(e){
        let flag = document.getElementsByClassName('perPageShow')[0].contains(e.target);
        if(!flag) {
          this.rowsListShow = false;
        }else{
          return;
        }
        document.removeEventListener('click',this.toggle1)
      },
      chooseRows(e){//每页显示几条选择点击事件
        this.page = 1;
        this.rows = Number(e.target.innerText);
        this.rowsListShow = false;
        this.rowsChange();
      },
      rowsChange(){   //切换页数
        this.initFlag=false;
        this.getData()
      },
      toggle2(e){
        let flag = document.getElementsByClassName('select-box')[0].contains(e.target);
        if(!flag) {
          this.cityJson.isOpen = false;
        }else{
          return;
        }
        document.removeEventListener('click',this.toggle2)
      },
      togglecityJson () {
        this.cityJson.isOpen = !this.cityJson.isOpen;
          document.addEventListener('click', this.toggle2);
      },
      selectedSort (selectedData) {
        if (this.currCity.id !== selectedData.id) {
          this.currCity.name = selectedData.name;
          this.currCity.id = selectedData.id;
          this.cityJson.isOpen = !this.cityJson.isOpen;
        }
      },
      toggleServiceType (e) {
        this.serviceTypeJson.isOpen = !this.serviceTypeJson.isOpen;
        document.addEventListener('click', this.toggle3)
      },
      toggle3(e){
        let flag = document.getElementsByClassName('select-box')[1].contains(e.target);
        if(!flag) {
          this.serviceTypeJson.isOpen = false;
        }else{
          return;
        }
        document.removeEventListener('click',this.toggle3)
      },
      selectedService (selectedData) {
        if (this.serviceType.id !== selectedData.id) {
          this.serviceType.name = selectedData.name;
          this.serviceType.id = selectedData.id;
          this.serviceTypeJson.isOpen = !this.serviceTypeJson.isOpen;
        }
      },
      search(){
        this.page=1;
        this.serviceListCount= 0,
        this.serviceListArr=[],
        this.loadingFlag=true;
        this.initFlag=false;
        this.getData();
      },
      getData(){
        let data={
          key:this.key.trim(),
          pageSize:this.rows,   //
          pageNum:this.page,    //
          serviceType:this.serviceType.id,
          city:this.currCity.id,
//          status:this.chooseStatusType==0?'':''+this.chooseStatusType
        }
        this.chooseStatusType==0?"":data.status = Number(this.chooseStatusType)
        this.$http({
          method: 'post',
          url: '/procure/getProcureMan',
          data: data
        }).then((res)=>{
          this.loading = false;
          let data=res.data;
          if(data.code=='200'){
            this.serviceListArr = data.info.res;
            this.serviceListArr.forEach(info=>{
              var arr=info.city.split(',');
              var j='';
              arr.forEach(arr=>{
                j+=this.city[arr.trim()]+',';
              });
              j=j.substring(0,j.length-1);
              info.city=j;

            })
            this.serviceListCount = data.info.count;
            if(this.serviceListCount==0){
              this.noResult=true;
            }else{
              this.noResult=false;
            }
            if(this.loadingFlag)this.loadingFlag=false;
          } else {
            console.log("数据加载失败");
            if(this.loadingFlag)this.loadingFlag=false;
          }

        })
          .catch((err)=>{
            this.loading = false;
            if(this.loadingFlag)this.loadingFlag=false;
          })
      },
      jump(procureID,serviceID){//跳转详情页
        this.$router.push({
          name:"procureDetail",
          query:{
            "procureID":procureID,
            "serviceID":serviceID
          }
        })
      },
    },
    created(){
      this.getOpenID();
      this.getData()
    },
    mounted(){
    }
  }
</script>
<style>

</style>
