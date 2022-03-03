import { Form } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useProEditOrderTableState = ({dataSource}) => {
  const products = useSelector((storeData) => storeData.products);
  const [form] = Form.useForm();
  const editableKeys = dataSource.map(product => product.id);

  return {
    products,
    form,
    editableKeys,
  };
};

export default useProEditOrderTableState;
