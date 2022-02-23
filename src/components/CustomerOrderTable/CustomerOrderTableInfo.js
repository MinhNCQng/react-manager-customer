import { DatePicker } from "antd";

const customerOrderTableColumns = [
  {
    title: "Order id",
    dataIndex: "orderId",
    key: "orderId",
    width: "25%",
    disabled: true,
  },
  {
    title: "Order date",
    dataIndex: "orderDate",
    key: "orderDate",
    width: "25%",
    EditRender: DatePicker,
    extraPropsEditComponent: { format: "DD/MM/YYYY" },
    render: (text) => text.format("DD/MM/YYYY"),
  },
  {
    title: "Order status",
    dataIndex: "orderStatus",
    key: "orderStatus",
    width: "25%",
  },
];

export { customerOrderTableColumns };
