
import useCustomerOrderTable from "./useCustomerOrderTable";
import CustomerOrderTableHandle from "./CustomerOrderTableHandle";
import EditTable from "../EditTable/EditTable";

const CustomerOrderTable = ({ customerId }) => {
  const { orders, history, form, dataSource, columns } = useCustomerOrderTable(customerId);
  const {onRow,onUpdateOrder} = CustomerOrderTableHandle({orders,history})

  return (
    <EditTable
      form={form}
      onRow={onRow}
      dataSource={dataSource}
      columns={columns}
      onDataChange={onUpdateOrder}
      canAddNewRow={false}
    />
  );
};

export default CustomerOrderTable;
