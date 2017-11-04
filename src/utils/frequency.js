import number from './numbers';

export default function (data) {
  const trimSpace = () => data.replace(/(\s|\n)/g, '');
  const arr = trimSpace()
              .split(',')
              .filter(e => number(e));
  const hist = {};
  arr.map((a) => {
    if (a in hist) {
      hist[a] += 1;
    } else {
      hist[a] = 1;
    }
    return true;
  });

  return Object.keys(hist).map(key => [Number(key), hist[key]]);
}
