import { Route, Switch } from "react-router-dom";
import ProductManager from "../../Pages/ProductManager/productManager";

function ProductRoute() {
  return (
    <Switch>
      <Route path="/product" exact>
        <ProductManager />
      </Route>
    </Switch>
  );
}

export default ProductRoute;
