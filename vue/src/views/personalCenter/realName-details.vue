<template>
  <div class="content">
    <!--
      confirmStatus 状态
      认证状态 ："2"未通过 "1"待审核 "3"已通过 "0" 未认证
      @1 认证状态为 1代审核和3已通过 不可编辑
      @2 认证状态为 2未通过和0未认证 可以编辑
    -->
    <div v-for="(item,index) in userInforList" :key="index">
      <!--位置信息 start-->
      <div class="serviceMainCon">
        <div class="welcomeTitle clearfix">
          <span>当前位置：</span>
          <span>个人中心</span>
          <span>&gt;</span>
          <span>实名认证</span>
        </div>
      </div>
      <!--位置信息 end-->
      <div class="rm-main-box">
        <!--内容信息 start-->
        <div class="deleteCon">
          <div class="deleteListCon">
            <div class="publicTitle"><i class="lineBlue"></i>基本信息</div>
            <div class="publicList">
              <label>联系人姓名：</label>
              <span class="listDetails"
                    v-if="item.confirmStatus == '3'|| item.confirmStatus == '1'">{{item.name}}</span>
              <input type="text" placeholder="请输入联系人姓名" v-else v-model="realName" @blur="handleFocus()"/>
              <div class="error-tips-box other tipsError" v-if="realNameTip">{{realNameCon}}</div>
            </div>
            <div class="publicList">
              <label>性别：</label>
              <span class="listDetails"
                    v-if="item.confirmStatus == '3' || item.confirmStatus == '1'">{{item.sex == "1" ? "男" : "女"}}</span>
              <span v-else class="radioSex fl">
                  <span class="sexBox"><input type="radio" value="2" name="realNames" v-model="sexRadio"><i
                    class="icon-verPic icon-sex"></i>女</span>
                  <span class="sexBox"><input type="radio" value="1" name="realNames" v-model="sexRadio"><i
                    class="icon-verPic icon-sex"></i>男</span>
              </span>
            </div>
            <div class="publicList">
              <label>电子邮箱：</label>
              <span class="listDetails"
                    v-if="item.confirmStatus == '3' || item.confirmStatus == '1'">{{item.mailbox}}</span>
              <input type="text" placeholder="请输入电子邮箱" v-else v-model="email" @blur="handleFocusEmail()"/>
              <div class="error-tips-box other tipsError" v-if="emailTip">{{emailCon}}</div>
            </div>
            <div class="publicList">
              <label>身份证号码：</label>
              <span class="listDetails"
                    v-if="item.confirmStatus == '3' || item.confirmStatus == '1'">{{item.idCard}}</span>
              <input type="text" placeholder="请填写有效身份证号码" v-else v-model="IdCard" @blur="handleIsJustCard()"/>
              <div class="error-tips-box other tipsError" v-if="cardTip">{{cardCon}}</div>
            </div>
            <div class="publicList clearfix">
              <label class="fl">身份证图片：</label>
              <span class="logoWarp fl clearfix">
            					<div class="upload-ID fl">
	            					<span class="uploadLogo" v-if="item.confirmStatus == '3' || item.confirmStatus == '1'">
                          <div class="IDSuccess"><img :src="item.idCardJust" class="IDPic"></div>
	            					</span>
                           <el-upload
                             v-else
                             class="avatar-uploader"
                             :action="JustpictureUrl"
                             :show-file-list="false"
                             :on-success="handleAvatarSuccess"
                             :before-upload="beforeAvatarUpload">
                              <img v-if="JustPicture" :src="JustPicture" class="avatar">
                             <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                              <span class="uploadLogo">
                                 <div class="IDSuccess" v-if="JustPicture" style="width: 188px;">
                                  <div class="maskLayer-ID" style="padding-top: 48px;">
                                    <a href="javascript:;">
                                      <i class="icon-verPic icon-picUpload"></i>图片上传
                                    </a>
                                  </div>
                                </div>
                                 <a href="javascript:;" class="upFileBox" v-else>
                                    <p><img src="../../assets/img/newPic/uploadFile.png"></p>
                                    <p>上传身份证正面照</p>
                                  </a>
                              </span>
                        </el-upload>
                        <h1>身份证正面</h1>
            					</div>
            					<div class="upload-ID fl">
	            					<span class="uploadLogo" v-if="item.confirmStatus == '3' || item.confirmStatus == '1'">
                          <div class="IDSuccess"><img :src="item.idCardBack" class="IDPic"></div>
	            					</span>
                        <el-upload
                          v-else
                          class="avatar-uploader"
                          :action="JustpictureUrl"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccessBack"
                          :before-upload="beforeAvatarUploadBack">
                              <img v-if="backPicture" :src="backPicture" class="avatar">
                          <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->

                                <span class="uploadLogo">
                                 <div class="IDSuccess" v-if="backPicture" style="width: 188px;">
                                  <div class="maskLayer-ID" style="padding-top: 48px;">
                                    <a href="javascript:;">
                                      <i class="icon-verPic icon-picUpload"></i>图片上传
                                    </a>
                                  </div>
                                </div>
                                 <a href="javascript:;" class="upFileBox" v-else>
                                    <p><img src="../../assets/img/newPic/uploadFile.png"></p>
                                    <p>上传身份证反面</p>
                                  </a>
                              </span>
                        </el-upload>
                        <h1>身份证反面</h1>
	            				</div>
            				</span>
            </div>
          </div>
          <!----------------------------------审核状态  通过的和代审核的   start----------------------------------------------------->
          <div class="deleteListCon" v-if="item.confirmStatus == '3' || item.confirmStatus == '1'">
            <div class="publicTitle"><i class="lineBlue"></i>企业信息</div>
            <div class="publicList clearfix">
              <label class="fl">机构类型：</label>
              <span class="fl">
            					<div class="tabLi tabLi-realName clearfix">
            						<!--<ul>
            							<li :class="{active: item.mechanismType == '1'}">政府</li>
            							<li :class="{active: item.mechanismType == '2'}">事业单位</li>
            							<li :class="{active: item.mechanismType == '3'}">事业单位媒体</li>
            							<li :class="{active: item.mechanismType == '4'}">社会团体</li>
            							<li :class="{active: item.mechanismType == '5'}">企业法人</li>
            							<li :class="{active: item.mechanismType == '6'}">企业媒体</li>
            						</ul>-->
                        <span class="listDetails" v-if="item.mechanismType == '1'">政府</span>
                        <span class="listDetails" v-if="item.mechanismType == '2'">事业单位</span>
                        <span class="listDetails" v-if="item.mechanismType == '3'">事业单位媒体</span>
                        <span class="listDetails" v-if="item.mechanismType == '4'">社会团体</span>
                        <span class="listDetails" v-if="item.mechanismType == '5'">企业法人</span>
                        <span class="listDetails" v-if="item.mechanismType == '6'">企业媒体</span>
            					</div>
            					<div class="tab-con tab-con-other">
            						<!--政府 start-->
            						<div class="orgTab-con" style="display: block">
	            						<div class="publicList">
				            				<label>单位名称：</label>
											      <span class="listDetails">{{item.companyName}}</span>
				            			</div>
				            			<div class="publicList">
				            				<label>单位地址：</label>
				            				<span class="listDetails">{{item.companyUrl}}</span>
				            			</div>
                          <div class="publicList" v-if="item.mechanismType == '1' || item.mechanismType == '4'">
				            				<label>组织机构代码证：</label>
				            				<span class="licenseBox">
				            					<img :src="item.organization">
				            				</span>
				            			</div>

                          <div class="publicList clearfix"
                               v-if="item.mechanismType == '3' || item.mechanismType == '6'">
				            				<label class="fl">媒体类型：</label>
				            				<span v-if="item.mediaType == '1'" class="listDetails">电视广播</span>
                            <span v-if="item.mediaType == '2'" class="listDetails">报刊</span>
                            <span v-if="item.mediaType == '3'" class="listDetails">杂志</span>
                            <span v-if="item.mediaType == '4'" class="listDetails">网络媒体</span>
				            			</div>

                          <div class="publicList" v-if="item.mechanismType == '2'|| item.mechanismType == '3'">
				            				<label>事业单位法人证书：</label>
				            				<span class="licenseBox">
				            					<img :src="item.legalLicense">
				            				</span>
				            			</div>

                          <div class="publicList" v-if="item.mechanismType == '3'">
				            				<label>媒体许可证：</label>
				            				<span class="licenseBox">
				            					<img :src="item.mediaLicense">
				            				</span>
				            			</div>

                          <!--社会团体 start-->
                          <div class="publicList" v-if="item.mechanismType == '4'">
				            				<label>社会团体登记证书：</label>
                            <span class="licenseBox">
				            					<img :src="item.sociologyGroup">
				            				</span>
				            			</div>

                          <div class="publicList" v-if="item.mechanismType == '5' || item.mechanismType == '6'">
				            				<label>工商营业执照：</label>
				            				  <span class="licenseBox">
				            					<img :src="item.businessLicense">
				            				</span>
				            			</div>

                          <div class="publicList" v-if="item.mechanismType == '6'">
				            				<label>媒体许可证：</label>
				            				<span class="licenseBox">
				            					<img :src="item.mediaLicense">
				            				</span>
				            			</div>

				            			<div class="publicList">
				            				<label>申请函：</label>
				            				<span class="licenseBox" v-if="item.publicLetter">
				            					<img :src="item.publicLetter">
				            				</span>
                            <span class="licenseBox listDetails" v-else>
				            					未上传公函
				            				</span>
				            			</div>
			            			</div>
                        <!--政府 end-->
            					</div>
            				</span>
            </div>
          </div>
          <!----------------------------------审核状态  通过的和代审核的   end----------------------------------------------------->
          <!----------------------------------审核状态  未通过的 start----------------------------------------------------->
          <div class="deleteListCon" v-else="">
            <div class="publicTitle"><i class="lineBlue"></i>企业信息</div>
            <div class="publicList clearfix upLoadOther">
              <label class="fl">机构类型：</label>
              <span class="fl" style="width: auto">
            					<div class="tabLi tabLi-realName clearfix">
            						<ul id="organizat">
            							<li @click="organizatType('0',$event)" :class="{active: item.mechanismType == '1'}">政府</li>
            							<li @click="organizatType('1',$event)" :class="{active: item.mechanismType == '2'}">事业单位</li>
            							<li @click="organizatType('2',$event)"
                              :class="{active: item.mechanismType == '3'}">事业单位媒体</li>
            							<li @click="organizatType('3',$event)" :class="{active: item.mechanismType == '4'}">社会团体</li>
            							<li @click="organizatType('4',$event)" :class="{active: item.mechanismType == '5'}">企业法人</li>
            							<li @click="organizatType('5',$event)" :class="{active: item.mechanismType == '6'}">企业媒体</li>
            						</ul>
            					</div>
            					<div class="tab-con tab-con-other">
            						<!--政府 start-->
            						<div class="orgTab-con orgType" :class="{'orgTypeHidden':item.mechanismType == '1'}">
	            						<div class="publicList">
				            				<label>单位名称：</label>
				            				<input type="text" placeholder="请输入单位名称" v-model="unitName" @blur="unitNameFun()"
                                   maxlength="35"/>
				            				<div class="error-tips-box other tipsError" style="top: 39px">{{unitNameCon}}</div>
				            			</div>
				            			<div class="publicList">
				            				<label>单位地址：</label>
				            				<input type="text" placeholder="请输入单位地址" v-model="unitAddress" @blur="unitAddressFun()"
                                   maxlength="50"/>
				            				<div class="error-tips-box other tipsError" style="top: 39px">{{unitAddressCon}}</div>
				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">组织机构代码证：</label>
                            <div class="fl wh614">
                              <div class="upload-ID">
				            					<!--<a href="javascript:;" class="selectFile">上传文件</a>-->
                              <el-upload
                                class="upload-demo"
                                :action="JustpictureUrl"
                                :show-file-list="false"
                                :on-success="handleChange"
                                :before-upload="handleChangeSuccess"
                              >
                                <img v-if="organizationUrl" :src="organizationUrl" class="avatar">
                                <span class="uploadLogo">
                                     <div class="IDSuccess" v-if="organizationUrl" style="width: 188px;">
                                        <div class="maskLayer-ID" style="padding-top: 48px;">
                                          <a href="javascript:;">
                                            <i class="icon-verPic icon-picUpload"></i>图片上传
                                          </a>
                                        </div>
                                      </div>
                                      <a href="javascript:;" class="upFileBox" v-else>
                                        <p><img src="../../assets/img/newPic/uploadFile.png"></p>
                                        <p>点击上传</p>
                                      </a>
                                </span>
                              </el-upload>
				            					<div class="tipsWord">格式要求：原件照片、扫描件或者加盖公章的复印件，支持.jpg .jpeg .png格式照片，大小不超过5M。</div>
                              <div class="error-tips-box errTipUploadFile" v-if="orginShow">请上传组织机构代码证</div>
                               </div>
                            </div>
				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">申请函：</label>
                            <div class="fl wh614">
                              <div class="upload-ID fl" style="position: relative;">
                                <span class="uploadLogo">
                                  <el-upload
                                    class="upload-demo"
                                    :action="JustpictureUrl"
                                    :show-file-list="false"
                                    :on-success="handleChange2"
                                    :before-upload="handleChangeSuccess2Upload"
                                  >
                                    <img v-if="publicLetterUrl" :src="publicLetterUrl" class="avatar">
                              <div class="IDSuccess" v-if="publicLetterUrl">
                                  <div class="maskLayer-ID" style="padding-top: 48px;">
                                    <a href="javascript:;">
                                      <i class="icon-verPic icon-picUpload"></i>图片上传
                                    </a>
                                  </div>
                                </div>
                                <a href="javascript:;" class="upFileBox" v-else>
						            						<p><img src="../../assets/img/newPic/uploadFile.png"></p>
						            						<p>点击上传</p>
                                </a>
                              </el-upload>
					            					</span>
                              </div>
                              <a href="javascript:;" class="btn-sampleDown fl" @click="download()">范例下载</a>
				            					<div class="tipsWord">上传加盖公章的原件照片或扫描件，支持.jpg .jpeg .bmp .png格式照片，大小不超过5M</div>
                              <div class="error-tips-box errTipUploadFile" v-if="applyShow">请上传大小不超过5M的照片</div>
				            				</div>

				            			</div>
			            			</div>
                        <!--政府 end-->
                        <!--事业单位 start-->
            						<div class="orgTab-con orgType" :class="{'orgTypeHidden':item.mechanismType == '2'}">
	            						<div class="publicList">
				            				<label>单位名称：</label>
				            				<input type="text" placeholder="请输入单位名称" v-model="unitName" @blur="unitNameFun()"
                                   maxlength="35"/>
				            				<div class="error-tips-box other tipsError" style="top: 39px">{{unitNameCon}}</div>
				            			</div>
				            			<div class="publicList">
				            				<label>单位地址：</label>
				            				<input type="text" placeholder="请输入单位地址" v-model="unitAddress" @blur="unitAddressFun()"
                                   maxlength="50"/>
				            				<div class="error-tips-box other tipsError" style="top: 39px">{{unitAddressCon}}</div>
				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">事业单位法人证书：</label>
                            <div class="fl wh614">
                               <div class="upload-ID" style="position: relative;width: 188px">
                                  <el-upload
                                    class="upload-demo"
                                    :action="JustpictureUrl"
                                    :show-file-list="false"
                                    :on-success="handleChangeSuccessCause"
                                    :before-upload="handleChangeSuccessCauseUpload"
                                  >
                                    <img v-if="legalLicenseUrl" :src="legalLicenseUrl" class="avatar">
                                    <span class="uploadLogo">
                                      <div class="IDSuccess" v-if="legalLicenseUrl" style="width: 188px;">
                                        <div class="maskLayer-ID" style="padding-top: 48px;">
                                          <a href="javascript:;">
                                            <i class="icon-verPic icon-picUpload"></i>图片上传
                                          </a>
                                        </div>
                                      </div>
                                      <a href="javascript:;" class="upFileBox" v-else>
                                        <p><img src="../../assets/img/newPic/uploadFile.png"></p>
                                        <p>点击上传</p>
                                      </a>
                                    </span>
                                 </el-upload>
                              </div>
				            					<div class="tipsWord">格式要求：原件照片、扫描件或者加盖公章的复印件，支持.jpg .jpeg .png格式照片，大小不超过5M。</div>
                              <div class="error-tips-box errTipUploadFile" v-if="causeShow">请上传事业单位法人证书</div>
				            				</div>

				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">申请函：</label>
                            <div class="fl wh614">
                              <div class="upload-ID fl" style="position: relative;">
                                <span class="uploadLogo">
                                  <el-upload
                                    class="upload-demo"
                                    :action="JustpictureUrl"
                                    :show-file-list="false"
                                    :on-success="handleChange4"
                                    :before-upload="handleChangeSuccess2Upload"
                                  >
                                    <img v-if="publicLetterUrl4" :src="publicLetterUrl4" class="avatar">
                              <div class="IDSuccess" v-if="publicLetterUrl4">
                                  <div class="maskLayer-ID" style="padding-top: 48px;">
                                    <a href="javascript:;">
                                      <i class="icon-verPic icon-picUpload"></i>图片上传
                                    </a>
                                  </div>
                                </div>
                                <a href="javascript:;" class="upFileBox" v-else>
						            						<p><img src="../../assets/img/newPic/uploadFile.png"></p>
						            						<p>点击上传</p>
                                </a>
                              </el-upload>
					            					</span>
                              </div>
                              <a href="javascript:;" class="btn-sampleDown fl" @click="download()">范例下载</a>
				            					<div class="tipsWord">上传加盖公章的原件照片或扫描件，支持.jpg .jpeg .bmp .png格式照片，大小不超过5M</div>
                              <div class="error-tips-box errTipUploadFile" v-if="applyShow4">请上传大小不超过5M的照片</div>
				            				</div>

				            			</div>
			            			</div>
                        <!--事业单位 end-->
                        <!--事业单位媒体 start-->
            						<div class="orgTab-con orgType" :class="{'orgTypeHidden':item.mechanismType == '3'}">
	            						<div class="publicList">
				            				<label>单位名称：</label>
				            				<input type="text" placeholder="请输入单位名称" v-model="unitName" @blur="unitNameFun()"
                                   maxlength="35"/>
				            				<div class="error-tips-box other tipsError" style="top: 39px">{{unitNameCon}}</div>
				            			</div>
				            			<div class="publicList">
				            				<label>单位地址：</label>
				            				<input type="text" placeholder="请输入单位地址" v-model="unitAddress" @blur="unitAddressFun()"
                                   maxlength="50"/>
				            				<div class="error-tips-box other tipsError" style="top: 39px">{{unitAddressCon}}</div>
				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">媒体类型：</label>
				            				<div class="downTxtDiv fl">
					            				<div class="dialog-downMenu flt" @click="statusList($event)" @click.stop>
									                <span class="defaul_option">{{chooseStatusText}}</span>
									                <i class="icon icon-downMenu" style="position: absolute;top: 0;right: 5px;"></i>
									                <div class="downMenuShow" @click="chooseStatus($event)" @click.stop
                                       v-if="statusListShow">
										                <ul>
										                    <li value="1">电视广播</li>
										                    <li value="2">报刊</li>
										                    <li value="3">杂志</li>
										                    <li value="4">网络媒体</li>
										                </ul>
									                </div>
									            </div>
									            <div class="error-tips-box" v-if="chooseStatu" style="left:0;">请选择媒体类型</div>
								            </div>
				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">事业单位法人证书：</label>
                            <div class="fl wh614">
                               <div class="upload-ID" style="position: relative;width: 188px">
                                  <el-upload
                                    class="upload-demo"
                                    :action="JustpictureUrl"
                                    :show-file-list="false"
                                    :on-success="handleChangeSuccessCause2"
                                    :before-upload="handleChangeSuccessCauseUpload"
                                  >
                                    <img v-if="legalLicenseUrl2" :src="legalLicenseUrl2" class="avatar">
                                    <span class="uploadLogo">
                                      <div class="IDSuccess" v-if="legalLicenseUrl2" style="width: 188px;">
                                        <div class="maskLayer-ID" style="padding-top: 48px;">
                                          <a href="javascript:;">
                                            <i class="icon-verPic icon-picUpload"></i>图片上传
                                          </a>
                                        </div>
                                      </div>
                                      <a href="javascript:;" class="upFileBox" v-else>
                                        <p><img src="../../assets/img/newPic/uploadFile.png"></p>
                                        <p>点击上传</p>
                                      </a>
                                    </span>
                                 </el-upload>
                              </div>
				            					<div class="tipsWord">格式要求：原件照片、扫描件或者加盖公章的复印件，支持.jpg .jpeg .png格式照片，大小不超过5M。</div>
                              <div class="error-tips-box errTipUploadFile" v-if="causeShow2">请上传事业单位法人证书</div>
				            				</div>
				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">媒体许可证：</label>
                            <div class="fl wh614">
                              <div class="upload-ID fl" style="position: relative;">
                                <span class="uploadLogo">
                                 <el-upload
                                   class="upload-demo"
                                   :action="JustpictureUrl"
                                   :show-file-list="false"
                                   :on-success="handleChangeSuccessMedia2"
                                   :before-upload="handleChangeSuccessMediaUpload"
                                 >
                                   <img v-if="mediaLicenseUrl2" :src="mediaLicenseUrl2" class="avatar">

                                      <div class="IDSuccess" v-if="mediaLicenseUrl2">
                                        <div class="maskLayer-ID" style="padding-top: 48px;">
                                          <a href="javascript:;">
                                            <i class="icon-verPic icon-picUpload"></i>图片上传
                                          </a>
                                        </div>
                                      </div>
                                      <a href="javascript:;" class="upFileBox" v-else>
                                        <p><img src="../../assets/img/newPic/uploadFile.png"></p>
                                        <p>点击上传</p>
                                      </a>
                                </el-upload>
                                  </span>
                                </div>
				            					<div class="tipsWord">
					            					<p>网络媒体上传：《互联网新闻信息服务许可证》或《信息网络传播视听节目许可证》。</p>
					            					<p>广播电视上传：《广播电视播出机构许可证》或《广播电视频道许可证》。</p>
					            					<p>报纸上传：《中华人民共和国报纸出版许可证》。</p>
					            					<p>期刊上传：《中华人民共和国期刊出版许可证》。</p>
					            					<p>不支持各类《经营许可证》和《发行许可证》。</p>
					            					<p>格式要求：原件照片、扫描件或者加盖公章的复印件，支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过5M</p>
					            				</div>
				            				</div>
                              <div class="error-tips-box errTipUploadFile" v-if="mediaShow2">请上传媒体许可证</div>
				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">申请函：</label>
                            <div class="fl wh614">
                              <div class="upload-ID fl" style="position: relative;">
                                <span class="uploadLogo">
                                  <el-upload
                                    class="upload-demo"
                                    :action="JustpictureUrl"
                                    :show-file-list="false"
                                    :on-success="handleChange5"
                                    :before-upload="handleChangeSuccess2Upload"
                                  >
                                    <img v-if="publicLetterUrl5" :src="publicLetterUrl5" class="avatar">
                              <div class="IDSuccess" v-if="publicLetterUrl5">
                                  <div class="maskLayer-ID" style="padding-top: 48px;">
                                    <a href="javascript:;">
                                      <i class="icon-verPic icon-picUpload"></i>图片上传
                                    </a>
                                  </div>
                                </div>
                                <a href="javascript:;" class="upFileBox" v-else>
						            						<p><img src="../../assets/img/newPic/uploadFile.png"></p>
						            						<p>点击上传</p>
                                </a>
                              </el-upload>
					            					</span>
                              </div>
                              <a href="javascript:;" class="btn-sampleDown fl" @click="download()">范例下载</a>
				            					<div class="tipsWord">上传加盖公章的原件照片或扫描件，支持.jpg .jpeg .bmp .png格式照片，大小不超过5M</div>
                              <div class="error-tips-box errTipUploadFile" v-if="applyShow">请上传大小不超过5M的照片</div>
				            				</div>


				            			</div>
			            			</div>
                        <!--事业单位媒体 end-->
                        <!--社会团体 start-->
            						<div class="orgTab-con orgType" :class="{'orgTypeHidden':item.mechanismType == '4'}">
	            						<div class="publicList">
				            				<label>单位名称：</label>
				            				<input type="text" placeholder="请输入单位名称" v-model="unitName" @blur="unitNameFun()"
                                   maxlength="35"/>
				            				<div class="error-tips-box other tipsError" style="top: 39px">{{unitNameCon}}</div>
				            			</div>
				            			<div class="publicList">
				            				<label>单位地址：</label>
				            				<input type="text" placeholder="请输入单位地址" v-model="unitAddress" @blur="unitAddressFun()"
                                   maxlength="50"/>
				            				<div class="error-tips-box other tipsError" style="top: 39px">{{unitAddressCon}}</div>
				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">组织机构代码证：</label>
                            <!--<span class="orgFile fl orgFileClass">
                                <el-upload
                                  class="upload-demo"
                                  :action="JustpictureUrl"
                                  :file-list="fileListGroup"
                                  :on-remove="handleGroupRemove"
                                  :on-change="handleChangeGroup"
                                  :on-success="handleChangeSuccessGroup"
                                  :before-upload="handleChangeSuccessGroupUpload"
                                >
                                <el-button size="small" type="primary">点击上传</el-button>
                              </el-upload>
                                                <div class="tipsWord">格式要求：原件照片、扫描件或者加盖公章的复印件，支持.jpg .jpeg .png格式照片，大小不超过5M。</div><div class="error-tips-box other" v-if="groupShow">请上传组织机构代码证</div>
                                                <div class="tipsWord">组织机构代码证必须在有效期范围内。若办理过三证合一的企业无法提供组织机构代码证，请上传最新的相关证件。</div>
                                            </span>-->
                                                        <div class="fl wh614">
                              <div class="upload-ID">
				            					<!--<a href="javascript:;" class="selectFile">上传文件</a>-->
                              <el-upload
                                class="upload-demo"
                                :action="JustpictureUrl"
                                :show-file-list="false"
                                :on-success="handleChange3"
                                :before-upload="handleChangeSuccess"
                              >
                                <img v-if="organizationUrl2" :src="organizationUrl2" class="avatar">
                                <span class="uploadLogo">
                                     <div class="IDSuccess" v-if="organizationUrl2" style="width: 188px;">
                                        <div class="maskLayer-ID" style="padding-top: 48px;">
                                          <a href="javascript:;">
                                            <i class="icon-verPic icon-picUpload"></i>图片上传
                                          </a>
                                        </div>
                                      </div>
                                      <a href="javascript:;" class="upFileBox" v-else>
                                        <p><img src="../../assets/img/newPic/uploadFile.png"></p>
                                        <p>点击上传</p>
                                      </a>
                                </span>
                              </el-upload>
				            					<div class="tipsWord">格式要求：原件照片、扫描件或者加盖公章的复印件，支持.jpg .jpeg .png格式照片，大小不超过5M。</div>
                              <div class="error-tips-box errTipUploadFile" v-if="orginShow2">请上传组织机构代码证</div>
                               </div>
                            </div>

				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">社会团体登记证书：</label>
                            <!--<span class="orgFile fl orgFileClass">
                                                <el-upload
                                class="upload-demo"
                                :action="JustpictureUrl"
                                :file-list="fileListSociology"
                                :on-remove="handleSociologyRemove"
                                :on-change="handleChangeSociology"
                                :on-success="handleChangeSuccessSociology"
                                :before-upload="handleChangeSuccessSociologyUpload"
                              >
                                <el-button size="small" type="primary">点击上传</el-button>
                              </el-upload>
                                                <div class="tipsWord">格式要求：原件照片、扫描件或者加盖公章的复印件，支持.jpg .jpeg .png格式照片，大小不超过5M。</div>
                                                <div class="error-tips-box other" v-if="sociologyShow">请上传社会团体登记证书</div>
                                            </span>-->
                            				            				<div class="fl wh614" style="position: relative;">
                              <div class="upload-ID fl">
                              <span class="uploadLogo">
                                <el-upload
                                  :action="JustpictureUrl"
                                  :show-file-list="false"
                                  :on-success="handleChangeSuccessSociology"
                                  :before-upload="handleChangeSuccessSociologyUpload"
                                >
                                  <img v-if="sociologyGroupUrl" :src="sociologyGroupUrl" style="margin:0;"
                                       class="avatar">
                                  <div class="IDSuccess" v-if="sociologyGroupUrl">
                                        <div class="maskLayer-ID" style="padding-top: 48px;">
                                          <a href="javascript:;">
                                            <i class="icon-verPic icon-picUpload"></i>图片上传
                                          </a>
                                        </div>
                                  </div>
                                  <a href="javascript:;" class="upFileBox" v-else>
                                    <p><img src="../../assets/img/newPic/uploadFile.png"></p>
                                    <p>点击上传</p>
                                  </a>

                                </el-upload>

                                </span>
                                </div>
                                                          <!--<a href="javascript:;" class="btn-sampleDown">范例下载</a>-->
				            					<div class="tipsWord">格式要求：原件照片、扫描件或者加盖公章的复印件，支持.jpg .jpeg .png格式照片，大小不超过5M。</div>
				            					<div class="error-tips-box errTipUploadFile" v-if="sociologyShow">请上传社会团体登记证书</div>
				            				</div>

				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">申请函：</label>
                            <div class="fl wh614">
                              <div class="upload-ID fl" style="position: relative;">
                                <span class="uploadLogo">
                                  <el-upload
                                    class="upload-demo"
                                    :action="JustpictureUrl"
                                    :show-file-list="false"
                                    :on-success="handleChange6"
                                    :before-upload="handleChangeSuccess2Upload"
                                  >
                                    <img v-if="publicLetterUrl6" :src="publicLetterUrl6" class="avatar">
                              <div class="IDSuccess" v-if="publicLetterUrl6">
                                  <div class="maskLayer-ID" style="padding-top: 48px;">
                                    <a href="javascript:;">
                                      <i class="icon-verPic icon-picUpload"></i>图片上传
                                    </a>
                                  </div>
                                </div>
                                <a href="javascript:;" class="upFileBox" v-else>
						            						<p><img src="../../assets/img/newPic/uploadFile.png"></p>
						            						<p>点击上传</p>
                                </a>
                              </el-upload>
					            					</span>
                              </div>
                              <a href="javascript:;" class="btn-sampleDown fl" @click="download()">范例下载</a>
				            					<div class="tipsWord">上传加盖公章的原件照片或扫描件，支持.jpg .jpeg .bmp .png格式照片，大小不超过5M</div>
                              <div class="error-tips-box errTipUploadFile" v-if="applyShow">请上传大小不超过5M的照片</div>
				            				</div>

				            			</div>
			            			</div>
                        <!--社会团体 end-->
                        <!--企业法人 start-->
            						<div class="orgTab-con orgType" :class="{'orgTypeHidden':item.mechanismType == '5'}">
	            						<div class="publicList">
				            				<label>单位名称：</label>
				            				<input type="text" placeholder="请输入单位名称" v-model="unitName" @blur="unitNameFun()"
                                   maxlength="35"/>
				            				<div class="error-tips-box other tipsError" style="top: 39px">{{unitNameCon}}</div>
				            			</div>
				            			<div class="publicList">
				            				<label>单位地址：</label>
				            				<input type="text" placeholder="请输入单位地址" v-model="unitAddress" @blur="unitAddressFun()"
                                   maxlength="50"/>
				            				<div class="error-tips-box other tipsError" style="top: 39px">{{unitAddressCon}}</div>
				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">工商营业执照：</label>
                             <div class="fl wh614">
                                <div class="upload-ID" style="position: relative;">
                                  <el-upload
                                    class="upload-demo"
                                    :action="JustpictureUrl"
                                    :show-file-list="false"
                                    :on-success="handleChangeSuccessCircles2"
                                    :before-upload="handleChangeSuccessCirclesUpload2"
                                  >
                                    <img v-if="businessLicenseUrl2" :src="businessLicenseUrl2" class="avatar">
                                    <div class="IDSuccess" v-if="businessLicenseUrl2">
                                      <div class="maskLayer-ID" style="padding-top: 48px;">
                                        <a href="javascript:;">
                                          <i class="icon-verPic icon-picUpload"></i>图片上传
                                        </a>
                                      </div>
                                    </div>
                                  <span class="uploadLogo" v-else>
                                    <a href="javascript:;" class="upFileBox">
                                      <p><img src="../../assets/img/newPic/uploadFile.png"></p>
                                      <p>点击上传</p>
                                    </a>
					            					  </span>
                                </el-upload>
                              </div>
				            					<div class="tipsWord">点击上传请上传最新的营业执照。格式要求：原件照片、扫描件或者加盖公章的复印件，支持.jpg .jpeg .png格式照片，大小不超过5M。</div>
				            					<div class="error-tips-box errTipUploadFile" v-if="circlesShow2">请上传工商营业执照</div>
				            				</div>

				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">申请函：</label>
                             <div class="fl wh614">
                              <div class="upload-ID fl" style="position: relative;">
                                <span class="uploadLogo">
                                  <el-upload
                                    class="upload-demo"
                                    :action="JustpictureUrl"
                                    :show-file-list="false"
                                    :on-success="handleChange17"
                                    :before-upload="handleChangeSuccess17"
                                  >
                                    <img v-if="publicLetterUrl7" :src="publicLetterUrl7" class="avatar">
                              <div class="IDSuccess" v-if="publicLetterUrl7">
                                  <div class="maskLayer-ID" style="padding-top: 48px;">
                                    <a href="javascript:;">
                                      <i class="icon-verPic icon-picUpload"></i>图片上传
                                    </a>
                                  </div>
                                </div>
                                <a href="javascript:;" class="upFileBox" v-else>
						            						<p><img src="../../assets/img/newPic/uploadFile.png"></p>
						            						<p>点击上传</p>
                                </a>
                              </el-upload>
					            					</span>
                              </div>
                              <a href="javascript:;" class="btn-sampleDown fl" @click="download()">范例下载</a>
				            					<div class="tipsWord">上传加盖公章的原件照片或扫描件，支持.jpg .jpeg .bmp .png格式照片，大小不超过5M</div>
                              <div class="error-tips-box errTipUploadFile" v-if="applyShow">请上传大小不超过5M的照片</div>
				            				</div>

				            			</div>
			            			</div>
                        <!--企业法人 end-->
                        <!--企业媒体 start-->
            						<div class="orgTab-con orgType" :class="{'orgTypeHidden':item.mechanismType == '6'}">
	            					<div class="publicList">
				            				<label>单位名称：</label>
				            				<input type="text" placeholder="请输入单位名称" v-model="unitName" @blur="unitNameFun()"
                                   maxlength="35"/>
				            				<div class="error-tips-box other tipsError" style="top: 39px">{{unitNameCon}}</div>
				            			</div>
				            			<div class="publicList">
				            				<label>单位地址：</label>
				            				<input type="text" placeholder="请输入单位地址" v-model="unitAddress" @blur="unitAddressFun()"
                                   maxlength="50"/>
				            				<div class="error-tips-box other tipsError" style="top: 39px">{{unitAddressCon}}</div>
				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">媒体类型：</label>
				            				<div class="downTxtDiv fl">
					            				<div class="dialog-downMenu flt" @click="statusList2($event)" @click.stop>
									                <span class="defaul_option">{{chooseStatusText}}</span>
									                <i class="icon icon-downMenu" style="position: absolute;top: 0;right: 5px;"></i>
									                <div class="downMenuShow" @click="chooseStatus2($event)" @click.stop
                                       v-if="statusListShow">
										                <ul>
										                    <li value="1">电视广播</li>
										                    <li value="2">报刊</li>
										                    <li value="3">杂志</li>
										                    <li value="4">网络媒体</li>
										                </ul>
									                </div>
									            </div>
									            <div class="error-tips-box" v-if="chooseStatu" style="left:0;">请选择媒体类型</div>
								            </div>
				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">工商营业执照：</label>
                            	<div class="fl wh614">
                                <div class="upload-ID" style="position: relative;">
                                  <el-upload
                                    class="upload-demo"
                                    :action="JustpictureUrl"
                                    :show-file-list="false"
                                    :on-success="handleChangeSuccessCircles"
                                    :before-upload="handleChangeSuccessCirclesUpload"
                                  >
                                    <img v-if="businessLicenseUrl" :src="businessLicenseUrl" class="avatar">
                                    <div class="IDSuccess" v-if="businessLicenseUrl">
                                      <div class="maskLayer-ID" style="padding-top: 48px;">
                                        <a href="javascript:;">
                                          <i class="icon-verPic icon-picUpload"></i>图片上传
                                        </a>
                                      </div>
                                    </div>
                                  <span class="uploadLogo" v-else>
                                    <a href="javascript:;" class="upFileBox">
                                      <p><img src="../../assets/img/newPic/uploadFile.png"></p>
                                      <p>点击上传</p>
                                    </a>
					            					  </span>
                                </el-upload>
                              </div>
				            					<div class="tipsWord">点击上传请上传最新的营业执照。格式要求：原件照片、扫描件或者加盖公章的复印件，支持.jpg .jpeg .png格式照片，大小不超过5M。</div>
				            					<div class="error-tips-box errTipUploadFile" v-if="circlesShow">请上传工商营业执照</div>
				            				</div>

				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">媒体许可证：</label>
                            <div class="fl wh614">
                              <div class="upload-ID fl" style="position: relative;">
                                <span class="uploadLogo">
				            					     <el-upload
                                     class="upload-demo"
                                     :action="JustpictureUrl"
                                     :show-file-list="false"
                                     :on-success="handleChangeSuccessMedia"
                                     :before-upload="handleChangeSuccessMediaUpload"
                                   >
                                   <img v-if="mediaLicenseUrl" :src="mediaLicenseUrl"
                                        style="margin: inherit"
                                        class="avatar">
                                      <div class="IDSuccess" v-if="mediaLicenseUrl">
                                        <div class="maskLayer-ID" style="padding-top: 48px;">
                                          <a href="javascript:;">
                                            <i class="icon-verPic icon-picUpload"></i>图片上传
                                          </a>
                                        </div>
                                      </div>
                                      <a href="javascript:;" class="upFileBox" v-else>
                                        <p><img src="../../assets/img/newPic/uploadFile.png"></p>
                                        <p>点击上传</p>
                                      </a>
                                </el-upload>
                                </span>
				            				  </div><!--<a href="javascript:;" class="btn-sampleDown" @click="download()">范例下载</a>-->
                              <div class="tipsWord">
                                <p>网络媒体上传：《互联网新闻信息服务许可证》或《信息网络传播视听节目许可证》。</p>
                                <p>广播电视上传：《广播电视播出机构许可证》或《广播电视频道许可证》。</p>
                                <p>报纸上传：《中华人民共和国报纸出版许可证》。</p>
                                <p>期刊上传：《中华人民共和国期刊出版许可证》。</p>
                                <p>不支持各类《经营许可证》和《发行许可证》。</p>
                                <p>格式要求：原件照片、扫描件或者加盖公章的复印件，支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过5M</p>
                              </div>
                              <div class="error-tips-box errTipUploadFile" v-if="mediaShow">请上传媒体许可证</div>
                             </div>
				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">申请函：</label>
                            <div class="fl wh614">
                              <div class="upload-ID fl" style="position: relative;">
                                <span class="uploadLogo">
                                  <el-upload
                                    class="upload-demo"
                                    :action="JustpictureUrl"
                                    :show-file-list="false"
                                    :on-success="handleChange7"
                                    :before-upload="handleChangeSuccess7"
                                  >
                                    <img v-if="publicLetterUrl8" :src="publicLetterUrl8" class="avatar">
                              <div class="IDSuccess" v-if="publicLetterUrl8">
                                  <div class="maskLayer-ID" style="padding-top: 48px;">
                                    <a href="javascript:;">
                                      <i class="icon-verPic icon-picUpload"></i>图片上传
                                    </a>
                                  </div>
                                </div>
                                <a href="javascript:;" class="upFileBox" v-else>
						            						<p><img src="../../assets/img/newPic/uploadFile.png"></p>
						            						<p>点击上传</p>
                                </a>
                              </el-upload>
					            					</span>
                              </div>
                              <a href="javascript:;" class="btn-sampleDown fl" @click="download()">范例下载</a>
				            					<div class="tipsWord">上传加盖公章的原件照片或扫描件，支持.jpg .jpeg .bmp .png格式照片，大小不超过5M</div>
                              <div class="error-tips-box errTipUploadFile" v-if="applyShow">请上传大小不超过5M的照片</div>
				            				</div>

				            			</div>
			            			</div>
                        <!--企业媒体 end-->
            					</div>
            				</span>
            </div>
          </div>
          <!----------------------------------审核状态  未通过的 end----------------------------------------------------->
        </div>
        <!--内容信息 end-->
        <!--审核状态  通过 start-->
        <div class="verifyNot detailsCon" v-if="item.confirmStatus == '3' || item.confirmStatus == '1'">
          <div class="deleteListCon">
            <div class="publicTitle"><i class="lineBlue"></i>审核信息</div>
            <div class="publicList">
              <label>审核状态：</label>
              <span class="notCertified corBlue" v-if="item.confirmStatus == '3'"><i
                class="icon-verPic icon-passed"></i>审核通过</span>
              <span class="notCertified corBlue" v-if="item.confirmStatus == '1'"><i
                class="icon-verPic icon-passed"></i>待审核</span>
            </div>
          </div>
        </div>
        <!--审核状态  通过 end-->
        <!--审核状态  未通过的 start-->
        <div class="verifyNot detailsCon" v-else="">
          <div class="deleteListCon">
            <div class="publicTitle"><i class="lineBlue"></i>审核信息</div>
            <div class="publicList">
              <label>审核状态：</label>
              <span class="notCertified"><i class="icon-verPic icon-notPassed"></i>审核未通过</span>
            </div>
            <!--未通过时（显示）驳回的意见 start-->
            <div class="publicList">
              <label>审核意见：</label>
              <span>
                    <textarea class="realName-textarea" readonly>{{item.rejectOpinion}}</textarea>
                  </span>
            </div>
            <div class="btnBgBox" style="padding-left: 175px;">
              <button class="btn-defalut btn-blue" @click="confirm()">再次认证</button>
            </div>
            <!--未通过时（显示）驳回的意见 end-->
          </div>
        </div>
        <!--审核状态  未通过的 end-->
      </div>
    </div>

    <!-- 弹出框 提交成功和动画加载 start -->
    <MaskTip v-bind:tips="tips"
             v-bind:tipsContent="tipsContent"
             v-bind:tipsImg="tipsImg"
             v-bind:loading="loading"
             @listenToChildEvent="getMaskTip">
    </MaskTip>
    <!--  弹出框 提交成功和动画加载 end -->


    <!--提交成功-->
    <div class="submitSuccessBox" v-if="submitSuccess"><i class="icon-verPic icon-submitSuccess"></i>{{submitSuccess}}
    </div>


  </div>
