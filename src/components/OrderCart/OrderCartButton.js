import { Button, Col, Row } from "antd";

const orderCartButton = ({ orderInfo, onCartUpdate, totalPrice, onCartOrder }) => {
  const footer = (
    <Row justify="space-between">
      <Col>Total</Col>
      <Col>{totalPrice} vnd</Col>
    </Row>
  );
  const updateOrderButton = () => (
    <>
      <Row>
        <b>Order date:</b> {orderInfo.orderDate}
      </Row>
      <Row>
        <b>Order status:</b> {orderInfo.orderStatus}
      </Row>
      <Row justify="space-between" style={{ marginTop: 20 }}>
        <Button
          type="primary"
          onClick={onCartUpdate}
          style={{ backgroundColor: "green" }}
        >
          Update
        </Button>
      </Row>
    </>
  );
  const newOrderButton = () => (
    <>
      <Row justify="space-between" style={{ marginTop: 20 }}>
        <Button
          type="primary"
          onClick={onCartOrder}
          style={{ backgroundColor: "green" }}
        >
          Order
        </Button>
      </Row>
    </>
  );
  return {footer,updateOrderButton,newOrderButton}
};
export default orderCartButton;
