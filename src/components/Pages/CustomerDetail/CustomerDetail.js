import { Form, Tabs } from "antd";
import { useState, useEffect } from "react";
import CustomerForm from "../../CustomerForm/CustomerForm";
import { useParams } from "react-router-dom";
import CardLayout from "../../Layouts/CardLayout/CardLayout";
import {
  editedActions,
  editingActions,
} from "../../Layouts/CardLayout/CardLayoutActions";
import { useSelector } from "react-redux";
import { updateItem } from "../../Firebase/Firebase";
import CustomerOrderTable from "../../CustomerOrderTable/CustomerOrderTable";

const { TabPane } = Tabs;
function CustomerDetail(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [tabKey, setTabKey] = useState("profile")
  const [form] = Form.useForm();
  const params = useParams();
  const detailCustomerId = params.customerId;
  const detailCustomerData = useSelector((storeData) =>
    storeData.customers.find(
      (customer) => customer.customerId === detailCustomerId
    )
  );
  const [customerData, setCustomerData] = useState(detailCustomerData);
  const onEditButtonCLicked = (e) => {
    setIsEditing(true);
    setCustomerData(form.getFieldsValue());
  };
  const onCancelButtonClicked = (e) => {
    setIsEditing(false);
    form.setFieldsValue(customerData);
  };
  const onDoneButtonClicked = (e) => {
    const newCustomerData = form.getFieldsValue();
    updateItem(`/customers/${detailCustomerId}`, newCustomerData);
    setIsEditing(false);
  };
  const onTabChange = (key) =>{
    setTabKey(key)
  }
  const detailActions = isEditing
    ? editingActions({
        onCancelButtonClicked: onCancelButtonClicked,
        onDoneButtonClicked: onDoneButtonClicked,
      })
    : editedActions({ onEditButtonCLicked: onEditButtonCLicked });
  const tabAction = {
    "profile": detailActions
  }
  useEffect(() => {
    setCustomerData(detailCustomerData);
    form.setFieldsValue(detailCustomerData);
  }, [detailCustomerData]);
  return (
    <CardLayout cardTitle={"Customer detail"} actions={tabAction[tabKey]} back>
      <Tabs defaultActiveKey="profile" onChange={onTabChange}>
        <TabPane tab="Profile" key="profile">
          <CustomerForm
            form={form}
            isEditing={isEditing}
            customerData={customerData}
          />
        </TabPane>
        <TabPane tab="Order history" key="orderHistory">
          <CustomerOrderTable customerId={detailCustomerId} />
        </TabPane>
      </Tabs>
    </CardLayout>
  );
}

export default CustomerDetail;
