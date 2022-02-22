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
    width:"25%",
    editable: false,
  },
  {
    title: "Order date",
    dataIndex: "orderDate",
    key: "orderDate",
    width:"25%",
    editable: true,
  },
  {
    title: "Order status",
    dataIndex: "orderStatus",
    key: "orderStatus",
    width:"25%",
    editable: true,
  },
  {
    title: "Action",
    key: "action",
    width:"25%",
    render: (text, record) => {
      if (!isEditing(record))
        return editAndRemoveActions({
          onEditButtonCLicked: () => onEditButtonCLicked(record),
          onRemoveButtonCLicked: () => onRemoveButtonCLicked(record),
        })[0];
      return editingActions({onCancelButtonClicked: ()=>onCancelButtonClicked(record),onDoneButtonClicked: ()=>onDoneButtonClicked(record)})[0]
    },
  },
];

export { getCustomerOrderTableColumns };
