import { Redirect, Route, Switch } from "react-router-dom";
import CustomerRoute from "./CustomerRoute/CustomerRoute";
import OrderRoute from "./OrderRoute/OrderRoute";
import ProductRoute from "./ProductRoute/ProductRoute";

function PageRoutes(props) {
  return (
    <Switch>
      <Route path={"/customer"}>
        <CustomerRoute />
      </Route>
      <Route path={"/product"}>
        <ProductRoute />
      </Route>
      <Route path={"/order"}>
        <OrderRoute />
      </Route>
      <Route path="*">
        <Redirect to="/customer"></Redirect>
      </Route>
    </Switch>
  );
}

export default PageRoutes;
