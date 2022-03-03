import { InputNumber, Select } from "antd";

const proEditOrderColumns = ({getProductById,updateRowData,products}) => {
    const columns = [
        {
          title: "Product name",
          dataIndex: "orderProductId",
          width: "30%", 
          renderFormItem: (record, rowInfo, form) => {
            const rowKey = rowInfo.recordKey;
            return (
              <Select
                onChange={(selectedProductId) => {
                  const selectedProduct = getProductById(selectedProductId);
                  updateRowData(rowKey, { orderUnitPrice: selectedProduct.price });
                }}
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
            initialValue: 1,
            rules: [{ required: true, message: "Vui lòng nhập dùm cái đi" }],
          },
        },
    
        {
          title: "Final price",
          dataIndex: "orderFinalPrice",
          key: "orderFinalPrice",
          editable: true,
          renderFormItem: (record, rowInfo, form) => {
            const rowId = rowInfo.recordKey;
            return (
              <InputNumber
                placeholder={"place holder"}
              />
            );    
          },
        },
      ];
    return columns
}
export default proEditOrderColumns