<template>
  <div style=" overflow-y:scroll;">
    <div class="detailLeft">
      <div class="LeftTitle1">
        {{detailList.qualityPlanInfo}}
      </div>
      <div class="LeftTitle2">
        创建时间：{{detailList.createTime}}
      </div>
      <div class="LeftTitle3">
        创建用户：{{detailList.createBy}}
      </div>
      <div class="eventIntroduce">事件简述：{{detailList.qualityPlanInfo}}</div>
      <div class="eventType">事件类型：{{detailList.qualityPlanType}}</div>
      <div class="eventDegree">事件等级：{{detailList.qualityPlanLevel}}</div>
      <div class="startLine">开始时间：{{detailList.startTime}}</div>
      <div class="deadLine">截止时间：{{detailList.planEndTime}}</div>
      <div class="eventDetail">
        <div class="title">事件详述：</div>
        <div class="itemList">{{detailList.qualityPlanDesc}}</div></div>
      <div class="attachment">
        <div class="title">事件附件：</div>
        <div class="itemList" v-if="detailList.planFileList[0]!=null">
          <div v-for="item in detailList.planFileList">
            <a :href=path+item.filePath  download style="color: #409EFF;">{{item.fileName}}</a>
          </div>
          <!--        {{detailList.filePathList}}-->
        </div>
      </div>
      <div class="replyOn">
        <div class="title" style="clear: both">
          条文引用：
        </div>
        <div class="itemList">
          {{detailList.standardIdList}}
        </div>
      </div>
      <div class="associatedTask">
        <div class="title">关联施工任务：</div>
        <div class="itemList" style="margin-left: 100px">
          {{detailList.constIdList}}
        </div>
      </div>
    </div>
    <div class="detailRight">
    <span class="btn1">
    <el-button type="success" size="small" style="width: 95px;">修改</el-button>
    <el-button type="danger" size="small" style="width: 95px;">删除</el-button>
    </span>
      <span class="btn2">
    <el-button type="primary" size="small" style="width: 95px;margin-right: 10px;" v-if="detailList.dealFlag" @click="dialogVisible = true">处理</el-button>
       <el-button type="primary" size="small" style="width: 95px;margin-right: 10px;" v-else disabled @click="dialogVisible = true">处理</el-button>
      <el-dialog
        title="质控追踪"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
    <el-form :model="form">
    <el-form-item label="说明" :label-width="formLabelWidth">
       <el-input type="textarea" v-model="form.flowContent"></el-input>
    </el-form-item>
    <el-form-item label="图片" :label-width="formLabelWidth">
     <el-upload
       action="https://jsonplaceholder.typicode.com/posts/"
       list-type="picture-card"
       :on-preview="handlePictureCardPreview"
       :on-change="handleChange2"
       :on-remove="handleRemove"
       :auto-upload="false">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisibleImg">
            <img width="100%" :src="dialogImageUrlImg" alt="">
          </el-dialog>
<el-dialog :visible.sync="dialogVisible2">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
    </el-form-item>
         <el-form-item label="附件" :label-width="formLabelWidth">
           <el-upload
             class="upload-demo"
             action="https://jsonplaceholder.typicode.com/posts/"
             :on-change="handleChange"
             :file-list="fileList"
             :auto-upload="false">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
         </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleCancle">发起事件</el-button>
    <el-button type="primary" @click="handlePass">提交</el-button>
  </span>
