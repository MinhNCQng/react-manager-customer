import { Redirect, Route, Switch } from "react-router-dom";
import TestForm from "../Pages/TestForm/test";
import TestDisableWithProForm from "../Pages/TestForm/test2";
import CustomerRoute from "./CustomerRoute/CustomerRoute";
import OrderRoute from "./OrderRoute/OrderRoute";
import ProductRoute from "./ProductRoute/ProductRoute";
import UserRoute from "./UserRoute/UserRoute";

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
      <Route path={"/users/"}>
        <UserRoute/>
      </Route>
      <Route path={"/test"}>
        <TestForm/>
      </Route>
      <Route path="*">
        <Redirect to="/customer"></Redirect>
      </Route>
    </Switch>
  );
}

export default PageRoutes;
