import { Col, Form, Input } from "antd";

function CustomerFormItem({ label, name, isEditing, rules }) {
  return (
    <Col span={12}>
      <Form.Item label={label} name={name} rules = {rules}>
        <Input disabled={!isEditing}/>
      </Form.Item>
    </Col>
  );
}

export default CustomerFormItem;
