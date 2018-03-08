<!-- 频谱评估分析 任务管理 -->
<template>
<section id="taskManage">
  <!-- <nav1 :navBarTitleShow='true' :navBarTitle='navBarTitle' /> -->
  <div class="content">
    <h3>
      <p><span v-show="showTaskList">全部任务(共{{taskManageData.length}}条)</span></p>
      <i style="cursor:pointer;position:absolute;top: 10px;right:16px;font-size:20px" @click="closeTaskList" class="el-icon-minus"></i>
    </h3>

    <!-- 任务管理列表 -->
    <div v-loading="taskListLoading" style="height: 100%">
      <el-table :data="taskManageData" style="width: 100%" v-show="showTaskList">
        <el-table-column prop="taskName" label="任务名称" width="130">
        </el-table-column>
        <el-table-column label="创建时间" width="100">
          <template slot-scope="scope">
            <span>{{new Date(scope.row.createTime).Format('yyyy-MM-dd')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="provinceName" label="所属省份" width="100">
        </el-table-column>
        <el-table-column label="执行状态" width="100">
          <template slot-scope="scope">
            <span :style="{color:scope.row.status=='失败'?'#f40':scope.row.status=='已完成'?'#686868':'#24b200'}">{{scope.row.status}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="70">
          <template slot-scope="scope">
            <i style="color:#6a9dff;cursor:pointer;font-size:14px" @click="details(scope.row)" class="el-icon-tickets"></i> &nbsp;
            <i style="color:red;cursor:pointer;font-size:14px" @click="deleteBefore(scope.row)" class="el-icon-delete"></i>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottomBtn" v-show="showTaskList">
        <el-button @click="newTask" size="mini" type="primary"><i class="el-icon-plus"></i>新建任务</el-button>
        <el-button @click="refresh" size="mini"><i class="el-icon-refresh"></i>刷新数据</el-button>
      </div>
    </div>
    <!-- 详细信息 -->
    <el-dialog :modal="false" :visible.sync="dialogTableVisible1">
      <div slot="title" style="display:flex;justify-content:space-between;color:#fff;margin-right:30px;font-size:14px"><span>频谱分析任务</span><span>所属省份 : {{detailsData.provinceName}} &emsp;开始于 : {{new Date(detailsData.startTime).Format('yyyy-MM-dd')}} &emsp; 结束于 : {{new Date(detailsData.stopTime).Format('yyyy-MM-dd')}}</span></div>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item :name="i" v-for="(data,i) in detailsData.questionInfo" :key="i">
          <div slot="title" style="position:relative">
            <span>{{data.cityName}}</span><span style="right:60px;position:absolute;color:#359ddd">业务频段{{data.bandInfo.length}}个</span>
          </div>
          <el-row>
            <el-col :span="8" v-for="(item,index) in data.bandInfo" :key="index">{{item}}</el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-dialog>

    <!-- 确认删除弹框 -->
    <el-dialog title="提示" :modal="false" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>确认要删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="deleteData">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</section>
</template>

<style lang='less'>
#taskManage {
    background: #fff;
    height: 550px;
    width: 500px;
    position: relative;
    border: solid 1px #33ccff;
    .content {
      height: 94%;
        h3 {
            position: relative;
            height: 40px;
            line-height: 40px;
            margin: 0;
            font-size: 14px;
            text-align: center;
            font-weight: normal;
            background: #409EFF;
            color: #fff;
        }
        .block {
            width: 100%;
            text-align: center;
            position: absolute;
            bottom: 20px;
        }
        .el-table {
            font-size: 12px;
            .cell{
              text-align: center;
            }
        }
        .el-table__body-wrapper{
          height: 400px;

        }
        .el-table::before{
          height: 0px;
        }
        .bottomBtn{
          width: 100%;
          text-align: center;
          margin-top: 20px;
        }
    }
    ::-webkit-scrollbar {
        display: none;
    }
    .el-dialog__close{
      color: #fff;
    }
}
</style>

<script>
import {
  menuShowMixin
} from "assets/js/mixin";
import nav1 from "components/equipmentControl/common/Nav1.vue";
export default {
  data() {
    return {
      navBarTitle: '任务管理',
      dialogVisible: false,
      dialogTableVisible1: false,
      activeNames: ["1"],
      data: 'lol',
      detailsData: {},
      deleteGuid: {}
      // taskListLoading: true,
      // showTaskList: false,
    }
  },
  props: {
    taskManageData: {
      type: Array
    },
    taskListLoading: {
      type: Boolean,
      default: true
    },
    showTaskList: {
      type: Boolean,
      default: false
    }
  },
  components: {
    nav1
  },
  mounted() {

  },
  computed:{
  },
  mixins: [menuShowMixin],
  methods: {
    remove() {
      alert(111)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleChange(val) {
      console.log(val);
    },
    // 新建任务
    newTask() {
      this.$router.push('newTask')
    },
    // 当前省份详细任务信息
    details(item){
      this.dialogTableVisible1 = true
      let params = {
        guid: item.guid
      }
      console.log(params,'00000000');
      this.$api.spectrumEvaluation.GetTaskInfo(params).then(res=>{
        let {success,data,msg} = res
        if (success) {
          if (data) {
            // console.log(this.detailsData = data);
            // console.log(this.detailsData,'000000');
            this.detailsData = data
            console.log(this.detailsData.provinceName,'00000000000000');
          }
        }else{
          this.$message({
            type: 'warning',
            message: msg
          })
        }
      })
    },
    // 刷新
    refresh(){
      this.$emit('refresh')
    },
    // 关闭任务列表
    closeTaskList(){
      this.$emit('closeTaskList')
    },
    deleteBefore(item){
      this.dialogVisible = true
      this.deleteGuid = item
      // console.log(item,'000000000000');
    },
    // 删除当前省份任务
    deleteData(){
      this.dialogVisible = false
      let params = {
        guid: this.deleteGuid.guid
      }
      // console.log(params,'111111111111');
      this.$api.spectrumEvaluation.GetDeleteTask(params).then(res=>{
        let {success,msg} = res
        if (success) {
          this.$emit('deleteRefresh')
          this.$message({
            type: 'success',
            message: msg
          })
        }else{
          this.$message({
            type: 'warning',
            message: msg
          })
        }
      })
    }
  }
}
</script>
