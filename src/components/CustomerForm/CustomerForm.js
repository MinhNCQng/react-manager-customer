import { Form, Row } from "antd";
import React, { useState } from "react";
import { updateItem } from "../Firebase/Firebase";
import { editedActions, editingActions } from "../Layouts/CardLayout/CardLayoutActions";
import { labelAndNameFormFields } from "./CustomerFormFields";
import { customerFormRules, formItemLayout } from "./CustomerFormInfo";
import CustomerFormItem from "./CustomerFormItem";

function CustomerForm({ customerData: customerInfo, customerId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [customerData, setCustomerData] = useState(customerInfo);
  const onEditButtonCLicked = (e) => {
    setIsEditing(true);
    setCustomerData(form.getFieldsValue());
  };
  const onCancelButtonClicked = (e) => {
    setIsEditing(false);
    form.setFieldsValue(customerData);
  };
  const onDoneButtonClicked = (e) => {
    const newCustomerData = form.getFieldsValue();
    updateItem(`/customers/${customerId}`, newCustomerData);
    setIsEditing(false);
  };
  const customerDataActions = isEditing
    ? editingActions({
        onCancelButtonClicked: onCancelButtonClicked,
        onDoneButtonClicked: onDoneButtonClicked,
      })
    : editedActions({ onEditButtonCLicked: onEditButtonCLicked });
  return (
    <>
      <Form form={form} {...formItemLayout} initialValues={customerData}>
        <Row wrap>
          {labelAndNameFormFields.map(({ label, name }, index) => (
            <CustomerFormItem
              rules={customerFormRules[name]}
              key={index}
              label={label}
              name={name}
              isEditing={isEditing}
            />
          ))}
        </Row>
      </Form>
      {customerDataActions.map((action, index) => <React.Fragment key={index}>{action}</React.Fragment>)}
    </>
  );
}

export default CustomerForm;
