import { Form } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { customerOrderTableColumns } from "./CustomerOrderTableInfo";

function useCustomerOrderTable(customerId) {
  const history = useHistory();

  const orders = useSelector((storeData) =>
    storeData.orders.filter((order) => order.customerOrderId === customerId)
  );
  const columns = customerOrderTableColumns;
  const dataSource = orders.map((order) => {
    return {
      ...order,
      key: order.orderId,
      orderDate: moment(order.orderDate, "DD/MM/YYYY"),
    };
  });

  const [form] = Form.useForm();
  return { orders, history, form, dataSource, columns };
}

export default useCustomerOrderTable;
