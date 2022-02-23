import { Route } from "react-router-dom";
import NewOrder from "../../Pages/NewOrder/NewOrder";
import OrderDetail from "../../Pages/OrderDetail/OrderDetail";

function OrderRoute() {
  return (
    <>
      <Route path={"/order/new"} exact>
        <NewOrder />
      </Route>
      <Route path="/order/:orderId" exact>
        <OrderDetail />
      </Route>
    </>
  );
}

export default OrderRoute;
