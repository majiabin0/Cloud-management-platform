<template>
  <div style=" overflow-y:scroll;">
    <div class="detailLeft">
      <div class="constructionTitle" style="margin-top: 0">基本信息</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="汇报标题" prop="reportTitle">
          <el-input v-model="ruleForm.reportTitle"></el-input>
        </el-form-item>
        <el-form-item label="汇报日期" required>
          <el-date-picker
            v-model="ruleForm.reportStartTime"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="汇报内容" >
<!--          <el-input type="textarea" v-model="ruleForm.reportInfo"></el-input>-->
          <quill-editor ref="text" v-model="ruleForm.reportInfo" class="myQuillEditor" :options="editorOption" />
        </el-form-item>
        <div v-if="reportType==0">
          <div class="constructionTitle">人员投入</div>
          <div class="bottomData">
            <span class="bottomData1">单位类型</span>
            <span class="bottomData1">单位名称</span>
            <span class="bottomData1">项目负责人</span>
          </div>
          <div v-for="(item) in personList" class="selectChoose">
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
        </div>
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>-->
<!--          <el-button @click="resetForm('ruleForm')">重置</el-button>-->
<!--        </el-form-item>-->
        <div v-if="reportType==0">
          <div class="constructionTitle">设备投入</div>
          <div class="bottomData">
            <span class="bottomData1">单位类型</span>
            <span class="bottomData1">单位名称</span>
            <span class="bottomData1">项目负责人</span>
          </div>
          <div v-for="(item) in equipmentList" class="selectChoose">
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
            <span class="btn btn-warning" @click="del2(item.id)"><i class="el-icon-remove-outline"></i></span>
          </div>
          <div class="addItem">
            <el-button type="primary" @click="add2">新增</el-button>
          </div>
        </div>
        <div style="    float: right;margin-right: 50px;margin-top: 90px;margin-bottom: 25px">
          <el-button @click="drawer = false">取 消</el-button>
          <el-button type="warning" @click="submitProject('ruleForm')">暂 存</el-button>
          <el-button type="primary" @click="submitProject('ruleForm')">提 交</el-button>

        </div>
        <el-dialog title="提交汇报" :visible.sync="dialogFormVisible">
          <el-switch
            v-model="ruleForm.visibleFlag"
            active-text="有限范围"
            inactive-text="公开范围"
            @change="handleSwitch"
            style="display: inline;
    margin-right: 50px;
    margin-left: 0px;
    margin-bottom: 20px;
margin-top: 12px;
">
          </el-switch>
          <el-checkbox v-model="checked" style="display: inline" >最近选择的有限范围</el-checkbox>
          <div v-if="ruleForm.visibleFlag">
          <div style="clear: both;margin-top: 17px;border: 1px solid #ddd;    height: 50px;
    padding: 5px 10px;">
            <el-tag
              :key="tag.roleId"
              v-for="tag in check2"
              closable
              :disable-transitions="false"
              v-if="isCheck2"
              @close="handleClose(tag)">
              {{tag.value}}
            </el-tag>
            <el-tag
              :key="tag.roleId"
              v-for="tag in check3"
              closable
              :disable-transitions="false"
              v-if="isCheck3"
              @close="handleClose(tag)">
              {{tag.value}}
            </el-tag>
            <el-tag
              :key="tag.roleId"
              v-for="tag in check4"
              closable
              :disable-transitions="false"
              v-if="isCheck4"
              @close="handleClose(tag)">
              {{tag.value}}
            </el-tag>
            <el-tag
              :key="tag.roleId"
              v-for="tag in check5"
              v-if="isCheck5"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag.value}}
            </el-tag>
            <el-tag
              :key="tag.roleId"
              v-for="tag in check6"
              v-if="isCheck6"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag.value}}
            </el-tag>
            <el-tag
              :key="tag.roleId"
              v-for="tag in check7"
              v-if="isCheck7"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag.value}}
            </el-tag>

            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
