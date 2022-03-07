import { Form } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useProEditOrderTableState = ({dataSource}) => {
  const products = useSelector((storeData) => storeData.products);
  return {
    products,
  };
};

export default useProEditOrderTableState;
