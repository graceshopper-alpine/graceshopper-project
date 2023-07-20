//import all necessary things for slice and thunk
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//thunk to get all products
export const getAllProducts = createAsyncThunk("products/getAll", async () => {
  try {
    const { data } = await axios.get("/api/products");
    return data;
  } catch (error) {
    return error;
  }
});

//create slice
export const productsSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
      state.allProducts = payload;
    });
  },
});

export default productsSlice.reducer;
