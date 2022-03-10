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
import { fbStore, getDataJSON } from "../../Firebase/Firebase";
import { ref, set } from "firebase/database";
import { message } from "antd";
import useFirebaseData from "../../Firebase/useFirebaseData";
import compareOrderData, { deepDiffMapper } from "./compareData";

const OrderDetail = (props) => {
  const params = useParams();
  const orderId = params.orderId;
  const [products] = useFirebaseData("products","productId")
  const [orders] = useFirebaseData("orders","orderId")
  const orderIdItem = orders.find((order) => order.orderId === orderId)



  const onUpdateProducts = (cartInfo) => {
    // set(ref(fbStore,`/orders/${orderId}/productOrderedList/`),cartInfo)
    // message.success("Update complete");
    // compareOrderData(cartInfo, orderIdItem.productOrderedList)
   console.log(deepDiffMapper.map(orderIdItem.productOrderedList,cartInfo))
  };
  if (!orderIdItem || !products.length) return <>Loading</>;
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
