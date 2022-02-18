import { List, Row, Col } from "antd";
import { useSelector } from "react-redux";
import OrderDetailListItem from "./OrderDetailListItem";
import { useState } from "react";
import { deleteItem, updateItem } from "../Firebase/Firebase";

const getDetailOrderedItemsArray = (productOrderedList, products) => {
  if (!productOrderedList) return [];
  const detailOrderedItemsArray = Object.keys(productOrderedList).map(
    (orderedKey) => {
      const orderItem = productOrderedList[orderedKey];
      const orderProduct = products.find(
        (product) => product.productId === orderItem.orderProductId
      );
      const detailOrderItem = {
        ...orderItem,
        orderItemsPrice: orderItem.orderQuantum * orderItem.orderUnitPrice,
        orderItemImageUrl: orderProduct.imgUrl,
        orderItemName: orderProduct.name,
        orderItemKey: orderedKey,
      };
      return detailOrderItem;
    }
  );
  return detailOrderedItemsArray;
};
const OrderDetailList = ({ productOrderedList, orderId, orderDate, orderStatus }) => {
  const [orderItemEditKey, setOrderItemEditKey] = useState("");
  const products = useSelector((storeData) => storeData.products);
  const detailOrderedItemsArray = getDetailOrderedItemsArray(
    productOrderedList,
    products
  );

  const totalSumPrice = detailOrderedItemsArray.reduce(
    (total, item) => total + item.orderItemsPrice,
    0
  );

  const onUpdateOrderItem = (orderItemKey, orderItemDetail) => {
    updateItem(
      `/orders/${orderId}/productOrderedList/${orderItemKey}`,
      orderItemDetail
    );
  };
  const onDeleteOrderItem = (orderItemKey) => {
    deleteItem(`/orders/${orderId}/productOrderedList/${orderItemKey}`);
  };

  return (
    <List
      header={<p>Order list</p>}
      dataSource={detailOrderedItemsArray}
      renderItem={(detailOrderedItem) => (
        <OrderDetailListItem
          {...detailOrderedItem}
          orderItemEditKey={orderItemEditKey}
          setOrderItemEditKey={setOrderItemEditKey}
          onUpdateOrderItem={onUpdateOrderItem}
          onDeleteOrderItem={onDeleteOrderItem}
        />
      )}
      footer={
        <>
          <Row justify="start" gutter={16}>
            <Col>
              <b> Total:</b>
            </Col>
            <Col>
               {totalSumPrice}
            </Col>
          </Row>
          <Row justify="start" gutter={16}>
            <Col>
              <b> Date order:</b>
            </Col>
            <Col>
              {orderDate}
            </Col>
          </Row>
          <Row justify="start" gutter={16}>
            <Col>
              <b> Status:</b>
            </Col>
            <Col>
              {orderStatus}
            </Col>
          </Row>
        </>
      }
    />
  );
};

export default OrderDetailList;