</el-dialog>
    <el-button type="warning" size="small" style="width: 95px;">导出</el-button>
    </span>
      <div >
        <el-steps :active="2" >
          <el-step :title="item.userName"  icon="el-icon-success" :description="item.dealPersonName+ item.phonenumber+item.dealDeptName" v-for="(item,index) in detailList.planDealList" :key="index">

          </el-step>
        </el-steps>
      </div>
      <div style="height: 300px;margin-top: 108px;">
        <el-steps direction="vertical" :active="1">
          <el-step :title="item.dealTime +item.userName " v-for="(item,index) in detailList.planDealList" :key="index" :description="item.flowContent">
            <template slot="description" >
              <div class="step-row">
                <img  v-for="i in item.picList" :src=path+i.filePath class="imgItem" >
              </div>
              <div class="step-row">
                <div style="float: left">附件：</div>
                <div class="attachmentDownload" v-for="i in item.fileList">
                  <a :href=path+i.filePath download style="color: #409EFF;">{{i.fileName}}</a>
                </div>
              </div>
            </template>
          </el-step>
          <!--          <div class="step1">-->
          <!--            <div v-for="(item,index) in detailList.qualityDealList[1].qualityDealPicList" :key="index">-->
          <!--              <img :src=path+item.filePath class="imgItem">-->
          <!--            </div>-->
          <!--            <div class="attachmentList">-->
          <!--              <div style="float: left">附件：</div>-->
          <!--              <div class="attachmentDownload" v-for="(item,index) in detailList.qualityDealList[1].qualityDealFileList" :key="index">-->
          <!--                <a :href=path+item.filePath download style="color: #409EFF;">{{item.fileName}}</a>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
          <!--          <div class="step2">-->
          <!--            <div v-for="(item,index) in detailList.qualityDealList[1].qualityDealPicList" :key="index">-->
          <!--              <img :src=path+item.filePath class="imgItem">-->
          <!--            </div>-->
          <!--            <div class="attachmentList">-->
          <!--              <div style="float: left">附件：</div>-->
          <!--              <div class="attachmentDownload" v-for="(item,index) in detailList.qualityDealList[1].qualityDealFileList" :key="index">-->
          <!--                <a :href=path+item.filePath download style="color: #409EFF;">{{item.fileName}}</a>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->

        </el-steps>
      </div>
    </div>
  </div>
</template>

