import ProForm, { ProFormText } from "@ant-design/pro-form";
import { Col, Form, Input } from "antd";

function ProCustomerForm({ label, name, isEditing, rules }) {
  return (
    <Col span={12}>
     <ProForm.Item label={label} name={name}>
         <ProFormText disabled={isEditing} rules={rules}/>
     </ProForm.Item>
    </Col>
  );
}

export default ProCustomerForm;
