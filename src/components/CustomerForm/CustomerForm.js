import { Form, Row } from "antd";
import React from "react";
import CustomerDataActions from "./CustomerFormAction";
import { labelAndNameFormFields } from "./CustomerFormFields";
import CustomerFormHandle from "./CustomerFormHandle";
import { customerFormRules, formItemLayout } from "./CustomerFormInfo";
import CustomerFormItem from "./CustomerFormItem";
import useCustomerFormState from "./useCustomerFormState";

function CustomerForm({ customerData: customerInfo, customerId, actions, form,newRegister }) {
  const customerFormState = useCustomerFormState(customerInfo, newRegister);
  const { isEditing, customerData } = customerFormState;
  const customerFormHandle = CustomerFormHandle({...customerFormState, customerId,form});
  const customerDataActions = actions || CustomerDataActions({ isEditing, ...customerFormHandle});
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
      {customerDataActions.map((action, index) => (
        <React.Fragment key={index}>{action}</React.Fragment>
      ))}
    </>
  );
}

export default CustomerForm;
