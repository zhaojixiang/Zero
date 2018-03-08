<template>
    <section class="content_station" v-loading='stationInfoLoading'>
        
        <section style="text-align:center;">
            <slot name='exception'></slot>
            <el-row class="thead">
                <el-col :span="6" class="column_title">经度</el-col>
                <el-col :span="6" class="column_title">纬度</el-col>
                <el-col :span="6" class="column_title">频率(MHz)</el-col>
                <el-col :span="6" class="column_title">参数</el-col>
            </el-row>
            <list :data='allStationInfo.stationInfo' v-if="!allStationInfo.stationInfoEmpty"></list>
            <section v-if='allStationInfo.stationInfoEmpty' class="box_container">
            <i class="iconfont icon-box-empty icon_box_empty"></i>
            <p style="color:#ccc;">暂时没有数据～</p>
            </section>
        </section>
        <section class="footer">
            <el-pagination
                layout="prev, pager, next"
                :total="allStationInfo.stationTotalCount"
                @current-change='stationPageChange'>
            </el-pagination>
        </section>
    </section>
</template>
<style lang="less" scoped>
    @color:#88898A;
    .content_station{
        height: 100%;
        // .checkBox{
            // padding: 10px 20px;
            // display: inline-block;
            // box-sizing: border-box;
            .el-checkbox{
                color:@color;
                margin-left: 0;
                padding: 0 15px;
                width: 30px;
                font-size: 12px;
            }
        // }
        .thead {
            width: 100%;
            box-sizing: border-box;
            margin: 0 auto;
            .column_title{
                text-align: center;
                color:@color;
            }
        }
        .footer{
            position: absolute;
            width: 100%;
            bottom: 10px;
            text-align: center;
        }
    }
</style>
<script>
import List from 'base/listDetail';
export default {
    data() {
        return {
            
        }
    },
    components:{
        List
    },
    // ['allStationInfo','stationInfoLoading']
    props:{
        allStationInfo:{
            type:Object,
            default:function() {
                return {
                    stationInfo:[],
                    stationTotalCount:0,
                    stationInfoEmpty:false
                }
            }
        },
        stationInfoLoading:{
            type:Boolean
        }
    },
    methods:{
        // 运营商 选择改变
        // operatorChange(val) {
        //     let m = val.join('');
        //     this.$emit('operatorChange',m); 
        // },
        // // 制式 选择改变
        // standardChange(val) {
        //     let m = val.join('');
        //     this.$emit('standardChange',m);           
        // },
        // // 页面切换
        stationPageChange(val) {
            this.$emit('stationPageChange',val);
        }
    }
}
</script>
