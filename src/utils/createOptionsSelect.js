export function createOptionsSelect(objectFields) {
  const output = [];
  for (let key in objectFields) {
    const option = {
      name: key,
      value: key,
    };

    output.push(option);
  }
  return output;
}
