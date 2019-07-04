<template>
	<div>
		<div class="content">
			<!--位置信息 start-->
			<div class="bread-crumbs">
				<div class="bread-crumbs-content">
					<span class="cor-0498e4">监控管理</span>
					<span class="locationgLine">&frasl;</span>
					<span class="corBlue">服务模板监控</span>
				</div>
			</div>
			<!--位置信息 end-->
			<div class="rm-main-box">
				<div class="rl-main-aside clearfix">
					<a href="javascript:;" title="查询" class="rl-operate-btn active fr btnSearch" @click="searchByKwd('','first')">查询</a>
					<div class="frt">
						<label class="downMenuTit fl">关键字：</label>
						<div class="resource-sort-search-box frt">
							<input ref="keyword" class="inner-search-inp wdh226" type="search" placeholder="请输入模板名关键字">
						</div>
					</div>
					<div class="downMenu frt clearfix">
						<label class="downMenuTit fl">运行状态：</label>
						<div @click="statusList($event)" class="select-box result_select fl">
							<span class="defaul_option">{{chooseStatusText}}</span>
							<i class="icon4 icon-downMenu"></i>
							<ul v-if="statusListShow" @click="chooseStatus($event)" @click.stop>
								<li value="5">全部</li>
								<li value="1">异常</li>
								<li value="2">正常</li>
								<li value="4">已启用</li>
								<li value="3">未启用</li>
							</ul>
						</div>
					</div>
					<div class="flt">
						<a class="rl-operate-btn active flt" href="javascript:;" title="新增" @click="showAddPage()">新增</a>
						<a class="rl-operate-btn flt" href="javascript:;" title="删除" @click="deleteMonitor('','',false)">删除</a>
						<a class="rl-operate-btn flt" href="javascript:;" title="启用" @click="startOrStop('start')">启用</a>
						<a class="rl-operate-btn flt" href="javascript:;" title="停用" @click="startOrStop('stop')">停用</a>
					</div>
				</div>
				<div class="rm-main-content">
					<table class="mainTable fwcgTable">
						<thead>
							<tr>
								<th class="wh30"><i class="icon4 check-icon" :class="{'checked':isCheck}" @click="checkAll()"></i></th>
								<th>模板名称</th>
								<th>模板ID</th>
								<th class="center percent10">运行状态</th>
								<th class="percent12">监控频率
									<i class="icon4 icon-defalut" :class="monitorFreqClass" @click="monitorFreqSort()"></i>
								</th>
								<th class="percent17">监控类别</th>
								<th class="percent17 minW140">监测时间
									<i class="icon4 icon-defalut" :class="startDateClass" @click="startDateSort()"></i>
								</th>
								<th class="wh130"></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in tmpMonitorListArr" :id="item.templateID">
								<td class="wh30"><i class="icon4 check-icon" :class="{'checked':item.isCheck}" @click="checkOne(item.templateID,$event,index)"></i></td>
								<td class="ellipsis">
									<span>{{item.templateName}}</span>
								</td>
								<td class="ellipsis">
									<span>{{item.templateID}}</span>
								</td>
								<td class="center">
									<span v-if="item.isStart&&item.statusCode=='000000'" class="status">正常</span>
									<span v-if="item.isStart&&item.statusCode=='0'" class="status">已启用</span>
									<span v-if="item.isStart&&item.statusCode!='0'&&item.statusCode!='000000'" class="status abnormal">异常</span>
									<span v-if="!item.isStart" class="status notEnabled">未启用</span>
									<!--<span v-else class="status notEnabled">未启用</span>-->
								</td>
								<td>{{item.monitorFreq}}小时/次</td>
								<td>接口无法调用</td>
								<td>{{item.time||'--'}}</td>
								<td class="wh130">
									<div class="rm-main-icon-box">
										<a class="rm-icon-btn" href="javascript:;" title="编辑" @click="showModifyPage(item.templateID)">
											<i class="icon2 icon-edit"></i>
										</a>
										<a v-if="item.isStart" class="rm-icon-btn" href="javascript:;" title="停用" @click="startOrStop('stop',item.templateID,$event)">
											<i class="icon2 icon-disable"></i>
										</a>
										<a v-else class="rm-icon-btn" href="javascript:;" title="启用" @click="startOrStop('start',item.templateID,$event)">
											<i class="icon2 icon-enable"></i>
										</a>
										<a class="rm-icon-btn" href="javascript:;" title="删除" @click="deleteMonitor(item.templateID,item.templateName,false)">
											<i class="icon2 icon-sysDelete"></i>
										</a>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<div class="page-box clearfix">
						<div class="flt">
							<div class="page-go-box flt">
								<span class="page-txt flt">{{"共"+tmpMonitorListCount+"条记录，每页显示"}}</span>
								<span class="perPageShow flt" ref="rows" @click="showRowsList()">
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
							<div class="page-list flt">
								<el-pagination @size-change="rowsChange" @current-change="rowsChange" :current-page.sync="page" :page-size="rows" layout="prev, pager, next, jumper" :total="tmpMonitorListCount">
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
		<!--<div class="mask"></div>-->
		<!--操作失败-->
		<div class="failedBox" v-if="submitErr">
			<i class="icon4 icon-failed"></i> {{submitErrText}}
		</div>
		<!--操作成功-->
		<div class="failedBox successBox" v-if="submitOK">
			<i class="icon4 icon-success"></i> 操作成功
		</div>

		<!-- 删除提示对话框开始 start-->
		<div v-if="deleteDialogbox">
			<div class="dialog-container add-catalog-dialog">
				<div class="dialog-inner dialog-delete">
					<header class="dialog-header publicHeader">
						<div class="dialog-header-tit flt">删除</div>
						<div class="icon3 dialog-header-close frt" @click="closeDialogbox()"></div>
					</header>
					<div class="publicTipBox">
						<!--<p>您确定要删除"<span>{{templateName}}</span>"模板吗？</p>-->
						<p v-html="templateName">{{templateName}}</p>
					</div>
					<footer class="dialog-footer publicFooter">
						<ul class="btn-list">
							<li class="btn-item" @click="closeDialogbox()">取&nbsp;&nbsp;消</li>
							<li class="btn-item btn-item-acvite" @click="deleteMonitor(templateID,templateName,true)">确&nbsp;&nbsp;定</li>
						</ul>
					</footer>
				</div>
			</div>
			<div class="mask"></div>
		</div>
		<!-- 删除提示对话框结束 end-->

		<!-- 添加服务模板对话框 start -->
		<addMonitor v-bind:isShowAddPage="isShowAddPage" @listenToAddChildEvent="closeAddPage()" @listenToAddSuccess="initData()"></addMonitor>
		<!-- 添加服务模板对话框 end -->

		<!-- 修改服务模板对话框 start @listenToModifySuccess="initData()"-->
		<modifytmpMonitor v-bind:isShowModifyPage="isShowModifyPage" @listenToModifyChildEvent="closeModifyPage()" v-bind:modifyTmpMonitorID="modifyTmpMonitorID" @listenToModifySuccess="closeModifyPage()" ></modifytmpMonitor>
		<!-- 修改服务模板对话框 end -->



    <!-- 绑定邮箱对话框开始 start -->
    <MailboxBind v-bind:mailboxBindVisible = "mailboxBindVisible" @listenToMailEvent = "getMailMessage" ref = "mailboxBind"></MailboxBind>
    <!-- 绑定邮箱对话框结束 end -->
    <!--操作成功-->
    <div class="failedBox successBox" v-if="success">
      <i class="icon4 icon-success"></i>
      请绑定邮箱，以便您及时收到预警通知
    </div>
  </div>
