import ProForm, { ProFormText } from "@ant-design/pro-form";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../Authentication/AuthenticationProvider";
function UserInfo() {
  const {
    loginTokens: { access_token: accessToken },
  } = useContext(authContext);
  const [form] = ProForm.useForm();
  const [userInfo, setUserInfo] = useState();
  const onUpdateProfile = (newProfile) => {
    fetch("http://localhost:1337/parse/functions/updateUserProfile", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-Parse-Application-Id": "myAppId",
        "X-Parse-REST-API-Key": "REST_API_KEY",
      },
      body:JSON.stringify({
        updateAttributes:newProfile,
        sub:userInfo.sub
      })
    });
  };
  useEffect(() => {
    fetch("http://localhost:1337/parse/functions/getUserInfo", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-Parse-Application-Id": "myAppId",
        "X-Parse-REST-API-Key": "REST_API_KEY",
      },
      body: JSON.stringify({
        accessToken,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return;
        setUserInfo(data.result);
      });
  }, []);
  useEffect(() => {
    console.log(userInfo);
    userInfo && form.resetFields();
  }, [userInfo]);

  return (
    <ProForm form={form} initialValues={userInfo} onFinish={onUpdateProfile}>
      <ProFormText name={"email"} label={"Email"} />
      <ProFormText name={"firstName"} label={"First name"} />
      <ProFormText name={"lastName"} label={"Last name"} />
    </ProForm>
  );
}

export default UserInfo;
