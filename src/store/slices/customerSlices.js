import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customers",
  initialState: null,
  reducers: {
    setCustomers(state, action) {
      return action.payload;
    },
  },
});

const customerActions = customerSlice.actions;

export { customerActions };
export default customerSlice;