</template>
<style>
	/*element-ui分页插件----start---*/

	.el-pagination .btn-prev,
	.el-pagination .btn-next {
		border: 1px solid #e4eaf0;
		border-radius: 2px;
		cursor: pointer;
		height: 32px;
		line-height: 32px;
		margin-left: 10px;
		padding: 0 12px 0 13px;
		transition: all 0.2s ease 0s;
	}

	.el-pagination .btn-next:before {
		content: "下一页";
	}

	.el-pagination .btn-prev:before {
		content: "上一页";
	}

	.el-pager li {
		border: 1px solid #e4eaf0;
		border-radius: 2px;
		cursor: pointer;
		float: left;
		height: 32px;
		line-height: 32px;
		margin-left: 10px;
		padding: 0 12px 0 13px;
		transition: all 0.2s ease 0s;
	}

	.page-list .el-input__inner {
		border: 1px solid #e4eaf0;
		border-radius: 2px;
		box-sizing: border-box;
		height: 34px;
		margin: 0 10px;
		text-align: center;
		width: 34px;
	}

	.page-list .el-pagination__editor.el-input .el-input__inner {
		height: 30px;
	}

	.btn-next .el-icon-arrow-right:before {
		content: ""
	}

	.btn-prev .el-icon-arrow-left:before {
		content: ""
	}

	.el-pager li.active+ li {
		border-left: 1px solid #e4eaf0;
	}

	.page-list .el-pager li {
		margin: 0 10px;
		height: 32px;
	}

	.page-list .el-pager li.active+ li {
		border-left: 1px solid #e4eaf0;
	}

	.dialog-body .rm-advanced-search-inp {
		background: #fff none repeat scroll 0 0;
		border: 1px solid #ddd;
		border-radius: 2px;
		color: #333;
		font-size: 14px;
		height: 32px;
		line-height: 32px;
		margin-left: 15px;
		padding-left: 10px;
	}
	/*element-ui分页插件---end---*/