<!--            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag1111111111</el-button>-->
          </div>
          <div>
            <el-autocomplete
              class="inline-input"
              v-model="state2"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
          </div>
          <el-radio-group v-model="tabPosition" @change="handleTab">
            <el-radio-button label="1">最近</el-radio-button>
            <el-radio-button label="2">用户</el-radio-button>
            <el-radio-button label="3">组织</el-radio-button>
            <el-radio-button label="4">群组</el-radio-button>
          </el-radio-group>
          <div v-if="tabPosition==1" class="tabChange">
            <div>
              <div class="itemName">用户：</div>
              <el-checkbox-group v-model="checkList1"  @change="handleCheck">
                <el-checkbox :label="item" v-for="item in recentRole">{{item.roleName}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <div>
              <div class="itemName">组织:</div>
              <el-checkbox-group v-model="checkList2" @change="handleCheck">
                <el-checkbox :label="item" v-for="item in recentDept">{{item.deptName}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <div>
              <div class="itemName">群组：</div>
              <el-checkbox-group v-model="checkList3" @change="handleCheck3">
                <el-checkbox :label="item" v-for="item in recentUser">{{item.userName}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div v-if="tabPosition==2" class="tabChange">
            <el-checkbox-group v-model="checkList4" @change="handleCheck4">
              <el-checkbox :label="item" v-for="item in userListData">{{item.userName}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div v-if="tabPosition==3" class="tabChange">
            <el-tree
              @check-change="handleTree"
              :data="treeData"
              show-checkbox
              node-key="id"
              :props="defaultProps">
            </el-tree>
          </div>
          <div v-if="tabPosition==4" class="tabChange">
            <!--          <el-checkbox-group v-model="checkList4" @change="test">-->
            <!--            <el-checkbox   v-for="item in groupList" :key="item.roleId" :lable="item.roleId">{{item.roleName}}</el-checkbox>-->
            <!--          </el-checkbox-group>-->
            <el-checkbox-group v-model="checkList5" @change="test">
              <el-checkbox v-for="item in groupList" :key="item" :label="item">{{item.roleName}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div slot="footer" class="dialog-footer" style="text-align: center;margin-top: 75px">
            <el-button type="warning"  style='margin-right: 50px;' @click="handleVisible('ruleForm',0)">暂存</el-button>
            <el-button type="success"  @click="handleVisible('ruleForm',1)">提交</el-button>
          </div>
          </div>
        </el-dialog>
      </el-form>
    </div>
    <div class="detailRight">
      <div v-if="isShow&&isHide">
        <el-tabs v-model="queryParams.reportType" @tab-click="handleClick">
        <el-tab-pane label="日报" name="0">
          <el-table
            :data="tableData1"
            style="width: 100%">
            <el-table-column
              prop="reportTitle"
              label="标题"
              width="180">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="handleIntroduce(scope.row)"
                  v-hasPermi="['system:role:edit']"
                >{{scope.row.reportTitle}}</el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="汇报时段"
              width="250">
              <template slot-scope="scope">
                {{scope.row.reportStartTime}}&nbsp&nbsp至&nbsp&nbsp{{scope.row.reportEndTime}}
              </template>
            </el-table-column>
            <el-table-column
              prop="userName"
              label="创建人">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="周报" name="1">
          <el-table
            :data="tableData1"
            style="width: 100%">
            <el-table-column
              prop="reportTitle"
              label="标题"
              width="180">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="handleIntroduce(scope.row)"
                  v-hasPermi="['system:role:edit']"
                >{{scope.row.reportTitle}}</el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="汇报时段"
              width="250">
              <template slot-scope="scope">
                {{scope.row.reportStartTime}}&nbsp&nbsp至&nbsp&nbsp{{scope.row.reportEndTime}}
              </template>
            </el-table-column>
            <el-table-column
              prop="userName"
              label="创建人">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="月报" name="2">
          <el-table
            :data="tableData1"
            style="width: 100%">
            <el-table-column
              prop="reportTitle"
              label="标题"
              width="180">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="handleIntroduce(scope.row)"
                  v-hasPermi="['system:role:edit']"
                >{{scope.row.reportTitle}}</el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="汇报时段"
              width="250">
              <template slot-scope="scope">
                {{scope.row.reportStartTime}}&nbsp&nbsp至&nbsp&nbsp{{scope.row.reportEndTime}}
              </template>
            </el-table-column>
            <el-table-column
              prop="userName"
              label="创建人">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="汇报草稿箱" name="3">
          <el-table
            :data="tableData1"
            style="width: 100%">
            <el-table-column
              prop="reportTitle"
              label="标题"
              width="180">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="handleIntroduce(scope.row)"
                  v-hasPermi="['system:role:edit']"
                >{{scope.row.reportTitle}}</el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="汇报时段"
              width="250">
              <template slot-scope="scope">
                {{scope.row.reportStartTime}}&nbsp&nbsp至&nbsp&nbsp{{scope.row.reportEndTime}}
              </template>
            </el-table-column>
            <el-table-column
              prop="userName"
              label="创建人">
            </el-table-column>
          </el-table>
        </el-tab-pane>
          <el-tab-pane label="质量事件" name="five">
            <el-table
              :data="tableData2"
              style="width: 100%">
              <el-table-column
                label="事件简述"
                width="180">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    @click="handleEvent(scope.row)"
                    v-hasPermi="['system:role:edit']"
                  >{{scope.row.qualityInfo}}</el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="创建时间"
                prop="createTime"
                width="200"/>
              <el-table-column
                prop="qualityLevel"
                label="事件等级">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="安全事件" name="six">
            <el-table
              :data="tableData2"
              style="width: 100%">
              <el-table-column
                label="事件简述"
                width="180">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    @click="handleEvent(scope.row)"
                    v-hasPermi="['system:role:edit']"
                  >{{scope.row.qualityInfo}}</el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="创建时间"
                prop="createTime"
                width="200"/>
              <el-table-column
                prop="qualityLevel"
                label="事件等级">
              </el-table-column>
            </el-table>
          </el-tab-pane>
      </el-tabs>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </div>
      <div v-if="isShow==false">
        <div class="iconClose" @click="iconClose">
          <i class="el-icon-close"></i>
        </div>
      <div class="LeftTitle1">
        【{{dateList.reportType}}】{{dateList.reportTitle}}
      </div>
      <div class="LeftTitle2">
        创建时间：{{detailList.createTime}}
      </div>
      <div class="LeftTitle3">
        创建用户：{{detailList.createBy}}
      </div>
      <div class="eventIntroduce">事件简述：{{detailList.qualityInfo}}</div>
      <div class="eventType">事件类型：{{detailList.qualityType}}</div>
      <div class="eventDegree">事件等级：{{detailList.qualityLevel}}</div>
      <div class="startLine">开始时间：{{detailList.qualityTime}}</div>
      <div class="deadLine">截止时间：{{detailList.qualityEndTime}}</div>
      <div class="eventDetail">
        <div class="title">事件详述：</div>
        <div class="itemList">{{detailList.qualityDesc}}</div></div>
<!--      <div class="attachment">-->
<!--        <div class="title">事件附件：</div>-->
<!--        <div class="itemList">-->
<!--          <div v-for="item in detailList.qualityFileList">-->
<!--            <a :href=path+item.filePath download style="color: #409EFF;">{{item.fileName}}</a>-->
<!--          </div>-->
<!--          &lt;!&ndash;        {{detailList.filePathList}}&ndash;&gt;-->
<!--        </div>-->
<!--      </div>-->
      <div class="replyOn">
        <div class="title" style="clear: both">
          条文引用：
        </div>
        <div class="itemList">
          {{detailList.standardId}}
        </div>
      </div>
      <div class="associatedTask">
        <div class="title">关联施工任务：</div>
        <div class="itemList" style="margin-left: 100px">
          {{detailList.constId}}
        </div>
      </div>
    </div>
      <div v-if="isHide==false">
        <div class="iconClose" @click="iconClose2">
          <i class="el-icon-close"></i>
        </div>
        <div class="LeftTitle1">
          【{{dateList.reportType}}】{{dateList.reportTitle}}
        </div>
        <div class="LeftTitle2">
          汇报时间：{{dateList.reportEndTime}}
        </div>
        <div class="LeftTitle3">
          创建用户：{{dateList.deptName}}
        </div>
        <div class="eventIntroduce">汇报标题：{{dateList.reportTitle}}</div>
        <div class="eventType">日报内容：{{dateList.reportInfo}}</div>
        <div>
          <div class="titleTop1">人员投入</div>
          <el-table
            :data="personList2"
            style="width: 100%">
            <el-table-column
              prop="type"
              label="人员类型"
              width="180">
            </el-table-column>
            <el-table-column
              prop="number"
              label="人员数量"
              width="180">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
          </el-table>
        </div>
        <div>
          <div class="titleTop2">设备投入</div>
          <el-table
            :data="equipmentList"
            style="width: 100%">
            <el-table-column
              prop="type"
              label="设备类型"
              width="180">
            </el-table-column>
            <el-table-column
              prop="number"
              label="设备数量"
              width="180">
            </el-table-column>
            <el-table-column
              prop="unit"
              label="单位">
            </el-table-column>
          </el-table>
        </div>
        <div>
          <div class="titleTop2">材料投入</div>
          <el-table
            :data="materialList"
            style="width: 100%">
            <el-table-column
              prop="type"
              label="材料类型"
              width="180">
            </el-table-column>
            <el-table-column
              prop="number"
              label="材料数量"
              width="180">
            </el-table-column>
            <el-table-column
              prop="unit"
              label="单位">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { workReportList,delItem, lockItem, unlockItem, workReportDetail, getRecentVisible,roleList, treeselect, userListData, search, workReport } from "@/api/workReport/workReport";
    import {  userList, corpList, listByCompany  } from "@/api/projectView/projectView";
    import { qualityList } from "@/api/qualityControl/qualityControl";
    import { qualityDetail } from "@/api/qualityControl/qualityControl";
    import { quillEditor } from 'vue-quill-editor'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    export default {
        name: "index",
        components: {
            quillEditor
        },
        data(){
            return{
                tabPosition:1,
                restaurants: [],
                checkList1: [],
                checkList2: [],
                checkList3: [],
                checkList4: [],
                checkList5: [],
                checkList6: [],
                checkList7: [],
                isCheck1:false,
                isCheck2:false,
                isCheck3:false,
                isCheck4:false,
                isCheck5:false,
                isCheck6:false,
                isCheck7:false,
                recentRole:[],
                recentDept:[],
                recentUser:[],
                checkList: [{id: '001', label: '上海'},{id: '002', label: '北京'}],
                userListData:[],
                groupList:[],
                state1: '',
                state2: '',
                checked:false,
                value1: true,
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                gridData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                content: '',
                editorOption: {},
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                personList2:[],
                equipmentList:[],
                materialList:[],
                tableData1: [],
                tableData2:[],
                total:0,
                isShow:true,
                isHide:true,
                ruleForm: {
                    visibleList:'',
                    projId:1,
                    reportType: this.reportType,
                    visibleFlag:true
                },
                reportType:'',
                dynamicTags: ['标签一', '标签二', '标签三'],
                inputVisible: false,
                inputValue: '',
                rules: {
                    reportTitle: [
                        { required: true, message: '请输入汇报标题', trigger: 'blur' },
                    ],
                    reportInfo: [
                        { required: true, message: '请选择汇报内容', trigger: 'change' }
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
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ],},
                dialogImageUrlImg: '',
                dialogVisible: false,
                ruleForm2: {
                    projGroupInfo: '',
                    projName: '',
                    admin:'',
                    guid:'',
                    desc:''
                },
                check1:[],
                check2:[],
                check3:[],
                check4:[],
                check5:[],
                check6:[],
                check7:[],
                partinList:{},
                userDataList:{},
                corpList:{},
                personList:[
                    { partType:'', deptId:'', headId:''},
                ],
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
                activeNames: ['1'],
                path:process.env.VUE_APP_BASE_API,
                // scroll
                busy: true, //
                // 查询参数
                queryParams: {
                    pageNum: 1,
                    pageSize: 7,
                    usedFlag:'',
                    searchValue:'',
                    reportType:'',
                    questionType:''
                },
                detailList:{},
                dateList:{},
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
            }
        },
        created(){
            this.reportType=this.$route.query.reportType
            console.log(this.reportType,'this.reportType')
            if(this.$route.query.ruleForm){
                this.ruleForm=this.$route.query.ruleForm
                this.reportType=this.$route.query.ruleForm.reportType
            }
            this.getList();
            // this.guid=this.$route.query.guid;
            this.getDicts("partin_dept_type").then(response => {
                this.partinList = response.data;
            });
            listByCompany().then(response => {
                this.userDataList = response.rows;
            });
            corpList().then(response => {
                this.corpList = response.data;
            });
            search().then(response => {
                this.restaurants = response.data;
            });
            this.getData()
        },
        methods:{
            // 列表数据
            getList() {
                if(this.queryParams.questionType) {
                    qualityList(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.tableData2 = response.rows;
                        this.total = response.total;
                        this.loading = false;
                    });
                }else {
                    workReportList(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                        this.tableData1 = response.rows;
                        console.log(this.roleList,'this.projectlist')
                        this.total=response.total;

                        this.loading = false;
                    });
                }
            },
            // 列表数据
            getData(){
                getRecentVisible({projId:1}).then(response => {
                    this.recentRole=response.data.visibleRoleId;
                    this.recentDept=response.data.visibleDeptId
                    this.recentUser=response.data.visibleUserId;
                    console.log(response,'res')
                });
            },
            // 提交
            handleVisible(ruleForm,e){
                this.ruleForm.personList=this.personList;
                this.ruleForm.equipmentList=this.equipmentList;
                this.ruleForm.visibleList=this.check4;
                this.ruleForm.reportType=this.reportType
                if(this.ruleForm.visibleFlag){
                    this.ruleForm.visibleFlag=1
                }else {
                    this.ruleForm.visibleFlag=0
                }

                if(e==1){
                    this.ruleForm.status=1
                }else{
                    this.ruleForm.status=0
                }
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        workReport(this.ruleForm).then(response => {
                            this.$notify({
                                message: '成功',
                                type: 'success'
                            });
                            this.dialogFormVisible = false
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleSwitch(e){
                console.log(e,'e')
            },
            test(roleId){
                console.log(this.checkList5,'222eeeeeee')
                let check5=this.checkList5
                for (let i=0;i<this.checkList5.length;i++){
                    this.checkList5[i].value=''
                    this.checkList5[i].type=''
                    check5[i].value=this.checkList5[i].roleName
                    check5[i].id=this.checkList5[i].roleId
                    check5[i].type='user'

                }
                // this.check1=check1
                this.check5=check5.concat(this.check4,this.check3,this.check2,this.check1,this.check6,this.check7)
                this.isCheck4=false;
                this.isCheck1=false;
                this.isCheck2=false;
                this.isCheck3=false;
                this.isCheck5=true;
                this.isCheck6=false;
                this.isCheck7=false;
                console.log(this.check5,' console.log(this.checkList4,\'222eeeeeee\')')
                // let arr=[]
                var hash=[];
                let obj={};
                for (let i=0;i<this.check5.length;i++){
                    console.log(this.check5[i].id)
                    if(!obj[this.check5[i].id]){
                        hash.push(this.check5[i]);
                        obj[this.check5[i].id] = true;
                    }
                }
                this.check5=hash

            },
            handleCheck(){
                let check2=this.checkList2
                for (let i=0;i<this.checkList2.length;i++){
                    check2[i].value=this.checkList2[i].deptName
                    check2[i].id=this.checkList2[i].deptId
                    check2[i].type='dept'
                }
                // this.check2=check2
                this.check2=check2.concat(this.check5,this.check4,this.check3,this.check1,this.check6,this.check7)
                this.isCheck4=false;
                this.isCheck1=false;
                this.isCheck2=true;
                this.isCheck3=false;
                this.isCheck5=false;
                this.isCheck6=false;
                this.isCheck7=false;
                console.log(this.check2,' console.log(this.checkList2,\'222eeeeeee\')')
                var hash=[];
                let obj={};
                for (let i=0;i<this.check2.length;i++){
                    console.log(this.check2[i].id)
                    if(!obj[this.check2[i].id]){
                        hash.push(this.check2[i]);
                        obj[this.check2[i].id] = true;
                    }
                }
                this.check2=hash
            },
            handleCheck3(){
                let check3=this.checkList3
                for (let i=0;i<this.checkList3.length;i++){
                    this.checkList3[i].value=''
                    check3[i].value=this.checkList3[i].userName
                    check3[i].id=this.checkList3[i].userId;
                    check3[i].type='user'
                }
                // this.check3=check3
                this.check3=check3.concat(this.check5,this.check4,this.check2,this.check1,this.check6,this.check7)
                this.isCheck4=false;
                this.isCheck1=false;
                this.isCheck2=false;
                this.isCheck3=true;
                this.isCheck5=false;
                this.isCheck6=false;
                this.isCheck7=false;
                console.log(this.check4,' console.log(this.checkList3,\'222eeeeeee\')')
                var hash=[];
                let obj={};
                for (let i=0;i<this.check3.length;i++){
                    console.log(this.check3[i].id)
                    if(!obj[this.check3[i].id]){
                        hash.push(this.check3[i]);
                        obj[this.check3[i].id] = true;
                    }
                }
                this.check3=hash
            },
            handleCheck4(){
                let check4=this.checkList4
                for (let i=0;i<this.checkList4.length;i++){
                    this.checkList4[i].value=''
                    check4[i].value=this.checkList4[i].userName
                    check4[i].id=this.checkList4[i].userId
                    check4[i].type='role'
                }
                // this.check3=check3
                this.check4=check4.concat(this.check5,this.check3,this.check2,this.check1,this.check6,this.check7)
                this.isCheck4=true;
                this.isCheck1=false;
                this.isCheck2=false;
                this.isCheck3=false;
                this.isCheck5=false;
                this.isCheck6=false;
                this.isCheck7=false;
                console.log(this.check4,' console.log(this.checkList3,\'222eeeeeee\')')
                var hash=[];
                let obj={};
                for (let i=0;i<this.check4.length;i++){
                    console.log(this.check4[i].id)
                    if(!obj[this.check4[i].id]){
                        hash.push(this.check4[i]);
                        obj[this.check4[i].id] = true;
                    }
                }
                this.check4=hash
            },
            handleTree(data){
                console.log(data)
                let dataList=[]
                dataList.push(data)
                let check6=dataList
                for (let i=0;i<dataList.length;i++){
                    // dataList[i].value=''
                    check6[i].value=dataList[i].label
                    check6[i].id=dataList[i].id
                }
                // this.check3=check3
                this.check6=check6.concat(this.check5,this.check3,this.check2,this.check1,this.check4,this.check7)
                this.isCheck4=false;
                this.isCheck1=false;
                this.isCheck2=false;
                this.isCheck3=false;
                this.isCheck5=false;
                this.isCheck6=true;
                this.isCheck7=false;
                this.$forceUpdate()
                console.log(this.check6,' console.log(this.checkList3,\'222eeeeeee\')')
                var hash=[];
                let obj={};
                for (let i=0;i<this.check6.length;i++){
                    console.log(this.check6[i].id)
                    if(!obj[this.check6[i].id]){
                        hash.push(this.check6[i]);
                        obj[this.check6[i].id] = true;
                    }
                }
                this.check6=hash
            },
            handleSelect(data) {
                console.log(data)
                let dataList=[]
                dataList.push(data)
                let check7=dataList
                for (let i=0;i<dataList.length;i++){
                    // dataList[i].value=''
                    check7[i].value=dataList[i].value
                    check7[i].id=dataList[i].id
                    check7[i].type=dataList[i].type
                }
                // this.check3=check3
                this.check7=check7.concat(this.check5,this.check3,this.check2,this.check1,this.check4,this.check6)

                this.isCheck4=false;
                this.isCheck1=false;
                this.isCheck2=false;
                this.isCheck3=false;
                this.isCheck5=false;
                this.isCheck6=false;
                this.isCheck7=true;
                this.$forceUpdate()
                console.log(this.check7,' console.log(this.checkList3,\'222eeeeeee\')')
                var hash=[];
                let obj={};
                for (let i=0;i<this.check7.length;i++){
                    console.log(this.check7[i].id)
                    if(!obj[this.check7[i].id]){
                        hash.push(this.check7[i]);
                        obj[this.check7[i].id] = true;
                    }
                }
                this.check7=hash
            },
            handleTab(e){
                console.log(e,'e')
                if(e==1){
                    this.getData()
                }else if(e==2){
                    userListData({projId:'70e0f006-fa62-4eb0-91a3-855e04ea2704'}).then(response => {
                        this.userListData=response.rows
                    });
                }else if(e==3){
                    treeselect({projId:'70e0f006-fa62-4eb0-91a3-855e04ea2704'}).then(response => {
                        this.treeData=response.data
                    });
                }else if(e==4){
                    roleList({projId:'70e0f006-fa62-4eb0-91a3-855e04ea2704'}).then(response => {
                        this.groupList=response.rows
                    });
                }

            },

            submitProject(ruleForm) {
                // if(this.ruleForm2.time!=undefined){
                //     this.ruleForm2.projStartTime=this.ruleForm2.time[0]
                //     this.ruleForm2.projEndTime=this.ruleForm2.time[1]
                // }
                // this.ruleForm2.deptPartinList=this.deptPartinList
                // console.log(this.ruleForm2,'ruleForm2')
                this.dialogFormVisible=true
                this.getData()
                // this.$refs[ruleForm].validate((valid) => {
                //     if (valid) {
                //         console.log(localStorage.getItem('filePath'),'filePath')
                //         this.ruleForm2.guid=localStorage.getItem('filePath');
                //         proj(this.ruleForm2).then(response => {
                //             this.$notify({
                //                 message: '新建成功',
                //                 type: 'success'
                //             });
                //             this.drawer=false
                //         });
                //     } else {
                //         console.log('error submit!!');
                //         return false;
                //     }
                // });
            },
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            loadAll() {
                return [

                ];
            },
            handleClose(tag) {
                this.check4.splice(this.check4.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            // 删除
            del(id){
                //根据id找索引
                let index= this.personList.findIndex(item =>{
                    if (item.id==id){
                        return true
                    }
                })
                //删除数组元素
                this.personList.splice(index,1)
                this.$forceUpdate()
            },
            // 增加
            add(){
                this.personList.push({ partType:'', deptId:'', headId:''})
            },
            // 删除
            del2(id){
                //根据id找索引
                let index= this.equipmentList.findIndex(item =>{
                    if (item.id==id){
                        return true
                    }
                })
                //删除数组元素
                this.equipmentList.splice(index,1)
                this.$forceUpdate()
            },
            // 增加
            add2(){
                this.equipmentList.push({ partType:'', deptId:'', headId:''})
            },
            iconClose(){
              this.isShow=true
            },
            iconClose2(){
                this.isHide=true
            },
            handleIntroduce(e){
                console.log(e,'e')
                workReportDetail(e.guid).then(response => {
                    this.dateList = response.data;
                    if(this.dateList.reportType==0){
                        this.dateList.reportType='日报'
                    }else if(this.dateList.reportType==1){
                        this.dateList.reportType='月报'
                    }else if(this.dateList.reportType==2){
                        this.dateList.reportType='年报'
                    }
                    this.personList2=response.data.personList;
                    this.equipmentList=response.data.equipmentList;
                    this.materialList=response.data.materialList;
                    this.isHide=false
                });
            },
            handleEvent(e){
                qualityDetail(e.guid).then(response => {
                    this.detailList = response.data;
                    this.isShow=false
                });
            },
            handleClick(tab, event) {
                console.log(tab, event);
                if(this.queryParams.reportType==3){
                    this.queryParams.delFlag==1
                }
                if(this.queryParams.reportType=='five'){
                    this.queryParams.questionType=0
                }else if(this.queryParams.reportType=='six'){
                    this.queryParams.questionType=1
                }else {
                    this.queryParams.questionType=''
                }
                this.getList()
            }

        }
    }
</script>

<style scoped>
  /deep/.el-tree-node__content{
    background: #ffffff!important;
  }
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
    width: 47%;
    float: left;
    margin: 40px;
    /*overflow-y:scroll;*/
  }
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .detailRight{
    /*overflow-y:scroll;*/
    position: relative;
  }
  .LeftTitle1{
    font-size: 20px;
    color: #666666;
    margin-top: 35px;
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

  .imgItem{
    width: 58px;
    height: 58px;
    margin-bottom: 10px;
    margin-right: 12px;
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
    margin: 9px 15px;
    width: 155px;
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
    margin: 0 67px;
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
  .detailRight{
    float: right;
    margin-right: 20px;
    width: 45%;
  }
  .iconClose{
    text-align: right;
    font-size: 23px;
    margin-top: 8px;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  /deep/.el-checkbox{
    display: block;
    margin: 12px 0;
  }
  /deep/.inline-input{
    width: 100%;
    margin-top: 19px;
  }
  .itemName{
    margin: 12px 0;
  }
  /deep/.el-tree-node__content{
    color: #000!important;
  }
  .titleTop1{
    margin-bottom: 20px;
    font-size: 15px;
    margin-top: 80px;
  }
  .titleTop2{
    margin-bottom: 20px;
    font-size: 15px;
    margin-top: 40px;
  }
  /deep/.el-radio-button__inner{
    width: 158px;
  }
  /deep/.el-dialog{
    width: 800px;
  }
  /deep/.el-dialog__body{
    padding-left: 84px;
    padding-right: 84px;
  }
  .tabChange{
    border: 1px solid #ddd;
    padding: 25px 40px;
  }

</style>

