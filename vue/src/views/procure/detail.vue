<template>
  <div class="content">
    <!--位置信息 start-->
    <div class="bread-crumbs">
      <div class="bread-crumbs-content">
        <span class="cor-0498e4">服务采购管理</span>
        <span class="locationgLine">&frasl;</span>
        <span class="cor-0498e4 cor-pointer" @click="renderTo()">服务采购审核</span>
        <span class="locationgLine">&frasl;</span>
        <span class="corBlue">详情</span>
      </div>
    </div>
    <!--位置信息 end-->
    <div class="rm-main-box">
      <!--内容信息 start-->
      <div class="deleteCon">
        <div class="deleteListCon">
          <div class="publicTitle"><i class="lineBlue"></i>申请单信息</div>
          <div class="publicList">
            <label>申请单编号：</label>
            <span>{{dataList.procureID}}</span>
          </div>
          <div class="publicList">
            <label>申请时间：</label>
            <span>{{dataList.applyTime}}</span>
          </div>
          <div class="publicList">
            <label>申请单状态：</label>
            <span class="pendReview" v-if="dataList.status==1"><i class="icon3 icon-pendReview"></i>待审核</span>
            <span v-else-if="dataList.status==4"><i class="icon3 icon-cancel"></i>已撤销</span>
            <span v-else-if="dataList.status==2" class="certifiedStatus"><i class="icon3 icon-passed"></i>已通过</span>
            <span v-else="dataList.status==3" class="certifiedStatus not"><i class="icon3 icon-notPassed"></i>未通过</span>
          </div>
          <!--未通过时（显示）驳回的意见 -->
          <div class="publicList" v-if="dataList.status==3">
            <label>驳回意见：</label>
            <span>
                    			<textarea class="realName-textarea" v-model="dataList.reviewed" maxlength="200" disabled="disabled"></textarea>
                    		</span>
          </div>
        </div>
        <div class="deleteListCon">
          <div class="publicTitle"><i class="lineBlue"></i>服务信息</div>
          <div class="publicList">
            <label>服务名称：</label>
            <span class="corBlue">{{dataList.serviceName}}</span>
          </div>
          <div class="publicList">
            <label>服务分类：</label>
            <span>{{fenlei[dataList.serviceType]}}</span>
          </div>
          <div class="publicList">
            <label>服务范围：</label>
            <span>{{dataList.city}}</span>
          </div>
          <div class="publicList">
            <label>服务说明：</label>
            <span><b class="description">{{dataList.summary}}</b></span>
          </div>
          <div class="publicList clearfix">
            <label class="flt">服务提供方式：</label>
            <span class="otherSpan flt">
            					<p class="title"><i class="icon3 icon-sex active"></i>公共服务打包输出</p>
            					<p class="tips">注：公共服务打包输出：政务数据与服务集成的公共服务可按照事项内容封装并整体提供，包括整套服务页面及服务内容，需求方可以直接进行调用。</p>
            				</span>
          </div>
          <div class="publicList">
            <label>服务来源：</label>
            <span>{{dataList.serviceSource}}</span>
          </div>
        </div>
        <div class="deleteListCon">
          <div class="publicTitle"><i class="lineBlue"></i>服务申请人信息</div>
          <div class="publicList">
            <label>联系人姓名：</label>
            <span>{{dataList.contactName}}</span>
          </div>
          <div class="publicList">
            <label>联系人手机号：</label>
            <span>{{dataList.contactPhone}}</span>
          </div>
          <div class="publicList">
            <label>单位名称：</label>
            <span><b class="description">{{dataList.unitName}}</b></span>
          </div>
          <div class="publicList">
            <label>通讯地址：</label>
            <span><b class="description">{{dataList.address}}</b></span>
          </div>
          <div class="publicList">
            <label>电子邮箱：</label>
            <span><b class="description">{{dataList.email}}</b></span>
          </div>
          <div class="publicList">
            <label>服务接入用途：</label>
            <span><b class="description">{{dataList.serviceUse}}</b></span>
          </div>
          <div class="publicList">
            <label>接入用途地址：</label>
            <span><b class="description" v-for="(item,index) in dataList.useForAddress">{{userForList[item.useFor]}}：{{item.address}}</b></span>
          </div>
        </div>
      </div>
      <!--内容信息 end-->
      <!--按钮 start-->
      <div class="btnBgBox" v-show="dataList.status==1">
        <button class="btn-defalut btn-blue" v-if="dataList.status==1" @click="checkIn()">审核通过</button>
        <button class="btn-defalut btn-white" v-if="dataList.status==1" @click="checkNoBtn()">驳回</button>
        <button class="btn-defalut btn-red" style="display: none;">撤销申请</button>
      </div>
      <!--按钮 end-->
    </div>
    <!--成功提示 start-->
    <div class="dialog-container" style="display: none;" v-show="popSucc">
      <div class="dialog-inner">
        <header class="dialog-header">
          <div class="dialog-header-tit fl">提示</div>
          <div class="icon2 dialog-header-close fr" @click="popClose(true)"></div>
        </header>
        <div class="dialog-body">
          <div class="dialogPic"><img src="../../assets/img/dialog-successPic.png"></div>
          <div class="dialogWord">通过审核！</div>
        </div>
      </div>
    </div>
    <!--成功提示 end-->
    <!--失败提示 start-->
    <div class="dialog-container"  v-show="popErr">
      <div class="dialog-inner">
        <header class="dialog-header">
          <div class="dialog-header-tit fl">提示</div>
          <div class="icon2 dialog-header-close fr" @click="popClose(false)"></div>
        </header>
        <div class="dialog-body">
          <div class="dialogPic"><img src="../../assets/img/dialog-failurePic.png"></div>
          <div class="dialogWord">审核失败！</div>
        </div>
      </div>
    </div>
    <!--失败提示 end-->
    <div v-show="popShow" class="mask"></div>
    <!--驳回意见 start-->
    <div v-if="isReviewSuggest" class="dialog-container add-catalog-dialog">
      <div class="dialog-inner">
        <header class="dialog-header">
          <div class="dialog-header-tit flt">驳回意见</div>
          <div class="icon3 dialog-header-close frt" @click="closeCheckNo()"></div>
        </header>
        <div class="dialog-body">
          <div class="textareaDivBox">
            <textarea v-model="rejectReason" placeholder="请输入您的驳回意见" maxlength="200" @blur="inputBlur()"></textarea>
          </div>
          <div class="error-tips-box other describeTips" v-show="reviewSuggestTips">&nbsp;&nbsp;{{reviewSuggestTips}}</div>

        </div>
        <footer class="dialog-footer">
          <ul class="btn-list">
            <li class="btn-item btn-item-acvite" @click="checkNo()">提  交</li>
            <li class="btn-item" @click="closeCheckNo()">取  消</li>
          </ul>
        </footer></div>
    </div>
    <MaskTip v-bind:tips = "tips"
             v-bind:tipsContent = "tipsContent"
             v-bind:ifSuccess = "ifSuccess"
             v-bind:loading = "loading">
    </MaskTip>
  </div>
