import number from './numbers';

export default function (data) {
  const trimSpace = () => data.replace(/(\s|\n)/g, '');
  const arr = trimSpace()
              .split(',')
              .filter(e => number(e));
  const maxValue = Math.max(...arr);
  const minValue = Math.min(...arr);
  const result = (maxValue - minValue) + 1;

  return {
    min: minValue,
    max: maxValue,
    string: `(${maxValue} - ${minValue}) + 1`,
    result,
  };
}
