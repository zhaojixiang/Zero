<!--列表管理-->
<template>
  <section>
      <!-- dialog 弹窗 频段管理 -->
      <section v-if="listManage==='part_manage'">
        <el-row :gutter="20">
            <el-col :span='5' class="list_title">
                <span>
                    开始频率(MHz)
                </span>
            </el-col>
            <el-col :span='5' class="list_title">
                <span>
                    结束频率(MHz)
                </span>
            </el-col>
            <el-col :span='5' class="list_title">
                <span>
                    频率步进(KHz)
                </span>
            </el-col>
            <el-col :span='5' class="list_title">
                <span>
                    信号门限(dB)
                </span>
            </el-col>
            <el-col :span='4' class="list_title">
                <span>操作</span>
            </el-col>          
        </el-row>
      </section>
      <!-- dialog 弹窗 频点管理 -->      
      <section v-else>
          <el-row :gutter="20">
            <el-col :span='8' class="list_title">
                <span>
                    频率(MHz)
                </span>
            </el-col>
            <el-col :span='8' class="list_title">
                <span>
                    带宽(KHz)
                </span>
            </el-col>
            <el-col :span='8' class="list_title">
                <span>操作</span>
            </el-col>          
        </el-row>
      </section>
      <!-- dialog 弹窗 频段管理 列表数据 -->      
      <section class="center_main">
        <section v-if="listManage==='part_manage'">
            <el-row v-for='(item,index) in data' :key="index" :gutter="20">
                <el-col :span='5' class="list_title">
                    <span>
                        {{item.start}}
                    </span>
                </el-col>
                <el-col :span='5' class="list_title">
                    <span>
                        {{item.end}}
                    </span>
                </el-col>
                <el-col :span='5' class="list_title">
                    <span>
                        {{item.step}}
                    </span>
                </el-col>
                <el-col :span='5' class="list_title">
                    <span>
                        {{item.door}}
                    </span>
                </el-col>
                <el-col :span='4' class="list_title">
                    <span class='iconfont icon-el-icon-delete' style='color:yellow;' @click='deleteItem(item)'></span>
                </el-col>
            </el-row>
        </section>
      <!-- dialog 弹窗 频点管理 列表数据 -->              
        <section v-else>
            <el-row v-for='(item,index) in data' :key="index" :gutter="20">
                <el-col :span='8' class="list_title">
                    <span>
                        {{item.start}}
                    </span>
                </el-col>
                <el-col :span='8' class="list_title">
                    <span>
                        {{item.end}}
                    </span>
                </el-col>
                <el-col :span='8' class="list_title">
                    <span>
                        {{item.step}}
                    </span>
                </el-col>
            </el-row>
        </section>
      </section>      
  </section>
</template>
<script>
export default {
  props:{
      listManage:{
          type:String,
          default:'part_manage'
      },
      data:{
          type:Array
      }
  },
  methods:{
      deleteItem(item) {
          this.$emit('dialog_deleteItem',item)
      }
  }
};
</script>

<style>
.list_title {
  text-align: center;
  color: #fff;
  margin-top: 10px;
}
.center_main{
    height: 420px;
    overflow: hidden;
}
</style>


