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
  return <Provider store={store}>{props.children}</Provider>;
}

export default StoreProvider;
