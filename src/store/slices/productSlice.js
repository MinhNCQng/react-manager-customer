import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: null,
  reducers: {
    setProducts(state, action) {
      return action.payload;
    },
  },
});

const productActions = productSlice.actions;

export { productActions };
export default productSlice;