</style>
<script type="text/ecmascript-6">
	import axios from 'axios';
	import addMonitor from '@/views/tmpMonitor/addtmpMonitor';
	import modifytmpMonitor from '@/views/tmpMonitor/modifytmpMonitor';
  import MailboxBind from '@/views/module/mailboxBind';
	import {
		mapActions,
		mapState,
		mapGetters
	} from 'vuex';
	export default {
		name: 'login',
		data() {
			return {
				tmpMonitorListArr: [], //首页初始化获取数据列表
				tmpMonitorIDArr: [], //当前页面所有数据的tmpMonitorID集合
				tmpMonitorListCount: 0, //列表数据总条数
				rows: 10, //每页显示几条
				page: 1, //当前页数
				sort: {
					isStart: -1,
					statusCode: -1,
					time: -1
				}, //数据排序
				domain: "", //domain
				userID: "", //domain
				totalPage: 0, //总页数
				statusListShow: false, //查询运行状态点击事件用的flag参数
				chooseStatusType: 5, //查询时运行状态的选择结果，0：全部，1：正常，2：异常
				chooseStatusText: "全部", //查询时运行状态栏的文本展示
				rowsListShow: false, //每页显示几条点击事件用的flag参数
				monitorFreqClass: "icon-defalut", //监控频率排序头部样式
				monitorFreq: 0, //监控频率排序
				startDateClass: "icon-defalut", //生效时间排序头部样式
				time: 0, //生效时间排序
				isShowAddPage: false,
				isShowModifyPage: false,
				modifyTmpMonitorID: "",
				submitErr: false,
				submitOK: false,
				submitErrText: "操作失败",
				isSearch: false,
				deleteDialogbox: false,
				templateName: "",
				templateID: "",
        mailboxBindVisible:false,
        success:false
			}
		},
		mounted() {
			this.initData();
			window.addEventListener('click', this.handleSelect);
		},
		computed: {
			...mapGetters(['getUserInfo']),
			getCheckedSum() {
				return this.tmpMonitorListArr.filter(item => item.isCheck).length
			},
			isCheck() {
				if(this.tmpMonitorListArr.length) {
					return this.getCheckedSum && this.getCheckedSum === this.tmpMonitorListArr.length;
				} else {
					return false
				}
			}
		},
		components: {
			addMonitor,
			modifytmpMonitor,
      MailboxBind
		},
		methods: {
			initData() { //初始化数据
				if(this.getUserInfo) {
					if(typeof this.getUserInfo == 'string') {
						this.domain = JSON.parse(this.getUserInfo).domain;
						this.userID = JSON.parse(this.getUserInfo).userID;
					} else {
						this.domain = this.getUserInfo.domain;
						this.userID = this.getUserInfo.userID;
					}
				}
				this.isSearch = false;
				axios({
					headers: {
						"Content-Type": "application/json"
					},
					method: "post",
					url: "/tmpMonitor/getTmpMonitor",
					async: true,
					data: {
						query: {
							domain: this.domain
						},
						sort: this.sort,
						page: this.page,
						rows: this.rows
					},
					contentType: 'application/json'
				}).then(res => {
					if(res.data.code == "200") {
						this.tmpMonitorListArr = res.data.dataUser.dataList;
						this.tmpMonitorListCount = res.data.dataUser.dataCount;
					} else {
						alert("数据加载失败")
					}
				}).catch(err => {
					console.log(err)
				})
			},
			statusList(e) { //查询时，运行状态选择点击事件
				e = e || event;
				e.cancelBubble = true;
				this.statusListShow = this.statusListShow ? this.statusListShow = false : this.statusListShow = true
			},
			/*点击其他触发下拉框消失*/
			handleSelect() {
				this.statusListShow = false;
			},
			chooseStatus(e) { //查询时，运行状态选择点击事件
				this.chooseStatusType = e.target.value;
				this.chooseStatusText = e.target.innerText;
				this.statusListShow = false;
			},
			showRowsList() { //每页显示几条选择点击事件
				this.rowsListShow ? this.rowsListShow = false : this.rowsListShow = true
			},
			chooseRows(e) { //每页显示几条选择点击事件
				this.page = 1;
				this.rows = Number(e.target.innerText);
				this.rowsListShow = false;
				this.rowsChange();
			},
			checkAll() { //全选
				this.tmpMonitorIDArr = [];
				if(this.isCheck) {
					/*单选按钮的样式*/
					for(let i = 0; i < this.tmpMonitorListArr.length; i++) {
						if(this.tmpMonitorListArr[i].isCheck) {
							this.tmpMonitorListArr[i].isCheck = !this.tmpMonitorListArr[i].isCheck;
						}
					}
				} else {
					this.tmpMonitorListArr.forEach((item) => {
						this.tmpMonitorIDArr.push(item.templateID)
					});
					/*单选按钮的样式*/
					for(let i = 0; i < this.tmpMonitorListArr.length; i++) {
						if(!this.tmpMonitorListArr[i].isCheck) {
							this.tmpMonitorListArr[i] = Object.assign({}, this.tmpMonitorListArr[i], {
								isCheck: 'true'
							});
							this.$set(this.tmpMonitorListArr, i, this.tmpMonitorListArr[i]);
						}
					}
				};
			},
			checkOne(tmpMonitorID, e, ind) { //单选
				var eve = e || window.e; //获取事件对象
				var objEle = eve.target || eve.srcElement; //获取document 对象的引用
				if(!this.tmpMonitorListArr[ind].isCheck) {
					this.tmpMonitorIDArr.push(tmpMonitorID);
					/*单选按钮的样式*/
					this.tmpMonitorListArr[ind] = Object.assign({}, this.tmpMonitorListArr[ind], {
						isCheck: 'true'
					});
					this.$set(this.tmpMonitorListArr, ind, this.tmpMonitorListArr[ind]);
				} else {
					for(var i = 0; i < this.tmpMonitorIDArr.length; i++) {
						if(this.tmpMonitorIDArr[i] == tmpMonitorID) {
							this.tmpMonitorIDArr.splice(i, 1);
							break;
						}
					};
					/*单选按钮的样式*/
					this.tmpMonitorListArr[ind] = Object.assign({}, this.tmpMonitorListArr[ind], {
						isCheck: ''
					});
					this.$set(this.tmpMonitorListArr, ind, this.tmpMonitorListArr[ind]);
				}
			},
			startOrStop(action, tmpMonitorID) { //批量启用、停止
				if(!tmpMonitorID && this.tmpMonitorIDArr.length == 0) {
					this.submitErrText = action == "start" ? "请选择要启用的数据" : "请选择需要停用的数据";
					this.submitErr = true;
					setTimeout(() => {
						this.submitErr = false;
					}, 1500);
					return;
				}
				axios({
					headers: {
						"Content-Type": "application/json"
					},
					method: "post",
					url: "/tmpMonitor/startOrStop",
					async: true,
					data: {
						templateID: tmpMonitorID ? [tmpMonitorID] : this.tmpMonitorIDArr,
						isStart: action == "start" ? true : false
					},
					contentType: 'application/json'
				}).then(res => {
					if(res.data.code == 200) {
						this.submitOK = true;
						setTimeout(() => {
							this.submitOK = false;
						}, 1500);
            this.isSearch ? this.searchByKwd() : this.initData()
					} else {
						this.submitErr = true;
						setTimeout(() => {
							this.submitErr = false;
						}, 1500);
					};
					//this.isCheck = false;//复选框的样式
					this.tmpMonitorIDArr = [];
				}).catch(err => {
					console.log(err)
				})
			},
			//显示删除对话框
			deleteDialog(templateID, templateName) {
				if(!templateID && !templateName) {
					this.templateName = "您确定要删除选中的监控信息吗？";
					this.deleteDialogbox = true;
				} else {
					this.templateName = "您确定要删除<span>" + templateName + "</span>源端监控信息吗？";
					this.deleteDialogbox = true;
					this.templateID = templateID;
				}
			},
			//关闭删除对话框
			closeDialogbox() {
				this.deleteDialogbox = false;
        this.isSearch ? this.searchByKwd() : this.initData()
			},
			deleteMonitor(tmpMonitorID, templateName, isDelete) { //批量启用、停止
				if(!tmpMonitorID && this.tmpMonitorIDArr.length == 0) {
					this.submitErrText = "请勾选要删除的数据";
					this.submitErr = true;
					setTimeout(() => {
						this.submitErr = false;
					}, 1500);
					return;
				}
				axios({
					headers: {
						"Content-Type": "application/json"
					},
					method: "post",
					url: "/tmpMonitor/deleteMonitor",
					async: true,
					data: {
						templateID: tmpMonitorID ? [tmpMonitorID] : this.tmpMonitorIDArr,
						isDelete: isDelete
					},
					contentType: 'application/json'
				}).then(res => {
					if(res.data.msg == "success") {
						this.deleteDialogbox = false; //关闭删除对话框
						this.submitOK = true;
						setTimeout(() => {
							this.submitOK = false;
						}, 1500);
						//this.isCheck = false//复选框的样式
						/*单选按钮的样式*/
						for(let i = 0; i < this.tmpMonitorListArr.length; i++) {
							if(this.tmpMonitorListArr[i].isCheck) {
								this.tmpMonitorListArr[i].isCheck = !this.tmpMonitorListArr[i].isCheck;
							}
						}
						this.tmpMonitorIDArr = [];
            this.isSearch ? this.searchByKwd() : this.initData()
					} else if(res.data.msg == "hasStart") {
						if(!tmpMonitorID && this.tmpMonitorIDArr.length > 1) {
							this.submitErrText = "只能删除未启用状态的监控信息，请重新选择！";
						} else {
							this.submitErrText = "该模板监控正在启用中，请先停用此监控信息再进行删除操作！";
						}
						this.deleteDialogbox = false; //关闭删除对话框
						this.submitErr = true;
						setTimeout(() => {
							this.submitErr = false;
						}, 1500);
					} else if(res.data.msg == "noStart") {
						this.deleteDialog(tmpMonitorID, templateName)
					} else {
						this.submitErrText = "操作失败";
						this.submitErr = true;
						setTimeout(() => {
							this.submitErr = false;
						}, 1500);
						this.deleteDialogbox = false; //关闭删除对话框
					};

				}).catch(err => {
					console.log(err)
				})
			},
			monitorFreqSort() { //按监控频率排序
				if(this.monitorFreq == 0) { //正序
					this.monitorFreqClass = "icon-top";
					this.monitorFreq = 1;
					this.sort = {
						monitorFreq: 1
					}
				} else if(this.monitorFreq == 1) { //倒序
					this.monitorFreqClass = "icon-bottom";
					this.monitorFreq = 0;
					this.sort = {
						monitorFreq: -1
					}
				}
				this.isSearch ? this.searchByKwd(true) : this.initData()
			},
			startDateSort() { //按生效时间排序
				if(this.time == 0) { //正序
					this.startDateClass = "icon-top";
					this.time = 1;
					this.sort = {
						time: 1
					}
				} else if(this.time == 1) { //倒序
					this.startDateClass = "icon-bottom";
					this.time = 0;
					this.sort = {
						time: -1
					}
				}
				this.isSearch ? this.searchByKwd(true) : this.initData()
			},
			searchByKwd(isSort, isFirst) {
				this.isSearch = true;
				if(!this.$refs.keyword.value.trim() && this.chooseStatusType == 0) {
					return;
				}
				if(isFirst) {
					this.page = 1;
				}
				axios({
					headers: {
						"Content-Type": "application/json"
					},
					method: "post",
					url: "/tmpMonitor/searchTmpMonitor",
					async: true,
					data: {
						domain: this.domain,
						keyword: this.$refs.keyword.value.trim(),
						status: this.chooseStatusType,
						rows: this.rows,
						sort: isSort ? this.sort : "",
						page: this.page
					},
					contentType: 'application/json'
				}).then(res => {
					if(res.data.code == 200) {
						this.tmpMonitorListArr = res.data.dataUser.dataList;
						this.tmpMonitorListCount = res.data.dataUser.dataCount;
					} else {
						alert("查询失败")
					}

				}).catch(err => {
					console.log(err)
				})
			},
			showAddPage() {
				//this.isShowAddPage = true;
        this.emailSjax()
			},
			closeAddPage() {
				this.isShowAddPage = false;
			},
			showModifyPage(tmpMonitorID) {
				this.modifyTmpMonitorID = tmpMonitorID;
				this.isShowModifyPage = true;
			},
			closeModifyPage() {
				this.isShowModifyPage = false;
        this.isSearch ? this.searchByKwd() : this.initData()

			},
			rowsChange() {
				//        this.page = 1;
				this.isSearch ? this.searchByKwd() : this.initData()
			},
      /*
        *监听绑定邮箱
        */
      getMailMessage(isfalg){
        this.mailboxBindVisible = isfalg;
      },
      /*判断用户是否绑定邮箱*/
      emailSjax(){
        let getUserInfo;
        if(this.getUserInfo){
          if(typeof this.getUserInfo == 'string'){
            getUserInfo = JSON.parse(this.getUserInfo).userName;
          }else{
            getUserInfo = this.getUserInfo.userName;
          }
        }
        axios({
          headers:{"Content-Type":"application/json"},
          method:"post",
          url:"/user/mailbox",
          async:true,
          data: {
            userName:getUserInfo
          },
          contentType: 'application/json'
        }).then(res => {
          this.admin = res.data.userName;
          if (res.data.code == "200") { //邮箱已绑定
            this.isShowAddPage = true;
            return;
          } else if (res.data.code == "202"){//邮箱未绑定
            this.success = true;
            setTimeout(() => {
              this.success = false;
              this.mailboxBindVisible = true;
            }, 1700);
            return;
          }
        }).catch(err=>{
          console.log(err)
        })
      },
		}
	}
</script>
