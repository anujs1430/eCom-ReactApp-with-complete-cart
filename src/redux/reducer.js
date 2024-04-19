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
    // Initialize sum to calculate subtotal
    let sum = 0;

    // Loop through each item in the cart
    state.cartItems.forEach((item) => {
      // Add the price of each item multiplied by its quantity to the sum
      sum += item.price * item.quantity;
    });

    // Set the subtotal in the state
    state.subTotal = sum;

    // Determine shipping cost based on subtotal
    state.shipping = state.subTotal > 1000 ? 0 : 20;

    // Calculate tax (18% of subtotal) and round to the nearest integer
    state.tax = +(state.subTotal * 0.18).toFixed();

    // Calculate total by adding subtotal, tax, and shipping
    state.total = state.subTotal + state.tax + state.shipping;

    // If the cart is empty, set shipping to 0
    if (state.cartItems.length === 0) {
      state.shipping = 0;
      state.total = 0;
    }
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
