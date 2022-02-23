import { Button, InputNumber } from "antd";
import React from "react";
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
    EditRender: ProductSelector,
    onValueChange: (dataChange, form, { key, dataIndex }) => {
      const selectedProduct = products.find(
        (product) => product.productId === dataChange
      );
      form.setFields([
        { name: [key, "orderUnitPrice"], value: selectedProduct.price },
      ]);
    },
    rules: [{ required: true, message: "Please select a product" }],
  },
  {
    title: "Unit price",
    dataIndex: "orderUnitPrice",
    key: "orderUnitPrice",
    disabled: true,
    EditRender: InputNumber,
  },
  {
    title: "Quantum",
    dataIndex: "orderQuantum",
    key: "orderQuantum",
    EditRender: InputNumber,
    initialValue: 1,
    extraPropsEditComponent: { min: 1, max: 10 },
    rules: [{ required: true, validator: checkNumberGreaterThanZero }],
  },
];

export { getOrderCartTableColumns };
