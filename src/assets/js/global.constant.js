const right_arrow = 'src/assets/image/right-arrow.png'

const tabIcon2 = 'src/assets/image/tabIcon2.png'

const tabIcon1 = 'src/assets/image/tabIcon1.png'

const tabIcon3 = 'src/assets/image/tabIcon3.png'

const BAND_WIDTH = 200

const NATRUE_LAW = '合法'

const CID = '34010000' // 频谱评估

const _CID = '34170000' // 频谱评估基站分析

const CID_ = '1200'

const START_TIME = '2016-12-12'

const END_TIME = '2017-12-12'

const START_FREQ = 88

const STOP_FREQ = 108

const STEP_FREQ = 100

const THRES_HOLD = 3

const THRES_HOLD_TYPE = true

const STATION_NUMBER = 1

// const BUSINESS_BAND = '87MHz-108MHz 广播频段'

const BUSINESS_BAND = '88MHz-108MHz 广播'

const FIXED_TIME = '2017-12-12'

const AREA = ''

Date.prototype.Format = function(fmt) { // author: meizz
  var o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "H+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    "S": this.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}



const globalConstant = {
  TYPE_ALL: 0,
  TYPE_A: 1,
  TYPE_B: 2,
  TYPE_C: 3,
  TYPE_D: 4,
  right_arrow,
  tabIcon2,
  tabIcon1,
  tabIcon3,
  BAND_WIDTH,
  NATRUE_LAW,
  CID,
  CID_,
  _CID,
  START_TIME,
  END_TIME,
  START_FREQ,
  STOP_FREQ,
  STEP_FREQ,
  THRES_HOLD,
  THRES_HOLD_TYPE,
  STATION_NUMBER,
  BUSINESS_BAND,
  FIXED_TIME,
  AREA,
  pageSize:10
};
export default globalConstant;
