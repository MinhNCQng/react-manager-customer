import { Form, InputNumber, Table, Row, Col } from "antd";
import { useEffect, useState  } from "react";
import ProductSelector from "../ProductSelector/ProductSelector";
import { getOrderCartTableColumns } from "./OrderCartTableInfo";

const OrderCartTable = ({cartProducts, onCartProductUpdateValues, onCartProductDelete, form}) => {
  const [cartTotalPrice, setCartTotalPrice] = useState(0)
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
          onCell: (record) => ({title:column.title,dataKey:record.key,dataIndex:column.dataIndex,record,disabled:column.disabled})
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
  const EditableCell = ({record, disabled, title, dataKey , dataIndex, children, ...restProps}) => {
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
    setCartTotalPrice(calculateTotalProductPrice(cartProducts))
  }, [cartProducts])
  

  return (
    <Form form={form} component={false}>
      <Table
        columns={columns}
        dataSource={cartProducts}
        components={cartProducts.length && { body: { cell: EditableCell} }}
        footer = {()=>
          <Row justify="space-between">
            <Col>
              Total:
            </Col>
            <Col>
              {cartTotalPrice} VND
            </Col>
          </Row>
        }
      />
    </Form>
  );
};

const calculateTotalProductPrice = (cartProducts) =>{
  const availableProductPrice = cartProducts.filter(cartProduct => (cartProduct.orderQuantum && cartProduct.orderUnitPrice))
  const totalCartProductsPrice = availableProductPrice.reduce((total, cartProduct) => total+(cartProduct.orderQuantum*cartProduct.orderUnitPrice),0)
  return totalCartProductsPrice;
}

export default OrderCartTable;
