import { message } from "antd";
import {
  addNewItem,
  deleteItem,
  getCurrentDayString,
} from "../Firebase/Firebase";

const OrderCartHandle = ({
  form,
  cartProduct,
  orderInfo,
  customerProfile,
  setCartProduct,
  setTotalPrice,
}) => {
  const onCartUpdate = () => {
    form
      .validateFields()
      .then(() => {
        updateOrder(cartProduct);
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
  };

  const onCartOrder = () => {
    form
      .validateFields()
      .then(() => {
        makeOrder(cartProduct);
      })
      .catch((error) => console.log(error));
  };

  const onDataChange = (cartProducts) => {
    if (!cartProducts) return;
    const total = cartProducts.reduce(
      (total, cartProduct) =>
        total + (cartProduct.orderUnitPrice||0)* (cartProduct.orderQuantum || 0),
      0
    );
    setTotalPrice(total);
    setCartProduct(cartProducts);
  };
  const pushOrders = (cartProducts, orderId, messageWhenCompleted) => {
    console.log(cartProducts);
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
  return { onCartUpdate, onCartOrder, onDataChange }
};
export default OrderCartHandle;
