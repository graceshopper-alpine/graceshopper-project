import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  cartId: "",
  sessionId: "",
  cart: [],
  isAdmin: false,
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setCartId: (state, action) => {
      state.cartId = action.payload;
    },
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { setUserId, setCartId, setSessionId, setCart, setAdmin } =
  mainSlice.actions;
export default mainSlice.reducer;
