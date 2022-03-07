import ProForm from "@ant-design/pro-form";
import { Button } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import EditTable from "../MinhProEditTable/EditTable";
import OrderExpandTable from "./OrderExpandTable";
import proEditOrderColumns from "./proEditOrderColumns";
import proEditOrderTableHandler from "./proEditOrderTableHandler";

function ProEditOrderTable({ customerProfile, dataSource, onDataChange }) {
  const [form] = ProForm.useForm();
  const products = useSelector((storeData) => storeData.products);
  const { getProductById, getFinalPrice } = proEditOrderTableHandler(products);
  const [disabled, setDisabled] = useState(true);
  const [columns, dependColumns] = proEditOrderColumns({
    getProductById,
    getFinalPrice,
    products,
  });
  if (!customerProfile) return <p>Please select a customer profile </p>;
  return (
    <>
      <EditTable
        disabled={disabled}
        form={form}
        columns={columns}
        dependColumns={dependColumns}
        expandableRowRender={({ id: rowId }) => (
          <OrderExpandTable
            rowId={rowId}
            {...{ getProductById, products, getFinalPrice, disabled }}
          />
        )}
        dataSource={dataSource}
        onDataChange={onDataChange}
      />
      <Button style={{marginBottom:20}} onClick={()=>setDisabled(!disabled)}>Toggle disable</Button>
      <br/>
      
    </>
  );
}

export default ProEditOrderTable;
