import { Button, Col, Form, message, Row } from "antd";
import { set } from "firebase/database";
import { useEffect, useState } from "react";
import EditTable from "../EditTable/EditTable";
import useEditTable from "../EditTable/useEditTable";
import {
  addNewItem,
  deleteItem,
  getCurrentDayString,
} from "../Firebase/Firebase";
import { orderCartTableColumns } from "./OrderCartTableInfo";

const OrderCart = ({
  customerProfile,
  orderInfo,
  mode = "newOrder",
  initalCartProducts,
}) => {
  const editTable = useEditTable();
  const onCartUpdate = () => {
    editTable
      .getValidateValues()
      .then((data) => {
        updateOrder(editTable.getTableValues());
      })
      .catch((error) => console.log(error));
  };

  const updateOrder = (cartProducts) => {
    if (!cartProducts.length) {
      message.info("You haven't order any dish :<");
      return;
    }
    const orderId = orderInfo.orderId;
    deleteCurrentOrderList(`/orders/${orderId}/productOrderedList/`);
    pushOrders(cartProducts, orderId, "Update completed");
  };

  const deleteCurrentOrderList = (pathToCurrentOrderList) => {
    deleteItem(pathToCurrentOrderList);
  };

  const makeOrder = (cartProducts) => {
    if (!cartProducts.length) {
      message.info("You haven't order any dish :<");
      return;
    }
    const orderId = makeOrderRequest(customerProfile);
    pushOrders(cartProducts, orderId, "Order successfully!");
    editTable.setTableValues([]);
  };

  const onCartOrder = () => {
    editTable
      .getValidateValues()
      .then((data) => {
        makeOrder(editTable.getTableValues());
      })
      .catch((error) => console.log(error));
  };
  const [totalPrice,setTotalPrice] = useState(0)
  const onDataChange = (cartProducts) => {
    const total = cartProducts.reduce((total,cartProduct)=> total+cartProduct.orderUnitPrice*(cartProduct.orderQuantum || 0),0)
    setTotalPrice(total)
  }
  useEffect(()=>onDataChange(initalCartProducts),[])
  const footer = <Row justify="space-between">
    <Col>Total</Col>
    <Col>{totalPrice} vnd</Col>
  </Row>
  if (!customerProfile) return <p>Please select a customer profile </p>;
  
  return (
    <>
      <EditTable
        editTable={editTable}
        columns={orderCartTableColumns}
        dataSource={initalCartProducts}
        multiple
        onDataChange={onDataChange}
        footer={()=>footer}
      />
      {mode !== "newOrder" ? (
        <>
          <Row>
            <b>Order date:</b> {orderInfo.orderDate}
          </Row>
          <Row>
            <b>Order status:</b> {orderInfo.orderStatus}
          </Row>
          <Row justify="space-between" style={{ marginTop: 20 }}>
            <Button
              type="primary"
              onClick={onCartUpdate}
              style={{ backgroundColor: "green" }}
            >
              Update
            </Button>
          </Row>
        </>
      ) : (
        <>
          <Row justify="space-between" style={{ marginTop: 20 }}>
            <Button
              type="primary"
              onClick={onCartOrder}
              style={{ backgroundColor: "green" }}
            >
              Order
            </Button>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderCart;

function pushOrders(cartProducts, orderId, messageWhenCompleted) {
  for (const cartProduct of cartProducts) {
    addNewItem(
      `/orders/${orderId}/productOrderedList/`,
      {
        orderProductId: cartProduct.orderProductId,
        orderQuantum: cartProduct.orderQuantum,
        orderUnitPrice: cartProduct.orderUnitPrice,
      },
      true
    );
  }
  message.success(messageWhenCompleted);
}

function makeOrderRequest(customerProfile) {
  return addNewItem(
    "/orders/",
    {
      customerOrderId: customerProfile.customerId,
      orderDate: getCurrentDayString(),
      orderStatus: "Pending",
    },
    true
  );
}
