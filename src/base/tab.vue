<template>
  <section class="baseTab">
    <div class="legend">
      <ul class="icons_ul">
        <li class="icons">
          <span class="square" :style="{backgroundColor:channelColors.legel}"></span>合法
        </li>
        <li class="icons">
          <span class="square" :style="{backgroundColor:channelColors.violat}"></span>违规
        </li>
        <li class="icons">
          <span class="square" :style="{backgroundColor:channelColors.illegal}"></span>非法
        </li>
				<li class="icons">
          <span class="square" :style="{backgroundColor:channelColors.unused}"></span>登记未使用
        </li>
        <li class="icons">
          <span class="square" :style="{backgroundColor:channelColors.undistributed}"></span>未分配
        </li>
      </ul>
    </div>
    <table cellspacing="0">
      <tbody>
      <tr v-for="(item,index) in tabData" :key="index">
        <td class="channel_title">{{ item.name }}</td>
        <td v-for="(data,idx) in item.data"
            @click="click(data,index,idx)"
            :style="{backgroundColor:data.type==0?channelColors.legel:data.type==1?channelColors.illegal:data.type==2?channelColors.violat:data.type==3?channelColors.unused:channelColors.undistributed}" class="channel_td"
            :key="idx">
          <i v-show="!!data.checked" class="channel-checked el-icon-check"></i>
          <el-popover
            placement="top"
            width="120"
            trigger="hover">
            <!-- <slot>{{`频率: ${data[0].freq}  信号覆盖率: ${data[0].result.signalCover}%`}}</slot> -->
            <div>
              <p>{{`频率:${data.freq}MHz`}}</p>
              <p>{{`信号覆盖率:${data.cover.toFixed(2)}%`}}</p>
            </div>
            <el-button type="text" slot="reference" :style="{color:'#6c6c6c'}">{{data.count?data.count:' '}}</el-button>
          </el-popover>
        </td>
      </tr>
      </tbody>
    </table>
     <div class="remark">
      备注: 共有信道 {{channelCount}} 个；信道表格上的数字表示该类型的台站数量
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
export default {
	props: ["nearlyStaions" ,"tabData","check","channelColors","channelCount"],
	methods: {
		minus: function() {
			this.$emit("filtrate-minus");
		},
		click:function(item,index,idx){
      if(this.check) {
        this.tabData.data[index].data[idx].checked = !this.tabData.data[index].data[idx].checked;
      }
      this.$emit('currentClick', item, index, idx)
		},
	}
};
</script>

<style scoped lang='less'>
@font_color:#6c6c6c;
.baseTab {
	min-width: 480px;
	box-sizing: border-box;
	.legend {
		.icons_ul {
			height: 20px;
			display: flex;
			justify-content: center;
			padding: 0px;
			.icons {
				.square {
					width: 10px;
					height: 10px;
					display: inline-block;
					margin: 0 10px;
				}
			}
			li {
				list-style: none;
				padding: 0px;
				height: 20px;
				line-height: 20px;
				color:@font_color;
			}
		}

	}
	table {
		width: 100%;
		border-collapse: collapse;
		display: flex;
		justify-content: center;
		td {
			width: 30px;
			height: 20px;
			padding: 0;
			text-align: center;
			border: solid 1px #6c6c6c;
			cursor: pointer;
		}
	}
	.channel_title {
		color: @font_color;
		cursor: auto;
		border: none;
	}
	.channel_td {
		color: @font_color;
    position: relative;
	}
	p {
		color: #b7dbfd;
		text-align: center;
		margin-top: -15px;
		font-size: 12px;
	}
	.remark {
		width: 100%;
		text-align: center;
		margin: 10px;
		color: #7F8081;
	}
	.el-button {
		padding: 0px;
	}
}

.el-popover {
  background: #5294d1;
  color: #fefefe;
  border: none;
  min-width: 109px;
}
  .channel-checked {
    position: absolute;
    bottom: 0px;
    color: #fff;
  }
</style>
