<template>
  <div>
  <div class="treeLeft">
    <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
  <div class="app-container">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <el-button type="primary">新&nbsp&nbsp&nbsp&nbsp建</el-button>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-plus" @click.native="handleDrawer">新建项目</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus" @click.native="drawerGroup = true">新建项目群</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="setting">
      <span style="margin: 0 35px;"><i class="el-icon-s-tools icon2"></i>配置</span>
      <router-link to="/sealedBox">
        <span><i class="el-icon-box icon2"></i>封存箱</span>
      </router-link>
    </div>
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose">
      <div class="constructionTitle" style="margin-top: 0">基本信息</div>
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <userAvatar  @fromChild="getChild" :user="user" style="position: absolute;right: 143px;top: 95px;" />
        <el-form-item label="项目名称" class="changeStuff" prop="projName">
          <el-input v-model="ruleForm2.projName"></el-input>
        </el-form-item>
        <el-form-item label="项目编号" class="changeStuff">
          <el-input v-model="ruleForm2.projGroupId"></el-input>
        </el-form-item>
        <el-form-item label="项目类型" prop="projType">
          <el-select v-model="ruleForm2.projType" placeholder="请选择项目类型">
            <el-option
                       :label="item.dictLabel"
                       :value="item.dictValue"
                       v-for="item in proj_type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目状态" prop="projStatus">
          <el-select v-model="ruleForm2.projStatus" placeholder="请选择项目状态">
            <el-option
              :label="item.dictLabel"
              :value="item.dictValue"
              v-for="item in proj_status"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目时间" @click='handleDialog'>
          <div class="block">
            <el-date-picker
              v-model="ruleForm2.time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"

              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </el-form-item>
        <span @click='handleDialogAdmin'>
        <el-form-item label="项目管理员" prop="state" style="float: left"  @click='handleDialog'>
          <el-input v-model="ruleForm2.administrator"></el-input>
        </el-form-item>
          </span>
        <el-form-item label="项目地图" style="margin-left: 395px;">
          <el-select v-model="ruleForm2.state" placeholder="请选择项目区域">
            <el-option label="区域一" value="1"></el-option>
            <el-option label="区域二" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目简介">
          <el-input type="textarea" v-model="ruleForm2.desc"></el-input>
        </el-form-item>
        <el-form-item label="项目效果图">
          <!--          上次多张图片-->
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-change="handleChange2"
            :on-remove="handleRemove"
            :auto-upload="false"
          >
            <i class="el-icon-plus"></i>
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
        <div v-for="(item) in deptPartinList" class="selectChoose">
          <el-select v-model="item.partType" placeholder="请选择">
            <el-option
              v-for="item in partinList"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue">
            </el-option>
          </el-select>
          <el-select v-model="item.deptId" placeholder="请选择">
            <el-option
              v-for="item in corpList"
              :key="item.value"
              :label="item.deptName"
              :value="item.deptId">
            </el-option>
          </el-select>
          <el-select v-model="item.headId" placeholder="请选择">
            <el-option
              v-for="item in userDataList"
              :key="item.userId"
              :label="item.nickName"
              :value="item.userId">
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
              <el-button type="primary" @click="submitProject('ruleForm')">确 定</el-button>
            </div>
    </el-drawer>
    <el-drawer
      :visible.sync="drawerGroup"
      :direction="direction"
      :before-close="handleClose">
      <div class="constructionTitle" style="margin-top: 0">基本信息</div>
      <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="115px" class="demo-ruleForm">
        <userAvatar :user="user" style="position: absolute;right: 143px;top: 95px;" />
        <el-form-item label="项目群名称" class="changeStuff" prop="projGroupName">
          <el-input v-model="ruleForm1.projGroupName"></el-input>
        </el-form-item>
        <el-form-item label="项目群管理员" class="changeStuff" prop="projGroupAdmin">
          <el-input v-model="ruleForm1.projGroupAdmin"></el-input>
        </el-form-item>
        <el-form-item label="项目群简介">
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
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name=""></el-tab-pane>
        <el-tab-pane label="最近使用" name="1"></el-tab-pane>
        <el-tab-pane label="我收藏的" name="2"></el-tab-pane>
        <el-tab-pane label="我管理的" name="3"></el-tab-pane>
      </el-tabs>
      <span class="inputSearch">
      <el-input v-model="searchInput" placeholder="请输入内容"></el-input>
          <el-button type="primary" style="margin-left: 20px;    position: absolute;right: -150px;top: 0px;" @click="searchItem">搜索</el-button>
    </span>
