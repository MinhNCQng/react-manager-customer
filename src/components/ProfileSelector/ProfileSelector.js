import { Col, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDataJSON } from "../Firebase/Firebase";
import useFirebaseData from "../Firebase/useFirebaseData";

const { Option } = Select;
const ProfileSelector = ({customerProfile, onProfileChange}) => {
  const [customers] = useFirebaseData("customers","customerId")

  const onChange = (key) => {
    onProfileChange(customers[key])
  }
  return (
    <Select style={{width:"300px", marginBottom:40}} value={customerProfile?.customerId}  optionLabelProp = "label" onChange={onChange} >
      {customers.map((customer, index) => (
        <Option key={customer.customerId} value={index} label={customer.customerId}>
          <Row justify="space-between">
            <Col>{customer.customerId}</Col>
            <Col>{customer.firstName}</Col>
          </Row>
        </Option>
      ))}
    </Select>
  );
};

export default ProfileSelector;
