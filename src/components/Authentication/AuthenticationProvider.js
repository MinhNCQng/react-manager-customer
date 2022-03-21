
import { createContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Login from "../Login";

const authContext = createContext();
const cookies = new Cookies();

function AuthenticationProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [errorMessage,setErrorMessage] = useState()
  const [loginTokens,setToginTokens] = useState()
  const [parseUserInfo,setParseUserInfo] = useState()
  const onLogin = ({ username, password }) => {
    fetch("http://localhost:1337/parse/functions/loginByUserName", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-Parse-Application-Id": "myAppId",
        "X-Parse-REST-API-Key": "REST_API_KEY",
      },
      body:JSON.stringify({
        username,
        password
      })
    }).then(res=> res.json()).then(data=>{
      if (data.error){ throw new Error("Username or password is incorrect")}
      saveLoginCookies(data.result.loginToken)
      setToginTokens(data.result.loginToken)
    }
    ).catch(error => setErrorMessage(error.message));
  };
  const saveLoginCookies = (loginTokens)=>{
    // console.log(loginTokens)
  }
  const getUserInfo = (loginTokens) =>{
    const {sessionToken} = loginTokens;
    fetch("http://localhost:1337/parse/users/me",{
      method:"get",
      headers:{
        "X-Parse-Application-Id": "myAppId",
        "X-Parse-REST-API-Key": "REST_API_KEY",
        "X-Parse-Session-Token":sessionToken
      }
    }).then(res=>res.json()).then(
      data=>{
        if (data.error) return;
        setParseUserInfo(data)
      }
    )
  }
  useEffect(()=>{
    if (loginTokens) {
      getUserInfo(loginTokens)
    }
  },[loginTokens])
  useEffect(()=>{
    parseUserInfo && setIsLogin(true)
  },[parseUserInfo])
  if (!isLogin) return <Login onLogin={onLogin} errorMessage={errorMessage} />;
  return <authContext.Provider value={{parseUserInfo,loginTokens}}>{children}</authContext.Provider>;
}

export { authContext };
export default AuthenticationProvider;
