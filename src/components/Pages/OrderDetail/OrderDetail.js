import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import CardLayout from "../../Layouts/CardLayout/CardLayout";
import { useSelector } from "react-redux";
import OrderCart from "../../OrderCart/OrderCart";
import ProEditOrderTable from "../../ProEditOrderTable/ProEditOrderTable";
import { useState } from "react";
import CartButton from "../../Button/CartButton";

const cartProductsAdaptive = (productOrderedList, products) => {
  const cartProducts = [];
  if (!productOrderedList) return cartProducts;
  for (const [key, orderItem] of Object.entries(productOrderedList)) {
    const cartProduct = {
      id: key,
      orderProductId: orderItem.orderProductId,
      orderQuantum: orderItem.orderQuantum,
      orderUnitPrice: orderItem.orderUnitPrice,
      orderFinalPrice: orderItem.orderFinalPrice,
      orderDiscount: orderItem.orderDiscount,
    };
    cartProducts.push(cartProduct);
  }
  return cartProducts;
};

const OrderDetail = (props) => {
  const params = useParams();
  const orderId = params.orderId;
  const products = useSelector((storeData) => storeData.products);
  const orderIdItem = useSelector((storeData) =>
    storeData.orders.find((order) => order.orderId === orderId)
  );
  const [cartProducts, setCartProducts] = useState(
    cartProductsAdaptive(orderIdItem?.productOrderedList, products)
  );
  const onUpdateProducts = () => {

  }
  if (!orderIdItem || !products.length) return <></>;
  return (
    <CardLayout cardTitle={"Order detail"} back>
      <ProEditOrderTable
        customerProfile={{}}
        dataSource={cartProducts}
        onDataChange={(newCartData) => setCartProducts(newCartData)}
      />
      <CartButton text={"Update"} onButtonClick={onUpdateProducts}/>
    </CardLayout>
  );
};

export default OrderDetail;
