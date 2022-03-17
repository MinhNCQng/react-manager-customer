import { updateItem } from "../Firebase/Firebase";
import { updateDbTable } from "../MinhServer/action";

function CustomerFormHandle({
  setIsEditing,
  setCustomerData,
  form,
  customerData,
  customerId,
}) {
  const onEditButtonCLicked = (e) => {
    setIsEditing(true);
  };
  const onCancelButtonClicked = (e) => {
    setIsEditing(false);
    form.setFieldsValue(customerData);
  };
  const onDoneButtonClicked = (e) => {
    const newCustomerData = form.getFieldsValue();
    updateDbTable("Customers",customerId,newCustomerData)
    form.setFieldsValue(newCustomerData)
    setIsEditing(false);
  };
  return { onEditButtonCLicked, onCancelButtonClicked, onDoneButtonClicked };
}

export default CustomerFormHandle;
