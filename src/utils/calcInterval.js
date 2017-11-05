import number from './numbers';

export default function (data) {
  const trimSpace = () => data.replace(/(\s|\n)/g, '');
  const arr = trimSpace()
              .split(',')
              .filter(e => number(e));
  const result = 4.3 * Math.log10(arr.length);

  return {
    string: ` = 1 + 3.3 log ${arr.length} = ${result} = ${Math.ceil(result)}`,
    result,
    ceil: Math.ceil(result),
  };
}
