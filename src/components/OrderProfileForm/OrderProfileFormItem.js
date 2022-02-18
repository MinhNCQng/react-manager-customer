import { Col, Form } from "antd"

const OrderProfileFormItem = ({label,value}) => {
    return <Col span={11}>
        <Form.Item label={<label style={{fontWeight:"bold"}}>{label}</label>} > 
            {value}
        </Form.Item>
    </Col>
}

export default OrderProfileFormItem