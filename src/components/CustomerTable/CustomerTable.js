import { Table } from "antd";
import { CustomerTableInfo } from "./CustomerTableInfo";
import { useHistory, useRouteMatch } from "react-router-dom";
import useData from "../MinhServer/useData";
function CustomerTable() {
  const { customerTableColumns:columns } = CustomerTableInfo;
  const [customerTableRowData] = useData("Customers","customerId")
  const isLoading = !customerTableRowData
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
      loading={isLoading}
    />
  );
}

export default CustomerTable;
