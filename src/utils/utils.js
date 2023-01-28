const timestampToStr = (timestamp) => {
  let dateObj = new Date(timestamp);
  let str = dateObj.toLocaleTimeString() + " " + dateObj.toLocaleDateString();
  return str;
};

export default timestampToStr;
