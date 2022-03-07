import deepcopy from "deepcopy";
const EditTable = ({
  columns,
  dataSource,
  onDataChange,
  expandableRowRender,
}) => {
  const checkShouldUpdate = (dataIndex, newRowData, prevRowData, col) => {
    let shouldUpdate = false;

    col.dependencies?.forEach((depend) => {
      if (JSON.stringify(newRowData[depend]) !== JSON.stringify(prevRowData[depend]))
        shouldUpdate = true;
    });
    return shouldUpdate;
  };
  const editableKeys = dataSource.map((product) => product.id);
  const 
  return (
    <EditableProTable
      headerTitle="Cart"
      columns={columns}
      rowKey="id"
      value={dataSource}
      recordCreatorProps={{
        position: "top",
        newRecordType: "dataSource",
        creatorButtonText: "Add new order",
        record: () => ({
          id: Date.now(),
        }),
      }}
      toolBarRender={() => {
        return [
          <Button
            type="primary"
            key="save"
            onClick={() => {
              console.log(dataSource, editableKeys);
            }}
          >
            Cái này là cái nút trên cùng
          </Button>,
        ];
      }}
      controlled
      expandable={{
        expandedRowRender: expandableRowRender,
      }}
      editable={{
        form: form,
        type: "multiple",
        editableKeys,
        saveText: "save",
        cancelText: "cancel",
        deleteText: "delete",
        actionRender: (row, record, defaultDoms) => {
          return [defaultDoms.delete];
        },
        onValuesChange: (changedRecord, recordList) => {
          
          const rowId = changedRecord?.id;
          if (!changedRecord) {
            return onDataChange(recordList);
          }
          const recordIndex = recordList.findIndex(
            (record) => record.id === rowId
          );
          let newChangedData = { ...changedRecord };
          let prevDataSource = {
            ...dataSource.find((row) => row.id === rowId),
          };
          if (changedRecord) {
            while (true) {
              const tempNewData = { ...newChangedData };
              let isHasChange = false;
              Object.keys(newChangedData).forEach((dataIndex) => {
                const col = mergedColumns.find(
                  (col) => col.dataIndex === dataIndex
                );
                if (!col) {
                  return;
                }
                const isColShouldUpdate = checkShouldUpdate(
                  dataIndex,
                  newChangedData,
                  prevDataSource,
                  col
                );
                if (isColShouldUpdate) {
                  isHasChange = true;
                  newChangedData = col.onDependChange(deepcopy(newChangedData));
                }
              });
              if (!isHasChange) break;
              prevDataSource = { ...tempNewData };
            }
          }
          recordList.splice(recordIndex, 1, { ...newChangedData });
          onDataChange(recordList);
        },
        onChange: () => {},
      }}
    />
  );
};

export default EditTable
