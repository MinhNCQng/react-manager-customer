import { Table } from "antd";
import { productTableColumns } from "./ProductTableInfo";
import { useSelector } from "react-redux";
import useData from "../MinhServer/useData";
const ProductTable = props =>{
    const [productTableData] = useData("Products","productId")
    const dataSource = productTableData.map(product => {return {...product, key: product.productId}})
    return <Table
      columns={productTableColumns}
      dataSource={dataSource}
     
    />
}

export default ProductTable;