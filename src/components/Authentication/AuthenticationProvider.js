import Cookies from "universal-cookie";
import { createContext, useEffect, useState } from "react";
import Login from "../Login";
import { authenConfig, baseAuthUrl } from "./config";

const authContext = createContext();
const cookies = new Cookies();

function AuthenticationProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [loginTokens, setLoginTokens] = useState({});
  const [userInfo, setUserInfo] = useState();
  const [parseUserInfo,setParseUserInfo] = useState()
  const [sessionToken,setSessionToken] = useState()
  const resetLoginData = () => {
    setIsLogin(false);
    setErrorMessage();
    setLoginTokens({});
    setUserInfo();
    setParseUserInfo()
    setSessionToken()
    cookies.remove("sessionToken");
  };
  const onLogOut = () => {
    fetch("http://localhost:1337/parse/logout",{
      method:"post",
      headers:{
        "X-Parse-Application-Id": "myAppId",
        "X-Parse-REST-API-Key": "REST_API_ KEY",
        "X-Parse-Session-Token":sessionToken 
      }
    }).then(resetLoginData)
  };
  const onLogin = async ({ username, password }) => {
    const { access_token: accessToken, refresh_token: refreshToken } =
      await getLogin(username, password);
    const isLoginSuccess = !!(accessToken && refreshToken);
    if (isLoginSuccess) {
      setLoginTokens({
        accessToken,
        refreshToken,
      });
    } else setErrorMessage("Please check your username and password");
  };
  const getLogin = async (username, password) => {
    const reqBodyDict = { ...authenConfig, username, password };
    const reqEncodeBody = new URLSearchParams(reqBodyDict);
    const res = await fetch(baseAuthUrl + "/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: reqEncodeBody.toString(),
    });
    const data = await res.json();
    return data;
  };
  const getUserInfo = async (accessToken) => {
    try {
      const res = await fetch(baseAuthUrl + "/userinfo", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const userInfo = await res.json();
      setUserInfo(userInfo);
    } catch (error) {
      console.log("Something is error");
    }
  };
  const retrieveAccessTokens = () => {
    const accessToken  = cookies.get("sessionToken");
    if (accessToken ) {
      setSessionToken(accessToken)
    }
  };
  const linkToParseServer = async (userInfo) => {
    const authBody = {
      authData: {
        keycloak: {
          access_token: loginTokens.accessToken,
          id: userInfo.sub,
          groups: userInfo.groups,
          roles: userInfo.roles,
        },
      },
    };
    const res = await fetch("http://localhost:1337/parse/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Parse-Application-Id": "myAppId",
        "X-Parse-REST-API-Key": "REST_API_ KEY",
        "X-Parse-Revocable-Session": "1",
      },
      body: JSON.stringify(authBody),
    });
    const data = await res.json();
    const { sessionToken, username, objectId } = data;
    if (sessionToken && username && objectId) {
      setSessionToken(sessionToken)
      cookies.set("sessionToken", sessionToken);
      cookies.set("username", username);
      cookies.set("objectId", objectId);
    }
  };
  const loginToParseServer = async (sessionToken) => {
    const res = await fetch("http://localhost:1337/parse/users/me",{
      method:"get",
      headers:{
        "X-Parse-Application-Id": "myAppId",
        "X-Parse-REST-API-Key": "REST_API_ KEY",
        "X-Parse-Session-Token": sessionToken,
      }
    })
    const data =  await res.json()
    setParseUserInfo(data)
    setIsLogin(true)
   
  }
  useEffect(()=>{
    if (sessionToken) loginToParseServer(sessionToken)
  },[sessionToken])
  useEffect(() => {
    const accessToken = loginTokens?.accessToken;
    if (accessToken) getUserInfo(accessToken);
  }, [loginTokens]);
  useEffect(() => {
    if (!!userInfo) {
      linkToParseServer(userInfo);
    }
  }, [userInfo]);
  useEffect(() => {
    retrieveAccessTokens();
  }, []);

  if (!isLogin) return <Login onLogin={onLogin} errorMessage={errorMessage} />;
  return (
    <authContext.Provider value={{ parseUserInfo, userInfo, onLogOut }}>
      {children}
    </authContext.Provider>
  );
}

export { authContext };
export default AuthenticationProvider;
