import { Button } from "antd";
import { useHistory, useRouteMatch } from "react-router-dom/";
import CustomerTable from "../../CustomerTable/CustomerTable";
import CardLayout from "../../Layouts/CardLayout/CardLayout";

function CustomerManager(props) {
  const routeMatch = useRouteMatch()
  const history = useHistory()
  const handleOnAddNewCustomerClicked = ()=>{
    history.push(`${routeMatch.path}/new`)
  }
  return (
    <CardLayout cardTitle={"Customer list"} >
      <CustomerTable/>
      <Button type="primary" onClick={handleOnAddNewCustomerClicked}>Add new customer</Button>
    </CardLayout>
  );
}

export default CustomerManager;
