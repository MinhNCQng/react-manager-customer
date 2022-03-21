import ProForm, { ProFormText } from "@ant-design/pro-form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ActiveRegister() {
  const { activeId } = useParams();

  const [isLegal, setIsLegal] = useState(false);
  const [registerInfo, setRegisterInfo] = useState()
  useEffect(() => {
    fetch("http://localhost:1337/parse/classes/RegisterLink/" + activeId, {
      method: "get",
      headers: {
        "X-Parse-Application-Id": "myAppId",
        "X-Parse-REST-API-Key": "REST_API_KEY",
      },
    }).then(res=>res.json()).then(data=>{
        if (!data.error) 
        setIsLegal(true)
        setRegisterInfo(data)
    });
  }, []);
  if (!registerInfo) return <></>
  return <ProForm initialValues={registerInfo} >
      <ProFormText label="User name" disabled name={"username"}/>
      <ProFormText label="Email" disabled name={"username"}/>
      <ProFormText label="First name"  name={"firstName"}/>
      <ProFormText label="Last name" name={"lastName"}/>
      
  </ProForm>
}

export default ActiveRegister;
