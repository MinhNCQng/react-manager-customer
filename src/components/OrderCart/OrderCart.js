import { Button, Form, message, Row } from "antd";
import { useState } from "react";
import { addNewItem, deleteItem, getCurrentDayString } from "../Firebase/Firebase";
import OrderCartTable from "./OrderCartTable";

const OrderCart = ({customerProfile, orderInfo, mode = "newOrder", initalCartProducts}) => {
  const [form] = Form.useForm();
  const [cartProducts, setCartProducts] = useState(initalCartProducts || []);
  const onAddNewProduct = () => {
    const lastIndex = cartProducts.length
      ? cartProducts[cartProducts.length - 1].key
      : 0;
    setCartProducts((prev) => [...prev, { key: lastIndex + 1 }]);
  };
  const onCartProductUpdateValues = (updatekey, cartProduct) => {

    const cartProductIndex = cartProducts.findIndex(
      (cartProduct) => cartProduct.key === updatekey
    );
    const cartProductShouldUpdate = cartProducts[cartProductIndex];
    setCartProducts((prev) => {
      prev.splice(cartProductIndex, 1, {...cartProductShouldUpdate, ...cartProduct});
      return [...prev];
    });
  };
  const onCartProductDelete = (deleteKey) => {
    const productDeleteKeyIndex = cartProducts.findIndex(
          (cartProduct) => cartProduct.key === deleteKey
    );
    setCartProducts((prev) => {
      prev.splice(productDeleteKeyIndex, 1);
      return [...prev];
    });
  }
  const onCartOrder = () =>{
    form
      .validateFields()
      .then(() => {
        if (!cartProducts.length) {message.info("You haven't order any dish :<"); return;}
        const orderKey = addNewItem("/orders/", {
          customerOrderId: customerProfile.customerId,
          orderDate: getCurrentDayString(),
          orderStatus: "Pending",
        },true);
        for (const cartProduct of cartProducts) {
          addNewItem(`/orders/${orderKey}/productOrderedList/`, {
            orderProductId: cartProduct.orderProductId,
            orderQuantum: cartProduct.orderQuantum,
            orderUnitPrice: cartProduct.orderUnitPrice,
          },true);
        }
        message.success("Order successfully!")
        setCartProducts([])
      })
      .catch((error) => console.log(error));
    return;
   
  }
  const onCartUpdate = ()=>{
    form
      .validateFields()
      .then(() => {
        if (!cartProducts.length) {message.info("You haven't order any dish :<"); return;}
        const orderId = orderInfo.orderId
        deleteItem(`/orders/${orderId}/productOrderedList/`)
        for (const cartProduct of cartProducts) {
          addNewItem(`/orders/${orderId}/productOrderedList/`, {
            orderProductId: cartProduct.orderProductId,
            orderQuantum: cartProduct.orderQuantum,
            orderUnitPrice: cartProduct.orderUnitPrice,
          },true);
        }
        message.success("Update successfully!")
      })
      .catch((error) => console.log(error));
    return;
  }
  if (!customerProfile) return (<p>Please select a customer profile </p>)
  return (
    <>
      <OrderCartTable
        cartProducts={cartProducts}
        onCartProductUpdateValues={onCartProductUpdateValues}
        onCartProductDelete={onCartProductDelete}
        form={form}
      />
      {mode !== "newOrder" ? (
        <>
          <Row>
            <b>Order date:</b> {orderInfo.orderDate}
          </Row>
          <Row >
            <b>Order status:</b> {orderInfo.orderStatus}
          </Row>
          <Row justify="space-between" style={{marginTop:20}}>
            <Button type="primary" onClick={onAddNewProduct}>
              Add a product
            </Button>
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
        <Row justify="space-between" style={{marginTop:20}}>
          <Button type="primary" onClick={onAddNewProduct}>
            Add a product
          </Button>
          <Button
            type="primary"
            onClick={onCartOrder}
            style={{ backgroundColor: "green" }}
          >
            Order
          </Button>
        </Row>
      )}
    </>
  );
};

export default OrderCart;
