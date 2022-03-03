import { ProFormDigit } from "@ant-design/pro-form";
import { EditableProTable } from "@ant-design/pro-table";
import { Button } from "antd";

import proEditOrderColumns from "./proEditOrderColumns";
import proEditOrderTableHandler from "./proEditOrderTableHandler";
import useProEditOrderTableState from "./useProEditOrderTableState";

function ProEditOrderTable({ customerProfile, dataSource, setDataSource}) {
  const proEditOrderTableState = useProEditOrderTableState({dataSource});
  const {
    products,
    form,
    editableKeys,
  } = proEditOrderTableState;
  const {
    isEditing,
    setFinalPrice,
    getProductById,
    updateRowData,
    getFinalPrice,
    updateFinalPrice,
    updateFormItem,
    shouldUpdateFinalPrice,
    updateFormDataDependence,
  } = proEditOrderTableHandler({...proEditOrderTableState,dataSource,setDataSource});

  
  const columns = proEditOrderColumns({
    getProductById,
    updateRowData,
    products,
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
        record: () => {
          const newRow = {
            id: Date.now(),
          };

          return newRow;
        },
      }}
      components={{ body: {} }}
      toolBarRender={() => {
        return [
          <Button
            type="primary"
            key="save"
            onClick={() => {
              console.log(dataSource,editableKeys);
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
            <ProFormDigit
              label="Discount"
              name={[rowId, "orderDiscount"]}
              disabled={!isEditing(rowId)}
              width="150px"
              placeholder={"Discount"}
            />
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
          return null;
        },
        onValuesChange: (record, recordList) => {
          setDataSource(recordList)
          const rowId = record?.id;
          if (!record) return;
          updateFormDataDependence(rowId);
          const isEditedFinalPrice = shouldUpdateFinalPrice(rowId, record);
          if (!isEditedFinalPrice) {
            updateFinalPrice(rowId);
          }
          updateFormItem(rowId);
        },
        onChange: ()=>{},
      }}
    />
  );
}

export default ProEditOrderTable;
