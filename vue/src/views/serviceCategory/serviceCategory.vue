<template>
  <div class="content">
    <!--位置信息 start-->
    <div class="bread-crumbs">
      <div class="bread-crumbs-content">
        <span class="cor-0498e4">服务管理</span>
        <span class="locationgLine">&frasl;</span>
        <span class="corBlue">服务分类</span>
      </div>
    </div>
    <!--位置信息 end-->
    <div class="rm-main-box">
      <div class="">
        <!--搜索条件 start-->
        <div class="rl-main-aside clearfix">
          <a href="javascript:;" title="新增分类" class="rl-operate-btn active flt" @click="ifAdd(true)"><i class="icon2 icon-addUser"></i>新增分类</a>
        </div>
        <!--搜索条件 end-->
        <div class="rm-main-content">
          <div class="sortBox clearfix">
            <div class="navListTreeMenu">
              <div class="sortNavTit">分类列表</div>
              <div class="treeMenuBox">
                <el-tree
                  :data="treeList"
                  node-key="category"
                  ref="tree"
                  highlight-current
                  :props="defaultProps"
                  @node-click="handleNodeClick">
                </el-tree>
              </div>
            </div>
            <div class="sortList">
              <table class="mainTable userList">
                <thead>
                <tr>
                  <th class="percentageWh15 center">分类编码</th>
                  <th>分类名称</th>
                  <th class="percentageWh15 center">上级分类</th>
                  <th class="percentageWh15 center">分类等级</th>
                  <th class="percentageWh15 center">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in categoryList">
                  <td class="center">{{item.category}}</td>
                  <td>{{item.name}}</td>
                  <td class="center">{{item.parentName}}</td>
                  <td class="center">{{item.level}}</td>
                  <td class="center">
                    <div class="rm-main-icon-box">
                      <a class="rm-icon-btn" href="javascript:;" title="编辑" @click="ifAdd(true,index)">
                        <i class="icon2 icon-edit"></i>
                      </a>
                      <a class="rm-icon-btn" href="javascript:;" title="删除" @click="toDelete(index)">
                        <i class="icon2 icon-sysDelete"></i>
                      </a>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="page-box clearfix">
            <div class="flt">
              <div class="page-go-box flt">
                <span class="page-txt flt">{{"共"+categoryCount+"条记录，每页显示"}}</span>
	                                <span class="perPageShow flt" @click="showRowsList()" @click.stop>
	                                	{{rows}}
	                                	<i class="icon4 icon-downMenu"></i>
	                                	<ul v-if="rowsListShow" @click="chooseRows($event)" @click.stop>
				                            <li value="1">10</li>
				                            <li value="2">15</li>
				                            <li value="3">20</li>
				                        </ul>
	                                </span>
                <span class="page-txt flt">条</span>
              </div>
            </div>
            <div class="page-main frt">
              <el-pagination
                @size-change="init"
                @current-change="init"
                :current-page.sync="page"
                :page-size="rows"
                layout="prev, pager, next, jumper"
                :total="categoryCount">
              </el-pagination>
              <div class="page-go-box flt">
                <a class="page-btn" href="javascript:;">确定</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="addShow" class="dialog-container add-catalog-dialog">
      <div class="mask" style="z-index:-1"></div>
      <div class="dialog-inner" :class='{"dialog-ht350":isEdit==true,"dialog-ht290":isEdit==false}'>
        <header class="dialog-header">
          <div v-if="isEdit" class="dialog-header-tit flt">编辑分类</div>
          <div v-else class="dialog-header-tit flt">新增分类</div>
          <div class="icon3 dialog-header-close frt" @click="ifAdd()"></div>
        </header>
        <div class="dialog-body">
          <div class="sy-publish-dialog-content">
            <dl v-if="isEdit" class="rm-advanced-search-dl clearfix">
              <dt class="rm-advanced-search-dt">分类编码：</dt>
              <dd class="rm-advanced-search-dd">
                <span class="userName">{{editItem.category}}</span>
              </dd>
            </dl>
            <dl v-if="isEdit" class="rm-advanced-search-dl clearfix">
              <dt class="rm-advanced-search-dt">上级分类：</dt>
              <dd class="rm-advanced-search-dd">
                <span class="userName">{{editItem.parentName}}</span>
              </dd>
            </dl>
            <dl v-else class="rm-advanced-search-dl clearfix">
              <dt class="rm-advanced-search-dt">上级分类：</dt>
              <dd class="rm-advanced-search-dd">
                <div class="dialog-downMenu" @click="level1Show" @click.stop>
                  <span class="defaul_option" id="addParent" :category="treeSelectItem.category">{{treeSelectItem.name}}</span>
                  <i class="icon4 icon-downMenu"></i>
                  <div v-if="level1ListShow" class="downMenuShow" style="max-height: 230px;overflow-y: auto;">
                    <ul @click="level1Choose" @click.stop>
                      <li category="0">根目录</li>
                      <li v-for="item in treeList" :category="item.category">{{item.name}}</li>
                    </ul>
                  </div>
                </div>
                <div class="error-tips-box" style="display: none;">&lowast;&nbsp;请输入密码</div>
              </dd>
            </dl>
            <dl class="rm-advanced-search-dl clearfix">
              <dt class="rm-advanced-search-dt">分类名称：</dt>
              <dd class="rm-advanced-search-dd">
                <input v-model="categoryName" class="rm-advanced-search-inp" type="text" placeholder="请输入分类名称" @blur="addBlur">
                <div v-if="nameErrTip" class="error-tips-box">{{'&lowast;&nbsp;'+nameErr}}</div>
              </dd>
            </dl>
          </div>
        </div>
        <footer class="dialog-footer">
          <ul class="btn-list">
            <li class="btn-item btn-item-acvite" @click="add()">保&nbsp;&nbsp;存</li>
            <li class="btn-item" @click="ifAdd()">取&nbsp;&nbsp;消</li>
          </ul>
        </footer>
      </div>
    </div>
    <div id="loading" class="loading floatLayer" style="display: none;">
      <div><img src="../../assets/img/loading.gif" width="45" height="43"></div>
      <div class="loadWord">保存中，请稍候...</div>
    </div>
    <!--操作成功---提示-->
    <div id="success" class="failedBox successBox" style="display: none;">
      <i class="icon3 icon-success"></i>操作成功！
    </div>
    <!--操作失败---提示-->
    <div id="fail" class="failedBox failBox" style="display: none;">
      <i class="icon3 icon-failure"></i>{{failTip}}
    </div>
    <!---删除提示 弹框-->
    <div v-if="deleteTip" class="dialog-container add-catalog-dialog">
      <div class="mask" style="z-index:-1"></div>
      <div class="dialog-inner">
        <header class="dialog-header">
          <div class="dialog-header-tit flt">提示</div>
          <div class="icon3 dialog-header-close frt" @click="deleteCancel"></div>
        </header>
        <div class="dialog-body">
          <div class="dialog-wordTips">您确定要删除“<span>{{deleteName}}</span>”分类吗？</div>
        </div>
        <footer class="dialog-footer">
          <ul class="btn-list">
            <li class="btn-item btn-item-acvite" @click="deleteCategory">确&nbsp;&nbsp;定</li>
            <li class="btn-item" @click="deleteCancel">取&nbsp;&nbsp;消</li>
          </ul>
        </footer>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import axios from "axios"
  import {mapGetters} from 'vuex';
