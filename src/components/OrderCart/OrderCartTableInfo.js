import { Button, InputNumber } from "antd";
import ProductSelector from "../ProductSelector/ProductSelector";

const checkNumberGreaterThanZero = (_,value) => {
  if (value > 0) {
    return Promise.resolve()
  }
  return Promise.reject(new Error('Quantum must be greater than zero!'))
}
const orderCartTableColumns = [
  {
    title: "Order product",
    dataIndex: "orderProductName",
    key: "orderProductName",
    EditRender:ProductSelector, 
    rules: [{ required: true, message: 'Please select a product' }]
  },
  {
    title: "Unit price",
    dataIndex: "orderUnitPrice",
    key: "orderUnitPrice",
    disabled:true,
    EditRender: InputNumber,
  },
  {
    title: "Quantum",
    dataIndex: "orderQuantum",
    key: "orderQuantum",
    EditRender: InputNumber,
    extraPropsEditComponent: {min:1,max:10, defaultValue:1},
    rules: [{ required: true,validator:checkNumberGreaterThanZero }]
  }
];

export { orderCartTableColumns };
