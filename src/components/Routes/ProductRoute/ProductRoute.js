import { Route } from "react-router-dom";
import ProductManager from "../../Pages/ProductManager/productManager";

function ProductRoute() {
  return (
    <>
      <Route path="/product" exact>
        <ProductManager />
      </Route>
    </>
  );
}

export default ProductRoute;
