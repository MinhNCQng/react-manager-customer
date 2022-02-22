import { Form, Input, Table, DatePicker } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteItem, updateItem } from "../Firebase/Firebase";
import moment from "moment";

import { getCustomerOrderTableColumns } from "./CustomerOrderTableInfo";


const CustomerOrderTable = ({ customerId }) => {
  const history = useHistory()
  const [form] = Form.useForm()
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
  const onOrderEditing = (order) => {
    setEditingKey(order.key)
    form.setFieldsValue({...order,orderDate:moment(order.orderDate,"DD/MM/YYYY")})

    
  } 
  const saveEditedOrder = (order) => {
    const formValues = form.getFieldsValue()
    const newInfoOrder = {
      customerOrderId: order.customerOrderId,
      orderDate: formValues.orderDate.format("DD/MM/YYYY"),
      orderStatus: formValues.orderStatus,
    };
    updateItem(`/orders/${order.orderId}/`,newInfoOrder)
  }
  const onOrderDoneEditing = (order) =>{
    saveEditedOrder(order)
    cancelEdit();
  }
  const onOrderCancelEditing = () => {
    cancelEdit();
  }
  const columns = getCustomerOrderTableColumns({
    onRemoveButtonCLicked: onOrderDelete,
    onEditButtonCLicked: onOrderEditing,
    onCancelButtonClicked: onOrderCancelEditing,
    onDoneButtonClicked: onOrderDoneEditing,
    isEditing,
  });

  const onFormValuesChange  = () => {
    console.log(form.getFieldsValue())
  }
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

  const editTableCell = ({record,editing,dataIndex,children,...restProps}) => {
    const inputNode  = dataIndex === "orderDate" ? <DatePicker format={"DD/MM/YYYY"} onChange={onFormValuesChange} /> :<Input onChange={onFormValuesChange} />
    return <td {...restProps}>
      {editing ? <Form.Item name={dataIndex} style={{margin:0}}>{inputNode}</Form.Item> : children}
    </td>
  }

  return (
    <Form form={form} component={false}>
      <Table
        columns={mergedColumns}
        dataSource={dataSource}
        onRow = {onRow}
        components = {{body:{cell:editTableCell}}}
      />
    </Form>
  );
};

export default CustomerOrderTable;
