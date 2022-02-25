import { Form } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOrderCartTableColumns } from "./OrderCartTableInfo";

const useOrderCartState = (initalCartProducts) => {
  const [form] = Form.useForm();
  const products = useSelector((storeData) => storeData.products);
  const orderCartTableColumns = getOrderCartTableColumns(products);
  const [cartProduct, setCartProduct] = useState(initalCartProducts);
  const [totalPrice, setTotalPrice] = useState(0);
  return {
    form,
    products,
    orderCartTableColumns,
    cartProduct,
    setCartProduct,
    totalPrice,
    setTotalPrice,
  };
};

export default useOrderCartState;
