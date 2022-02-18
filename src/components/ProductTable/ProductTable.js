import { Table } from "antd";
import { productTableColumns } from "./ProductTableInfo";
import { useSelector } from "react-redux";
const ProductTable = props =>{
    const productTableData = useSelector((storeData) => storeData.products);
    const dataSource = productTableData.map(product => {return {...product, key: product.productId}})
    return <Table
      columns={productTableColumns}
      dataSource={dataSource}
     
    />
}

export default ProductTable;