export const typesfield = Object.freeze({
  text: "text",
  number: "number",
  richtext: "richtext",
  image: "image",
  listImages: "listImages",
});

export const optionsTypesField = createTypesField(typesfield);

function createTypesField(objectFields) {
  const options = [];
  for (let key in objectFields) {
    const option = {
      name: key,
      value: key,
    };

    options.push(option);
  }
  return options;
}
