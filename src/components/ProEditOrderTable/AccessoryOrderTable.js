import ProForm from "@ant-design/pro-form";
import { InputNumber } from "antd";
import EditTable from "../MinhProEditTable/EditTable";
import proEditOrderColumns from "./proEditOrderColumns";

function AccessoryOrderTable({
  value,
  onChange,
  getProductById,
  products,
  rowId,
  getFinalPrice,
  disabled,
}) {
  const [columns] = proEditOrderColumns({
    getProductById,
    products,
    getFinalPrice,
  });

  const finalPriceColumns = {
    title: "Final price",
    dataIndex: "orderFinalPrice",
    key: "orderFinalPrice",
    dependencies: ["orderUnitPrice", "orderQuantum"],
    onDependChange: (newData) => {
      newData.orderFinalPrice = getFinalPrice(newData);
      return newData;
    },
    renderFormItem: (record, rowInfo, form) => {
      const rowId = rowInfo.recordKey;
      return <InputNumber placeholder={"place holder"} />;
    },
  };
  columns.splice(columns.length - 2, 1, finalPriceColumns);
  return (
    <ProForm.Item name={[rowId, "accessory"]}>
      <EditTable
        disabled={disabled}
        columns={columns}
        dependColumns={columns}
        dataSource={value}
        onDataChange={(newAccessory) => onChange(newAccessory)}
      />
    </ProForm.Item>
  );
}

export default AccessoryOrderTable;
