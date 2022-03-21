import "./App.css";
import "@ant-design/pro-form/dist/form.css";
import "@ant-design/pro-table/dist/table.css";
import PageRoutes from "./components/Routes/Routes";
import { useContext } from "react";
import { authContext } from "./components/Authentication/AuthenticationProvider";
import { Layout, Row } from "antd";
import UserMenu from "./components/UserMenu";
const { Header, Footer, Sider, Content } = Layout;
function App() {
  return (
    <div className="App">
      <Layout>
        {/* <Header style={{backgroundColor:"unset"}}>
          
        </Header> */}
        <Content>
          <PageRoutes />
        </Content>
      </Layout>
    </div>
  );
}

export default App;
