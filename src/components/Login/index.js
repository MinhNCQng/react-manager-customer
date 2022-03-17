import {
  CloseCircleOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-form";
import { Button, Tag } from "antd";
function Login({ onLogin, errorMessage }) {
 
  return (
    <LoginForm
      title={"Welcome to food app"}
      submitter={{ searchConfig: { submitText: "Login" } }}
      style={{ paddingTop: 40 }}
      onFinish={onLogin}
    >
      <ProFormText
        name={"username"}
        fieldProps={{ size: "large", prefix: <UserOutlined /> }}
        placeholder="Enter username"
        rules={[{ required: true, message: "This field is required!" }]}
      />
      <ProFormText.Password
        name={"password"}
        fieldProps={{ size: "large", prefix: <LockOutlined /> }}
        placeholder="Enter your password"
        rules={[{ required: true, message: "This field is required!" }]}
      />
      {errorMessage && (
        <Tag
          icon={<CloseCircleOutlined />}
          style={{ width: "100%", fontSize: 15, marginBottom: 20 }}
          color={"error"}
        >
          {errorMessage}
        </Tag>
      )}
    </LoginForm>
  );
}

export default Login;
