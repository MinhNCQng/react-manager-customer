import { Form, Row } from "antd";
import { labelAndNameFormFields } from "./CustomerFormFields";
import CustomerFormItem from "./CustomerFormItem";
function CustomerForm({ form, isEditing, customerData }) {
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 12,
    },
  };

  const customerFormRules = {
    firstName:[{ required: true, message: 'Please input your first name!' }],
    lastName:[{ required: true, message: 'Please input your last name!' }],
    phoneNumber: [{ required: true, message: 'Please input your phone number!' }],
  }

  return (
    <>
      <Form form={form} {...formItemLayout} initialValues={customerData}>
        <Row wrap>
          {labelAndNameFormFields.map(({ label, name }, index) => (
            <CustomerFormItem
              rules= {customerFormRules[name]}
              key={index}
              label={label}
              name={name}
              isEditing={isEditing}
            />
          ))}
        </Row>
      </Form>
    </>
  );
}

export default CustomerForm;
