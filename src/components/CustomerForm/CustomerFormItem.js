import ProForm, { ProFormText } from "@ant-design/pro-form";
import { Col } from "antd";

function CustomerFormItem({ label, name, isEditing, rules }) {
  return (
    <Col span={12}>
         <ProFormText  label={label} name={name} disabled={!isEditing} rules={rules} placeholder="" />
    </Col>
  );
}

export default CustomerFormItem;
