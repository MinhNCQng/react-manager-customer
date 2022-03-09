import { EditableProTable } from "@ant-design/pro-table";
import { ProFormDependency } from "@ant-design/pro-form";
import { Button } from "antd";
import deepcopy from "deepcopy";

const EditTable = ({
  value = [],
  onChange,
  columns,
  disabled,
  dependColumns,
  expandableRowRender,
}) => {
  const onDataChange = onChange;
  const checkShouldUpdate = (dataIndex, newRowData, prevRowData, col) => {
    let shouldUpdate = false;
    col.dependencies?.forEach((depend) => {
      if (
        JSON.stringify(newRowData[depend]) !==
        JSON.stringify(prevRowData[depend])
      )
        shouldUpdate = true;
    });
    return shouldUpdate;
  };
  const updateDataDependencies = (changedRecord, rowId) => {
    let newChangedData = { ...changedRecord };
    let prevDataSource = {
      ...value.find((row) => row.id === rowId),
    };
    while (true) {
      const tempNewData = deepcopy(newChangedData);
      let isHasChange = false;
      Object.keys(newChangedData).forEach((dataIndex) => {
        const col = dependColumns.find((col) => col.dataIndex === dataIndex);
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
      prevDataSource = deepcopy(tempNewData);
    }
    return newChangedData;
  };
  const editableKeys = value ? value.map((product) => product.id) : [];
  return (
    <EditableProTable
      headerTitle="Cart"
      components={false}
      columns={columns}
      rowKey="id"
      value={value}
      pagination={{ pageSize: 5 }}
      recordCreatorProps={{
        position: "bottom",
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
              console.log(value, editableKeys);
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
        editableKeys: disabled ? [] : editableKeys,
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
            rowId
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

export default EditTable;
