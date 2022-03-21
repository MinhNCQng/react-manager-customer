import { Row } from "antd";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthenticationProvider from "../Authentication/AuthenticationProvider";
import ActiveRegister from "../Pages/ActiveRegister";
import TestForm from "../Pages/TestForm/test";
import UserMenu from "../UserMenu";
import CustomerRoute from "./CustomerRoute/CustomerRoute";
import OrderRoute from "./OrderRoute/OrderRoute";
import ProductRoute from "./ProductRoute/ProductRoute";
import UserRoute from "./UserRoute/UserRoute";

function PageRoutes(props) {
  return (
    <Switch>
      <Route path={"/active/:activeId"} exact>
        <ActiveRegister />
      </Route>
      <AuthenticationProvider>
        <Row justify="end" align="middle">
          <UserMenu />
        </Row>
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
          <UserRoute />
        </Route>
        <Route path={"/test"}>
          <TestForm />
        </Route>
      </AuthenticationProvider>
      

      <Route path="*">
        <Redirect to="/customer"></Redirect>
      </Route>
    </Switch>
  );
}

export default PageRoutes;
