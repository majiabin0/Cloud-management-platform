<template>
  <div>
    <div class="app-container">
      <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <div class="restoreApplication">恢复应用</div>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus" >新建项目</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus" @click="dialogFormVisible = true">新建项目群</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="top">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="默认" name="1"></el-tab-pane>
          <el-tab-pane label="创建时间" name="2"></el-tab-pane>
        </el-tabs>
<!--        <span class="title2">默认</span>-->
<!--        <span class="title1">创建时间</span>-->
        <span class="inputSearch">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </span>
      </div>
      <el-drawer
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose">
        <div class="constructionTitle" style="margin-top: 0">基本信息</div>
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="项目名称" class="changeStuff" prop="name">
            <el-input v-model="ruleForm2.name"></el-input>
          </el-form-item>
          <el-form-item label="项目编号" class="changeStuff" prop="name">
            <el-input v-model="ruleForm2.number"></el-input>
          </el-form-item>
          <el-form-item label="项目类型" prop="region">
            <el-select v-model="ruleForm2.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目状态" prop="state">
            <el-select v-model="ruleForm2.state" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间" required @click='handleDialog'>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm2.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker placeholder="选择时间" v-model="ruleForm2.date2" style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <span @click='handleDialogAdmin'>
        <el-form-item label="项目管理员" prop="state" style="float: left"  @click='handleDialog'>
          <el-input v-model="ruleForm2.administrator"></el-input>
        </el-form-item>
          </span>
          <el-form-item label="项目地图" style="margin-left: 395px;">
            <el-select v-model="ruleForm2.state" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目简介" prop="desc">
            <el-input type="textarea" v-model="ruleForm2.desc"></el-input>
          </el-form-item>
          <el-form-item label="项目效果图">
            <!--          上次多张图片-->
            <el-upload
              action="#"
              list-type="picture-card"
              :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url" alt=""
                >
                <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <div class="constructionTitle">参建单位</div>
          <div class="bottomData">
            <span class="bottomData1">单位类型</span>
            <span class="bottomData1">单位名称</span>
            <span class="bottomData1">项目负责人</span>
          </div>
          <div v-for="(item) in list" class="selectChoose">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in item.id"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in item.name"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in item.ctime"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span class="btn btn-warning" @click="del(item.id)"><i class="el-icon-remove-outline"></i></span>
          </div>
          <div class="addItem">
            <el-button type="primary" @click="add">新增</el-button>
          </div>
        </el-form>
        <div style="    float: right;margin-right: 50px;margin-top: 20px;margin-bottom: 25px">
          <el-button @click="drawer = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </div>
      </el-drawer>
      <el-drawer
        :visible.sync="drawerGroup"
        :direction="direction"
        :before-close="handleClose">
        <div class="constructionTitle" style="margin-top: 0">基本信息</div>
        <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="115px" class="demo-ruleForm">
          <el-form-item label="项目群名称" class="changeStuff" prop="projGroupName">
            <el-input v-model="ruleForm1.projGroupName"></el-input>
          </el-form-item>
          <el-form-item label="项目群管理员" class="changeStuff" prop="admin">
            <el-input v-model="ruleForm1.projGroupAdmin"></el-input>
          </el-form-item>
          <el-form-item label="项目群简介" prop="projGroupInfo">
            <el-input type="textarea" v-model="ruleForm1.projGroupInfo"></el-input>
          </el-form-item>
        </el-form>
        <div style="    float: right;margin-right: 50px;margin-top: 200px;margin-bottom: 25px">
          <el-button @click="drawerGroup = false">取 消</el-button>
          <el-button type="primary" @click="submitForm1('ruleForm1')">确 定</el-button>
        </div>
      </el-drawer>
      <el-dialog
        title="设置管理员"
        :visible.sync="dialogVisibleAdmin"
        width="37%"
        :before-close="handleClose">
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" class="treeStyle"></el-tree>
        <el-input v-model="searchAdmin" class="searchAdmin" placeholder="请输入内容"></el-input>
        <div class="bottomDataAdmin">
          <span class="bottomData2">用户</span>
          <span class="bottomData2">单位</span>
        </div>
        <el-radio-group v-model="radio" style="overflow-x: scroll;height: 120px;">
          <el-radio :label="3"><span class="adminName">周一一</span>北京中诺智电有限公司</el-radio>
          <el-radio :label="6"><span class="adminName">周一一</span>北京中诺智电有限公司</el-radio>
          <el-radio :label="9"><span class="adminName">周一一</span>北京中诺智电有限公司</el-radio>
        </el-radio-group>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleAdmin = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisibleAdmin = false">确 定</el-button>
  </span>
      </el-dialog>
      <div class="top">
        <span class="inputSearch">
      <el-input v-model="searchInput" placeholder="请输入内容"></el-input>
          <el-button type="primary" style="margin-left: 20px;    position: absolute;right: -100px;top: 0px;" @click="searchItem">搜索</el-button>
    </span>
        <!--      <span class="title2">全部</span>-->
        <!--      <span class="title1" @click="getList(1)">最近使用</span>-->
        <!--      <span class="title1" @click="getList(2)">我收藏的</span>-->
        <!--      <span class="title1" @click="getList(3)">我管理的</span>-->
      </div>
      <div>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="项目群" name="1">
            <div class="container1" v-for="(item,index) in group" :key="index">
              <div class="container1_header">
                <i class="el-icon-folder-opened icon1" ></i>
                <span style="font-size: 14px">{{item.projGroupName}}</span>
                <span style="    float: right; margin-right: 16px;">
               <i class="el-icon-trophy-1 icon1"></i>
              <span @click="handleIcon1(item,index)">
              <i class="el-icon-star-on icon1" v-if="isShow1&&item.active"style="color: #FF9900" v-else ></i>
                <i class="el-icon-star-on icon1" v-else ></i>
              </span>
                <el-dropdown trigger="click">
      <span class="el-dropdown-link">
      <i class="el-icon-s-tools icon1"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-circle-check" @click.native="restoreGroup(item)">恢复应用</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-check" @click.native="deleteGroup(item)">删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
            </span>
              </div>
              <div class="container1_body">
                <img src="@/assets/404_images/404.png" class="imgItem">
                <div  class="container1_body_content">
                  <div class="itemNum">项目数量</div>
                  <span class="number">{{item.projNum}}</span>个
                </div>
                <div>
                  <div class="itemNum">参建单位</div>
                  <span class="number">{{item.partinNum}}</span>家
                </div>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="项目" name="2">
            <div class="container2" v-for="(item,index) in project" :key="index">
              <div class="container1_header">
                <i class="el-icon-folder-opened icon1" ></i>
                <span style="font-size: 14px">{{item.projName}}</span>
                <span style="    float: right; margin-right: 16px;">
               <i class="el-icon-trophy-1 icon1"></i>
               <span @click="handleIcon2(item)">
                 <i class="el-icon-star-on icon1" v-if="isShow2"></i>
                 <i class="el-icon-star-on icon1" style="color: #FF9900" v-else ></i>
                              </span>
              <el-dropdown trigger="click">
              <span class="el-dropdown-link">
      <i class="el-icon-s-tools icon1"></i>
      </span>
              <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-plus">概况管理</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus">人员管理</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus-outline">组织管理</el-dropdown-item>
        <el-dropdown-item icon="el-icon-check">岗位管理</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-check">封存</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-check">删除</el-dropdown-item>
      </el-dropdown-menu>
              </el-dropdown>
            </span>
              </div>
              <div class="container1_body">
                <img src="@/assets/404_images/404.png" class="imgItem">
                <div  class="container1_body_content">
                  <div class="itemNum2">计划开工时间：{{item.planStartTime}}</div>
                </div>
                <div>
                  <div class="itemNum2">计划完工时间：{{item.planEndTime}}</div>
                </div>
                <div  class="container1_body_content">
                  <div class="itemNum2">计&nbsp划&nbsp总&nbsp工&nbsp期：{{item.planPeriod}}天</div>
                </div>
                <div  class="container1_body_content">
                  <div class="itemNum2">实际开工时间：{{item.projStartTime}}</div>
                </div>
                <div>
                  <div class="itemNum2">已&nbsp开&nbsp工&nbsp天&nbsp数：{{item.projPeriod}}天</div>
                </div>
                <el-progress type="circle" :percentage="25" class="circleView"></el-progress>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div>
      </div>
    </div>
  </div>
