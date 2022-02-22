import { Form, Row } from "antd";
import ProfileSelector from "../Selector/ProfileSelector";
import OrderProfileFormItem from "./OrderProfileFormItem";

const OrderProfileForm = ({customerProfile, onCustomerProfileSelected}) => {
  const renderFields = [
    { key: "firstName", name: "First name" },
    { key: "lastName", name: "Last name" },
    { key: "phoneNumber", name: "Phone number" },
    { key: "email", name: "Email" },
    { key: "address", name: "Address" },
  ];

  const onProfileChange = (value) => {

    onCustomerProfileSelected(value);
  };
  return (
    <Form>
      <Form.Item label="Select customer Id">
        <ProfileSelector onProfileChange={onProfileChange} />
        {customerProfile && (
          <Row justify="space-between">
            {renderFields.map((renderField, index) => (
              <OrderProfileFormItem
                key={index}
                label={renderField.name}
                value={customerProfile[renderField.key]}
              />
            ))}
          </Row>
        )}
      </Form.Item>
    </Form>
  );
};

export default OrderProfileForm;
