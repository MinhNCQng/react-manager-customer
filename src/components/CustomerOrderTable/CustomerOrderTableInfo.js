import { editAndRemoveActions, editingActions } from "../Layouts/CardLayout/CardLayoutActions";

const getCustomerOrderTableColumns = ({
  onEditButtonCLicked,
  onRemoveButtonCLicked,
  onCancelButtonClicked,
  onDoneButtonClicked,
  isEditing,
}) => [
  {
    title: "Order id",
    dataIndex: "orderId",
    key: "orderId",
    editable: false,
  },
  {
    title: "Order date",
    dataIndex: "orderDate",
    key: "orderDate",
    editable: true,
  },
  {
    title: "Order status",
    dataIndex: "orderStatus",
    key: "orderStatus",
    editable: true,
  },
  {
    title: "Action",
    key: "action",
    width: 300,
    render: (text, record) => {
      if (!isEditing(record))
        return editAndRemoveActions({
          onEditButtonCLicked: () => onEditButtonCLicked(record),
          onRemoveButtonCLicked: () => onRemoveButtonCLicked(record),
        });
      return editingActions({onCancelButtonClicked,onDoneButtonClicked})
    },
  },
];

export { getCustomerOrderTableColumns };
