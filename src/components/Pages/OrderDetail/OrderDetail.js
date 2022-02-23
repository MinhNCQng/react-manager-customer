import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import CardLayout from "../../Layouts/CardLayout/CardLayout";
import { useSelector } from "react-redux";
import OrderCart from "../../OrderCart/OrderCart";

const cartProductsAdaptive = (productOrderedList, products) => {
    const cartProducts = []
    if (!productOrderedList) return cartProducts
    for (const [key,orderItem] of Object.entries(productOrderedList)){
        const cartProduct = {
            key: key,
            orderProductId: orderItem.orderProductId,
            orderQuantum: orderItem.orderQuantum,
            orderUnitPrice: orderItem.orderUnitPrice,
        }
        cartProducts.push(cartProduct)
    }
    return cartProducts
} 
 
const OrderDetail = (props) => {
    const params = useParams();
    const orderId = params.orderId;
    const products = useSelector((storeData) => storeData.products);
    const orderIdItem = useSelector((storeData) =>
      storeData.orders.find((order) => order.orderId === orderId)
    );
    if (!orderIdItem || !products.length) return <></>;
    const cartProducts = cartProductsAdaptive(
      orderIdItem.productOrderedList,
      products
    );
    return (
      <CardLayout cardTitle={"Order detail"} back>
        <OrderCart
          customerProfile={{}}
          orderInfo={{
            orderId,
            orderDate: orderIdItem.orderDate,
            orderStatus: orderIdItem.orderStatus,
          }}
          initalCartProducts={cartProducts}
          mode="updateOrder"
        />
      </CardLayout>
    );
};

export default OrderDetail