</template>

<script>
    import { listQuality, getQuality, delQuality, addQuality, updateQuality, exportQuality, cancleCollectProj, projectlist, collectProj, cancleCollectGroup, collectGroup, groupList, groupAndProjList, projGroup, delGroup, unsealproject } from "@/api/projectView/projectView.js";
    export default {
        name: "Quality",
        data() {
            return {
                id:'',
                name:'',
                index:'',//用于修改
                isShow1:false,
                isShow2:true,
                searchAdmin:'',
                radio: 3,
                value:'',
                user:'',
                input:'',
                childVal:'',
                activeName: '1',
                activeNames: ['1'],
                // 查询参数
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    delFlag:1,
                },
                searchInput:'',
                project:[],
                group:[],
                list:[
                    { id:'1', name:'宝马', ctime:new Date()},
                    { id:'2', name:'奥迪', ctime:new Date()},
                    { id:'3', name:'大众', ctime:new Date()},
                    { id:'4', name:'奔驰', ctime:new Date()}
                ],
                gridData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
                dialogTableVisible: false,
                dialogFormVisible: false,
                dialogVisibleAdmin:false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    administrator:''
                },
                formLabelWidth: '120px',
                ruleForm1: {
                    projGroupInfo: '',
                    projGroupName: '',
                    projGroupAdmin:'',
                    guid:''
                },
                ruleForm2: {
                    projGroupInfo: '',
                    projGroupName: '',
                    admin:'',
                    guid:''
                },
                drawer: false,
                drawerGroup: false,
                direction: 'rtl',
                rules1: {
                    projGroupName: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    projGroupInfo: [
                        { required: true, message: '项目群简介', trigger: 'blur' }
                    ]
                },
                rules2: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '项目群简介', trigger: 'blur' }
                    ]
                },
                treeData: [{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                            label: '三级 1-1-1'
                        }]
                    }]
                }, {
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                        children: [{
                            label: '三级 2-1-1'
                        }]
                    }, {
                        label: '二级 2-2',
                        children: [{
                            label: '三级 2-2-1'
                        }]
                    }]
                }, {
                    label: '一级 3',
                    children: [{
                        label: '二级 3-1',
                        children: [{
                            label: '三级 3-1-1'
                        }]
                    }, {
                        label: '二级 3-2',
                        children: [{
                            label: '三级 3-2-1'
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
            };
        },
        created() {
            this.getList();
            this.getGroupList();
            this.groupAndProjList()
        },
        methods: {
            /** 查询列表 */
            handleClick(tab, event) {
                console.log(tab, event);
                this.loading = true;
                this.queryParams.usedFlag='';
                this.queryParams.adminFlag='';
                this.queryParams.collectFlag='';
                this.queryParams.searchValue='';
                if(tab.name==1){
                    this.queryParams.createFlag=''
                }else if(tab.name==2){
                    this.queryParams.createFlag=1
                }
                this.getGroupList()
            },
            // 查询
            searchItem(){
                this.queryParams.searchValue='';
                this.queryParams.searchValue=this.searchInput;
                this.getGroupList()
            },
            // 获取列表
            getList() {
                this.loading = true;
                // this.queryParams.usedFlag='';
                // this.queryParams.adminFlag='';
                // this.queryParams.collectFlag=''
                //   if(query==1){
                //       this.queryParams.usedFlag=1;
                //   }else if(query==2){
                //       this.queryParams.collectFlag=1
                //   }else if(query==3){
                //       this.queryParams.adminFlag=1
                //   }
                projectlist(this.queryParams).then(response => {
                    this.project = response.rows;
                    console.log(this.project,'this.projectlist')
                    // this.total = response.total;

                    this.loading = false;
                });
            },
            getGroupList() {
                this.loading = true;
                groupList(this.queryParams).then(response => {
                    this.group = response.rows;
                    this.group.map((item,index)=>{
                        // activeGroup:true
                        return Object.assign(item,{active:false})

                    })
                    console.log(this.group,'group')
                    this.loading = false;
                });
            },
            groupAndProjList(){
                this.loading = true;
                groupAndProjList().then(response => {
                    this.treeData = response.data;
                    console.log(this.project,'this.projectlist')
                    console.log(this.group,'group')
                    this.loading = false;
                });
            },
            // 删除项目群
            deleteGroup(item){
                console.log(item.guid,'item')
                delGroup(item.guid).then(response => {
                    if(response.code==200){
                        this.$notify({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getList()
                        this.getGroupList()
                    }
                });
            },
            // 恢复应用
            restoreGroup(item){
                unsealproject({guid:item.guid}).then(response => {
                    if(response.code==200){
                        this.$notify({
                            message: '恢复成功',
                            type: 'success'
                        });
                        this.getList()
                        this.getGroupList()
                    }
                });
            },
            // 收藏
            handleIcon1(item,index){
                console.log(item,'item');
                if(this.isShow1==false){
                    for(let i=0;i<this.group.length;i++){
                        this.group[index].active=true
                    }
                    collectGroup({
                        projGroupId :item.guid
                    }).then(response => {
                        this.$notify({
                            message: '收藏成功',
                            type: 'success'
                        });
                    });
                }else {

                    for(let i=0;i<this.group.length;i++){
                        this.group[index].active=false
                    }
                    cancleCollectGroup({
                        projGroupId:item.guid
                    }).then(response => {
                        this.$notify({
                            message: '取消成功',
                            type: 'success'
                        });
                    });
                }
                console.log(this.group,'this.group')
                this.isShow1=!this.isShow1

            },
            handleIcon2(item){
                if(this.isShow2==false){
                    cancleCollectProj({
                        projId:item.guid
                    }).then(response => {
                        this.$notify({
                            message: '取消成功',
                            type: 'success'
                        });
                    });
                }else {
                    collectProj({
                        projId:item.guid
                    }).then(response => {
                        this.$notify({
                            message: '收藏成功',
                            type: 'success'
                        });
                    });
                }
                this.isShow2=!this.isShow2
            },
            handleChange(val) {
                console.log(val);
            },
            handleDialog(){
                this.dialogFormVisible=true
            },
            getChild (v) {
                this.childVal = v;
            },
            submitForm1(ruleForm1) {
                this.$refs[ruleForm1].validate((valid) => {
                    if (valid) {
                        console.log(localStorage.getItem('filePath'),'filePath')
                        this.ruleForm1.guid=localStorage.getItem('filePath');
                        projGroup(this.ruleForm1).then(response => {
                            this.$notify({
                                message: '收藏成功',
                                type: 'success'
                            });
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            // 删除
            del(id){
                //根据id找索引
                let index= this.list.findIndex(item =>{
                    if (item.id==id){
                        return true
                    }
                })
                //删除数组元素
                this.list.splice(index,1)
            },
            // 增加
            add(){
                this.list.push({id:this.id,name:this.name, ctime:new Date()})
                this.id=this.name=''
            },
            handleRemove(file) {
                console.log(file);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleDownload(file) {
                console.log(file);
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            cancelForm() {
                this.loading = false;
                this.dialog = false;
                clearTimeout(this.timer);
            },
            handleDialogAdmin(){
                this.dialogVisibleAdmin=true
            },
            handleNodeClick(data) {
                console.log(data);
            }
        }
    };
</script>
<style scoped>
  .imgItem{
    width: 168px;
    height: 168px;
  }
  .number{
    font-size: 32px;
    margin: 0 21px;
    margin-left: 32px;
    color: #333333;
  }
  .container1_header{
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    box-shadow: 2px 2px 5px #d9d9d9;
  }
  .container1{
    width: 308px;
    height: 240px;
    border: 1px solid #dddddd;
    color: #666666;
    box-shadow: 2px 2px 8px #d9d9d9;
    margin:12px 0;
    margin-right: 32px;
    float: left;
    background: #fff;
  }
  .container2{
    width: 528px;
    height: 240px;
    border: 1px solid #dddddd;
    color: #666666;
    box-shadow: 2px 2px 8px #d9d9d9;
    margin:12px 0;
    margin-right: 26px;
    float: left;
    background: #fff;
    position: relative;
  }
  .imgItem{
    display: block;
    margin-left: 16px;
    float: left;
  }
  .itemNum{
    margin-bottom: 7px;
    font-size: 12px;
  }
  .itemNum2{
    margin-bottom: 7px;
    font-size: 14px;
  }
  .container1_body_content{
    margin-top: 14px;
    margin-bottom: 11px;
  }
  .icon1{
    margin: 0 5px;
  }
  .title1{
    margin: 0 12px;
    color: #C0C4CC;
    font-size: 14px;
  }
  .title2{
    margin-right: 12px;
  }
  .inputSearch /deep/ .el-input--medium{
    margin-left: 12px;
  }
  .inputSearch{
    display: inline-block;
    position: absolute;
    top: 70px;
    left: 490px;
    width: 12%;
  }
  .top{
    /*border-bottom: 1px solid #ddd;*/
    padding-bottom: 12px;
    margin-bottom: 6px;
  }
  .selectChoose .el-select--medium{
    margin: 5px 15px;
  }
  .addItem{
    text-align: center;
    margin-top: 20px;
  }
  .bottomData{
    text-align: center;
  }
  .bottomDataAdmin{
    text-align: center;
    width: 470px;
    background: #F0F2F5;
    height: 42px;
    line-height: 42px;
  }
  .bottomData1{
    margin: 0 90px;
  }
  .bottomData2{
    margin: 0 50px;
  }
  .bottomData{
    background: #F0F2F5;
    height: 42px;
    line-height: 42px;
  }
  .constructionTitle{
    font-size: 18px;
    margin-left: 15px;
    margin-bottom: 30px;
    margin-top: 40px;
    color: #303133;
  }
  .app-container /deep/ .el-dialog{
    width: 55%;
  }
  .app-container /deep/.el-drawer{
    width: 55%!important;
    overflow-y: scroll;
  }
  .changeStuff /deep/.el-form-item__content{
    width: 48%;
  }
  .selectChoose{
    margin-left: 47px;
  }
  .circleView{
    position: absolute;
    top: 75px;
    right: 20px;
  }
  .treeStyle{
    float: left;
    height: 250px;
    width: 170px;
    padding-left: 10px;
    overflow-x: scroll;
  }
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .searchAdmin{
    width: 300px;
    margin-bottom: 7px;
  }
  .app-container /deep/ .el-radio{
    display: block;
    margin: 18px 8px;
  }
  .adminName{
    margin:0 30px;
  }
  .setting{
    float: right;
    color: #333333;
    margin-right: 18px;
  }
  .icon2{
    margin:0 2px ;
  }
  /*#tags-view-container{*/
  /*  display: none;*/
  /*}*/
  /*#app .main-container{*/
  /*  margin-left: 0!important;*/
  /*}*/
  /*#app .sidebar-container{*/
  /*  display: none;*/
  /*}*/
  .treeLeft{
    float: left;
    height: 1000px;
    margin-right: 50px;
    position: absolute;
    top: 12px;
    z-index: 3000;
  }
  .app-main[data-v-078753dd] {
    position: static!important;

  }
  .app-container {
    padding: 20px;
    /*padding-left: 140px;*/
  }
  .el-tree-node__content {
    cursor: pointer;
    background: #ddd;
    width: 134px;
    height: 60px;
  }
  .restoreApplication{
    background: #13CE66;
    margin-top: 5px;
    height: 35px;
    line-height: 36px;
    text-align: center;
    color: #fff;
    border-radius: 3px;
    -webkit-box-shadow: 2px 2px 8px #d9d9d9;
    box-shadow: 2px 2px 8px #d9d9d9;
    width: 80px;
    margin-bottom: 15px;
  }
</style>
