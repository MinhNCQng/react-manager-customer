import { EditableProTable } from "@ant-design/pro-table";
import { Button } from "antd";
import deepcopy from "deepcopy";
const EditTable = ({
  columns,
  dependColumns,
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
  const updateDataDependencies = (changedRecord,rowId)=>{
    let newChangedData = {...changedRecord};
    let prevDataSource = {
    ...dataSource.find((row) => row.id === rowId),
    };
    while (true) {
        const tempNewData = deepcopy(newChangedData);
        let isHasChange = false;
        Object.keys(newChangedData).forEach((dataIndex) => {
        const col = dependColumns.find(
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
        prevDataSource = deepcopy(tempNewData) ;
    }
    return newChangedData;
  }
  const editableKeys = dataSource?.map((product) => product.id) || [];
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
        type: "multiple",
        editableKeys,
        saveText: "save",
        cancelText: "cancel",
        deleteText: "delete",
        actionRender: (row, record, defaultDoms) => {
          return [defaultDoms.delete];
        },
        onValuesChange: (changedRecord, recordList) => {
            if (!changedRecord) {
              return onDataChange(recordList);
            }
            const updateRecordList = [...recordList];
            const rowId = changedRecord?.id;
            const recordIndex = recordList.findIndex(
              (record) => record.id === rowId
            );
            const updatedRowDependData = updateDataDependencies(
              changedRecord,
              rowId,
            );
            updateRecordList.splice(recordIndex, 1, {
              ...updatedRowDependData,
            });
            onDataChange(updateRecordList);
        },
        onChange: () => {},
      }}
    />
  );
};

export default EditTable
