/*
 *@author ymj
 * @effect regionCode [json] 进入首页纪检监察机关举报 区分那个地区举报功能
 *@params [string] reportUrl 代表提交举报地址
 *@params [string] verificationUrl 代表验证码地址
 *@params [string] searchUrl 代表查询地址
 * @params [string] verificationUrl 代表验证码地址
 * @params [string] correctReportImg 代表判断验证码是否正确地址
 * @params [string] typeUrl 代表 政治面貌	级别	职务	问题类别 地址 @returns (1)level_jb[array] 被举报人级别 (2)level[array] 举报人级别 (3)question[array] 举报正文中题类别	 (4)political[array] 举报人政治面貌
 * 【天津 北京中央纪委国家监委 甘肃 海南 山东 上海 河北 海南  新疆维吾尔自治区纪委监委】网站有问题
 */
/*"regionArea": "中央纪委国家监委",
    "regionAreaId": "110001",

 "region": "新疆维吾尔自治区纪委监委",
 "regionId": "650000",


    */
var regionCode = [
    {   "code": "110000",
        "region": "北京市纪委监委",
        "copyright": "中共中央纪律检查委员会 中华人民共和国国家监察委员会",
        "reportUrl":"https://beijing.12388.gov.cn/xinfang/reportAction.do?method=save",
        "verificationUrl":"https://beijing.12388.gov.cn/xinfang/servlet/randimg",
        "searchUrl":"https://beijing.12388.gov.cn/xinfang/12388/jbxcx",
        "correctReportImg":"https://beijing.12388.gov.cn/xinfang/reportAction.do?method=check_save",
        "typeUrl":"https://beijing.12388.gov.cn/"
    },
    {
        "code": "120000",
        "region": "天津市纪委检委",
        "copyright": "中共天津市纪律检查委员会 天津市监察委员会",
        "reportUrl":"https://tianjin.12388.gov.cn/hepingqu/html/index_form.html"
    },
    {
        "code": "130000",
        "region": "河北省纪委监委",
        "copyright": "中共河北省纪律检查委员会 河北省监察委员会 "
    },
    {
        "code": "140000",
        "region": "山西省纪委监委",
        "copyright": "中共山西省纪律检查委员会 山西省监察委员会",
        "reportUrl":"http://shanxi.12388.gov.cn/xinfang/reportAction.do?method=save",
        "verificationUrl":"http://shanxi.12388.gov.cn/xinfang/servlet/randimg",
        "searchUrl":"http://shanxi.12388.gov.cn/xinfang/12388/jbxcx",
        "correctReportImg":"http://shanxi.12388.gov.cn/xinfang/reportAction.do?method=check_save",
        "typeUrl":"http://shanxi.12388.gov.cn/"
    },
    {
        "code": "150000",
        "region": "内蒙古自治区纪委监察委举报",
        "copyright": "中共内蒙古自治区纪委 内蒙古自治区监察委 ",
        "reportUrl":"http://neimeng.12388.gov.cn/xinfang/reportAction.do?method=saveReportInfo",
        "verificationUrl":"http://neimeng.12388.gov.cn/xinfang/servlet/randimg",
        "searchUrl":"http://neimeng.12388.gov.cn/xinfang/12388/jbxcx",
        "correctReportImg":"http://neimeng.12388.gov.cn/xinfang/reportAction.do?method=check_save",
        "typeUrl":"http://neimeng.12388.gov.cn/"
    },
    {
        "code": "210000",
        "region": "辽宁省纪委监察委",
        "copyright": "中共辽宁省纪律检查委员会 辽宁省监察委员会",
        "reportUrl":"http://liaoning.12388.gov.cn/xinfang/reportAction.do?method=saveReportInfo",
        "verificationUrl":"http://liaoning.12388.gov.cn/xinfang/servlet/randimg",
        "searchUrl":"http://liaoning.12388.gov.cn/xinfang/12388/jbxcx",
        "correctReportImg":"http://liaoning.12388.gov.cn/xinfang/reportAction.do?method=check_save",
        "typeUrl":"http://liaoning.12388.gov.cn/"
    },
    {
        "code": "220000",
        "region": "吉林省纪委监委",
        "copyright": "中共吉林省纪委 吉林省监察委员会",
        "reportUrl":"http://jilin.12388.gov.cn/xinfang/reportAction.do?method=saveReportInfo",
        "verificationUrl":"http://jilin.12388.gov.cn/xinfang/servlet/randimg",
        "searchUrl":"http://jilin.12388.gov.cn/xinfang/12388/jbxcx",
        "correctReportImg":"http://jilin.12388.gov.cn/xinfang/reportAction.do?method=check_save",
        "typeUrl":"http://jilin.12388.gov.cn/"
    },
    {
        "code": "230000",
        "region": "黑龙江省纪委监委",
        "copyright": "中共黑龙江省纪委 黑龙江省监委 ",
        "reportUrl":"https://heilongjiang.12388.gov.cn:8443/xinfang/reportAction.do?method=save",
        "verificationUrl":"https://heilongjiang.12388.gov.cn:8443/xinfang/servlet/randimg",
        "searchUrl":"https://heilongjiang.12388.gov.cn:8443/xinfang/12388/jbxcx",
        "correctReportImg":"https://heilongjiang.12388.gov.cn:8443/xinfang/reportAction.do?method=check_save",
        "typeUrl":"https://heilongjiang.12388.gov.cn:8443/"
    },
    {
        "code": "310000",
        "region": "上海市纪委监委",
        "copyright": " 中共天津市纪律检查委员会 天津市监察委员会"
    },
    {
        "code": "320000",
        "region": "江苏省纪委监委",
        "copyright": "中共江苏省纪委 江苏省监委 ",
        "reportUrl":"https://jiangsu.12388.gov.cn/xinfang/reportAction.do?method=save",
        "verificationUrl":"https://jiangsu.12388.gov.cn/xinfang/servlet/randimg",
        "searchUrl":"https://jiangsu.12388.gov.cn/xinfang/12388/jbxcx",
        "correctReportImg":"https://jiangsu.12388.gov.cn/xinfang/reportAction.do?method=check_save",
        "typeUrl":"https://jiangsu.12388.gov.cn/"
    },
    {
        "code": "330000",
        "region": "浙江省纪委监察委",
        "copyright": " 中共浙江省纪律检查委员会 浙江省监察委员会举报中心",
        "reportUrl":"http://zhejiang.12388.gov.cn/xinfang/reportAction.do?method=saveReportInfo",
        "verificationUrl":"http://zhejiang.12388.gov.cn/xinfang/servlet/randimg",
        "searchUrl":"http://zhejiang.12388.gov.cn/xinfang/12388/jbxcx",
        "correctReportImg":"http://zhejiang.12388.gov.cn/xinfang/reportAction.do?method=check_save",
        "typeUrl":"http://zhejiang.12388.gov.cn/"
    },
    {
        "code": "340000",
        "region": "安徽省纪委监委",
        "copyright": "中共安徽省纪委 安徽省监委 ",
        "reportUrl":"http://anhui.12388.gov.cn/xinfang/reportAction.do?method=saveReportInfo",
        "verificationUrl":"http://anhui.12388.gov.cn/xinfang/servlet/randimg",
        "searchUrl":"http://anhui.12388.gov.cn/xinfang/12388/jbxcx",
        "correctReportImg":"http://anhui.12388.gov.cn/xinfang/reportAction.do?method=check_save",
        "typeUrl":"http://anhui.12388.gov.cn/"
    },
    {
        "code": "350000",
        "region": "福建省纪委监委",
        "copyright": "中共福建省纪律检查委员会 福建省监察委员会 ",
        "reportUrl":"https://fujian.12388.gov.cn/xinfang/reportAction.do?method=saveReportInfo",
        "verificationUrl":"https://fujian.12388.gov.cn/xinfang/servlet/randimg",
        "searchUrl":"https://fujian.12388.gov.cn/xinfang/12388/jbxcx",
        "correctReportImg":"https://fujian.12388.gov.cn/xinfang/reportAction.do?method=check_save",
        "typeUrl":"https://fujian.12388.gov.cn/"
    },
    {
        "code": "360000",
        "region": "江西省纪委监委",
        "copyright": "中共江西省纪委 江西省监委 ",
        "reportUrl":"http://jiangxi.12388.gov.cn/xinfang/reportAction.do?method=save",
        "verificationUrl":"http://jiangxi.12388.gov.cn/xinfang/servlet/randimg",
        "searchUrl":"http://jiangxi.12388.gov.cn/xinfang/12388/jbxcx",
        "correctReportImg":"http://jiangxi.12388.gov.cn/xinfang/reportAction.do?method=check_save",
        "typeUrl":"http://jiangxi.12388.gov.cn/"
    },
    {
        "code": "370000",
        "region": "山东省纪委监委",
        "copyright": "中共山东省纪律检查委员会 山东省监察委员会 "

    },
    {
        "code": "430000",
        "region": "湖南省纪委监察厅",
        "copyright": "中共河南省纪委 河南省监察委 ",
        "reportUrl":"https://hunan.12388.gov.cn/xinfang/reportAction.do?method=saveReportInfo",
        "verificationUrl":"https://hunan.12388.gov.cn/xinfang/servlet/randimg",
        "searchUrl":"https://hunan.12388.gov.cn/xinfang/12388/jbxcx",
        "correctReportImg":"https://hunan.12388.gov.cn/xinfang/reportAction.do?method=check_save",
        "typeUrl":"https://hunan.12388.gov.cn/"
    },
    {
        "code": "420000",
        "region": "湖北省纪委监委",
        "copyright": "中共湖北省纪律检查委员会 湖北省监察委员会 ",
        "reportUrl":"http://hubei.12388.gov.cn/xinfang/reportAction.do?method=saveReportInfo",
        "verificationUrl":"http://hubei.12388.gov.cn/xinfang/servlet/randimg",
        "searchUrl":"http://hubei.12388.gov.cn/xinfang/12388/jbxcx",
        "correctReportImg":"http://hubei.12388.gov.cn/xinfang/reportAction.do?method=check_save",
        "typeUrl":"http://hubei.12388.gov.cn/"
    },
    {
        "code": "410000",
        "region": "河南省纪委监察委",
        "copyright": "中共湖北省纪律检查委员会 湖北省监察委员会 ",
        "reportUrl":"http://henan.12388.gov.cn/xinfang/reportAction.do?method=saveReportInfo",
        "verificationUrl":"http://henan.12388.gov.cn/xinfang/servlet/randimg",
        "searchUrl":"http://henan.12388.gov.cn/xinfang/12388/jbxcx",
        "correctReportImg":"http://henan.12388.gov.cn/xinfang/reportAction.do?method=check_save",
        "typeUrl":"http://henan.12388.gov.cn/"
    },
    {
        "code": "440000",
        "region": "广东省纪委监委",
        "copyright": "中共广东省纪委 广东省监委",
        "reportUrl":"http://guangdong.12388.gov.cn/xinfang/reportAction.do?method=saveReportInfo",
        "verificationUrl":"http://guangdong.12388.gov.cn/xinfang/servlet/randimg",
        "searchUrl":"http://guangdong.12388.gov.cn/xinfang/12388/jbxcx",
        "correctReportImg":"http://guangdong.12388.gov.cn/xinfang/reportAction.do?method=check_save",
        "typeUrl":"http://guangdong.12388.gov.cn/"
    },
    {
        "code": "450000",
        "region": "广西壮族自治区纪委监察委",
        "copyright": "中共广西壮族自治区纪委 广西壮族自治区监察委 ",
        "reportUrl":"http://guangxi.12388.gov.cn/xinfang/reportAction.do?method=saveReportInfo",
        "verificationUrl":"http://guangxi.12388.gov.cn/xinfang/servlet/randimg",
        "searchUrl":"http://guangxi.12388.gov.cn/xinfang/12388/jbxcx",
        "correctReportImg":"http://guangxi.12388.gov.cn/xinfang/reportAction.do?method=check_save",
        "typeUrl":"http://guangxi.12388.gov.cn/"
    },
    {
        "code": "460000",
        "region": "海南省纪委监委",
        "copyright": "中共海南省纪律检查委员会 海南省监察委员会 "
    },
    {
        "code": "500000",
        "region": "重庆市纪委监委",
        "copyright": "中共重庆市纪委 重庆市监察委员会 ",
        "reportUrl":"http://chongqing.12388.gov.cn:8888/xinfang/reportAction.do?method=save",
        "verificationUrl":"http://chongqing.12388.gov.cn:8888/xinfang/servlet/randimg",
        "searchUrl":"http://chongqing.12388.gov.cn:8888/xinfang/12388/jbxcx",
        "correctReportImg":"http://chongqing.12388.gov.cn:8888/xinfang/reportAction.do?method=check_save",
        "typeUrl":"http://chongqing.12388.gov.cn:8888/"
    },
    {
        "code": "510000",
        "region": "四川省纪委监委",
        "copyright": "中共四川省纪委 四川省监察委员会 ",
        "reportUrl":"http://sichuan.12388.gov.cn/xinfang/reportAction.do?method=save",
        "verificationUrl":"http://sichuan.12388.gov.cn/xinfang/servlet/randimg",
        "searchUrl":"http://sichuan.12388.gov.cn/xinfang/12388/jbxcx",
        "correctReportImg":"http://sichuan.12388.gov.cn/xinfang/reportAction.do?method=check_save",
        "typeUrl":"http://sichuan.12388.gov.cn/"
    },
    {
        "code": "520000",
        "region": "贵州省纪委监委",
        "copyright": "中共贵州省纪委 贵州省监委 ",
        "reportUrl":"http://guizhou.12388.gov.cn/xinfang/reportAction.do?method=save",
        "verificationUrl":"http://guizhou.12388.gov.cn/xinfang/servlet/randimg",
        "searchUrl":"http://guizhou.12388.gov.cn/xinfang/12388/jbxcx",
        "correctReportImg":"http://guizhou.12388.gov.cn/xinfang/reportAction.do?method=check_save",
        "typeUrl":"http://guizhou.12388.gov.cn/"
    },
    {
        "code": "530000",
        "region": "云南省纪委监委",
        "copyright": "中共云南省纪委 云南省监察委员会 ",
        "reportUrl":"http://yunnan.12388.gov.cn/xinfang/reportAction.do?method=save",
        "verificationUrl":"http://yunnan.12388.gov.cn/xinfang/servlet/randimg",
        "searchUrl":"http://yunnan.12388.gov.cn/xinfang/12388/jbxcx",
        "correctReportImg":"http://yunnan.12388.gov.cn/xinfang/reportAction.do?method=check_save",
        "typeUrl":"http://yunnan.12388.gov.cn/"
    },
    {
        "code": "540000",
        "region": "西藏自治区纪委监委",
        "copyright": "中共西藏自治区纪委 西藏自治区监委 ",
        "reportUrl":"https://xizang.12388.gov.cn/xinfang/reportAction.do?method=save",
        "verificationUrl":"https://xizang.12388.gov.cn/xinfang/servlet/randimg",
        "searchUrl":"https://xizang.12388.gov.cn/xinfang/12388/jbxcx",
        "correctReportImg":"https://xizang.12388.gov.cn/xinfang/reportAction.do?method=check_save",
        "typeUrl":"https://xizang.12388.gov.cn/"
    },
    {
        "code": "610000",
        "region": "陕西省纪委监委",
        "copyright": "中共天津市纪律检查委员会 天津市监察委员会",
        "reportUrl": "http://shaanxi.12388.gov.cn/xinfang/reportAction.do?method=saveReportInfo",
        "verificationUrl":"http://shaanxi.12388.gov.cn/xinfang/servlet/randimg",
        "searchUrl":"http://shaanxi.12388.gov.cn/xinfang/12388/jbxcx",
        "correctReportImg":"http://shaanxi.12388.gov.cn/xinfang/reportAction.do?method=check_save",
        "typeUrl":"http://shaanxi.12388.gov.cn/"
    },
    {
        "code": "620000",
        "region": "甘肃省纪委监察厅",
        "copyright": "中共甘肃省纪律检查委员会 甘肃省监察委员会"
    },
    {
        "code": "630000",
        "region": "青海省纪委监委",
        "copyright": "中共青海省纪委 青海省监察委员会 ",
        "reportUrl":"http://qinghai.12388.gov.cn/xinfang/reportAction.do?method=saveReportInfo",
        "verificationUrl":"http://qinghai.12388.gov.cn/xinfang/servlet/randimg",
        "searchUrl":"http://qinghai.12388.gov.cn/xinfang/12388/jbxcx",
        "correctReportImg":"http://qinghai.12388.gov.cn/xinfang/reportAction.do?method=check_save",
        "typeUrl":"http://qinghai.12388.gov.cn/"
    },
    {
        "code": "640000",
        "region": "宁夏回族自治区纪委监委",
        "copyright": "中共宁夏回族自治区纪委 宁夏回族自治区监察委员会",
        "reportUrl":"https://ningxia.12388.gov.cn/xinfang/reportAction.do?method=save",
        "verificationUrl":"https://ningxia.12388.gov.cn/xinfang/servlet/randimg",
        "searchUrl":"https://ningxia.12388.gov.cn/xinfang/12388/jbxcx",
        "correctReportImg":"https://ningxia.12388.gov.cn/xinfang/reportAction.do?method=check_save",
        "typeUrl":"https://ningxia.12388.gov.cn/"
    },
    {
        "code": "650000",
        "region": "新疆生产建设兵团纪委监委",
        "copyright": "中共中央纪律检查委员会 中华人民共和国国家监察委员会",
        "reportUrl":"http://bingtuan.12388.gov.cn/xinfang/reportAction.do?method=saveReportInfo",
        "verificationUrl":"http://bingtuan.12388.gov.cn/xinfang/servlet/randimg",
        "searchUrl":"http://bingtuan.12388.gov.cn/xinfang/12388/jbxcx",
        "correctReportImg":"http://bingtuan.12388.gov.cn/xinfang/reportAction.do?method=check_save",
        "typeUrl":"http://bingtuan.12388.gov.cn/"
    }
]

/*
 *@author ymj
 * @effect initSelectCity [function] 生成市的列表项
 *@params [string] selectProvince 省所对的地区编码
 * @returns area 获取省所对的市列表
 */
