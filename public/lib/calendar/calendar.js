var weekend = [0,6];
var fontsize = 2;
var gNow = new Date();
var ggWinCal;
var calendarhtml = '';
var chinay = '';
var chinam = '';
var chinad = '';


Calendar.DOMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

Calendar.lDOMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function Calendar(p_item, p_WinCal, p_month, p_year, p_format) {
    if ((p_month == null) && (p_year == null))        return;
    if (p_WinCal == null)
        this.gWinCal = ggWinCal;
    else
        this.gWinCal = p_WinCal;

    if (p_month == null) {
        this.gMonth = null;
        this.gYearly = true;
    } else {
        this.gMonth = new Number(p_month);
        this.gYearly = false;
    }
    this.gYear = p_year;
    this.gFormat = p_format;

    this.gReturnItem = p_item;
}
Calendar.get_daysofmonth = Calendar_get_daysofmonth;

function Calendar_get_daysofmonth(monthNo, p_year) {

    if ((p_year % 4) == 0) {
        if ((p_year % 100) == 0 && (p_year % 400) != 0)
            return Calendar.DOMonth[monthNo];

        return Calendar.lDOMonth[monthNo];
    } else
        return Calendar.DOMonth[monthNo];
}


Calendar.prototype.show = function() {
    calendarhtml = '';
    for(var i=0;i<KYFW.calendar_showNum;i++)
    {
        this.wwrite('<div class="box-time"><div class="time-month">'+this.gYear+'年'+(parseInt(this.gMonth) + 1)+'月</div>');
        this.wwrite('<div class="time-date"><table class="time-date-table"> <tr><th>周日</th><th>周一</th><th>周二</th><th>周三</th><th>周四</th><th>周五</th><th>周六</th></tr>');
        var vCode = this.cal_data();
        this.wwrite(vCode);

        this.wwrite("</table></div></div>");
        if(this.gMonth==11)
        {
            this.gMonth = 0;
            this.gYear++;
        }
        else
        {
            this.gMonth++;
        }

    }

    var doc = document;
    $("#datepicker").html(calendarhtml);

    if(doc.getElementById('indexPage')){
        $("#indexPage").css('display','none');
    }else if(doc.getElementById('bodyCont')){
        $("#bodyCont").css('display','none');
    }


    $("#datepickerPage").animate({
        width: '100%'
    }, 'fast','',function(){
        $("#datepickerPage").css('overflow','auto');
    });

};

Calendar.prototype.wwrite = function(wtext) {

    calendarhtml = calendarhtml+wtext;

};

