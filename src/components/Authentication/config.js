const authenConfig = {
    grant_type:"password",
    client_id:"myclient",
}
const  baseAuthUrl = "http://localhost:8080/realms/myrealm/protocol/openid-connect"
export {authenConfig, baseAuthUrl}