</template>
<script>
  import axios from 'axios';
  import {validateIdCard, checkCharacter} from '@/config/util';
  import MaskTip from '@/views/module/mask';
  import {mapGetters} from 'vuex';
  import {checkFileName} from '@/config/util';
  export default {
    data() {
      return {
        tipsContent: '',
        tipsImg: '',
        tips: false,
        loading: false,
        sexRadio: "2",//"1" 代表 男  "2" 代表 女
        openID: "",//获取用户信息的唯一标识
        userInforList: [],//用户信息
        IdCard: "",//身份证
        cardCon: "请输入有效证件号码",
        cardTip: false,
        email: "",//电子邮箱
        emailTip: false,
        emailCon: "请输入电子邮箱",
        realName: "",//真实姓名
        realNameTip: false,
        realNameCon: "请输入姓名",
        JustPicture: "",
        pictureUrl: "",//正面图片
        JustpictureUrl: "",//地址
        backPicture: "",
        backPictureUrl: "",//反面图片
        unitName: "",//单位名称
        unitNameCon: "",
        unitAddress: "",
        unitAddressCon: "",

        orginShow: false,//组织机构代码证：
        organization: "",//组织单位代码
        organizationUrl: "",
        organizationUrl2: "",
        orginShow2: false,
        //公函

        getUser: "",
        applyShow: false,
        publicLetterUrl: "",
        publicLetter: "",
        publicLetterUrl4: "",
        publicLetterUrl5: "",
        publicLetterUrl6: "",
        publicLetterUrl7: "",
        publicLetterUrl8: "",
        applyShow4: false,
        maxlen: "",//最大字节input
        statusListShow: false,//媒体类型
        chooseStatusType: "",
        chooseStatusText: "请选择",
        chooseStatu: false, //媒体类型 未选择时候的错误提示
        //事业单位地址
        causeShow: false,
        legalLicenseUrl: "",
        legalLicense: "",// 事业单位媒体中事业单位法人证书文件地址
        causeShow2: false,
        legalLicenseUrl2: "",
        //certificateShow:false,//事业单位媒体中事业单位法人证书：
        mediaShow: false,
        mediaLicenseUrl: "",// 事业单位媒体中媒体许可证
        mediaLicense: "",//事业单位媒体中媒体许可证上传地址
        mediaShow2: false,
        mediaLicenseUrl2: "",
        sociologyShow: false,
        sociologyGroupUrl: "",
        sociologyGroup: "",
        businessLicenseUrl: "",
        businessLicense: "",
        circlesShow: false,


        businessLicenseUrl2: "",
        circlesShow2: false,

        networkShow: false,
        //媒体许可证
        mechanismType: "1",
        submitSuccess: ""
      }
    },
    mounted: function () {
      let getOpenid;
      let User;
      if (this.getUserInfo) {
        getOpenid = JSON.parse(this.getUserInfo).openID;
        User = JSON.parse(this.getUserInfo).userName;
      }
      this.openID = getOpenid;
      this.getUser = User;
      //this.JustpictureUrl = "http://localhost:3002/userInformation/upload/"+getOpenid;
      this.JustpictureUrl = "/userInformation/upload/" + getOpenid;
      window.addEventListener('click', this.handleSelect);
      this.chooseStatusType = "";


      this.getUserInfor();//页面初始化获取用户信息
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    components: {
      MaskTip
    },
    methods: {
      tipsShow() {
        this.tips = true;
      },
      getUserInfor() {
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/userInformation/getUserByOpenID",
          async: true,
          data: {
            openID: this.openID,
          },
          contentType: 'application/json'
        }).then(res => {
          this.userInforList = [];
          if (res.data.code == "200") {
            /*organizationUrl*/
            this.userInforList.push(res.data.results);//页面初始化渲染页面信息
            this.IdCard = res.data.results.idCard;//用户身份证
            this.email = res.data.results.mailbox;//用户邮箱
            this.sexRadio = res.data.results.sex;//性别
            this.realName = res.data.results.name;//真实姓名
            this.JustPicture = res.data.results.idCardJust;//身份证正面照
            this.backPicture = res.data.results.idCardBack;//身份证反面照
            this.unitName = res.data.results.companyName;//企业信息（单位名称）
            this.unitAddress = res.data.results.companyUrl;//企业信息（单位地址）


            this.pictureUrl = res.data.results.idCardJust;//身份证正面照
            this.backPictureUrl = res.data.results.idCardBack;//身份证反面照
            //企业信息（机构类型 "1"政府 "2"事业单位 "3"事业单位媒体 "4"社会团体 "5"企业法人 "6"企业媒体）
            //工商营业执照
            if (res.data.results.mechanismType == '5') {//企业法人
              this.mechanismType = "5";
              this.businessLicense = res.data.results.businessLicense;
              this.businessLicenseUrl2 = res.data.results.businessLicense;//企业信息（工商营业执照上传文件）

              if (res.data.results.publicLetter) {//申请公函文件
                this.publicLetter = res.data.results.publicLetter;//申请公函文件
                this.publicLetterUrl7 = res.data.results.publicLetter;//申请公函文件
              } else {
                this.publicLetter = "";
              }
            } else if (res.data.results.mechanismType == '4') {
              this.mechanismType = "4";
              this.organization = res.data.results.organization;//组织机构代码证上传文件url
              this.sociologyGroup = res.data.results.sociologyGroup;//社会团体登记证书上传文件
              this.sociologyGroupUrl = res.data.results.sociologyGroup;//社会团体登记证书上传文件
              this.organizationUrl2 = res.data.results.organization;//组织机构代码证上

              if (res.data.results.publicLetter) {//申请公函文件
                this.publicLetter = res.data.results.publicLetter;//申请公函文件
                this.publicLetterUrl6 = res.data.results.publicLetter;//申请公函文件
              } else {
                this.publicLetter = "";
              }
            } else if (res.data.results.mechanismType == '3') {
              this.mechanismType = "3";
              //企业信息（媒体类型 "1"电视广播 "2"报刊 "3"杂志 "4" 网络媒体）mediaType
              if (res.data.results.mediaType == "1") {
                this.chooseStatusText = "电视广播";
                this.chooseStatusType = "1"
              } else if (res.data.results.mediaType == "2") {
                this.chooseStatusText = "报刊";
                this.chooseStatusType = "2"
              } else if (res.data.results.mediaType == "3") {
                this.chooseStatusText = "杂志";
                this.chooseStatusType = "3"
              } else if (res.data.results.mediaType == "4") {
                this.chooseStatusText = "网络媒体";
                this.chooseStatusType = "4"
              }
              //res.data.results.legalLicense.split(this.openID+"/")[1]
              this.legalLicense = res.data.results.legalLicense;//事业单位法人证书上传文件
              this.legalLicenseUrl2 = res.data.results.legalLicense;//事业单位法人证书上传文件
              this.mediaLicenseUrl2 = res.data.results.mediaLicense;//媒体许可上传文件
              this.mediaLicense = res.data.results.mediaLicense;//媒体许可上传文件

              if (res.data.results.publicLetter) {//申请公函文件
                this.publicLetter = res.data.results.publicLetter;//申请公函文件
                this.publicLetterUrl5 = res.data.results.publicLetter;//申请公函文件
              } else {
                this.publicLetter = "";
              }
            } else if (res.data.results.mechanismType == '2') {
              this.mechanismType = "2";
              this.legalLicense = res.data.results.legalLicense;//事业单位法人证书上传文件
              this.legalLicenseUrl = res.data.results.legalLicense;//企业信息（事业单位法人证书上传文件）
              if (res.data.results.publicLetter) {//申请公函文件
                this.publicLetter = res.data.results.publicLetter;//申请公函文件
                this.publicLetterUrl4 = res.data.results.publicLetter;//申请公函文件
              } else {
                this.publicLetter = "";
              }
            } else if (res.data.results.mechanismType == '1') {//
              this.mechanismType = "1";
              this.organization = res.data.results.organization;
              this.organizationUrl = res.data.results.organization;//企业信息（组织机构代码证上传文件url）
            } else if (res.data.results.mechanismType == '6') {
              this.mechanismType = "6";
              //企业信息（媒体类型 "1"电视广播 "2"报刊 "3"杂志 "4" 网络媒体）mediaType
              if (res.data.results.mediaType == "1") {
                this.chooseStatusText = "电视广播";
                this.chooseStatusType = "1";
              } else if (res.data.results.mediaType == "2") {
                this.chooseStatusText = "报刊";
                this.chooseStatusType = "2";
              } else if (res.data.results.mediaType == "3") {
                this.chooseStatusText = "杂志";
                this.chooseStatusType = "3";
              } else if (res.data.results.mediaType == "4") {
                this.chooseStatusText = "网络媒体";
                this.chooseStatusType = "4";
              }
              this.businessLicense = res.data.results.businessLicense;//企业信息（工商营业执照上传文件）
              this.mediaLicense = res.data.results.mediaLicense;//企业信息（媒体许可上传文件）
              this.mediaLicenseUrl = res.data.results.mediaLicense;//企业信息（媒体许可上传文件）
              this.businessLicenseUrl = res.data.results.businessLicense;//企业信息（工商营业执照上传文件）
              if (res.data.results.publicLetter) {//申请公函文件
                this.publicLetter = res.data.results.publicLetter;//申请公函文件
                this.publicLetterUrl8 = res.data.results.publicLetter;//申请公函文件
              } else {
                this.publicLetter = "";
              }
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      //身份证正面照
      handleAvatarSuccess(res, file) {
        this.JustPicture = URL.createObjectURL(file.raw);
        this.pictureUrl = res.filePath;
      },
      beforeAvatarUpload(file) {
        if(!checkFileName(file)){
          this.$message.error('文件名不能包含特殊字符');
          return false;
        };
        const fileType = file.type.split("/")[1].toLowerCase();
        const isJPG = file.type.indexOf("image") > -1 && fileType != 'gif';
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error('请上传bmp/jpg/jpeg/png格式的照片');
        }
        if (!isLt2M) {
          this.$message.error('请上传大小不超过5M的照片');
        }
        return isJPG && isLt2M;
      },
      //身份证反面照
      handleAvatarSuccessBack(res, file) {
        this.backPicture = URL.createObjectURL(file.raw);
        this.backPictureUrl = res.filePath;
      },
      beforeAvatarUploadBack(file) {
        if(!checkFileName(file)){
          this.$message.error('文件名不能包含特殊字符');
          return false;
        };
        const fileType = file.type.split("/")[1].toLowerCase();
        const isJPG = file.type.indexOf("image") > -1 && fileType != 'gif';
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error('请上传bmp/jpg/jpeg/png格式的照片');
        }
        if (!isLt2M) {
          this.$message.error('请上传大小不超过5M的照片');
        }
        return isJPG && isLt2M;
      },
      //tab切换
      organizatType(index, evnet) {
        var organizatList = document.getElementById("organizat").childNodes;
        var orgTypeList = document.getElementsByClassName("orgType");
        for (var i = 0; i < organizatList.length; i++) {
          organizatList[i].className = "";
        }
        for (var j = 0; j < orgTypeList.length; j++) {
          orgTypeList[j].style.display = "none";
        }
        evnet.target.className = "active";
        orgTypeList[index].style.display = "block";
        this.mechanismType = (++index).toString();
      },
      //请输入单位地址
      unitAddressFun() {
        var addressReg = /^[0-9]*$/;
        var pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/;//特殊字符
        if (!this.unitAddress) {
          this.unitAddressCon = "请输入单位地址";
        } else if (pattern.test(this.unitAddress.trim()[0])) {
          this.unitAddressCon = "首字母非特殊字符";
        } else {
          this.unitAddressCon = "";
        }
      },
      unitNameFun() {//单位名称
        var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
        if (!this.unitName) {
          this.unitNameCon = "请输入单位名称";
          return;
        } else if (pattern.test(this.unitName.trim()[0])) {
          this.unitNameCon = "首字母非特殊字符";
          return;
        } else {
          if (this.unitName.trim().length > 2) {
            this.unitNameCon = "";
          } else {
            this.unitNameCon = "请输入3-35个字符";
            return;
          }
          ;
          if (this.unitName.indexOf(" ") != -1) {
            this.unitNameCon = "请输入3-35个字符";
            return;
          } else {
            this.unitNameCon = "";
          }
        }

      },
      //组织机构上传凭证
      handleChange(res, file) {
        this.organizationUrl = URL.createObjectURL(file.raw);
        this.organization = res.filePath;
        this.orginShow = false;
      },
      handleChange3(res, file) {
        this.organizationUrl2 = URL.createObjectURL(file.raw);
        this.organization = res.filePath;
        this.orginShow2 = false;
      },
      handleChangeSuccess(file) {
        if(!checkFileName(file)){
          this.$message.error('文件名不能包含特殊字符');
          return false;
        };
        const fileType = file.type.split("/")[1].toLowerCase();
        const isJPG = file.type.indexOf("image") > -1 && fileType != 'gif';
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error('请上传bmp/jpg/jpeg/png格式的照片');
        }
        if (!isLt2M) {
          this.$message.error('请上传大小不超过5M的照片');
        }
        return isJPG && isLt2M;
      },
      //上传申请公函
      handleChange2(res, file) {
        this.publicLetterUrl = URL.createObjectURL(file.raw);
        this.publicLetter = res.filePath;
        this.applyShow = false;
      },
      handleChange4(res, file) {
        this.publicLetterUrl4 = URL.createObjectURL(file.raw);
        this.publicLetter = res.filePath;
        this.applyShow4 = false;
      },
      handleChange5(res, file) {
        this.publicLetterUrl5 = URL.createObjectURL(file.raw);
        this.publicLetter = res.filePath;
      },
      handleChange6(res, file) {
        this.publicLetterUrl6 = URL.createObjectURL(file.raw);
        this.publicLetter = res.filePath;
      },
      handleChangeSuccess6(file) {
        if(!checkFileName(file)){
          this.$message.error('文件名不能包含特殊字符');
          return false;
        };
        const fileType = file.type.split("/")[1].toLowerCase();
        const isJPG = file.type.indexOf("image") > -1 && fileType != 'gif';
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error('请上传bmp/jpg/jpeg/png格式的照片');
        }
        if (!isLt2M) {
          this.$message.error('请上传大小不超过5M的照片');
        }
        return isJPG && isLt2M;
      },
      /*企业法人*/
      handleChange17(res, file) {
        this.publicLetterUrl7 = URL.createObjectURL(file.raw);
        this.publicLetter = res.filePath;
      },
      handleChangeSuccess17(file) {
        if(!checkFileName(file)){
          this.$message.error('文件名不能包含特殊字符');
          return false;
        };
        const fileType = file.type.split("/")[1].toLowerCase();
        const isJPG = file.type.indexOf("image") > -1 && fileType != 'gif';
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error('请上传bmp/jpg/jpeg/png格式的照片');
        }
        if (!isLt2M) {
          this.$message.error('请上传大小不超过5M的照片');
        }
        return isJPG && isLt2M;
      },
      /*企业法人结束*/
      handleChange7(res, file) {
        this.publicLetterUrl8 = URL.createObjectURL(file.raw);
        this.publicLetter = res.filePath;
      },
      handleChangeSuccess2Upload(file) {
        if(!checkFileName(file)){
          this.$message.error('文件名不能包含特殊字符');
          return false;
        };
        const fileType = file.type.split("/")[1].toLowerCase();
        const isJPG = file.type.indexOf("image") > -1 && fileType != 'gif';
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error('请上传bmp/jpg/jpeg/png格式的照片');
        }
        if (!isLt2M) {
          this.$message.error('请上传大小不超过5M的照片');
        }
        return isJPG && isLt2M;
      },
      //事业单位上传*******
      handleChangeSuccessCause(res, file) {
        this.legalLicenseUrl = URL.createObjectURL(file.raw);
        this.legalLicense = res.filePath;
        this.causeShow = false;
      },
      handleChangeSuccessCause2(res, file) {
        this.legalLicenseUrl2 = URL.createObjectURL(file.raw);
        this.legalLicense = res.filePath;
        this.causeShow2 = false;
      },
      handleChangeSuccessCauseUpload(file) {
        if(!checkFileName(file)){
          this.$message.error('文件名不能包含特殊字符');
          return false;
        };
        const fileType = file.type.split("/")[1].toLowerCase();
        const isJPG = file.type.indexOf("image") > -1 && fileType != 'gif';
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error('请上传bmp/jpg/jpeg/png格式的照片');
        }
        if (!isLt2M) {
          this.$message.error('请上传大小不超过5M的照片');
        }
        return isJPG && isLt2M;
      },
      //事业单位媒体中事业单位法人证书
      //事业单位媒体中媒体许可证*****
      handleChangeSuccessMedia(res, file) {
        this.mediaLicenseUrl = URL.createObjectURL(file.raw);
        this.mediaLicense = res.filePath;
        this.mediaShow = false;
      },
      handleChangeSuccessMedia2(res, file) {
        this.mediaLicenseUrl2 = URL.createObjectURL(file.raw);
        this.mediaLicense = res.filePath;
        this.mediaShow2 = false;
      },
      handleChangeSuccessMediaUpload(file) {
        if(!checkFileName(file)){
          this.$message.error('文件名不能包含特殊字符');
          return false;
        };
        const fileType = file.type.split("/")[1].toLowerCase();
        const isJPG = file.type.indexOf("image") > -1 && fileType != 'gif';
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error('请上传bmp/jpg/jpeg/png格式的照片');
        }
        if (!isLt2M) {
          this.$message.error('请上传大小不超过5M的照片');
        }
        return isJPG && isLt2M;
      },
      //社会团体*****
      handleChangeSuccessSociology(res, file) {
        this.sociologyGroupUrl = URL.createObjectURL(file.raw);
        this.sociologyGroup = res.filePath;
        this.sociologyShow = false;
      },
      handleChangeSuccessSociologyUpload(file) {
        if(!checkFileName(file)){
          this.$message.error('文件名不能包含特殊字符');
          return false;
        };
        const fileType = file.type.split("/")[1].toLowerCase();
        const isJPG = file.type.indexOf("image") > -1 && fileType != 'gif';
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error('请上传bmp/jpg/jpeg/png格式的照片');
        }
        if (!isLt2M) {
          this.$message.error('请上传大小不超过5M的照片');
        }
        return isJPG && isLt2M;
      },
      //工商营业执照上传 ******
      handleChangeSuccessCircles(res, file) {
        this.businessLicenseUrl = URL.createObjectURL(file.raw);
        this.businessLicense = res.filePath;//工商营业执照：
        this.circlesShow = false;
      },
      handleChangeSuccessCirclesUpload(file) {
        if(!checkFileName(file)){
          this.$message.error('文件名不能包含特殊字符');
          return false;
        };
        const fileType = file.type.split("/")[1].toLowerCase();
        const isJPG = file.type.indexOf("image") > -1 && fileType != 'gif';
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error('请上传bmp/jpg/jpeg/png格式的照片');
        }
        if (!isLt2M) {
          this.$message.error('请上传大小不超过5M的照片');
        }
        return isJPG && isLt2M;
      },
      handleChangeSuccessCircles2(res, file) {
        this.businessLicenseUrl2 = URL.createObjectURL(file.raw);
        this.businessLicense = res.filePath;//工商营业执照：
        this.circlesShow2 = false;
      },
      handleChangeSuccessCirclesUpload2(file) {
        if(!checkFileName(file)){
          this.$message.error('文件名不能包含特殊字符');
          return false;
        };
        const fileType = file.type.split("/")[1].toLowerCase();
        const isJPG = file.type.indexOf("image") > -1 && fileType != 'gif';
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error('请上传bmp/jpg/jpeg/png格式的照片');
        }
        if (!isLt2M) {
          this.$message.error('请上传大小不超过5M的照片');
        }
        return isJPG && isLt2M;
      },

      /*企业媒体*/
      handleChangeSuccess7(file) {
        if(!checkFileName(file)){
          this.$message.error('文件名不能包含特殊字符');
          return false;
        };
        const fileType = file.type.split("/")[1].toLowerCase();
        const isJPG = file.type.indexOf("image") > -1 && fileType != 'gif';
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isJPG) {
          this.$message.error('请上传bmp/jpg/jpeg/png格式的照片');
        }
        if (!isLt2M) {
          this.$message.error('请上传大小不超过5M的照片');
        }
        return isJPG && isLt2M;
      },
      //失去焦点 姓名
      handleFocus() {
        var reg = /^[A-Za-z]+$/;
        var reg2 = /^[\u4e00-\u9fa5]+$/;
        var reg3 = /^[A-Z|a-z|\u4e00-\u9fa5]+$/;
        if (!this.realName) {
          this.realNameTip = true;
          this.realNameCon = "请输入姓名";
          return;
        } else if (!(reg.test(this.name) && reg2.test(this.name))) {
          this.realNameTip = true;
          this.realNameCon = "请输入4-20位字母或2-10位汉字"
          if (reg.test(this.realName)) {
            if (this.realName.trim().length < 4 || this.realName.trim().length > 20) {
              this.realNameTip = true;
              this.realNameCon = "请输入4-20位字母或2-10位汉字";
              return;
            } else {
              this.realNameTip = false;

            }
          } else if (reg2.test(this.realName)) {
            if (this.realName.trim().length < 2 || this.realName.trim().length > 10) {
              this.realNameTip = true;
              this.realNameCon = "请输入4-20位字母或2-10位汉字";
              return;
            } else {
              this.realNameTip = false;
            }
          }
        } else {
          this.realNameTip = false;
        }
      },
      //电子邮箱handleFocusEmail
      handleFocusEmail() {
        //邮箱格式
        let regs = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
        if (!this.email) {
          this.emailCon = "请输入电子邮箱";
          this.emailTip = true;
          return;
        } else if (!regs.test(this.email.trim()) || !reg.test(this.email.trim())) {
          this.emailCon = "邮箱格式不正确，请重新输入。";
          this.emailTip = true;
          return;
        } else {
          this.emailTip = false;
        }
      },
      //校验身份证
      handleIsJustCard() {
        if (!this.IdCard) {
          this.cardTip = true;
          this.cardCon = "请输入有效证件号码";
          return;
        } else if (!validateIdCard(this.IdCard)) {
          this.cardTip = true;
          this.cardCon = "您输入的身份证号码不合法。";
          return;
        } else {
          this.cardTip = false;
        }
      },
      statusList(e) {//事业单位媒体 媒体类型
        e = e || event;
        e.cancelBubble = true;
        this.statusListShow = this.statusListShow ? this.statusListShow = false : this.statusListShow = true
      },
      chooseStatus(e) {//事业单位媒体 媒体类型
        this.chooseStatusType = e.target.value.toString();
        this.chooseStatusText = e.target.innerText;
        this.statusListShow = false;
        this.chooseStatu = false;
      },
      statusList2(e) {//企业媒体 媒体类型
        e = e || event;
        e.cancelBubble = true;
        this.statusListShow = this.statusListShow ? this.statusListShow = false : this.statusListShow = true
      },
      chooseStatus2(e) {//企业媒体 媒体类型
        this.chooseStatusType = e.target.value.toString();
        this.chooseStatusText = e.target.innerText;
        this.statusListShow = false;
        this.chooseStatu = false;
      },
      /*点击其他触发下拉框消失*/
      handleSelect() {
        this.statusListShow = false;
      },
      //确认提交 再次提交
      confirm() {
        //姓名
        if (!this.realName) {
          this.realNameTip = true;
          this.realNameCon = "请输入姓名";
          return;
        }
        //单位地址
        if (!this.email) {
          this.emailCon = "请输入电子邮箱";
          this.emailTip = true;
          return;
        }
        //身份证号
        if (!this.IdCard) {
          this.cardTip = true;
          this.cardCon = "请输入有效证件号码";
          return;
        }
        if (!this.unitName) {
          this.unitNameCon = "请输入单位名称";
          return;
        }
        if (!this.unitAddress) {
          this.unitAddressCon = "请输入单位地址";
          return;
        }

        //this.mechanismType//企业信息（机构类型 "1"政府 "2"事业单位 "3"事业单位媒体 "4"社会团体 "5"企业法人 "6"企业媒体）
        if (this.mechanismType == "1") {//政府
          //组织机构代码证：
          if (this.organizationUrl == "") {
            this.orginShow = true;
            return;
          } else {
            this.orginShow = false;
          }
        } else if (this.mechanismType == "2") {//事业单位
          //事业单位法人证书
          if (this.legalLicenseUrl == "") {
            this.causeShow = true;
            return;
          } else {
            this.causeShow = false;
          }
        } else if (this.mechanismType == "3") {//事业单位媒体
          //媒体类型
          if (!this.chooseStatusType) {
            this.chooseStatu = true;
            return;
          } else {
            this.chooseStatu = false;
          }
          if (this.legalLicenseUrl2 == "") {
            this.causeShow2 = true;
            return;
          } else {
            this.causeShow2 = false;
          }
          // 媒体许可证
          if (this.mediaLicenseUrl2 == "") {
            this.mediaShow2 = true;
            return;
          } else {
            this.mediaShow2 = false;
          }
        } else if (this.mechanismType == "4") {//社会团体
          // 组织机构代码证
          if (this.organizationUrl2 == "") {
            this.orginShow2 = true;
            return;
          } else {
            this.orginShow2 = false;
          }
          //社会团体登记证书
          if (this.sociologyGroup == "") {
            this.sociologyShow = true;
            return;
          } else {
            this.sociologyShow = false;
          }

        } else if (this.mechanismType == "5") {//企业法人
          //工商营业执照
          if (this.businessLicenseUrl2 == "") {
            this.circlesShow2 = true;
            return;
          } else {
            this.circlesShow2 = false;
          }
        } else if (this.mechanismType == "6") {//企业媒体
          //媒体类型
          if (!this.chooseStatusType) {
            this.chooseStatu = true;
            return;
          } else {
            this.chooseStatu = false;
          }
          //工商营业执照
          if (this.businessLicenseUrl == "") {
            this.circlesShow = true;
            return;
          } else {
            this.circlesShow = false;
          }
          // 媒体许可证
          if (this.mediaLicense == "") {
            this.mediaShow = true;
            return;
          } else {
            this.mediaShow = false;
          }
        };
        if(this.realNameTip || this.emailTip || this.cardTip ||  this.unitNameCon || this.unitAddressCon ||
          this.orginShow || this.causeShow || this.chooseStatu || this.certificateShow ||
          this.mediaShow || this.groupShow || this.busShow || this.chooseStatu || this.networkShow || this.circlesShow){
          return;
        };
        this.loading = true;
        //机构类型 "1"政府 "2"事业单位 "3"事业单位媒体 "4"社会团体 "5"企业法人 "6"企业媒体
        axios({
          headers: {"Content-Type": "application/json"},
          method: "post",
          url: "/userInformation/government",
          async: true,
          data: {
            openID: this.openID,
            name: this.realName.trim(),//实名认证（联系人的姓名）
            sex: this.sexRadio,//实名认证（联系人的性别）
            idCard: this.IdCard.trim(),//实名认证（联系人的身份证）
            idCardJust: this.pictureUrl,
            idCardBack: this.backPictureUrl,
            mailbox: this.email.trim(),
            mechanismType: this.mechanismType,//企业信息（机构类型 "1"政府 "2"事业单位 "3"事业单位媒体 "4"社会团体 "5"企业法人 "6"企业媒体）
            companyName: this.unitName.trim(),//企业信息（单位名称）
            companyUrl: this.unitAddress.trim(),//企业信息（单位地址）
            organization: this.organization,//企业信息（组织机构代码证上传文件url）
            publicLetter: this.publicLetter,//申请函
            confirmStatus: "1",
            mediaType: this.chooseStatusType,//企业信息（媒体类型 "1"电视广播 "2"报刊 "3"杂志 "4" 网络媒体）
            businessLicense: this.businessLicense,//企业信息（工商营业执照上传文件）
            mediaLicense: this.mediaLicense,//企业信息（媒体许可上传文件）
            legalLicense: this.legalLicense,//企业信息（事业单位法人证书上传文件）
            sociologyGroup: this.sociologyGroup//企业信息（社会团体登记证书上传文件）
          },
          contentType: 'application/json'
        }).then(res => {
          if (res.data.code == "200") {
            this.loading = false;
            /* this.tips = true;//弹框成功提交成功
             this.tipsImg = require("../../assets/img/dialog-successPic.png");
             this.tipsContent = "提交成功！"*/
            this.submitSuccess = "提交成功！";
            setTimeout(() => {
              this.submitSuccess = "";
              this.$router.replace({
                path: '/home/personalRealName/realNameDetails',
                name: "realNameDetails"
              });
              this.getUserInfor();//页面初始化获取用户信息
            }, 1500);
          } else {
            this.loading = false;
            /* this.tips = true;//弹框成功提交成功
             this.tipsImg = require("../../assets/img/dialog-failurePic.png");
             this.tipsContent = "提交失败！"*/
            this.submitSuccess = "提交失败！";
            setTimeout(() => {
              this.submitSuccess = "";
              this.$router.replace({
                path: '/home/personalRealName/realNameDetails',
                name: "realNameDetails"
              });
              this.getUserInfor();//页面初始化获取用户信息
            }, 1500);
          }
        }).catch(err => {
          console.log(err)
        })
      },
      download() {
        window.location.href = '/serviceJoin/download?type=download&filePath=/download/申请函范例下载.jpg'
      },
      /*点击其他触发下拉框消失*/
      handleSelect() {
        this.statusListShow = false;
      },
      getMaskTip(isFlag) {
        this.tips = isFlag;
        this.loading = isFlag;
      }
    },
    watch: {
      /*submitSuccess:{
        handler(){
          this.getUserInfor();//页面初始化获取用户信息
        }
      }*/
    }
  };
</script>
<style scoped>
  @import "../../assets/css/main.css";

  .sexBox {
    position: relative;
    width: auto !important;
  }

  .publicList .sexBox input[type="radio"] {
    position: absolute;
    left: -5px;
    top: 2px;
    opacity: 0;
    width: 18px;
    height: 18px;
  }

  .publicList input[type="radio"]:checked + i.icon-sex {
    background: url(../../assets/img/newPic/icon-verPic.png) no-repeat;
    background-position: -30px -107px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar {
    max-width: 188px;
    max-height: 114px;
    position: absolute;
    width: 188px;
    height: 114px;
    display: block;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .orgFileTip {
    position: relative;
  }

  .el-upload {
    position: relative;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader {
    position: relative;
  }

  /*提示信息*/
  .error-tips-box.other.tipsError {
    top: 39px;
  }

  .passBox {
    padding-top: 0px;
    padding-left: 218px;
    border-top: 0;
  }

  .passBox .btn-defalut {
    background: #fff;
    color: #000;
    border: 1px solid #ccc;
  }

  .orgType {
    display: none;
  }

  .orgTypeHidden {
    display: block;
  }

  .avatar-uploader {
    position: relative;
  }

  .upload-demo {
    position: relative;
  }

</style>
