const moment = require('moment'),
    _ = require('underscore'),
    log4js = require('../util/log4j'),
    xlsx = require('node-xlsx'),
    URLEncoder = require('urlencode'),
    exportExcelDao = require('../dao/exportExcel').exportExcelDAO,
    serviceJoinDAO = require('../dao/serviceJoin').serviceJoinDAO;

let exportExcelService = {};
exportExcelService.excel = async (ctx) => {
    let data = {
        status: ctx.request.query.status
    }
    let query={},sort = {applyTime: -1};
    if(data.status){
        query.status=data.status;
    }
    try {
        let data = await exportExcelDao.findProcureAll(query,sort);
        let exc=[];
        let head=['申请单编号','服务名称','服务范围','服务分类','单位名称','申请人姓名','申请日期','审核状态'];
        exc.push(head);
        let fenlei = {
            'A':'交通',
            'B':'社会保障',
            'C':'教育',
            'D':'医疗',
            'E':'民政',
            'F':'证件办理',
            'G':'旅游',
            'L':'政务服务',
            'M':'文化体育',
            'I':'投诉举报',
            'K':'税务',
            'X':'信用服务',
            'Y':'法规查询',
            'Z':'其他'
        }
        let city={
            'all':'全国',
            '110000':'北京市',
            '120000':'天津市',
            '310000':'上海市',
            '500000':'重庆市',
            '130000':'河北省',
            '140000':'山西省',
            '210000':'辽宁省',
            '220000':'吉林省',
            '230000':'黑龙江省',
            '320000':'江苏省',
            '330000':'浙江省',
            '340000':'安徽省',
            '350000':'福建省',
            '360000':'江西省',
            '370000':'山东省',
            '410000':'河南省',
            '420000':'湖北省',
            '430000':'湖南省',
            '440000':'广东省',
            '460000':'海南省',
            '510000':'四川省',
            '520000':'贵州省',
            '530000':'云南省',
            '610000':'陕西省',
            '620000':'甘肃省',
            '630000':'青海省',
            '710000':'台湾省',
            '150000':'内蒙古自治区',
            '450000':'广西壮族自治区',
            '540000':'西藏自治区',
            '640000':'宁夏回族自治区',
            '650000':'新疆维吾尔自治区',
            '810000':'香港特别行政区',
            '820000':'澳门特别行政',
            '520100':'贵阳市',
            '330100':'杭州市',
            '440300':'深圳市',
            '440100':'广州市',
            '110100':'市辖区',
            '430100':'长沙市',
            '430200':'株洲市',
            '430300':'湘潭市',
            '430400':'衡阳市',
            '430500':'邵阳市',
            '430600':'岳阳市',
            '430700':'常德市',
            '430800':'张家界市',
            '430900':'益阳市',
            '431000':'郴州市',
            '431100':'永州市',
            '431200':'怀化市',
            '431300':'娄底市',
            '433100':'湘西土家族苗族自治州',
            '419000':'驻马店市',
            '411700':'周口市',
            '411600':'信阳市',
            '411500':'商丘市',
            '411400':'南阳市',
            '411300':'三门峡市',
            '411200':'漯河市',
            '411100':'许昌市',
            '411000':'濮阳市',
            '410900':'焦作市',
            '410800':'新乡市',
            '410700':'鹤壁市',
            '410600':'安阳市',
            '410500':'平顶山市',
            '410400':'洛阳市',
            '410300':'开封市',
            '410200':'郑州市',
            '410100':'菏泽市',
        };
        let status={
            '1':'待审核',
            '2':'已通过',
            '3':'未通过',
            '4':'已撤销'
        }
        data.forEach(item=>{
            let arr=item.city.split(',');
            let j='';
            console.log('arr:'+arr);
            arr.forEach(arr=>{
                j+=city[arr.trim()]+',';
            });
            j=j.substring(0,j.length-1);
            item.city=j;
            let excel=[];
            excel.push(item.procureID);
            excel.push(item.serviceName);
            excel.push(item.city);
            excel.push(fenlei[item.serviceType]);
            excel.push(item.unitName);
            excel.push(item.contactName);
            excel.push(item.applyTime);
            excel.push(status[item.status]);
            exc.push(excel);
        })
        writeXls(exc);
        function writeXls(datas) {
            let buffer = xlsx.build([
                {
                    name:'sheet1',
                    data:datas
                }
            ]);
            let filename=URLEncoder.encode("服务采购申请列表") + ".xlsx"
            ctx.set('Content-Type','application/octet-stream');
            ctx.set('Content-disposition','attachment;filename='+filename);
            ctx.body=buffer;
        }

    } catch (e) {
        log4js.error(e);
        ctx.body = {
            code: 500,
            msg: '列表数据加载失败'
        }
    }
}
//服务接入Excel导出
exportExcelService.serviceJoinExcel = async (ctx) => {
    let query = {};
    if(ctx.request.query.reviewState && ctx.request.query.reviewState != 0){
        query.reviewState = Number(ctx.request.query.reviewState);
    }
    try {
        let getResults = await serviceJoinDAO.get(query,{sort:{createDate: -1}});
        let exc = [];
        let head = ['申请单编号','服务名称','服务接入方式及地址','服务类型','是否需要付费','是否需要登录','服务接入方式','服务接入事项描述'
            ,'联系人姓名','联系人电话','单位名称','单位通讯地址','审核状态','审核意见','申请日期','申请用户openID'];
        exc.push(head);
        let serviceType = ['业务查询','业务办理','业务预约'];
        let joinType = ['内嵌','封装','采集'];
        let reviewState = ['待审核','已撤销','已通过','未通过'];
        if(getResults.dataCount >0 ){
            getResults.dataList.forEach((item) => {
                let excel = [];
                excel.push(item.idNumber);
                excel.push(item.serviceName);
                excel.push(item.serviceUrl);
                excel.push(serviceType[item.serviceType-1]);
                excel.push(item.isPay?"是":"否");
                excel.push(item.isLogin?"是":"否");
                excel.push(joinType[item.joinType-1]);
                excel.push(item.describe);
                excel.push(item.contactName);
                excel.push(item.contactTel);
                excel.push(item.company);
                excel.push(item.address);
                excel.push(reviewState[item.reviewState-1]);
                excel.push(item.reviewSuggest);
                excel.push(item.createDate);
                excel.push(item.openID);
                exc.push(excel);
            })
        }
        writeXls(exc);
        function writeXls(datas) {
            let buffer = xlsx.build([
                {
                    name:'sheet1',
                    data:datas
                }
            ]);
            let filename = URLEncoder.encode("服务接入申请列表","UTF-8") + ".xlsx";
            ctx.set('Content-Type','application/octet-stream');
            ctx.set('Content-disposition','attachment;filename=' + filename);
            ctx.body = buffer;
        }

    } catch (e) {
        log4js.error(e);
        ctx.body = {
            code: 500,
            msg: '列表数据加载失败'
        }
    }
}

exports.exportExcelService = exportExcelService;