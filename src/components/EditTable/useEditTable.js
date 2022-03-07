import { useEffect, useMemo } from "react";
import EditableCell from "./EditableCell";
import EditTableColumn from "./EditTableColumn";
import EditTableHandle from "./EditTableHandle";
import { getTableData } from "./EditTableHelper";
import useEditTableState from "./useEditTableState";

const useEditTable = ({
  multiple,
  columns,
  dataSource,
  onDataChange,
  footer,
  onRow,
  form,
}) => {
  const {
    setInitialFormValues,
    initialFormValues,
    editingKey,
    setEditingKey,
    isNewRecord,
    setIsNewRecord,
    isEditing,
    cancelEdit,
    disabledOperation,
  } = useEditTableState(dataSource,form);

  const {
    onValuesChange,
    onEditBtnClicked,
    onDoneBtnClicked,
    onCancelBtnClicked,
    onRemoveBtnClicked,
    onAddRecord,
  } = EditTableHandle({
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
  });

  const mergedColumns = EditTableColumn({
    columns,
    multiple,
    isEditing,
    form,
    disabledOperation,
    onRemoveBtnClicked,
    onEditBtnClicked,
    onDoneBtnClicked,
    onCancelBtnClicked,
  });
  const tableData = useMemo(
    () => getTableData(initialFormValues),
    [initialFormValues]
  );
  useEffect(() => {
    setEditingKey("");
    setIsNewRecord(false);
  }, [multiple]);
  useEffect(() => {
    onDataChange?.(tableData);
  }, [tableData]);
  return {
    formProps: {
      form,
      onValuesChange,
      initialValues: initialFormValues,
    },
    tableProps: {
      columns: mergedColumns,
      dataSource: tableData,
      components: tableData.length && { body: { cell: EditableCell } },
      footer: footer,
      onRow: onRow,
    },
    disabledOperation,
    onAddRecord,
  };
};

export default useEditTable;
