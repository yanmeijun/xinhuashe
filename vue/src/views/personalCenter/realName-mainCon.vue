<template>
  <div class="content">
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
      <div class="deleteCon applicForm">
        <div class="deleteListCon">
          <div class="publicTitle"><i class="lineBlue"></i>基本信息</div>
          <div class="publicList">
            <label>联系人姓名：</label>
            <input type="text" placeholder="请输入联系人姓名" v-model="name" @blur="handleFocus()"/>
            <div class="error-tips-box other" v-if="realNameTip">{{realNameCon}}</div>
          </div>
          <div class="publicList">
            <label>性别：</label>
            <span class="radioSex fl">
                      <span class="sexBox"><input type="radio" value="1" name="realName" v-model="radio"><i
                        class="icon-verPic icon-sex"></i>男</span>
            					<span class="sexBox"><input type="radio" value="2" name="realName" v-model="radio"><i
                        class="icon-verPic icon-sex " @click="setCheckValue()"></i>女</span>
            				</span>
          </div>
          <div class="publicList">
            <label>电子邮箱：</label>
            <input type="text" placeholder="请输入电子邮箱" v-model="email" @blur="handleFocusEmail()"/>
            <div class="error-tips-box other" v-if="emailTip">{{emailCon}}</div>
          </div>
          <div class="publicList">
            <label>身份证号码：</label>
            <input type="text" placeholder="请填写有效身份证号码" v-model="card" @blur="handleIsJustCard()"/>
            <div class="error-tips-box other" v-if="cardTip">{{cardCon}}</div>
          </div>
          <div class="publicList clearfix">
            <label class="fl">身份证图片：</label>
            <span class="logoWarp fl clearfix">
            					<div class="upload-ID fl" style="width: 188px;">
                            <el-upload
                              class="avatar-uploader"
                              :action="Justpicture"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess"
                              :before-upload="beforeAvatarUpload">
                              <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <span class="uploadLogo">
                              <div class="IDSuccess" v-if="imageUrl" style="width: 188px;">
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
                             <span style="color: #fb5130;">{{jsutPicture}}</span>
            					</div>
            					<div class="upload-ID fl">
		            						<el-upload
                              class="avatar-uploader"
                              :action="backpicture"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccessBack"
                              :before-upload="beforeAvatarUploadBack">
                              <img v-if="imageUrlBack" :src="imageUrlBack" class="avatar">
                              <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                              	<span class="uploadLogo">
                                   <div class="IDSuccess" v-if="imageUrlBack" style="width: 188px;">
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
                        <span style="color: #fb5130;">{{backPicture}}</span>
	            				</div>
            				</span>
          </div>
        </div>
        <div class="deleteListCon">
          <div class="publicTitle"><i class="lineBlue"></i>企业信息</div>
          <div class="publicList clearfix">
            <label class="fl">机构类型：</label>
            <span class="fl">
            					<div class="tabLi tabLi-realName clearfix">
            						<ul id="organizat">
            							<li class="active" @click="organizatType('0',$event)">政府</li>
            							<li @click="organizatType('1',$event)">事业单位</li>
            							<li @click="organizatType('2',$event)">事业单位媒体</li>
            							<li @click="organizatType('3',$event)">社会团体</li>
            							<li @click="organizatType('4',$event)">企业法人</li>
            							<li @click="organizatType('5',$event)">企业媒体</li>
            						</ul>
            					</div>
            					<div class="tab-con tab-con-other">
            						<!--政府 start-->
            						<div class="orgTab-con orgType" style="display: block">
	            						<div class="publicList">
				            				<label>单位名称：</label>
				            				<input type="text" placeholder="请输入单位名称" v-model="unitName" @blur="unitNameFun()"
                                   maxlength="35"/>
				            				<div class="error-tips-box other">{{unitNameCon}}</div>
				            			</div>
				            			<div class="publicList">
				            				<label>单位地址：</label>
				            				<input type="text" placeholder="请输入单位地址" v-model="unitAddress" @blur="unitAddressFun()"
                                   maxlength="50"/>
				            				<div class="error-tips-box other">{{unitAddressCon}}</div>
				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">组织机构代码证：</label>
				            				<div class="fl wh614">
				            					<!--<a href="javascript:;" class="selectFile">上传文件</a>-->
                              <div class="upload-ID" style="position: relative;width: 188px">
                                 <el-upload
                                   class="upload-demo"
                                   :action="backpicture"
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
					            				</div>
				            					<div class="tipsWord">格式要求：原件照片、扫描件或者加盖公章的复印件，支持.jpg .jpeg .png格式照片，大小不超过5M。</div>
                              <div class="error-tips-box errTipUploadFile" v-if="orginShow">请上传组织机构代码证</div>
				            				</div>

				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">申请函：</label>
				            				<div class="fl wh614">
                              <div class="upload-ID fl" style="position: relative;">
                                <span class="uploadLogo">
                                  <el-upload
                                    class="upload-demo"
                                    :action="backpicture"
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
                        <!--------------------------------------------------------事业单位 start------------------------------------------------------->
            						<div class="orgTab-con orgType" style="display: none;">
	            							<div class="publicList">
				            				<label>单位名称：</label>
				            				<input type="text" placeholder="请输入单位名称" v-model="unitName" @blur="unitNameFun()"
                                   maxlength="35"/>
				            				<div class="error-tips-box other">{{unitNameCon}}</div>
				            			</div>
				            			<div class="publicList">
				            				<label>单位地址：</label>
				            				<input type="text" placeholder="请输入单位地址" v-model="unitAddress" @blur="unitAddressFun()"
                                   maxlength="50"/>
				            				<div class="error-tips-box other">{{unitAddressCon}}</div>
				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">事业单位证书：</label>
				            				<div class="fl wh614">
                               <div class="upload-ID" style="position: relative;width: 188px">
                                  <el-upload
                                    class="upload-demo"
                                    :action="backpicture"
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
                                    :action="backpicture"
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
                        <!--------------------------------------------------事业单位 end---------------------------------------------------------------------->
                        <!--事业单位媒体 start-->
            						<div class="orgTab-con orgType" style="display: none;">
	            							<div class="publicList">
				            				<label>单位名称：</label>
				            				<input type="text" placeholder="请输入单位名称" v-model="unitName" @blur="unitNameFun()"
                                   maxlength="35"/>
				            				<div class="error-tips-box other">{{unitNameCon}}</div>
				            			</div>
				            			<div class="publicList">
				            				<label>单位地址：</label>
				            				<input type="text" placeholder="请输入单位地址" v-model="unitAddress" @blur="unitAddressFun()"
                                   maxlength="50"/>
				            				<div class="error-tips-box other">{{unitAddressCon}}</div>
				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">媒体类型：</label>
				            				<div class="downTxtDiv fl">
					            				<div class="dialog-downMenu flt" @click="statusList($event)" @click.stop>
									                <span class="defaul_option">{{chooseStatusText}}</span>
									                <i class="icon icon-downMenu"></i>
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
								            </div>
									            <div class="error-tips-box" v-if="chooseStatu">请选择媒体类型</div>
				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">事业单位法人证书：</label>
                            <div class="fl wh614">
                               <div class="upload-ID" style="position: relative;width: 188px">
                                  <el-upload
                                    class="upload-demo"
                                    :action="backpicture"
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
				            				<label class="fl">媒体许可证：</label>
				            				<div class="fl wh614">
                              <div class="upload-ID fl" style="position: relative;">
                                <span class="uploadLogo">
                                 <el-upload
                                   class="upload-demo"
                                   :action="backpicture"
                                   :show-file-list="false"
                                   :on-success="handleChangeSuccessMedia"
                                   :before-upload="handleChangeSuccessMediaUpload"
                                 >
                                   <img v-if="mediaLicenseUrl" :src="mediaLicenseUrl" class="avatar">

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
                                </div>
                              <!-- <a href="javascript:;" class="btn-sampleDown" @click="download()">范例下载</a>-->
				            					<div class="tipsWord">
					            					<p>网络媒体上传：《互联网新闻信息服务许可证》或《信息网络传播视听节目许可证》。</p>
					            					<p>广播电视上传：《广播电视播出机构许可证》或《广播电视频道许可证》。</p>
					            					<p>报纸上传：《中华人民共和国报纸出版许可证》。</p>
					            					<p>期刊上传：《中华人民共和国期刊出版许可证》。</p>
					            					<p>不支持各类《经营许可证》和《发行许可证》。</p>
					            					<p>格式要求：原件照片、扫描件或者加盖公章的复印件，支持.jpg .jpeg .bmp .gif .png格式照片，大小不超过5M</p>
					            				</div>
				            				</div>
				            					<div class="error-tips-box errTipUploadFile" v-if="mediaShow">请上传媒体许可证</div>
				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">申请函：</label>
				            				<div class="fl wh614">
                              <div class="upload-ID fl" style="position: relative;">
                                <span class="uploadLogo">
                                  <el-upload
                                    class="upload-demo"
                                    :action="backpicture"
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
                        <!--事业单位媒体 end-->
                        <!--社会团体 start-->
            						<div class="orgTab-con orgType" style="display: none;">
	            							<div class="publicList">
				            				<label>单位名称：</label>
				            				<input type="text" placeholder="请输入单位名称" v-model="unitName" @blur="unitNameFun()"
                                   maxlength="35"/>
				            				<div class="error-tips-box other">{{unitNameCon}}</div>
				            			</div>
				            			<div class="publicList">
				            				<label>单位地址：</label>
				            				<input type="text" placeholder="请输入单位地址" v-model="unitAddress" @blur="unitAddressFun()"
                                   maxlength="50"/>
				            				<div class="error-tips-box other">{{unitAddressCon}}</div>
				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">组织机构代码证：</label>
				            				<div class="fl wh614">
				            					<!--<a href="javascript:;" class="selectFile">上传文件</a>-->
                              <div class="upload-ID" style="position: relative;">
                                 <el-upload
                                   :action="backpicture"
                                   :show-file-list="false"
                                   :on-success="handleChange"
                                   :before-upload="handleChangeSuccess"
                                 >
                                    <img v-if="organizationUrl" :src="organizationUrl"
                                         class="avatar">
                                   <span class="uploadLogo">
                                     <div class="IDSuccess" v-if="organizationUrl">
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
				            					<div class="tipsWord">格式要求：原件照片、扫描件或者加盖公章的复印件，支持.jpg .jpeg .png格式照片，大小不超过5M。组织机构代码证必须在有效期范围内。若办理过三证合一的企业无法提供组织机构代码证，请上传最新的相关证件。</div>
                              <div class="error-tips-box errTipUploadFile" v-if="orginShow">请上传组织机构代码证</div>
				            				</div>

				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">社会团体登记证书：</label>
				            				<div class="fl wh614" style="position: relative;">
                              <div class="upload-ID fl">
                              <span class="uploadLogo">
                                <el-upload
                                  :action="backpicture"
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
                                    :action="backpicture"
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
                        <!--社会团体 end-->
                        <!--企业法人 start-->
            						<div class="orgTab-con orgType" style="display: none;">
	            								<div class="publicList">
				            				<label>单位名称：</label>
				            				<input type="text" placeholder="请输入单位名称" v-model="unitName" @blur="unitNameFun()"
                                   maxlength="35"/>
				            				<div class="error-tips-box other">{{unitNameCon}}</div>
				            			</div>
				            			<div class="publicList">
				            				<label>单位地址：</label>
				            				<input type="text" placeholder="请输入单位地址" v-model="unitAddress" @blur="unitAddressFun()"
                                   maxlength="50"/>
				            				<div class="error-tips-box other">{{unitAddressCon}}</div>
				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">工商营业执照：</label>
				            								            				<div class="fl wh614">
                                <div class="upload-ID" style="position: relative;">
                                  <el-upload
                                    class="upload-demo"
                                    :action="backpicture"
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
				            				<label class="fl">申请函：</label>
				            				<div class="fl wh614">
                              <div class="upload-ID fl" style="position: relative;">
                                <span class="uploadLogo">
                                  <el-upload
                                    class="upload-demo"
                                    :action="backpicture"
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
                        <!--企业法人 end-->
                        <!--企业媒体 start-->
            						<div class="orgTab-con orgType" style="display: none;">
	            							<div class="publicList">
				            				<label>单位名称：</label>
				            				<input type="text" placeholder="请输入单位名称" v-model="unitName" @blur="unitNameFun()"
                                   maxlength="35"/>
				            				<div class="error-tips-box other">{{unitNameCon}}</div>
				            			</div>
				            			<div class="publicList">
				            				<label>单位地址：</label>
				            				<input type="text" placeholder="请输入单位地址" v-model="unitAddress" @blur="unitAddressFun()"
                                   maxlength="50"/>
				            				<div class="error-tips-box other">{{unitAddressCon}}</div>
				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">媒体类型：</label>
				            				<div class="downTxtDiv fl">
					            				<div class="dialog-downMenu flt" @click="statusList2($event)" @click.stop>
									                <span class="defaul_option">{{chooseStatusText}}</span>
									                <i class="icon icon-downMenu"></i>
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
								            </div>
                            <div class="error-tips-box" v-if="chooseStatu">请选择媒体类型</div>
				            			</div>
				            			<div class="publicList clearfix">
				            				<label class="fl">工商营业执照：</label>
				            				<div class="fl wh614">
                                <div class="upload-ID" style="position: relative;">
                                  <el-upload
                                    class="upload-demo"
                                    :action="backpicture"
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
                                     :action="backpicture"
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

				            				  </div>
                              <!--<a href="javascript:;" class="btn-sampleDown" @click="download()">范例下载</a>-->
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
                                    :action="backpicture"
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
                        <!--企业媒体 end-->
            					</div>
            				</span>
          </div>
        </div>
      </div>

      <!--按钮 start-->
      <div class="btnBgBox">
        <button class="btn-defalut btn-blue" @click="confirm()">提交认证</button>
      </div>
      <!--按钮 end-->


      <!-- 弹出框 提交成功和动画加载 start -->
      <MaskTip v-bind:tips="tips"
               v-bind:tipsContent="tipsContent"
               v-bind:tipsImg="tipsImg"
               v-bind:loading="loading"
               @listenToChildEvent="getMaskTip">
      </MaskTip>
      <!--  弹出框 提交成功和动画加载 end -->


      <!--提交成功-->
      <div class="submitSuccessBox" v-if="submitSuccess"><i class="icon-verPic icon-submitSuccess"></i>提交成功</div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import {validateIdCard} from '@/config/util';
  import {mapActions, mapState, mapGetters} from 'vuex';
  import MaskTip from '@/views/module/mask';
  import {checkFileName} from '@/config/util';
  import bus from '@/config/eventBus';

  export default {
    name: 'container',
    data() {
      return {
        name: "",
        realNameTip: false,
        realNameCon: "请输入联系人姓名",
        email: "",
        emailTip: false,
        emailCon: "请输入电子邮箱",
        card: "",
        cardCon: "请输入有效证件号码",
        cardTip: false,
        unitName: "",//单位名称
        unitNameCon: "",
        unitAddress: "",
        unitAddressCon: "",
        imageUrl: "",//身份证的反面背景图
        Justpicture: "",
        backpicture: "",
        imageUrlBack: "",//身份证的正面背景图
        filePicture: "",
        getUser: "",
        radio: "1",//男女“1”代表男 “2“代表女 默认勾选性别：男
        jsutPicture: "",//身份证正面照
        backPicture: "",
        maxlen: "",//最大字节input
        orginShow: false,//组织机构代码证：
        applyShow: false,
        mechanismType: "1",
        openID: "",
        organization: "",//组织单位代码
        organizationUrl: "",
        publicLetterUrl: "",//申请函
        publicLetter: "",//申请函
        justPictureUrl: "",
        backPictureUrl: "",
        statusListShow: false,//媒体类型
        chooseStatusType: "",
        chooseStatusText: "请选择",
        chooseStatu: false, //媒体类型 未选择时候的错误提示
        //事业单位地址
        legalLicenseUrl: "",
        legalLicense: "",
        causeShow: false, // 事业单位媒体中事业单位法人证书文件地址
        certificateShow: false,//事业单位媒体中事业单位法人证书：
        mediaLicenseUrl: "",// 事业单位媒体中媒体许可证
        mediaLicense: "",//事业单位媒体中媒体许可证上传地址
        mediaShow: false,//媒体许可证
        sociologyGroupUrl: "",
        sociologyGroup: "",
        sociologyShow: false,
        businessLicense: "",
        businessLicenseUrl: "",
        circlesShow: false,
        tipsContent: '',
        tipsImg: '',
        tips: false,
        loading: false,
        submitSuccess: false
      };
    },
    mounted() {
      let getUserInfo;
      let getOpenid;
      if (this.getUserInfo) {
        getUserInfo = JSON.parse(this.getUserInfo).userName;
        getOpenid = JSON.parse(this.getUserInfo).openID;
      }
      this.getUser = getUserInfo;
      this.openID = getOpenid;
      //this.Justpicture = "http://localhost:3002/userInformation/upload/"+getOpenid;
      //this.backpicture = "http://localhost:3002/userInformation/upload/"+getOpenid;

      this.Justpicture = "/userInformation/upload/" + getOpenid;
      this.backpicture = "/userInformation/upload/" + getOpenid;
      window.addEventListener('click', this.handleSelect);
      this.chooseStatusTyp = "";
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    components: {
      MaskTip
    },
    created() {

    },
    methods: {
      //身份证正面照
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.justPictureUrl = res.filePath;
        this.jsutPicture = "";
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
        this.imageUrlBack = URL.createObjectURL(file.raw);
        this.backPictureUrl = res.filePath;
        this.backPicture = "";
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
        this.mediaLicense == "";//媒体许可上传文件
        this.mediaLicenseUrl = "";
        this.organization = "";//组织机构代码证上传文件ur
        this.organizationUrl = "";
        this.legalLicense = "";//事业单位法人证书上传文件
        this.legalLicenseUrl = "";
        this.sociologyGroup = "";//企业信息（社会团体登记证书上传文件）
        this.sociologyGroupUrl = "";
        this.publicLetter = "";//申请公函文件
        this.publicLetterUrl = "";
        this.businessLicense = "";
        this.businessLicenseUrl = "";
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
      //组织机构上传凭证
      handleChange(res, file) {
        this.organizationUrl = URL.createObjectURL(file.raw);
        this.organization = res.filePath;
        this.orginShow = false;
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
      //失去焦点 姓名
      handleFocus() {
        var reg = /^[A-Za-z]+$/;
        var reg2 = /^[\u4e00-\u9fa5]+$/;
        var reg3 = /^[A-Z|a-z|\u4e00-\u9fa5]+$/;
        if (!this.name.trim()) {
          this.realNameTip = true;
          this.realNameCon = "请输入联系人姓名"
        } else if (!(reg.test(this.name.trim()) && reg2.test(this.name.trim()))) {
          this.realNameTip = true;
          this.realNameCon = "请输入4-20位字母或2-10位汉字"
          if (reg.test(this.name.trim())) {
            if (this.name.trim().length < 4 || this.name.trim().length > 20) {
              this.realNameTip = true;
              this.realNameCon = "请输入4-20位字母或2-10位汉字"
            } else {
              this.realNameTip = false;

            }
          } else if (reg2.test(this.name.trim())) {
            if (this.name.trim().length < 2 || this.name.trim().length > 10) {
              this.realNameTip = true;
              this.realNameCon = "请输入4-20位字母或2-10位汉字"
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
        } else if (!regs.test(this.email.trim()) || !reg.test(this.email.trim())) {
          this.emailCon = "邮箱格式不正确，请重新输入。";
          this.emailTip = true;
        } else {
          this.emailTip = false;
        }
      },
      //校验身份证
      handleIsJustCard() {
        if (!this.card) {
          this.cardTip = true;
          this.cardCon = "请输入有效证件号码";
          return;
        } else if (!validateIdCard(this.card)) {
          this.cardTip = true;
          this.cardCon = "您输入的身份证号码不合法。";
          return;
        } else {
          this.cardTip = false;
        }
      },
      unitNameFun() {//单位名称
        var reg = /^[A-Z|a-z|\u4e00-\u9fa5]{4,20}$/;
        var reg1 = /^(?![^a-zA-Z]+$)/;
        var reg2 = /^[\u4e00-\u9fa5]{1,35}$/;

        var pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/;//特殊字符
        if (!this.unitName) {
          this.unitNameCon = "请输入单位名称";
          return;
        } else if (pattern.test(this.unitName.trim()[0])) {
          this.unitNameCon = "首字母非特殊字符";
        } else {
          if (this.unitName.trim().length > 2) {
            this.unitNameCon = "";
          } else {
            this.unitNameCon = "请输入3-35个字符";
            return;
          }
          if (this.unitName.indexOf(" ") != -1) {
            this.unitNameCon = "请输入3-35个字符";
            return;
          } else {
            this.unitNameCon = "";
          }
          this.unitNameCon = "";
        }
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
      getMaskTip(isFlag) {
        this.tips = isFlag;
        this.loading = isFlag;
      },
      //确认提交
      confirm() {
        //姓名
        if (!this.name.trim()) {
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
        if (!this.card) {
          this.cardTip = true;
          this.cardCon = "请输入有效证件号码";
          return;
        }
        if (this.imageUrl == "") {
          this.jsutPicture = "请上传身份证正面照片";
          return;
        } else {
          this.jsutPicture = ""
        }
        if (this.imageUrlBack == "") {
          this.backPicture = "请上传身份证反面照片";
          return;
        } else {
          this.backPicture = "";
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
          if (this.organization == "") {
            this.orginShow = true;
            return;
          } else {
            this.orginShow = false;
          }
        } else if (this.mechanismType == "2") {//事业单位
          //事业单位法人证书
          if (this.legalLicense == "") {
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
          if (this.legalLicense == "") {
            this.causeShow = true;
            return;
          } else {
            this.causeShow = false;
          }
          // 媒体许可证
          if (this.mediaLicense == "") {
            this.mediaShow = true;
            return;
          } else {
            this.mediaShow = false;
          }
        } else if (this.mechanismType == "4") {//社会团体
          // 组织机构代码证
          if (this.organization == "") {
            this.orginShow = true;
            return;
          } else {
            this.orginShow = false;
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
          if (this.businessLicense == "") {
            this.circlesShow = true;
            return;
          } else {
            this.circlesShow = false;
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
          if (this.businessLicense == "") {
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
        if(this.realNameTip || this.emailTip || this.cardTip || this.jsutPicture ||
          this.backPicture || this.unitNameCon || this.unitAddressCon ||
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
            name: this.name.trim(),//实名认证（联系人的姓名）
            sex: this.radio,//实名认证（联系人的性别）
            idCard: this.card.trim(),//实名认证（联系人的身份证）
            idCardJust: this.justPictureUrl,
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
             this.tipsContent = "提交成功！";*/

            this.submitSuccess = true;
            /*bus.$emit("userDefinedEvent","this message");*/
            setTimeout(() => {
              this.submitSuccess = false;
              this.$router.replace({
                path: '/home/personalRealName/realNameDetails',
                name: "realNameDetails"
              })
            }, 1500);
          } else {
            /*this.loading =false;
            this.tips = true;//弹框成功提交成功
            this.tipsImg = require("../../assets/img/dialog-failurePic.png");
            this.tipsContent = "提交成功！";*/
            this.submitSuccess = true;
            setTimeout(() => {
              /*this.tips = false;*/
              this.submitSuccess = false;
              this.$router.replace({
                path: '/home/personalRealName/realNameDetails',
                name: "realNameDetails"
              });
            }, 1500);
          }
        }).catch(err => {
          console.log(err)
        })
      },
      download() {
        window.location.href = '/serviceJoin/download?type=download&filePath=/download/申请函范例下载.jpg'
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
    }
  }
</script>
<style scoped>
  @import "../../assets/css/main.css";

  .sexBox {
    position: relative;
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
    margin-top: 2px;
  }

  .upload-ID .avatar-uploader .el-upload {
    width: 188px;
    height: 114px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative !important;
    overflow: hidden;
  }

  .avatar-uploader {
    position: relative;
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
</style>
