import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import CardLayout from "../../Layouts/CardLayout/CardLayout";
import ProEditOrderTable from "../../ProEditOrderTable/ProEditOrderTable";
import MinhForm from "../TestForm/MinhForm";
import ProForm from "@ant-design/pro-form";
import OrderDetailInfo from "./OrderDetailInfo";
import { diff } from "deep-diff";
import moment from "moment";
import { useRef, useState } from "react";
import { useEffect } from "react";
import useData from "../../MinhServer/useData";
import { postToServer, updateDbTable } from "../../MinhServer/action";

const OrderDetail = (props) => {
  const params = useParams();
  const orderId = params.orderId;
  const [products] = useData("Products", "productId");
  const [orders] = useData("Orders", "orderId");
  const [orderItem,setOrderItem] = useState([]);
  const [form] = ProForm.useForm()
  const [udpateCallBack, setUpdateCallBack] = useState()
  const countRef = useRef()
  const onUpdateProducts = (cartInfo) => {
    updateDbTable("Orders",orderId,{productOrderedList:cartInfo})

    // set(ref(fbStore,`/orders/${orderId}/productOrderedList/`),cartInfo)
    // message.success("Update complete");
    // compareOrderData(cartInfo, orderIdItem.productOrderedList)
  };
  const clearUpdateTimeout = ()=>{
    
    setUpdateCallBack()
    clearInterval(countRef.current)
  }
  const onFinish = (cartInfo) =>{
    const valuesDiffArray = diff(orderItem.productOrderedList, cartInfo);
    logChange(orderId, valuesDiffArray)
    clearUpdateTimeout()
    onUpdateProducts(cartInfo)
  }
  const logChange = (orderId, valuesDiffItem) => {
    const currentDateTime = moment().format("MMMM Do YYYY, h:mm:ss a");
    postToServer("Logs",{
      logTime:currentDateTime,
      orderChangeId: orderId,
      valuesChange: valuesDiffItem
    })
  }
  const onAutoSaveChange = (orderId, valuesDiffItem, formValues) => {
    clearUpdateTimeout()
    
    const newUpdateCallBack =  {
      time:5000,
      updateCallback:() => {
        logChange(orderId, valuesDiffItem)
        onUpdateProducts(formValues)
        console.log("Update")
        clearUpdateTimeout()
      }
    }
    countRef.current = setInterval(()=>{
      setUpdateCallBack(prev => ({
        ...prev,
        time: prev.time-1000
      }))
    },1000)
    setUpdateCallBack(newUpdateCallBack)
  };
  const onValuesChange = (changedObj, formValues) => {
    const valuesDiffArray = diff(orderItem.productOrderedList, formValues);
    onAutoSaveChange(orderId, valuesDiffArray,formValues);
  };
  useEffect(()=>{
    if (!(!orderItem || !products.length)) form.resetFields() 
  },[orderItem])
  useEffect(()=>{
    setOrderItem(orders?.find((order) => order.orderId === orderId)?.productOrderedList)
  },[orders])
  if (!orderItem || !products.length) return <>Loading</>;
  return (
    <MinhForm
      form = {form}
      initialValues={orderItem}
      submitter={false}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
    >
      <CardLayout cardTitle={"Order detail"} back>
        <ProForm.Item>
          <OrderDetailInfo />
        </ProForm.Item>
        <ProForm.Item name={["products"]}>
          <ProEditOrderTable submitText={"Update"} updateCallBack={udpateCallBack}/>
        </ProForm.Item>
      </CardLayout>
    </MinhForm>
  );
};

export default OrderDetail;
