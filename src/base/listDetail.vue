<template>
    <section>
        <el-row v-for="(item,index) in data" :key="index">
            <!-- 当 item.mark == 4 时 ，列四等分 -->
            <section v-if="item.mark ==='4'">
                 <el-col :span='6' class="list_title">
                    <span>
                        {{item.desc}}
                    </span>
                </el-col>
                <el-col :span='6' class="list_title">
                    <span>
                        {{item.date}}
                    </span>
                </el-col>
                <el-col :span='6' class="list_title">
                    <span>
                        {{item.power}}
                    </span>
                </el-col>
                <el-col :span='6' class="list_title">
                    <span>
                        {{item.signalNature}}
                    </span>
                </el-col>
            </section>
            <!-- 当 item.mark == 2 时 列二等分-->
            <section v-else-if="item.mark ==='2'">
                 <el-col :span='10' class="list_title" style="text-align:left;padding-left:34px">
                    <span>
                        {{item.desc}}
                    </span>
                </el-col>
                <el-col :span='14' class="list_title">
                    <section class="inner_style">
                        <span v-if="isClick">
                            <a class="isClick" @click.stop="edit_part(item)">编辑频段</a>
                            <a class="isClick" @click.stop="edit_rate(item)">编辑频率</a>
                        </span>
                        <span v-else>
                            {{item.date}}
                        </span>
                        <!-- 垃圾桶 图标 -->
                        <i @click='deleteItem(item,index)' v-show="item.delete && typeof item.delete==='boolean'" class='iconfont icon-el-icon-delete' style='color:yellow;marginLeft:20px;'></i>
                    </section>
                </el-col>
            </section>
            <!-- 当 item.mark == 3 时 列三等分-->
            <section v-else-if="item.mark ==='3'">
                 <el-col :span='8' class="list_title">
                    <span>
                        {{item.desc}}
                    </span>
                </el-col>
                <el-col :span='8' class="list_title">
                    <span>
                        {{item.date}}
                    </span>
                </el-col>
                <el-col :span='8' class="list_title">
                    <span>
                        {{item.power}}
                    </span>
                </el-col>
            </section>
            <!-- 当 item.mark == 6 时 列六等分-->
            <section v-else-if="item.mark ==='6'">
                <el-col :span='5' class="list_title">
                    <span>
                        {{item.station_name}}
                    </span>
                </el-col>
                <el-col :span='3' class="list_title">
                    <span>
                        {{item.operator}}
                    </span>
                </el-col>
                <el-col :span='3' class="list_title">
                    <span>
                        {{item.tech_sys}}
                    </span>
                </el-col>
                <el-col :span='3' class="list_title">
                    <span>
                        {{item.standard}}
                    </span>
                </el-col>
                <el-col :span='5' class="list_title">
                    <span>
                        {{item.launch_date}}
                    </span>
                </el-col>
                <el-col :span='5' class="list_title">
                    <span>
                        {{item.rate_range}}
                    </span>
                </el-col>
            </section>
        </el-row>
    </section>
</template>
<script>
export default {
  methods: {
    deleteItem(item, index) {
      this.$emit("deleteItem", item);
      // 暂时页面删除单个数据
    },
    edit_rate(item) {
      this.$emit("edit_rate", item);
    },
    edit_part(item) {
      this.$emit("edit_part", item);
    }
  },
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    isClick: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style scoped>
.isClick {
  text-decoration: underline;
  cursor: pointer;
  color: gold;
}
.list_title {
  text-align: center;
  color: #fff;
  margin-top: 10px;
}
.inner_style{
    display: flex;
    justify-content: flex-end;
    padding-right: 15px;
}
</style>
