import { InputNumber } from "antd";
import EditTable from "../MinhProEditTable/EditTable";
import proEditOrderColumns from "./proEditOrderColumns";

function AccessoryOrderTable({
  value,
  onChange,
  getProductById,
  products,
  getFinalPrice,
}) {
  const [columns] = proEditOrderColumns({
    getProductById,
    products,
    getFinalPrice,
  });

  const finalPriceColumns =  {
    title: "Final price",
    dataIndex: "orderFinalPrice",
    key: "orderFinalPrice",
    dependencies: ["orderUnitPrice","orderQuantum"],
    onDependChange:(newData)=> {
      newData.orderFinalPrice = getFinalPrice(newData)
      return newData
    },
    editable: true,
    renderFormItem: (record, rowInfo, form) => {
      const rowId = rowInfo.recordKey;
      return <InputNumber placeholder={"place holder"} />;
    },
  }
  columns.splice(columns.length-2,1,finalPriceColumns)
  return (
    <EditTable
      columns={columns}
      dependColumns={columns}
      dataSource={value}
      onDataChange={(newAccessory) => onChange(newAccessory)}
    />
  );
}

export default AccessoryOrderTable;
