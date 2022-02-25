import {
  editedActions,
  editingActions,
} from "../Layouts/CardLayout/CardLayoutActions";

function CustomerDataActions({
  isEditing,
  onCancelButtonClicked,
  onDoneButtonClicked,
  onEditButtonCLicked,
}) {
  const customerDataActions = isEditing
    ? editingActions({
        onCancelButtonClicked: onCancelButtonClicked,
        onDoneButtonClicked: onDoneButtonClicked,
      })
    : editedActions({ onEditButtonCLicked: onEditButtonCLicked });
  return customerDataActions;
}

export default CustomerDataActions;
