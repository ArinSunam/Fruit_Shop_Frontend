import { createSlice } from "@reduxjs/toolkit";
import { clearCartsFromLocal, getCartsFromLocal, setCartsToLocal } from "./Storage"




export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    carts: getCartsFromLocal()
  },
  reducers: {

    setToCarts: (state, action) => {
      const isExist = state.carts.find((cart) => cart._id === action.payload._id);

      if (isExist) {
        state.carts = state.carts.map((cart) => cart._id === action.payload._id ? action.payload : cart);

      } else {
        state.carts.push(action.payload);

      }
      setCartsToLocal(state.carts);
    },

    singleRemoveCart: (state, action) => {
      state.carts.splice(action.payload, 1);
      setCartsToLocal(state.carts);
    },


    clearCarts: (state) => {
      state.carts = []
      clearCartsFromLocal();

    },

  }

});

export const { setToCarts, singleRemoveCart, clearCarts } = cartSlice.actions;
export default cartSlice.reducer