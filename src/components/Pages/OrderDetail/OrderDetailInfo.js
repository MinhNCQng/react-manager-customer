import ProForm, { ProFormDatePicker } from "@ant-design/pro-form";
import OrderProfileForm from "../../OrderProfileForm/OrderProfileForm";

function OrderDetailInfo({ value }) {
  return (
    <>
      <ProForm.Item name={"orderCustomerProfile"}>
        <OrderProfileForm />
      </ProForm.Item>

      <ProFormDatePicker label="order date" name={"orderDate"} />
      <ProFormDatePicker label="order pick" name={"orderPickup"} />
    </>
  );
}

export default OrderDetailInfo;
