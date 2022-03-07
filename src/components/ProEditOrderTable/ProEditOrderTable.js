import { ProFormDigit } from "@ant-design/pro-form";
import { EditableProTable } from "@ant-design/pro-table";
import { Button, Divider } from "antd";
import Form from "antd/lib/form/Form";
import { stringify } from "uuid";
import ExpandTable from "./ExpandTable";

import proEditOrderColumns from "./proEditOrderColumns";
import proEditOrderTableHandler from "./proEditOrderTableHandler";
import SmallEditTable from "./SmallEditTable";
import useProEditOrderTableState from "./useProEditOrderTableState";

function ProEditOrderTable({ customerProfile, dataSource, onDataChange }) {
  const proEditOrderTableState = useProEditOrderTableState({ dataSource });
  const { products, form, editableKeys } = proEditOrderTableState;
  const { isEditing, getProductById, getFinalPrice } = proEditOrderTableHandler(
    {
      ...proEditOrderTableState,
      dataSource,
      onDataChange,
    }
  );

  const [columns,mergedColumns] = proEditOrderColumns({
    getProductById,
    products,
    getFinalPrice,
  });

  
  if (!customerProfile) return <p>Please select a customer profile </p>;
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
        expandedRowRender: (record, ...props) => {
          const rowId = record.id;
          return (
            <>
              <ProFormDigit
                label="Discount"
                name={[rowId, "orderDiscount"]}
                disabled={!isEditing(rowId)}
                width="150px"
                placeholder={"Discount"}
              />
              <Divider orientation="left" style={{ paddingRight: 500 }}>
                Thông tin phụ kiện
              </Divider>
              <ExpandTable {...{products,getProductById,getFinalPrice} } form={form} rowId={rowId}/>
            </>
          );
        },
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
        onValuesChange: (record, recordList) => {
          const dataChange = record;
          const rowId = record?.id;
          if (!record) {
            return onDataChange(recordList);
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
                const col = mergedColumns.find((col) => col.dataIndex === dataIndex);
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
          onDataChange(recordList);
        },
        onChange: () => {},
      }}
    />
  );
}

export const checkShouldUpdate = (dataIndex, newRowData, prevRowData, col) => {
  let shouldUpdate = false;

  col.dependencies?.forEach((depend) => {
    if (JSON.stringify(newRowData[depend]) !== JSON.stringify(prevRowData[depend])) shouldUpdate = true;
  });
  return shouldUpdate;
};

export default ProEditOrderTable;
