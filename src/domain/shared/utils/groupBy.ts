export function groupBy(list, criterion) {
  const newObj = list.reduce(function (acc, currentValue) {
    if (!acc[currentValue[criterion]]) {
      acc[currentValue[criterion]] = [];
    }
    acc[currentValue[criterion]].push(currentValue);
    return acc;
  }, {});
  return newObj;
}
