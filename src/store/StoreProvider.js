import { Provider } from "react-redux";
import store from "./store";
import { useLayoutEffect } from "react";
import { fbStore } from "../components/Firebase/Firebase";
import { ref, onValue } from "firebase/database";
import { customerActions } from "./slices/customerSlices";
import { orderActions } from "./slices/orderSlice";
import { productActions } from "./slices/productSlice";

function StoreProvider(props) {
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
  useLayoutEffect(() => {
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
  return <Provider store={store}>{props.children}</Provider>;
}

export default StoreProvider;
