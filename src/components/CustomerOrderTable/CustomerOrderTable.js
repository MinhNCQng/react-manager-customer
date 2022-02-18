import { Table } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteItem } from "../Firebase/Firebase";

import { getCustomerOrderTableColumns } from "./CustomerOrderTableInfo";

const CustomerOrderTable = ({ customerId }) => {
  const history = useHistory()
  const [editingKey, setEditingKey] = useState("")
  const isEditing = (record) => record.key === editingKey
  const cancelEdit = ()=>{
    setEditingKey("")
  }
  const orders = useSelector((storeData) =>
    storeData.orders.filter((order) => order.customerOrderId === customerId)
  );
  const dataSource = orders.map((order) => {
    return { ...order, key: order.orderId };
  });
  const onOrderDelete = (order) => {
    deleteItem(`orders/${order.orderId}`)
  }
  const onOrderEditing = () => {
    
  } 
  const columns = getCustomerOrderTableColumns({onRemoveButtonCLicked:onOrderDelete,onEditButtonCLicked:onOrderEditing, isEditing})
  const mergedColumns = columns.map((col) => {
    if (!col.editable)
      return col
    return {
      ...col,
      onCell: (record) =>({record,dataIndex: col.dataIndex, editing: isEditing(record)})
    }

  })
  const onRow = (order) =>{
    return {
      onDoubleClick:()=>{
        history.push(`/order/${order.orderId}`)
      }
    }
  }

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      onRow = {onRow}
    />
  );
};

export default CustomerOrderTable;
