
import CardLayout from "../../Layouts/CardLayout/CardLayout";
import ProductTable from "../../ProductTable/ProductTable";

const ProductManager = (props) => {
  return (
    <CardLayout cardTitle={"Product list"}>
      <ProductTable />
    </CardLayout>
  );
};

export default ProductManager;
