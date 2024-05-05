import { computed, reactive } from "vue";

export function useFieldsDoc(fields, doc) {
  const fieldsDoc = computed(() => [...fields]);
  const fieldsDocWithValue = computed(() =>
    doc ? createFieldsValue(fieldsDoc.value, doc) : null
  );

  function createDocData(fields = fieldsDoc) {
    let output = {};
    fields.value.forEach((field) => {
      output[field.name] = field.value;
    });

    return output;
  }

  function createFieldsValue(fields = fieldsDoc, doc) {
    const copyDoc = { ...doc };
    const copyFields = [...fields];

    copyFields.forEach((field) => {
      for (let key in copyDoc) {
        if (key === field.name) {
          field.value = copyDoc[key];
        }
      }
    });

    return copyFields;
  }

  function checkFieldsEmpty(fields = fieldsDoc) {
    for (let field of fields.value) {
      const fieldEmpty = !field.name || !field.value;
      if (fieldEmpty) {
        return true;
      }
    }

    return false;
  }

  return { fieldsDoc, fieldsDocWithValue, createDocData, checkFieldsEmpty };
}
