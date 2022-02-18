import { Tabs } from "antd";
import { useState } from "react";
import CardLayout from "../../Layouts/CardLayout/CardLayout";
import OrderCart from "../../OrderCart/OrderCart";
import OrderProfileForm from "../../OrderProfileForm/OrderProfileForm";


const {TabPane} = Tabs
const NewOrder = (props) => {
  const [customerProfile, setCustomerProfile] = useState()
  const onCustomerProfileSelected = (selectedProfile) => {
    setCustomerProfile(selectedProfile)
  }
  return (
    <CardLayout cardTitle={"Add new order"}>
        <Tabs defaultActiveKey="profile">
          <TabPane tab="Profile" key={"profile"}>
            <OrderProfileForm customerProfile = {customerProfile} onCustomerProfileSelected = {onCustomerProfileSelected}/>
          </TabPane>
          <TabPane tab="New order" key={"newOrder"}>
            <OrderCart customerProfile = {customerProfile}/>
          </TabPane>
        </Tabs>
    </CardLayout>
  );
};

export default NewOrder;
