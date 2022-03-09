import ProForm, {
  ProFormDateTimeRangePicker,
  ProFormDependency,
} from "@ant-design/pro-form";
import { Button } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import EditTable from "../MinhProEditTable/EditTable";
import MinhForm from "../Pages/TestForm/MinhForm";
import OrderExpandTable from "./OrderExpandTable";
import proEditOrderColumns from "./proEditOrderColumns";
import proEditOrderTableHandler from "./proEditOrderTableHandler";

function ProEditOrderTable({submitText}) {
  const products = useSelector((storeData) => storeData.products);
  const { getProductById, getFinalPrice } = proEditOrderTableHandler(products);
  
  const [columns, dependColumns] = proEditOrderColumns({
    getProductById,
    getFinalPrice,
    products,
  });

  return (
    <ProFormDependency name={["orderCustomerProfile"]}>
      {({ orderCustomerProfile }) => {
        if (!orderCustomerProfile)
          return <p>Please select a customer profile </p>;
        return (
          <>
            <ProForm.Item name="products">
              <EditTable
                columns={columns}
                dependColumns={dependColumns}
                expandableRowRender={({ id: rowId }) => (
                  <OrderExpandTable
                    rowId={rowId}
                    {...{ getProductById, products, getFinalPrice }}
                  />
                )}
              />
            </ProForm.Item>
            <br />
            <Button htmlType="submit">{submitText || "Order"}</Button>
          </>
        );
      }}
    </ProFormDependency>
  );
}

export default ProEditOrderTable;