Calendar.prototype.printhtml = function(vCode,vDay) {

    var win = window;
    var preSaleDays = win.sessionStorage.getItem('preSaleDays');
    if(!preSaleDays){
        preSaleDays = KYFW.Presale_People_Days;
    }

    this.chinay =gNow.getFullYear();
    this.chinam =parseInt(gNow.getMonth())+1;
    this.chinad =gNow.getDate();

    var nowTime = new Date(this.gYear,this.gMonth,vDay).getTime();
    var nowTimeNew = new Date(this.gYear,this.gMonth+1,vDay).getTime();
    var gTime = new Date(this.chinay,this.chinam-1,this.chinad).getTime();

    var departTime = win.sessionStorage.getItem('departTimeflag');

    if(this.chinay==this.gYear && this.chinam==(this.gMonth+1) && this.chinad==vDay)
    {
    	var styls = '';
    	if(departTime && departTime==nowTime){
    		styls = ' style="background: #3294df;"';
    	}
//        vCode = vCode + "<TD onclick='selectDay(\""+this.gYear+"\",\""+(this.gMonth+1)+"\",\""+vDay+"\");'>";
//        vCode = vCode + "<A class='dateToday'"+styls+" id='"+(this.gMonth+1)+"-"+vDay+"_box'><span class='datenumfs' id='"+(this.gMonth+1)+"-"+vDay+"_day' style='font-size:14px; font-weight:bold;'>今天</span><span class='dateprice' id='"+(this.gMonth+1)+"-"+vDay+"'></span></A>";
        vCode = vCode + "<td onclick='selectDay(\""+this.gYear+"\",\""+(this.gMonth+1)+"\",\""+vDay+"\");' class='today' "+styls+" id='"+(this.gMonth+1)+"-"+vDay+"_day'>今天";
    }
    else
    {
        if(nowTime<gTime || (nowTime-gTime)/1000/3600/24>preSaleDays)
        {
//            vCode = vCode + "<TD><a id='"+(this.gMonth+1)+"-"+vDay+"_box' class='datenoprice'><span style='color:#999;' class='datenumfs' id='"+(this.gMonth+1)+"-"+vDay+"_day'>" + vDay + "</span><span style='color:#999;' id='"+(this.gMonth+1)+"-"+vDay+"'></span></a>";
            vCode = vCode + "<td id='"+(this.gMonth+1)+"-"+vDay+"_day' class='disabled'>" + vDay ;
        }
        else
        {

            if(departTime && departTime==nowTimeNew){
//                vCode = vCode + "<TD onclick='selectDay(\""+this.gYear+"\",\""+(this.gMonth+1)+"\",\""+vDay+"\");'>";
//                vCode = vCode + "<A style='background:#3294df;' id='"+(this.gMonth+1)+"-"+vDay+"_box'><span class='datenumfs' id='"+(this.gMonth+1)+"-"+vDay+"_day' style='color:#fff;'>" + vDay + "</span></A>";
                vCode = vCode + "<td style='background:#3294df; color:#fff;' onclick='selectDay(\""+this.gYear+"\",\""+(this.gMonth+1)+"\",\""+vDay+"\");' id='"+(this.gMonth+1)+"-"+vDay+"_day'>" + vDay + "</td>";
            }else{
//            	vCode = vCode + "<TD onclick='selectDay(\""+this.gYear+"\",\""+(this.gMonth+1)+"\",\""+vDay+"\");'>";
//                vCode = vCode + "<A id='"+(this.gMonth+1)+"-"+vDay+"_box'><span class='datenumfs' id='"+(this.gMonth+1)+"-"+vDay+"_day'>" + vDay + "</span><span class='dateprice' id='"+(this.gMonth+1)+"-"+vDay+"'></span></A>";
                vCode = vCode + "<td onclick='selectDay(\""+this.gYear+"\",\""+(this.gMonth+1)+"\",\""+vDay+"\");' id='"+(this.gMonth+1)+"-"+vDay+"_day'>" + vDay + "</td>";
            }

        }

    }

    vCode = vCode+ "</td>";
    return vCode;

};


Calendar.prototype.cal_data = function() {
    var vDate = new Date();
    vDate.setDate(1);
    vDate.setMonth(this.gMonth);
    vDate.setFullYear(this.gYear);
    var vFirstDay=vDate.getDay();
    var vDay=1;
    var vLastDay=Calendar.get_daysofmonth(this.gMonth, this.gYear);
    var vOnLastDay=0;
    var vCode = "";



    vCode = vCode + "<tr>";
    for (i=0; i<vFirstDay; i++) {
        vCode = vCode + "<td class='disabled'>&nbsp;</td>";
    }

    for (j=vFirstDay; j<7; j++) {

        vCode = this.printhtml(vCode,vDay);

        vDay=vDay + 1;
    }
    vCode = vCode + "</tr>";

    for (k=2; k<7; k++) {
        vCode = vCode + "<tr>";
        for (j=0; j<7; j++) {

            vCode = this.printhtml(vCode,vDay);

            vDay=vDay + 1;
            if (vDay > vLastDay) {
                vOnLastDay = 1;
                break;
            }
        }
        if (j == 6)
            vCode = vCode + "</tr>";
        if (vOnLastDay == 1)
            break;
    }
    return vCode;
};

function Build(p_item, p_month, p_year, p_format) {
    var p_WinCal = ggWinCal;
    gCal = new Calendar(p_item, p_WinCal, p_month, p_year, p_format);

    if (gCal.gYearly)
        gCal.showY();
    else
        gCal.show();
}
function show_calendar() {
    p_item = arguments[0];
    if (arguments[1] == null)
        p_month = new String(gNow.getMonth());
    else
        p_month = arguments[1];
    if (arguments[2] == "" || arguments[2] == null)
        p_year = new String(gNow.getFullYear().toString());
    else
        p_year = arguments[2];
    if (arguments[3] == null)
        p_format = "YYYYMMDD";
    else
        p_format = arguments[3];

    Build(p_item, p_month, p_year, p_format);

}

