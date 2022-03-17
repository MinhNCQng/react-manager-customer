import { useContext } from "react";
import { authContext } from "../../Authentication/AuthenticationProvider";
function UserInfo() {
    const {parseUserInfo} = useContext(authContext)
    console.log(parseUserInfo)
    return ( <>11312312312312312323</> );
}

export default UserInfo;