import { Table } from "antd";
import { CustomerTableInfo } from "./CustomerTableInfo";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getDataJSON } from "../Firebase/Firebase";
import useFirebaseData from "../Firebase/useFirebaseData";
function CustomerTable() {
  const { customerTableColumns:columns } = CustomerTableInfo;
  const [customerTableRowData] = useFirebaseData("customers","customerId")
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
