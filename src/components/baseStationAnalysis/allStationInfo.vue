<template>
    <section class="wrapper">
        <section class='headerTitle'>
            <el-tabs v-model="activeTabs" type="card" @tab-click="handleClick" style="height: 40px;">
                <el-tab-pane label="所有基站" name="FIRST">
                </el-tab-pane>
                <el-tab-pane label="正常基站" name="SECOND">
                </el-tab-pane>
                <el-tab-pane label="异常基站" name="THIRD">
                </el-tab-pane>
                <el-tab-pane label="未登记基站" name="FOURTH">
                </el-tab-pane>
            </el-tabs>
            <span class="minus" @click="minus"><i class="el-icon-minus i-minus"></i></span>
        </section>
        <!-- <section> -->
            <el-checkbox-group v-model="operatorList" class="checkBox" @change='operatorChange'>
                <el-checkbox label="移动"></el-checkbox>
                <el-checkbox label="联通"></el-checkbox>
                <el-checkbox label="电信"></el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="standardList" class="checkBox" @change='standardChange'>
                <el-checkbox label="2G"></el-checkbox>
                <el-checkbox label="3G"></el-checkbox>
                <el-checkbox label="4G"></el-checkbox>
            </el-checkbox-group>
        <!-- </section> -->
        <content-station :allStationInfo='allStationInfo' :stationInfoLoading='stationInfoLoading' @stationPageChange='stationPageChange' @operatorChange='operatorChange' @standardChange='standardChange'>
            <section slot='exception' class="exception" v-if="activeTabs==='THIRD'">
                <label>
                    异常类型:
                    <el-select @change='exceptionChange' size='mini' v-model="value" placeholder="请选择">
                        <el-option
                            v-for="(item,index) in exceptionTypes"
                            :key="index"
                            :value="item.value"
                            :label="item.label">
                        </el-option>
                    </el-select>
                </label>
            </section>
        </content-station>
    </section>
</template>
<script>
import ContentStation from 'components/baseStationAnalysis/contentOfStation';
export default {
    props:['stationInfoLoading','allStationInfo'],
    data() {
        return {
            activeTabs:'FIRST',
            value:'',
            operatorList:['移动','联通','电信'],
            operators:['移动','联通','电信'],
            fuck:'you',
            standardList:['2G','3G','4G'],
            standards:['2G','3G','4G'],
            exceptionTypes:[
                {
                    label: 'GSM-R频段内有运营商基站',
                    value:'GSM-R频段内有运营商基站'
                },
                 {
                    label: '伪基站',
                    value:'伪基站'
                    
                },
                {
                    label: '在室外发现室内基站',
                    value:'在室外发现室内基站'
                    
                },
                {
                    label: 'WCDMA基站在已规划未使用频段',
                    value:'WCDMA基站在已规划未使用频段'
                    
                },
                {
                    label: '在已规划未使用频段内发现基站',
                    value:'在已规划未使用频段内发现基站'
                    
                }
            ]
        }
    },
    computed: {
        icon_right_arrow() {
            return this.$const.right_arrow
        }
    },
    components:{
        ContentStation
    },
    methods:{
      handleClick(param){
        this.operatorList = this.operators;
        this.standardList = this.standards;
        this.activeTabs = param.name;
        this.$emit('tabChange',param.label);
      },
      minus(){
        this.$emit('minus');
      },
      // 信号制式切换
      standardChange(val) {
          this.$emit('standardChange',val.join(''));
      },
    //   切换运营商
      operatorChange(val) {
          this.$emit('operatorChange',val.join(''));
      },
      // 当前选中页面改变
      stationPageChange(val) {
          this.$emit('stationPageChange',val);
      },
      // 选择的异常类型 改变
      exceptionChange(val) {
          this.$emit('exceptionChange',val);
      }
    },
}
</script>
<style scoped lang='less'>
@color:#88898A;
.wrapper{
    .headerTitle {
        .minus {
            top: 10px;
        }
    }
    .checkBox {
        padding: 10px;
        display: inline-block;
        box-sizing: border-box;
    }
    .exception {
        display: flex;
        justify-content: center;
        padding-bottom: 10px;
    }
    .el-pagination{
        color: @color;
    }
    .el-tabs__item {
        color: @color !important;
    }
    .el-pagination .btn-next, .el-pagination .btn-prev,.wrapper .el-pagination button.disabled,.el-dialog, .el-pager li{
        background: none;
        color: @color;
    }
    .el-checkbox__label {
        color: @color !important;
    }
    .el-pagination button.disabled{
        background: none;
    }
    .el-main {
        padding: 10px 5px 10px 10px;
    }
}
</style>
