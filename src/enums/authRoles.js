export const authRoles = Object.freeze({
  user: "user",
  admin: "admin",
});

export const optionsAuthRoles = createTypesField(authRoles);

function createTypesField(objectFields) {
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
