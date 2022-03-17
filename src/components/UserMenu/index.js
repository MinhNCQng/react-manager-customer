import { DownOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Space, Spin } from "antd";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../Authentication/AuthenticationProvider";

function UserMenu() {
    const history = useHistory()
    const {parseUserInfo,onLogOut} = useContext(authContext)
    const isLoading = !parseUserInfo
    const onUserInfoBtnClicked = () => {
        history.push("/users/me")
    }
    const menu = <Menu>
        <Menu.Item disabled key={2} style={{textAlign:"center"}}>
            Roles:{parseUserInfo?.authData.keycloak.roles}
        </Menu.Item>
        <Menu.Item key="UserInfo" onClick={onUserInfoBtnClicked}>
            <Space>
               <UserOutlined /> Infomation
            </Space>
        </Menu.Item>
        <Menu.Item key={1} onClick = {onLogOut}  >
           <Space>
               <LoginOutlined />Logout
           </Space>
        </Menu.Item>
    </Menu>
    if (isLoading) return <Spin/>
    return ( <>
        <Dropdown overlay={menu} trigger={["click"]} >
            <Button shape="round" >
                {parseUserInfo.username} <DownOutlined />
            </Button>
        </Dropdown>
    </> );
}

export default UserMenu;