export default{
  data(){
    return{
      page: 1,
      rows: 10,
      categoryCount: 0,
      categoryList: [],
      domain: "",
      treeList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      rowsListShow: false,
      treeSelectItem: {category: 0, name: "根目录"},
      addShow: false,
      level1ListShow: false,
      categoryName: "",
      nameErr: '',
      nameErrTip: false,
      isEdit: false,
      editItem: {},
      failTip: "操作失败！",
      deleteName: "",
      deleteTip: false,
      deleteItem: {}
    }
  },
  computed: {
    ...mapGetters(['getUserInfo']),
  },
  mounted(){
    if (this.getUserInfo) {
      if (typeof this.getUserInfo == 'string') {
        this.domain = JSON.parse(this.getUserInfo).domain;
      } else {
        this.domain = this.getUserInfo.domain;
      }
    }
    this.init();
    this.getAll();
    window.addEventListener('click', this.handleSelectCon);
  },
  methods: {
    init(){
      axios({
        headers: {"Content-Type": "application/json"},
        method: "post",
        url: "/serviceCategory/getCategoryList",
        async: true,
        data: {
          page: this.page,
          rows: this.rows
        },
        contentType: 'application/json'
      }).then(res => {
        this.categoryList = res.data.results.categoryList;
        this.categoryCount = res.data.results.count;
      }).catch(err=> {
        console.log(err)
      })
    },
    getAll(){
      this.treeList = [];
      axios({
        headers: {"Content-Type": "application/json"},
        method: "post",
        url: "/serviceCategory/getCategoryList",
        async: true,
        data: {
          all: true
        },
        contentType: 'application/json'
      }).then(res => {
        const categoryList = res.data.results.categoryList;
        let level1 = [], level2 = [];
        for(let i = 0; i < categoryList.length; i++){
          if(categoryList[i].level == 1){
            level1.push(categoryList[i])
          }else{
            level2.push(categoryList[i])
          }
        }
        for(let i = 0; i < level1.length; i++){
          let children = [];
          for(let j = 0; j < level2.length; j++){
            if(level2[j].parent == level1[i].category){
              children.push(level2[j])
            }
          }
          level1[i].children = children;
          this.treeList.push(level1[i])
        }
      }).catch(err=> {
        console.log(err)
      })
    },
    ifAdd(show, index){
      if(show){
        this.addShow = true;
        if(index > -1){
          this.isEdit = true;
          this.editItem = this.categoryList[index];
          this.categoryName =  this.editItem.name
        }else{
          this.isEdit = false;
        }
      }else{
        this.addShow = false;
      }

    },
    showRowsList(){//每页显示几条选择点击事件
      this.rowsListShow ? this.rowsListShow = false : this.rowsListShow = true
    },
    chooseRows(e){//每页显示几条选择点击事件
      this.page = 1;
      this.rows = Number(e.target.innerText);
      this.rowsListShow = false;
      this.init();
    },
    handleSelectCon(){
      this.rowsListShow = false;
      this.level1ListShow = false;
    },
    handleNodeClick(data){
      this.treeSelectItem = {
        category: data.level == 1 ? data.category : data.parent,
        name: data.level == 1 ? data.name : data.parentName
      }
    },
    level1Show(){
      this.level1ListShow = true;
    },
    level1Choose(e){
      document.getElementById("addParent").innerHTML = e.target.innerText;
      document.getElementById("addParent").setAttribute("category", e.target.getAttribute("category"));
      this.level1ListShow = false;
    },
    addBlur(){
      if(!this.categoryName){
        this.nameErr = "请输入分类名称";
        this.nameErrTip = true;
        return;
      }
      axios({
        headers: {"Content-Type": "application/json"},
        method: "post",
        url: "/serviceCategory/checkCategoryName",
        async: true,
        data: {
          categoryName: this.categoryName
        },
        contentType: 'application/json'
      }).then(res => {
        if(res.data.code == 200){
          this.nameErrTip = false;
        }else{
          if(this.isEdit && this.categoryName ==  this.editItem.name){
            this.nameErrTip = false;
          }else{
            this.nameErr = res.data.error;
            this.nameErrTip = true;
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    add(){
      if(!this.categoryName){
        this.nameErr = "请输入分类名称";
        this.nameErrTip = true;
        return;
      }
      if(this.nameErrTip == true){
        return;
      }
      document.getElementById("loading").style.display = "block";
      if(this.isEdit){
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/serviceCategory/editCategory",
          async: true,
          data: {
            category: this.editItem.category,
            modifyFields: {name: this.categoryName}
          },
        }).then(res => {
          document.getElementById("loading").style.display = "none";
          if(res.data.code == 200){
            this.editItem = {};
            this.categoryName = '';
            this.ifAdd();
            this.success();
            this.init();
            this.getAll();
          }else{
            this.fail();
          }
        }).catch(err => {
          console.log(err)
        })
      }else{
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/serviceCategory/addCategory",
          async: true,
          data: {
            name: this.categoryName,
            parent: document.getElementById("addParent").getAttribute("category"),
            parentName: document.getElementById("addParent").innerHTML,
            level: document.getElementById("addParent").getAttribute("category") == "0" ? 1:2
          },
        }).then(res => {
          document.getElementById("loading").style.display = "none";
          if(res.data.code == 200){
            this.treeSelectItem = {category: 0, name: "根目录"};
            this.categoryName = '';
            this.ifAdd();
            this.success();
            this.init();
            this.getAll();
          }else{
            this.fail();
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    success(){
      document.getElementById("success").style.display = "block";
      setTimeout(() => {
        document.getElementById("success").style.display = "none";
      }, 1500)
    },
    fail(tip){
      this.failTip = tip ? tip : "操作失败！"
      document.getElementById("fail").style.display = "block";
      setTimeout(() => {
        document.getElementById("fail").style.display = "none";
      }, 1500)
    },
    toDelete(index){
      this.deleteItem = this.categoryList[index];
      axios({
        headers: {"Content-Type": "application/json"},
        method: "post",
        url: "/serviceCategory/checkCategoryUsed",
        async: true,
        data: {category: this.deleteItem.category}
      }).then(res => {
        if(res.data.code == 200){
          this.deleteName =  this.deleteItem.name;
          this.deleteTip = true;
        }else{
          this.fail(res.data.error)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    deleteCancel(){
      this.deleteTip = false;
    },
    deleteCategory(){
      axios({
        headers: {"Content-Type": "application/json"},
        method: "post",
        url: "/serviceCategory/deleteCategory",
        async: true,
        data: {category: this.deleteItem.category}
      }).then(res => {
        if(res.data.code == 200){
          this.deleteTip = false;
          this.success();
          this.init();
          this.getAll();
        }else{
          this.fail()
        }
      }).catch(err => {
        console.log(err)
      })
    },
  }
}
</script>
<style>
  /*element-ui分页插件----start---*/
 .el-pagination{float: left;}
 .el-tree-node__content>.el-tree-node__expand-icon{padding: 0 2px;}
 .el-tree-node__label{font-size: 13px;color: #353f4c;}
 .el-tree-node__children .el-tree-node .el-tree-node__content{padding-left: 14px !important;color: #657384;}
 .el-tree-node__children .el-tree-node .el-tree-node__content .el-tree-node__label{color: #657384;}
  .el-pagination .btn-prev, .el-pagination .btn-next {
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
  .el-pager li.active + li {
    border-left: 1px solid #e4eaf0;
  }
  .page-list .el-pager li {
    margin: 0 10px;
    height: 32px;
  }

  .page-list .el-pager li.active + li {
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
  .addressBox{
    max-width: 180px;
  }
  .webAddress {
    width: 100%;
  }
  /*element-ui分页插件---end---*/
</style>
