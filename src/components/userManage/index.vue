<template>
    <section class="container">
        <div class="table-title">
            <span>
                <span style="font-size:25px;font-weight;bold;">全部用户</span> 
                <span>共({{count}}条)</span>
            </span>
            <el-button class="add-btn" type="primary" size="mini" @click="newUser">新增用户</el-button>
        </div>
        <!-- Table 表 信息展示 -->
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
            <el-table-column label='序号' align="center" type="index" width="55"></el-table-column>
            <el-table-column prop="userName" align="center" label="账户" width="220"></el-table-column>
            <el-table-column prop="city" align="center" label="城市" width="120"></el-table-column>
            <el-table-column align="center" label="创建时间" >
                <template slot-scope="scope">
                    <span>{{new Date(scope.row.regestTime).Format('yyyy-MM-dd')}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="有效期" width="220">
                <template slot-scope="scope">
                    <span>{{new Date(scope.row.validTime).Format('yyyy-MM-dd')}}</span>
                </template>
            </el-table-column>       
            <el-table-column prop="permission" align="center" label="权限">
                <template slot-scope="scope">
                    <span>{{scope.row.permission==2?'临时用户':scope.row.permission==1?'普通用户':'超级用户'}}</span>
                </template>
            </el-table-column>        
            <el-table-column align="center" label="操作" width="100">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                        <i @click="userEdit(scope.row)" class="el-icon-edit edit-title" style="color:#409EFF;font-size:20px;text-align:left;margin-right:10px;cursor:pointer;"></i>                    
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top">
                        <i @click="userDelete(scope.row)" class="el-icon-delete delete-title" style="color:#F56C6C;font-size:20px;text-align:right;margin-left:10px;cursor:pointer;"></i>                        
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="text-align:right;margin-top:20px;" background layout="prev, pager, next" @current-change="userManageCurrentChange" :page-size="pageSize" :current-page.sync="pageIndex" :total="count">
        </el-pagination>
        <!-- 弹出框提示 -->
        <el-dialog :title="dialog_title" :visible.sync="dialogFormVisible" center width="30%" :show-close='false'>
            <el-form :rules="dialog_rule" ref="userInfos" :model="dialog_form" v-if="no_delete">
                <el-form-item label="账户" :label-width="formLabelWidth" prop="userName">
                    <el-input v-model="dialog_form.userName" style="width:219px;" auto-complete="off" :maxlength='10'>
                        <i class="el-icon-edit el-input__icon"  style="font-size:20px;" slot="suffix"></i>
                    </el-input>
                </el-form-item>
                <el-form-item label="城市" :label-width="formLabelWidth" prop="cid">
                    <el-select v-model="dialog_form.cid" placeholder="请选择">
                        <el-option v-for="(item,index) in locationList" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                     <el-input :type="password?'password':'text'" style="width:219px;" v-model="dialog_form.password" auto-complete="off" :maxlength='10'>
                          <i slot="suffix" style="font-size:20px;" class="el-icon-view" @click="changeType"></i>
                     </el-input>
                </el-form-item>
                <el-form-item label="用户权限" :label-width="formLabelWidth" prop="permission">
                    <el-select v-model="dialog_form.permission" placeholder="请选择">
                        <el-option v-for="(item,index) in authorList" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-show="dialog_form.permission==2" label="有效期至：" :label-width="formLabelWidth">
                    <el-date-picker v-model="dialog_form.validTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
            </el-form>
            <span v-else>是否确认删除该用户: {{userName}} ?</span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit" :loading="logining">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<style scoped lang="less">
    .container {
        width: 100%;
        min-height: 700px;
        background-color: #fff;
        .table-title {
            border-bottom: 1px solid #ccc;
            padding: 5px 10px;
            span {
                vertical-align: middle;
            }
            .table-title::after {
                display: inline-block;
                width: 0;
                height: 100%;
                content: '';
            }
            .add-btn {
                display: inline-block;
                vertical-align: middle;
                margin-left: 10px;
            }
        }
       
    }
</style>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                count:0, // 总条数
                pageIndex:1,
                userName:'' ,// 即将被删除的用户
                pageSize:this.$const.pageSize,
                password:true, // 是否密码 明文展示
                logining:false, // 按钮加载
                dialogFormVisible:false, // 弹出框 显示 or 隐藏
                no_delete:true, // 是否 非 删除弹框
                dialog_title:'', // 弹出框的 标题
                formLabelWidth: '120px' ,
                 // 账户 权限
                authorList:[
                    {
                        value:1,
                        label:'普通用户'
                    },
                    {
                        value:2,
                        label:'临时用户'
                    }
                ],
                 // 城市列表
                locationList:[],
                // 用户信息
                dialog_form:{
                    userName:'',
                    cid:'',
                    password:'',
                    validTime:'',
                    permission:2
                },
                tableData: [],
                // 验证规则
                dialog_rule:{
                    userName:[
                        { required: true, message: '请输入用户姓名', trigger: 'blur' }
                    ],
                    cid:[
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    password:[
                        { required: true, message: '请输入初始密码', trigger: 'blur' }
                    ],
                    permission:[
                        { required: true, message: '请选择用户权限', trigger: 'change' }
                    ]
                }
            }

        },
        methods: {
            // 提交
            submit() {
                if (this.no_delete) {
                    this.$refs['userInfos'].validate((valid) => {
                        if (valid) {
                            this._submit();
                        } else {
                            return false;
                        }
                    });
                } else {
                    this._userDelete();
                }
                
            },
            _submit() {
                this.logining = true;
                if (this.dialog_title === '新增用户') {
                    this._newUser();
                } else {
                    this._userEdit();
                }
                setTimeout(() => {
                    this.logining = false;
                },2000);
            },
            // 修改 密码 明文和密文
            changeType() {
                this.password = !this.password;
            },
            // 页面切换
            userManageCurrentChange(val) {
                this.pageIndex = val;
                this.getAllUsers();
            },
            // 查询全部用户
            getAllUsers() {
                let param = {
                    pageIndex:this.pageIndex,
                    pageSize:this.pageSize
                }
                this.$api.userManage.getAllAccount(param).then(res=>{
                    let { success,msg,data } = res;
                    if (success) {
                        this.count = data.totalCount;
                        if (data.currentPageObjects.length) {
                            this.tableData = data.currentPageObjects;
                        }
                        
                    }
                })
            },
            // 新增用户
            newUser() {
                this.dialogFormVisible =  this.no_delete = true;
                this.dialog_form = {};
                this.dialog_title = '新增用户';
            },
            _newUser() {
                this.$api.userManage.addAccount(this.dialog_form).then(res=>{
                    let { success,msg } = res;
                    if (success) {
                        this.$message.success('新增成功');
                        this.getAllUsers();
                    } else {
                        this.$message.warning(msg);
                    }
                    this.dialogFormVisible = false;                    
                })
            },
            // 用户编辑
            userEdit(param) {
                this.dialogFormVisible =  this.no_delete = true;
                this.dialog_title = '编辑用户';
                this.dialog_form = Object.assign({},param);
            },
            _userEdit() {
                this.$api.userManage.alterAccount(this.dialog_form).then(res=>{
                    let { success,data,msg } = res;
                    if (success) {
                        this.$message.success('修改成功');
                        this.getAllUsers();
                    } else {
                        this.$message.warning(msg);
                    }
                    this.dialogFormVisible = false;                    
                })
            },
            // 用户删除
            userDelete(param) {
                this.dialogFormVisible = true;
                this.no_delete = false;
                this.dialog_title = '删除用户';
                this.userName = param.userName;
                this.dialog_form = Object.assign({},param);
            },
            _userDelete() {
                this.$api.userManage.deleteAccount({"userName":this.dialog_form.userName}).then(res=>{
                    let { success,data,msg } = res;
                    if (success) {
                        this.dialogFormVisible = false;
                        this.$message.success('删除用户成功~');
                        this.getAllUsers();
                    } else {
                        this.$message.warning(msg);
                    }
                })
            },
            // 获取城市列表
            getCitys() {
                this.locationList.length = 0;
                this.$api.userManage.getCitys().then(res=>{
                    let { success,data,msg } = res;
                    if (success) {
                        if (data.length) {
                            data.forEach(item=>{
                                this.locationList.push({
                                    value:item.value,
                                    label:item.name
                                })
                            })
                        }
                    }
                })
            }
        },
        mounted () {
            this.getAllUsers();
            this.getCitys();
        }
    }
</script>


