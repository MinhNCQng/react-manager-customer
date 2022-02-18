import { Avatar, Form, InputNumber, List, Space } from "antd";
import { useEffect, useState } from "react";
import {
  editAndRemoveActions,
  editingActions,
} from "../Layouts/CardLayout/CardLayoutActions";
import ProductSelector from "../ProductSelector/ProductSelector";


const OrderDetailListItem = ({
  orderUnitPrice,
  orderProductId,
  orderQuantum,
  orderItemImageUrl,
  orderItemName,
  orderItemKey,
  setOrderItemEditKey,
  orderItemEditKey,
  onUpdateOrderItem,
  onDeleteOrderItem,
}) => {
  const isEditing = orderItemEditKey === orderItemKey;
  const [form] = Form.useForm();
  const onEditButtonCLicked = () => {
    setOrderItemEditKey(orderItemKey);
  };
  const defaultFormData = {
    orderUnitPrice,
    orderQuantum,
    orderItemImageUrl,
    orderProductId,
  }
  const [formProductData, setFormProductData] = useState(defaultFormData);
  const onProductChange = (productChanged) => {
    const formValues = form.getFieldsValue();
    setFormProductData({
      ...formValues,
      orderItemImageUrl: productChanged.imgUrl,
      orderItemName: productChanged.name,
      orderUnitPrice: productChanged.price,
      orderProductId: productChanged.productId,
    });
    form.setFieldsValue(formProductData)
  };
  const onFormValuesChange = () => {
    const formFieldsValue = form.getFieldsValue();
    setFormProductData((prev) => {
      return { ...prev, ...formFieldsValue };
    });
  };
  const onCancelButtonClicked = () => {
    setOrderItemEditKey("");
  };
  const onDoneButtonClicked = () => {
    const itemUpdateValue = {
      orderProductId: formProductData.orderProductId,
      orderUnitPrice: formProductData.orderUnitPrice,
      orderQuantum: formProductData.orderQuantum,
    };
    onUpdateOrderItem(orderItemKey,itemUpdateValue);
    setOrderItemEditKey("");
  };
  const onRemoveButtonCLicked = () => {
    onDeleteOrderItem(orderItemKey)
  }
  useEffect(() => {
    if (!isEditing)
      setFormProductData(defaultFormData);
  }, [isEditing]);

  return (
    <Form
      form={form}
      initialValues={formProductData}
      onValuesChange={onFormValuesChange}
    >
      <List.Item
        actions={
          isEditing
            ? editingActions({ onCancelButtonClicked, onDoneButtonClicked })
            : editAndRemoveActions({ onEditButtonCLicked, onRemoveButtonCLicked })
        }
      >
        <List.Item.Meta
          avatar={
            <Avatar
              shape="square"
              src={
                isEditing
                  ? formProductData.orderItemImageUrl
                  : orderItemImageUrl
              }
            />
          }
          title={
            isEditing ? (
              <ProductSelector
                onProductChange={onProductChange}
                defaultProductName={orderItemName}
              />
            ) : (
              orderItemName
            )
          }
          description={
            isEditing ? (
              <Space>
                Unit price:
                <Form.Item
                  name={"orderUnitPrice"}
                  style={{ display: "inline-flex", marginBottom: "0px" }}
                >
                  <InputNumber min={1} max={200000000} prefix="" />
                </Form.Item>
                VND
              </Space>
            ) : (
              `Unit price: ${orderUnitPrice} VND`
            )
          }
          style={{ maxWidth: "30%" }}
        />
        {isEditing ? (
          <Space>
            x =
            <Form.Item name={"orderQuantum"} style={{ marginBottom: "0px" }}>
              <InputNumber min={1} max={1000} />
            </Form.Item>
          </Space>
        ) : (
          <div>{`x ${orderQuantum}`}</div>
        )}
        <div>{`Price: ${
          formProductData.orderUnitPrice * formProductData.orderQuantum
        } VND`}</div>
      </List.Item>
    </Form>
  );
};

export default OrderDetailListItem;
