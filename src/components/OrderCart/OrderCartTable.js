import { Form, InputNumber, Table } from "antd";
import { useEffect  } from "react";
import ProductSelector from "../ProductSelector/ProductSelector";
import { getOrderCartTableColumns } from "./OrderCartTableInfo";

const OrderCartTable = ({cartProducts, onCartProductUpdateValues, onCartProductDelete, onCartOrder, form}) => {

  const setFormInitalValues = ()=> {
    const formValues = {}
    for (const cartProduct of cartProducts) {
      formValues[cartProduct.key] = {
        orderProductName: cartProduct.orderProductName,
        orderUnitPrice: cartProduct.orderUnitPrice,
        orderQuantum: cartProduct.orderQuantum
      }
    }
    form.setFieldsValue(formValues)
  }
  const onRemoveCartProduct = (cartProduct) => {
    onCartProductDelete(cartProduct.key)
  }
  const orderCartTableColumns = getOrderCartTableColumns({onRemoveCartProduct})
  const columns = orderCartTableColumns.map((column) => {
      return {
          ...column,
          onCell: (record) => ({title:column.title,dataKey:record.key,dataIndex:column.dataIndex,record})
      }
  });

  const onChangeFormValues = (orderProductKey, updateOrderProductInfo) =>
    onCartProductUpdateValues(orderProductKey, updateOrderProductInfo);

  const onChangeProduct = ( orderProductKey, orderProduct) => {
    const cartProductValues = {
      orderProductName: orderProduct.name,
      orderUnitPrice: orderProduct.price,
      orderProductId: orderProduct.productId,
    };
    onCartProductUpdateValues(orderProductKey,cartProductValues)
  }
  const EditableCell = ({record, title, dataKey ,dataIndex,children, ...restProps }) => {
    const disabled = dataIndex ==="orderUnitPrice" 
    const inputNode =
      dataIndex === "orderProductName" ? (
        <ProductSelector
          onProductChange={(orderProduct) => onChangeProduct(dataKey, orderProduct)}
          defaultProductName = {record.orderProductName}
        />
      ) : (
        <InputNumber min={1} disabled={disabled} onChange = {(value)=>onChangeFormValues(dataKey,{[dataIndex]:value})}/>
      );
  
    if (dataIndex === "operation") return <td>{children}</td>;
    return (
      <td {...restProps}>
        <Form.Item
          name={[record.key,dataIndex]}
          style={{ margin: 0 }}
          rules = {[{required: disabled ? false: true , message:"This field is required!"}]}
        >
          {inputNode} 

        </Form.Item>
      </td>
    );
  };
  useEffect(() => {
    setFormInitalValues()

  }, [cartProducts])
  

  return (
    <Form form={form} component={false}>
      <Table
        columns={columns}
        dataSource={cartProducts}
        components={cartProducts.length && { body: { cell: EditableCell} }}
      />
    </Form>
  );
};

export default OrderCartTable;
