import { Form } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getDataJSON } from "../Firebase/Firebase";
import useFirebaseData from "../Firebase/useFirebaseData";
import { callServerFunc, getSearchedTable } from "../MinhServer/action";
import useData from "../MinhServer/useData";
import { customerOrderTableColumns } from "./CustomerOrderTableInfo";


function useCustomerOrderTable(customerId) {
  const history = useHistory();
  const [customerOrder, setCustomerOrder] = useState([])
  
  // callServerFunc
  const [orders] = useData("Orders","orderId")
  // const customerOrders = orders.filter(
  //   (order) => order.customerOrderId === customerId
  // );
  const customerOrders = customerOrder

  // const customerOrders = customerOrder
  const columns = customerOrderTableColumns;
  const dataSource = customerOrders.map((order) => {
    return {
      ...order,
      key: order.objectId,
      orderId: order.objectId,
      orderDate: moment(order.orderDate, "DD/MM/YYYY"),
    };
  });

  const [form] = Form.useForm();
  useEffect(()=> {
    getSearchedTable("Orders",{where:JSON.stringify({customerOrderId:customerId})}).then(setCustomerOrder)
  },[])
  return { orders: customerOrders, history, form, dataSource, columns };
}

export default useCustomerOrderTable;
