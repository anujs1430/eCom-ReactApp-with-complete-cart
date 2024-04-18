import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  subTotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder.addCase("addToCart", (state, action) => {
    const item = action.payload;
    const itemExist = state.cartItems.find((i) => i.id === item.id);

    if (itemExist) {
      state.cartItems.forEach((i) => {
        if (i.id === item.id) i.quantity += 1;
      });
    } else {
      state.cartItems.push(item);
    }
  });

  builder.addCase("removeFromCart", (state, action) => {
    const idToRemove = action.payload;
    state.cartItems = state.cartItems.filter((item) => item.id !== idToRemove);
  });

  builder.addCase("calculatePrice", (state) => {
    let sum = 0;
    state.cartItems.forEach((i) => (sum += i.price * i.quantity));
    state.subTotal = sum;
    state.shipping = state.subTotal > 1000 ? 0 : 20;
    state.tax = +(state.subTotal * 0.18).toFixed();
    state.total = state.subTotal + state.tax + state.shipping;
  });

  builder.addCase("decrement", (state, action) => {
    const item = state.cartItems.find((i) => i.id === action.payload);
    if (item.quantity > 1) {
      state.cartItems.forEach((i) => {
        if (i.id === item.id) i.quantity -= 1;
      });
    }
  });
});