var area = ""
function initSelectCity(selectProvince) {

    var startoption = "请选择市:0,";
    if (selectProvince.length > 0)
        switch (selectProvince) {
            case "110000":
                area = "东城区:110101:dongchengqu,西城区:110102:xichengqu,朝阳区:110105:chaoyangqu,丰台区:110106:fengtaiqu,石景山区:110107:shijingshanqu,海淀区:110108:haidingqu,门头沟区:110109:mentougouqu,房山区:110111:fangshanqu,通州区:110112:tongzhouqu,顺义区:110113:shunyiqu,昌平区:110114:changpingqu,大兴区:110115:daxingqu,怀柔区:110116:huairouqu,平谷区:110117:pingguqu,密云区:110228:miyunqu,延庆区:110229:yanqingqu";
                break;
            case "120000":
                area = "市辖区:120100,县:120200";
                break;
            case "130000":
                area = "石家庄市:130100:shijiazhuangshi,唐山市:130200:tangshanshi,秦皇岛市:130300:qinhuangdaoshi,邯郸市:130400:handanshi,邢台市:130500:xingtaishi,保定市:130600:baodingshi,张家口市:130700:zhangjiakoushi,承德市:130800:chengdeshi,沧州市:130900:cangzhoushi,廊坊市:131000:langfangshi,衡水市:131100:hengshuishi";
                break;
            case "140000":
                area = "太原市:140100:taiyuanshi,大同市:140200:datongshi,阳泉市:140300:yangquanshi,长治市:140400:changzhishi,晋城市:140500:jinchengshi,朔州市:140600:shuozhoushi,晋中市:140700:jinzhongshi,运城市:140800:yunchengshi,忻州市:140900:xinzhoushi,临汾市:141000:linfenshi,吕梁市:141100:lvliangshi";
                break;
            case "150000":
                area = "呼和浩特市:150100:hhhts,包头市:150200:bts,乌海市:150300:whs,赤峰市:150400:cfs,通辽市:150500:tls,鄂尔多斯市:150600:eeds,呼伦贝尔市:150700:hlbes,巴彦淖尔市:150800:byzes,乌兰察布市:150900:wlcbs,兴安盟:152200:xam,锡林郭勒盟:152500:xlglm,阿拉善盟:152900:alsm";
                break;
            case "210000":
                area = "沈阳市:210100:shenyang,大连市:210200:dalian,鞍山市:210300:anshan,抚顺市:210400:fushun,本溪市:210500:benxi,丹东市:210600:dandong,锦州市:210700:jinzhou,营口市:210800:yingkou,阜新市:210900:fuxin,辽阳市:211000:liaoyang,盘锦市:211100:panjin,铁岭市:211200:tieling,朝阳市:211300:chaoyang,葫芦岛市:211400:huludao";
                break;
            case "220000":
                area = "长春市:220100:changchunshi,吉林市:220200:jilinshi,四平市:220300:sipingshi,辽源市:220400:liaoyuanshi,通化市:220500:tonghuashi,白山市:220600:baishanshi,松原市:220700:songyuanshi,白城市:220800:baichengshi,延边朝鲜族自治州:222400:yanbianzhou";
                break;
            case "230000":
                area = "哈尔滨市:230100:haerbin,齐齐哈尔市:230200:qiqihaershi,鸡西市:230300:jixishi,鹤岗市:230400:hegangshi,双鸭山市:230500:shuangyashanshi,大庆市:230600:daqingshi,伊春市:230700:yichunshi,佳木斯市:230800:jiamusishi,七台河市:230900:qitaiheshi,牡丹江市:231000:mudanjiangshi,黑河市:231100:heiheshi,绥化市:231200:suihuashi,大兴安岭地区:232700:daxinganlingdiqu";
                break;
            case "310000":
                area = "市辖区:310100,县:310200";
                break;
            case "320000":
                area = "南京市:320100:nanjingshi,无锡市:320200:wuxishi,徐州市:320300:xuzhoushi,常州市:320400:changzhoushi,苏州市:320500:suzhoushi,南通市:320600:nantongshi,连云港市:320700:lianyungangshi,淮安市:320800:huaianshi,盐城市:320900:yanchengshi,扬州市:321000:yangzhoushi,镇江市:321100:zhenjiangshi,泰州市:321200:taizhoushi,宿迁市:321300:suqianshi";
                break;
            case "330000":
                area = "杭州市:330100:hangzhou,宁波市:330200:ningbo,温州市:330300:wenzhou,嘉兴市:330400:jiaxing,湖州市:330500:huzhou,绍兴市:330600:shaoxing,金华市:330700:jinhua,衢州市:330800:quzhou,舟山市:330900:quzhou,台州市:331000:taizhou,丽水市:331100:lishui";
                break;
            case "340000":
                area = "合肥市:340100:hefeishi,芜湖市:340200:wuhushi,蚌埠市:340300:bengbushi,淮南市:340400:huainanshi,马鞍山市:340500:maanshanshi,淮北市:340600:huaibeishi,铜陵市:340700:tonglingshi,安庆市:340800:anqingshi,黄山市:341000:huangshanshi,滁州市:341100:chuzhoushi,阜阳市:341200:fuyangshi,宿州市:341300:suzhoushi,六安市:341500:liuanshi,亳州市:341600:bozhoushi,池州市:341700:chizhoushi,宣城市:341800:xuanchengshi";
                break;
            case "350000": //平潭综合实验区:350800:pingtan
                area = "福州市:350100:fuzhou,厦门市:350200:xiamen,莆田市:350300:putian,三明市:350400:sanming,泉州市:350500:quanzhou,漳州市:350600:zhangzhou,南平市:350700:nanping,龙岩市:350800:longyan,宁德市:350900:ningde";
                break;
            case "360000":
                area = "南昌市:360100:nanchangshi,景德镇市:360200:jingdezhenshi,萍乡市:360300:pingxiangshi,九江市:360400:jiujiangshi,新余市:360500:xinyushi,鹰潭市:360600:yingtanshi,赣州市:360700:ganzhoushi,吉安市:360800:jianshi,宜春市:360900:yichunshi,抚州市:361000:fuzhoushi,上饶市:361100:shangraoshi";
                break;
            case "370000":
                area = "济南市:370100,青岛市:370200,淄博市:370300,枣庄市:370400,东营市:370500,烟台市:370600,潍坊市:370700,济宁市:370800,泰安市:370900,威海市:371000,日照市:371100,莱芜市:371200,临沂市:371300,德州市:371400,聊城市:371500,滨州市:371600,荷泽市:371700";
                break;
            case "410000":
                area = "郑州市:410100:zhengzhou,开封市:410200:kaifeng,洛阳市:410300:luoyang,平顶山市:410400:pingdingshan,安阳市:410500:anyang,鹤壁市:410600:hebi,新乡市:410700:xinxiang,焦作市:410800:jiaozuo,濮阳市:410900:puyang,许昌市:411000:xuchang,漯河市:411100:luohe,三门峡市:411200:sanmenxia,南阳市:411300:nanyang,商丘市:411400:nanyang,信阳市:411500:xinyang,周口市:411600:zhoukou,驻马店市:411700:zhumadian";
                break;
            case "420000":
                area = "武汉市:420100:wuhanshi,黄石市:420200:huangshishi,十堰市:420300:shiyanshi,宜昌市:420500:yichangshi,襄阳市:420600:xiangyangshi,鄂州市:420700:ezhoushi,荆门市:420800:jingmenshi,孝感市:420900:xiaoganshi,荆州市:421000:jingzhoushi,黄冈市:421100:huanggangshi,咸宁市:421200:xianningshi,随州市:421300:suizhoushi,恩施土家族苗族自治州:422800:enshizhou";
                break;
            case "430000":
                area = "长沙市:430100:changshashi,株洲市:430200:zhuzhoushi,湘潭市:430300:xiangtanshi,衡阳市:430400:hengyangshi,邵阳市:430500:shaoyangshi,岳阳市:430600:yueyangshi,常德市:430700:changdeshi,张家界市:430800:zhangjiajieshi,益阳市:430900:yiyangshi,郴州市:431000:chenzhoushi,永州市:431100:yongzhoushi,怀化市:431200:huaihuashi,娄底市:431300:loudishi,湘西自治州:433100:xiangxizhou";
                break;
            case "440000":
                area = "广州市:440100:guangzhoushi,深圳市:440300:shenzhenshi,珠海市:440400:zhuhaishi,汕头市:440500:shantoushi,佛山市:440600:foshanshi,韶关市:440200:shaoguanshi,河源市:441600:heyuanshi,梅州市:441400:meizhoushi,惠州市:441300:huizhoushi,汕尾市:441500:shanweishi,东莞市:441900:dongguanshi,中山市:442000:zhongshanshi,江门市:440700:jiangmenshi,阳江市:441700:yangjiangshi,湛江市:440800:zhanjiangshi,茂名市:440900:maomingshi,肇庆市:441200:zhaoqingshi,清远市:441800:qingyuanshi,潮州市:445100:chaozhoushi,揭阳市:445200:jieyangshi,云浮市:445300:yunfushi";
                break;
            case "450000":
                area = "南宁市:450100:nanningshi,柳州市:450200:liuzhoushi,桂林市:450300:guilinshi,梧州市:450400:wuzhoushi,北海市:450500:beihaishi,防城港市:450600:fangchenggangshi,钦州市:450700:qinzhoushi,贵港市:450800:guigangshi,玉林市:450900:yulinshi,百色市:451000:baiseshi,贺州市:451100:hezhoushi,河池市:451200:hechishi,来宾市:451300:laibinshi,崇左市:451400:chongzuoshi";
                break;
            case "460000":
                area = "海口市:460100,三亚市:460200,省直辖县级行政单位:469000";
                break;
            case "500000":
                /*area = "市辖区:500100,县:500200,市:500300";*/
                area = "万州区:500101:wanzhouqu,黔江区:500114:qianjiangqu,涪陵区:500102:fulingqu,渝中区:500103:yuzhongqu,大渡口区:500104:dadukouqu,江北区:500105:jiangbeiqu,沙坪坝区:500106:shapingbeiqu,九龙坡区:500107:jiulongpoqu,南岸区:500108:nananqu,北碚区:500109:beibeiqu,渝北区:500112:yubeiqu,巴南区:500113:bananqu,长寿区:500115:changshouqu,万盛经开区::501000:wanshengjingkaiqu,双桥区:500111,江津区:508100:jiangjinqu,合川区:508200:hechuanqu,永川区:508300:yongchuanqu,南川区:508400:nanchuanqu,綦江区:502200:qijiangqu,大足区:502500:dazuqu,璧山区:502700:bishanqu,铜梁区:502400:tongliangqu,潼南区:502300:tongnanqu,荣昌区:502600:rongchangqu,开州区:503400:kaizhouqu,梁平区:502800:liangpingqu,武隆区:503200:wulongqu,江津区:500381:jiangjinqu,合川市:500382:hechuanqu,永川市:500383:yongchuanqu,南川市:500384:nanchuanqu,潼南区:500223:tongnanqu,铜梁县:500224:tongliangqu,大足区:500225:dazuqu,荣昌区:500226:rongchangqu,梁平区:500228:liangpingqu,城口县:500229:chengkouxian,丰都县:500230:fengduxian,垫江县:503100:dianjiangxian,,忠县:503300:zhongxian,云阳县:503500:yunyangxian,奉节县:503600:fengjiexian,巫山县:503700:wushanxian,巫溪县:503800:wuxixian,石柱县:504000:shizhuxian,秀山县:504100:xiushanxian,酉阳县:504200:youyangxian,彭水县:504300:pengshuixian";
                break;
            case "510000":
                area = "成都市:510100:chengdushi,自贡市:510300:zigongshi,攀枝花市:510400:panzhihuashi,泸州市:510500:luzhoushi,德阳市:510600:deyangshi,绵阳市:510700:mianyangshi,广元市:510800:guangyuanshi,遂宁市:510900:suiningshi,内江市:511000:neijiangshi,乐山市:511100:leshanshi,南充市:511300:nanchongshi,眉山市:511400:meishanshi,宜宾市:511500:yibinshi,广安市:511600:guanganshi,达州市:511700:dazhoushi,雅安市:511800:yaanshi,巴中市:511900:bazhongshi,资阳市:512000:ziyangshi,阿坝藏族羌族自治州:513200:abazhou,甘孜藏族自治州:513300:ganzizhou,凉山彝族自治州:513400:liangshanzhou";
                break;
            case "520000":
                area = "贵阳市:520100:guiyangshi,六盘水市:520200:liupanshuishi,遵义市:520300:zunyishi,安顺市:520400:anshunshi,铜仁地区:522200:tongrenshi,黔西南州:522300:qianxizhou,毕节市:522400:bijieshi,黔东南州:522600:qiandongzhou,黔南州:522700:qiannanzhou";
                break;
            case "530000":
                area = "昆明市:530100:kunmingshi,曲靖市:530300:qujingshi,普洱市:530800:puershi,玉溪市:530400:yuxishi,保山市:530500:baoshanshi,昭通市:530600:zhaotongshi,丽江市:530700:lijiangshi,思茅市:530800:puershi,临沧市:530900:lincangshi,楚雄彝族自治州:532300:chuxiongzhou,红河哈尼族彝族自治州:532500:honghezhou,文山壮族苗族自治州:532600:wenshanzhou,西双版纳傣族自治州:532800:xishuangbannazhou,大理白族自治州:532900:dalizhou,德宏傣族景颇族自治州:533100:dehongzhou,怒江傈僳族自治州:533300:nujiangzhou,迪庆藏族自治州:533400:diqingzhou";
                break;
            case "540000":
                area = "拉萨市:540100:lasashi,昌都地区:542100:changdushi,山南地区:542200:shannanshi,日喀则地区:542300:rikazeshi,那曲地区:542400:naqudiqu,阿里地区:542500:alidiqu,林芝地区:542600:linzhishi";
                break;
            case "610000":
                area = "西安市:610100:xian,铜川市:610200:tongchuan,宝鸡市:610300:baoji,咸阳市:610400:xianyang,渭南市:610500:weinan,延安市:610600:yanan,汉中市:610700:hanzhong,榆林市:610800:yulin,安康市:610900:ankang,商洛市:611000:shangluo,杨凌示范区:611000:yangling,西咸新区:611200:xixian";
                break;
            case "620000":
                area = "兰州市:620100,嘉峪关市:620200,金昌市:620300,白银市:620400,天水市:620500,武威市:620600,张掖市:620700,平凉市:620800,酒泉市:620900,庆阳市:621000,定西市:621100,陇南市:621200,临夏回族自治州:622900,甘南藏族自治州:623000";
                break;
            case "630000":
                area = "西宁市:630100:xiningshi,海东地区:632100:haidong,海北州:632200:haibei,黄南州:632300:huangnan,海南州:632500:hainan,果洛州:632600:guoluo,玉树州:632700:yushu,海西州:632800:haixi";
                break;
            case "640000":
                area = "银川市:640100:yinchuanshi,石嘴山市:640200:shizuishanshi,吴忠市:640300:wuzhongshi,固原市:640400:guyuanshi,中卫市:640500:zhongweishi";
                break;
            case "650000":
                //area="乌鲁木齐市:650100,克拉玛依市:650200,吐鲁番地区:652100,哈密地区:652200,昌吉回族自治州:652300,博尔塔拉蒙古自治州:652700,巴音郭楞蒙古自治州:652800,阿克苏地区:652900,克孜勒苏柯尔克孜自治州:653000,喀什地区:653100,和田地区:653200,伊犁哈萨克自治州:654000,塔城地区:654200,阿勒泰地区:654300,自治区直辖行政单位:659000";
                area = "伊犁州:654000,塔城地区:654200,阿勒泰地区:654300,博州:652700,克拉玛依市:650200,昌吉州:652300,乌鲁木齐市:650100,吐鲁番市:652100,哈密市:652200,巴州:652800,阿克苏地区:652900,克州:653000,喀什地区:653100,和田地区:653200";
                break;
            case "660000":
                area = "第一师阿拉尔市:660100:diyishi,第二师铁门关市:660200:diershi,第三师图木舒克市:660300:disanshi,第四师可克达拉市:660400:disishi,第五师双河市:660500:diwushi,第六师五家渠市:660600:diliushi,第七师:660700:diqishi,第八师石河子市:660800:dibashi,第九师:660900:dijiushi,第十师北屯市:661000:dishishi,第十一师:661100:dishiyishi,第十二师:661200:dishiershi,第十三师:661300:dishisanshi,第十四师昆玉市:661400:dishisishi";
                break;

        }
}
/*console.log(area)
areaArray = area.split(",");
for (i = 0; i < areaArray.length; i++) {
    var temp = areaArray[i].split(":");
    console.log(temp[0])
    console.log(temp[1])
}*/

/*
 *@author ymj
 *@effect initSelectArea [function] 生成区县的列表项
 *@params [string] selectCity 市所对的地区编码
 * @returns area 获取市所对的区县列表
 */
