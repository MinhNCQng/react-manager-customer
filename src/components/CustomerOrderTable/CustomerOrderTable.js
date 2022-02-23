import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteItem, updateItem } from "../Firebase/Firebase";
import moment from "moment";

import { customerOrderTableColumns } from "./CustomerOrderTableInfo";
import EditTable from "../EditTable/EditTable";
import useEditTable from "../EditTable/useEditTable";

const CustomerOrderTable = ({ customerId }) => {
  const history = useHistory();
  const editTable = useEditTable()
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
  
  const onOrderDelete = (orderKey) => {
    deleteItem(`orders/${orderKey}`);
  };

  const onUpdateOrder = (orderKey) => {
    const tableData = editTable.getTableValues()
    const orderChanged = tableData.find(data => data.key === orderKey)
    const updatedData = {
      orderDate: orderChanged.orderDate.format("DD/MM/YYYY"),
      orderStatus: orderChanged.orderStatus
    }
    updateItem(`orders/${orderKey}`,updatedData)
  };
  
  const onRow = (order) => {
    return {
      onDoubleClick: () => {
        history.push(`/order/${order.orderId}`);
      },
    };
  };
  return (
    <EditTable
      onRow={onRow}
      editTable={editTable}
      dataSource={dataSource}
      columns={columns}
      canAddNewRow={false}
      onDeleteRow = {onOrderDelete}
      onUpdateRow = {onUpdateOrder}
    />
  );
};

export default CustomerOrderTable;
