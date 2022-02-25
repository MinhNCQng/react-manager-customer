export const getFormData = (dataSource) => {
  const formData = {};
  if (!dataSource) return formData;
  for (const data of dataSource) {
    formData[data.key] = data;
  }
  return formData;
};

export const getTableData = (formData) => {
  if (!formData) return [];
  const tableData = Object.entries(formData).map(([key, value]) => ({
    key,
    ...value,
  }));
  return tableData;
};

export const filterFormValuesWithKey = (initialFormValues, recordKey) => {
  const newFormValues = {};
  for (const [key, value] of Object.entries(initialFormValues)) {
    if (key.toString() !== recordKey.toString()) newFormValues[key] = value;
  }
  return newFormValues;
};
