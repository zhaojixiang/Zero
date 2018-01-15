let date = new Date();
let endyear = date.getFullYear();
let startyear = endyear - 9;
let xData = [];
for (var i = startyear; i <= endyear; i++) {
  xData.push(i);
}
// const dateData = {
//   endyear:endyear,
//   startyear:startyear,
//   xData:xData,
// }
export const dateData = {
  endyear:endyear,
  startyear:startyear,
  xData:xData,
};
