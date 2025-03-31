import { createSlice } from "@reduxjs/toolkit";
import { setCart, getCart, cartClear } from "./Storage"




export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    carts: getCart()
  },
  reducers: {

    addOrUpdateCart: (state, action) => {
      const isExist = state.carts.find(
        (cart) => cart.product === action.payload.product
      );

      if (isExist) {
        state.carts = state.carts.map((cart) =>
          cart.product === isExist.product ? action.payload : cart
        );
        setCart(state.carts);
      } else {
        state.carts.push(action.payload);
        setCart(state.carts);
      }
    },

    removeCart: (state, action) => {
      state.carts.splice(action.payload, 1);
      setCart(state.carts);
    },

    clearCartItem: (state, action) => {
      state.carts = [];
      cartClear();
    },
  }

});

export const { addOrUpdateCart, removeCart, clearCartItem } = cartSlice.actions;
export default cartSlice.reducer