import getEditTableActions from "./EditTableAction";

const EditTableColumn = ({
  columns,
  multiple,
  isEditing,
  form,
  disabledOperation,
  onRemoveBtnClicked,
  onEditBtnClicked,
  onDoneBtnClicked,
  onCancelBtnClicked,
}) => {
  const { operator } = getEditTableActions({
    isEditing,
    multiple,
    disabledOperation,
    onRemoveBtnClicked,
    onEditBtnClicked,
    onDoneBtnClicked,
    onCancelBtnClicked,
  });
  const mergedColumns = columns.map((col) => {
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        editing: multiple ? true : isEditing(record),
        InputType: col.InputType,
        disabled: col.disabled,
        editComponentProps: col.editComponentProps,
        labelItemProps: col.labelItemProps,
        onValueChange: col.onValueChange,
        inputRender: col.inputRender,
        form,
      }),
    };
  });
  mergedColumns.push(operator);
  return mergedColumns;
};

export default EditTableColumn;
