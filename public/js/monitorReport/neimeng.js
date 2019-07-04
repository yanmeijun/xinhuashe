$('#reportQuestionIdTrigger,#reportQuestionId').on("click", function () {
    if(!$('#reportQuestionId1Trigger').attr("data_id")){
        return;
    }
    var level_code = $('#reportLevelTrigger').attr("data_id");
    var v= $('#reportQuestionId1Trigger').html();
    var reportLevel = $('#reportLevelTrigger').text();
    if(v == '违反政治纪律行为') {
        weekdayArr = [
            {name: "公开发表危害党的言论", id: "012101"},
            {name: "参加反对党和政府的活动或组织", id: "012102"},
            {name: "在党内搞团团伙伙", id: "012103"},
            {name: "妨碍党和国家方针政策实施", id: "012104"},
            {name: "对抗组织审查", id: "012105"},
            {name: "组织参加迷信活动", id: "012106"},
            {name: "叛逃及涉外活动中损害党和国家利益", id: "012107"},
            {name: "无原则一团和气和违反政治规矩", id: "012108"}
        ]
    } else if(v == '违反组织纪律行为') {
        if(level_code == '0904' || level_code == '0905' || level_code == '0908') {
            weekdayArr = [
                {name: "违反民主集中制原则", id: "012201"},
                {name: "不按要求请示报告有关事项", id: "012202"},
                {name: "违规组织参加老乡会校友会战友会", id: "012203"},
                {name: "妨碍党和国家方针政策实施", id: "012104"},
                {name: "侵犯党员权利", id: "012204"},
                {name: "在投票和选举中搞非组织活动", id: "012205"},
                {name: "在人事劳动工作中违规谋利", id: "012207"},
                {name: "违规发展党员", id: "012208"},
                {name: "违规办理出国证件和在境外脱离组织", id: "012209"}
            ]
        } else {
            weekdayArr = [
                {name: "违反民主集中制原则", id: "012201"},
                {name: "不按要求请示报告有关事项", id: "012202"},
                {name: "违规组织参加老乡会校友会战友会", id: "012203"},
                {name: "侵犯党员权利", id: "012104"},
                {name: "在投票和选举中搞非组织活动", id: "012205"},
                {name: "违反干部选拔任用规定", id: "012206"},
                {name: "在人事劳动工作中违规谋利", id: "012207"},
                {name: "违规发展党员", id: "012208"},
                {name: "违规办理出国证件和在境外脱离组织", id: "012209"}
            ]
        }
    } else if(v == '违反廉洁纪律行为') {
        if(level_code == '0600' || level_code == '0904' || level_code == '0905' || level_code == '0908') {
            weekdayArr = [
                {name: "权权交易和纵容特定关系人以权谋私", id: "012301"},
                {name: "违规接受礼品礼金宴请服务", id: "012302"},
                {name: "违规操办婚丧喜庆事宜", id: "012303"},
                {name: "违规从事营利活动", id: "012304"},
                {name: "违规占有使用公私财物", id: "012306"},
                {name: "违规参与公款宴请消费", id: "012307"},
                {name: "违规自定薪酬和发放津贴补贴奖金", id: "012308"},
                {name: "公款旅游", id: "012309"},
                {name: "违反公务接待管理规定", id: "012310"},
                {name: "违反公务用车管理规定", id: "012311"},
                {name: "违反会议活动管理规定", id: "012312"},
                {name: "权色钱色交易", id: "012314"},
                {name: "其他违反廉洁纪律行为", id: "012315"}
            ]
        } else {
            weekdayArr = [
                {name: "权权交易和纵容特定关系人以权谋私", id: "012301"},
                {name: "违规接受礼品礼金宴请服务", id: "012302"},
                {name: "违规操办婚丧喜庆事宜", id: "012303"},
                {name: "违规从事营利活动", id: "012304"},
                {name: "违反工作生活待遇规定", id: "012315"},
                {name: "违规占有使用公私财物", id: "012306"},
                {name: "违规参与公款宴请消费", id: "012307"},
                {name: "违规自定薪酬和发放津贴补贴奖金", id: "012308"},
                {name: "公款旅游", id: "012309"},
                {name: "违反公务接待管理规定", id: "012310"},
                {name: "违反公务用车管理规定", id: "012311"},
                {name: "违反会议活动管理规定", id: "012312"},
                {name: "违反办公用房管理规定", id: "012313"},
                {name: "权色钱色交易", id: "012314"},
                {name: "其他违反廉洁纪律行为", id: "012315"}
            ]
        }
    } else if(v == '违反群众纪律行为') {
        weekdayArr = [
            {name: "侵害群众利益", id: "012401"},
            {name: "漠视群众利益", id: "012402"},
            {name: "盲目铺摊子上项目", id: "012405"},
            {name: "侵犯群众知情权", id: "012403"},
            {name: "其他违反群众纪律行为", id: "012404"}
        ]
    } else if(v == '违反工作纪律行为') {
        if(level_code == '0600' || level_code == '0904' || level_code == '0905' || level_code == '0908') {
            weekdayArr = [
                {name: "主体责任落实不力", id: "012501"},
                {name: "泄露扩散窃取私存党的秘密", id: "012504"},
                {name: "违反考试录取工作规定", id: "012505"},
                {name: "其他违反工作纪律行为", id: "012506"}
            ]
        } else {
            weekdayArr = [
                {name: "主体责任落实不力", id: "012501"},
                {name: "违规干预市场经济活动", id: "012502"},
                {name: "违规干预执纪执法司法活动", id: "012503"},
                {name: "泄露扩散窃取私存党的秘密", id: "012504"},
                {name: "违反考试录取工作规定", id: "012505"},
                {name: "其他违反工作纪律行为", id: "012506"}
            ]
        }
    } else if(v == '违反生活纪律行为') {
        weekdayArr = [
            {name: "生活奢靡", id: "012601"},
            {name: "不正当性关系", id: "012602"},
            {name: "其他违反生活纪律行为", id: "012603"}
        ]
    } else if(v == '贪污贿赂行为') {
        weekdayArr = [
            {name: "贪污", id: "014101"},
            {name: "挪用公款", id: "014102"},
            {name: "受贿", id: "014103"},
            {name: "行贿", id: "014104"},
            {name: "巨额财产来源不明", id: "014105"},
            {name: "其他贪污贿赂行为", id: "014106"}
        ]
    } else if(v == '渎职侵权行为') {
        weekdayArr = [
            {name: "滥用职权", id: "014201"},
            {name: "玩忽职守", id: "014202"},
            {name: "徇私舞弊", id: "014203"},
            {name: "利用职权侵犯公民权利", id: "014204"},
            {name: "其他渎职侵权行为", id: "014205"}
        ]
    } else if(v == '其他职务违法和职务犯罪行为') {
        weekdayArr = [
            {name: "职务侵占", id: "014301"},
            {name: "挪用资金和特定款物", id: "014302"},
            {name: "非法同业经营和为亲友非法牟利", id: "014303"},
            {name: "国有企事业人员失职和滥用职权", id: "014304"},
            {name: "包庇犯罪分子", id: "014305"},
            {name: "其他职务违法和职务犯罪行为", id: "014306"}
        ]
    } else if(v == '其他违法犯罪行为') {
        weekdayArr = [
            {name: "其他违法犯罪行为", id: "0151"}
        ]
    }
    mobileSelect('#reportQuestionIdTrigger', '选择问题细类',weekdayArr)
})

