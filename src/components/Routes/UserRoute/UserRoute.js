import { Route, Switch } from "react-router-dom";
import UserInfo from "../../Pages/User";

function UserRoute() {
  return (
    <Switch >
      <Route path={"/users/me"} >
        <UserInfo/>
      </Route>
    </Switch>
  );
}

export default UserRoute;
