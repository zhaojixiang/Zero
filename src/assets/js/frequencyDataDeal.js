var Uint64LE = require("int64-buffer").Uint64LE;
let combineData = function(startFreq,stepFreq,stopFreq,factor,index,levels){
      let data = [];
      for (var i = 0; i < levels.length; i++) {
        let lev = levels[i];
        data.push([(startFreq+stepFreq*(i+index))/1000000,(lev/factor)]);
      }
      return data;
    };
let spliceData = function(series,maxArray,minArray,data) {
      // let series = [];
      // let maxArray = [];
      // let minArray = [];
      for (var i = 0; i < data.length; i++) {
        let packet = data[i].data;
        let combinedData = combineData(packet.StartFreq,packet.StepFreq,packet.StopFreq,packet.Factor,packet.Index,packet.Levels);
        let levels = packet.Levels;
        // console.log(levels,'before');
        /*
        * 过滤数据点，将相邻的点值相差不大的去除,使用typedArray的filter方法
        */
        // levels = levels.filter((y,i,arr)=>{
        //   if(i == arr.length-2) {
        //     return true;
        //   }
        //   // console.log('filter',Math.abs(y-arr[i+1]),packet.Factor*5);
        //   if(Math.abs(y-arr[i+1]) < packet.Factor*5) {
        //     // console.log('filter',i);
        //     return false;
        //   } else {
        //     return true;
        //   }
        // });
        /*
        * 过滤数据点，将相邻的点值相差不大的去除,使用array的splice方法
        */
        // for (var i = 0; i < combinedData.length; i++) {
        //   // let l = levels[i];
        //   if(i == combinedData.length-2) {
        //     break;
        //   }
        //   if(Math.abs(combinedData[i][1]-combinedData[i+1][1]) < packet.Factor*5) {
        //     combinedData.splice(i,1);
        //   }
        // }
        // console.log(levels,'after');
        for (var i = 0; i < combinedData.length; i++) {
          let xy = combinedData[i];
          let arrIndex = packet.Index+i;
          //计算最大数组
          if(maxArray[arrIndex] == undefined) {
            maxArray[arrIndex] = xy;
          } else if(maxArray[arrIndex][1] < xy[1]) {
            maxArray[arrIndex] = xy;
          }
          //计算最小数组
          if(minArray[arrIndex] == undefined) {
            minArray[arrIndex] = xy;
          } else if(minArray[arrIndex][1] > xy[1]) {
            minArray[arrIndex] = xy;
          }
          series[arrIndex] = xy;
        }


      }
      // console.log(series);
      return [series,maxArray,minArray];
    };
let processData = function(data){
      let head = {};
      let offset = 0;
      var res = new DataView(data);
      head.nMagic = res.getUint32(offset,true);
      offset += 4;
      head.wVersionMajor = res.getUint16(offset,true);
      offset += 2;
      head.wVersionMinor = res.getUint16(offset,true);
      offset += 2;
      head.strID = bin2string(new Int8Array(data,offset,48));
      offset += 48;
      head.wSequence = res.getUint16(offset,true);
      offset += 2;
      head.nRserved = new Int16Array(data,offset,3);
      offset += 6;
      head.nLength = res.getUint32(offset,true);
      offset += 4;
      let dataArray = [];
      while (offset < head.nLength) {
        let temp = {};
        temp.length = res.getUint32(offset,true);
        offset += 4;
        temp.tag = bin2string(new Int8Array(data,offset,20));
        offset += 20;
        temp.data = {};
        switch (temp.tag.toUpperCase()) {
          case "SCAN":
            let subData = data.slice(offset,offset+temp.length - 24);
            let subRes = new DataView(subData);
            let subOffset = 0;
            temp.data.Channel = subRes.getUint8(subOffset,true);
            subOffset += 1;
            temp.data.Segment = subRes.getUint16(subOffset,true);
            subOffset += 2;
            temp.data.Factor = subRes.getUint8(subOffset,true);
            subOffset += 1;
            temp.data.StartFreq = (new Uint64LE(new Uint8Array(data,offset+subOffset,8))).toNumber();
            subOffset += 8;
            temp.data.StepFreq = subRes.getUint32(subOffset,true);
            subOffset += 4;
            temp.data.StopFreq = (new Uint64LE(new Uint8Array(data,offset+subOffset,8))).toNumber();
            subOffset += 8;
            temp.data.Over = subRes.getUint8(subOffset,true);
            subOffset += 1;
            temp.data.Index = subRes.getUint32(subOffset,true);
            subOffset += 4;
            temp.data.TotalCount = subRes.getUint32(subOffset,true);
            subOffset += 4;
            temp.data.Length = subRes.getUint32(subOffset,true);
            subOffset += 4;
            if(subOffset%2 == 0) {
              temp.data.Levels = new Int16Array(subData,subOffset);
            } else {
              temp.data.Levels = new Int16Array(subData.slice(subOffset));
            }
            // console.log('index:',temp.data.Index,'over:',temp.data.Over);
            dataArray.push(temp);
            break;
          default:

        }
        offset += (temp.length - 24);
        // console.log('start',temp.data,temp.data.Length,temp.data.Levels);
      }
      return {head:head,data:dataArray};
};
let bin2string = function(array){
    	var result = "";
    	for(var i = 0; i < array.length; ++i){
        if(array[i] > 0){
      		result+= (String.fromCharCode(array[i]));
        }
    	}
    	return result;
    }
export {processData,spliceData,bin2string};
