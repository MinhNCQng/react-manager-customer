import { filterFormValuesWithKey, getTableData } from "./EditTableHelper";
import { v4 as uuidv4 } from "uuid";

function EditTableHandle({
  onDataChange,
  multiple,
  initialFormValues,
  setEditingKey,
  form,
  setInitialFormValues,
  setIsNewRecord,
  cancelEdit,
  isNewRecord,
  editingKey,
  columns,
}) {
  const onEditBtnClicked = (record) => {
    setEditingKey(record.key);
  };
  const onDoneBtnClicked = (record) => {
    form
      .validateFields()
      .then(() => {
        setInitialFormValues(form.getFieldsValue());
        setIsNewRecord(false);
        setEditingKey("")
      })
      .catch((error) => console.log(error));
  };
  const onCancelBtnClicked = (record) => {
    if (isNewRecord) {
      onRemoveBtnClicked(editingKey);
      setIsNewRecord(false);
    }
    cancelEdit();
  };
  const onRemoveBtnClicked = (recordKey) => {
    const newFormValues = filterFormValuesWithKey(initialFormValues, recordKey);
    setInitialFormValues(newFormValues);
  };
  const onAddRecord = () => {
    const newFormValues = { ...initialFormValues };
    const newRecordKey = uuidv4();
    newFormValues[newRecordKey] = {};
    setInitialFormValues(newFormValues);
    if (!multiple) setEditingKey(newRecordKey);
    setIsNewRecord(true);
  };
  const  handleCellChange = (changeInfo) => {
    const rowKey = Object.keys(changeInfo)[0];
    const dataIndex = Object.keys(changeInfo[rowKey])[0];
    const dataChange = changeInfo[rowKey][dataIndex];
    const changedColumn = columns.find(col => col.dataIndex === dataIndex);
    const onChangeColumnValue = changedColumn.onValueChange;
    onChangeColumnValue?.(dataChange, form, { key: rowKey, dataIndex });
    return ({rowKey,dataIndex,dataChange})
  }
  const onValuesChange = (changeInfo) => {
    const {rowKey,dataIndex,dataChange} = handleCellChange(changeInfo);
    
    if (multiple) {
      setInitialFormValues(prev=> {
        const updateFormData = form.getFieldsValue()
        Object.keys(updateFormData).forEach(rowDataKey=>prev[rowDataKey]= updateFormData[rowDataKey])
        return prev
      })
      onDataChange?.(getTableData(initialFormValues));
    }
  };
  return {
    onValuesChange,
    onEditBtnClicked,
    onDoneBtnClicked,
    onCancelBtnClicked,
    onRemoveBtnClicked,
    onAddRecord,
  };

  
}

export default EditTableHandle;
