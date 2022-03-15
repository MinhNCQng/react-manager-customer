import ProForm, {
  ProFormDependency,
} from "@ant-design/pro-form";
import EditTable from "../MinhProEditTable/EditTable";
import useData from "../MinhServer/useData";
import MinhFormButton from "../Pages/TestForm/MinhFormButton";
import OrderExpandTable from "./OrderExpandTable";
import proEditOrderColumns from "./proEditOrderColumns";
import proEditOrderTableHandler from "./proEditOrderTableHandler";

function ProEditOrderTable({submitText, updateCallBack}) {
  const [products] = useData("Products","productId")
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
            <MinhFormButton htmlType="submit" submitText = {submitText} updateCallBack= {updateCallBack}/>
            
          </>
        );
      }}
    </ProFormDependency>
  );
}

export default ProEditOrderTable;