<script>
    import { qualityDetail, addAttachs } from "@/api/qualityControl/qualityControl";
    import {  complete, qualityPlanDetail } from "@/api/qualityPlan/qualityPlan";
    export default {
        name: "index",
        data(){
            return{
                dialogImageUrlImg: '',
                dialogVisible: false,
                dialogVisibleImg: false,
                form: {
                    flowContent: '',
                    agree:'',
                    pic:'',
                    file:'',
                    processInstanceId:''
                },
                path:process.env.VUE_APP_BASE_API,
                guid:'',
                formLabelWidth: '120px',
                dialogImageUrl: '',
                dialogVisible2: false,
                disabled: false,
                detailList:{},
                // 附件列表
                fileList: [],
                // 允许的文件类型
                fileType: ['xls', 'xlsx', 'pdf', 'doc', 'docx', 'txt', 'jpg', 'png', 'jpeg'],
                approvalProcessProject:[
                    {id:'0',label: "方案制定"},
                    { id:'1',label: "割接方案会审"},
                    { id:'2',label: "割接审批"},
                    { id:'3',label: "审批成功"},
                ],

            }
        },
        created(){
            this.guid=this.$route.query.guid;
            this.getList();
        },
        methods:{
            getList() {
                // this.loading = true;
                // this.guid='88ad0f2f-e2ba-4005-8ad6-4430925403c5'
                console.log(this.guid,'this.guid')
                qualityPlanDetail(this.guid).then(
                    response => {
                        this.detailList = response.data;
                        console.log(this.detailList,'qualityDealList')
                        console.log('detailList.qualityDealList[1].qualityPicList',this.detailList.qualityDealList)
                    }
                );
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                console.log(file,'file')
                this.dialogImageUrlImg = file.url;
                this.dialogVisibleImg = true;
                console.log( this.dialogImageUrlImg)
            },
            // 上传附件
            handleChange(file, fileList) {
                console.log(file,fileList)
                this.form.file = fileList.slice(-3);
                console.log(fileList,'console.log(file,fileList)')
                let arr = [];
                fileList.forEach(function(item) {
                    let outObj = {};
                    outObj = item.raw;
                    arr.push(outObj);
                });
                this.list = arr;
                // 上送给后台用formData
                let formData = new FormData();
                console.log(this.list,'this.list')
                this.list.forEach(item => {
                    formData.append('files', item);
                });
                // console.log(fd,this.Blob)
                addAttachs(formData).then(res => {
                    let lifePhoto=res.data
                    let photo=[];
                    console.log(lifePhoto,'lifePhoto')
                    for(let i=0;i<lifePhoto.length;i++){
                        photo.push(lifePhoto[i].guid)
                    }
                    this.form.file=photo
                });
            },
            // 上传图片
            handleChange2(file, fileList) {
                console.log(file,fileList)
                this.form.file = fileList.slice(-3);
                console.log(this.fileList,'console.log(file,fileList)')
                let arr = [];
                fileList.forEach(function(item) {
                    let outObj = {};
                    outObj = item.raw;
                    arr.push(outObj);
                });
                this.list = arr;
                // 上送给后台用formData
                let formData = new FormData();
                console.log(this.list,'this.list')
                this.list.forEach(item => {
                    formData.append('files', item);
                });
                // console.log(fd,this.Blob)
                addAttachs(formData).then(res => {
                    let lifePhoto=res.data
                    let photo=[];
                    console.log(lifePhoto,'lifePhoto')
                    for(let i=0;i<lifePhoto.length;i++){
                        photo.push(lifePhoto[i].guid)
                    }
                    this.form.pic=photo
                });
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            // 完善信息成功
            handlePass(){
                this.form.agree=true;
                this.form.processInstanceId=this.detailList.processInstanceId
                complete(this.form).then(
                    response => {
                        this.$notify({
                            message: '成功',
                            type: 'success'
                        });
                        // this.detailList = response.data;
                        // console.log(this.detailList.qualityDealList[1].pictureUrlList,'qualityDealList')
                        this.dialogVisible = false
                    }
                );
            },
            handleCancle(){
                this.form.agree=false;
                complete(this.form).then(
                    response => {
                        // this.detailList = response.data;
                        // console.log(this.detailList.qualityDealList[1].pictureUrlList,'qualityDealList')
                        this.dialogVisible = false
                    }
                );
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            }
        }
    }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .detailLeft{
    width: 48%;
    float: left;
    margin: 40px;
    /*overflow-y:scroll;*/
  }
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .detailRight{
    /*overflow-y:scroll;*/
    height: 1000px;
  }
  .LeftTitle1{
    font-size: 20px;
    color: #666666;
  }
  .LeftTitle2{
    font-size: 14px;
    color: #666666;
    margin: 24px 130px 24px 0;
    float: left;
  }
  .LeftTitle3{
    font-size: 14px;
    color: #666666;
    margin: 24px 35px 24px 0;
  }
  .eventIntroduce, .eventType, .deadLine, .startLine, .eventDegree, .eventDetail, .associatedTask, .replyOn, .attachment{
    font-size: 14px;
    color: #666666;
    margin: 22px 0;
  }
  .associatedTask{
    clear: both;
  }
  .startLine{
    width: 300px;
    float: left;
    margin-top: 0;
  }
  .eventType{
    width: 300px;
    float: left;
    margin-top: 0;
  }
  .btn1{
    display: inline-block;
    margin: 35px 0;
  }
  .btn2{
    display: inline-block;
    margin: 35px 0;
    float: right;
    margin-right: 50px;
  }
  /deep/.el-step__title, /deep/.el-step__description {
    color: #666666;
  }
  /deep/.el-steps--vertical{
    height: 230%;
    position: relative;
  }
  .step1{
    margin-top: -111px;
    margin-left: 35px;
    margin-bottom: 50px;
  }
  .step2{
    margin-top: -590px;
    margin-left: 35px;
  }
  .step3{
    margin-top: -210px;
    margin-left: 35px;
  }
  .imgItem{
    width: 58px;
    height: 58px;
    margin-right: 12px;
    margin-bottom: 10px;
  }
  .attachmentDownload{
    margin-left: 38px;
    line-height: 18px;
    color: #409EFF;
  }
  .attachmentList{
    font-size: 12px;
  }
  .attachment{
    clear: both;
  }
  .title{
    float: left;
    margin-left: 0px;
    margin-bottom: 20px;
  }
  .itemList{
    margin-left: 70px;
  }
  /deep/.el-step__description{
    /*width: 103px;*/
  }

</style>

