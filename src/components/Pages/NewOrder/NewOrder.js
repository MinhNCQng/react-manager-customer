import ProForm, { ProFormDatePicker } from "@ant-design/pro-form";
import {  Tabs } from "antd";
import moment from "moment";
import CardLayout from "../../Layouts/CardLayout/CardLayout";
import { postToServer } from "../../MinhServer/action";
import OrderProfileForm from "../../OrderProfileForm/OrderProfileForm";
import ProEditOrderTable from "../../ProEditOrderTable/ProEditOrderTable";
import MinhForm from "../TestForm/MinhForm";

const { TabPane } = Tabs;
const NewOrder = (props) => {
  const orderHandler = (orderInfo ) => {
    const customerOrderId = orderInfo.orderCustomerProfile.customerId
    const orderStatus = "Pending"
    const orderDate = moment().format("DD/MM/YYYY")
    const productOrderedList = orderInfo
    const uploadObj = {
      customerOrderId,
      orderDate,
      orderStatus,
      productOrderedList,
    }
    postToServer("Orders",uploadObj)
  }
 
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
