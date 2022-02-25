import { InputNumber } from "antd";
import ProductSelector from "../ProductSelector/ProductSelector";

const checkNumberGreaterThanZero = (_, value) => {
  if (value > 0) {
    return Promise.resolve();
  }
  return Promise.reject(new Error("Quantum must be greater than zero!"));
};
const getOrderCartTableColumns = (products) => [
  {
    title: "Order product",
    dataIndex: "orderProductId",
    key: "orderProductId",
    InputType: ProductSelector,
    onValueChange: (dataChange, form, { key, dataIndex }) => {
      const selectedProduct = products.find(
        (product) => product.productId === dataChange
      );
      form.setFields([
        { name: [key, "orderUnitPrice"], value: selectedProduct.price },
      ]);
    },
    labelItemProps:{rules: [{ required: true, message: "Please select a product" }]},
  },
  {
    title: "Unit price",
    dataIndex: "orderUnitPrice",
    key: "orderUnitPrice",
    disabled: true,
    InputType: InputNumber,
  },
  {
    title: "Quantum",
    dataIndex: "orderQuantum",
    key: "orderQuantum",
    InputType: InputNumber,
    editComponentProps: { min: 1, max: 10 },
    labelItemProps:{rules: [{ required: true, validator: checkNumberGreaterThanZero }], initialValue: 1},
  },
];

export { getOrderCartTableColumns };
