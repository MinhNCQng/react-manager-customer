import { message, Tabs } from "antd";
import { useState } from "react";
import CartButton from "../../Button/CartButton";
import { addNewItem, getCurrentDayString } from "../../Firebase/Firebase";
import CardLayout from "../../Layouts/CardLayout/CardLayout";
import OrderProfileForm from "../../OrderProfileForm/OrderProfileForm";
import ProEditOrderTable from "../../ProEditOrderTable/ProEditOrderTable";


const {TabPane} = Tabs
const NewOrder = (props) => {
  const [customerProfile, setCustomerProfile] = useState()
  const onCustomerProfileSelected = (selectedProfile) => {
    setCustomerProfile(selectedProfile)
  }
  const [cartProduct, setCartProduct] = useState([])
  const onButtonClick = () => {
    makeOrder(cartProduct)
  }
  const makeOrder = (cartProducts) => {
    if (!cartProducts.length) {
      message.info("You haven't order any dish :<");
      return;
    }
    const orderId = makeOrderRequest(customerProfile);
    pushOrders(cartProducts, orderId, "Order successfully!");
  };
  const makeOrderRequest = (customerProfile) => {
    return addNewItem(
      "/orders/",
      {
        customerOrderId: customerProfile.customerId,
        orderDate: getCurrentDayString(),
        orderStatus: "Pending",
      },
      true
    );
  };
  const pushOrders = (cartProducts, orderId, messageWhenCompleted) => {
    console.log(cartProducts);
    for (const cartProduct of cartProducts) {
      addNewItem(
        `/orders/${orderId}/productOrderedList/`,
        {
          orderProductId: cartProduct.orderProductId || 0,
          orderQuantum: cartProduct.orderQuantum || 0,
          orderUnitPrice: cartProduct.orderUnitPrice || 0,
          orderFinalPrice: cartProduct.orderFinalPrice || 0,
          orderDiscount: cartProduct.orderDiscount || 0,
        },
        true
      );
    }
    message.success(messageWhenCompleted);
  };
  return (
    <CardLayout cardTitle={"Add new order"}>
        <Tabs defaultActiveKey="profile">
          <TabPane tab="Profile" key={"profile"}>
            <OrderProfileForm customerProfile = {customerProfile} onCustomerProfileSelected = {onCustomerProfileSelected}/>
          </TabPane>
          <TabPane tab="New order" key={"newOrder"}>
            
            <ProEditOrderTable customerProfile = {customerProfile} dataSource={cartProduct} setDataSource={setCartProduct} />
            <CartButton onButtonClick={onButtonClick} text="Order"/>
          </TabPane>
        </Tabs>
    </CardLayout>
  );
};

export default NewOrder;
