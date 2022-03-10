import { Form } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getDataJSON } from "../Firebase/Firebase";
import useFirebaseData from "../Firebase/useFirebaseData";
import { customerOrderTableColumns } from "./CustomerOrderTableInfo";

function useCustomerOrderTable(customerId) {
  const history = useHistory();
  const [orders] = useFirebaseData("orders","orderId")
  const customerOrders = orders.filter(
    (order) => order.customerOrderId === customerId
  );
  const columns = customerOrderTableColumns;
  const dataSource = customerOrders.map((order) => {
    return {
      ...order,
      key: order.orderId,
      orderDate: moment(order.orderDate, "DD/MM/YYYY"),
    };
  });

  const [form] = Form.useForm();
  return { orders: customerOrders, history, form, dataSource, columns };
}

export default useCustomerOrderTable;
