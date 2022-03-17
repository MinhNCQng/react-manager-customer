import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { authContext } from "../Authentication/AuthenticationProvider";
import useRole from "../Authentication/useRole";
function PrivateRoute({children,acceptRoles,...restProps}) {
    const role = useRole()
    if (!acceptRoles.includes(role)) return <Redirect path="/"/>
    return ( <Route {...restProps}>{children}</Route> );
}

export default PrivateRoute;