import {
  ContactsOutlined,
  DownOutlined,
  LoginOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Menu, Modal, Space, Spin } from "antd";
import { useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import { authContext } from "../Authentication/AuthenticationProvider";
import ProForm, { ModalForm, ProFormText } from "@ant-design/pro-form";

function UserMenu() {
  const history = useHistory();
  const { parseUserInfo, onLogOut } = useContext(authContext);
  const isLoading = !parseUserInfo;
  const [modalVisible, setModalVisible] = useState(false);
  const onUserInfoBtnClicked = () => {
    history.push("/users/me");
  };
  const onInviteMenu = () => {
    setModalVisible(true);
  };
  const createInviteLink = async (email) => {
    const data =await  fetch("http://localhost:1337/parse/functions/createRegisterLink", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-Parse-Application-Id": "myAppId",
        "X-Parse-REST-API-Key": "REST_API_KEY",
      },
      body:JSON.stringify({
          email
      })
    }).then(res=>res.json())
    const activeKey = data.result.objectId;
    return activeKey
  };
  const onInvite = async ({ email }) => {
    const activeKey = await createInviteLink(email);
    Modal.success({
      content: (
        <>
          <b>Now you can invite friends on link:</b>
          <br />
          <div style={{ marginTop: 20 }}>{"http://localhost:3000/active/"+activeKey}</div>
        </>
      ),
    });
    setModalVisible(false);
  };
  const onModalCancel = () => {
    setModalVisible(false);
  };
  const menu = (
    <Menu>
      <Menu.Item disabled key={2} style={{ textAlign: "center" }}>
        Roles:{parseUserInfo?.authData.keycloak.roles}
      </Menu.Item>
      <Menu.Item key="UserInfo" onClick={onUserInfoBtnClicked}>
        <Space>
          <UserOutlined /> Infomation
        </Space>
      </Menu.Item>
      <Menu.Item key="invite" onClick={onInviteMenu}>
        <Space>
          <ContactsOutlined /> Invite
        </Space>
      </Menu.Item>
      <Menu.Item key={1} onClick={onLogOut}>
        <Space>
          <LoginOutlined />
          Logout
        </Space>
      </Menu.Item>
    </Menu>
  );
  if (isLoading) return <Spin />;
  return (
    <>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button shape="round">
          {parseUserInfo.username} <DownOutlined />
        </Button>
      </Dropdown>
      <ModalForm
        title="Invite people"
        onFinish={onInvite}
        visible={modalVisible}
        submitter={{ render: (props, defaultDoms) => defaultDoms }}
        modalProps={{ onCancel: onModalCancel }}
      >
        <ProFormText label="Email" name={"email"} />
      </ModalForm>
    </>
  );
}

export default UserMenu;
