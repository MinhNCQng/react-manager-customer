import { EditableProTable } from "@ant-design/pro-table";
import { Button, Form, InputNumber, Select } from "antd";
import { checkShouldUpdate } from "./ProEditOrderTable";
const SmallEditTable = ({ value, onChange, columns, onDataChange, dataSource }) => {
  
  return (
    <EditableProTable
      columns={columns}
      rowKey="id"
      recordCreatorProps={{
        position: "bottom",
        newRecordType: "dataSource",
        creatorButtonText: "Add new accessory",
        record: () => ({
          id: Date.now(),
        }),
      }}
      value={dataSource}
      toolBarRender={() => {
        return [
          <Button type="primary" key="save" onClick={() => {}}>
            Dây là cái nút trên cùng khác
          </Button>,
        ];
      }}
      controlled
      editable={{
        type: "multiple",
        saveText: "save",
        cancelText: "cancel",
        deleteText: "delete",
        actionRender: (row, record, defaultDoms) => {
          return [defaultDoms.delete];
        },
        onValuesChange: (record, recordList) => {
          const dataChange = record;
          const rowId = record?.id;
          if (!record) {
            onDataChange?.(recordList);
            onChange?.(recordList)
            return;
          }
          const recordIndex = recordList.findIndex(
            (record) => record.id === rowId
          );
          let newData = { ...dataChange };
          let prevDataSource = {
            ...dataSource.find((row) => row.id === rowId),
          };
          if (record) {
            while (true) {
              const tempNewData = { ...newData };
              let isHasChange = false;
              Object.keys(newData).forEach((dataIndex) => {
                const col = columns.find((col) => col.dataIndex === dataIndex);
                if (!col) {
                  return;
                }
                const isColShouldUpdate = checkShouldUpdate(
                  dataIndex,
                  newData,
                  prevDataSource,
                  col
                );
                if (isColShouldUpdate) {
                  isHasChange = true;
                  col.onDependChange(newData);
                }
              });
              if (!isHasChange) break;
              prevDataSource = { ...tempNewData };
            }
          }
          recordList.splice(recordIndex, 1, { ...newData });
          onDataChange?.(recordList);
          onChange?.(recordList);
          
        },
      }}
    />
  );
};

export default SmallEditTable;
