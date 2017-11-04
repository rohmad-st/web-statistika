export default function (data) {
  const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n);
  return isNumber(data) && data % 1 === 0;
}
