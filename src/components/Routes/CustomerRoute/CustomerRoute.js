import { Route } from "react-router-dom";
import CustomerDetail from "../../Pages/CustomerDetail/CustomerDetail";
import CustomerManager from "../../Pages/CustomerManager/CustomerManager";
import NewCustomer from "../../Pages/NewCustomer/NewCustomer";

function CustomerRoute() {
  return (
    <>
      <Route path="/customer" exact>
        <CustomerManager />
      </Route>
      <Route path="/customer/new" exact>
        <NewCustomer />
      </Route>
      <Route path="/customer/:customerId" exact>
        <CustomerDetail />
      </Route>
    </>
  );
}

export default CustomerRoute;
