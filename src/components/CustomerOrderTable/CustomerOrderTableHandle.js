import { deleteItem, updateItem } from "../Firebase/Firebase";

function CustomerOrderTableHandle({orders,history}) {
  const onUpdateOrder = (orderData) => {
    updateCustomerOrder(orders, orderData);
  };

  const updateCustomerOrder = (initialOrder, updateOrder) => {
    initialOrder.forEach((order) => {
      const orderKey = order.orderId;
      const orderIndex = updateOrder.findIndex(
        (order) => order.key === orderKey
      );

      if (orderIndex < 0) {
        deleteItem(`orders/${orderKey}`);
        return;
      }
      const updatedData = {
        orderDate: updateOrder[orderIndex].orderDate.format("DD/MM/YYYY"),
        orderStatus: updateOrder[orderIndex].orderStatus,
      };
      updateItem(`orders/${orderKey}`, updatedData, true);
    });
  };

  const onRow = (order) => {
    return {
      onDoubleClick: () => {
        history.push(`/order/${order.orderId}`);
      },
    };
  };
  return {onRow,onUpdateOrder};
}

export default CustomerOrderTableHandle;
