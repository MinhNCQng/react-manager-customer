import ProForm, { ProFormCaptcha, ProFormDigit, ProFormText, ProFormTextArea, ProFormTimePicker } from "@ant-design/pro-form";
import { Divider, Form } from "antd";
import AccessoryOrderTable from "./AccessoryOrderTable";

function OrderExpandTable(props) {
  const { rowId } = props;
  return (
    <>
      <ProForm.Group  direction="horizontal">
        <ProFormDigit
          label="Discount"
          name={[rowId, "orderDiscount"]}
          width="150px"
          placeholder={"Discount"}
        />{" "}
        <ProFormCaptcha  name={[rowId, "orderCaptcha"]} label="Captcha" />
        <ProFormTimePicker name={[rowId, "orderTimePicker"]} label="time picker"/>
        <ProFormTextArea name={[rowId, "orderTextArea"]}  label = "Text Area"/>
      </ProForm.Group>

      <Divider orientation="left" style={{ paddingRight: 500 }}>
        Thông tin phụ kiện
      </Divider>
      <AccessoryOrderTable {...props} />
    </>
  );
}

export default OrderExpandTable;
