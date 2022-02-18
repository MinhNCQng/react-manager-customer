import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./slices/customerSlices";
import orderSlice from "./slices/orderSlice";
import productSlice from "./slices/productSlice";

const store = configureStore({
  reducer: {
    customers: customerSlice.reducer,
    orders: orderSlice.reducer,
    products: productSlice.reducer,
  },
});

export default store;
