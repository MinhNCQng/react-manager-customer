import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import CardLayout from "../../Layouts/CardLayout/CardLayout";
import { useSelector } from "react-redux";
import OrderDetailList from "../../OrderDetailList/OrderDetailList";

const OrderDetail = (props) => {
    const params = useParams()
    const orderId = params.orderId
    const orderIdItem = useSelector(storeData => storeData.orders.find(order => order.orderId === orderId)) 
    return (
        <CardLayout cardTitle={"Order detail"} back>
            <OrderDetailList productOrderedList = {orderIdItem.productOrderedList} orderId = {orderId} orderDate = {orderIdItem.orderDate} orderStatus = {orderIdItem.orderStatus}/>
        </CardLayout>
    )
};

export default OrderDetail