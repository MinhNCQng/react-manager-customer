import { useSelector } from "react-redux";
import EditTable from "../MinhProEditTable/EditTable";
import OrderExpandTable from "./OrderExpandTable";

import proEditOrderColumns from "./proEditOrderColumns";
import proEditOrderTableHandler from "./proEditOrderTableHandler";

function ProEditOrderTable({ customerProfile, dataSource, onDataChange }) {
  const products = useSelector((storeData) => storeData.products);
  const { getProductById, getFinalPrice } = proEditOrderTableHandler(products);
  const [columns,dependColumns] = proEditOrderColumns({
    getProductById,
    getFinalPrice,
    products,
  });
  if (!customerProfile) return <p>Please select a customer profile </p>;
  return <EditTable columns={columns} dependColumns = {dependColumns} expandableRowRender={({id:rowId})=> <OrderExpandTable rowId={rowId} {...{ getProductById, products, getFinalPrice }}/>}  dataSource = {dataSource} onDataChange={onDataChange} />
}



export default ProEditOrderTable;
