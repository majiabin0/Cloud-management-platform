<template>
  <div>
    <div>
      <el-row>
        <el-col :span="11" class="eventLeft">
          <div class="statistics">事件统计</div>
          <el-row style="margin-left: 12px">
            <el-col :span="10">
              <!--            <div class="statisticsItem1">-->
              <!--              <div class="event1">质量事件</div>-->
              <!--              <div class="event2">18</div>-->
              <!--            </div>-->
              <div class="statisticsItem1">
                <div class="event1">未闭合事件</div>
                <div class="event2">{{countEvent.yibihe}}</div>
              </div>
              <div class="statisticsItem1">
                <div class="event1">已整改事件</div>
                <div class="event2">{{countEvent.weibihe}}</div>
              </div>
            </el-col>
            <el-col :span="14">
              <div>
                <div id="main1" style="width:270px; height: 190px;float: left">111111111</div>
                <div id="main2" style="width:170px; height: 130px;float: right;margin-right: 4px;"></div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="11" class="eventLeft" style="margin-left: 10px">
          <div class="statistics">事件发生曲线</div>
          <!--        <el-row>-->
          <!--          <el-col :span="12"><div>22222222</div></el-col>-->
          <!--          <el-col :span="12"><div class=""></div></el-col>-->
          <!--        </el-row>-->
          <div id="map" style="width: 100%;height:256px;margin-top: -49px;"></div>
          <div style="position: absolute;    right: 95px;top: 28px;">
            <el-radio-group v-model="radio2" size="small" @change="handleDate">
              <el-radio-button label="周" ></el-radio-button>
              <el-radio-button label="月"></el-radio-button>
            </el-radio-group>
