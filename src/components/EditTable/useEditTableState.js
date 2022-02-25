import { useState } from "react";
import { getFormData } from "./EditTableHelper";

const useEditTableState = (dataSource,form) => {
  const [initialFormValues, setInitialFormValues] = useState(() => getFormData(dataSource));
  const [editingKey, setEditingKey] = useState("");
  const [isNewRecord, setIsNewRecord] = useState(false);
  const isEditing = (record) => record.key === editingKey;
  const cancelEdit = () => { form.setFieldsValue(initialFormValues); setEditingKey("");}
  const disabledOperation = () => editingKey !== "";
  return {
    setInitialFormValues,
    disabledOperation,
    initialFormValues,
    editingKey,
    setEditingKey,
    isNewRecord,
    setIsNewRecord,
    isEditing,
    cancelEdit,
  };
};

export default useEditTableState;
