import number from './numbers';

export default function (data, interval) {
  const sign = Math.sign;
  const ord = (a, b, c) => sign(a - b) === sign(b - c);
  function* range(start, end, step) {
    if (end === undefined) {
      [start, end, step] = [0, start, sign(start)];
    } else if (step === undefined) {
      step = sign(end - start) || 1;
    }
    if (!ord(start, start + step, end)) return;
    let i = start;
    do {
      yield i;
      i += step;
    } while (ord(start, i, end));
  }
  const trimSpace = () => data.replace(/(\s|\n)/g, '');
  const sort = n => n.sort((a, b) => a - b);
  let arr = trimSpace()
            .split(',')
            .filter(e => number(e));
  arr = sort(arr);
  if (!interval) {
    interval = Math.ceil(4.3 * Math.log10(arr.length));
  }
  const maxValue = Math.max(...arr);
  const minValue = Math.min(...arr);
  const ranges = [...range(minValue, maxValue, (interval + 1))];
  const results = [];
  ranges.forEach((r) => {
    const tempData = {
      string: `${r}-${r + interval}`,
      ranges: [...range(r, r + (interval + 1))],
    };
    results.push(tempData);
  });

  return results;
}
