var Uint64LE = require("int64-buffer").Uint64LE;
import simplify from './simplify'
let combineData = function(startFreq, stepFreq, levels) {
  let data = [];
  for (var i = 0; i < levels.length; i++) {
    let lev = levels[i];
    data.push([(startFreq + stepFreq * i )/ 1000000, (lev / 10)]);
  }
  return data;
};
let spliceData = function(avgArray,maxArray,minArray,data) {
  let series = [];
  let combinedData = combineData(data.startFreq, data.stepFreq, data.scan);

  // console.log('before',combinedData.length);
  // console.log(combinedData);
  // combinedData = simplify(combinedData,50,false);
  // console.log('after',combinedData.length);
  let cLength = combinedData.length;
  for (var i = 0; i < cLength; i++) {
    let xy = combinedData[i];
    //计算最大数组
    if (maxArray[i] === undefined) {
      maxArray[i] = xy;
    } else if (maxArray[i][1] < xy[1]) {
      maxArray[i] = xy;
    }
    //计算最小数组
    if (minArray[i] === undefined) {
      minArray[i] = xy;
    } else if (minArray[i][1] > xy[1]) {
      minArray[i] = xy;
    }
    //计算平均数组
    if(avgArray[i] === undefined) {
      avgArray[i] = xy;
    } else {
      avgArray[i][1] = (avgArray[i][1]+xy[1])/2;
    }
  }
  // console.log(series.length,'ll',series);
  // console.log(series);
  return [combinedData,avgArray,maxArray, minArray];
};
let processData = function(data) {
  let temp = {};
  let offset = 0;
  var res = new DataView(data);
  temp.Index = res.getInt32(offset,true);
  offset += 4;
  temp.nFlag = res.getUint32(offset, true);
  offset += 4;
  temp.cid = bin2string(new Int8Array(data, offset, 16));
  offset += 16;
  temp.sid = res.getInt16(offset,true);
  offset += 2;
  temp.polarity = bin2string(new Int8Array(data, offset, 2));
  offset += 2;
  temp.sign = bin2string(new Int8Array(data, offset, 2));
  offset += 2;
  temp.info = res.getInt8(offset, true);
  offset += 1;
  temp.wYear = res.getUint16(offset, true);
  offset += 2;
  temp.wMonth = res.getInt8(offset);
  offset += 1;
  temp.wDay = res.getInt8(offset,true);
  offset += 1;
  temp.wHour = res.getInt8(offset);
  offset += 1;
  temp.wMinute = res.getInt8(offset);
  offset += 1;
  temp.wSecond = res.getInt8(offset);
  offset += 1;
  temp.wMilliseconds = res.getUint16(offset, true);
  offset += 2;
  temp.lon = res.getFloat64(offset,true);
  offset += 8;
  temp.lat = res.getFloat64(offset,true);
  offset += 8;
  temp.h = res.getFloat32(offset, true);
  offset += 4;
  temp.startFreq = (new Uint64LE(new Uint8Array(data, offset, 8))).toNumber();
  offset += 8;
  temp.stepFreq = res.getUint32(offset, true);
  offset += 4;
  temp.nCount = res.getInt32(offset,true);
  offset += 4;
  if (offset % 2 == 0) {
    temp.scan = new Int16Array(data, offset);
  } else {
    temp.scan = new Int16Array(data.slice(offset));
  }
  return temp;
};
let bin2string = function(array) {
  var result = "";
  for (var i = 0; i < array.length; ++i) {
    if (array[i] > 0) {
      result += (String.fromCharCode(array[i]));
    }
  }
  return result;
}
export {
  processData,
  spliceData,
  bin2string
};
