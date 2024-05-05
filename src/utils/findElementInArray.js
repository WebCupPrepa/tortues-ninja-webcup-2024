export function findElementInArray(array, comparator = { key: null, value: null }) {
  return array.find((element) => element[comparator.key] === comparator.value);
}
