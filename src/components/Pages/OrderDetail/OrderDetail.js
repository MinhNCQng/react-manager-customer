import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import CardLayout from "../../Layouts/CardLayout/CardLayout";
import { useSelector } from "react-redux";
import OrderCart from "../../OrderCart/OrderCart";
import ProEditOrderTable from "../../ProEditOrderTable/ProEditOrderTable";
import { useState } from "react";
import CartButton from "../../Button/CartButton";
import MinhForm from "../TestForm/MinhForm";
import ProForm from "@ant-design/pro-form";
import Form from "antd/lib/form/Form";
import OrderDetailInfo from "./OrderDetailInfo";
import { fbStore } from "../../Firebase/Firebase";
import { ref, set } from "firebase/database";
import { message } from "antd";

const cartProductsAdaptive = (productOrderedList, products) => {
  const cartProducts = [];
  if (!productOrderedList) return cartProducts;
  for (const [key, orderItem] of Object.entries(productOrderedList)) {
    const cartProduct = {
      id: key,
      orderProductId: orderItem.orderProductId,
      orderQuantum: orderItem.orderQuantum,
      orderUnitPrice: orderItem.orderUnitPrice,
      orderFinalPrice: orderItem.orderFinalPrice,
      orderDiscount: orderItem.orderDiscount,
    };
    cartProducts.push(cartProduct);
  }
  return cartProducts;
};

const OrderDetail = (props) => {
  const params = useParams();
  const orderId = params.orderId;
  const products = useSelector((storeData) => storeData.products);
  const orderIdItem = useSelector((storeData) =>
    storeData.orders.find((order) => order.orderId === orderId)
  );
  const onUpdateProducts = (cartInfo) => {
    set(ref(fbStore,`/orders/${orderId}/productOrderedList/`),cartInfo)
    message.success("Update complete");
  };
  if (!orderIdItem || !products.length) return <></>;
  return (
    <MinhForm initialValues={orderIdItem.productOrderedList} submitter={false} onFinish = {onUpdateProducts}>
      <CardLayout cardTitle={"Order detail"} back>
        <ProForm.Item>
          <OrderDetailInfo />
        </ProForm.Item>
        <ProForm.Item name={["products"]}>
          <ProEditOrderTable submitText={"Update"} />
        </ProForm.Item>
      </CardLayout>
    </MinhForm>
  );
};

export default OrderDetail;
