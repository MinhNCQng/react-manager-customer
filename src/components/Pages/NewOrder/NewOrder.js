import ProForm, { ProFormDatePicker } from "@ant-design/pro-form";
import { Form, message, Select, Tabs } from "antd";
import { ref, set } from "firebase/database";
import { useState } from "react";
import CartButton from "../../Button/CartButton";
import { addNewItem, fbStore, getCurrentDayString } from "../../Firebase/Firebase";
import CardLayout from "../../Layouts/CardLayout/CardLayout";
import OrderProfileForm from "../../OrderProfileForm/OrderProfileForm";
import ProEditOrderTable from "../../ProEditOrderTable/ProEditOrderTable";
import MinhForm from "../TestForm/MinhForm";

const { TabPane } = Tabs;
const NewOrder = (props) => {
  const orderHandler = (orderInfo ) => {
    makeOrder(orderInfo,orderInfo.orderCustomerProfile.customerId)
  }
  const makeOrder = (cartProducts,customerId) => {
    const orderId = makeOrderRequest(customerId);
    pushOrders(cartProducts, orderId, "Order successfully!");
  };
  const makeOrderRequest = (customerId) => {
    return addNewItem(
      "/orders/",
      {
        customerOrderId: customerId,
        orderDate: getCurrentDayString(),
        orderStatus: "Pending",
      },
      true
    );
  };
  const pushOrders = (cartProducts, orderId, messageWhenCompleted) => {
    set(ref(fbStore,`/orders/${orderId}/productOrderedList/`),cartProducts)
    message.success(messageWhenCompleted);
  };
  return (
    <MinhForm onFinish = {orderHandler} submitter={false}>
      <CardLayout cardTitle={"Add new order"}>
        <Tabs defaultActiveKey="profile">
          <TabPane tab="Profile" key={"profile"}>
            <ProForm.Item name={"orderCustomerProfile"}>
              <OrderProfileForm />
            </ProForm.Item>
         
            <ProFormDatePicker label="order date" name={"orderDate"}/>
            <ProFormDatePicker label="order pick" name={"orderPickup"}/>

          </TabPane>
          <TabPane tab="New order" key={"newOrder"}>
            <ProForm.Item name={"orderList"}>
              <ProEditOrderTable />
            </ProForm.Item>
          </TabPane>
        </Tabs>
      </CardLayout>
    </MinhForm>
  );
};

export default NewOrder;
