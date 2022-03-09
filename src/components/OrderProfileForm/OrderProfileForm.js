import { Form, Row } from "antd";
import ProfileSelector from "../ProfileSelector/ProfileSelector";
import OrderProfileFormItem from "./OrderProfileFormItem";

const OrderProfileForm = ({ value : customerProfile, onChange }) => {
  const renderFields = [
    { key: "firstName", name: "First name" },
    { key: "lastName", name: "Last name" },
    { key: "phoneNumber", name: "Phone number" },
    { key: "email", name: "Email" },
    { key: "address", name: "Address" },
  ];

  const onProfileChange = (customerProfile) => {
    onChange(customerProfile);
  };
  return (<>
      <ProfileSelector customerProfile={customerProfile} onProfileChange={onProfileChange} />
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
    </>
  );
};

export default OrderProfileForm;
