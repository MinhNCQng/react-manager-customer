import { Provider } from "react-redux";
import store from "./store";
import { useLayoutEffect, useState } from "react";
import { fbStore } from "../components/Firebase/Firebase";
import { ref, onValue } from "firebase/database";
import { customerActions } from "./slices/customerSlices";
import { orderActions } from "./slices/orderSlice";
import { productActions } from "./slices/productSlice";

function StoreProvider(props) {  
  const [isLoading,setIsLoading] = useState(true);
  useLayoutEffect(() => {
    store.subscribe(()=>{
      const storeData= store.getState()
      if (isDataAvalible(storeData)) setIsLoading(false);
    })
    subscribeDataArray({
      actionSetData: customerActions.setCustomers,
      dataName: "customers",
      itemKey: "customerId",
    });
    subscribeDataArray({
      actionSetData: orderActions.setOrders,
      dataName: "orders",
      itemKey: "orderId",
    });
    subscribeDataArray({
      actionSetData: productActions.setProducts,
      dataName: "products",
      itemKey: "productId",
    });
  }, []);
  if (isLoading) return <p>Loading</p>
  return <Provider store={store}>{props.children}</Provider>;
}

const isDataAvalible = (storeData) => {
  return storeData.products && storeData.orders && storeData.customers
}

const subscribeDataArray = async ({ actionSetData, dataName, itemKey }) => {
  const dataRef = ref(fbStore, `/${dataName}/`);
  onValue(dataRef, (dataSnapshot) => {
    const itemDict = dataSnapshot.val() || {};
    const itemList = [];
    for (const [key, value] of Object.entries(itemDict)) {
      value[`${itemKey}`] = key;
      itemList.push(value);
    }
    store.dispatch(actionSetData(itemList));
  });
};

export default StoreProvider;
