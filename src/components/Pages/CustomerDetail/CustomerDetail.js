import { Tabs, Form } from "antd";
import { useState } from "react";
import CustomerForm from "../../CustomerForm/CustomerForm";
import { useParams } from "react-router-dom";
import CardLayout from "../../Layouts/CardLayout/CardLayout";
import { useSelector } from "react-redux";
import CustomerOrderTable from "../../CustomerOrderTable/CustomerOrderTable";

const { TabPane } = Tabs;
function CustomerDetail(props) {
  const  setTabKey = useState("profile")[1]
  const params = useParams();
  const customerId = params.customerId;
  const customerData = useSelector((storeData) =>
    storeData.customers.find(
      (customer) => customer.customerId === customerId
    )
  );
  const [form] = Form.useForm()
  const onTabChange = (key) =>{
    setTabKey(key)
  }
  return (
    <CardLayout cardTitle={"Customer detail"} back>
      <Tabs defaultActiveKey="profile" onChange={onTabChange}>
        <TabPane tab="Profile" key="profile">
          <CustomerForm  customerData={customerData}  customerId={customerId} form={form}
          />
        </TabPane>
        <TabPane tab="Order history" key="orderHistory">
          <CustomerOrderTable customerId={customerId} />
        </TabPane>
      </Tabs>
    </CardLayout>
  );
}

export default CustomerDetail;
