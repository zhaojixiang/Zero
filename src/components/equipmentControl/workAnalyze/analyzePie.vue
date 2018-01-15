<template>
  <chart :options="pie1" id="myChart15" :style="{width: '400px', height: '260px'}"></chart>
</template>

<style scoped>
</style>

<script>
  export default {
    props: ['option','data','setting','child'],
    data: function() {
      return {
        pie1:{
          title : {
            text: '>>站点运行状况',
            left: 0,
            top: 10,
            textStyle:{
              fontSize: 16,
              color:'#56e5ff'
            }
          },
          color:['#14d1b0','#ff8383','#d9d9d9'],
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: '20',
            top:'70',
            itemHeight: 14,
            itemWidth: 14,
            data: ['正常','异常','未运行'],
            textStyle: {
              fontWeight: 'normal',
              color: '#fff',
            }
          },
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius : '70%',
              center: ['60%', '60%'],
              data:[
                {value:335, name:'正常'},
                {value:310, name:'异常'},
                {value:234, name:'未运行'},
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
    },

    methods:{
      // getChildData:function(){
      //   for (var i = 0; i < this.data.length; i++) {
      //     if(this.data[i].child != undefined) {
      //       return this.data[i].child;
      //     }
      //   }
      // },
    },
  }
</script>
