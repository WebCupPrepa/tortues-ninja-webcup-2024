const baseMetaFields = {
  title: null,
  icon: null,
  allowForMenu: true,
  group: null,
};

export function createMetaFields(fields = baseMetaFields) {
  return { ...baseMetaFields, ...fields };
}

export function createMetaFieldsLayout(fields = { requiresAuth: null, role: null }) {
  return fields;
}
