module.exports = (first, last, year, count) => {
  const prefix = "OI";
  const name = (first.slice(0,2) + last.slice(0,2)).toUpperCase();
  return `${prefix}${name}${year}${String(count).padStart(4,"0")}`;
};
