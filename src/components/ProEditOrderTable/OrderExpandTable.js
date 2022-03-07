import { ProFormDigit } from "@ant-design/pro-form";
import { Divider, Form } from "antd";
import AccessoryOrderTable from "./AccessoryOrderTable";

function OrderExpandTable(props) {
  const { rowId } = props;
  return (
    <>
      <ProFormDigit
        label="Discount"
        disabled={props.disabled}
        name={[rowId, "orderDiscount"]}
        width="150px"
        placeholder={"Discount"}
      />{" "}
      <Divider orientation="left" style={{ paddingRight: 500 }}>
        Thông tin phụ kiện
      </Divider>
      <Form.Item name={[rowId,"accessory"]}>
        <AccessoryOrderTable {...props} />
      </Form.Item>
      
    </>
  );
}

export default OrderExpandTable;
