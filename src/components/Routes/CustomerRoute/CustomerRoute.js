import { Route, Switch } from "react-router-dom";
import CustomerDetail from "../../Pages/CustomerDetail/CustomerDetail";
import CustomerManager from "../../Pages/CustomerManager/CustomerManager";
import NewCustomer from "../../Pages/NewCustomer/NewCustomer";
import PrivateRoute from "../../PrivateRoute";

function CustomerRoute() {
  return (
    <Switch>
      <Route path="/customer" exact>
        <CustomerManager />
      </Route>
      <PrivateRoute acceptRoles={["admin"]} path="/customer/new" exact>
        <NewCustomer />
      </PrivateRoute>
      <Route path="/customer/:customerId" exact>
        <CustomerDetail />
      </Route>
    </Switch>
  );
}

export default CustomerRoute;
