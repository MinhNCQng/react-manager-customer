import { Table } from "antd";
import { CustomerTableInfo } from "./CustomerTableInfo";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
function CustomerTable() {
  const { customerTableColumns:columns } = CustomerTableInfo;
  const customerTableRowData = useSelector((storeData) => storeData.customers);
  const dataSource = customerTableRowData.map(customer => {return {...customer, key: customer.customerId}})
  const history = useHistory();
  const routerMatch = useRouteMatch()
  const handleCustomerRowDoubleClicked = (customerData) => {
    history.push(`${routerMatch.path}/${customerData.customerId}`);
  };
  const onRow = (customerData) => {
    return {
      onDoubleClick: () => {
        handleCustomerRowDoubleClicked(customerData);
      },
    };
  };
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      onRow={onRow}
    />
  );
}

export default CustomerTable;
