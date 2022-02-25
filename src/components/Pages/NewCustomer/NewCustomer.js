import { Form } from "antd";
import CustomerForm from "../../CustomerForm/CustomerForm";
import CardLayout from "../../Layouts/CardLayout/CardLayout";
import { addingNewAction } from "../../Layouts/CardLayout/CardLayoutActions";
import { addNewItem } from "../../Firebase/Firebase";
function NewCustomer(props) {
  const [form] = Form.useForm();
  const isEditing = true;
  const onSubmitButtonClicked = ()=>{
    form
      .validateFields()
      .then(() => {
        const customerInfo = form.getFieldsValue();
        addNewItem("/customers/", customerInfo);
      })
      .catch((error) => console.log(error));
    
  }
  const onResetButtonClicked = ()=>{
    form.resetFields()
  }
  const actions = addingNewAction({onSubmitButtonClicked,onResetButtonClicked})
  return (
    <CardLayout cardTitle={"Add a new customer !"} back>
      <CustomerForm form={form} isEditing={isEditing} actions = {actions} newRegister/>
    </CardLayout>
  );
}

export default NewCustomer;