</template>
<script type="text/ecmascript-6">
  import MaskTip from '@/views/module/mask';
  export default{
    name:'detail',
    data(){
      return {
        procureID:'',
        serviceID:'',
        loading:false,
        tipsContent: '',
        ifSuccess: false,
        tips: false,
        dataList:{},
        popShow:false,
        popSucc:false,
        popErr:false,
        rejectReason:'',
        t:'',
        isReviewSuggest:false,
        reviewSuggestTips:'',
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
        userForList:{
          "app": "app",
          "web": "web端",
          "weChat": "微信端",
          "wap": "wap",
          "other": "其他"
        }
      }
    },
    computed:{

    },
    components: {
      MaskTip
    },
    methods:{
      checkNo(){
        if(!this.inputBlur()){
          return;
        }
        this.isReviewSuggest=false;
        this.popShow=false;
        this.loading = true;
        let data={
          procureID:this.procureID,
          rejectReason:this.rejectReason.trim(),
          type:'2'
        }
        this.$http({
          method: 'post',
          url: '/procure/checkProcure',
          data: data
        }).then((res)=>{
         this.loading = false;
          let data=res.data;
          if(data.code=='200'){
            this.tips = true;
            this.tipsContent = '已驳回！';
            this.ifSuccess = true;
            setTimeout(() => {
              this.tips = false;
              this.$router.push({
                path: '/procureManage',
                name: "procureManage",
              })
            }, 1500);
          }else{
            this.tips = true;
            this.tipsContent = "提交失败";
            this.ifSuccess = false;
            setTimeout(() => {
              this.tips = false;
            }, 1500);
          }
        }).catch((err)=>{
          this.loading = false;
          this.tips = true;
          this.tipsContent = "提交失败";
          this.ifSuccess = false;
          setTimeout(() => {
            this.tips = false;
          }, 1500);
        })
      },
      inputBlur(){
        var reg= /^([\u4e00-\u9fa5]|\,|\.|\，|\。)*$/g;
        if (!this.rejectReason.trim()) {
          this.reviewSuggestTips = "请输入驳回意见";
          return false;
        } else if(!reg.test(this.rejectReason.trim())){
          this.reviewSuggestTips = "只能输入中文";
          return false;
        }else if(this.rejectReason.trim()>200){
          this.reviewSuggestTips = "至多输入200个中文";
          return false;
        }else{
          this.reviewSuggestTips = "";
          return true;
        }
      },
      closeCheckNo(){
        this.isReviewSuggest=false;
        this.reviewSuggestTips = "";
        this.popShow=false;
        this.rejectReason='';
      },
      checkNoBtn(){
        this.isReviewSuggest=true;
        this.popShow=true;
      },
      checkIn(){
        this.loading = true;
        let data={
          procureID:this.procureID,
          rejectReason:this.rejectReason,
          type:'1'
        }
        this.$http({
          method: 'post',
          url: '/procure/checkProcure',
          data: data
        }).then((res)=>{
          this.loading = false;
          let data=res.data;
          if(data.code=='200'){
            this.tips = true;
            this.tipsContent = '通过审核！';
            this.ifSuccess = true;
            setTimeout(() => {
              this.tips = false;
              this.$router.push({
                path: '/procureManage',
                name: "procureManage",
              })
            }, 1500);
          }else{
            this.tips = true;
            this.tipsContent = "提交失败";
            this.ifSuccess = false;
            setTimeout(() => {
              this.tips = false;
            }, 1500);
          }
        }).catch((err)=>{
          this.loading = false;
          this.tips = true;
          this.tipsContent = "提交失败";
          this.ifSuccess = false;
          setTimeout(() => {
            this.tips = false;
          }, 1500);
          })
      },
      getData(){
        let data={
          serviceID:this.serviceID,
          procureID:this.procureID
        }
        this.$http({
          method: 'post',
          url: '/procure/getProcureInfo',
          data: data
        }).then((res)=>{
          this.loading = false;
          let data=res.data;
          if(data.code=='200'){
            this.dataList = data.info;
            var arr=this.dataList.city.split(',');
            var j='';
            arr.forEach(arr=>{
              j+=this.city[arr.trim()]+',';
            });
            j=j.substring(0,j.length-1);
            this.dataList.city=j;
            this.dataList.serviceType=this.dataList.serviceID[0];

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
      renderTo(){
        this.$router.push({
          path: '/home/procure/procureManage'
        })
      }

    },
    created(){
      this.loading = true;
      this.procureID=this.$route.query.procureID;
      this.serviceID=this.$route.query.serviceID;
      this.getData();
    }
  }
</script>
<style>
.description{
  	line-height: 25px;
    display: inline-block;
    margin-top: 13px;
  }
</style>
