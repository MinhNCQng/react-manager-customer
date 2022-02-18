import { Switch, Route, Redirect } from "react-router-dom";
import CustomerDetail from "../Pages/CustomerDetail/CustomerDetail";
import CustomerManager from "../Pages/CustomerManager/CustomerManager";
import NewCustomer from "../Pages/NewCustomer/NewCustomer";
import NewOrder from "../Pages/NewOrder/NewOrder";
import OrderDetail from "../Pages/OrderDetail/OrderDetail";
import ProductManager from "../Pages/ProductManager/productManager";

function PageRoutes(props) {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/customer"></Redirect>
      </Route>
      <Route path="/customer" exact>
        <CustomerManager />
      </Route>
      <Route path="/customer/new">
        <NewCustomer />
      </Route>
      <Route path="/customer/:customerId">
        <CustomerDetail />
      </Route>
      <Route path="/product" exact>
        <ProductManager />
      </Route>
      <Route path={"/order/new"} exact>
        <NewOrder/>
      </Route>
      <Route path="/order/:orderId" exact>
        <OrderDetail />
      </Route>
    </Switch>
  );
}

export default PageRoutes;
