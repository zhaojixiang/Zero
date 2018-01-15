Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "H+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

export const right_arrow = 'src/assets/image/right-arrow.png'

export const tabIcon2 = 'src/assets/image/tabIcon2.png'

export const tabIcon1 = 'src/assets/image/tabIcon1.png'

export const tabIcon3 = 'src/assets/image/tabIcon3.png'

export const BAND_WIDTH = 200

export const NATRUE_LAW = '合法'

export const CID = '34010000'

export const START_TIME = '2016-12-12'

export const END_TIME = '2017-12-12'

export const START_FREQ = 88

export const STOP_FREQ = 108

export const STEP_FREQ = 100

export const THRES_HOLD = 3

export const THRES_HOLD_TYPE = true   

export const STATION_NUMBER = 1

export const BUSINESS_BAND = '87MHz-108MHz 广播频段'

export const AREA = ''





function date() {
    let time = new Date('2011-01-01 00:00:00'),
        year = time.getFullYear(),month = time.getMonth() + 1,date = time.getDate(),
        hour = time.getHours(),days = new Date(year,month,0).getDate()
    let arr = []
    for(let i=1;i<=days;i++) {
        for(let j=0;j<24;j++) {
            j++;
            hour += 1
            let dt = `${year}-${month}-${date}`
            let temperature = Math.random()*100
            if(Number.parseInt(temperature)%2===1) {
                // console.log(temperature.toString())
                temperature = `-${temperature.toFixed(2)}`
            }else{
                temperature = temperature.toFixed(2)
            }
            if(hour === 24) {
                hour = 0
                date += 1
            }
            arr.push([dt,hour,temperature])            
        }
        if(i==days) {
            hour = 0
            date()
        }
    }
    console.log(days)
    return arr
}