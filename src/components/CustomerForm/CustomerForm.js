import ProForm from "@ant-design/pro-form";
import { Row } from "antd";
import React, { useEffect } from "react";
import CustomerDataActions from "./CustomerFormAction";
import { labelAndNameFormFields } from "./CustomerFormFields";
import CustomerFormHandle from "./CustomerFormHandle";
import { customerFormRules, formItemLayout } from "./CustomerFormInfo";
import CustomerFormItem from "./CustomerFormItem";
import useCustomerFormState from "./useCustomerFormState";

function CustomerForm({
  customerData,
  customerId,
  actions,
  form,
  newRegister,
}) {
  const customerFormState = useCustomerFormState(newRegister);
  const { isEditing } = customerFormState;
  const customerFormHandle = CustomerFormHandle({
    ...customerFormState,
    customerId,
    form,
  });
  const customerDataActions =
    actions || CustomerDataActions({ isEditing, ...customerFormHandle });
  useEffect(() => {
    form.resetFields()
  } )
  return (
    <>
      <ProForm
        form={form}
        initialValues = {customerData}
        {...formItemLayout}
        layout="horizontal"
        submitter={{
          render: (props, doms) => {
            return customerDataActions;
          },
        }}
      >
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
      </ProForm>
    </>
  );
}

export default CustomerForm;
