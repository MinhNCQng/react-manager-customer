import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    setOrders(state, action) {
      return action.payload;
    },
  },
});

const orderActions = orderSlice.actions;

export { orderActions };
export default orderSlice;
