import { InputNumber, Select } from "antd";

const proEditOrderColumns = ({ getProductById, products, getFinalPrice }) => {
  const columns = [
    {
      title: "Product name",
      dataIndex: "orderProductId",
      width: "30%",
      renderFormItem: (record, rowInfo, form) => {
        const rowKey = rowInfo.recordKey;
        return (
          <Select
          >
            {products.map((product) => (
              <Select.Option key={product.productId} value={product.productId}>
                {product.name}
              </Select.Option>
            ))}
          </Select>
        );
      },
      formItemProps: {
        rules: [{ required: true, message: "Vui lòng nhập dùm cái đi" }],
      },
      render: (selectedProductId, record, _, action) => {
        return getProductById(selectedProductId).name;
      },
    },
    {
      title: "Unit price",
      key: "orderUnitPrice",
      dependencies: ["orderProductId"],
      onDependChange: (newData)=>{
        const selectedProduct = getProductById(newData.orderProductId);
        newData.orderUnitPrice = selectedProduct.price
        return newData;
      },
      dataIndex: "orderUnitPrice",
      valueType: "digit",
    },

    {
      title: "Quantum",
      dataIndex: "orderQuantum",
      key: "orderQuantum",
      valueType: "digit",
      fieldProps: { min: 1, max: 10 },
      formItemProps: {
        rules: [{ required: true, message: "Vui lòng nhập dùm cái đi" }],
      },
    },
    
    {
      title: "Final price",
      dataIndex: "orderFinalPrice",
      key: "orderFinalPrice",
      dependencies: ["orderUnitPrice","orderQuantum","orderDiscount","accessory"],
      onDependChange:(newData)=> {
        newData.orderFinalPrice = getFinalPrice(newData)
        return newData
      },
      editable: true,
      renderFormItem: (record, rowInfo, form) => {
        const rowId = rowInfo.recordKey;
        return <InputNumber placeholder={"place holder"} />;
      },
    },
    {
      title: "Operator",
      dataIndex: "option",
      key: "option",
      valueType: "option",
    },
  ];

  const dependColumns = [
    ...columns,
  ]
  return [columns,dependColumns];
};
export default proEditOrderColumns;
