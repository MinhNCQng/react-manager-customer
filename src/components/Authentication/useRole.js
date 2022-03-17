import { useContext } from "react"
import { authContext } from "./AuthenticationProvider"

const useRole = ()=> {
    const {parseUserInfo} = useContext(authContext)
    return parseUserInfo?.authData.keycloak.roles[0];
}

export default useRole