<!--            <el-button @click="handleDate1">周</el-button>-->
<!--            <el-button @click="handleDate2">月</el-button>-->
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="app-container">
      <el-form :model="queryParams" ref="queryForm" v-show="showSearch" :inline="true">
        <el-form-item label="事件简述" prop="roleName">
          <el-input
            v-model="queryParams.qualityInfo"
            placeholder="请输入事件简述"
            clearable
            size="small"
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="事件等级" prop="roleKey">
          <el-select
            v-model="queryParams.qualityLevel"
            placeholder="事件等级"
            clearable
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="dict in levelOptions"
              :key="dict.dictValue"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="事件类型" prop="status">
          <el-select
            v-model="queryParams.qualityType"
            placeholder="事件类型"
            clearable
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="处理状态" prop="status">
          <el-select
            v-model="queryParams.qualityStatus"
            placeholder="处理状态"
            clearable
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="dateRange"
            size="small"
            style="width: 240px"
            value-format="yyyy-MM-dd"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>

      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
            v-hasPermi="['system:role:add']"
          >新增</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            :disabled="single"
            @click="handleUpdate"
            v-hasPermi="['system:role:edit']"
          >修改</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            :disabled="multiple"
            @click="handleDelete"
            v-hasPermi="['system:role:remove']"
          >删除</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="info"
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
            v-hasPermi="['system:role:export']"
          >导入</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="warning"
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
            v-hasPermi="['system:role:export']"
          >导出</el-button>
        </el-col>
        <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>
      <el-drawer
        :visible.sync="drawerGroup"
        :direction="direction"
        :before-close="handleClose">
        <div class="constructionTitle" style="margin-top: 0">新建质量事件</div>
        <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="115px" class="demo-ruleForm">
          <userAvatar :user="user" style="position: absolute;right: 143px;top: 95px;" />
          <el-form-item label="事件简述" class="changeStuff" prop="qualityInfo">
            <el-input v-model="ruleForm1.qualityInfo"></el-input>
          </el-form-item>
          <el-form-item label="事件编号" class="changeStuff" prop="qualityNo">
            <el-input v-model="ruleForm1.qualityNo"></el-input>
          </el-form-item>
          <!--        <el-form-item label="项目群简介">-->
          <!--          <el-input type="textarea" v-model="ruleForm1.projGroupInfo"></el-input>-->
          <!--        </el-form-item>-->
          <el-form-item label="事件类型" prop="qualityType">
            <el-select v-model="ruleForm1.qualityType" placeholder="请选择">
              <el-option
                v-for="item in typeData"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="事件等级" prop="qualityLevel">
            <el-select v-model="ruleForm1.qualityLevel" placeholder="请选择">
              <el-option
                v-for="item in levelData"
                :key="item.dictValue"
                :label="item.dictLabel"
                :value="item.dictValue">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发生时间" prop="admin">
            <div class="block">
              <!--          <span class="demonstration">设置默认时间</span>-->
              <el-date-picker
                v-model="ruleForm1.qualityTime"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
            <div class="block">
              <!--            <span class="demonstration">设置默认时间</span>-->
              <el-date-picker
                v-model="ruleForm1.endTime"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="事件详述">
            <el-input type="textarea" v-model="ruleForm1.qualityDesc"></el-input>
          </el-form-item>
          <el-form-item label="质量图片">
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
          </el-form-item>
          <el-form-item label="附件">
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
          <el-form-item label="条文引用">
            <!--          <el-select v-model="ruleForm1.standardId" multiple placeholder="请选择">-->
            <el-select v-model="name" multiple placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关联模型">
            <div>
              <el-button plain>点击跳转选择模型</el-button>
            </div>
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleCloseTag(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="ruleForm1.bimId"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </el-form-item>
          <el-form-item label="关联施工任务">
            <div>
              <el-button plain>点击选择施工任务计划</el-button>
            </div>
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleCloseTag(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="ruleForm1.constId"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </el-form-item>
          <div class="mainBtn">
            <el-button type="primary">最近</el-button>
          </div>
          <el-form-item label="执行人">
            <el-select v-model="ruleForm1.executor" multiple filterable  placeholder="请选择">
              <el-option
                v-for="item in executor"
                :key="item.value"
                :label="item.nickName"
                :value="item.userId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="验收人">
            <el-select v-model="ruleForm1.acceptor" multiple filterable  placeholder="请选择">
              <el-option
                v-for="item in acceptor"
                :key="item.value"
                :label="item.nickName"
                :value="item.userId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="抄送人">
            <el-select v-model="ruleForm1.ccPerson" multiple filterable  placeholder="请选择">
              <el-option
                v-for="item in ccPerson"
                :key="item.value"
                :label="item.nickName"
                :value="item.userId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div style="    float: right;margin-right: 50px;margin-top: 200px;margin-bottom: 25px">
          <el-button @click="drawerGroup = false">取 消</el-button>
          <el-button type="primary" @click="submitForm1('ruleForm1')">确 定</el-button>
        </div>
      </el-drawer>
      <el-table v-loading="loading" :data="roleList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="创建时间" prop="createTime" width="160" />
        <el-table-column label="事件简述" prop="qualityInfo" :show-overflow-tooltip="true" width="140">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleIntroduce(scope.row)"
              v-hasPermi="['system:role:edit']"
            >{{scope.row.qualityInfo}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="事件等级" prop="qualityLevel" :show-overflow-tooltip="true" width="100" />
        <el-table-column label="事件类型" prop="qualityType" width="100" />
        <el-table-column label="截止时间" prop="qualityEndTime" width="160" />
        <el-table-column label="处理状态" prop="qualityStatus" width="100" :formatter="onLineStatus">
        </el-table-column>
        <el-table-column label="创建用户" prop="userName" width="100" />
        <el-table-column label="事件图片" width="100" >
          <template scope="scope">
            <img :src=path+scope.row.picPath width="80" height="80"/>
          </template>
        </el-table-column>
        <!--      <el-table-column label="状态" align="center" width="100">-->
        <!--        <template slot-scope="scope">-->
        <!--          <el-switch-->
        <!--            v-model="scope.row.status"-->
        <!--            active-value="0"-->
        <!--            inactive-value="1"-->
        <!--            @change="handleStatusChange(scope.row)"-->
        <!--          ></el-switch>-->
        <!--        </template>-->
        <!--      </el-table-column>-->
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-circle-check"
              @click="handleDataScope(scope.row)"
              v-hasPermi="['system:role:edit']"
            >跳转BIM</el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['system:role:edit']"
            >修改</el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['system:role:remove']"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getData"
      />

      <!-- 添加或修改角色配置对话框 -->
      <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="form.roleName" placeholder="请输入角色名称" />
          </el-form-item>
          <el-form-item label="权限字符" prop="roleKey">
            <el-input v-model="form.roleKey" placeholder="请输入权限字符" />
          </el-form-item>
          <el-form-item label="角色顺序" prop="roleSort">
            <el-input-number v-model="form.roleSort" controls-position="right" :min="0" />
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="form.status">
              <el-radio
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictValue"
              >{{dict.dictLabel}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="菜单权限">
            <el-tree
              :data="menuOptions"
              show-checkbox
              ref="menu"
              node-key="id"
              empty-text="加载中，请稍后"
              :props="defaultProps"
            ></el-tree>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </el-dialog>

      <!-- 分配角色数据权限对话框 -->
      <el-dialog :title="title" :visible.sync="openDataScope" width="500px" append-to-body>
        <el-form :model="form" label-width="80px">
          <el-form-item label="角色名称">
            <el-input v-model="form.roleName" :disabled="true" />
          </el-form-item>
          <el-form-item label="权限字符">
            <el-input v-model="form.roleKey" :disabled="true" />
          </el-form-item>
          <el-form-item label="权限范围">
            <el-select v-model="form.dataScope">
              <el-option
                v-for="item in dataScopeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据权限" v-show="form.dataScope == 2">
            <el-tree
              :data="deptOptions"
              show-checkbox
              default-expand-all
              ref="dept"
              node-key="id"
              empty-text="加载中，请稍后"
              :props="defaultProps"
            ></el-tree>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitDataScope">确 定</el-button>
          <el-button @click="cancelDataScope">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import { listRole, getRole, delRole, addRole, updateRole, exportRole, dataScope, changeRoleStatus } from "@/api/system/role";
    import { treeselect as menuTreeselect, roleMenuTreeselect } from "@/api/system/menu";
    import { treeselect as deptTreeselect, roleDeptTreeselect } from "@/api/system/dept";
    import { qualityList, quality, delItem, addAttachs, getRecentPerson, userList,getCountByType,getQualityCount, getCountByLevel, getCountByWeek, getCountByMonth} from "@/api/qualityControl/qualityControl";
    import echarts from 'echarts'

    export default {
        name: "Role",
        data() {
            return {
                dialogImageUrlImg: '',
                dialogVisibleImg: false,
                direction: 'rtl',
                value3:'',
                radio2:'周',
                name:'',
                // 用户
                user:{},
                // 模型选择后的标签
                dynamicTags: ['标签一', '标签二', '标签三'],
                inputVisible: false,
                inputValue: '',
                // event type
                options: [{
                    value: '1',
                    label: '黄金糕'
                }, {
                    value: '2',
                    label: '双皮奶'
                }, {
                    value: '3',
                    label: '蚵仔煎'
                }, {
                    value: '4',
                    label: '龙须面'
                }, {
                    value: '5',
                    label: '北京烤鸭'
                }],
                value: '',
                value1: [],
                // add new
                drawerGroup: false,
                // 遮罩层
                loading: true,
                // 选中数组
                ids: [],
                // 非单个禁用
                single: true,
                // 非多个禁用
                multiple: true,
                // 显示搜索条件
                showSearch: true,
                // 总条数
                total: 0,
                // 角色表格数据
                roleList: [],
                // 弹出层标题
                title: "",
                // 是否显示弹出层
                open: false,
                // 是否显示弹出层（数据权限）
                openDataScope: false,
                // 日期范围
                dateRange: [],
                // 状态数据字典
                statusOptions: [],
                // 等级数据
                levelOptions:[
                    {
                        value: "1",
                        label: "等级一"
                    },
                    {
                        value: "2",
                        label: "等级二"
                    },
                ],
                // 数据范围选项
                dataScopeOptions: [
                    {
                        value: "1",
                        label: "全部数据权限"
                    },
                    {
                        value: "2",
                        label: "自定数据权限"
                    },
                    {
                        value: "3",
                        label: "本部门数据权限"
                    },
                    {
                        value: "4",
                        label: "本部门及以下数据权限"
                    },
                    {
                        value: "5",
                        label: "仅本人数据权限"
                    }
                ],
                // 菜单列表
                menuOptions: [],
                // 部门列表
                deptOptions: [],
                // 查询参数
                queryParams: {
                    pageNum: 1,
                    pageSize: 10,
                    questionType:1
                    // beginTime:'',
                    // endTime:''
                },
                lifePhoto:'',
                // 表单参数
                form: {},
                countEvent:{},
                defaultProps: {
                    children: "children",
                    label: "label"
                },
                path:process.env.VUE_APP_BASE_API,
                countByType:{},
                ruleForm1: {
                    qualityInfo: '',
                    qualityNo: '',
                    qualityLevel:'',
                    qualityType:'',
                    qualityStatus:'',
                    executor:'',
                    ccPerson:'',
                    acceptor:''
                },
                acceptor:'',
                fileList: [],
                executor:[],
                ccPerson:[],
                typeData:[],
                levelData:[],
                Blob:{size: 48117, type: "image/jpeg"},
                // 时间选择
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
                // 表单校验
                rules: {
                    roleName: [
                        { required: true, message: "角色名称不能为空", trigger: "blur" }
                    ],
                    roleKey: [
                        { required: true, message: "权限字符不能为空", trigger: "blur" }
                    ],
                    roleSort: [
                        { required: true, message: "角色顺序不能为空", trigger: "blur" }
                    ]
                },
                rules1: {
                    qualityInfo: [
                        { required: true, message: '请输入事件简述', trigger: 'blur' },
                    ],
                    qualityNo:[
                        { required: true, message: '请输入事件编号', trigger: 'blur' },
                    ],
                    qualityType: [
                        { required: true, message: '请选择事件类型', trigger: 'change' }
                    ],
                    qualityLevel: [
                        {  required: true, message: '请选择事件等级', trigger: 'change' }
                    ],
                    qualityStatus: [
                        { required: true, message: '请选择处理状态', trigger: 'change' }
                    ],
                    endTime: [
                        {  required: true, message: '请选择结束时间', trigger: 'change' }
                    ],
                    type: [
                        { required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    projGroupInfo: [
                        { required: true, message: '项目群简介', trigger: 'blur' }
                    ]
                },
            };
        },
        created() {
            this.getData();
            // this.getList();
            this.getDicts("security_event_type").then(response => {
                this.typeData = response.data;
            });
            this.getDicts("security_event_level").then(response => {
                this.levelData = response.data;
            });
            this.getDicts("sys_normal_disable").then(response => {
                this.statusOptions = response.data;
            });
            getCountByType({projId:'004',questionType:1}).then(response => {
                console.log(response,'res')
                this.countByType=response.data
            });
            getQualityCount({projId:'004',questionType:1}).then(response => {
                console.log(response,'res')
                this.countEvent=response.data
            });
            getCountByLevel({projId:'004',questionType:1}).then(response => {
                this.countByLevel=response.data
            });
            this.handleDate1()
            // console.log(process.env.VUE_APP_BASE_API,'process.env.VUE_APP_BASE_API')
        },
        updated() {
            // 获取考勤数据
            this.drawLine();
            //调用drawLineChart()
            this.getMap();
        },
        methods: {
            // week or month change
            handleDate(){
                console.log(this.radio2,'e')
                if(this.radio2=='月'){
                    getCountByWeek({projId:'004',questionType:0}).then(response => {
                        this.getCountByWeek=response.data
                        console.log(this.getCountByWeek,'res')
                        //
                    });
                }else {
                    getCountByMonth({projId:'004',questionType:0}).then(response => {
                        console.log(response,'res')
                        this.getCountByWeek=response.data
                        console.log(this.getCountByWeek,'res')
                        //
                    });
                }
            },
            handleDate1(){
                    getCountByWeek({projId:'004',questionType:0}).then(response => {
                        this.getCountByWeek=response.data
                        console.log(this.getCountByWeek,'res')
                        //
                    });
            },
            handleDate2(){
                    getCountByMonth({projId:'004',questionType:0}).then(response => {
                        console.log(response,'res')
                        this.getCountByWeek=response.data
                        console.log(this.getCountByWeek,'res')
                        //
                    });
            },
            // 跳转securityDetail
            handleIntroduce(e){
                this.$router.push({
                    path:'/securityDetail',
                    query: {
                        guid: e.guid,
                    },

                })
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
                this.ruleForm1.file = fileList.slice(-3);
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
                    this.ruleForm1.file=photo
                });
            },
            // 上传图片
            handleChange2(file, fileList) {
                console.log(file,fileList);
                this.ruleForm1.pic = fileList.slice(-3);
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
                    this.ruleForm1.pic=photo
                });
                // this.ruleForm1.append(pic,fd)
            },
            //上线状态
            onLineStatus: function(row, column) {
                console.log(row,'row')
                // return row.state == 1 ? "上线" : "下线";
                if(row.qualityStatus==1){
                    return '处理中'
                }
                if(row.qualityStatus==0){
                    return '未确认'
                }
                if(row.qualityStatus==2){
                    return '已关闭'
                }
                if(row.qualityStatus==3){
                    return '已闭合'
                }
                if(row.qualityStatus==4){
                    return '超期未确认'
                }
                if(row.qualityStatus==5){
                    return '超期处理中'
                }
                if(row.qualityStatus==6){
                    return '超期已闭合'
                }
            },
            getData() {
                // this.loading = true;
                qualityList(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
                    this.roleList = response.rows;
                    console.log(this.roleList,'this.projectlist')
                    this.total=response.total;
                    // this.modFoat(num)
                    // if(this.queryParams2.pageNum>this.num) {
                    //     this.showNum2=false
                    // }else {
                    //     this.showNum2=true
                    // }
                    // if(this.showNum2==true){
                    //     this.project=[...this.project, ...response.rows];
                    // }
                    // this.project.map((item,index)=>{
                    //     // activeGroup:true
                    //     return Object.assign(item,{active:false})
                    //
                    // })

                    this.loading = false;
                });
            },
            // echarts图
            getMap() {
                var myChart = this.$echarts.init(document.getElementById('map'))
                let option = {
                    xAxis: {
                        type: 'category',
                        // data: this.dataX,
                        data: this.getCountByWeek.xAxis,
                        boundaryGap: false, //控制日期是否在中间显示
                        axisLabel: {
                            show: true, //是否显示日期
                            interval: 0, //强制显示全部 // rotate: 40,//倾斜的角度
                            textStyle: {
                                color: '#000', //日期的颜色
                                fontSize: 12 //字体的大小
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#ccc' // x轴的颜色
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}',
                            textStyle: {
                                color: '#000' //数字的颜色
                            },
                            inside: false //控制数据是否在内侧还是外侧显示
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#ccc' // 折线的颜色
                            }
                        }
                    },
                    series: [
                        {
                            // data: this.dataY,
                            data: this.getCountByWeek.yAxis,
                            type: 'line',
                            symbol: 'circle', //是否显示实心的折线圆点
                            smooth: true, //让折线有弧度
                            symbolSize: 7, //折线圆点的大小
                            itemStyle: {
                                normal: {
                                    color: '#efc883', //折线点的颜色
                                    lineStyle: {
                                        color: '#efc883' //折线的颜色
                                    },
                                    label: { show: true } //是否在折线点上显示数字
                                }
                            }
                        }
                    ]
                }
                myChart.setOption(option)
            },
            // echarts图
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('main1'))
                // 绘制图表
                myChart.setOption({
                    // title: { text: '在Vue中使用echarts' },
                    series: {
                        type: 'pie',
                        data: this.countByType
                    }
                });
                // 基于准备好的dom，初始化echarts实例
                // let myChart2 = this.$echarts.init(document.getElementById('main2'))
                // // 绘制图表
                // myChart2.setOption({
                //     // title: { text: '在Vue中使用echarts' },
                //     series: {
                //         type: 'pie',
                //         data: this.countByLevel
                //     }
                // });
            },
            /** 查询角色列表 */
            getList() {
                this.loading = true;
                listRole(this.addDateRange(this.queryParams, this.dateRange)).then(
                    response => {
                        this.roleList = response.rows;
                        this.total = response.total;
                        this.loading = false;
                    }
                );
            },
            /** 查询菜单树结构 */
            getMenuTreeselect() {
                menuTreeselect().then(response => {
                    this.menuOptions = response.data;
                });
            },
            /** 查询部门树结构 */
            getDeptTreeselect() {
                deptTreeselect().then(response => {
                    this.deptOptions = response.data;
                });
            },
            // 所有菜单节点数据
            getMenuAllCheckedKeys() {
                // 目前被选中的菜单节点
                let checkedKeys = this.$refs.menu.getHalfCheckedKeys();
                // 半选中的菜单节点
                let halfCheckedKeys = this.$refs.menu.getCheckedKeys();
                checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
                return checkedKeys;
            },
            // 所有部门节点数据
            getDeptAllCheckedKeys() {
                // 目前被选中的部门节点
                let checkedKeys = this.$refs.dept.getHalfCheckedKeys();
                // 半选中的部门节点
                let halfCheckedKeys = this.$refs.dept.getCheckedKeys();
                checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
                return checkedKeys;
            },
            /** 根据角色ID查询菜单树结构 */
            getRoleMenuTreeselect(roleId) {
                return roleMenuTreeselect(roleId).then(response => {
                    this.menuOptions = response.menus;
                    return response;
                });
            },
            /** 根据角色ID查询部门树结构 */
            getRoleDeptTreeselect(roleId) {
                return roleDeptTreeselect(roleId).then(response => {
                    this.deptOptions = response.depts;
                    return response;
                });
            },
            // Tag after model selection
            handleCloseTag(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
            // 角色状态修改
            handleStatusChange(row) {
                let text = row.status === "0" ? "启用" : "停用";
                this.$confirm('确认要"' + text + '""' + row.roleName + '"角色吗?', "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(function() {
                    return changeRoleStatus(row.roleId, row.status);
                }).then(() => {
                    this.msgSuccess(text + "成功");
                }).catch(function() {
                    row.status = row.status === "0" ? "1" : "0";
                });
            },
            // add new submit
            submitForm1(ruleForm1) {
                this.$refs["ruleForm1"].validate(valid => {
                    if (valid) {
                        quality(this.ruleForm1).then(response => {
                            this.$notify({
                                message: '新建成功',
                                type: 'success'
                            });
                            this.getData()
                        });
                        this.drawerGroup = false;
                    }
                });

            },
            // 取消按钮
            cancel() {
                this.open = false;
                this.reset();
            },
            // 取消按钮（数据权限）
            cancelDataScope() {
                this.openDataScope = false;
                this.reset();
            },
            // 表单重置
            reset() {
                if (this.$refs.menu != undefined) {
                    this.$refs.menu.setCheckedKeys([]);
                }
                this.form = {
                    roleId: undefined,
                    roleName: undefined,
                    roleKey: undefined,
                    roleSort: 0,
                    status: "0",
                    menuIds: [],
                    deptIds: [],
                    remark: undefined
                };
                this.resetForm("form");
            },
            /** 搜索按钮操作 */
            handleQuery() {
                // this.queryParams1.beginTime=this.dateRange[0];
                // this.queryParams1.endTime=this.dateRange[1];
                // this.queryParams1.pageNum = 1;
                this.queryParams.pageSize=10;
                this.queryParams.pageNum=1;
                this.queryParams.questionType=1;
                this.getData();
            },
            /** 重置按钮操作 */
            resetQuery() {
                this.dateRange = [];
                this.queryParams={};
                this.handleQuery();
            },
            // 多选框选中数据
            handleSelectionChange(selection) {
                this.ids = selection.map(item => item.roleId)
                this.single = selection.length!=1
                this.multiple = !selection.length
            },
            /** 新增按钮操作 */
            handleAdd() {
                userList().then(response => {
                    this.executor=response.rows;
                    this.acceptor=response.rows;
                    this.ccPerson=response.rows
                });
                getRecentPerson().then(response => {
                    for(let i=0;i<this.executor.length;i++){
                        let userId=this.executor[i].userId
                        for(let i=0;i<response.executor.length;i++){
                            let arr=[]
                            if(userId==response.executor[i]){
                                arr.push(response.executor[0])
                                this.ruleForm1.executor=arr
                            }
                        }
                    }
                    for(let i=0;i<this.acceptor.length;i++){
                        let userId=this.acceptor[i].userId
                        for(let i=0;i<response.acceptor.length;i++){
                            let arr=[]
                            if(userId==response.acceptor[i]){
                                // this.ruleForm1.acceptor=response.acceptor[0]
                                arr.push(response.acceptor[0])
                                this.ruleForm1.acceptor=arr
                            }
                        }
                    }
                    for(let i=0;i<this.ccPerson.length;i++){
                        let userId=this.ccPerson[i].userId
                        for(let i=0;i<response.ccPerson.length;i++){
                            let arr=[]
                            if(userId==response.ccPerson[i]){
                                // this.ruleForm1.ccPerson=response.ccPerson[0]
                                // console.log(this.ruleForm1.ccPerson,'this.ruleForm1.ccPerson')
                                arr.push(response.ccPerson[0])
                                this.ruleForm1.ccPerson=arr
                            }
                        }
                    }
                    // this.ruleForm1.executor='王利';
                    // this.ruleForm1.acceptor=response.acceptor;
                    // this.ruleForm1.ccPerson=response.ccPerson
                    // this.ruleForm1.ccPerson=['100']
                });
                this.reset();
                this.getMenuTreeselect();
                this.drawerGroup = true;
                this.title = "添加角色";
            },
            /** 修改按钮操作 */
            handleUpdate(row) {
                console.log(row)
                this.ruleForm1=row
                this.drawerGroup = true;
            },
            /** 分配数据权限操作 */
            handleDataScope(row) {
                this.reset();
                const roleDeptTreeselect = this.getRoleDeptTreeselect(row.roleId);
                getRole(row.roleId).then(response => {
                    this.form = response.data;
                    this.openDataScope = true;
                    this.$nextTick(() => {
                        roleDeptTreeselect.then(res => {
                            this.$refs.dept.setCheckedKeys(res.checkedKeys);
                        });
                    });
                    this.title = "分配数据权限";
                });
            },
            /** 提交按钮 */
            submitForm: function() {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        if (this.form.roleId != undefined) {
                            this.form.menuIds = this.getMenuAllCheckedKeys();
                            updateRole(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess("修改成功");
                                    this.open = false;
                                    this.getList();
                                }
                            });
                        } else {
                            this.form.menuIds = this.getMenuAllCheckedKeys();
                            addRole(this.form).then(response => {
                                if (response.code === 200) {
                                    this.msgSuccess("新增成功");
                                    this.open = false;
                                    this.getList();
                                }
                            });
                        }
                    }
                });
            },
            /** 提交按钮（数据权限） */
            submitDataScope: function() {
                if (this.form.roleId != undefined) {
                    this.form.deptIds = this.getDeptAllCheckedKeys();
                    dataScope(this.form).then(response => {
                        if (response.code === 200) {
                            this.msgSuccess("修改成功");
                            this.openDataScope = false;
                            this.getList();
                        }
                    });
                }
            },
            /** 删除按钮操作 */
            handleDelete(row) {

                delItem(row.projId,row.guid).then(response => {
                    if(response.code==200){
                        this.$notify({
                            message: '删除成功',
                            type: 'success'
                        });
                    }
                    this.getData()
                    this.showList=true
                });
            },
            /** 导出按钮操作 */
            handleExport() {
                const queryParams = this.queryParams;
                this.$confirm('是否确认导出所有角色数据项?', "警告", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(function() {
                    return exportRole(queryParams);
                }).then(response => {
                    this.download(response.msg);
                }).catch(function() {});
            },
            // close drawer
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
        }
    };
</script>
<style scoped>
  #main1{
    margin-top: -25px;
  }
  .eventLeft{
    margin: 20px;
    border: 1px solid #ddd;
    box-shadow: 2px 2px 8px #d9d9d9;
    height: 216px;
  }
  .statistics{
    font-size: 16px;
    color: #333333;
    margin: 12px;
  }
  .statisticsItem1{
    float: left;
    margin: 0 21px;
    margin-top: 31px;
  }
  .event1{
    font-size: 12px;
    color: #666;
    margin-bottom: 16px;
  }
  .event2{
    color: #333333;
    font-size: 40px;
    text-align: center;
  }
  .app-container /deep/.el-drawer {
    width: 65%!important;
    overflow-y: scroll;
    border: 15px solid #EFF1F4;
    border-right: none;
  }
  .changeStuff /deep/.el-form-item__content{
    width: 48%;
  }
  .constructionTitle{
    font-size: 18px;
    margin-left: 15px;
    margin-bottom: 30px;
    margin-top: 40px;
    color: #303133;
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
  .mainBtn{
    margin-left: 60px;
    margin-bottom: 20px;
    margin-top: 60px;
  }
</style>

