import { Route, Switch } from "react-router-dom";
import NewOrder from "../../Pages/NewOrder/NewOrder";
import OrderDetail from "../../Pages/OrderDetail/OrderDetail";

function OrderRoute() {
  return (
    <Switch>
      <Route path={"/order/new"} exact>
        <NewOrder />
      </Route>
      <Route path="/order/:orderId" exact>
        <OrderDetail />
      </Route>
    </Switch>
  );
}

export default OrderRoute;