function selectDay(year,month,selectedDay)
{
    var win = window;
    var dateobj = new Date(year,month,selectedDay);

    var today = new Date().kxTime();

    if(parseInt(dateobj.getTime())>=today)
    {
        year = year.trim();
        month = parseInt(month.trim());
        selectedDay = selectedDay.trim();

        win.sessionStorage.setItem('departTimeflag',dateobj.getTime());

        if(month<10){
        	month = '0'+month;
	    }
	    if(selectedDay<10){
	    	selectedDay = '0'+selectedDay;
	    }
	    var str = year+'-'+month+'-'+selectedDay;
        
        //KYFW.list.searchDateChange(str);
        if( win.sessionStorage.getItem('dateSelectType')=='timetable'){
            win.sessionStorage.setItem('timetable',str);
            window.location.href = "/trainTimetable?randomKey="+randomKey+"&userID="+userID+"&citySRC="+citySRC+
                "&clientID="+clientID+"&cityID="+cityID+"&local_x="+local_x+"&local_y="+local_y + "&localFrom=" + localFrom;
            $('#JpSearchMonthWeek').html(str);
        }else if( win.sessionStorage.getItem('dateSelectType')=='yupiao'){
            win.sessionStorage.setItem('yupiao',str);
            window.location.href = "/trainYupiao?randomKey="+randomKey+"&userID="+userID+"&citySRC="+citySRC+
                "&clientID="+clientID+"&cityID="+cityID+"&local_x="+local_x+"&local_y="+local_y + "&localFrom=" + localFrom;
            $('#JpSearchMonthWeek').html(str);
        }
            // else if(win.sessionStorage.getItem('dateSelectType')=='startDate') {
        //     win.sessionStorage.setItem('departTime',str);
        //     win.history.back(-1);
        //     $('#JpSearchMonthWeek').html(str);
        // }else if(win.sessionStorage.getItem('dateSelectType')=='selectDate'){
        //         win.sessionStorage.setItem('departTime',str);
        //         var traintype =win.sessionStorage.getItem('trainType'),
        //             tickettype = win.sessionStorage.getItem('peopleStudent'),
        //             from = win.sessionStorage.getItem('departName'),
        //             fromcode = win.sessionStorage.getItem('departCode'),
        //             to = win.sessionStorage.getItem('destinationName'),
        //             tocode = win.sessionStorage.getItem('destinationCode'),
        //             date = win.sessionStorage.getItem('departTime');
        //             var searchInfo = {
        //                 tickettype: tickettype,
        //                 from: from,
        //                 fromcode: fromcode,
        //                 to: to,
        //                 tocode: tocode,
        //                 date: date,
        //                 traintype: traintype
        //             };
        //             loadingStart();
        //             $.ajax({
        //                 url : url.query,
        //                 type : "get",
        //                 beforeSend: function (request){
        //                     request.setRequestHeader("If-Modified-Since","0");
        //                     request.setRequestHeader("Cache-Control","no-cache");
        //                 },
        //                 data : {
        //                     "leftTicketDTO.train_date":date,
        //                     "leftTicketDTO.from_station" : fromcode,
        //                     "leftTicketDTO.to_station": tocode,
        //                     "purpose_codes":    (tickettype==KYFW.ticktype_student?KYFW.ticktype_student_val:KYFW.ticktype_general_val)
        //                 },
        //                 success : function(response){
        //                     loadingEnd();
        //                     if (checkLeftNewDTO(response)) {
        //                         win.localStorage.setItem('search_info',JSON.stringify(searchInfo));
        //                         win.location.href="ticketQueryResults.html";
        //                     }else{
        //                         toast('没有查询到余票信息');
        //                     }
        //                 },
        //                 error:function(){
        //                     loadingEnd();
        //                     setTimeout(function(){
        //                         toast('您的网络可能存在问题！');
        //                     },300);
        //                 }
        //             });
        //     function checkLeftNewDTO(data) {
        //         if (data && data.httpstatus===200 && data.status === true && data.data && data.data.length > 0) {
        //             var _search_result = {
        //                 status : true,
        //                 data : []
        //             };
        //             for(var i=0; i<data.data.length; i++){
        //                 _search_result.data.push(data.data[i]);
        //             }
        //             window.sessionStorage.setItem('search_result',JSON.stringify(_search_result));
        //             return true;
        //         }
        //         return false;
        //     }
        //
        // };
    }
}