import { updateItem } from "../Firebase/Firebase";

function CustomerFormHandle({
  setIsEditing,
  setCustomerData,
  form,
  customerData,
  customerId,
}) {
  const onEditButtonCLicked = (e) => {
    setIsEditing(true);
    setCustomerData(form.getFieldsValue());
  };
  const onCancelButtonClicked = (e) => {
    setIsEditing(false);
    form.setFieldsValue(customerData);
  };
  const onDoneButtonClicked = (e) => {
    const newCustomerData = form.getFieldsValue();
    updateItem(`/customers/${customerId}`, newCustomerData);
    setIsEditing(false);
  };
  return { onEditButtonCLicked, onCancelButtonClicked, onDoneButtonClicked };
}

export default CustomerFormHandle;