<!--      <span class="title2">全部</span>-->
<!--      <span class="title1" @click="getList(1)">最近使用</span>-->
<!--      <span class="title1" @click="getList(2)">我收藏的</span>-->
<!--      <span class="title1" @click="getList(3)">我管理的</span>-->
    </div>
    <div>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="项目群" name="1">
          <div>
            <div class="container1" v-for="(item,index) in group" :key="index">
              <div class="container1_header">
                <i class="el-icon-folder-opened icon1" ></i>
                <span style="font-size: 14px">{{item.projGroupName}}</span>
                <span style="    float: right; margin-right: 16px;">
               <i class="el-icon-trophy-1 icon1" style="color: #FF9900" v-if="item.adminFlag"></i>
              <span @click="handleIcon1(item,index)">
              <i class="el-icon-star-on icon1" v-if="item.collectFlag==1"style="color: #FF9900" ></i>
<!--                <i class="el-icon-star-on icon1" v-else-if="item.collectFlag==1"style="color: #FF9900" ></i>-->
                <i class="el-icon-star-on icon1" v-else ></i>
              </span>
                <el-dropdown trigger="click" v-if="item.adminFlag">
      <span class="el-dropdown-link">
      <i class="el-icon-s-tools icon1"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-plus">概况管理</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus" @click.native="hreftwo(item.guid)">人员管理</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus-outline" @click.native="hreftwo1(item.guid)">组织管理</el-dropdown-item>
        <el-dropdown-item icon="el-icon-check">岗位管理</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-check" @click.native="sealedGroup(item)">封存</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-check" @click.native="deleteGroup(item)">删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown >
            </span>
              </div>
              <div class="container1_body">
                <img :src="path+item.groupCoverPicUrl" v-if="item.groupCoverPicUrl" class="imgItem">
                <img src="@/assets/404_images/404.png" v-else class="imgItem">
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
            <div>
              <div @click="loadMore" class="loadMore" v-if="showNum">加载更多</div>
              <div  class="loadMore" v-else>没有更多了</div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="项目" name="2">
          <div class="container2" v-for="(item,index) in project" :key="index">
            <div class="container1_header">
              <i class="el-icon-folder-opened icon1" ></i>
              <span style="font-size: 14px">{{item.projName}}</span>
              <span style="    float: right; margin-right: 16px;">
               <i class="el-icon-trophy-1 icon1" style="color: #FF9900" v-if="item.adminFlag"></i>
               <span @click="handleIcon2(item,index)">
                <i class="el-icon-star-on icon1" v-if="item.collectFlag==1"style="color: #FF9900" ></i>
                 <!--                <i class="el-icon-star-on icon1" v-else-if="item.collectFlag==1"style="color: #FF9900" ></i>-->
                <i class="el-icon-star-on icon1" v-else ></i>
                 <div>

                 </div>
                              </span>
              <el-dropdown trigger="click"  v-if="item.adminFlag">
              <span class="el-dropdown-link">
      <i class="el-icon-s-tools icon1"></i>
      </span>
              <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-plus">概况管理</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus"  @click.native="hreftwo2(item.guid)">人员管理</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus-outline" @click.native="hreftwo3(item.guid)">组织管理</el-dropdown-item>
        <el-dropdown-item icon="el-icon-user-solid" @click.native="hreftwo4(item.guid)">角色管理</el-dropdown-item>
        <el-dropdown-item icon="el-icon-check">岗位管理</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-check">封存</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-check" @click.native="deleteProj(item)">删除</el-dropdown-item>
      </el-dropdown-menu>
              </el-dropdown>
            </span>
            </div>
            <div class="container1_body">
              <img :src="path+item.projCoverPicUrl" v-if="item.projCoverPicUrl" class="imgItem" alt="项目图片">
              <img src="@/assets/404_images/404.png" v-else class="imgItem">
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
              <el-progress type="circle" :percentage="item.projPeriod" class="circleView"></el-progress>
            </div>
          </div>
          <div>
            <div @click="loadMore2" class="loadMore" v-if="showNum2">加载更多</div>
            <div  class="loadMore" v-else>没有更多了</div>
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
import { listQuality, getQuality, delQuality, addQuality, updateQuality, exportQuality, cancleCollectProj, projectlist, collectProj, cancleCollectGroup, collectGroup, groupList, groupAndProjList, projGroup, delGroup, proj, sealedproject, delProj, userList, corpList, listByCompany  } from "@/api/projectView/projectView";
import { addAttachs } from "@/api/qualityControl/qualityControl";
import userAvatar from "../system/user/profile/Avatar";
import Vue from 'vue'
export default {
  name: "Quality",
    components: { userAvatar },
  data() {
    return {
        id:'',
        name:'',
        index:'',//用于修改
        isShow1:false,
        isShow2:false,
        isShow3:true,
        isShow4:true,
        searchAdmin:'',
        radio: 3,
        value:'',
        user:'',
        input:'',
        childVal:'',
        activeName: '',
        activeNames: ['1'],
        path:process.env.VUE_APP_BASE_API,
        // scroll
        busy: true, //
        // 查询参数
        queryParams: {
            pageNum: 1,
            pageSize: 30,
            usedFlag:'',
            searchValue:'',
        },
        // 查询参数
        queryParams2: {
            pageNum: 1,
            pageSize: 15,
            usedFlag:'',
            searchValue:'',
        },
        searchInput:'',
        project:[],
        group:[],
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
            state:'',
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
            projName: '',
            admin:'',
            guid:''
        },
        partinList:{},
        userDataList:{},
        corpList:{},
        headId:'',
        partType:'',
        deptId:'',
        deptPartinList:[
            { partType:'', deptId:'', headId:''},
        ],
        deptList: { partType:'', deptId:'', headId:''},
        drawer: false,
        drawerGroup: false,
        showNum:true,
        showNum2:true,
        direction: 'rtl',
        showList:false,
        num:'',
        value2:'',
        // 项目状态
        proj_status:[],
        // 项目类型
        proj_type:[],
        pickerOptions: {
            shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近一个月',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近三个月',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                }
            }]
        },
        rules1: {
            projGroupName: [
                { required: true, message: '请输入项目群名称', trigger: 'blur' },
            ],
            projGroupAdmin:[
                { required: true, message: '请输入项目群管理员', trigger: 'blur' },
            ],
            region: [
                { required: true, message: '请选择项目区域', trigger: 'change' }
            ],
            date1: [
                { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            date2: [
                { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
            ],
            type: [
                { type: 'array', required: true, message: '请至少选择一个项目性质', trigger: 'change' }
            ],
            resource: [
                { required: true, message: '请选择项目资源', trigger: 'change' }
            ],
            projGroupInfo: [
                { required: true, message: '项目群简介', trigger: 'blur' }
            ]
        },
        rules2: {
            projName: [
                { required: true, message: '请输入项目名称', trigger: 'blur' },
            ],
            projType: [
                { required: true, message: '请选择项目类型', trigger: 'change' }
            ],
            projStatus: [
                { required: true, message: '请选择项目状态', trigger: 'change' }
            ],
            date1: [
                { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            date2: [
                { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
            ],
            type: [
                { type: 'array', required: true, message: '请至少选择一个项目性质', trigger: 'change' }
            ],
            resource: [
                { required: true, message: '请选择项目资源', trigger: 'change' }
            ],
            desc: [
                { required: true, message: '项目群简介', trigger: 'blur' }
            ]
        },
        treeData: [],
        data:[],
        defaultProps: {
            children: 'children',
            label: 'label'
        },
    };
  },
    mounted(){
        document.getElementsByTagName("body")[0].className="equipment-body";
    },
    beforeDestroy(){
        document.body.removeAttribute("class","equipment-body");
    },
  created() {
      this.getDicts("proj_type").then(response => {
          this.proj_type = response.data;
      });
      this.getDicts("proj_status").then(response => {
          this.proj_status = response.data;
      });
    this.getList();
    this.getGroupList();
    this.groupAndProjList()
  },
  methods: {
    hreftwo(guid){
      console.log(111)
      this.$router.push({path: "/userControl",query:{guid}})

    },
    hreftwo1(guid){
      console.log(111)
      this.$router.push({path: "/orgControl",query:{guid}})

    },
      hreftwo2(guid){

      this.$router.push({path: "/projectUserControl",query:{guid}})

    },
     hreftwo3(guid){

      this.$router.push({path: "/projorgControl",query:{guid}})

    },
      hreftwo4(guid){

      this.$router.push({path: "/projRole",query:{guid}})

    },
      // 上传图片
      handleChange2(file, fileList) {
          console.log(file,fileList);
          this.ruleForm2.pic = fileList.slice(-3);
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
              this.ruleForm2.pic=photo
          });
          // this.ruleForm1.append(pic,fd)
      },
      handlePictureCardPreview2(file) {
          console.log(file,'file')
          this.dialogImageUrlImg = file.url;
          this.dialogVisibleImg = true;
          console.log( this.dialogImageUrlImg)
      },
    /** 查询列表 */
    handleClick(tab, event) {
        console.log(tab, event);
        this.loading = true;
        this.queryParams.usedFlag='';
        this.queryParams.adminFlag='';
        this.queryParams.collectFlag='';
        this.queryParams.searchValue='';
        this.queryParams2.usedFlag='';
        this.queryParams2.adminFlag='';
        this.queryParams2.collectFlag='';
        this.queryParams2.searchValue='';
        if(tab.name==1){
            this.queryParams.usedFlag=1;
            this.queryParams2.usedFlag=1;
        }else if(tab.name==2){
            this.queryParams.collectFlag=1;
            this.queryParams2.collectFlag=1
        }else if(tab.name==3){
            this.queryParams.adminFlag=1;
            this.queryParams2.adminFlag=1
        }
        this.showList=true
        this.getGroupList();
        this.getList2();
    },
      // 查询
      searchItem(){
          this.queryParams.searchValue='';
          this.queryParams.searchValue=this.searchInput;
          this.getGroupList();
          this.showList=true
      },
    modFoat(num) {
        console.log(num,'this.showNum')
    var _max = parseInt(num) + 1;
    if( _max - num < 1 ) {
        num=_max;
    }
    this.num=num
    // return num;

    console.log(num,'num');
     },
      // 项目群列表
      getGroupList() {
          this.loading = true;
          groupList(this.queryParams).then(response => {
              // this.group = response.rows;
              let num=response.total/30;
              this.modFoat(num)
              if(this.queryParams.pageNum>this.num) {
                  this.showNum=false
              }else {
                  this.showNum=true
              }
              if(this.showNum==true&&this.showList==false){
                  this.group=[...this.group, ...response.rows];
              }else {
                  this.group = response.rows;
              }
              this.showList=false
              console.log(this.group,'group')
              this.loading = false;
              this.group.map((item,index)=>{
                  // activeGroup:true
                  return Object.assign(item,{active:false})

              })
          });
      },
      // 项目列表
      getList2() {
          this.loading = true;
          projectlist(this.queryParams2).then(response => {
              this.project = response.rows;
              this.showList=false
              console.log(this.project,'this.project')
              this.loading = false;
          });
      },
      // 项目列表
      getList() {
          this.loading = true;
          projectlist(this.queryParams2).then(response => {
              console.log(this.showList,'this.showList')
              // this.project = response.rows;
              console.log(this.project,'this.projectlist')
              let num=response.total/30;
              this.modFoat(num)
              if(this.queryParams2.pageNum>this.num) {
                  this.showNum2=false
              }else {
                  this.showNum2=true
              }
              if(this.showNum2==true&&this.showList==false){
                  this.project=[...this.project, ...response.rows];
              }else {
                  this.project = response.rows;
              }
              this.showList=false
              this.project.map((item,index)=>{
                  // activeGroup:true
                  return Object.assign(item,{active:false})

              })
              console.log(this.project,'this.project')
              this.loading = false;
          });
      },
      // 获取项目群列表
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
              }
              this.getGroupList()
              this.showList=true
          });
      },
      // 删除项目
      deleteProj(item){
          console.log(item.guid,'item')
          delProj(item.guid).then(response => {
              if(response.code==200){
                  this.$notify({
                      message: '删除成功',
                      type: 'success'
                  });
              }
              this.getList()
              this.showList=true
          });
      },
      // 打开项目
      handleDrawer(){
        this.drawer=true;
          this.getDicts("partin_dept_type").then(response => {
              this.partinList = response.data;
          });
          listByCompany().then(response => {
              this.userDataList = response.rows;
          });
          corpList().then(response => {
              this.corpList = response.data;
          });
      },
      sealedGroup(item){
          console.log(item.guid,'item')
          sealedproject({guid:item.guid}).then(response => {
              if(response.code==200){
                  this.$notify({
                      message: '封存成功',
                      type: 'success'
                  });
              }
              this.getGroupList()
              this.showList=true
          });
      },
      // 当属性滚动的时候  加载  滚动加载
      loadMore () {
          this.queryParams.pageNum++ // 增加页数
          this.getGroupList() // 请求数据
      },
      loadMore2(){
          this.queryParams2.pageNum++ // 增加页数
          this.getList() // 请求数据
      },
      // 收藏
      handleIcon1(item,index){
          if(item.collectFlag==0){
              // for(let i=0;i<this.group.length;i++){
              //     this.group[index].active=true
              // }
              collectGroup({
                  projGroupId :item.guid
              }).then(response => {
                  this.$notify({
                      message: '收藏成功',
                      type: 'success'
                  });
                  this.getGroupList()
                  this.showList=true
              });
          }else {

          //     for(let i=0;i<this.group.length;i++){
          //     this.group[index].active=false
          // }
              cancleCollectGroup({
                  projGroupId:item.guid
              }).then(response => {
                  this.$notify({
                      message: '取消成功',
                      type: 'success'
                  });
                  this.getGroupList()
                  this.showList=true
              });
          }

      },
      // 收藏
      handleIcon2(item,index){
          if(item.collectFlag==0){
              // for(let i=0;i<this.group.length;i++){
              //     this.group[index].active=true
              // }
              collectProj({
                  projId :item.guid
              }).then(response => {
                  this.$notify({
                      message: '收藏成功',
                      type: 'success'
                  });
                  this.getList()
                  this.showList=true
              });
          }else {

              //     for(let i=0;i<this.group.length;i++){
              //     this.group[index].active=false
              // }
              cancleCollectProj({
                  projId:item.guid
              }).then(response => {
                  this.$notify({
                      message: '取消成功',
                      type: 'success'
                  });
                  this.getList()
                  this.showList=true
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
      // 新建
      submitForm1(ruleForm1) {
          this.$refs[ruleForm1].validate((valid) => {
              if (valid) {
                  console.log(localStorage.getItem('filePath'),'filePath')
                  this.ruleForm1.guid=localStorage.getItem('filePath');
                  projGroup(this.ruleForm1).then(response => {
                      this.$notify({
                          message: '新建成功',
                          type: 'success'
                      });
                      this.drawerGroup = false
                  });
              } else {
                  console.log('error submit!!');
                  return false;
              }
          });
      },
      // 新建
      submitProject(ruleForm) {
        if(this.ruleForm2.time!=undefined){
            this.ruleForm2.projStartTime=this.ruleForm2.time[0]
            this.ruleForm2.projEndTime=this.ruleForm2.time[1]
        }
          this.ruleForm2.deptPartinList=this.deptPartinList
          console.log(this.ruleForm2,'ruleForm2')
          this.$refs[ruleForm].validate((valid) => {
              if (valid) {
                  console.log(localStorage.getItem('filePath'),'filePath')
                  this.ruleForm2.guid=localStorage.getItem('filePath');
                  proj(this.ruleForm2).then(response => {
                      this.$notify({
                          message: '新建成功',
                          type: 'success'
                      });
                      this.drawer=false
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
          let index= this.deptPartinList.findIndex(item =>{
              if (item.id==id){
                  return true
              }
          })
          //删除数组元素
          this.deptPartinList.splice(index,1)
      },
      // 增加
      add(){
          this.deptPartinList.push({ partType:'', deptId:'', headId:''})
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
          // console.log(data);
      },

  }
};
</script>
<style>
  .equipment-body .sidebar-container{
    display: none!important;
  }
  .equipment-body .is-current{
    background: red;
  }
  .is-current .el-tree-node__content{
    background: #2b2f3a!important;
    color: #FFFFFF!important;
  }
</style>
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
    margin-right: 24px;
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
    margin-right: 10px;
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
    font-size: 15px;
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
    margin-left: 73px;
  }
  .inputSearch{
    display: inline-block;
    position: absolute;
    top: 54px;
    left: 390px;
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
    text-align: center;
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
  #tags-view-container{
    display: none;
  }
  #app .main-container{
    margin-left: 0!important;
  }
  .treeLeft{
    height: 1000px;
    margin-right: 50px;
    top: 12px;
    position: fixed;
    left: 0;
    overflow-y: scroll;
  }
  .navbar{
    margin-left: 175px;
  }
  .app-main[data-v-078753dd] {
    position: static!important;

  }
  .app-container {
    /*padding: 20px;*/
    /*padding-left: 190px;*/
  }
  /deep/.el-tree-node__content {
    cursor: pointer;
    background: #ddd;
    width: 183px;
    height: 60px;
  }
  .loadMore{
    width: 150px;
    text-align: center;
    margin: 0 auto;
    clear: both;
    padding-top: 30px;
  }
  /deep/.is-finish{
    width: 66px;
  }
  /deep/.el-tree-node__content {
    cursor: pointer;
    background: #304156;
    width: 183px;
    height: 48px;
    padding-left: 0px;
    color: #c6c0c0;
  }
</style>
