const timestampToTimeStr = (timestamp) => {
  let dateObj = new Date(timestamp * 1000);
  let year = dateObj.getFullYear()
  let month = dateObj.getMonth() + 1
  let date = dateObj.getDate()
  let hour = dateObj.getHours()
  let min = dateObj.getMinutes()
  let str = hour + ":" + min + " " + month + "/" + date + "/" + year;
  return str;
};

const timestampToShortDateStr = (timestamp) => {
  let dateObj = new Date(timestamp * 1000);
  let month = dateObj.getMonth() + 1
  let date = dateObj.getDate()
  let str =  month + "/" + date;
  return str;
};

export {timestampToTimeStr, timestampToShortDateStr};
