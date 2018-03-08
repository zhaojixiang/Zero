<template>
  <div class="newPaging">
    <div class="pagingTitle">
      <h3><img :src="icon_right_arrow"> 固定站列表</h3>
      <span class="minus" @click="minus"><i class="el-icon-minus i-minus"></i></span>
    </div>
    <div class="pagingContent">
      <el-table
        ref="multipleTable"
        :data="pageData"
        tooltip-effect="dark"
        style="width: 100%"
        empty-text="暂无数据"
        @selection-change="selectStation">
        <el-table-column
          label="名称"
          prop="stationName"
          width="340"
          class-name="column"
          >
        </el-table-column>
        <el-table-column
          label="功率变化趋势"
          type="selection"
          >
        </el-table-column>
      </el-table>
    </div>
    <div class="block1" >
      <el-pagination
        layout="prev, pager, next"
        :total="data.length">
      </el-pagination>
   </div>
  </div>
</template>

<script>
export default {
  props:['data'],
  data(){
    return {
      pageData:[],
      currentPage:1,
    }
  },
  computed:{
    icon_right_arrow() {
      return this.$const.right_arrow
    }
  },
  methods:{
    minus:function(){
      this.$emit('minus');
    },
    selectStation:function(selected){
      this.$emit('selected',selected);
    },
    setData:function(){
      let offset = (this.currentPage-1)*10;
      if((offset+10)<this.data.length) {
        this.pageData = this.data.slice(offset,offset+10);
      } else {
        this.pageData = this.data.slice(offset);
      }
    }
  },
  watch:{
    data:function(newVal){
      this.total = newVal.length;
      this.setData();
    },
  },
}
</script>

<style>
.newPaging{
position: relative;
}
.column {
  font-size: 12px;
  color: #8F9091;
}
.el-table td, .el-table th.is-leaf {
  border-bottom: none;
}
.newPaging .pagingTitle h3{
  font-weight: normal;
  margin: 0;
}
/* .newPaging .pagingTitle h3 img{
  height: 20px;
  width: 20px;
} */
.newPaging .pagingTitle{
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #568db7;
  border-bottom: solid 1px #c6c6c6;
  padding: 0 10px;

}
.newPaging .pagingContent{
  width: 86%;
  margin: 0 auto;
  font-size: 12px;
}
.newPaging .pagingContent .height{
  height: 25px;
  line-height: 25px;
}
.newPaging .block1{
  position: absolute;
  bottom: 0px;
  width: 100%;
  text-align: center;
}
.newPaging .el-pagination{
  color: #696969;
}
.newPaging .minus{
  color: #2c73a1;
  position: absolute;
  top: 0px;
  right: 10px;
  font-size: 16px;
  cursor: pointer;
}
</style>