function initSelectArea(selectCity) {
    if (selectCity.length > 0)
        switch (selectCity) {
/*            case "110100":
                area = "东城区:110101,西城区:110102,崇文区:110103,宣武区:110104,朝阳区:110105,丰台区:110106,石景山区:110107,海淀区:110108,门头沟区:110109,房山区:110111,通州区:110112,顺义区:110113,昌平区:110114,大兴区:110115,怀柔区:110116,平谷区:110117";
                break;*/
            case "110200":
                area = "密云县:110228,延庆县:110229";
                break;
            case "120100":
                area = "和平区:120101,河东区:120102,河西区:120103,南开区:120104,河北区:120105,红桥区:120106,塘沽区:120107,汉沽区:120108,大港区:120109,东丽区:120110,西青区:120111,津南区:120112,北辰区:120113,武清区:120114,宝坻区:120115,宁河区:120221,静海区:120223,蓟州区:120225,滨海新区:120116";
                break;
            case "120200":
                area = "宁河县:120221,静海县:120223,蓟县:120225";
                break;
            case "130100":
                area = "长安区:130102:changanqu,桥东区:130103:qiaodongqu,桥西区:130104:qiaoxiqu,新华区:130105:xinhuaqu,井陉矿区:130107:jingxingkuangqu,裕华区:130108:yuhuaqu,井陉县:130121:jingxingxian,正定县:130123:zhengdingxian,栾城县:130124:luanchengxian,行唐县:130125:xingtangxian,灵寿县:130126:lingshouxian,高邑县:130127:gaoyixian,深泽县:130128:shenzexian,赞皇县:130129:zanhuangxian,无极县:130130:wujixian,平山县:130131:pingshanxian,元氏县:130132:yuanshixian,赵县:130133:zhaoxian,藁城市:130182:gaochengshi,晋州市:130183:jinzhoushi,新乐市:130184:xinleshi,鹿泉市:130185:luquanshi";
                break;
            case "130200":
                area = "路南区:130202:lunanqu,路北区:130203:lubeiqu,古冶区:130204:guzhiqu,开平区:130205:kaipingqu,丰南区:130207:fengnanqu,丰润区:130208:fengrunqu,滦县:130223:luanxian,滦南县:130224:luannanxian,乐亭县:130225:letingxian,迁西县:130227:qianxixian,玉田县:130229:yutianxian,遵化市:130281:zunhuashi,迁安市:130283:qiananshi";
                break;
            case "130300":
                area = "海港区:130302:haigangqu,山海关区:130303:shanhaiguanqu,北戴河区:130304:beidaihequ,青龙满族自治县:130321:zizhixian,昌黎县:130322:changlixian,抚宁区:130323:funingqu,卢龙县:130324:lulongxian";
                break;
            case "130400":
                area = "邯山区:130402:hanshanqu,丛台区:130403:congtaiqu,复兴区:130404:fuxingqu,峰峰矿区:130406:fengfengkuangqu,临漳县:130423:linzhangxian,成安县:130424:chenganxian,大名县:130425:damingxian,涉县:130426:shexian,磁县:130427:cixian,肥乡区:130428:feixiangqu,永年县:130429:yongnianqu,邱县:130430:qiuxian,鸡泽县:130431:jizexian,广平县:130432:guangpingxian,馆陶县:130433:guantaoxian,魏县:130434:weixian,曲周县:130435:quzhouxian,武安市:130481:wuanshi";
                break;
            case "130500":
                area = "桥东区:130502,桥西区:130503,邢台县:130521,临城县:130522,内丘县:130523,柏乡县:130524,隆尧县:130525,任县:130526,南和县:130527,宁晋县:130528,巨鹿县:130529,新河县:130530,广宗县:130531,平乡县:130532,威县:130533,清河县:130534,临西县:130535,南宫市:130581,沙河市:130582";
                break;
            case "130600":
                area = "新市区:130602,北市区:130603,南市区:130604,满城县:130621,清苑县:130622,涞水县:130623,阜平县:130624,徐水县:130625,定兴县:130626,唐县:130627,高阳县:130628,容城县:130629,涞源县:130630,望都县:130631,安新县:130632,易县:130633,曲阳县:130634,蠡县:130635,顺平县:130636,博野县:130637,雄县:130638,涿州市:130681,定州市:130682,安国市:130683,高碑店市:130684";
                break;
            case "130700":
                area = "桥东区:130702,桥西区:130703,宣化区:130705,下花园区:130706,宣化县:130721,张北县:130722,康保县:130723,沽源县:130724,尚义县:130725,蔚县:130726,阳原县:130727,怀安县:130728,万全县:130729,怀来县:130730,涿鹿县:130731,赤城县:130732,崇礼县:130733";
                break;
            case "130800":
                area = "双桥区:130802,双滦区:130803,鹰手营子矿区:130804,承德县:130821,兴隆县:130822,平泉县:130823,滦平县:130824,隆化县:130825,丰宁满族自治县:130826,宽城满族自治县:130827,围场满族蒙古族自治县:130828";
                break;
            case "130900":
                area = "新华区:130902:,运河区:130903,沧县:130921,青县:130922,东光县:130923,海兴县:130924,盐山县:130925,肃宁县:130926,南皮县:130927,吴桥县:130928,献县:130929,孟村回族自治县:130930,泊头市:130981,任丘市:130982,黄骅市:130983,河间市:130984";
                break;
            case "131000":
                area = "安次区:131002,广阳区:131003,固安县:131022,永清县:131023,香河县:131024,大城县:131025,文安县:131026,大厂回族自治县:131028,霸州市:131081,三河市:131082";
                break;
            case "131100":
                area = "桃城区:131102,枣强县:131121,武邑县:131122,武强县:131123,饶阳县:131124,安平县:131125,故城县:131126,景县:131127,阜城县:131128,冀州市:131181,深州市:131182";
                break;
            case "140100":
                area = "小店区:140105:xiaodianqu,迎泽区:140106:yingzequ,杏花岭区:140107:xinghualingqu,尖草坪区:140108:jiancaopingqu,万柏林区:140109:wanbolinqu,晋源区:140110:jinyuanqu,清徐县:140121:qingxuxian,阳曲县:140122:yangquxian,娄烦县:140123:loufanxian,古交市:140181:gujiaoshi";
                break;
            case "140200":
                area = "平城区:140202:chengqu,云冈区:140211:yungangqu,新荣区:140212:xinrongqu,阳高县:140221:yanggaoxian,天镇县:140222:tianzhenxian,广灵县:140223:guanglingxian,灵丘县:140224:lingqiuxian,浑源县:140225:hunyuanxian,左云县:140226:zuoyunxian,云州区:140227:yunzhouqu";
                break;
            case "140300":
                area = "城区:140302:chengqu,矿区:140303：kuangqu,郊区:140311:jiaoqu,平定县:140321:pingdingxian,盂县:140322:yuxian";
                break;
            case "140400":
                area = "城区:140402:chengqu,郊区:140411:jiaoqu,长治县:140421:changzhi,襄垣县:140423:xiangyuan,屯留县:140424:tunliu,平顺县:140425:pingshun,黎城县:140426:licheng,壶关县:140427:huguan,长子县:140428:changzi,武乡县:140429:wuxiang,沁县:140430:qinxian,沁源县:140431:qinyuan,潞城市:140481:lucheng";
                break;
            case "140500":
                area = "城区:140502:chengqu,沁水县:140521:qinshui,阳城县:140522:yangcheng,陵川县:140524:lingchuan,泽州县:140525:zezhou,高平市:140581:gaoping";
                break;
            case "140600":
                area = "朔城区:140602:shuochengqu,平鲁区:140603:pinglu,山阴县:140621:shanyin,应县:140622:yingxian,右玉县:140623:youyu,怀仁县:140624:huairen";
                break;
            case "140700":
                area = "榆次区:140702:yuci,榆社县:140721:yushe,左权县:140722:zuoquan,和顺县:140723:heshun,昔阳县:140724:xiyang,寿阳县:140725:houyang,太谷县:140726:taigu,祁县:140727:qixian,平遥县:140728:pingyao,灵石县:140729:lingshi,介休市:140781:jiexiu";
                break;
            case "140800":
                area = "盐湖区:140802:yanhu,临猗县:140821:linyi,万荣县:140822:wanrong,闻喜县:140823:wenxi,稷山县:140824:jishan,新绛县:140825:xinjiang,绛县:140826:jiangxian,垣曲县:140827:yuanqu,夏县:140828:xiaxian,平陆县:140829:pinglu,芮城县:140830:ruicheng,永济市:140881:yongji,河津市:140882:hejin";
                break;
            case "140900":
                area = "忻府区:140902:xinfu,定襄县:140921:dingxiang,五台县:140922:wutai,代县:140923:daixian,繁峙县:140924:fanzhi,宁武县:140925:ningwu,静乐县:140926:jingle,神池县:140927:shenchi,五寨县:140928:wuzhai,岢岚县:140929:kelan,河曲县:140930:hequ,保德县:140931:baode,偏关县:140932:pianguan,原平市:140981:yuanping";
                break;
            case "141000":
                area = "尧都区:141002:yaodu,曲沃县:141021:quwo,翼城县:141022:yicheng,襄汾县:141023:xiangfen,洪洞县:141024:hongtong,古县:141025:guxian,安泽县:141026:anze,浮山县:141027:fushan,吉县:141028:jixian,乡宁县:141029:xiangning,大宁县:141030:dading,隰县:141031:xixian,永和县:141032:yonghe,蒲县:141033:puxian,汾西县:141034:fenxi,侯马市:141081:houma,霍州市:141082:huozhou";
                break;
            case "141100":
                area = "离石区:141102:lishi,文水县:141121:wenshui,交城县:141122:jiaocheng,兴县:141123:xingxian,临县:141124:linxian,柳林县:141125liulin,石楼县:141126shilou,岚县:141127lanxian,方山县:141128:fangshan,中阳县:141129,交口县:141130:jiaokou,孝义市:141181:xiaoyi,汾阳市:141182:fenyang";
                break;
            case "150100":
                area = "新城区:150102:xinchengqu,回民区:150103:huiminqu,玉泉区:150104:yuquanqu,赛罕区:150105:saihanqu,土默特左旗:150121:tumotezuoqi,托克托县:150122:tuoketuoxian,和林格尔县:150123:helingeerxian,清水河县:150124:qingshuihexian,武川县:150125:wuchuanxian";
                break;
            case "150200":
                area = "东河区:150202:donghequ,昆都仑区:150203:kundulunqu,青山区:150204:qingshanqu,石拐区:150205:shiguaiqu,白云矿区:150206:baiyunebkqu,九原区:150207:jiuyuanqu,土默特右旗:150221:tumoteyouqi,固阳县:150222:guyangxian,达尔罕茂明安联合旗:150223:daerhanmmalhqi";
                break;
            case "150300":
                area = "海勃湾区:150302:haibowanqu,海南区:150303:hainanqu,乌达区:150304:wudaqu";
                break;
            case "150400":
                area = "红山区:150402:hongshanqu,元宝山区:150403:yuanbaoshanqu,松山区:150404:songshanqu,阿鲁科尔沁旗:150421:alkeqqi,巴林左旗:150422:balinzuoqi,巴林右旗:150423:balinyouqi,林西县:150424:linxixian,克什克腾旗:150425:ksktqi,翁牛特旗:150426:wengniuteqi,喀喇沁旗:150428:keciqinqi,宁城县:150429:ningchengxian,敖汉旗:150430:aohanqi";
                break;
            case "150500":
                area = "科尔沁区:150502:keerqinqu,科尔沁左翼中旗:150521:keerqinzhongqi,科尔沁左翼后旗:150522:keerqinhouqi,开鲁县:150523:kailuxian,库伦旗:150524:kulunqi,奈曼旗:150525:naimanqi,扎鲁特旗:150526:zhaluteqi,霍林郭勒市:150581:huolinguoleshi";
                break;
            case "150600":
                area = "东胜区:150602:dsq,达拉特旗:150621:dltq,准格尔旗:150622:zgeq,鄂托克前旗:150623:etkqq,鄂托克旗:150624:etkq,杭锦旗:150625:hjq,乌审旗:150626:wsq,伊金霍洛旗:150627:yjhlq,康巴什新区:150628:kbsxq";
                break;
            case "150700":
                area = "海拉尔区:150702:hailaerqu,阿荣旗:150721:arongqi,莫力达瓦达斡尔族自治旗:150722:mldwdweqi,鄂伦春自治旗:150723:elunchunqi,鄂温克族自治旗:150724:ewenkeqi,陈巴尔虎旗:150725:chenbaerhuqi,新巴尔虎左旗:150726:xinbaerhuzuoqi,新巴尔虎右旗:150727:xinbaerhuyouqi,满洲里市:150781:manzhoulishi,牙克石市:150782:yakeshishi,扎兰屯市:150783:zhalantunshi,额尔古纳市:150784:eergunaishi,根河市:150785:genheshi";
                break;
            case "150800":
                area = "临河区:150802:linhequ,五原县:150821:wuyuanxian,磴口县:150822:dengkouxian,乌拉特前旗:150823:wulateqianqi,乌拉特中旗:150824:wulatezhongqi,乌拉特后旗:150825:wulatehouqi,杭锦后旗:150826:kangjinhouqi";
                break;
            case "150900":
                area = "集宁区:150902:jiningqu,卓资县:150921:zhuozixian,化德县:150922:huadexian,商都县:150923:shangduxian,兴和县:150924:xinghexian,凉城县:150925:liangchengxian,察哈尔右翼前旗:150926:chahaerqianqi,察哈尔右翼中旗:150927:chahaerzhongqi,察哈尔右翼后旗:150928:chahaerhouqi,四子王旗:150929:siziwangqi,丰镇市:150981:fengzhenshi";
                break;
            case "152200":
                area = "乌兰浩特市:152201:wulanhaoteshi,阿尔山市:152202:aershanshi,科尔沁右翼前旗:152221:keerqinqianqi,科尔沁右翼中旗:152222:keerqinzhongqi,扎赉特旗:152223:zhalaiteqi,突泉县:152224:tuquanxian";
                break;
            case "152500":
                area = "二连浩特市:152501:erlianhaoteshi,锡林浩特市:152502:xilinhaoteshi,阿巴嘎旗:152522:abagaqi,苏尼特左旗:152523:sunitezuoqi,苏尼特右旗:152524:suniteyouqi,东乌珠穆沁旗:152525:dongwuzhumuqinqi,西乌珠穆沁旗:152526:xiwuzhumuqinqi,太仆寺旗:152527:taipusiqi,镶黄旗:152528:xianghuangqi,正镶白旗:152529:zhengxiangbaiqi,正蓝旗:152530:zhenglanqi,多伦县:152531:duolunxian";
                break;
            case "152900":
                area = "阿拉善左旗:152921:alashanzuoqi,阿拉善右旗:152922:alashanyouqi,额济纳旗:152923:ejinaqi";
                break;
            case "210100":
                area = "和平区:210102:heping,沈河区:210103:shenhe,大东区:210104:dadong,皇姑区:210105:huanggu,铁西区:210106:tiexi,苏家屯区:210111:sujiatun,浑南新区:210112:hunnan,沈北新区:210113:shenbei,于洪区:210114:yuhong,辽中县:210122:liaozhong,康平县:210123:kangping,法库县:210124:faku,新民市:210181:xinmin";
                break;
            case "210200":
                area = "中山区:210202:zhongshan,西岗区:210203:xigang,沙河口区:210204:shahekou,甘井子区:210211:ganjingzi,旅顺口区:210212:lvshunkou,金普新区纪工委:210213:jinpuxinqu,长海县:210224:changhaixian,瓦房店市:210281:wafangdian,普兰店市:210282:pulandian,庄河市:210283:zhuanghe,高新区纪工委:210286:gaoxinqu,长兴岛经济区纪工委:210287:changxingdao";
                break;
            case "210300":
                area = "铁东区:210302:tiedong,铁西区:210303:tiexi,立山区:210304:lishan,千山区:210311:qianshan,台安县:210321:taian,岫岩满族自治县:210323:xiuyan,海城市:210381:haicheng";
                break;
            case "210400":
                area = "新抚区:210402:xinfu,东洲区:210403:dongzhou,望花区:210404:wanghua,顺城区:210411:shuncheng,抚顺县:210421:fushun,新宾满族自治县:210422:xinbin,清原满族自治县:210423:qingyuan";
                break;
            case "210500":
                area = "平山区:210502:pingshan,溪湖区:210503:xihu,明山区:210504:mingshan,南芬区:210505:nanfen,本溪满族自治县:210521:benxixian,桓仁满族自治县:210522:huanren,高新区纪工委:2103AK:gaoxinqu";
                break;
            case "210600":
                area = "元宝区:210602:yuanbao,振兴区:210603:zhenxing,振安区:210604:zhenan,宽甸满族自治县:210624:kuandian,东港市:210681:donggang,凤城市:210682:fengcheng ";
                break;
            case "210700":
                area = "古塔区:210702:guta,凌河区:210703:linghe,太和区:210711:taihe,黑山县:210726:heishan,义县:210727:yixian,凌海市:210781:linghai,北镇市:210782:beizhen,松山新区纪工委:210790:songshanxinqu,滨海新区纪工委:210791:binhaixinqu ";
                break;
            case "210800":
                area = "站前区:210802:zhanqian,西市区:210803:xishi,鲅鱼圈区:210804:bayuquan,老边区:210811:laobian,盖州市:210881:gaizhou ,大石桥市:210882:dashiqiao";
                break;
            case "210900":
                area = "海州区:210902:haizhou,新邱区:210903:xinqiu,太平区:210904:taiping,清河门区:210905:qinghemen,细河区:210911:xihe ,阜新蒙古族自治县:210921:fuxinzizhixian,彰武县:210922:zhangwu";
                break;
            case "211000":
                area = "白塔区:211002:baita,文圣区:211003:wensheng,宏伟区:211004:hongwei,弓长岭区:211005:gongchangling,太子河区:211011:taizihe ,辽阳县:211021:liaoyangxian,灯塔市:211081:dengta";
                break;
            case "211100":
                area = "双台子区:211102:shuangtaizi,兴隆台区:211103:xinglongtai,大洼县:211121:dawa,盘山县:211122:panshan";
                break;
            case "211200":
                area = "银州区:211202:yinzhou,清河区:211204:qinghe,铁岭县:211221:tieling,西丰县:211223:xifeng,昌图县:211224:changtu,调兵山市:211281:diaobingshan,开原市:211282:kaiyuan";
                break;
            case "211300":
                area = "双塔区:211302:shuangta,龙城区:211303:longcheng,朝阳县:211321:chaoyang,建平县:211322:jianping,喀喇沁左翼蒙古族自治县:211324:harqin,北票市:211381:beipiao,凌源市:211382:lingyuan";
                break;
            case "211400":
                area = "连山区:211402:lianshan,龙港区:211403:longgang,南票区:211404:nanpiao,绥中县:211421:suizhong,建昌县:211422:jianchang,兴城市:211481:xingcheng";
                break;
            case "220100":
                area = "南关区:220102:nanguanqu,宽城区:220103:kuanchengqu,朝阳区:220104:chaoyangqu,二道区:220105:erdaoqu,绿园区:220106:lvyuanqu,双阳区:220112:shuangyangqu,农安县:220122:nonganxian,九台市:220181:jiutaiqu,榆树市:220182:yushushi,德惠市:220183:dehuishi";
                break;
            case "220200":
                area = "昌邑区:220202:changyiqu,龙潭区:220203:longtanqu,船营区:220204:chuanyingqu,丰满区:220211:fengmanqu,永吉县:220221:yongjixian,蛟河市:220281:jiaoheshi,桦甸市:220282:huadianshi,舒兰市:220283:shulanshi,磐石市:220284:panshishi";
                break;
            case "220300":
                area = "铁西区:220302:tiexiqu,铁东区:220303:tiedongqu,梨树县:220322:lishuxian,伊通满族自治县:220323:yitongmanzuzizhixian,双辽市:220382:shuangliaoshi";
                break;
            case "220400":
                area = "龙山区:220402:longshanqu,西安区:220403:xianqu,东丰县:220421:dongfengxian,东辽县:220422:dongliaoxian";
                break;
            case "220500":
                area = "东昌区:220502:dongchangqu,二道江区:220503:erdaojiangqu,通化县:220521:tonghuaxian,辉南县:220523:huinanxian,柳河县:220524:liuhexian,集安市:220582:jianshi";
                break;
            case "220600":
                area = "浑江区:220602,抚松县:220621:fusongxian,靖宇县:220622:jingyuxian,长白朝鲜族自治县:220623:changbaichaoxianzuzizhixian,江源县:220625:jiangyuanqu,临江市:220681:linjiangshi";
                break;
            case "220700":
                area = "宁江区:220702:ningjiangqu,前郭尔罗斯蒙古族自治县:220721:qianguoxian,长岭县:220722:changlingxian,乾安县:220723:qiananxian,扶余县:220724:fuyushi";
                break;
            case "220800":
                area = "洮北区:220802:taobeiqu,镇赉县:220821:zhenlaixian,通榆县:220822:tongyuxian,洮南市:220881:taonanshi,大安市:220882:daanshi";
                break;
            case "222400":
                area = "延吉市:222401:yanjishi,图们市:222402:tumenshi,敦化市:222403:dunhuashi,珲春市:222404:hunchunshi,龙井市:222405:longjingshi,和龙市:222406:helongshi,汪清县:222424:wangqingxian,安图县:222426:antuxian,梅河口市:223100:meihekoushi,公主岭市:223000:gongzhulingshi,长白山保护开发区:223200:changbaishan";
                break;
            case "230100":
                area = "道里区:230102:daoliqu,南岗区:230103:nangangqu,道外区:230104:daowaiqu,香坊区:230106:xiangfangqu,平房区:230108:pingfangqu,松北区:230109:songbeiqu,呼兰区:230111:hulanqu,依兰县:230123:yilanxian,方正县:230124:fangzhengxian,宾县:230125:binxian,巴彦县:230126:bayanxian,木兰县:230127:mulanxian,通河县:230128:tonghexian,延寿县:230129:yanshouxian,双城市:230182:shuangchengqu,尚志市:230183:shangzhishi,五常市:230184:wuchangshi";
                break;
            case "230200":
                area = "龙沙区:230202:longshaqu,建华区:230203:jianhuaqu,铁锋区:230204:tiefengqu,昂昂溪区:230205:angangxiqu,富拉尔基区:230206:fulaerjiqu,碾子山区:230207:nianzishanqu,梅里斯达斡尔族区:230208:mlsdwezq,龙江县:230221:longjiangxian,依安县:230223:yianxian,泰来县:230224:tailaixian,甘南县:230225:gannanxian,富裕县:230227:fuyuxian,克山县:230229:keshanxian,克东县:230230:kedongxian,拜泉县:230231:baiquanxian,讷河市:neiheshi";
                break;
            case "230300":
                area = "鸡冠区:230302:jiguanqu,恒山区:230303:hengshanqu,滴道区:230304:didaoqu,梨树区:230305:lishuqu,城子河区:230306:chengzihequ,麻山区:230307:mashanqu,鸡东县:230321:jidongxian,虎林市:230381:hulinshi,密山市:230382:mishanshi";
                break;
            case "230400":
                area = "向阳区:230402:xiangyangqu,工农区:230403:gongnongqu,南山区:230404:nanshanqu,兴安区:230405:xinganqu,东山区:230406:dongshanqu,兴山区:230407:xingshanqu,萝北县:230421:luobeixian,绥滨县:230422:suibinxian";
                break;
            case "230500":
                area = "尖山区:230502:jianshanqu,岭东区:230503:lingdongqu,四方台区:230505:sifangtaiqu,宝山区:230506:baoshanqu,集贤县:230521:jixianxian,友谊县:230522:youyixian,宝清县:230523:baoqingxian,饶河县:230524:raohexian";
                break;
            case "230600":
                area = "萨尔图区:230602:saertuqu,龙凤区:230603:longfengqu,让胡路区:230604:ranghuluqu,红岗区:230605:honggangqu,大同区:230606:datongqu,肇州县:230621:zhaozhouxian,肇源县:230622:zhaoyuanxian,林甸县:230623:lindianxian,杜尔伯特蒙古族自治县:230624:debtmgzzzx";
                break;
            case "230700":
                area = "伊春区:230702:yichunqu,南岔区:230703:nanchaqu,友好区:230704:youhaoqu,西林区:230705:xilinqu,翠峦区:230706:cuiluanqu,新青区:230707:xinqingqu,美溪区:230708:meixiqu,金山屯区:230709:jinshantunqu,五营区:230710:wuyingqu,乌马河区:230711:wumahequ,汤旺河区:230712:tangwanghequ,带岭区:230713:dailingqu,乌伊岭区:230714:wuyilingqu,红星区:230715:hongxingqu,上甘岭区:230716:shangganlingqu,嘉荫县:230722:jiayinxian,铁力市:230781:tielishi,朗乡林业局:230791:langxiang,桃山林业局:230792:taoshan,铁力林业局:230793:tieli,双丰林业局:230794:shuangfeng";
                break;

            case "230800":
                area = "向阳区:230803:xiangyangqu,前进区:230804:qianjinqu,东风区:230805:dongfengqu,郊区:230811:jiaoqu,桦南县:230822,桦川县:230826:huananxian,汤原县:230828:tangyuanxian,同江市:230881:tongjiangshi,富锦市:230882:fujinshi,抚远市:233000:fuyuanshi:";
                break;
            case "230900":
                area = "新兴区:230902:xinxingqu,桃山区:230903:taoshanqu,茄子河区:230904:qiezihequ,勃利县:230921:bolixian";
                break;
            case "231000":
                area = "东安区:231002:donganqu,阳明区:231003:yangmingqu,爱民区:231004:aiminqu,西安区:231005:xianqu,东宁市:231024:dongningshi,林口县:231025:linkouxian,绥芬河市:231081:suifenheshi,海林市:231083:hailinshi,宁安市:231084:ninganshi,穆棱市:231085:mulingshi";
                break;
            case "231100":
                area = "爱辉区:231102:aihuiqu,嫩江县:231121:neijiangxian,逊克县:231123:xunkexian,孙吴县:231124:sunwuxian,北安市:231181:beianshi,五大连池市:231182:wudalianchishi,五大连池风景区:231191:fengjingqu";
                break;
            case "231200":
                area = "北林区:231202:beilingqu,望奎县:231221:wangkuixian,兰西县:231222:lanxixian,青冈县:231223:qinggangxian,庆安县:231224:qinganxian,明水县:231225:mingshuixian,绥棱县:231226:suilingxian,安达市:231281:andashi,肇东市:231282:zhaodongshi,海伦市:231283:hailunshi";
                break;
            case "232700":
                area = "呼玛县:232721:humaxian,塔河县:232722:tahexian,漠河县:232723:moheshi,呼中区:232726:huzhongqu,新林区:232727:xinlinqu,加格达奇区:232791:jgdqq,松岭区:232792:songlingqu";
                break;
            case "310100":
                area = "黄浦区:310101,卢湾区:310103,徐汇区:310104,长宁区:310105,静安区:310106,普陀区:310107,闸北区:310108,虹口区:310109,杨浦区:310110,闵行区:310112,宝山区:310113,嘉定区:310114,浦东新区:310115,金山区:310116,松江区:310117,青浦区:310118,南汇区:310119,奉贤区:310120";
                break;
            case "310200":
                area = "崇明县:310230";
                break;
            case "320100":
                area = "玄武区:320102:xuanwuqu,秦淮区:320104:qinhuaiqu,建邺区:320105:jianyequ,鼓楼区:320106:gulouqu,浦口区:320111:pukouqu,栖霞区:320113:qixiaqu,雨花台区:320114:yuhuataiqu,江宁区:320115:jiangningqu,六合区:320116:liuhequ,溧水县:320124:lishuiqu,高淳县:320125:gaochunqu,江北新区:320191:jiangbeixinqu";
                break;
            case "320200":
                area = "锡山区:320205:xishanqu,惠山区:320206:huishanqu,滨湖区:320211:binhuqu,江阴市:320281:jiangyinshi,宜兴市:320282:yinxingshi,新吴区:320283:xinwuqu,梁溪区:320284:liangxiqu";
                break;
            case "320300":
                area = "鼓楼区:320302:gulouqu,云龙区:320303:yunlongqu,贾汪区:320305:jiawangqu,泉山区:320311:quanshanqu,丰县:320321:fengxian,沛县:320322:peixian,铜山县:320323:tongshanqu,睢宁县:320324:suiningxian,新沂市:320381:xinyishi,邳州市:320382:pizhoushi,经济开发区:320391:jingjikaifaqu";
                break;
            case "320400":
                area = "天宁区:320402:tianningqu,钟楼区:320404:zhonglouqu,新北区:320411:xinbeiqu,武进区:320412:wujinqu,溧阳市:320481:liyangshi,金坛市:320482:jintanqu";
                break;
            case "320500":
                area = "高新区纪工委:320505:gxqjgw,吴中区:320506:wuzhongqu,相城区:320507:xiangchengqu,常熟市:320581:changshushi,张家港市:320582:zhangjiagangshi,昆山市:320583:kunshanshi,吴江市:320584:wujiangqu,太仓市:320585:taicangshi,工业园区纪工委:320588:gyyqjgw";
                break;
            case "320600":
                area = "崇川区:320602:chongchuanqu,港闸区:320611:gangzhaqu,海安县:320621:haianxian,如东县:320623:rudongxian,启东市:320681:qidongshi,如皋市:320682:rugaoshi,海门市:320684:haimenshi,南通经济技术开发区:320685:ntjjjskfqjgw";
                break;
            case "320700":
                area = "连云区:320703:lianyunqu,海州区:320705:haizhouqu,赣榆县:320721:ganyuqu,东海县:320722:donghaixian,灌云县:320723:guanyunxian,灌南县:320724:guannanxian";
                break;
            case "320800":
                area = "淮安区:320803:huaianqu,淮阴区:320804:huaiyinqu,清江浦区:320811:qingjiangpuqu,涟水县:320826:lianshuixian,洪泽县:320829:hongzequ,盱眙县:320830:xuyixian,金湖县:320831:jinhuxian,开发区:320891:kaifaqu";
                break;
            case "320900":
                area = "亭湖区:320902:tinghuqu,盐都区:320903:yanduqu,响水县:320921:xiangshuixian,滨海县:320922:binhaixian,阜宁县:320923:funingxian,射阳县:320924:sheyangxian,建湖县:320925:ianhuxian,东台市:320981:dongtaishi,大丰区:320982:dafengqu,城南新区:320992:chengnanxinqu";
                break;
            case "321000":
                area = "广陵区:321002:guanglingqu,邗江区:321003:hanjiangqu,宝应县:321023:baoyingxian,仪征市:321081:yizhengshi,高邮市:321084:gaoyoushi,江都市:321088:jiangduqu";
                break;
            case "321100":
                area = "镇江新区:321101:zhenjiangxinqu,京口区:321102:jingkouqu,润州区:321111:runzhouqu,丹徒区:321112:dantuqu,丹阳市:321181:danyangshi,扬中市:321182:yangzhongshi,句容市:321183:jurongshi";
                break;
            case "321200":
                area = "海陵区:321202:hailingqu,高港区:321203:gaogangqu,兴化市:321281:xinghuashi,靖江市:321282:jingjiangshi,泰兴市:321283:taixingshi,姜堰市:321284:jiangyanqu,泰州市高新区:321291:gaoxinqu";
                break;
            case "321300":
                area = "宿城区:321302:suchengqu,宿豫区:321311:suyuqu,沭阳县:321322:shuyangxian,泗阳县:321323:siyangxian,泗洪县:321324:sihongxian";
                break;
            case "330100":
                area = "上城区:330102:shangcheng,下城区:330103:xiacheng,江干区:330104:jianggan,拱墅区:330105:gongshu,西湖区:330106:xihu,滨江区:330108:binjiang,萧山区:330109:xiaoshan,余杭区:330110:yuhang,桐庐县:330122:tonglu,淳安县:330127:chunan,建德市:330182:jiande,富阳市:330183:fuyang,临安区:330185:linan";
                break;
            case "330200":
                area = "海曙区:330203:haishu,江北区:330205:jiangbei,北仑区:330206:beilun,镇海区:330211:zhenhai,鄞洲区:330212:yinzhou,象山县:330225:xiangshan,宁海县:330226:ninghai,余姚市:330281:yuyao,慈溪市:330282:cixi,奉化市:330283:fenghua";
                break;
            case "330300":
                area = "鹿城区:330302:lucheng,龙湾区:330303:longwan,瓯海区:330304:ouhai,洞头县:330322:dongtou,永嘉县:330324:yongjia,平阳县:330326:pingyang,苍南县:330327:cangnan,文成县:330328:wencheng,泰顺县:330329:taishun,瑞安市:330381:ruian,乐清市:330382:leqing";
                break;
            case "330400":
                area = "南湖区:330402:nanhu,秀洲区:330411:xiuzhou,嘉善县:330421:jiashan,海盐县:330424:haiyan,海宁市:330481:haining,平湖市:330482:pinghu,桐乡市:330483:tongxiang";
                break;
            case "330500":
                area = "吴兴区:330502:wuxing,南浔区:330503:nanxun,德清县:330521:deqing,长兴县:330522:changxing,安吉县:330523:anji";
                break;
            case "330600":
                area = "越城区:330602:yuecheng,柯桥区:330621:keqiao,新昌县:330624:xinchang,诸暨市:330681:zhuji,上虞市:330682:shangyu,嵊州市:330683:shengzhou";
                break;
            case "330700":
                area = "婺城区:330702:wucheng,金东区:330703:jindong,武义县:330723:wuyi,浦江县:330726:pujiang,磐安县:330727:panan,兰溪市:330781:lanxi,义乌市:330782:yiwu,东阳市:330783:dongyang,永康市:330784:yongkang";
                break;
            case "330800":
                area = "柯城区:330802:kecheng,衢江区:330803:qujiang,常山县:330822:changshan,开化县:330824:kaihua,龙游县:330825:longyou,江山市:330881:jiangshan";
                break;
            case "330900":
                area = "定海区:330902:dinghai,普陀区:330903:putuo,岱山县:330921:daishan,嵊泗县:330922:shengsi";
                break;
            case "331000":
                area = "椒江区:331002:jiaojiang,黄岩区:331003:huangyan,路桥区:331004:luqiao,玉环县:331021:yuhuan,三门县:331022:sanmen,天台县:331023:tiantai,仙居县:331024:xianju,温岭市:331081:wenling,临海市:331082:linhai";
                break;
            case "331100":
                area = "莲都区:331102:liandu,青田县:331121:qingtian,缙云县:331122:jinyun,遂昌县:331123:suichang,松阳县:331124:songyang,云和县:331125:yunhe,庆元县:331126:qingyuan,景宁畲族自治县:331127:jingning,龙泉市:331181:longquan";
                break;
            case "340100":
                area = "瑶海区:340102:yaohaiqu,庐阳区:340103:luyangqu,蜀山区:340104:shushangqu,包河区:340111:baohequ,长丰县:340121:changfengxian,肥东县:340122:feidongxian,肥西县:340123:feixixian,庐江县:340124:lujiangxian,巢湖市:340181:chaohushi";
                break;
            case "340200":
                area = "镜湖区:340202:jinghuqu,弋江区:340203:gejiangqu,三山区:340204:sanshanqu,鸠江区:340207:jiujiangqu,芜湖县:340221:wuhuxian,繁昌县:340222:fanchangxian,南陵县:340223:nanlingxian,无为县:340225:wuweixian";
                break;
            case "340300":
                area = "龙子湖区:340302:longzihuqu,蚌山区:340303:bangshanqu,禹会区:340304:yuhuiqu,淮上区:340311:huaishangqu,怀远县:340321:huaiyuanxian,五河县:340322:wuhexian,固镇县:340323:guzhenxian";
                break;
            case "340400":
                area = "大通区:340402:datongqu,田家庵区:340403:tianjiaanqu,谢家集区:340404:xiejiajiqu,八公山区:340405:bagongshanqu,潘集区:340406:panjiqu,凤台县:340421:fengtaixian,毛集试验区:340422:maojishiyanqu,寿县:340423:shouxian";
                break;
            case "340500":
                area = "花山区:340503:huashanqu,雨山区:340504:yushanqu,博望区:340506:bowangqu,当涂县:340521:dangtuxian,含山县:340522:hanshanxian,和县:340523:hexian";
                break;
            case "340600":
                area = "杜集区:340602:dujiqu,相山区:340603:xiangshanqu,烈山区:340604:lieshanqu,濉溪县:340621:suixixian";
                break;
            case "340700":
                area = "铜官区:340705:tongguanqu,郊区:340711:jiaoqu,义安区:340721:yianqu,枞阳县:340723:congyangxian";
                break;
            case "340800":
                area = "迎江区:340802:yingjiangqu,大观区:340803:daguanqu,宜秀区:340811:yixiuqu,怀宁县:340822:huainingxian,潜山县:340824:qianshanxian,太湖县:340825:taihuxian,宿松县:340826:susongxian,望江县:340827:wangjiangxian,岳西县:340828:yuexixian,桐城市:340881:tongchengshi";
                break;
            case "341000":
                area = "屯溪区:341002:tunxiqu,黄山区:341003:huangshanqu,徽州区:341004:huizhouqu,歙县:341021:shexian,休宁县:341022:xiuningxian,黟县:341023:yixian,祁门县:qimenxian";
                break;
            case "341100":
                area = "琅琊区:341102:langyaqu,南谯区:341103:nanqiaoqu,来安县:341122:laianxian,全椒县:341124:quanjiaoxian,定远县:341125:dingyuanxian,凤阳县:341126:fengyangxian,天长市:341181:tianchangshi,明光市:341182:mingguangshi";
                break;
            case "341200":
                area = "颍州区:341202:yingzhouqu,颍东区:341203:yingdongqu,颍泉区:341204:yingquanqu,临泉县:341221:linquanxian,太和县:341222:taihexian,阜南县:341225:funanxian,颍上县:341226:yingshangxian,界首市:341282:jieshoushi";
                break;
            case "341300":
                area = "墉桥区:341302:yongqiaoqu,砀山县:341321:dangshanxian,萧县:341322:xiaoxian,灵璧县:341323:lingbixian,泗县:341324:sixian";
                break;
            case "341400":
                area = "居巢区:341402,庐江县:341421,无为县:341422,含山县:341423,和县:341424";
                break;
            case "341500":
                area = "金安区:341502:jinanqu,裕安区:341503:yuanqu,霍邱县:341522:huoqiuxian,舒城县:341523:shuchengxian,金寨县:341524:jinzhaixian,霍山县:341525:huoshanxian,叶集区:3415AE:yejiqu";
                break;
            case "341600":
                area = "谯城区:341602:qiaochengqu,涡阳县:341621:woyangxian,蒙城县:341622:mengchengxian,利辛县:341623:lixingxian";
                break;
            case "341700":
                area = "贵池区:341702:guichiqu,东至县:341721:dongzhixian,石台县:341722:shitaixian,青阳县:341723:qingyangxian";
                break;
            case "341800":
                area = "宣州区:341802:xuanzhouqu,郎溪县:341821:langxixian,广德县:341822:guangdexian,泾县:341823:jingxian,绩溪县:341824:jixixian,旌德县:341825:jingdexian";
                break;
            case "350100":
                area = "鼓楼区:350102:gulou,台江区:350103:taijiang,仓山区:350104:cangshan,马尾区:350105:mawei,晋安区:350111:jinan,闽侯县:350121:minhou,连江县:350122:lianjiang,罗源县:350123:luoyuan,闽清县:350124:minqing,永泰县:350125:yongtai,平潭县:350128:pingtan,福清市:350181:fuqing,长乐市:350182:";
                break;
            case "350200":
                area = "思明区:350203:simingqu,海沧区:350205:haicangqu,湖里区:350206:huliqu,集美区:350211:jimeiqu,同安区:350212:tonganqu,翔安区:350213:xianganqu";
                break;
            case "350300":
                area = "城厢区:350302:chengxiangqu,涵江区:350303:hanjiangqu,荔城区:350304:lichengqu,秀屿区:350305:xiuyuqu,仙游县:350322:xianyouxian";
                break;
            case "350400":
                area = "梅列区:350402:meilie,三元区:350403:sanyuan,明溪县:350421:mingxi,清流县:350423:qingliu,宁化县:350424:ninghua,大田县:350425:datian,尤溪县:350426:youxi,沙县:350427:shaxian,将乐县:350428:jiangyue,泰宁县:350429:taining,建宁县:350430:jianning,永安市:350481:yongan";
                break;
            case "350500":
                area = "鲤城区:350502:licheng,丰泽区:350503:fengze,洛江区:350504:luojiang,泉港区:350505:quangang,惠安县:350521:huian,安溪县:350524,永春县:350525:yongchun,德化县:350526:dehua,石狮市:350581:shishi,晋江市:350582:jinjiang,南安市:350583:nanan,台商投资区:3505CE:touziqu";
                break;
            case "350600":
                area = "芗城区:350602:xiangcheng,龙文区:350603:longwen,云霄县:350622:yunxiao,漳浦县:350623:zhangpu,诏安县:350624:zhaoan,长泰县:350625:changtai,东山县:350626:dongshan,南靖县:350627:nanjing,平和县:350628:pinghe,华安县:350629:huaan,龙海市:350681:longhai";
                break;
            case "350700":
                area = "延平区:350702:yanping,顺昌县:350721:shunchang,浦城县:350722:pucheng,光泽县:350723:guangze,松溪县:350724:songxi,政和县:350725:zhenghe,邵武市:350781:zhaowu,武夷山市:350782:wuyishan,建瓯市:350783:jianou,建阳市:350784:jianyang";
                break;
            case "350800":
                area = "新罗区:350802:xinluo,长汀县:350821:changting,永定县:350822:yongding,上杭县:350823:shanghang,武平县:350824:wuping,连城县:350825:liancheng,漳平市:350881:zhangping";
                break;
            case "350900":
                area = "蕉城区:350902:jiaochengqu,霞浦县:350921:xiapuxian,古田县:350922:gutianxian,屏南县:350923:pingnanxian,寿宁县:350924:shouningxian,周宁县:350925:zhouningxian,柘荣县:350926:zherongxian,福安市:350981:fuanshi,福鼎市:350982:fudingshi";
                break;
            case "360100":
                area = "东湖区:360102:donghuqu,西湖区:360103:xihuqu,青云谱区:360104:qingyunpuqu,湾里区:360105:wanliqu,青山湖区:360111:qingshanhuqu,南昌县:360121:nanchangxian,新建县:360122:xinjianqu,安义县:360123:anyixian,进贤县:360124:jinxianxian";
                break;
            case "360200":
                area = "昌江区:360202:changjiangqu,珠山区:360203:zhushanqu,浮梁县:360222:fuliangxian,乐平市:360281:lepingshi";
                break;
            case "360300":
                area = "安源区:360302:anyuanqu,湘东区:360313:xiangdongqu,莲花县:360321:lianhuaxian,上栗县:360322:shanglixian,芦溪县:360323:luxixian";
                break;
            case "360400":
                area = "濂溪区:360402:lianxiqu,庐山区:360402:lushanshi,浔阳区:360403:xunyangqu,九江县:360421:,武宁县:360423:wuningxian,修水县:360424:xiushuixian,永修县:360425:yongxiuxian,德安县:360426:deanxian,都昌县:360428:duchangxian,湖口县:360429:hukouxian,彭泽县:360430:pengzexian,瑞昌市:360481:ruichangshi";
                break;
            case "360500":
                area = "渝水区:360502:yushuiqu,分宜县:360521:fenyixian, 新余市纪委、监委:360500:xinyushi";
                break;
            case "360600":
                area = "月湖区:360602:yuehuqu,余江县:360622:yujiangxian,贵溪市:360681:guixishi";
                break;
            case "360700":
                area = "章贡区:360702:zhanggongqu,赣县:360721:ganxianqu,信丰县:360722:xinfengxian,大余县:360723:dayuxian,上犹县:360724:shangyouxian,崇义县:360725:chongyixian,安远县:360726:anyuanxian,龙南县:360727:longnanxian,定南县:360728:dingnanxian,全南县:360729:quannanxian,宁都县:360730:ningduxian,于都县:360731:yuduxian,兴国县:360732:xingguoxian,会昌县:360733:huichangxian,寻乌县:360734:xunwuxian,石城县:360735:shichengxian,瑞金市:360781:ruijinshi,南康市:360782:nankangshi";
                break;
            case "360800":
                area = "吉州区:360802:jizhouqu,青原区:360803:qingyuanqu,吉安县:360821:jianxian,吉水县:360822:jishuixian,峡江县:360823:xiajiangxian,新干县:360824:xinganxian,永丰县:360825:yongfengxian,泰和县:360826:taihexian,遂川县:360827:suichuanxian,万安县:360828:wananxian,安福县:360829:anfuxian,永新县:360830:yongxinxian,井冈山市:360881:jinggangshanshi";
                break;
            case "360900":
                area = "袁州区:360902:yuanzhouqu,奉新县:360921:fengxinxian,万载县:360922:wanzaixian,上高县:360923:shanggaoxian,宜丰县:360924:yifengxian,靖安县:360925:jinganxian,铜鼓县:360926:tongguxian,丰城市:360981:fengchengshi,樟树市:360982:zhangshushi,高安市:360983:gaoanshi";
                break;
            case "361000":
                area = "临川区:361002:linchuanqu,南城县:361021:nanchengxian,黎川县:361022:lichuanxian,南丰县:361023:nanfengxian,崇仁县:361024:chongrenxian,乐安县:361025:leanxian,宜黄县:361026:yihuangxian,金溪县:361027:jinxixian,资溪县:361028:zixixian,东乡县:361029:dongxiangqu,广昌县:361030:guangchangxian";
                break;
            case "361100":
                area = "信州区:361102:xinzhouqu,上饶县:361121:shangraoxian,广丰县:361122:guangfengqu,玉山县:361123:yushanxian,铅山县:361124:yanshanxian,横峰县:361125:hengfengxian,弋阳县:361126:yiyangxian,余干县:361127:yuganxian,波阳县:361128:poyangxian,万年县:361129:wannianxian,婺源县:361130:wuyuanxian,德兴市:361181:dexingshi";
                break;
            case "370100":
                area = "历下区:370102,市中区:370103,槐荫区:370104,天桥区:370105,历城区:370112,长清区:370113,平阴县:370124,济阳县:370125,商河县:370126,章丘市:370181";
                break;
            case "370200":
                area = "市南区:370202,市北区:370203,四方区:370205,黄岛区:370211,崂山区:370212,李沧区:370213,城阳区:370214,胶州市:370281,即墨市:370282,平度市:370283,胶南市:370284,莱西市:370285";
                break;
            case "370300":
                area = "淄川区:370302,张店区:370303,博山区:370304,临淄区:370305,周村区:370306,桓台县:370321,高青县:370322,沂源县:370323";
                break;
            case "370400":
                area = "市中区:370402,薛城区:370403,峄城区:370404,台儿庄区:370405,山亭区:370406,滕州市:370481";
                break;
            case "370500":
                area = "东营区:370502,河口区:370503,垦利县:370521,利津县:370522,广饶县:370523";
                break;
            case "370600":
                area = "芝罘区:370602,福山区:370611,牟平区:370612,莱山区:370613,长岛县:370634,龙口市:370681,莱阳市:370682,莱州市:370683,蓬莱市:370684,招远市:370685,栖霞市:370686,海阳市:370687";
                break;
            case "370700":
                area = "潍城区:370702,寒亭区:370703,坊子区:370704,奎文区:370705,临朐县:370724,昌乐县:370725,青州市:370781,诸城市:370782,寿光市:370783,安丘市:370784,高密市:370785,昌邑市:370786";
                break;
            case "370800":
                area = "市中区:370802,任城区:370811,微山县:370826,鱼台县:370827,金乡县:370828,嘉祥县:370829,汶上县:370830,泗水县:370831,梁山县:370832,曲阜市:370881,兖州市:370882,邹城市:370883";
                break;
            case "370900":
                area = "泰山区:370902,岱岳区:370911,宁阳县:370921,东平县:370923,新泰市:370982,肥城市:370983";
                break;
            case "371000":
                area = "环翠区:371002,文登市:371081,荣成市:371082,乳山市:371083";
                break;
            case "371100":
                area = "东港区:371102,岚山区:371103,五莲县:371121,莒县:371122";
                break;
            case "371200":
                area = "莱城区:371202,钢城区:371203";
                break;
            case "371300":
                area = "兰山区:371302,罗庄区:371311,河东区:371312,沂南县:371321,郯城县:371322,沂水县:371323,苍山县:371324,费县:371325,平邑县:371326,莒南县:371327,蒙阴县:371328,临沭县:371329";
                break;
            case "371400":
                area = "德城区:371402,陵县:371421,宁津县:371422,庆云县:371423,临邑县:371424,齐河县:371425,平原县:371426,夏津县:371427,武城县:371428,乐陵市:371481,禹城市:371482";
                break;
            case "371500":
                area = "东昌府区:371502,阳谷县:371521,莘县:371522,茌平县:371523,东阿县:371524,冠县:371525,高唐县:371526,临清市:371581";
                break;
            case "371600":
                area = "滨城区:371602,惠民县:371621,阳信县:371622,无棣县:371623,沾化县:371624,博兴县:371625,邹平县:371626";
                break;
            case "371700":
                area = "牡丹区:371702,曹县:371721,单县:371722,成武县:371723,巨野县:371724,郓城县:371725,鄄城县:371726,定陶县:371727,东明县:371728";
                break;
            case "410100":
                area = "中原区:410102:zhongyuanqu,二七区:410103:erqiqu,管城回族区:410104:guanchenghuizuqu,金水区:410105:jinshuiqu,上街区:410106:shangjiequ,惠济区:410108:huijiqu,中牟县:410122:zhongmouxian,巩义市:410181:gongyishi,荥阳市:410182:xingyangshi,新密市:410183:xinmishi,新郑市:410184:xinzhengshi,登封市:410185:dengfengshi";
                break;
            case "410200":
                area = "龙亭区:410202:longtingqu,顺河回族区:410203:shunhehuizuqu,鼓楼区:410204:gulouqu,禹王台区:410205:yuwangtaiqu,金明区（新区）:410211:jinmingqu,杞县:410221:qixian,通许县:410222:tongxuxian,尉氏县:410223:weishixian,祥符区:410224:xiangfuqu兰考县:410225:lankaoxian";
                break;
            case "410300":
                area = "老城区:410302:laochengqu,西工区:410303:xigongqu,瀍河回族区:410304:chanhehuizuqu,涧西区:410305:jianxiqu,吉利区:410306:jiliqu,洛龙区:410307:luolongqu,孟津县:410322:mengjinxian,新安县:410323:xinanxian,栾川县:410324:luanchuanxian,嵩县:410325:songxian,汝阳县:410326:ruyangxian,宜阳县:410327:yiyangxian,洛宁县:410328:luoningxian,伊川县:410329:yichuanxian,偃师市:410381:yanshishi";
                break;
            case "410400":
                area = "新华区:410402:xinhuaqu,卫东区:410403:weidongqu,石龙区:410404:shilongqu,湛河区:410411:zhanhequ,宝丰县:410421:baofengxian,叶县:410422:yexian,鲁山县:410423:lushanxian,郏县:410425:jiaxian,舞钢市:410481:wugangshi,汝州市:410482:ruzhoushi";
                break;
            case "410500":
                area = "文峰区:410502:wenfengqu,北关区:410503:beiguanqu,殷都区:410505:yinduqu,龙安区:410506:longanqu,安阳县:410522:anyangxian,汤阴县:410523:tangyinxian,滑县:410526:huaxian,内黄县:410527:neihuangxian,林州市:410581:linzhoushi";
                break;
            case "410600":
                area = "鹤山区:410602:heshanqu,山城区:410603:shanchengqu,淇滨区:410611:qibinqu,浚县:410621:xunxian,淇县:410622:qixian";
                break;
            case "410700":
                area = "红旗区:410702:hongqiqu,卫滨区:410703:weibinqu,凤泉区:410704:fengquanqu,牧野区:410711:muyequ,新乡县:410721:xinxiangxian,获嘉县:410724:huojiaxian,原阳县:410725:yuanyangxian,延津县:410726:yanjinxian,封丘县:410727:fengqiuxian,长垣县:410728:changyuanxian,卫辉市:410781:weihuishi,辉县市:410782:huixianshi";
                break;
            case "410800":
                area = "解放区:410802:jiefangqu,中站区:410803:zhongzhanqu,马村区:410804:macunqu,山阳区:410811:shanyangqu,修武县:410821:xiuwuxian,博爱县:410822:boaixian,武陟县:410823:wuzhixian,温县:410825:wenxian,沁阳市:410882:qinyangshi,孟州市:410883:mengzhoushi";
                break;
            case "410900":
                area = "华龙区:410902:hualongqu,清丰县:410922:qingfengxian,南乐县:410923:nanlexian,范县:410926:fanxian,台前县:410927:taiqianxian,濮阳县:410928:puyangxian";
                break;
            case "411000":
                area = "魏都区:411002:weiduqu,建安区:411023:jiananqu,鄢陵县:411024:yanlingxian,襄城县:411025:xiangchengxian,禹州市:411081:yuzhoushi,长葛市:411082:changgeshi";
                break;
            case "411100":
                area = "源汇区:411102:yuanhuiqu,郾城区:411103:yanchengqu,召陵区:411104:shaolingqu,舞阳县:411121:wuyangxian,临颍县:411122:linyingxian";
                break;
            case "411200":
                area = "湖滨区:411202:hubinqu,渑池县:411221:mianchixian,陕州区:411222:shanzhouqu,卢氏县:411224:lushixian,义马市:411281:yimashi,灵宝市:411282:lingbaoshi";
                break;
            case "411300":
                area = "宛城区:411302:wanchengqu,卧龙区:411303:wolongqu,南召县:411321:nanzhaoxian,方城县:411322:fangchengxian,西峡县:411323:xixiaxian,镇平县:411324:zhenpingxian,内乡县:411325:neixiangxian,淅川县:411326:xichuanxian,社旗县:411327:sheqixian,唐河县:411328:tanghexian,新野县:411329:xinyexian,桐柏县:411330:tongbaixian,邓州市:411381:dengzhoushi";
                break;
            case "411400":
                area = "梁园区:411402:liangyuanqu,睢阳区:411403:suiyangqu,民权县:411421:minquanxian,睢县:411422:suixian,宁陵县:411423:ninglingxian,柘城县:411424:zhechengxian,虞城县:411425:yuchengxian,夏邑县:411426:xiayixian,永城市:411481:yongchengshi";
                break;
            case "411500":
                area = "浉河区:411502:shihequ,平桥区:411503:pingqiaoqu,罗山县:411521:luoshanxian,光山县:411522:guangshanxian,新县:411523:xinxian,商城县:411524shangchengxian,固始县:411525:gushixian,潢川县:411526:huangchuanxian,淮滨县:411527:huaibinxian,息县:411528:xixian";
                break;
            case "411600":
                area = "川汇区:411602:chuanhuiqu,扶沟县:411621:fugouxian,西华县:411622:xihuaxian,商水县:411623:shangshuixian,沈丘县:411624:shenqiuxian,郸城县:411625:danchengxian,淮阳县:411626:huaiyangxian,太康县:411627:taikangxian,鹿邑县:411628:luyixian,项城市:411681:xiangchengshi";
                break;
            case "411700":
                area = "驿城区:411702:yichengqu,西平县:411721:xipingxian,上蔡县:411722:shangcaixian,平舆县:411723:pingyuxian,正阳县:411724:zhengyangxian,确山县:411725:queshanxian,泌阳县:411726:miyangxian,汝南县:411727:runanxian,遂平县:411728:suipingxian,新蔡县:411729:xincaixian";
                break;
            case "420100":
                area = "江岸区:420102:jianganqu,江汉区:420103:jianghanqu,硚口区:420104:qiaokouqu,汉阳区:420105:hanyangqu,武昌区:420106:wuchangqu,青山区:420107:qingshanqu,洪山区:420111:hongshanqu,东西湖区:420112:dongxihuqu,汉南区:420113:hannanqu,蔡甸区:420114:caidianqu,江夏区:420115:jiangxiaqu,黄陂区:420116:huangpiqu,新洲区:420117:xinzhouqu";
                break;
            case "420200":
                area = "黄石港区:420202:huangshigangqu,西塞山区:420203:xisaishanqu,下陆区:420204:xialuqu,铁山区:420205:tieshanqu,阳新县:420222:yangxinxian,大冶市:420281:dayeshi,黄石开发区:420291:kaifaqu";
                break;
            case "420300":
                area = "茅箭区:420302:maojianqu,张湾区:420303:zhangwanqu,郧阳区:420321:yunyangqu,郧西县:420322:yunxixian,竹山县:420323:zhushanxian,竹溪县:420324:zhuxixian,房县:420325:fangxian,丹江口市:420381:danjiangkoushi,经济开发区:420383:jingjikaifaqu,武当山特区:420382:wudangshantequ";
                break;
            case "420500":
                area = "西陵区:420502:xilingqu,伍家岗区:420503:wujiagangqu,点军区:420504:dianjunqu,猇亭区:420505:xiaotingqu,夷陵区:420506:yilingqu,远安县:420525:yuananxian,兴山县:420526:xingshanxian,秭归县:420527:ziguixian,长阳土家族自治县:420528:changyangxian,五峰土家族自治县:420529:wufengxian,宜都市:420581:yidushi,当阳市:420582:dangyangshi,枝江市:420583:zhijiangshi,高新区:420591:gaoxinqu,";
                break;
            case "420600":
                area = "襄城区:420602:xiangchengqu,樊城区:420606:fanchengqu,东津新区:420691:dongjinxinqu,襄州区:420607:xiangzhouqu,南漳县:420624:nanzhangxian,谷城县:420625:guchengxian,保康县:420626:baokangxian,老河口市:420682:laohekoushi,枣阳市:420683:zaoyangshi,宜城市:420684:yichengshi";
                break;
            case "420700":
                area = "梁子湖区:420702:liangzihuqu,华容区:420703:huarongqu,鄂城区:420704:echengqu";
                break;
            case "420800":
                area = "东宝区:420802:dongbaoqu,掇刀区:420803:duodaoqu,京山县:420821:jingshanxian,沙洋县:420822:shayangxian,漳河新区:420891:zhanghexinqu,钟祥市:420881:zhongxiangshi,屈家岭管理区:420884:qujialingqu";
                break;
            case "420900":
                area = "孝南区:420902:xiaonanqu,孝昌县:420921:xiaochangxian,大悟县:420922:dawuxian,云梦县:420923:yunmengxian,应城市:420981:yingchengshi,安陆市:420982:anlushi,汉川市:420984:hanchuanshi";
                break;
            case "421000":
                area = "沙市区:421002:shashiqu,荆州区:421003:jingzhouqu,荆州开发区:421091:kaifaqu,公安县:421022:gonganxian,监利县:421023:jianlixian,江陵县:421024:jianglingxian,石首市:421081:shishoushi,洪湖市:421083:honghushi,松滋市:421087:songzishi";
                break;
            case "421100":
                area = "黄州区:421102:huangzhouqu,团风县:421121:tuanfengxian,红安县:421122:honganxian,罗田县:421123:luotianxian,英山县:421124:yingshanxian,浠水县:421125:xishuixian,蕲春县:421126:qichunxian,黄梅县:421127:huangmeixian,麻城市:421181:machengshi,武穴市:421182:wuxueshi";
                break;
            case "421200":
                area = "咸安区:421202:xiananqu,嘉鱼县:421221:jiayuxian,通城县:421222:tongchengxian,崇阳县:421223:chongyangxian,通山县:421224:tongshanxian,赤壁市:421281:chibish,随县:421303:suixian";
                break;
            case "421300":
                area = "曾都区:421302:zengduqu,广水市:421381:guangshuishi,大洪山风景名胜区:421392:dahongshan,随州高新区:421391:gaoxinqu";
                break;
            case "422800":
                area = "恩施市:422801:enshishi,利川市:422802:lichuanshi,建始县:422822:jianshixian,巴东县:422823:badongxian,宣恩县:422825:xuanenxian,咸丰县:422826:xianfengxian,来凤县:422827:laifengxian,鹤峰县:422828:hefengxian";
                break;
            case "429000":
                area = "仙桃市:429004,潜江市:429005,天门市:429006,神农架林区:429021";
                break;
            case "430100":
                area = "芙蓉区:430102:furongqu,天心区:430103:tianxinqu,岳麓区:430104:yueluqu,开福区:430105:kaifuqu,雨花区:430111:yuhuaqu,长沙区:430121:changshaxian,望城区:430122:wangchengqu,宁乡县:430124:ningxiangxian,浏阳市:430181:liuyangshi";
                break;
            case "430200":
                area = "荷塘区:430202:hetangqu,芦淞区:430203:lusongqu,石峰区:430204:shifengqu,天元区:430211:tianyuanqu,株洲县:430221:zhuzhouxian,攸县:430223:youxian,茶陵县:430224:chalingxian,炎陵县:430225:yanlingxian,醴陵市:430281:lilingshi";
                break;
            case "430300":
                area = "雨湖区:430302:yuhuqu,岳塘区:430304:yuetangqu,湘潭县:430321:xiangtanxian,湘乡市:430381:xiangxiangshi,韶山市:430382:shaoshanshi";
                break;
            case "430400":
                area = "珠晖区:430405:zhuhuiqu,雁峰区:430406:yanfengqu,石鼓区:430407:shiguqu,蒸湘区:430408:zhengxiangqu,南岳区:430412:nanyuequ,衡阳县:430421:hengyangxian,衡南县:430422:hengnanxian,衡山县:430423:hengshanxian,衡东县:430424:hengdongxian,祁东县:430426:qidongxian,耒阳市:430481:leiyangshi,常宁市:430482:changningshi";
                break;
            case "430500":
                area = "双清区:430502:shuangqingqu,大祥区:430503:daxiangqu,北塔区:430511:beitaqu,邵东县:430521:shaodongxian,新邵县:430522:xinshaoxian,邵阳县:430523:shaoyangxian,隆回县:430524:longhuixian,洞口县:430525:dongkouxian,绥宁县:430527:suiningxian,新宁县:430528:xinningxian,城步县:430529:chengbuxian,武冈市:430581:wugangshi";
                break;
            case "430600":
                area = "岳阳楼区:430602:yueyanglouqu,云溪区:430603:yunxiqu,君山区:430611:junshanqu,经济开发区:4306AD:kaifaqu,屈原管理区:4306AB:quyuanguanliqu,岳阳县:430621:yueyangxian,华容县:430623:huarongxian,湘阴县:430624:xiangyinxian,平江县:430626:pingjiangxian,汨罗市:430681:miluoshi,临湘市:430682:linxiangshi";
                break;
            case "430700":
                area = "武陵区:430702:wulingqu,鼎城区:430703:dingchengqu,安乡县:430721:anxiangxian,汉寿县:430722:hanshouxian,澧县:430723:lixian,临澧县:430724:linlixian,桃源县:430725:taoyuanxian,石门县:430726:shimenxian,津市市:430781:jinshishi";
                break;
            case "430800":
                area = "永定区:430802:yongdingqu,武陵源区:430811:wulingyuanq,慈利县:430821:cilixian,桑植县:430822:sangzhixian";
                break;
            case "430900":
                area = "资阳区:430902:ziyangqu,赫山区:430903:heshanqu,南县:430921:nanxian,桃江县:430922:taojiangxian,安化县:430923:anhuaxian,沅江市:430981:yuanjiangshi,大通湖区:430982:datonghuqu";
                break;
            case "431000":
                area = "北湖区:431002:beihuqu,苏仙区:431003:suxianqu,桂阳县:431021:guiyangxian,宜章县:431022:yizhangxian,永兴县:431023:yongxingxian,嘉禾县:431024:jiahexian,临武县:431025:linwuxian,汝城县:431026:ruchengxian,桂东县:431027:guidongxian,安仁县:431028:anrenxian,资兴县:431081:zixingxian";
                break;
            case "431100":
                area = "零陵区:431102:linglingqu,冷水滩区:431103:lengshuitanqu,祁阳县:431121:qiyangxian,东安县:431122:donganxian,双牌县:431123:shuangpaixian,道县:431124:daoxian,江永县:431125:jiangyongxian,宁远县:431126:ningyuanxian,蓝山县:431127:lanshanxian,新田县:431128:xintianxian,江华县:431129:jianghuaxian";
                break;
            case "431200":
                area = "鹤城区:431202:hechengqu,洪江区:431282:hongjiangqu,中方县:431221:zhongfangxian,沅陵县:431222:yuanlingxian,辰溪县:431223:chenxixian,溆浦县:431224:xupuxian,会同县:431225:huitongxian,麻阳县:431226:mayangxian,新晃县:431227:xinhuangxian,芷江县:431228:zhijiangxian,靖州县:431229:jingzhouxian,通道县:431230:tongdaoxian,洪江市:431281";
                break;
            case "431300":
                area = "娄星区:431302:louxingqu,双峰县:431321:shuangfengxian,新化县:431322:xinhuaxian,冷水江市:431381:lengshuijiangshi,涟源市:431382:lianyuanshi";
                break;
            case "433100":
                area = "吉首市:433101:jishoushi,泸溪县:433122:luxixian,凤凰县:433123:fenghuangxian,花垣县:433124:huayuanxian,保靖县:433125:baojingxian,古丈县:433126:guzhangxian,永顺县:433127:yongshunxian,龙山县:433130:longshanxian";
                break;
            case "440100":
                area = "越秀区:440104:yuexiuqu,海珠区:440105:haizhuqu,荔湾区:440103:liwanqu,天河区:440106:tianhequ,白云区:440111:baiyunqu,黄埔区:440112:huangpuqu,花都区:440114:huaduqu,番禺区:440113:fanyuqu,南沙区:440102:nanshaqu,从化市:440184:conghuaqu,增城市:440183:zengchengqu,广州开发区纪工委:440116:kaifaqujgw";
                break;
            case "440200":
                area = "浈江区:440204:zhenjiangqu,武江区:440203:wujiangqu,曲江区:440205:qujiangqu,始兴县:440222:shixingxian,仁化县:440224:renhuaxian,翁源县:440229:wengyuanxian,乳源瑶族自治县:440232:ruyuanxian,新丰县:440233:xinfengxian,乐昌市:440281:lechangshi,南雄市:440282:nanxiongshi";
                break;
            case "440300":
                area = "罗湖区:440303:luohuqu,福田区:440304:futianqu,南山区:440305:nanshanqu,宝安区:440306:baoanqu,龙岗区:440307:longgangqu,盐田区:440308:yantianqu,龙华区:4403AC:longhuaxinqu,坪山区:4403AB:pingshanxinqu,光明区:4403AA:guangmingxinqu,大鹏新区:4403AD:dapengxinqu,前海廉政监督局:4403EZ:qianhailianzhengjdj";
                break;
            case "440400":
                area = "香洲区:440402:xiangzhouqu,斗门区:440403:doumenqu,金湾区:440404:jinwanqu";
                break;
            case "440500":
                area = "龙湖区:440507:longhuqu,金平区:440511:jinpingqu,濠江区:440512:haojiangqu,潮阳区:440513:chaoyangqu,潮南区:440514:chaonanqu,澄海区:440515:denghaiqu,南澳县:440523:nanaoxian";
                break;
            case "440600":
                area = "禅城区:440604:chanchengqu,南海区:440605:nanhaiqu,顺德区:440606:shundequ,三水区:440607:sanshuiqu,高明区:440608:gaomingqu";
                break;
            case "440700":
                area = "蓬江区:440703:pengjiangqu,江海区:440704:jianghaiqu,新会区:440705:xinhuiqu,台山市:440781:taishanshi,开平市:440783:kaipingshi,鹤山市:440784:heshanshi,恩平市:440785:enpingshi,江城区:441702:jiangchengqu,海陵区:441703:hailingqu,阳西县:441721:yangxixian,阳东县:441723:yangdongxian,阳春市:441781:yangchunshi,高新区:4417AA:gaoxinqu";
                break;
            case "440800":
                area = "赤坎区:440802:chikanqu,霞山区:440803:xiashanqu,坡头区:440804:potouqu,麻章区:440811:mazhangqu,遂溪县:440823:suixixian,徐闻县:440825:xuwenxian,廉江市:440881:lianjiangshi,雷州市:440882:leizhoushi,吴川市:440883:wuchuanshi,湛江经济技术开发区:440812:kaifaqu";
                break;
            case "440900":
                area = "茂南区:440902:maonanqu,电白县:440923:dianbaiqu,高州市:440981:gaozhoushi,化州市:440982:huazhoushi,信宜市:440983:xinyishi";
                break;
            case "441200":
                area = "端州区:441202:duanzhouqu,鼎湖区:441203:dinghuqu,广宁县:441223:guangningxian,怀集县:441224:huaijixian,封开县:441225:fengkaixian,德庆县:441226:deqingxian,高要市:441283:gaoyaoshi,四会市:441284:sihuishi";
                break;
            case "441300":
                area = "惠城区:441302:huichengqu,惠阳区:441303:huiyangqu,博罗县:441322:boluoxian,惠东县:441323:huidongxian,龙门县:441324:longmenxian,大亚湾区:441325:dayawanqu,仲恺高新区:441326:zhongkaigxq";
                break;
            case "441400":
                area = "梅江区:441402:meijiangqu,梅县区:441421:meixianqu,大埔县:441422:dapuxian,丰顺县:441423:fengshunxian,五华县:441424:wuhuaxian,平远县:441426:pingyuanxian,蕉岭县:441427:jiaolingxian,兴宁市:441481:xingningshi";
                break;
            case "441500":
                area = "市城区:441502:shichengqu,海丰县:441521:haifengxian,陆河县:441523:luhexian,陆丰市:441581:lufengshi";
                break;
            case "441600":
                area = "源城区:441602:yuanchengqu,紫金县:441621:zijinxian,龙川县:441622:longchuanxian,连平县:441623:lianpingxian,和平县:441624:hepingxian,东源县:441625:dongyuanxian";
                break;
            case "441700":
                area = "江城区:441702,阳西县:441721,阳东县:441723,阳春市:441781";
                break;
            case "441800":
                area = "清城区:441802:qingchengqu,佛冈县:441821:fogangxian,阳山县:441823:yangshanxian,连山县:441825:lianshanxian,连南县:441826:liannanxian,清新县:441827:qingxinqu,英德市:441881:yingdeshi,连州市:441882:lianzhoushi";
                break;
            case "445100":
                area = "湘桥区:445102:xiangqiaoqu,潮安县:445121:chaoanqu,饶平县:445122:raopingxian,枫溪区:4451AN:fengxiqu";
                break;
            case "445200":
                area = "榕城区:445202:rongchengqu,揭东县:445221:jiedongqu,揭西县:445222:jiexixian,惠来县:445224:huilaixian,空港经济区:445225:konggangjjq,蓝城区:445226:lanchengqu,普侨区:445227:puqiaoqu,大南山侨区:445228:dananshanqiaoqu,普宁市:445281:puningshi";
                break;
            case "445300":
                area = "云城区:445302:yunchengqu,新兴县:445321:xinxingxian,郁南县:445322:yunanxian,云安县:445323:yunanqu,罗定市:445381:luodingshi";
                break;
            case "450100":
                area = "兴宁区:450102:xingningqu,青秀区:450103:qingxiuqu,江南区:450105:jiangnanqu,西乡塘区:450107:xixiangtangqu,良庆区:450108:liangqingqu,邕宁区:450109:yongningqu,武鸣区:450122:wumingqu,隆安县:450123:longanxian,马山县:450124:mashanxian,上林县:450125:shanglinxian,宾阳县:450126:binyangxian,横县:450127:hengxian";
                break;
            case "450200":
                area = "城中区:450202:chengzhongqu,鱼峰区:450203:yufengqu,柳南区:450204:liunanqu,柳北区:450205:liubeiqu,柳江区:450221:liujiangqu,柳城县:450222:liuchengxian,鹿寨县:450223:luzhaixian,融安县:450224:ronganxian,融水苗族自治县:450225:rongshuixian,三江侗族自治县:450226:sanjiangxian";
                break;
            case "450300":
                area = "秀峰区:450302:xiufengqu,叠彩区:450303:diecaiqu,象山区:450304:xiangshanqu,七星区:450305:qixingqu,雁山区:450311:yanshanqu,阳朔县:450321:yangshuoxian,临桂县:450322:linguixiqu,灵川县:450323:lingchuanxian,全州县:450324:quanzhouxian,兴安县:450325:xinganxian,永福县:450326:yongfuxian,灌阳县:450327:guanyangxian,龙胜各族自治县:450328:longshengxian,资源县:450329:ziyuanxian,平乐县:450330:pinglexian,荔蒲县:450331:lipuxian,恭城瑶族自治县:450332:gongchengxian";
                break;
            case "450400":
                area = "万秀区:450403:wanxiuqu,长洲区:450405:changzhouqu,苍梧县:450421:cangwuxian,藤县:450422:tengxian,蒙山县:450423:mengshanxian,岑溪市:450481:cenxishi,龙圩区:450482:longweiqu";
                break;
            case "450500":
                area = "海城区:450502:haichengqu,银海区:450503:yinhaiqu,铁山港区:450512:tieshangangqu,合浦县:450521:hepuxian";
                break;
            case "450600":
                area = "港口区:450602:gangkouqu,防城区:450603:fangchengqu,上思县:450621:shangsixian,东兴市:450681:dongxingshi";
                break;
            case "450700":
                area = "钦南区:450702:qinnanqu,钦北区:450703:qinbeiqu,灵山县:450721:lingshanxian,浦北县:450722:pubeixian";
                break;
            case "450800":
                area = "港北区:450802:gangbeiqu,港南区:450803:gangnanqu,覃塘区:450804:qintangqu,平南县:450821:pingnanxian,桂平市:450881:guipingshi";
                break;

            case "450900":
                area = "玉州区:450902:yuzhouqu,容县:450921:rongxian,陆川县:450922:luchuanxian,博白县:450923:bobaixian,兴业县:450924:xingyexian,北流市:450981:beiliushi,福绵区:450903:fumianqu";
                break;
            case "451000":
                area = "右江区:451002:youjiangqu,田阳县:451021:tianyangxian,田东县:451022:tiandongxian,平果县:451023:pingguoxian,德保县:451024:debaoxian,靖西县:451025:jingxishi,那坡县:451026:napoxian,凌云县:451027:lingyunxian,乐业县:451028:leyexian,田林县:451029:tianlinxian,西林县:451030:xilinxian,隆林各族自治县:451031:longlinxian";
                break;
            case "451100":
                area = "八步区:451102:babuqu,昭平县:451121:zhaopingxian,钟山县:451122:zhongshanxian,富川瑶族自治县:451123:fuchuanxian,平桂区:4511AA:pingguiqu";
                break;
            case "451200":
                area = "金城江区:451202:jinchengjiangqu,南丹县:451221:nandanxian,天峨县:451222:tianexian,凤山县:451223:fengshanxian,东兰县:451224:donglanxian,罗城仫佬族自治县:451225:luochengxian,环江毛南族自治县:451226:huanjiangxian,巴马瑶族自治县:451227:bamaxian,都安瑶族自治县:451228:duanxian,大化瑶族自治县:451229:dahuaxian,宜州区:451281:yizhouqu";
                break;
            case "451300":
                area = "兴宾区:451302:xingbinqu,忻城县:451321:xinchengxian,象州县:451322:xiangzhouxian,武宣县:451323:wuxuanxian,金秀瑶族自治县:451324:jinxiuxian,合山市:451381:heshanshi";
                break;
            case "451400":
                area = "江州区:451402:jiangzhouqu,扶绥县:451421:fusuixian,宁明县:451422:ningmingxian,龙州县:451423:longzhouxian,大新县:451424:daxinxian,天等县:451425:tiandengxian,凭祥市:451481:pingxiangshi";
                break;
            case "460100":
                area = "秀英区:460105,龙华区:460106,琼山区:460107,美兰区:460108";
                break;
            case "460200":
                area = "市辖区:460201";
                break;
            case "469000":
                area = "五指山市:469001,琼海市:469002,儋州市:469003,文昌市:469005,万宁市:469006,东方市:469007,定安县:469025,屯昌县:469026,澄迈县:469027,临高县:469028,白沙黎族自治县:469030,昌江黎族自治县:469031,乐东黎族自治县:469033,陵水黎族自治县:469034,保亭黎族苗族自治县:469035,琼中黎族苗族自治县:469036,西沙群岛:469037,南沙群岛:469038,中沙群岛的岛礁及其海域:469039";
                break;
            case "500100":
                area = "万州区:500101:wanzhouqu,黔江区:500114:qianjiangqu,涪陵区:500102:fulingqu,渝中区:500103:yuzhongqu,大渡口区:500104:dadukouqu,江北区:500105:jiangbeiqu,沙坪坝区:500106:shapingbeiqu,九龙坡区:500107:jiulongpoqu,南岸区:500108:nananqu,北碚区:500109:beibeiqu,渝北区:500112:yubeiqu,巴南区:500113:bananqu,长寿区:500115:changshouqu,万盛经开区::501000:wanshengjingkaiqu,双桥区:500111,江津区:508100:jiangjinqu,合川区:508200:hechuanqu,永川区:508300:yongchuanqu,南川区:508400:nanchuanqu,綦江区:502200:qijiangqu,大足区:502500:dazuqu,璧山区:502700:bishanqu,铜梁区:502400:tongliangqu,潼南区:502300:tongnanqu,荣昌区:502600:rongchangqu,开州区:503400:kaizhouqu,梁平区:502800:liangpingqu,武隆区:503200:wulongqu";
                break;
            case "500200":
                area = "潼南县:500223,铜梁县:500224,大足县:500225,荣昌县:500226,璧山县:500227,梁平县:500228,城口县:500229,丰都县:500230,垫江县:503100:dianjiangxian,,忠县:503300:zhongxian,开县:500234,云阳县:503500:yunyangxian,奉节县:503600:fengjiexian,巫山县:503700:wushanxian,巫溪县:503800:wuxixian,石柱县:504000:shizhuxian,秀山县:504100:xiushanxian,酉阳县:504200:youyangxian,彭水县:504300:pengshuixian";
                break;
            case "500300":
                area = "江津市:500381,合川市:500382,永川市:500383,南川市:500384";
                break;
            case "510100":
                area = "锦江区:510104:jinjiangqu,青羊区:510105:qingyangqu,金牛区:510106:jingniuqu,武侯区:510107:wuhouqu,成华区:510108:chenghuaqu,龙泉驿区:510112:longquanyiqu,青白江区:510113:qingbaijiangqu,新都区:510114:xinduqu,温江区:510115:wenjiangqu,金堂县:510121:jingtangxian,双流县:510122:shuangliuxian,郫县:510124:pixian,大邑县:510129:dayixian,蒲江县:510131:pujiangxian,新津县:510132:xinjinxian,都江堰市:510181:dujiangyanshi,彭州市:510182:pengzhoushi,邛崃市:510183:qionglaishi,崇州市:510184:chongzhoushi";
                break;
            case "510300":
                area = "自流井区:510302:ziliujingqu,贡井区:510303:gongjingqu,大安区:510304:daanqu,沿滩区:510311:yantanqu,荣县:510321:rongxian,富顺县:510322:fushunxian,天府新区:510192:tianfuxinqu,高新区:510191:gaoxinqu";
                break;
            case "510400":
                area = "东区:510402:dongqu,西区:510403:xiqu,仁和区:510411:renhequ,米易县:510421:miyixian,盐边县:510422:yanbianxian";
                break;
            case "510500":
                area = "江阳区:510502:jiangyangqu,纳溪区:510503:naxiqu,龙马潭区:510504:longmatanqu,泸县:510521:luxian,合江县:510522:hejiangxian,叙永县:510524:xuyongxian,古蔺县:510525:gulinxian";
                break;
            case "510600":
                area = "罗江县:510626:luojiangxian,广汉市:510681:guanghanshi,什邡市:510682:shifangshi,绵竹市:510683:mianzhushi,中江县:510623:zhongjiangxian,旌阳区:510603:jingyangqu";
                break;
            case "510700":
                area = "涪城区:510703:fuchengqu,游仙区:510704:youxianqu,三台县:510722:santaixian,盐亭县:510723:yantingxian,安县:510724:anxian,梓潼县:510725:zitongxian,北川羌族自治县:510726:beichuanxian,平武县:510727:pingwuxian,江油市:510781:jiangyoushi,安县:510724:anxian,仙海区:510792:xianhaiqu,高新区:510791:gaoxinqu,经济技术开发区:510793:jingkaiqu,科技城科教创业园区::kejiyuanqu";
                break;
            case "510800":
                area = "市中区:510802,利州区:510802:lizhouqu,元坝区:510811:yuanbaqu,朝天区:510812:chaotianqu,旺苍县:510821:wangcangxian,青川县:510822:qingchuanxian,剑阁县:510823:jianggexian,苍溪县:510824:cangxixian";
                break;
            case "510900":
                area = "船山区:510903:chuanshanqu,安居区:510904:anjuqu,蓬溪县:510921:pengxixian,射洪县:510922:shehongxian,大英县:510923:dayingxian";
                break;
            case "511000":
                area = "市中区:511002:shizhongqu,东兴区:511011:dongxingqu,威远县:511024:weiyuanxian,资中县:511025:zizhongxian,隆昌县:511028:longchangshi";
                break;
            case "511100":
                area = "市中区:511102:shizhongqu,沙湾区:511111:shawanqu,五通桥区:511112:wutongqiaoqu,金口河区:511113:jinkouhequ,犍为县:511123:jianweixian,井研县:511124:jingyanxian,夹江县:511126:jiajiangxian,沐川县:511129:muchuanxian,峨边彝族自治县:511132:ebianxian,马边彝族自治县:511133:mabianxian,峨眉山市:511181:emeishanshi";
                break;
            case "511300":
                area = "顺庆区:511302:shunqingqu,高坪区:511303:gaopingqu,嘉陵区:511304:jianglingqu,南部县:511321:nanbuxian,营山县:511322:yingshanxian,蓬安县:511323:penganxian,仪陇县:511324:yilongxian,西充县:511325:xichongxian,阆中市:511381:langzhongshi";
                break;
            case "511400":
                area = "东坡区:511402:dongpoqu,仁寿县:511421:renshouxian,彭山县:511422:pengshanqu,洪雅县:511423:hongyaxian,丹棱县:511424:danlingxian,青神县:511425:qingshengxian";
                break;
            case "511500":
                area = "翠屏区:511502:cuipingqu,宜宾县:511521:yibinxian,南溪县:511522:nanxixian,江安县:511523:jianganxian,长宁县:511524:changningxian,高县:511525:gaoxian,珙县:511526:gongxian,筠连县:511527:junlianxian,兴文县:511528:xingwenxian,屏山县:511529:pingshanxian";
                break;
            case "511600":
                area = "广安区:511602:guanganqu,岳池县:511621:yuechixian,武胜县:511622:wushengxian,邻水县:511623:lingshuixian,华莹市:511681:huayingshi";
                break;
            case "511700":
                area = "通川区:511702:tongchuanqu,达县:511721,宣汉县:511722:xuanhanxian,开江县:511723:kaijiangxian,大竹县:511724:dazhuxian,渠县:511725:quxian,万源市:511781:wanyuanshi";
                break;
            case "511800":
                area = "雨城区:511802:yuchengqu,名山县:511821:mingshanxian,荥经县:511822:yingjingxian,汉源县:511823:hanyuanxian,石棉县:511824:shimianxian,天全县:511825:tianquanxian,芦山县:511826:lushanxian,宝兴县:511827:baoxingxian";
                break;
            case "511900":
                area = "巴州区:511902:bazhouqu,通江县:511921:tongjiangxian,南江县:511922:nanjiangxian,平昌县:511923:pingchangxian";
                break;
            case "512000":
                area = "雁江区:512002:yanjiangqu,安岳县:512021:anyuexian,乐至县:512022:lezhixian,简阳市:512081:jianyangshi";
                break;
            case "513200":
                area = "汶川县:513221:wenchuanxian,理县:513222:lixian,茂县:513223:maoxian,松潘县:513224:songpanxian,九寨沟县:513225:jiuzhaigouxian,金川县:513226:jinchuanxian,小金县:513227:xiaojinxian,黑水县:513228:heishuixian,马尔康县:513229:maerkangxian,壤塘县:513230:xiangtangxian,阿坝县:513231:abaxian,若尔盖县:513232:ruoergaixian,红原县:513233:hongyuanxian";
                break;
            case "513300":
                area = "康定县:513321:kangdingxian,泸定县:513322:ludingxian,丹巴县:513323:danbaxian,九龙县:513324:jiulongxian,雅江县:513325:yajiangxian,道孚县:513326:daofuxian,炉霍县:513327:luhuoxian,甘孜县:513328:ganzixian,新龙县:513329:xinlongxian,德格县:513330:degexian,白玉县:513331:baiyuxian,石渠县:513332:shiquxian,色达县:513333:sedaxian,理塘县:513334:litangxian,巴塘县:513335:batangxian,乡城县:513336:xiangchengxian,稻城县:513337:daochengxian,得荣县:513338:derongxian";
                break;
            case "513400":
                area = "西昌市:513401:xichangshi,木里藏族自治县:513422:mulixian,盐源县:513423:yanyuanxian,德昌县:513424:dechangxian,会理县:513425:huilixian,会东县:513426:huidongxian,宁南县:513427:ningnanxian,普格县:513428:pugexian,布拖县:513429:butuoxian,金阳县:513430:jingyangxian,昭觉县:513431:zhaojuexian,喜德县:513432:xidexian,冕宁县:513433:mianningxian,越西县:513434:yuexixian,甘洛县:513435:ganluoxian,美姑县:513436:meiguxian,雷波县:513437:leiboxian";
                break;
            case "520100":
                area = "南明区:520102:nanmingqu,云岩区:520103:yunyanqu,花溪区:520111:huaxiqu,乌当区:520112:wudangqu,白云区:520113:baiyunqu,开阳县:520121:kaiyangqu,息烽县:520122:xifengxian,修文县:520123:xiuwenxian,清镇市:520181:qingzhenxian";
                break;
            case "520200":
                area = "钟山区:520201:zhongshanqu,六枝特区:520203:liuzhitequ,水城县:520221:shuichengxian,盘县:520222:panxian";
                break;
            case "520300":
                area = "红花岗区:520302:honghuagangqu,汇川区:520303:huichuanqu,播州区:520300:bozhouqu,桐梓县:520322:tongzixian,绥阳县:520323:suiyangxian,正安县:520324:zhenganxian,道真县:520325:daozhenxian,务川县:520326:wuchuanxian,凤冈县:520327:fenggangxian,湄潭县:520328:meitanxian,余庆县:520329:yuqingxian,习水县:520330:xishuixian,赤水市:520381:chishuishi,仁怀市:520382:renhuaishi";
                break;
            case "520400":
                area = "西秀区:520402:xixiuqu,平坝县:520421:pingbaqu,普定县:520422:pudingxian,镇宁县:520423:zhenningxian,关岭县:520424:guanlingxian,紫云县:520425:ziyunxian";
                break;
            case "522200":
                area = "碧江区:522201:bijiangqu,万山区:522230:wanshanqu,江口县:522222:jiangkouxian,石阡县:522224:shiqianxian,思南县:522225:sinanxian,印江县:522226:yinjiangxian,德江县:522227:dejiangxian,沿河县:522228:yanhexian,松桃县:522229:songtaoxian,玉屏县:522223:yupingxian";
                break;
            case "522300":
                area = "兴义市:522301:xingyishi,兴仁县:522322:xingrenxian,普安县:522323:puanxian,晴隆县:522324:qinglongxian,贞丰县:522325:zhenfengxian,望谟县:522326:wangmoxian,册亨县:522327:cehengxian,安龙县:522328:anlongqu";
                break;
            case "522400":
                area = "七星关区:522401:qixingguanqu,大方县:522422:dafangxian,黔西县:522423:qianxixian,金沙县:522424:jinshaxian,织金县:522425:zhijinxian,纳雍县:522426:nayongxian,威宁县:522427:weiningxian,赫章县:522428:hezhangxian";
                break;
            case "522600":
                area = "凯里市:522601:kailishi,黄平县:522622:huangpingxian,施秉县:522623:shibingxian,三穗县:522624:sansuixian,镇远县:522625:zhenyuanxian,岑巩县:522626:cengongxian,天柱县:522627:tianzhuxian,锦屏县:522628:jinpingxian,剑河县:522629:jianhexian,台江县:522630:taijiangxian,黎平县:522631:lipingxian,榕江县:522632:rongjiangxian,从江县:522633:congjiangxian,雷山县:522634:leishanxian,麻江县:522635:majiangxian,丹寨县:522636:danzhaixian";
                break;
            case "522700":
                area = "都匀市:522701:duyunshi,福泉市:522702:fuquanshi,荔波县:522722:liboxian,贵定县:522723:guidingxian,瓮安县:522725:wenanxian,独山县:522726:dushanxian,平塘县:522727:pingtangxian,罗甸县:522728:luodianxian,长顺县:522729:changshunxian,龙里县:522730:longlixian,惠水县:522731:huishuixian,三都水族自治县:522732:sanduxian";
                break;
            case "530100":
                area = "五华区:530102:wuhuaqu,盘龙区:530103:panlongqu,官渡区:530111:guanduqu,西山区:530112:xishanqu,东川区:530113:dongchuanqu,呈贡县:530121:chenggongqu,晋宁县:530122:jinningqu,富民县:530124:fuminxian,宜良县:530125:yiliangxian,石林彝族自治县:530126:shilinxian,嵩明县:530127:songmingxian,安宁市:530181:anningshi,禄劝彝族苗族自治县:530128:luquanxian,寻甸回族彝族自治县:530129:xundainxian";
                break;
            case "530300":
                area = "麒麟区:530302:qilinqu,马龙县:530321:malongxian,陆良县:530322:luliangxian,师宗县:530323:shizongxian,罗平县:530324:luopingxian,富源县:530325:fuyuanxian,会泽县:530326:huizexian,沾益县:530328:zhanyixian,宣威市:530381:xuanweishi";
                break;
            case "530400":
                area = "红塔区:530402:hongtaqu,江川县:530421:jiangchuanqu,澄江县:530422:chengjiangxian,通海县:530423:tonghaixian,华宁县:530424:huaningxian,易门县:530425:yimenxian";
                break;
            case "530500":
                area = "隆阳区:530502:longyangqu,施甸县:530521:shidianxian,腾冲县:530522:tengchongshi,龙陵县:530523:longlingxian,昌宁县:530524:changningxian";
                break;
            case "530600":
                area = "昭阳区:530602:zhaoyangqu,鲁甸县:530621:ludianxian,巧家县:530622:qiaojiaxian,盐津县:530623:yanjinxian,大关县:530624:daguanxian,永善县:530625:yongshanxian,绥江县:530626:suijiangxian,镇雄县:530627:zhenxiongxian,彝良县:530628:yiliangxian,威信县:530629:weixinxian,水富县:530630:shuifuxian";
                break;
            case "530700":
                area = "古城区:530702:guchengqu,玉龙纳西族自治县:530721:yulongxian,永胜县:530722:yongshenxian,华坪县:530723:huapingxian,宁蒗彝族自治县:530724:ninglangxian";
                break;
            case "530800":
                area = "思茅区:530802:simaoqu,宁洱县:530821:ningerxian,墨江县:530822:mojiangxian,景东县:530823:jingdongxian,景谷县:530824:jingguxian,镇沅县:530825:zhengyuanxian,江城县:530826:jiangchengxian,孟连县:530827:menglianxian,澜沧县:530828:lancanxian,西盟县:530829:ximengxian";
                break;
            case "530900":
                area = "临翔区:530902:linxiangqu,凤庆县:530921:fengqingxian,云县:530922:yunxian,永德县:530923:yongdexian,镇康县:530924:zhenkangxian";
                break;
            case "532300":
                area = "楚雄市:532301:chuxiongshi,双柏县:532322:shuangbaixian,牟定县:532323:modingxian,南华县:532324:nanhuaxian,姚安县:532325:yaoanxian,大姚县:532326:dayaoxian,永仁县:532327:yongrenxian,元谋县:532328:yuanmouxian,武定县:532329:wudingxian,禄丰县:532331:lufengxian";
                break;
            case "532500":
                area = "个旧市:532501:gejiushi,开远市:532502:kaiyuanshi,蒙自县:532522:mengzishi,屏边苗族自治县:532523,建水县:532524:jianshuixian,石屏县:532525:shipingxian,弥勒县:532526:mileshi,泸西县:532527:luxixian,元阳县:532528:yuanyangxian,红河县:532529:honghexian,绿春县:532531:lvchunxian";
                break;
            case "532600":
                area = "文山县:532621,砚山县:532622:yanshanxian,西畴县:532623:xichouxian,麻栗坡县:532624:malipoxian,马关县:532625:maguanxian,丘北县:532626:qiubeixian,广南县:532627:guangnanxian,富宁县:532628:funingxian";
                break;
            case "532800":
                area = "景洪市:532801:jinghongshi,勐海县:532822:menghaixian,勐腊县:532823:menglaxian";
                break;
            case "532900":
                area = "大理市:532901:dalishi,漾濞彝族自治县:532922:yangbixian,祥云县:532923:xiangyunxian,宾川县:532924:binchuanxian,弥渡县:532925:miduxian,南涧彝族自治县:532926:nanjianxian,巍山彝族回族自治县:532927:weishanxian,永平县:532928:yongpingxian,云龙县:532929:yunlongxian,洱源县:532930:eryuanxian,剑川县:532931:jianchuanxian,鹤庆县:532932:heqingxian";
                break;
            case "533100":
                area = "瑞丽市:533102:ruilishi,潞西市:533103:mangshi,梁河县:533122:lianghexian,盈江县:533123:yingjiangxian,陇川县:533124:longchuanxian";
                break;
            case "533300":
                area = "泸水市:533321:lushuishi,福贡县:533323:fugongxian,贡山独龙族怒族自治县:533324:gongshanxian,兰坪白族普米族自治县:533325:lanpingxian";
                break;
            case "533400":
                area = "香格里拉市:533421:xianggelilashi,德钦县:533422:deqinxian,维西傈僳族自治县:533423:weixixian";
                break;
            case "540100":
                area = "城关区:540102:chengguanqu,林周县:540121:linzhouxian,当雄县:540122:dangxiongxian,尼木县:540123:nimuxian,曲水县:540124:qushuixian,堆龙德庆县:540125:duilongdeqingqu,达孜县:540126:dazixian,墨竹工卡县:540127:mozhugongkaxian";
                break;
            case "542100":
                area = "昌都县:542121,卡若区:542121:karuoqu,江达县:542122:jiangdaxian,贡觉县:542123:gongjuexian,类乌齐县:542124:leiwuqixian,丁青县:542125:dingqingxian,察雅县:542126:chayaxian,八宿县:542127:basuxian,左贡县:542128:zuogongxian,芒康县:542129:mangkangxian,洛隆县:542132:luolongxian,边坝县:542133:bianbaxian";
                break;
            case "542200":
                area = "乃东县:542221:naidongqu,扎囊县:542222:zhanangxian,贡嘎县:542223:gonggaxian,桑日县:542224:sangrixian,琼结县:542225:qiongjiexian,曲松县:542226:qusongxian,措美县:542227:cuomeixian,洛扎县:542228:luozhaxian,加查县:542229:jiachaxian,隆子县:542231:longzixian,错那县:542232:cuonaxian,浪卡子县:542233:langkazixian";
                break;
            case "542300":
                area = "桑珠孜区:542301:sangzhuziqu,南木林县:542322:nanmulinxian,江孜县:542323:jiangzixian,定日县:542324:dingrixian,萨迦县:542325:sajiaxian,拉孜县:542326:lazixian,昂仁县:542327:angrenxian,谢通门县:542328:xietongmenxian,白朗县:542329:bailangxian,仁布县:542330:renbuxian,康马县:542331:kangmaxian,定结县:542332:dingjiexian,仲巴县:542333:zhongbaxian,亚东县:542334:yadongxian,吉隆县:542335:jilongxian,聂拉木县:542336:nielamuxian,萨嘎县:542337:sagaxian,岗巴县:542338:gangbaxian";
                break;
            case "542400":
                area = "那曲县:542421:naquxian,嘉黎县:542422:jialixian,比如县:542423:biruxian,聂荣县:542424:nierongxian,安多县:542425:anduoxian,申扎县:542426:shenzhaxian,索县:542427:suoxian,班戈县:542428:bangexian,巴青县:542429:baqingxian,尼玛县:542430:nimaxian";
                break;
            case "542500":
                area = "普兰县:542521:pulanxian,札达县:542522:zhadaxian,噶尔县:542523:gaerxian,日土县:542524:rituxian,革吉县:542525:gejixian,改则县:542526:gaizexian,措勤县:542527:cuolexian";
                break;
            case "542600":
                area = "巴宜区:542621:bayiqu,工布江达县:542622:gongbujiangdaxian,米林县:542623:milinxian,墨脱县:542624:motuoxian,波密县:542625:bomixian,察隅县:542626:chayuxian,朗县:542627:langxian";
                break;
            case "610100":
                area = "新城区:610102:xinchengqu,碑林区:610103:beilinqu,莲湖区:610104:lianhuqu,灞桥区:610111:baqiaoqu,未央区:610112:weiyangqu,雁塔区:610113:yantaqu,阎良区:610114:yanliangqu,临潼区:610115:lintongqu,长安区:610116:changanqu,蓝田县:610122:lantianxian,周至县:610124:zhouzhixian,鄠邑区:610125:huyiqu,高陵县:610126:gaolingqu";
                break;
            case "610200":
                area = "王益区:610202:wangyiqu,印台区:610203:yintaiqu,耀州区:610204:yaozhouqu,宜君县:610222:yijunxian";
                break;
            case "610300":
                area = "渭滨区:610302:weibinqu,金台区:610303:jintaiqu,陈仓区:610304:chencangqu,凤翔县:610322:fengxiangxian,岐山县:610323:qishanxian,扶风县:610324:fufengxian,眉县:610326:meixian,陇县:610327:longxian,千阳县:610328:qianyangxian,麟游县:610329:linyouxian,凤县:610330:fengxian,太白县:610331:taibaixian";
                break;
            case "610400":
                area = "秦都区:610402:zhashuixian,杨陵区:610403:yanglingqu,渭城区:610404:weichengqu,三原县:610422:sanyuanxian,泾阳县:610423:jingyangxian,乾县:610424:qianxian,礼泉县:610425:liquanxian,永寿县:610426:yongshouxian,彬县:610427:binxian,长武县:610428:changwuxian,旬邑县:610429:xunyixian,淳化县:610430:chunhuaxian,武功县:610431:wugongxian,兴平市:610481:xingpingxian";
                break;
            case "610500":
                area = "临渭区:610502:linweiqu,华州区:610521:huazhouqu,潼关县:610522:tongguanxian,大荔县:610523:dalixian,合阳县:610524:heyangxian,澄城县:610525:chengchengxian,蒲城县:610526:puchengxian,白水县:610527:baishuixian,富平县:610528:fupingxian,韩城市:610581:hanchengshi,华阴市:610582:huayinshi";
                break;
            case "610600":
                area = "宝塔区:610602:baotaqu,延长县:610621:yanchangxian,延川县:610622:yanchuanxian,子长县:610623:zichangxian,安塞县:610624:ansaiqu,志丹县:610625:zhidanxian,吴旗县:610626:wuqixian,甘泉县:610627:ganquanxian,富县:610628:fuxian,洛川县:610629:luochuanxian,宜川县:610630:yichuanxian,黄龙县:610631:huanglongxian,黄陵县:610632:huanglingxian";
                break;
            case "610700":
                area = "汉台区:610702:hantaiqu,南郑县:610721:nanzhengqu,城固县:610722:chengguxian,洋县:610723:yangxian,西乡县:610724:xixiangxian,勉县:610725:mianxian,宁强县:610726:ningqiangxian,略阳县:610727:lueyangxian,镇巴县:610728:zhenbaxian,留坝县:610729:liubaxian,佛坪县:610730:fopingxian";
                break;
            case "610800":
                area = "榆阳区:610802:yuyangqu,神木县:610821:shenmushi,府谷县:610822:fuguxian,横山区:610823:hengshanqu,靖边县:610824:jingbianxian,定边县:610825:dingbianxian,绥德县:610826:suidexian,米脂县:610827:mizhixian,佳县:610828:jiaxian,吴堡县:610829:wubaoxian,清涧县:610830:qingjianxian,子洲县:610831:zizhouxian";
                break;
            case "610900":
                area = "汉滨区:610902:hanbinqu,汉阴县:610921:hanyinxian,石泉县:610922:shiquanxian,宁陕县:610923:ningshanxian,紫阳县:610924:ziyangxian,岚皋县:610925:langaoxian,平利县:610926:pinglixian,镇坪县:610927:zhenpingxian,旬阳县:610928:xunyangxian,白河县:610929:baihexian";
                break;
            case "611000":
                area = "商州区:611002:shangzhouqu,洛南县:611021:luonanxian,丹凤县:611022:danfengxian,商南县:611023:shangnanxian,山阳县:611024:shanyangxian,镇安县:611025:zhenanxian,柞水县:611026:zhashuixian";
                break;
            case "620100":
                area = "城关区:620102,七里河区:620103,西固区:620104,安宁区:620105,红古区:620111,永登县:620121,皋兰县:620122,榆中县:620123";
                break;
            case "620200":
                area = "市辖区:620201";
                break;
            case "620300":
                area = "金川区:620302,永昌县:620321";
                break;
            case "620400":
                area = "白银区:620402,平川区:620403,靖远县:620421,会宁县:620422,景泰县:620423";
                break;
            case "620500":
                area = "秦州区:620502,麦积区:620503,清水县:620521,秦安县:620522,甘谷县:620523,武山县:620524,张家川回族自治县:620525";
                break;
            case "620600":
                area = "凉州区:620602,民勤县:620621,古浪县:620622,天祝藏族自治县:620623";
                break;
            case "620700":
                area = "甘州区:620702,肃南裕固族自治县:620721,民乐县:620722,临泽县:620723,高台县:620724,山丹县:620725";
                break;
            case "620800":
                area = "崆峒区:620802,泾川县:620821,灵台县:620822,崇信县:620823,华亭县:620824,庄浪县:620825,静宁县:620826";
                break;
            case "620900":
                area = "肃州区:620902,金塔县:620921,安西县:620922,肃北蒙古族自治县:620923,阿克塞哈萨克族自治县:620924,玉门市:620981,敦煌市:620982";
                break;
            case "621000":
                area = "西峰区:621002,庆城县:621021,环县:621022,华池县:621023,合水县:621024,正宁县:621025,宁县:621026,镇原县:621027";
                break;
            case "621100":
                area = "安定区:621102,通渭县:621121,陇西县:621122,渭源县:621123,临洮县:621124,漳县:621125,岷县:621126";
                break;
            case "621200":
                area = "武都区:621202,成县:621221,文县:621222,宕昌县:621223,康县:621224,西和县:621225,礼县:621226,徽县:621227,两当县:621228";
                break;
            case "622900":
                area = "临夏市:622901,临夏县:622921,康乐县:622922,永靖县:622923,广河县:622924,和政县:622925,东乡族自治县:622926,积石山保安族东乡族撒拉族自治县:622927";
                break;
            case "623000":
                area = "合作市:623001,临潭县:623021,卓尼县:623022,舟曲县:623023,迭部县:623024,玛曲县:623025,碌曲县:623026,夏河县:623027";
                break;
            case "630100":
                area = "城东区:630102:chengdongqu,城中区:630103:chengzhongqu,城西区:630104:chengxiqu,城北区:630105:chengbeiqu,大通县:630121:datongxian,湟中县:630122:huangzhongxian,湟源县:630123:huangyuanxian";
                break;
            case "632100":
                area = "平安县:632121:pinganqu,民和县:632122:minhexian,乐都区:632123:leduqu,互助县:632126:huzhuxian,化隆县:632127:hualongxian,循化县:632128:xunhuaxian";
                break;
            case "632200":
                area = "门源县:632221:menyuanxian,祁连县:632222:qilianxian,海晏县:632223:haiyanxian,刚察县:632224:gangchaxian";
                break;
            case "632300":
                area = "同仁县:632321:tongrenxian,尖扎县:632322:jianzhaxian,泽库县:632323:zekuxian,河南县:632324:henanxian";
                break;
            case "632500":
                area = "共和县:632521:gonghexian,同德县:632522:tongdexian,贵德县:632523:guidexian,兴海县:632524:xinghaixian,贵南县:632525:guinanxian";
                break;
            case "632600":
                area = "玛沁县:632621:maqinxian,班玛县:632622:banmaxian,甘德县:632623:gandexian,达日县:632624:darixian,久治县:632625:jiuzhixian,玛多县:632626:maduoxian";
                break;
            case "632700":
                area = "玉树市:632721:yushushi,杂多县:632722:zaduoxian,称多县:632723:chengduoxian,治多县:632724:zhiduoxian,囊谦县:632725:nangqianxian,曲麻莱县:632726:qumacaixian";
                break;
            case "632800":
                area = "格尔木市:632801:geermushi,德令哈市:632802:delinghashi,乌兰县:632821:wulanxian,都兰县:632822:doulanxian,天峻县:632823:tianjunxian,茫崖纪工委:632824:mangyajgw,冷湖纪工委:632825:lenghujgw,大柴旦纪工委:632826:dachaidanjgw";
                break;
            case "640100":
                area = "兴庆区:640104:xingqingqu,西夏区:640105:xixiaqu,金凤区:640106:jinfengqu,永宁县:640121:yongningxian,贺兰县:640122:helanxian,灵武市:640181:lingwushi";
                break;
            case "640200":
                area = "大武口区:640202:dawukouqu,惠农区:640205:huinongqu,平罗县:640221:pingluoxian";
                break;
            case "640300":
                area = "利通区:640302:litongqu,盐池县:640323:yanchixian,同心县:640324:tongxinxian,青铜峡市:640381:qingtongxiashi,红寺堡区:640303:hongsibaoqu";
                break;
            case "640400":
                area = "原州区:640402:yuanzhouqu,西吉县:640422:xijiqu,隆德县:640423:longdexian,泾源县:640424:jingyuanxian,彭阳县:640425:pengyangxian";
                break;
            case "640500":
                area = "沙坡头区:640502:shapotouqu,中宁县:640521:zhongningxian,海原县:640522:haiyuanxian";
                break;
            case "650100":
                area = "天山区:650102,沙依巴克区:650103,新市区:650104,水磨沟区:650105,头屯河区:650106,达坂城区:650107,东山区:650108,乌鲁木齐县:650121";
                break;
            case "650200":
                area = "独山子区:650202,克拉玛依区:650203,白碱滩区:650204,乌尔禾区:650205";
                break;
            case "652100":
                area = "吐鲁番市:652101,鄯善县:652122,托克逊县:652123";
                break;
            case "652200":
                area = "哈密市:652201,巴里坤哈萨克自治县:652222,伊吾县:652223";
                break;
            case "652300":
                area = "昌吉市:652301,阜康市:652302,米泉市:652303,呼图壁县:652323,玛纳斯县:652324,奇台县:652325,吉木萨尔县:652327,木垒哈萨克自治县:652328";
                break;
            case "652700":
                area = "博乐市:652701,精河县:652722,温泉县:652723";
                break;
            case "652800":
                area = "库尔勒市:652801,轮台县:652822,尉犁县:652823,若羌县:652824,且末县:652825,焉耆回族自治县:652826,和静县:652827,和硕县:652828,博湖县:652829";
                break;
            case "652900":
                area = "阿克苏市:652901,温宿县:652922,库车县:652923,沙雅县:652924,新和县:652925,拜城县:652926,乌什县:652927,阿瓦提县:652928,柯坪县:652929";
                break;
            case "653000":
                area = "阿图什市:653001,阿克陶县:653022,阿合奇县:653023,乌恰县:653024";
                break;
            case "653100":
                area = "喀什市:653101,疏附县:653121,疏勒县:653122,英吉沙县:653123,泽普县:653124,莎车县:653125,叶城县:653126,麦盖提县:653127,岳普湖县:653128,伽师县:653129,巴楚县:653130,塔什库尔干塔吉克自治县:653131";
                break;
            case "653200":
                area = "和田市:653201,和田县:653221,墨玉县:653222,皮山县:653223,洛浦县:653224,策勒县:653225,于田县:653226,民丰县:653227";
                break;
            case "654000":
                area = "伊宁市:654002,奎屯市:654003,伊宁县:654021,察布查尔锡伯自治县:654022,霍城县:654023,巩留县:654024,新源县:654025,昭苏县:654026,特克斯县:654027,尼勒克县:654028";
                break;
            case "654200":
                area = "塔城市:654201,乌苏市:654202,额敏县:654221,沙湾县:654223,托里县:654224,裕民县:654225,和布克赛尔蒙古自治县:654226";
                break;
            case "654300":
                area = "阿勒泰市:654301,布尔津县:654321,富蕴县:654322,福海县:654323,哈巴河县:654324,青河县:654325,吉木乃县:654326";
                break;
            case "659000":
                area = "石河子市:659001,阿拉尔市:659002,图木舒克市:659003,五家渠市:659004";
                break;
            case "660100":
                area = "二团:6601FE:ertuan,三团:6601FF:santuan,四团:6601FG:situan,六团:6601FI:liutuan,七团:6601FJ:qituan,八团:6601FK:batuan,九团:6601HY:jiutuan,十团:6601FL:shituan,十一团:6601FM:shiyituan,十二团:6601FN:shiertuan,十三团:6601FO:shisantuan,十四团:6601FP:shisituan,十六团:6601FQ:shiliutuan";
                break;
            case "660200":
                area = "二十一团:6602FD:ershiyituan,二十二团:6602FE:ershiertuan,二十四团:6602FF:ershisituan,二十五团:6602FG:ershiwutuan,二十七团:6602FH:ershiqituan,二十九团:6602FI:ershijiutuan,三十团:6602FJ:sanshituan,三十一团:6602FK:sanshiyituan,三十三团:6602FL:sanshisantuan,三十四团:6602FM:sanshisituan,三十七团:6602FQ:sanshiqituan,三十八团:6602FO:sanshibatuan,二二三团:6602FP:erersantuan";
                break;
            case "660300":
                area = "四十一团:660301:sishiyituan,四十二团:660302:sishiertuan,四十四团:660303:sishisituan,四十五团:660304:sishiwutuan,四十六团:660305:sishiliutuan,四十八团:660306:sishibatuan,四十九团:660307:sishijiutuan,五十一团:660309:wushiyituan,五十三团:660310:wushisantuan,五十四团:6603AN:wushisituan,伽师总场:660311:jiashizongchang,红旗农场:6603AO:hongqinongchang,托云牧场:6603AP:tuoyunmuchang,东风农场:6603AQ:dongfengnongcheng,叶城二牧场:660312:yechengmuchang";
                break;
            case "660400":
                area = "六十一团:6604FD:liushiyituan,六十二团:6604FE:liushiertuan,六十三团:6604FF:liushisantuan,六十四团:6604FG:liushisituan,六十六团:6604FH:liushiliutuan,六十七团:6604FI:liushiqituan,六十八团:6604FJ:liushibatuan,六十九团:6604FK:liushijiutuan,七十团:6604FL:qishituan,七十一团:6604FM:qishiyituan,七十二团:6604FN:qishiertuan,七十三团:6604FO:qishisantuan,七十四团:6604FP:qishisituan,七十五团:6604FQ:qishiwutuan,七十六团:6604FR:qishiliutuan,七十七团:6604FS:qishiqituan,七十八团:6604FT:qishibatuan,七十九团:6604FU:qishijiutuan,三十六团:6604HX:sanshiliutuan";
                break;
            case "660500":
                area = "八十一团:6605AA:bashiyituan,八十三团:6605AB:bashisantuan,八十四团:6605AC:bashisituan,八十六团:6605AD:bashiliutuan,八十七团:6605AE:bashiqituan,八十八团:6605AF:bashibatuan,八十九团:6605AG:bashijiutuan,九十团:6605AH:jiushituan,九十一团:6605AI:jiushiyituan";
                break;
            case "660600":
                area = "一〇一团:6606AA:yilingyituan,一〇二团:6606AB:yilingertuan,一〇三团:6606AC:yilingsantuan,一〇五团:6606AD:yilingwutuan,一〇六团:6606AE:yilingliutuan,芳草湖农场:6606AF:fangcaohu,新湖农场:6606AG:xinhu,奇台农场:6606AM:qitai,红旗农场:6606AL:hongqi,共青团农场:6606AI:gongqingtuan,六运湖农场:6606AJ:liuyunhu,土墩子农场:6606AK:tudunzi,军户农场:6606AH:junhu,北塔山农场:6606AN:beitashan,五十团:6606DE:wushituan";
                break;
            case "660700":
                area = "一二三团:6607AA:yiersantuan,一二四团:6607AB:yiersituan,一二五团:6607AC:yierwutuan,一二六团:6607AD:yierliutuan,一二七团:6607AE:yierqituan,一二八团:6607AF:yierbatuan,一二九团:6607AG:yierjiutuan,一三〇团:6607AH:yisanlingtuan,一三一团:6607AI:yisanyituan,一三七团:6607AJ:yisanqituan,奎东农场:6607AK:kuinong,一团:6607GV:yituan";
                break;
            case "660800":
                area = "一二一团:6608AH:yieryituan,一三三团:6608AJ:yisansantuan,一三四团:6608AL:yisansituan,一三六团:6608AN:yisanliutuan,一四一团:6608AP:yisiyituan,一四二团:6608AR:yisiertuan,一四三团:6608AT:yisisantuan,一四四团:6608AV:yisisituan,一四七团:6608AZ:yisiqituan,一四八团:6608BB:yisibatuan,一四九团:6608BD:yisijiutuan,一五零团:6608BF:yiwulingtuan,一五二团:6608BH:yiwuertuan,石河子总场北泉镇:6608AX:shihezizongchang";
                break;
            case "660900":
                area = "一六一团:6609AA:yiliuyituan,一六二团:6609AB:yiliuertuan,一六三团:6609AC:yiliusantuan,一六四团:6609AD:yiliusituan,一六五团:6609AE:yiliuwutuan,一六六团:6609AF:yiliuliutuan,一六七团:6609AG:yiliuqituan,一六八团:6609AH:yiliubatuan,一七〇团:6609AJ:yiqilingtuan,团结农场:6609AK:tuanjienongchang";
                break;
            case "661000":
                area = "一八一团:6610AA:yibayituan,一八二团:6610AB:yibaertuan,一八三团:6610AC:yibasantuan,一八四团:6610AD:yibasituan,一八五团:6610AE:yibawutuan,一八六团:6610AF:yibaliutuan,一八七团:6610AG:yibaqituan,一八八团:6610AH:yibabatuan";
                break;
            case "661100":
                area = "五团沙河镇:6611AX:wutuan";
                break;
            case "661200":
                area = "一〇四团:6612AA:yilingsituan,五一农场:6612AB:wuyi,三坪农场:6612AC:sanping,头屯河农场:6612AD:toutunhe,西山农牧场:6612AE:xishan,二二一团:6612AF:ereryituan,二二二团:6612AG:ererertuan,四十七团:6612BQ:sishiqituan";
                break;
            case "661300":
                area = "红星一场:6613AA:hongxingyichang,红星二场:6613AB:hongxingerchang,红星四场:6613AC:hongxingsichang,淖毛湖农场:6613AH:naomaohu,红山农场:6613AG:hongshan,柳树泉农场:6613AF:liushuquan,火箭农场:6613AD:huojian,黄田农场:6613AE:huangtian";
                break;
            case "661400":
                area = "二二四团:6614AC:erersituan,皮山农场:6614AD:pishan,二二五团:6614AB:ererwutuan,一牧场:6614AA:yimuchang";
                break;
            default:
                area = ""//找不到的返回空


        }
}